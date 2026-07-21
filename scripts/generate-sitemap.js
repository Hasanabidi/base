import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import data using relative paths (works in Node.js)
const servicesModule = await import('../src/data/services.js');
const blogModule = await import('../src/data/blogPosts.js');
const siteConfigModule = await import('../src/data/siteConfig.js');

const { baseUrl } = siteConfigModule.default;
const services = servicesModule.services || servicesModule.default || [];
const blogPosts = blogModule.blogPosts || blogModule.default || [];

// Define static routes
const staticRoutes = [
  '',
  '/services',
  '/projects',
  '/about',
  '/contact',
  '/blog',
];

// Generate service routes
const serviceRoutes = services.map(service => `/services/${service.id}`);

// Generate blog routes
const blogRoutes = blogPosts.map(post => `/blog/${post.id}`);

// Combine all routes
const allRoutes = [...staticRoutes, ...serviceRoutes, ...blogRoutes];

// Generate XML
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes.map(route => {
    const url = `${baseUrl}${route}`;
    const lastMod = new Date().toISOString().split('T')[0];
    return `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : route.startsWith('/blog') ? '0.8' : '0.9'}</priority>
  </url>`;
  }).join('')}
</urlset>`;

// Write to public folder
const outputPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemapXml);

console.log('✅ Sitemap generated successfully at:', outputPath);
