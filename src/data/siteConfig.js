// Centralized site configuration for SEO and metadata
export const siteConfig = {
  // Basic Info
  siteName: 'Fulcrum System',
  siteUrl: 'https://fulcrumsystem.com',
  defaultTitle: 'Fulcrum System | Web Development, Mobile Apps, SaaS, POS & Cybersecurity',
  defaultDescription: 'Full-service digital agency offering web development, mobile apps, SaaS platforms, POS software, financial services, tax filing, and cybersecurity solutions.',
  
  // Contact Info (for LocalBusiness schema)
  contact: {
    email: 'info@fulcrumsystem.com',
    phone: '+1-XXX-XXX-XXXX',
    address: {
      streetAddress: 'Your Street Address',
      addressLocality: 'City',
      addressRegion: 'State',
      postalCode: 'ZIP',
      addressCountry: 'US'
    }
  },
  
  // Social Media
  social: {
    twitter: '@fulcrumsystem',
    linkedin: 'company/fulcrum-system',
    facebook: 'fulcrumsystem',
    instagram: 'fulcrumsystem',
    github: 'fulcrumsystem'
  },
  
  // Default Images
  images: {
    og: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&q=80',
    logo: '/logo.png',
    favicon: '/favicon.ico'
  },
  
  // Business Hours (for LocalBusiness schema)
  openingHours: [
    'Mo-Fr 09:00-18:00',
    'Sa 10:00-14:00'
  ],
  
  // Same As URLs (for Organization schema)
  get sameAsUrls() {
    return [
      this.social.twitter ? `https://twitter.com/${this.social.twitter.replace('@', '')}` : null,
      this.social.linkedin ? `https://linkedin.com/company/${this.social.linkedin}` : null,
      this.social.facebook ? `https://facebook.com/${this.social.facebook}` : null,
      this.social.instagram ? `https://instagram.com/${this.social.instagram}` : null,
      this.social.github ? `https://github.com/${this.social.github}` : null,
    ].filter(Boolean);
  }
};

export default siteConfig;
