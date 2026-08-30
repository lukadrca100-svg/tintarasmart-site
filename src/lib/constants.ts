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
