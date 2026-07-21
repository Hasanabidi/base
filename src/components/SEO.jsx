import { useEffect } from 'react';
import siteConfig from '@/data/siteConfig';

const SITE_URL = siteConfig.url;
const SITE_NAME = siteConfig.name;
const DEFAULT_DESC = siteConfig.description;
const DEFAULT_OG_IMAGE = siteConfig.images.og;
const KEYWORDS = siteConfig.keywords.join(', ');

function upsertMeta(attr, key, content, nameAttr = 'name') {
  if (!content) return;
  let el = document.head.querySelector(`meta[${nameAttr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(nameAttr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function SEO({ 
  title, 
  description, 
  path = '/', 
  image, 
  jsonLd, 
  article,
  breadcrumbs,
  noIndex = false,
  noFollow = false
}) {
  const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : (jsonLd ? [jsonLd] : []);
  
  // Add article schema if provided
  if (article) {
    jsonLdArray.push({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "image": image || DEFAULT_OG_IMAGE,
      "author": {
        "@type": "Person",
        "name": article.author
      },
      "datePublished": article.datePublished,
      "dateModified": article.dateModified || article.datePublished,
      "publisher": {
        "@type": "Organization",
        "name": SITE_NAME,
        "logo": {
          "@type": "ImageObject",
          "url": siteConfig.images.logo
        }
      }
    });
  }
  
  // Add breadcrumbs schema if provided
  if (breadcrumbs && breadcrumbs.length > 0) {
    jsonLdArray.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `${SITE_URL}${crumb.path}`
      }))
    });
  }
  
  const jsonLdString = jsonLdArray.length > 0 ? JSON.stringify(jsonLdArray) : null;

  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} | ${siteConfig.tagline}`;
    const canonical = `${SITE_URL}${path}`;
    const desc = description || DEFAULT_DESC;
    const ogImage = image || DEFAULT_OG_IMAGE;

    document.title = fullTitle;
    
    // Basic meta tags
    upsertMeta('name', 'description', desc);
    upsertMeta('name', 'keywords', KEYWORDS);
    
    // Robots meta for noIndex/noFollow
    if (noIndex || noFollow) {
      const robotsContent = [
        noIndex ? 'noindex' : 'index',
        noFollow ? 'nofollow' : 'follow'
      ].join(', ');
      upsertMeta('name', 'robots', robotsContent);
    }
    
    // Open Graph tags
    upsertMeta('property', 'og:title', fullTitle, 'property');
    upsertMeta('property', 'og:description', desc, 'property');
    upsertMeta('property', 'og:url', canonical, 'property');
    upsertMeta('property', 'og:image', ogImage, 'property');
    upsertMeta('property', 'og:type', article ? 'article' : 'website', 'property');
    upsertMeta('property', 'og:site_name', SITE_NAME, 'property');
    upsertMeta('property', 'og:locale', 'en_US', 'property');
    
    // Twitter Card tags
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', ogImage);
    upsertMeta('name', 'twitter:site', '@fulcrumsystem');
    
    // Additional SEO tags
    upsertMeta('name', 'author', SITE_NAME);
    upsertMeta('name', 'generator', 'Built by ' + siteConfig.developer.name);
    
    // Canonical URL
    upsertCanonical(canonical);

    // JSON-LD Schema
    const scriptId = 'page-jsonld';
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    if (jsonLdString) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.textContent = jsonLdString;
      document.head.appendChild(script);
    }

    return () => {
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, [title, description, path, image, jsonLdString, article, breadcrumbs, noIndex, noFollow]);

  return null;
}