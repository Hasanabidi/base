import { useState } from 'react';
import { ArrowRight, Check, Mail, Phone, MapPin } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import MagneticButton from '@/components/MagneticButton';

const budgetRanges = ['< $10K', '$10K – $50K', '$50K – $100K', '$100K+'];
const serviceTypes = ['AI Automation', 'Web Engineering', 'Digital Design', 'Full Project'];

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', message: '',
    budget: '', serviceType: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32">
      {/* Header */}
      <section className="relative py-20 md:py-32">
        <div className="grid-bg absolute inset-0" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="mt-6 font-heading text-hero uppercase text-black">
            Let's build<br />
            <span className="text-accent">something.</span>
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
            <div className="border border-black bg-white p-8 md:p-12">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center py-20 text-center">
                  <div className="flex h-16 w-16 items-center justify-center border border-black bg-accent">
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
                        className="w-full border border-black bg-white px-4 py-3 text-sm text-black placeholder:text-text-secondary/40 outline-none transition-colors focus:bg-secondary-panel"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs uppercase tracking-[0.15em] font-heading font-bold text-black">Email</label>
                      <input
                        type="email" name="email" required value={form.email} onChange={handleChange}
                        className="w-full border border-black bg-white px-4 py-3 text-sm text-black placeholder:text-text-secondary/40 outline-none transition-colors focus:bg-secondary-panel"
                        placeholder="jane@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.15em] font-heading font-bold text-black">Company</label>
                    <input
                      type="text" name="company" value={form.company} onChange={handleChange}
                      className="w-full border border-black bg-white px-4 py-3 text-sm text-black placeholder:text-text-secondary/40 outline-none transition-colors focus:bg-secondary-panel"
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
                          className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-heading font-bold border border-black transition-all duration-300 ${
                            form.serviceType === s
                              ? 'bg-accent text-white'
                              : 'bg-white text-black hover:bg-secondary-panel'
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
                          className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-heading font-bold border border-black transition-all duration-300 ${
                            form.budget === b
                              ? 'bg-accent text-white'
                              : 'bg-white text-black hover:bg-secondary-panel'
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
                      className="w-full border border-black bg-white px-4 py-3 text-sm text-black placeholder:text-text-secondary/40 outline-none transition-colors focus:bg-secondary-panel resize-none"
                      placeholder="Tell us about your project, challenges, and goals..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2 bg-accent px-8 py-4 text-xs uppercase tracking-[0.15em] font-heading font-bold text-white border border-black transition-all duration-300 hover:bg-black hover:text-white sm:w-auto"
                  >
                    Send Message
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="space-y-4">
              <div className="border border-black bg-white p-8">
                <h3 className="font-heading text-lg font-extrabold uppercase text-black">Direct Contact</h3>
                <div className="mt-6 space-y-4">
                  <a href="mailto:hello@fulcrumsystem.com" className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-accent">
                    <div className="flex h-10 w-10 items-center justify-center border border-black bg-accent">
                      <Mail size={16} className="text-white" />
                    </div>
                    hello@fulcrumsystem.com
                  </a>
                  <a href="tel:+15555550100" className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-accent">
                    <div className="flex h-10 w-10 items-center justify-center border border-black bg-accent">
                      <Phone size={16} className="text-white" />
                    </div>
                    +1 (555) 555-0100
                  </a>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <div className="flex h-10 w-10 items-center justify-center border border-black bg-accent">
                      <MapPin size={16} className="text-white" />
                    </div>
                    Remote · Global
                  </div>
                </div>
              </div>

              <div className="border border-black bg-white p-8">
                <h3 className="font-heading text-lg font-extrabold uppercase text-black">Response Time</h3>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  We respond to all inquiries within 24 hours. For urgent project consultations,
                  mention it in your message and we'll prioritize accordingly.
                </p>
              </div>

              <div className="border border-accent bg-accent/5 p-8">
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