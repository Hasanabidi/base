import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BuiltByModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleShowBuiltBy = () => {
      if (!isOpen) onClose(); // Close if already open, or just trigger open
    };
    
    window.addEventListener('show-built-by', handleShowBuiltBy);
    return () => window.removeEventListener('show-built-by', handleShowBuiltBy);
  }, [isOpen, onClose]);

  const techStack = ['React', 'Three.js', 'GSAP', 'Tailwind', 'Vite', 'Figma'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0)' }}
            exit={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, ease: 'ease-out' }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#0a0a0a] border border-gray-800 rounded-xl shadow-2xl z-[70] overflow-hidden"
          >
            {/* Header */}
            <div className="relative h-40 bg-gradient-to-br from-indigo-900/50 to-purple-900/50">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 -mt-16 relative">
              {/* Avatar Placeholder */}
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full border-4 border-[#0a0a0a] shadow-xl flex items-center justify-center text-4xl font-bold text-white">
                FS
              </div>

              <div className="text-center mt-4">
                <h2 className="text-2xl font-bold text-white">Fulcrum System Developer</h2>
                <p className="text-gray-400 text-sm mt-1">Full-Stack Engineer & UI Designer</p>
                <p className="text-indigo-400 text-xs mt-3 italic">"Every pixel here was intentional."</p>
              </div>

              {/* Tech Stack */}
              <div className="mt-6">
                <h3 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="mt-6 flex gap-3 justify-center">
                <a
                  href="https://github.com/Hasanabidi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-6.27 0-1.38.495-2.52 1.305-3.42.255.66 1.215 1.08 2.145 1.08 1.245 0 2.265-.42 3.015-1.005 1.41-.015 2.745.6 3.66 1.545.9-.18 1.74-.51 2.46-.975.72.9 1.215 2.01 1.215 3.225 0 4.95-3.015 6.06-5.88 6.375.465.405.87 1.185.87 2.385 0 1.725-.015 3.12-.015 3.54 0 .3.225.675.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a
                  href="/contact"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors"
                >
                  Hire Me
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
