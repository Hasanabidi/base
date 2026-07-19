import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';
import Logo from '@/components/Logo';

const footerLinks = {
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Work', to: '/work' },
    { label: 'Insights', to: '/blog' },
  ],
  Services: [
    { label: 'Web Development', to: '/services' },
    { label: 'Mobile Apps & Games', to: '/services' },
    { label: 'SaaS & POS Software', to: '/services' },
    { label: 'Financial & Tax', to: '/services' },
    { label: 'Cybersecurity', to: '/services' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Cookie Policy', to: '/cookies' },
  ],
};

const socials = [
  { icon: Facebook, href: 'https://www.facebook.com/fulcrumsystem', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/fulcrumsystems/', label: 'Instagram' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/78707068', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-black bg-white">
      <div className="grid-bg absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="group flex items-center gap-2" aria-label="Fulcrum System home">
              <Logo size={28} className="transition-transform duration-300 group-hover:-rotate-6" />
              <span className="font-heading text-lg font-extrabold uppercase tracking-tight text-slate-900">
                Fulcrum
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-text-secondary">
              Web development, mobile apps, SaaS platforms, POS software, financial services, and cybersecurity — all under one roof.
            </p>
            <div className="mt-8 flex items-center gap-2">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-soft transition-all duration-300 hover:bg-accent hover:text-white hover:border-transparent"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-heading text-xs uppercase tracking-[0.2em] font-bold text-black">
                {category}
              </h4>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-accent"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 transition-all duration-300 group-hover:opacity-100"
                        style={{ transform: 'translate(-4px, 4px)' }}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-black pt-6 sm:flex-row">
          <p className="text-xs uppercase tracking-[0.15em] text-text-secondary">
            © 2026 Fulcrum System. All rights reserved.
          </p>
          <p className="font-mono text-xs text-text-secondary">
            Engineered with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}