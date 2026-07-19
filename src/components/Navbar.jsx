import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import ThemeToggle from '@/components/ThemeToggle';
import Logo from '@/components/Logo';

const navLinks = [
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/blog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-500',
          scrolled
            ? 'py-3 bg-background/80 backdrop-blur-md border-b border-slate-200 shadow-soft'
            : 'py-5 bg-transparent border-b border-transparent'
        )}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-10" aria-label="Primary">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2" aria-label="Fulcrum System home">
            <Logo size={28} className="transition-transform duration-300 group-hover:-rotate-6" />
            <span className="font-heading text-lg font-extrabold uppercase tracking-tight text-slate-900">
              Fulcrum
            </span>
          </Link>

          {/* Desktop nav — bordered box */}
          <div className="hidden items-center md:flex">
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-soft">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={location.pathname === link.to ? 'page' : undefined}
                  className="rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.15em] font-heading font-bold text-slate-600 transition-colors hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <ThemeToggle className="ml-3" />
            <Link
              to="/contact"
              aria-label="Contact Fulcrum System"
              className="ml-3 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 px-5 py-2 text-xs uppercase tracking-[0.15em] font-heading font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              Contact
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        id="mobile-nav-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          'fixed inset-0 z-[99] bg-background transition-all duration-500 md:hidden',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex h-full flex-col items-center justify-center gap-2">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-heading text-3xl font-extrabold uppercase tracking-tight text-slate-900 transition-colors hover:text-indigo-500"
              style={{
                transitionDelay: menuOpen ? `${i * 60}ms` : '0ms',
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: menuOpen ? 1 : 0,
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-6 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 px-8 py-4 text-sm uppercase tracking-[0.15em] font-heading font-bold text-white shadow-lg shadow-indigo-500/25"
            style={{
              transitionDelay: menuOpen ? '300ms' : '0ms',
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: menuOpen ? 1 : 0,
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Contact
          </Link>
        </div>
      </div>
    </>
  );
}