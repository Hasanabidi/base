import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import SectionLabel from '@/components/SectionLabel';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Booking = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Dynamically inject Calendly script into DOM for React SPA compatibility
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const calendlyUrl = "https://calendly.com/d/d3hp-xg6-b64";

  const benefits = [
    { icon: Clock, text: "15-minute focused session" },
    { icon: Video, text: "Google Meet video call" },
    { icon: CheckCircle, text: "No commitment required" },
    { icon: Sparkles, text: "Personalized recommendations" }
  ];

  const steps = [
    { number: "01", title: "Choose a Time", description: "Select a slot that works for your schedule" },
    { number: "02", title: "Enter Your Details", description: "Tell us about your project and goals" },
    { number: "03", title: "Get Confirmation", description: "Receive instant calendar invite with Google Meet link" },
    { number: "04", title: "Join the Call", description: "Connect via Google Meet at your scheduled time" }
  ];

  return (
    <>
      <SEO 
        title="Book a Free Consultation | Fulcrum System"
        description="Schedule your 15-minute free consultation call with Fulcrum System. Discuss your project needs, get expert advice, and explore how we can help transform your business."
        keywords="book consultation, free consultation, software development consultation, Fulcrum System booking, tech consultation"
        canonicalUrl="https://fulcrumsystem.com/booking"
      />

      <div className="pt-32 pb-20 px-6 lg:px-10 max-w-[1400px] mx-auto">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-4">
            <SectionLabel>Consultation</SectionLabel>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase text-slate-900 dark:text-white tracking-tight mb-6">
            Book Your <span className="text-gradient">Free Consultation</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Ready to transform your business? Schedule a 15-minute call with our experts. 
            No pressure, no commitment—just valuable insights tailored to your needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a 
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sweep group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl font-heading font-bold text-xs uppercase tracking-[0.15em] text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Calendar size={18} />
              Book Now on Calendly
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <span className="text-text-secondary text-xs uppercase tracking-wider font-heading font-medium">
              or scroll down to book here
            </span>
          </div>
        </motion.div>

        {/* Benefits Grid with Impact hover-fill animation */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="hover-fill group relative rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-soft"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <div className="hover-fill__layer" />
              <div className="relative z-10 flex flex-col items-center">
                <benefit.icon className="w-10 h-10 text-accent mb-4 transition-colors duration-300 group-hover:text-white" />
                <p className="font-heading text-sm uppercase tracking-[0.1em] font-bold text-black transition-colors duration-300 group-hover:text-white">
                  {benefit.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex justify-center mb-4">
            <SectionLabel>Workflow</SectionLabel>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold uppercase text-slate-900 dark:text-white text-center mb-12">
            How It <span className="text-gradient">Works</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.4, delay: 0.5 + 0.1 * index }}
              >
                <div className="font-heading text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-4">{step.number}</div>
                <h3 className="font-heading text-xl font-bold uppercase mb-2 text-slate-900 dark:text-white">{step.title}</h3>
                <p className="text-text-secondary text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Calendly Embed Section */}
        <motion.div 
          className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 mb-20 shadow-soft"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex justify-center mb-3">
            <SectionLabel>Schedule</SectionLabel>
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold uppercase text-slate-900 dark:text-white text-center mb-2">
            Select A Time
          </h2>
          <p className="text-text-secondary text-center text-sm mb-8">
            All times are automatically converted to your local timezone.
          </p>
          
          {/* Calendly Widget Container */}
          <div className="w-full min-h-[700px] rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <iframe
              src={`${calendlyUrl}?embed_domain=${window.location.host}&embed_type=Inline`}
              width="100%"
              height="700"
              frameBorder="0"
              title="Select a Date & Time - Calendly"
              className="w-full min-h-[700px] border-0 rounded-xl"
            />
          </div>
          
          <div className="mt-6 text-center text-xs uppercase tracking-wider font-heading font-semibold text-text-secondary">
            Can't find a suitable time? <Link to="/contact" className="text-accent hover:underline">Contact us directly</Link>
          </div>
        </motion.div>

        {/* What to Expect */}
        <motion.div 
          className="hover-fill group relative rounded-2xl border border-slate-200 bg-white p-8 md:p-12 shadow-soft overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="flex justify-center mb-3">
            <SectionLabel>Expectations</SectionLabel>
          </div>
          <h2 className="font-heading text-3xl font-extrabold uppercase text-slate-900 dark:text-white text-center mb-8">
            What to Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <CheckCircle size={18} className="text-accent" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm uppercase tracking-wide text-slate-900 dark:text-white mb-1">Discovery Discussion</h3>
                <p className="text-text-secondary text-sm">We'll discuss your project goals, challenges, and timeline.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <CheckCircle size={18} className="text-accent" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm uppercase tracking-wide text-slate-900 dark:text-white mb-1">Expert Insights</h3>
                <p className="text-text-secondary text-sm">Get immediate feedback and recommendations from our team.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <CheckCircle size={18} className="text-accent" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm uppercase tracking-wide text-slate-900 dark:text-white mb-1">Next Steps</h3>
                <p className="text-text-secondary text-sm">Clear guidance on how to move forward if you choose to work with us.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <CheckCircle size={18} className="text-accent" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm uppercase tracking-wide text-slate-900 dark:text-white mb-1">No Pressure</h3>
                <p className="text-text-secondary text-sm">This is a free consultation with zero obligation to proceed.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Booking;



