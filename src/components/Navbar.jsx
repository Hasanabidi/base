import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import MagneticButton from './MagneticButton';

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
            ? 'py-3 bg-background/70 backdrop-blur-xl border-b border-white/[0.06]'
            : 'py-5 bg-transparent'
        )}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-10">
          <Link to="/" className="group flex items-center gap-3" aria-label="Fulcrum System home">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute h-3 w-3 rounded-full bg-accent animate-pulse-glow" />
              <span className="absolute h-1 w-1 rounded-full bg-accent-glow" />
            </span>
            <span className="font-heading text-lg font-medium tracking-tight text-white">
              FULCRUM
            </span>
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group relative text-sm text-text-secondary transition-colors hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <MagneticButton to="/contact" variant="primary" className="text-xs">
              Start Your Transformation
            </MagneticButton>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center text-white md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-[99] bg-background/95 backdrop-blur-2xl transition-all duration-500 md:hidden',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-heading text-3xl font-medium text-white transition-colors hover:text-accent"
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
            className="mt-4 rounded-full bg-accent px-8 py-4 text-sm font-medium text-background"
            style={{
              transitionDelay: menuOpen ? '300ms' : '0ms',
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: menuOpen ? 1 : 0,
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Start Your Transformation
          </Link>
        </div>
      </div>
    </>
  );
}