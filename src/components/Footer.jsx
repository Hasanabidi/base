import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Work', to: '/work' },
    { label: 'Insights', to: '/blog' },
  ],
  Services: [
    { label: 'AI Automation', to: '/services' },
    { label: 'Web Engineering', to: '/services' },
    { label: 'Digital Design', to: '/services' },
    { label: 'Strategy Call', to: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/contact' },
    { label: 'Terms of Service', to: '/contact' },
    { label: 'Cookie Policy', to: '/contact' },
  ],
};

const socials = [
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-core/30">
      <div className="grid-bg absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="group flex items-center gap-3">
              <span className="relative flex h-3 w-3 items-center justify-center">
                <span className="absolute h-3 w-3 rounded-full bg-accent animate-pulse-glow" />
                <span className="absolute h-1 w-1 rounded-full bg-accent-glow" />
              </span>
              <span className="font-heading text-lg font-medium tracking-tight text-white">
                FULCRUM
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-text-secondary">
              Engineering leverage from complexity. AI automation, digital systems, and high-performance software built to scale.
            </p>
            <div className="mt-8 flex items-center gap-4">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-text-secondary transition-all duration-300 hover:border-accent/50 hover:text-accent hover:shadow-[0_0_20px_rgba(199,255,58,0.2)]"
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
              <h4 className="font-heading text-xs uppercase tracking-widest text-text-secondary/60">
                {category}
              </h4>
              <ul className="mt-6 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-white"
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

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-text-secondary/60">
            © 2025 Fulcrum System. All rights reserved.
          </p>
          <p className="font-mono text-xs text-text-secondary/40">
            Engineered with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}