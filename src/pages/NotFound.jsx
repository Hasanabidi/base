import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Search } from 'lucide-react';
import gsap from 'gsap';
import SEO from '@/components/SEO';

export default function NotFound() {
  useEffect(() => {
    gsap.from('[data-anim="404-hero"]', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    });
    gsap.from('[data-anim="404-content"]', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Let's get you back on track."
        path="/404"
      />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Decorative background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute right-10 top-20 h-96 w-96 rounded-full bg-indigo-300/10 blur-3xl" />
          <div className="absolute left-10 bottom-10 h-80 w-80 rounded-full bg-violet-300/10 blur-3xl" />
        </div>

        <div className="text-center">
          {/* Hero */}
          <div data-anim="404-hero" className="mb-12">
            <div className="mb-8 inline-block">
              <div className="rounded-2xl border border-slate-200 bg-white px-6 py-3 shadow-soft">
                <span className="font-mono text-sm font-bold text-accent">Error 404</span>
              </div>
            </div>
            <h1 className="font-heading text-7xl font-extrabold uppercase text-black md:text-8xl">
              <span className="text-gradient">Lost?</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary md:text-xl">
              The page you're looking for doesn't exist. But don't worry—we'll get you back on track.
            </p>
          </div>

          {/* Content & Links */}
          <div data-anim="404-content">
            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              {/* Home Link */}
              <Link
                to="/"
                className="group relative flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-8 py-6 shadow-soft transition-all hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <Home size={20} className="text-accent" />
                <div className="text-left">
                  <div className="text-xs uppercase tracking-[0.15em] font-heading font-bold text-text-secondary">
                    Go to
                  </div>
                  <div className="font-heading font-bold text-black">Homepage</div>
                </div>
                <ArrowRight size={16} className="ml-auto text-accent transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Services Link */}
              <Link
                to="/services"
                className="group relative flex items-center justify-center gap-3 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 px-8 py-6 shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/40"
              >
                <Search size={20} className="text-white" />
                <div className="text-left">
                  <div className="text-xs uppercase tracking-[0.15em] font-heading font-bold text-white/80">
                    Explore our
                  </div>
                  <div className="font-heading font-bold text-white">Services</div>
                </div>
                <ArrowRight size={16} className="ml-auto text-white transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Additional Links */}
            <div className="mt-12 border-t border-slate-200 pt-8">
              <p className="mb-6 text-sm text-text-secondary">Quick navigation:</p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { href: '/work', label: 'Portfolio' },
                  { href: '/about', label: 'About' },
                  { href: '/blog', label: 'Blog' },
                  { href: '/contact', label: 'Contact' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-heading font-bold text-slate-700 shadow-soft transition-all hover:border-indigo-300 hover:text-indigo-600"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Help Text */}
            <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm text-text-secondary">
                Still stuck? <Link to="/contact" className="font-bold text-accent hover:underline">Get in touch</Link> and our team will point you in the right direction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
