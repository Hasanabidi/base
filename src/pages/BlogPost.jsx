import { useLayoutEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import CTASection from '@/sections/CTASection';
import { blogPosts } from '@/data/blogPosts';

gsap.registerPlugin(ScrollTrigger);

export default function BlogPost() {
  const { slug } = useParams();
  const root = useRef(null);

  const post = blogPosts.find((p) => p.slug === slug);
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const nextPost = blogPosts[currentIndex + 1] || blogPosts[0];

  useLayoutEffect(() => {
    if (!post) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="post-header"]', {
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });
      gsap.from('[data-anim="post-content"] > *', {
        opacity: 0, y: 20, stagger: 0.08, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-anim="post-content"]', start: 'top 80%' },
      });
    }, root);
    return () => ctx.revert();
  }, [slug]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div ref={root} className="pt-32">
      {/* Article header */}
      <article>
        <section className="relative py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <div data-anim="post-header">
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent">
                <ArrowLeft size={14} /> Back to insights
              </Link>

              <div className="mt-8">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-accent">
                  {post.category}
                </span>
              </div>

              <h1 className="mt-6 font-heading text-display text-white">
                {post.title}
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-text-secondary">
                {post.excerpt}
              </p>

              <div className="mt-8 flex items-center gap-6 border-t border-white/[0.06] pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-accent/5">
                  <span className="text-sm font-medium text-accent">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="text-sm text-white">{post.author}</div>
                  <div className="flex items-center gap-3 text-xs text-text-secondary/60">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero image */}
        <section className="relative">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <div className="relative aspect-[21/9] overflow-hidden rounded-3xl">
              <img src={post.heroImage} alt={post.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
          </div>
        </section>

        {/* Article body */}
        <section className="relative py-20">
          <div data-anim="post-content" className="mx-auto max-w-3xl px-6 lg:px-10">
            {post.content.map((block, i) => {
              if (block.type === 'heading') {
                return (
                  <h2 key={i} className="mt-12 mb-4 font-heading text-2xl font-medium text-white">
                    {block.text}
                  </h2>
                );
              }
              return (
                <p key={i} className="mb-6 text-base leading-relaxed text-text-secondary">
                  {block.text}
                </p>
              );
            })}

            {/* Author footer */}
            <div className="mt-16 flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-accent/5">
                <span className="text-sm font-medium text-accent">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <div className="text-sm text-white">{post.author}</div>
                <div className="text-xs text-text-secondary">Engineer at Fulcrum System</div>
              </div>
            </div>
          </div>
        </section>

        {/* Next article */}
        {nextPost && nextPost.slug !== post.slug && (
          <section className="relative py-12">
            <div className="mx-auto max-w-3xl px-6 lg:px-10">
              <Link to={`/blog/${nextPost.slug}`}>
                <div className="group flex items-center justify-between rounded-2xl glass-panel glass-panel-hover p-8">
                  <div>
                    <div className="text-xs text-text-secondary/60">Next article</div>
                    <h3 className="mt-2 font-heading text-xl font-medium text-white transition-colors group-hover:text-accent">
                      {nextPost.title}
                    </h3>
                  </div>
                  <ArrowRight size={20} className="text-accent transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </div>
          </section>
        )}
      </article>

      <CTASection />
    </div>
  );
}