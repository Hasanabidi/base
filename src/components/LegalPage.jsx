import SectionLabel from '@/components/SectionLabel';
import SEO from '@/components/SEO';

export default function LegalPage({ label, title, description, path, updated, sections }) {
  return (
    <div className="pt-32">
      <SEO title={title} description={description} path={path} />

      {/* Header */}
      <section className="relative py-20 md:py-28">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 lg:px-10">
          <SectionLabel>{label}</SectionLabel>
          <h1 className="mt-6 font-heading text-section uppercase text-black">{title}</h1>
          <p className="mt-6 text-sm uppercase tracking-[0.15em] text-text-secondary">
            Last updated: {updated}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary">
            {description}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="relative pb-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="space-y-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-soft md:p-12">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-heading text-xl font-extrabold uppercase text-black">
                  {section.heading}
                </h2>
                {section.body.map((paragraph, i) => (
                  <p key={i} className="mt-4 text-sm leading-relaxed text-text-secondary">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-4 space-y-2">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm leading-relaxed text-text-secondary"
                      >
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
