/**
 * Central site content. Replace the placeholder values below with your real
 * business details — everything here flows through to the nav, footer,
 * schema/SEO metadata, and contact section automatically.
 */

export const business = {
  name: "Tintara Smart",
  shortName: "Tintara Smart",
  tagline: "Smart Film Solutions",
  // TODO: replace with your real service area, e.g. "Greater Chicago, IL"
  serviceArea: "[Your Service Area]",
  phone: "(708) 336-1710",
  phoneHref: "tel:+17083361710",
  email: "info@tintarasmart.com",
  // Leave as-is if you operate service-area-only with no public storefront
  address: null as string | null,
  hours: "Mon–Fri, 8am–6pm",
  social: {
    instagram: "https://www.instagram.com/tintarasmart/",
    facebook: "https://www.facebook.com",
    tiktok: "https://www.tiktok.com/@tintarasmart",
    youtube: "https://www.youtube.com/@TintaraSmart",
  },
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Smart Film", href: "#what-is-smart-film" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Applications", href: "#applications" },
  { label: "Pricing", href: "#pricing" },
  { label: "Our Work", href: "#our-work" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const benefits = [
  {
    icon: "Zap",
    title: "Instant Privacy",
    description:
      "Switch from fully transparent to frosted privacy in a fraction of a second — no waiting, no fumbling with cords.",
  },
  {
    icon: "Layers",
    title: "Modern Design",
    description:
      "Keep the clean, uninterrupted look of glass. No hardware, no fabric, no visual clutter across your windows.",
  },
  {
    icon: "Smartphone",
    title: "Control at Your Fingertips",
    description:
      "Operate from a wall switch, handheld remote, or your smart home app — including Alexa, Google Home, and Apple HomeKit.",
  },
  {
    icon: "Sparkles",
    title: "Effortless to Clean",
    description:
      "A flat glass surface with no slats, folds, or fabric to collect dust — clean it exactly like any window.",
  },
  {
    icon: "Sun",
    title: "Everyday Comfort",
    description:
      "Switch to frosted to soften glare and direct sun on demand, without losing the light itself.",
  },
] as const;

export const applications = {
  residential: [
    { icon: "Bath", label: "Bathrooms" },
    { icon: "BedDouble", label: "Bedrooms" },
    { icon: "Sofa", label: "Living Rooms" },
    { icon: "Briefcase", label: "Home Offices" },
  ],
  commercial: [
    { icon: "Users", label: "Conference Rooms" },
    { icon: "PanelsTopLeft", label: "Office Partitions" },
    { icon: "Stethoscope", label: "Medical Offices" },
    { icon: "Building2", label: "Hotels" },
    { icon: "ShoppingBag", label: "Retail" },
    { icon: "Store", label: "Showrooms" },
  ],
} as const;

export const processSteps = [
  {
    number: "01",
    title: "Consultation",
    description:
      "Tell us about your space and goals. We'll talk through where Smart Film makes sense and what to expect.",
  },
  {
    number: "02",
    title: "Measure & Design",
    description:
      "We measure your glass precisely and plan the install — zoning, control placement, and finish details.",
  },
  {
    number: "03",
    title: "Professional Installation",
    description:
      "Our team installs your Smart Film cleanly and carefully, with minimal disruption to your space.",
  },
  {
    number: "04",
    title: "Enjoy Instant Privacy",
    description:
      "Flip the switch. Your glass now shifts between transparent and private, on demand, whenever you need it.",
  },
] as const;

export const galleryItems = [
  {
    type: "photo",
    src: "/media/smart-film-clear.jpg",
    caption: "Living room glazing — powered on, fully transparent",
  },
  {
    type: "photo",
    src: "/media/smart-film-frosted.jpg",
    caption: "Same installation — powered off, frosted privacy",
  },
  {
    type: "photo",
    src: "/media/living-room-clear.jpg",
    caption: "Bay window living room — powered on, fully transparent",
  },
  {
    type: "photo",
    src: "/media/living-room-frosted.jpg",
    caption: "Same room — powered off, frosted privacy",
  },
  {
    type: "photo",
    src: "/media/great-room-clear.jpg",
    caption: "Two-story great room glazing — powered on, clear view",
  },
  {
    type: "photo",
    src: "/media/great-room-frosted.jpg",
    caption: "Same great room — powered off, frosted privacy",
  },
  {
    type: "photo",
    src: "/media/bathroom-clear.jpg",
    caption: "Primary bathroom windows — powered on, clear view",
  },
  {
    type: "photo",
    src: "/media/bathroom-frosted.jpg",
    caption: "Same bathroom — powered off, instant privacy",
  },
  {
    type: "photo",
    src: "/media/exterior-frosted.jpg",
    caption: "Full-height exterior glazing — switched to frosted",
  },
  { type: "placeholder" },
  { type: "placeholder" },
] as const;

export const testimonials = [
  {
    quote:
      "This is a placeholder testimonial. Replace it with a real customer quote once you have one on file.",
    name: "Client Name",
    location: "City, State",
  },
  {
    quote:
      "This is a placeholder testimonial. Replace it with a real customer quote once you have one on file.",
    name: "Client Name",
    location: "City, State",
  },
  {
    quote:
      "This is a placeholder testimonial. Replace it with a real customer quote once you have one on file.",
    name: "Client Name",
    location: "City, State",
  },
] as const;

export const whyChooseUs = [
  {
    icon: "Wrench",
    title: "Professional Installation",
    description:
      "Every project is measured, planned, and installed by our own team — not subcontracted out.",
  },
  {
    icon: "ShieldCheck",
    title: "High-Quality Smart Film",
    description:
      "We use professional-grade PDLC film built for daily switching, not consumer-grade imitations.",
  },
  {
    icon: "Sparkles",
    title: "Clean, Careful Work",
    description:
      "Precise trimming and a tidy finish around every edge — installed like it's our own home.",
  },
  {
    icon: "MessageCircle",
    title: "Fast, Direct Communication",
    description:
      "You talk to the people doing the work — clear timelines, no runaround.",
  },
  {
    icon: "Building2",
    title: "Residential & Commercial",
    description:
      "From a single bathroom window to a full floor of office glass, scaled to fit the project.",
  },
  {
    icon: "Palette",
    title: "Custom Solutions",
    description:
      "Zoning, control placement, and even custom-branded film — tailored to your space.",
  },
] as const;

export const faqs = [
  {
    question: "What is Smart Film?",
    answer:
      "Smart Film is a PDLC (Polymer Dispersed Liquid Crystal) film applied to your existing glass. It switches electronically between a frosted, private state and a clear, transparent state.",
  },
  {
    question: "How does Smart Film work?",
    answer:
      "The film contains microscopic liquid crystals. Without power, they scatter light and the glass looks frosted. With a low-voltage current applied, the crystals align and the glass becomes clear.",
  },
  {
    question: "Can Smart Film be installed on existing glass?",
    answer:
      "Yes — Smart Film is applied directly to your existing glass. There's no need to replace windows or panels.",
  },
  {
    question: "Can I control it with a remote?",
    answer:
      "Yes. Depending on your setup, Smart Film can be controlled with a wall switch, a handheld remote, or a smart home app (including Alexa, Google Home, and Apple HomeKit).",
  },
  {
    question: "How much does Smart Film cost?",
    answer:
      "Pricing is based on square footage and the option you choose. Use the calculator above for an instant estimate, or request a free quote for exact pricing on your project.",
  },
  {
    question: "How long does installation take?",
    answer:
      "This varies by project size and glass configuration. We'll give you a time estimate during your consultation.",
  },
  {
    question: "Does Smart Film work at night?",
    answer:
      "Yes. Smart Film switches between clear and frosted regardless of the time of day — it controls privacy and light diffusion, not darkness.",
  },
  {
    question: "Can Smart Film be installed in bathrooms?",
    answer:
      "Yes, bathrooms are one of the most common applications for Smart Film, giving instant privacy without permanent frosting or curtains.",
  },
  {
    question: "Does Smart Film require electricity?",
    answer:
      "Yes. Smart Film requires a low-voltage electrical connection to switch to its clear state.",
  },
  {
    question: "What happens if the power goes out?",
    answer:
      "Without power, PDLC Smart Film returns to its frosted, private state. This is the natural, unpowered state of the film.",
  },
] as const;

export const pricingTiers = [
  {
    id: "diy",
    label: "DIY",
    subtitle: "Smart Film Only",
    pricePerSqFt: 30,
    description:
      "Professional-grade Smart Film, shipped to your door for self-installation.",
    features: [
      "Smart Film supplied",
      "Customer self-installation",
      "Great for hands-on DIY projects",
      "Professional-grade film",
    ],
    cta: "Choose DIY",
    featured: false,
  },
  {
    id: "pro",
    label: "Pro Install",
    subtitle: "Smart Film + Installation",
    pricePerSqFt: 43,
    description:
      "Smart Film supplied and professionally installed by our team, start to finish.",
    features: [
      "Smart Film supplied",
      "Professional installation",
      "Clean, finished installation",
      "Ideal for homes & businesses",
    ],
    cta: "Get Installation",
    featured: true,
  },
  {
    id: "custom",
    label: "Custom Brand",
    subtitle: "Custom Branded Smart Film",
    pricePerSqFt: 80,
    description:
      "A premium custom option — your logo or branding integrated into the film itself.",
    features: [
      "Custom-branded Smart Film",
      "Your logo / branding",
      "Professional installation",
      "Ideal for offices, showrooms & retail",
    ],
    cta: "Request Custom Quote",
    featured: false,
    startingPrice: true,
  },
] as const;
