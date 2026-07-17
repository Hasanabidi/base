import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import CTASection from '@/sections/CTASection';
import SEO from '@/components/SEO';
import { useGsapContext } from '@/hooks/useGsapContext';
import { revealOnScroll } from '@/lib/animations';
import { blogPosts } from '@/data/blogPosts';

export default function BlogPost() {
  const { slug } = useParams();

  const post = blogPosts.find((p) => p.slug === slug);
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const nextPost = blogPosts[currentIndex + 1] || blogPosts[0];

  const root = useGsapContext((el) => {
    if (!post) return;
    revealOnScroll('[data-anim="post-header"]', { trigger: el, start: 'top 75%', y: 30, duration: 0.8 });
    revealOnScroll('[data-anim="post-content"] > *', { trigger: '[data-anim="post-content"]', y: 20, stagger: 0.08, duration: 0.6 });
  }, [slug]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div ref={root} className="pt-32">
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.heroImage}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "datePublished": post.date,
          "author": { "@type": "Person", "name": post.author },
          "image": post.heroImage,
          "publisher": { "@type": "Organization", "name": "Fulcrum System" }
        }}
      />
      <article>
        {/* Article header */}
        <section className="relative py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <div data-anim="post-header">
              <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-heading font-bold text-black transition-colors hover:text-accent">
                <ArrowLeft size={14} /> Back to insights
              </Link>

              <div className="mt-8">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs uppercase tracking-[0.15em] font-heading font-bold text-indigo-500 shadow-soft">
                  {post.category}
                </span>
              </div>

              <h1 className="mt-6 font-heading text-display uppercase text-black">
                {post.title}
              </h1>

              <p className="mt-6 text-base leading-relaxed text-text-secondary">
                {post.excerpt}
              </p>

              <div className="mt-8 flex items-center gap-6 border-t border-slate-200 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-transparent bg-gradient-to-br from-indigo-500 to-violet-600">
                  <span className="text-sm font-heading font-bold text-white">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-heading font-bold text-black">{post.author}</div>
                  <div className="flex items-center gap-3 text-xs text-text-secondary">
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
            <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-slate-200 shadow-soft">
              <img src={post.heroImage} alt={post.title} className="h-full w-full object-cover" />
            </div>
          </div>
        </section>

        {/* Article body */}
        <section className="relative py-20">
          <div data-anim="post-content" className="mx-auto max-w-3xl px-6 lg:px-10">
            {post.content.map((block, i) => {
              if (block.type === 'heading') {
                return (
                  <h2 key={i} className="mt-12 mb-4 font-heading text-2xl font-extrabold uppercase text-black">
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
            <div className="mt-16 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-transparent bg-gradient-to-br from-indigo-500 to-violet-600">
                <span className="text-sm font-heading font-bold text-white">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <div className="text-sm font-heading font-bold text-black">{post.author}</div>
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
                <div className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-soft transition-colors hover:bg-slate-50">
                  <div>
                    <div className="text-xs uppercase tracking-[0.15em] text-text-secondary">Next article</div>
                    <h3 className="mt-2 font-heading text-xl font-extrabold uppercase text-black transition-colors group-hover:text-accent">
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