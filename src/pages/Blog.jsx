import { useState, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import CTASection from '@/sections/CTASection';
import { blogPosts, blogCategories } from '@/data/blogPosts';

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const root = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="blog-header"]', {
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div ref={root} className="pt-32">
      {/* Header */}
      <section className="relative py-20 md:py-32">
        <div className="grid-bg absolute inset-0" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div data-anim="blog-header">
            <SectionLabel>Insights</SectionLabel>
            <h1 className="mt-6 font-heading text-hero uppercase text-black">
              Engineering<br />
              <span className="text-gradient">perspectives.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-text-secondary">
              Field notes from the intersection of AI, software architecture, and design.
              Written by the engineers building production systems — not theorizing about them.
            </p>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="relative py-8">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex flex-wrap gap-2">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg px-4 py-2 text-xs uppercase tracking-[0.15em] font-heading font-bold transition-all duration-300 border border-slate-200 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white border-transparent shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="relative py-8">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <Link to={`/blog/${featured.slug}`}>
              <div className="group grid gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft md:grid-cols-2">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={featured.heroImage}
                    alt={featured.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs uppercase tracking-[0.15em] font-heading font-bold text-slate-900 shadow-soft">
                      {featured.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <div className="flex items-center gap-4 text-xs text-text-secondary">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {featured.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {featured.readTime}</span>
                  </div>
                  <h2 className="mt-4 font-heading text-3xl font-extrabold uppercase text-black transition-colors group-hover:text-accent">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">{featured.excerpt}</p>
                  <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-heading font-bold text-accent">
                    Read article
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Rest of posts */}
      <section className="relative py-12">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`}>
                <div className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition-colors hover:bg-slate-50">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.heroImage}
                      alt={post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs uppercase tracking-[0.15em] font-heading font-bold text-slate-900 shadow-soft">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-text-secondary">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="mt-3 font-heading text-lg font-extrabold uppercase text-black transition-colors group-hover:text-accent">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-2">{post.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}