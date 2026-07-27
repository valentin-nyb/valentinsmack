export type Project = {
  title: string;
  category: string;
  href: string;
  image?: string;
  video?: string;
  description?: string;
  images?: string[];
};

function galleryFor(slug: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `/work/${slug}/${i + 1}.jpg`);
}

// Titles pulled from the existing myportfolio.com site.
export const projects: Project[] = [
  {
    title: "OffCut Productions",
    category: "Web Design and Dev",
    href: "https://valentinsmack.myportfolio.com",
    image: "/work/offcut-productions/1.jpg",
    images: galleryFor("offcut-productions", 6),
  },
  {
    title: "local / assets™",
    category: "Brand & Identity",
    href: "https://valentinsmack.myportfolio.com",
    image: "/work/local-assets/1.jpg",
    images: galleryFor("local-assets", 6),
  },
  {
    title: "TERRA.",
    category: "Brand & Identity",
    href: "https://valentinsmack.myportfolio.com",
    image: "/work/terra/1.jpg",
    video: "/work/terra/cover.mp4",
    images: galleryFor("terra", 7),
  },
  {
    title: "NOT YOUR BREW™",
    category: "Brand & Packaging",
    href: "https://valentinsmack.myportfolio.com",
    image: "/work/not-your-brew/1.jpg",
    images: galleryFor("not-your-brew", 9),
  },
  {
    title: "Olio",
    category: "Art Direction",
    href: "https://valentinsmack.myportfolio.com",
    image: "/work/olio/1.jpg",
    images: galleryFor("olio", 8),
  },
  {
    title: "CUADROS",
    category: "Visual Identity",
    href: "https://valentinsmack.myportfolio.com",
    image: "/work/cuadros/1.jpg",
    images: galleryFor("cuadros", 7),
  },
  {
    title: "DICTATOR",
    category: "Art Direction",
    href: "https://valentinsmack.myportfolio.com",
    image: "/work/dictator/1.jpg",
    images: galleryFor("dictator", 6),
  },
  {
    title: "HILARIDAD — La Juanita",
    category: "Campaign",
    href: "https://valentinsmack.myportfolio.com",
    image: "/work/hilaridad/1.jpg",
    images: galleryFor("hilaridad", 6),
  },
  {
    title: "Me Gustas Mucho",
    category: "Sony Music — Campaign",
    href: "https://valentinsmack.myportfolio.com",
    image: "/work/me-gustas-mucho/1.jpg",
    images: galleryFor("me-gustas-mucho", 5),
  },
  {
    title: "Cha Chá Takeover",
    category: "Sitrus Eyewear — Campaign",
    href: "https://valentinsmack.myportfolio.com",
    image: "/work/cha-cha-takeover/1.jpg",
    images: galleryFor("cha-cha-takeover", 13),
  },
];

export const services = [
  {
    title: "Brand & Identity",
    description:
      "Naming, logotype systems, and visual identity guidelines built to hold up across retail, packaging, and digital.",
  },
  {
    title: "Art Direction",
    description:
      "Directing photography, styling, and mood across campaigns and lookbooks — turning a concept into a coherent visual world.",
  },
  {
    title: "Web & Product Design",
    description:
      "Digital experiences and e-commerce design for fashion and retail brands, from concept through build.",
  },
  {
    title: "Packaging & Print",
    description:
      "Packaging systems, lookbooks, and print collateral designed to hold up in-store and in-hand.",
  },
  {
    title: "Campaigns",
    description:
      "Integrated campaign design across social, print, and digital for product launches and brand moments.",
  },
];

export const process = [
  { step: "01", title: "Discovery", description: "Brief, audit, and positioning — understanding the brand, the market, and the goal." },
  { step: "02", title: "Direction", description: "Concept development, mood, and art direction aligned to the brand's world." },
  { step: "03", title: "Design & Build", description: "Execution across identity, campaign, and digital touchpoints." },
  { step: "04", title: "Launch", description: "Delivery, handoff, and rollout across every channel." },
];

export type Package = {
  name: string;
  description: string;
  price: string;
  cadence?: string;
  features: string[];
  note?: string;
  featured?: boolean;
};

// PLACEHOLDER PRICING — these are illustrative numbers for laying out the
// section, not real rates. Replace name/price/features/note for each tier
// before this section is considered live.
export const packages: Package[] = [
  {
    name: "Brand Identity",
    description: "A complete identity system for a new or evolving brand.",
    price: "£2,500",
    cadence: "+ VAT",
    features: ["Logo & wordmark", "Colour & type system", "Brand guidelines"],
    note: "2 design directions / 2 rounds of revisions",
  },
  {
    name: "Website",
    description: "A bespoke, responsive site designed and built end to end.",
    price: "£4,000",
    cadence: "+ VAT",
    features: ["Up to 8 pages", "Responsive & SEO-ready", "CMS handoff"],
    note: "2 design directions / 2 rounds of revisions",
    featured: true,
  },
  {
    name: "Design Retainer",
    description: "Ongoing creative support without the overhead of hiring.",
    price: "£1,200",
    cadence: "per month + VAT",
    features: ["Up to 15 hours / month", "Priority turnaround", "Brand, campaign & web work"],
    note: "Month-to-month, cancel anytime",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// Empty until real client quotes are supplied — the Testimonials section
// doesn't render when this is empty.
export const testimonials: Testimonial[] = [];
