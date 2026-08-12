#!/usr/bin/env python3
"""
Fetch treatment-related image assets from a public WordPress site.

Primary mode:
- Queries the public WordPress media REST endpoint
- Paginates through every media item
- Extracts `source_url` plus filename/title metadata
- Filters to likely before/after or treatment-related assets

Optional gallery mode:
- Resolves the public before/after gallery page from the WP pages endpoint
- Fetches the rendered page HTML
- Extracts composite before/after gallery images and captions

Examples:
  python3 scripts/fetch_elite_before_after.py
  python3 scripts/fetch_elite_before_after.py --pretty --output elite-images.json
  python3 scripts/fetch_elite_before_after.py --include-gallery --pretty
  python3 scripts/fetch_elite_before_after.py --include-gallery --ts-output src/data/eliteBeforeAfterResults.generated.ts
"""

from __future__ import annotations

import argparse
import html
import json
import re
import sys
from pathlib import Path
from typing import Any
from urllib.parse import urlencode, urlparse
from urllib.request import Request, urlopen

try:  # Prefer requests when available, but do not require it.
    import requests  # type: ignore
except ImportError:  # pragma: no cover - optional dependency
    requests = None


DEFAULT_SITE_URL = "https://elitemedicalspa.com"
DEFAULT_GALLERY_SLUG = "before-and-after-images"
DEFAULT_PER_PAGE = 100

KEYWORD_GROUPS = {
    "before_after": [r"before", r"after", r"b\/a", r"comparison"],
    "treatments": [
        r"botox",
        r"xeomin",
        r"dysport",
        r"tox",
        r"filler",
        r"fillers",
        r"juvederm",
        r"radiesse",
        r"belotero",
        r"lip",
        r"lips",
        r"cheek",
        r"cheeks",
        r"chin",
        r"jaw",
        r"jawline",
        r"under\s*eye",
        r"hydrafacial",
        r"hydra\s*facial",
        r"facial",
        r"skin",
        r"laser",
        r"microneedling",
        r"pdo",
        r"thread",
        r"marionette",
        r"smoker\s*lines",
        r"facial\s*balancing",
        r"hand\s*rejuvenation",
    ],
}

COMBINED_KEYWORD_RE = re.compile(
    "|".join([*KEYWORD_GROUPS["before_after"], *KEYWORD_GROUPS["treatments"]]),
    re.IGNORECASE,
)

UPLOAD_URL_RE = re.compile(r"https://[^\"'>\s]+/wp-content/uploads/[^\"'>\s]+\.(?:png|jpe?g|webp)", re.IGNORECASE)
LIGHTBOX_TITLE_RE = re.compile(r'data-elementor-lightbox-title="([^"]+)"')
HREF_RE = re.compile(r"href='([^']+)'")
DIMENSION_RE = re.compile(r'width="(\d+)".*height="(\d+)"')
ALT_RE = re.compile(r'alt="([^"]*)"')


class SimpleResponse:
    def __init__(self, url: str, status_code: int, headers: dict[str, str], body: bytes):
        self.url = url
        self.status_code = status_code
        self.headers = headers
        self._body = body
        self.text = body.decode("utf-8", errors="replace")

    def json(self) -> Any:
        return json.loads(self.text)

    def raise_for_status(self) -> None:
        if self.status_code >= 400:
            raise RuntimeError(f"Request failed ({self.status_code}) for {self.url}")


class HttpClient:
    def get(self, url: str, params: dict[str, Any] | None = None, timeout: int = 30) -> SimpleResponse:
        if requests is not None:
            response = requests.get(url, params=params, timeout=timeout)
            return SimpleResponse(
                response.url,
                response.status_code,
                dict(response.headers),
                response.content,
            )

        if params:
            query = urlencode(params, doseq=True)
            separator = "&" if "?" in url else "?"
            url = f"{url}{separator}{query}"
        request = Request(
            url,
            headers={
                "User-Agent": (
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
                ),
                "Accept": "application/json,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
                "Referer": DEFAULT_SITE_URL,
            },
        )
        with urlopen(request, timeout=timeout) as response:
            body = response.read()
            headers = {k: v for k, v in response.headers.items()}
            return SimpleResponse(response.geturl(), response.status, headers, body)


def filename_from_url(url: str) -> str:
    return Path(urlparse(url).path).name


def flatten_text(*parts: str) -> str:
    return " ".join(part.strip() for part in parts if part and part.strip())


def media_matches_keywords(item: dict[str, Any]) -> bool:
    source_url = item.get("source_url", "")
    title = item.get("title", {}).get("rendered", "")
    alt_text = item.get("alt_text", "")
    caption = item.get("caption", {}).get("rendered", "")
    description = item.get("description", {}).get("rendered", "")
    haystack = flatten_text(
        filename_from_url(source_url),
        html.unescape(title),
        html.unescape(alt_text),
        html.unescape(caption),
        html.unescape(description),
    )
    return bool(COMBINED_KEYWORD_RE.search(haystack))


def treatment_slug_for_text(text: str) -> str:
    lowered = text.lower()
    if any(keyword in lowered for keyword in ["tox", "botox", "xeomin", "dysport", "crow", "forehead"]):
        return "botox"
    if any(keyword in lowered for keyword in ["hydra", "facial", "skin", "laser", "microneedling"]):
        return "hydrafacial"
    if any(
        keyword in lowered
        for keyword in ["filler", "juvederm", "radiesse", "belotero", "lip", "cheek", "chin", "jaw", "jawline"]
    ):
        return "dermal-fillers"
    if "body" in lowered:
        return "body-contouring"
    return "skin-rejuvenation"


def treatment_label_for_slug(slug: str) -> str:
    return {
        "botox": "Expression Lines",
        "hydrafacial": "Skin Rejuvenation",
        "skin-rejuvenation": "Skin Rejuvenation",
        "dermal-fillers": "Dermal Fillers",
        "body-contouring": "Body Contouring",
    }.get(slug, "Skin Rejuvenation")


def fetch_all_media(site_url: str, per_page: int = DEFAULT_PER_PAGE, timeout: int = 30) -> list[dict[str, Any]]:
    client = HttpClient()
    page = 1
    media_items: list[dict[str, Any]] = []

    while True:
        response = client.get(
            f"{site_url.rstrip('/')}/wp-json/wp/v2/media",
            params={"per_page": per_page, "page": page},
            timeout=timeout,
        )
        response.raise_for_status()
        items = response.json()
        if not items:
            break
        media_items.extend(items)
        total_pages = int(response.headers.get("X-WP-TotalPages", page))
        if page >= total_pages:
            break
        page += 1

    return media_items


def build_media_matches(media_items: list[dict[str, Any]]) -> list[dict[str, Any]]:
    matches: list[dict[str, Any]] = []
    for item in media_items:
        if not media_matches_keywords(item):
            continue
        source_url = item.get("source_url", "")
        title = html.unescape(item.get("title", {}).get("rendered", "")).strip()
        alt_text = html.unescape(item.get("alt_text", "")).strip()
        caption = re.sub(r"<[^>]+>", " ", item.get("caption", {}).get("rendered", ""))
        caption = html.unescape(re.sub(r"\s+", " ", caption)).strip()
        matches.append(
            {
                "id": item.get("id"),
                "title": title,
                "filename": filename_from_url(source_url),
                "source_url": source_url,
                "alt_text": alt_text,
                "caption": caption,
                "width": item.get("media_details", {}).get("width"),
                "height": item.get("media_details", {}).get("height"),
            }
        )
    return matches


def fetch_gallery_html(site_url: str, gallery_slug: str, timeout: int = 30) -> tuple[str, str]:
    client = HttpClient()
    page_response = client.get(
        f"{site_url.rstrip('/')}/wp-json/wp/v2/pages",
        params={"slug": gallery_slug},
        timeout=timeout,
    )
    page_response.raise_for_status()
    pages = page_response.json()
    if not pages:
        raise RuntimeError(f"No WordPress page found for slug `{gallery_slug}`.")
    page_link = pages[0]["link"]
    html_response = client.get(page_link, timeout=timeout)
    html_response.raise_for_status()
    return page_link, html_response.text


def extract_gallery_composites(page_html: str) -> list[dict[str, Any]]:
    items: list[dict[str, Any]] = []
    current: dict[str, Any] | None = None

    for raw_line in page_html.splitlines():
        line = raw_line.strip()

        if "data-elementor-lightbox-title=" in line and "/wp-content/uploads/" in line:
            title_match = LIGHTBOX_TITLE_RE.search(line)
            href_match = HREF_RE.search(line)
            dimension_match = DIMENSION_RE.search(line)
            alt_match = ALT_RE.search(line)
            if not title_match or not href_match:
                continue

            current = {
                "title": html.unescape(title_match.group(1)).strip(),
                "source_url": href_match.group(1),
                "filename": filename_from_url(href_match.group(1)),
                "alt_text": html.unescape(alt_match.group(1)).strip() if alt_match else "",
                "width": int(dimension_match.group(1)) if dimension_match else None,
                "height": int(dimension_match.group(2)) if dimension_match else None,
            }
            continue

        if current and "<figcaption" in line:
            continue

        if current and "</figcaption>" in line:
            caption = current.get("caption", "")
            searchable = flatten_text(current["filename"], current["title"], current["alt_text"], caption)
            if COMBINED_KEYWORD_RE.search(searchable):
                items.append(current)
            current = None
            continue

        if current and line and "</div>" not in line:
            caption_text = html.unescape(re.sub(r"<[^>]+>", "", line)).strip()
            if caption_text:
                current["caption"] = caption_text

    return items


def build_ts_seed(composites: list[dict[str, Any]], gallery_page_url: str) -> str:
    chosen_by_slug: dict[str, dict[str, Any]] = {}
    for item in composites:
        slug = treatment_slug_for_text(flatten_text(item.get("caption", ""), item.get("title", ""), item.get("alt_text", "")))
        chosen_by_slug.setdefault(slug, item)

    ordered_slugs = ["botox", "hydrafacial", "dermal-fillers"]
    results: list[dict[str, Any]] = []
    for slug in ordered_slugs:
        item = chosen_by_slug.get(slug)
        if not item:
            continue
        results.append(
            {
                "id": Path(item["filename"]).stem.lower().replace(" ", "-"),
                "treatment": treatment_label_for_slug(slug),
                "treatmentSlug": slug,
                "description": f"External composite before/after sourced from the public gallery captioned “{item.get('caption') or item.get('title')}”.",
                "beforeImage": "",
                "afterImage": "",
                "compositeImage": item["source_url"],
                "altBefore": f"Before view included inside sourced composite for {treatment_label_for_slug(slug)}.",
                "altAfter": f"After view included inside sourced composite for {treatment_label_for_slug(slug)}.",
                "altComposite": item.get("alt_text") or item.get("caption") or item.get("title"),
                "source": "Elite Medical Spa public before-and-after gallery",
                "sourceUrl": gallery_page_url,
                "usageRights": "Publicly accessible third-party gallery asset. Confirm licensing and permission before production reuse.",
                "disclaimer": "Sourced from a public external gallery for portfolio demonstration only. This is not a VEYRA patient result, and individual results vary.",
                "width": item.get("width") or 1170,
                "height": item.get("height") or 925,
                "isPlaceholder": False,
            }
        )

    body = json.dumps(results, indent=2, ensure_ascii=True)
    body = body.replace(": false", ": false")
    return (
        "import type { ResultItem } from '@/types/medspa'\n\n"
        f"export const eliteBeforeAfterResults: ResultItem[] = {body}\n\n"
        "export default eliteBeforeAfterResults\n"
    )


def write_output(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--site-url", default=DEFAULT_SITE_URL)
    parser.add_argument("--gallery-slug", default=DEFAULT_GALLERY_SLUG)
    parser.add_argument("--per-page", type=int, default=DEFAULT_PER_PAGE)
    parser.add_argument("--include-gallery", action="store_true")
    parser.add_argument("--pretty", action="store_true")
    parser.add_argument("--output", help="Write JSON results to a file instead of stdout.")
    parser.add_argument(
        "--ts-output",
        help="Optionally write a TypeScript seed file using the first botox, hydrafacial, and filler gallery matches.",
    )
    args = parser.parse_args()

    media_items = fetch_all_media(args.site_url, per_page=args.per_page)
    media_matches = build_media_matches(media_items)

    payload: dict[str, Any] = {
        "site_url": args.site_url,
        "media_endpoint": f"{args.site_url.rstrip('/')}/wp-json/wp/v2/media",
        "match_count": len(media_matches),
        "matches": media_matches,
    }

    gallery_items: list[dict[str, Any]] = []
    gallery_page_url = ""

    if args.include_gallery or args.ts_output:
        gallery_page_url, gallery_html = fetch_gallery_html(args.site_url, args.gallery_slug)
        gallery_items = extract_gallery_composites(gallery_html)
        payload["gallery_page_url"] = gallery_page_url
        payload["gallery_count"] = len(gallery_items)
        payload["gallery_matches"] = gallery_items

    if args.ts_output:
        if not gallery_items:
            raise RuntimeError("No gallery composites were extracted, so no TypeScript seed could be generated.")
        ts_content = build_ts_seed(gallery_items, gallery_page_url)
        write_output(Path(args.ts_output), ts_content)

    json_text = json.dumps(payload, indent=2 if args.pretty else None, ensure_ascii=True)
    if args.output:
        write_output(Path(args.output), json_text)
    else:
        print(json_text)

    return 0


if __name__ == "__main__":
    sys.exit(main())
