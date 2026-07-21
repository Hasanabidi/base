import siteConfig from '@/data/siteConfig';

/**
 * Generate LocalBusiness JSON-LD schema for the homepage
 * This helps with local SEO and Google Business Profile integration
 */
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": siteConfig.name,
  "description": siteConfig.description,
  "url": siteConfig.url,
  "telephone": siteConfig.contact.phone,
  "email": siteConfig.contact.email,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": siteConfig.contact.address.street,
    "addressLocality": siteConfig.contact.address.city,
    "addressRegion": siteConfig.contact.address.state,
    "postalCode": siteConfig.contact.address.postalCode,
    "addressCountry": siteConfig.contact.address.country
  },
  "geo": {
    "@type": "GeoCoordinates",
    // TODO: Add actual latitude and longitude
    "latitude": "37.7749",
    "longitude": "-122.4194"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "priceRange": siteConfig.priceRange,
  "image": siteConfig.images.logo,
  "logo": siteConfig.images.logo,
  "sameAs": [
    siteConfig.social.twitter,
    siteConfig.social.linkedin,
    siteConfig.social.github,
    siteConfig.social.facebook,
    siteConfig.social.instagram
  ],
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Our Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Web Development & Design",
          "description": "Shopify, Wix, Framer, Next.js, React, and custom web development"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mobile Apps & Games",
          "description": "iOS and Android app development, Android game development"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "SaaS Applications",
          "description": "Multi-tenant SaaS platform development with subscription billing"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "POS Software",
          "description": "Custom point-of-sale systems for retail, restaurants, and service businesses"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Financial Services",
          "description": "Corporate tax filing, personal tax preparation, bookkeeping, and auditing"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Cyber Security",
          "description": "Penetration testing, vulnerability assessments, security audits"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    // TODO: Update with actual ratings
    "ratingValue": "4.9",
    "reviewCount": "50",
    "bestRating": "5",
    "worstRating": "1"
  }
};

/**
 * Generate Organization schema
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": siteConfig.name,
  "url": siteConfig.url,
  "logo": siteConfig.images.logo,
  "description": siteConfig.description,
  "foundingDate": siteConfig.foundingDate,
  "founders": [
    {
      "@type": "Person",
      // TODO: Add actual founder names
      "name": "Founder Name"
    }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": siteConfig.contact.phone,
    "contactType": "customer service",
    "email": siteConfig.contact.email,
    "availableLanguage": "English"
  },
  "sameAs": [
    siteConfig.social.twitter,
    siteConfig.social.linkedin,
    siteConfig.social.github,
    siteConfig.social.facebook,
    siteConfig.social.instagram
  ],
  "employee": siteConfig.employees,
  "knowsAbout": siteConfig.keywords
};

/**
 * Generate Website schema
 */
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": siteConfig.name,
  "url": siteConfig.url,
  "description": siteConfig.description,
  "publisher": {
    "@type": "Organization",
    "name": siteConfig.name,
    "logo": {
      "@type": "ImageObject",
      "url": siteConfig.images.logo
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${siteConfig.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  },
  "inLanguage": "en-US"
};

/**
 * Generate BreadcrumbList schema helper
 * @param {Array} items - Array of { name, path } objects
 */
export const generateBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `${siteConfig.url}${item.path}`
  }))
});

/**
 * Generate FAQ schema helper
 * @param {Array} faqs - Array of { question, answer } objects
 */
export const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

/**
 * Generate Service schema for individual service pages
 * @param {Object} service - Service object from services.js
 */
export const generateServiceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.title,
  "description": service.description,
  "provider": {
    "@type": "Organization",
    "name": siteConfig.name,
    "url": siteConfig.url
  },
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": `${service.title} Features`,
    "itemListElement": service.features.map((feature, index) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": feature
      }
    }))
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "USD",
    // TODO: Add actual pricing or remove if custom quotes
    "price": "Contact for Quote"
  }
});

/**
 * Generate BlogPosting schema for blog posts
 * @param {Object} post - Blog post object from blogPosts.js
 */
export const generateBlogPostingSchema = (post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.excerpt,
  "image": post.heroImage,
  "author": {
    "@type": "Person",
    "name": post.author
  },
  "datePublished": post.date,
  "dateModified": post.date,
  "publisher": {
    "@type": "Organization",
    "name": siteConfig.name,
    "logo": {
      "@type": "ImageObject",
      "url": siteConfig.images.logo
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${siteConfig.url}/blog/${post.slug}`
  },
  "articleSection": post.category,
  "wordCount": post.readTime,
  "keywords": siteConfig.keywords.join(', ')
});

/**
 * Generate Project/Portfolio schema
 * @param {Object} project - Project object
 */
export const generateProjectSchema = (project) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": project.title,
  "description": project.description,
  "image": project.images?.[0] || project.heroImage,
  "author": {
    "@type": "Organization",
    "name": siteConfig.name
  },
  "datePublished": project.date,
  "url": `${siteConfig.url}/work/${project.slug}`,
  "keywords": project.tags?.join(', ') || ''
});

export default {
  localBusinessJsonLd,
  organizationJsonLd,
  websiteJsonLd,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateServiceSchema,
  generateBlogPostingSchema,
  generateProjectSchema
};
