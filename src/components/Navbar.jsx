import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/utils/cn';

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
            ? 'py-3 bg-background/80 backdrop-blur-md border-b border-black'
            : 'py-5 bg-transparent border-b border-transparent'
        )}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2" aria-label="Fulcrum System home">
            <span className="flex h-7 w-7 items-center justify-center bg-accent">
              <span className="h-2 w-2 bg-white" />
            </span>
            <span className="font-heading text-lg font-extrabold uppercase tracking-tight text-black">
              Fulcrum
            </span>
          </Link>

          {/* Desktop nav — bordered box */}
          <div className="hidden items-center md:flex">
            <div className="flex items-center border border-black">
              {navLinks.map((link, i) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'group relative px-5 py-2 text-xs uppercase tracking-[0.15em] font-heading font-bold text-black transition-colors hover:bg-accent hover:text-white',
                    i > 0 && 'border-l border-black'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              to="/contact"
              className="ml-3 bg-black px-5 py-2 text-xs uppercase tracking-[0.15em] font-heading font-bold text-white transition-colors hover:bg-accent"
            >
              Contact
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="flex h-10 w-10 items-center justify-center border border-black text-black md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
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
              className="font-heading text-3xl font-extrabold uppercase tracking-tight text-black transition-colors hover:text-accent"
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
            className="mt-6 bg-accent px-8 py-4 text-sm uppercase tracking-[0.15em] font-heading font-bold text-white"
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