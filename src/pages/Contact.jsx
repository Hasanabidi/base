import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Mail, Phone, MapPin } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import MagneticButton from '@/components/MagneticButton';
import SEO from '@/components/SEO';

const budgetRanges = ['< $10K', '$10K – $50K', '$50K – $100K', '$100K+'];
const serviceTypes = ['Web Development', 'Mobile Apps', 'SaaS / POS', 'Financial Services', 'Cybersecurity', 'Full Project'];

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mzdnewak';

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', message: '',
    budget: '', serviceType: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!FORMSPREE_ENDPOINT) {
      setErrorMsg('The contact form is not configured yet. Please email us directly at hello@fulcrumsystem.com.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          service: form.serviceType,
          budget: form.budget,
          message: form.message,
          _subject: `New inquiry from ${form.name || 'website'}`,
        }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data?.errors?.[0]?.message || 'Something went wrong. Please try again or email us directly.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again or email us directly.');
      setStatus('error');
    }
  };

  const submitting = status === 'submitting';

  return (
    <div className="pt-32">
      <SEO
        title="Contact"
        description="Get in touch with Fulcrum System for web development, mobile apps, SaaS platforms, POS software, financial services, or cybersecurity solutions."
        path="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Fulcrum System",
          "url": "https://fulcrumsystem.com/contact"
        }}
      />
      {/* Header */}
      <section className="relative py-20 md:py-32">
        <div className="grid-bg absolute inset-0" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="mt-6 font-heading text-hero uppercase text-black">
            Let's build<br />
            <span className="text-gradient">something.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-text-secondary">
            Tell us about your systems, your goals, and the complexity you're navigating.
            We'll respond within 24 hours with a clear path forward.
          </p>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="relative py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            {/* Form */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft md:p-12">
              {status === 'success' ? (
                <div className="flex h-full flex-col items-center justify-center py-20 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-transparent bg-gradient-to-br from-indigo-500 to-violet-600 shadow-glow">
                    <Check size={28} className="text-white" />
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-extrabold uppercase text-black">Message received.</h3>
                  <p className="mt-3 text-sm text-text-secondary">
                    We'll be in touch within 24 hours. In the meantime, explore our work.
                  </p>
                  <MagneticButton to="/work" variant="secondary" className="mt-8">
                    View Our Work
                  </MagneticButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs uppercase tracking-[0.15em] font-heading font-bold text-black">Name</label>
                      <input
                        type="text" name="name" required value={form.name} onChange={handleChange}
                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs uppercase tracking-[0.15em] font-heading font-bold text-black">Email</label>
                      <input
                        type="email" name="email" required value={form.email} onChange={handleChange}
                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10"
                        placeholder="jane@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.15em] font-heading font-bold text-black">Company</label>
                    <input
                      type="text" name="company" value={form.company} onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10"
                      placeholder="Acme Inc."
                    />
                  </div>

                  {/* Service type */}
                  <div>
                    <label className="mb-3 block text-xs uppercase tracking-[0.15em] font-heading font-bold text-black">Service</label>
                    <div className="flex flex-wrap gap-2">
                      {serviceTypes.map((s) => (
                        <button
                          key={s} type="button"
                          onClick={() => setForm({ ...form, serviceType: s })}
                          className={`rounded-lg px-4 py-2 text-xs uppercase tracking-[0.15em] font-heading font-bold border border-slate-200 transition-all duration-300 ${
                            form.serviceType === s
                              ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white border-transparent shadow-sm'
                              : 'bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="mb-3 block text-xs uppercase tracking-[0.15em] font-heading font-bold text-black">Budget</label>
                    <div className="flex flex-wrap gap-2">
                      {budgetRanges.map((b) => (
                        <button
                          key={b} type="button"
                          onClick={() => setForm({ ...form, budget: b })}
                          className={`rounded-lg px-4 py-2 text-xs uppercase tracking-[0.15em] font-heading font-bold border border-slate-200 transition-all duration-300 ${
                            form.budget === b
                              ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white border-transparent shadow-sm'
                              : 'bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.15em] font-heading font-bold text-black">Message</label>
                    <textarea
                      name="message" required value={form.message} onChange={handleChange} rows={5}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 resize-none"
                      placeholder="Tell us about your project, challenges, and goals..."
                    />
                  </div>

                  {status === 'error' && (
                    <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 px-8 py-4 text-xs uppercase tracking-[0.15em] font-heading font-bold text-white border border-transparent shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-lg sm:w-auto"
                  >
                    {submitting ? 'Sending…' : 'Send Message'}
                    {!submitting && <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />}
                  </button>

                  <p className="text-xs leading-relaxed text-text-secondary">
                    By submitting this form, you agree to our{' '}
                    <Link to="/privacy" className="text-accent underline-offset-2 hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
                <h3 className="font-heading text-lg font-extrabold uppercase text-black">Direct Contact</h3>
                <div className="mt-6 space-y-4">
                  <a href="mailto:hello@fulcrumsystem.com" className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-accent">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-transparent bg-gradient-to-br from-indigo-500 to-violet-600">
                      <Mail size={16} className="text-white" />
                    </div>
                    hello@fulcrumsystem.com
                  </a>
                  <a href="tel:+15555550100" className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-accent">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-transparent bg-gradient-to-br from-indigo-500 to-violet-600">
                      <Phone size={16} className="text-white" />
                    </div>
                    +1 (555) 555-0100
                  </a>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-transparent bg-gradient-to-br from-indigo-500 to-violet-600">
                      <MapPin size={16} className="text-white" />
                    </div>
                    Remote · Global
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
                <h3 className="font-heading text-lg font-extrabold uppercase text-black">Response Time</h3>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  We respond to all inquiries within 24 hours. For urgent project consultations,
                  mention it in your message and we'll prioritize accordingly.
                </p>
              </div>

              <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-8">
                <h3 className="font-heading text-lg font-extrabold uppercase text-accent">Working with us</h3>
                <ul className="mt-4 space-y-3">
                  {['Senior engineers only', 'Direct communication', 'Fixed-scope or retainer', 'NDA-friendly'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-black">
                      <Check size={14} className="text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}