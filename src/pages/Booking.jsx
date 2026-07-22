import React, { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import MagneticButton from '../components/MagneticButton';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

const Booking = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const calendlyUrl = "https://calendly.com/d/d3hp-xg6-b64";
  const embedCode = `
    <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
    <script type="text/javascript">
      window.onload = function() { Calendly.initBadgeWidget({ url: '${calendlyUrl}', text: 'Book a Free Consultation', color: '#7C3AED', textColor: '#ffffff' }); }
    </script>
  `;

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

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Book Your Free Consultation
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Ready to transform your business? Schedule a 15-minute call with our experts. 
            No pressure, no commitment—just valuable insights tailored to your needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a 
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              <Calendar size={20} />
              Book Now on Calendly
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <span className="text-gray-500 text-sm">or scroll down to book here</span>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <benefit.icon className="w-10 h-10 text-purple-400 mb-4" />
              <p className="text-gray-300 font-medium">{benefit.text}</p>
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
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.4, delay: 0.5 + 0.1 * index }}
              >
                <div className="text-6xl font-bold text-purple-500/20 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-full h-px bg-gradient-to-r from-purple-500/30 to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Calendly Embed Section */}
        <motion.div 
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-center mb-6">Schedule Your Call</h2>
          <p className="text-gray-400 text-center mb-8">
            Select a time below that works for you. All times are shown in your local timezone.
          </p>
          
          {/* Calendly Inline Widget Container */}
          <div className="calendly-inline-widget w-full min-h-[700px]" data-url={calendlyUrl}></div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            Can't find a suitable time? <a href="/contact" className="text-purple-400 hover:underline">Contact us directly</a>
          </div>
        </motion.div>

        {/* What to Expect */}
        <motion.div 
          className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">What to Expect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                <CheckCircle size={18} className="text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Discovery Discussion</h3>
                <p className="text-gray-400 text-sm">We'll discuss your project goals, challenges, and timeline.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                <CheckCircle size={18} className="text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Expert Insights</h3>
                <p className="text-gray-400 text-sm">Get immediate feedback and recommendations from our team.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                <CheckCircle size={18} className="text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Next Steps</h3>
                <p className="text-gray-400 text-sm">Clear guidance on how to move forward if you choose to work with us.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                <CheckCircle size={18} className="text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">No Pressure</h3>
                <p className="text-gray-400 text-sm">This is a free consultation with zero obligation to proceed.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Load Calendly Widget Script */}
      <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
    </>
  );
};

export default Booking;
