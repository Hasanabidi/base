export const SITE_URL = 'https://fulcrumsystem.com';
export const SITE_NAME = 'Fulcrum System';
export const SITE_TAGLINE =
  'Web Development, Mobile Apps, SaaS, POS & Cybersecurity';

export const DEFAULT_DESCRIPTION =
  'Full-service digital agency offering web development, mobile apps, SaaS platforms, POS software, financial services, tax filing, and cybersecurity solutions.';

export const DEFAULT_OG_IMAGE =
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&q=80';

export const CONTACT = {
  email: 'abidi113@gmail.com',
  phone: '+92-303-2422542',
  phoneDisplay: '+92 303 2422542',
  whatsapp: '923032422542',
  address: {
    street: 'A-113, Adnan Khalil St, Block 4, Gulshan-e-Iqbal',
    locality: 'Karachi',
    postalCode: '75300',
    country: 'PK',
    full: 'A-113, Adnan Khalil St, Block 4, Gulshan-e-Iqbal, Karachi 75300, Pakistan',
  },
};

export const SOCIAL_LINKS = [
  'https://www.facebook.com/fulcrumsystem',
  'https://www.instagram.com/fulcrumsystems/',
  'https://www.linkedin.com/company/78707068',
];

export const AGENCY_CAPABILITIES = [
  'Web Development',
  'Web Design',
  'Shopify E-commerce',
  'Wix Studio',
  'Framer Design',
  'GoHighLevel',
  'Next.js Development',
  'React Development',
  'Mobile App Development',
  'Android Game Development',
  'SaaS Application Development',
  'POS Software Development',
  'Accounting Services',
  'Tax Filing',
  'Bookkeeping',
  'Cybersecurity',
  'Penetration Testing',
  'AI Automation & Agents',
  'Technical SEO, GEO & AEO Optimization',
];

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  image: DEFAULT_OG_IMAGE,
  description: DEFAULT_DESCRIPTION,
  email: CONTACT.email,
  telephone: CONTACT.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACT.address.street,
    addressLocality: CONTACT.address.locality,
    postalCode: CONTACT.address.postalCode,
    addressCountry: CONTACT.address.country,
  },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: 24.9207, longitude: 67.0656 },
    geoRadius: '50000000',
  },
  sameAs: SOCIAL_LINKS,
  knowsAbout: AGENCY_CAPABILITIES,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital Agency Services',
    itemListElement: AGENCY_CAPABILITIES.slice(0, 9).map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name },
    })),
  },
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};
