/**
 * Shared treatment knowledge base.
 * CMS-ready: replace with API/CMS fetch; keep this shape as the contract.
 * Powers treatment pages, SEO, FAQ JSON-LD, internal links, and AI guide.
 */

import type { Treatment } from '@/types/medspa'

const treatmentImage = (id: string, alt: string) => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=75`,
  alt,
  width: 1200,
  height: 800,
})

export const baseTreatments: Treatment[] = [
  {
    slug: 'botox',
    name: 'Botox',
    shortDescription:
      'A consultation-led injectable option often discussed for softening the appearance of dynamic fine lines.',
    typicalConcern: 'Fine lines from expression',
    overview:
      'Botox is a prescription neuromodulator that providers may discuss for temporarily reducing the appearance of lines caused by repeated facial movement. At a MedSpa consultation, a qualified provider reviews your goals, anatomy, and medical history before determining whether this option is appropriate to discuss further.',
    commonConcerns: [
      'Lines that appear with facial expression',
      'A desire for a refreshed, natural look',
      'Interest in non-surgical aesthetic options',
      'Preventative aesthetic conversations with a provider',
    ],
    whatToExpect: [
      'A consultation to review goals, history, and candidacy considerations',
      'Discussion of treatment areas and realistic expectations',
      'If proceeding after medical evaluation, a brief in-clinic appointment',
      'Guidance on aftercare and follow-up timing from your provider',
    ],
    consultationProcess: [
      'Share what you hope to improve and any relevant medical history',
      'Review photographs and facial movement patterns with your provider',
      'Discuss options, alternatives, and what results may look like for you',
      'Decide together whether to proceed, wait, or explore other treatments',
    ],
    whoMayDiscuss: [
      'Adults exploring options for expression lines',
      'People seeking a refreshed look without surgical procedures',
      'Anyone who wants personalized guidance before choosing a treatment',
    ],
    considerations: [
      'Not appropriate for everyone — medical evaluation is required',
      'Results and longevity vary by individual',
      'Disclose medications, pregnancy status, and neuromuscular conditions',
      'Choose a qualified provider and ask questions before proceeding',
    ],
    appointmentDuration: 'Consultations often take 20–40 minutes; treatment visits, when appropriate, are typically brief.',
    relatedSlugs: ['dermal-fillers', 'skin-rejuvenation'],
    faqs: [
      {
        question: 'What is Botox?',
        answer:
          'Botox is a brand of prescription neuromodulator that qualified providers may use to temporarily soften lines related to muscle movement. It is not a filler and does not add volume.',
      },
      {
        question: 'Where can I get Botox in Austin?',
        answer:
          'Many medical aesthetics clinics in Austin offer neuromodulator consultations. At VEYRA (a fictional portfolio MedSpa concept), Botox is discussed during a personalized consultation with a qualified provider.',
      },
      {
        question: 'What is the difference between Botox and dermal fillers?',
        answer:
          'Botox affects muscle movement that creates dynamic lines. Dermal fillers are typically used to add or restore volume. A provider can help explain which category — if any — aligns with your goals.',
      },
      {
        question: 'How long does a Botox appointment typically take?',
        answer:
          'Consultation time varies. When treatment proceeds after evaluation, the injection portion is often relatively short. Your provider will set expectations for your visit.',
      },
    ],
    seoTitle: 'Botox in Austin | VEYRA Medical Aesthetics',
    seoDescription:
      'Learn about Botox consultations in Austin at VEYRA Medical Aesthetics. Educational information on concerns, expectations, and how to book a personalized consultation.',
    image: treatmentImage(
      'photo-1509967419530-da38b4704bc6',
      'Soft natural light across calm skin texture — editorial aesthetic care atmosphere'
    ),
  },
  {
    slug: 'dermal-fillers',
    name: 'Dermal Fillers',
    shortDescription:
      'Volume-focused injectable options discussed for contour, balance, and soft-tissue support.',
    typicalConcern: 'Volume and facial contour',
    overview:
      'Dermal fillers are gel-based materials that providers may discuss for supporting facial volume and contour. Products and techniques vary widely. A consultation focuses on your goals, facial proportions, and whether fillers — or another approach — may be worth exploring.',
    commonConcerns: [
      'Soft-tissue volume changes over time',
      'Desire for balanced facial contour',
      'Interest in non-surgical enhancement options',
      'Lip or midface aesthetic conversations',
    ],
    whatToExpect: [
      'Goal-setting and facial assessment with a qualified provider',
      'Product category and approach discussion when relevant',
      'Clear talk about swelling, downtime ranges, and variability',
      'A plan for follow-up if treatment proceeds',
    ],
    consultationProcess: [
      'Describe areas of concern and your preferred aesthetic',
      'Review anatomy, proportions, and conservative options',
      'Discuss risks, alternatives, and maintenance considerations',
      'Leave with clarity — not pressure — on next steps',
    ],
    whoMayDiscuss: [
      'Adults noticing volume or contour changes',
      'People comparing injectable options with other treatments',
      'Anyone seeking a natural-looking approach guided by a provider',
    ],
    considerations: [
      'Fillers are not suitable for every concern or every person',
      'Outcomes depend on product, technique, anatomy, and healing',
      'Share full medical and dental history during consultation',
      'Ask about emergency protocols and provider qualifications',
    ],
    appointmentDuration: 'Consultations commonly take 30–45 minutes depending on complexity.',
    relatedSlugs: ['botox', 'skin-rejuvenation'],
    faqs: [
      {
        question: 'What are dermal fillers?',
        answer:
          'Dermal fillers are injectable materials used by qualified providers to support facial volume or contour. They differ from neuromodulators like Botox.',
      },
      {
        question: 'Are dermal fillers available in Austin?',
        answer:
          'Yes — many Austin MedSpas offer filler consultations. This demo site describes how a premium clinic might educate visitors before booking.',
      },
      {
        question: 'How should I prepare for a filler consultation?',
        answer:
          'Bring photos of your goals if helpful, list medications and allergies, and prepare questions about products, longevity, and what “natural” means for you.',
      },
    ],
    seoTitle: 'Dermal Fillers in Austin | VEYRA Medical Aesthetics',
    seoDescription:
      'Explore dermal filler consultations in Austin. Learn common concerns, what to expect, and how VEYRA approaches personalized aesthetic planning.',
    image: treatmentImage(
      'photo-1512290923902-8a9f81dc236c',
      'Minimal clinical workspace with soft neutral tones'
    ),
  },
  {
    slug: 'laser-skin-resurfacing',
    name: 'Laser Skin Resurfacing',
    shortDescription:
      'Energy-based skin treatments discussed for texture, tone, and surface refinement.',
    typicalConcern: 'Texture and tone unevenness',
    overview:
      'Laser skin resurfacing refers to a family of energy-based treatments that providers may discuss for concerns related to skin texture and tone. Suitability depends on skin type, goals, downtime tolerance, and medical history — all reviewed in consultation.',
    commonConcerns: [
      'Uneven texture',
      'Sun-related skin changes',
      'Desire for smoother-looking skin',
      'Interest in technology-assisted rejuvenation',
    ],
    whatToExpect: [
      'Skin assessment and discussion of laser categories when relevant',
      'Clear explanation of downtime ranges and aftercare needs',
      'Photos and a staged plan if a series is suggested',
      'Sun protection and prep guidance from your care team',
    ],
    consultationProcess: [
      'Review skin history, prior treatments, and medications',
      'Discuss goals and realistic timelines',
      'Compare laser options with non-laser alternatives',
      'Align on whether to proceed and how to prepare',
    ],
    whoMayDiscuss: [
      'Adults exploring texture or tone improvements',
      'People comparing resurfacing with chemical or injectable options',
      'Anyone needing clarity on downtime before scheduling',
    ],
    considerations: [
      'Not all lasers suit all skin types',
      'Healing response varies; sun exposure planning matters',
      'Multiple sessions may be discussed for some goals',
      'Medical clearance may be needed in certain cases',
    ],
    appointmentDuration: 'Consultations often take 30–45 minutes; treatment length varies by protocol.',
    relatedSlugs: ['skin-rejuvenation', 'hydrafacial'],
    faqs: [
      {
        question: 'What is laser skin resurfacing?',
        answer:
          'It is an energy-based approach providers may use to address certain texture and tone concerns. Specific devices and depths vary; consultation determines relevance.',
      },
      {
        question: 'Where can I find laser skin treatments in Austin?',
        answer:
          'Austin has many clinics offering laser consultations. This portfolio MedSpa illustrates how educational content and booking can work together.',
      },
    ],
    seoTitle: 'Laser Skin Resurfacing Austin | VEYRA Medical Aesthetics',
    seoDescription:
      'Educational overview of laser skin resurfacing consultations in Austin — concerns, expectations, and how to start a conversation with a provider.',
    image: treatmentImage(
      'photo-1616394584738-fc6e612e71b9',
      'Soft focus spa-clinical calm with linen and light'
    ),
  },
  {
    slug: 'hydrafacial',
    name: 'Hydrafacial',
    shortDescription:
      'A multi-step facial experience often discussed for cleansing, exfoliation, and hydration support.',
    typicalConcern: 'Dullness and congestion',
    overview:
      'Hydrafacial is a branded multi-step facial treatment that many MedSpas discuss for supporting clearer, more hydrated-looking skin. It is often considered when someone wants a refresher with relatively little downtime — suitability is still confirmed in consultation.',
    commonConcerns: [
      'Dull or tired-looking skin',
      'Mild congestion',
      'Desire for a glow before an event',
      'Interest in a structured facial protocol',
    ],
    whatToExpect: [
      'Skin assessment and goal discussion',
      'A multi-step cleansing and hydration-focused protocol when appropriate',
      'Guidance on at-home care and sun protection',
      'Optional discussion of add-on modalities your clinic offers',
    ],
    consultationProcess: [
      'Share skin concerns and upcoming events if relevant',
      'Review sensitivities and recent procedures',
      'Confirm timing and whether Hydrafacial fits your plan',
      'Book or explore complementary treatments',
    ],
    whoMayDiscuss: [
      'Adults seeking a refreshed facial experience',
      'People preparing for an event who want conservative options',
      'Anyone building a skincare maintenance plan with a clinic',
    ],
    considerations: [
      'Results and longevity vary',
      'Active skin conditions may change timing or suitability',
      'Ask about ingredients if you have sensitivities',
      'Not a substitute for medical dermatology care when needed',
    ],
    appointmentDuration: 'Visits commonly range from about 30–60 minutes depending on protocol.',
    relatedSlugs: ['skin-rejuvenation', 'laser-skin-resurfacing'],
    faqs: [
      {
        question: 'What is a Hydrafacial?',
        answer:
          'Hydrafacial is a multi-step facial treatment that combines cleansing, exfoliation, extraction, and hydration support. Providers assess whether it fits your skin and goals.',
      },
      {
        question: 'How often do people get Hydrafacials?',
        answer:
          'Maintenance cadence varies. Your provider can suggest a schedule based on your skin and lifestyle — there is no single universal interval.',
      },
    ],
    seoTitle: 'Hydrafacial in Austin | VEYRA Medical Aesthetics',
    seoDescription:
      'Learn about Hydrafacial consultations in Austin at VEYRA — what it is, common concerns, expectations, and how to book.',
    image: treatmentImage(
      'photo-1570172619644-dfd03ed5d881',
      'Fresh hydrated skin tone in soft daylight — wellness editorial'
    ),
  },
  {
    slug: 'skin-rejuvenation',
    name: 'Skin Rejuvenation',
    shortDescription:
      'A personalized category of treatments aimed at healthier-looking, more even, refreshed skin.',
    typicalConcern: 'Overall skin quality',
    overview:
      'Skin rejuvenation is an umbrella term for approaches that may include topical protocols, energy-based treatments, injectables, or combination plans. At VEYRA, rejuvenation begins with understanding your skin — not prescribing a one-size package.',
    commonConcerns: [
      'Uneven tone or texture',
      'Early signs of aging',
      'Dullness or fatigue in skin appearance',
      'Interest in a long-term skin plan',
    ],
    whatToExpect: [
      'Detailed conversation about routine, history, and goals',
      'Prioritized recommendations rather than an overwhelming menu',
      'Education on sequencing treatments when relevant',
      'Realistic timelines for visible change',
    ],
    consultationProcess: [
      'Map concerns to possible treatment categories',
      'Discuss lifestyle, budget bands, and downtime tolerance',
      'Build a phased plan you can refine over time',
      'Schedule only what you are ready to explore',
    ],
    whoMayDiscuss: [
      'Adults unsure which treatment category fits their goals',
      'People who want a plan rather than a single procedure',
      'Anyone comparing multiple MedSpa options in Austin',
    ],
    considerations: [
      '“Rejuvenation” means different things to different people — clarify goals',
      'Combining treatments requires professional sequencing',
      'Skin type and medical history influence options',
      'Consistency and sun protection often matter as much as procedures',
    ],
    appointmentDuration: 'Initial rejuvenation consultations often take 30–45 minutes.',
    relatedSlugs: ['hydrafacial', 'laser-skin-resurfacing', 'botox'],
    faqs: [
      {
        question: 'What treatment options are available for fine lines?',
        answer:
          'Depending on the type of lines and your goals, providers may discuss skincare, neuromodulators, resurfacing, or combination approaches. Consultation clarifies what is relevant for you.',
      },
      {
        question: 'How should I choose a MedSpa in Austin?',
        answer:
          'Look for clear education, qualified providers, transparent consultations, realistic expectations, and a clinic culture that prioritizes your questions over pressure.',
      },
    ],
    seoTitle: 'Skin Rejuvenation Austin | VEYRA Medical Aesthetics',
    seoDescription:
      'Personalized skin rejuvenation consultations in Austin. Learn how VEYRA approaches goals, expectations, and treatment planning.',
    image: treatmentImage(
      'photo-1540555700478-4be289fbecef',
      'Calm wellness atmosphere with soft textiles and natural light'
    ),
  },
  {
    slug: 'body-contouring',
    name: 'Body Contouring',
    shortDescription:
      'Non-surgical body-focused options discussed for contour and firmness goals after lifestyle foundations.',
    typicalConcern: 'Stubborn contour areas',
    overview:
      'Body contouring covers a range of non-surgical technologies and approaches that providers may discuss for localized contour goals. These options are not weight-loss treatments. Consultation focuses on candidacy, expectations, and whether another path is more appropriate.',
    commonConcerns: [
      'Localized areas that feel resistant to lifestyle efforts',
      'Interest in non-surgical contour conversations',
      'Desire for realistic, measured expectations',
      'Comparison of technologies and downtime',
    ],
    whatToExpect: [
      'Goal clarification and candidacy screening',
      'Explanation of what contouring can and cannot address',
      'Discussion of series-based plans when relevant',
      'Follow-up photography standards if treatment proceeds',
    ],
    consultationProcess: [
      'Review health history and prior procedures',
      'Examine areas of concern with conservative language',
      'Compare options and maintenance realities',
      'Decide on timing without urgency pressure',
    ],
    whoMayDiscuss: [
      'Adults near a stable lifestyle foundation exploring contour options',
      'People comparing non-surgical approaches',
      'Anyone seeking honest education before committing',
    ],
    considerations: [
      'Not a substitute for nutrition, movement, or medical weight care',
      'Results vary and may require multiple sessions',
      'Some technologies have specific medical contraindications',
      'Ask for clear before/after methodology and timelines',
    ],
    appointmentDuration: 'Consultations commonly take 30–45 minutes.',
    relatedSlugs: ['skin-rejuvenation'],
    faqs: [
      {
        question: 'Is body contouring a weight-loss treatment?',
        answer:
          'No. Most non-surgical contouring conversations focus on localized appearance goals, not overall weight reduction. Providers will clarify candidacy.',
      },
      {
        question: 'What should I ask during a MedSpa consultation?',
        answer:
          'Ask about provider qualifications, expected ranges of change, downtime, costs and series plans, alternatives, and how success is measured for someone with your goals.',
      },
    ],
    seoTitle: 'Body Contouring Austin | VEYRA Medical Aesthetics',
    seoDescription:
      'Learn about non-surgical body contouring consultations in Austin — candidacy, expectations, and how to book at VEYRA Medical Aesthetics.',
    image: treatmentImage(
      'photo-1544161515-4ab6ce6db874',
      'Serene spa corridor with natural materials and soft lighting'
    ),
  },
]
