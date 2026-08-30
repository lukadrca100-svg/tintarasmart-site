/**
 * Central site content. Replace the placeholder values below with your real
 * business details — everything here flows through to the nav, footer,
 * schema/SEO metadata, and contact section automatically.
 */

export const business = {
  // TODO: replace with your real business name
  name: "[Your Business Name]",
  shortName: "[Brand]",
  tagline: "Smart Privacy Glass, Engineered for Modern Spaces",
  // TODO: replace with your real service area, e.g. "Greater Austin, TX"
  serviceArea: "[Your Service Area]",
  // TODO: replace with a real phone number
  phone: "(000) 000-0000",
  phoneHref: "tel:+10000000000",
  // TODO: replace with a real lead email
  email: "quotes@yourdomain.com",
  // Leave as-is if you operate service-area-only with no public storefront
  address: null as string | null,
  hours: "Mon–Fri, 8am–6pm",
  social: {
    instagram: "#",
    facebook: "#",
    google: "#",
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
