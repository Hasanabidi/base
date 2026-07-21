import { services } from '../data/services.js';
import { blogPosts } from '../data/blogPosts.js';
import siteConfig from '../data/siteConfig.js';

/**
 * Vite plugin to generate sitemap.xml at build time
 * This ensures the sitemap is always up-to-date with current content
 */
export function sitemapPlugin() {
  return {
    name: 'vite-plugin-sitemap',
    apply: 'build',
    async writeBundle(options, bundle) {
      const fs = await import('fs');
      const path = await import('path');
      
      const baseDir = options.dir || 'dist';
      const today = new Date().toISOString().split('T')[0];
      
      // Generate URLs for all pages
      const urls = [
        // Homepage
        { loc: '/', changefreq: 'weekly', priority: '1.0' },
        
        // Main Pages
        { loc: '/services', changefreq: 'monthly', priority: '0.9' },
        { loc: '/work', changefreq: 'monthly', priority: '0.8' },
        { loc: '/about', changefreq: 'monthly', priority: '0.7' },
        { loc: '/contact', changefreq: 'yearly', priority: '0.7' },
        { loc: '/blog', changefreq: 'weekly', priority: '0.8' },
        
        // Service Detail Pages
        ...services.map(service => ({
          loc: `/services/${service.id}`,
          changefreq: 'monthly',
          priority: '0.8'
        })),
        
        // Blog Posts
        ...blogPosts.map(post => ({
          loc: `/blog/${post.slug}`,
          changefreq: 'yearly',
          priority: '0.7',
          lastmod: post.date
        }))
      ];
      
      // Generate XML
      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
      
      urls.forEach(url => {
        xml += `  <url>
    <loc>${siteConfig.url}${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : `<lastmod>${today}</lastmod>`}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>
`;
      });
      
      xml += `</urlset>`;
      
      // Write sitemap.xml to dist folder
      const sitemapPath = path.join(baseDir, 'sitemap.xml');
      fs.writeFileSync(sitemapPath, xml, 'utf-8');
      
      console.log(`✅ Sitemap generated at ${sitemapPath}`);
      console.log(`   Total URLs: ${urls.length}`);
    }
  };
}

export default sitemapPlugin;
