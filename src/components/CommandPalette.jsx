import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CommandPalette({ isOpen, onClose }) {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const paletteRef = useRef(null);

  const commands = [
    { id: 'about', label: 'Go to About', action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'projects', label: 'View Projects', action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'contact', label: 'Contact Us', action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'who-built-this', label: 'Who Built This?', action: () => window.dispatchEvent(new CustomEvent('show-built-by')) },
    { id: 'theme', label: 'Toggle Theme', action: () => window.dispatchEvent(new CustomEvent('toggle-theme')) },
    { id: 'konami', label: '↑↑↓↓←→←→BA', action: () => {} },
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(input.toLowerCase())
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      
      // Type-in animation
      gsap.fromTo(paletteRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : onClose(); // Toggle handled by parent
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const executeCommand = (cmd) => {
    cmd.action();
    onClose();
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        ref={paletteRef}
        className="w-full max-w-lg bg-[#0a0a0a] border border-gray-800 rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CRT Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        
        <div className="flex items-center px-4 py-3 border-b border-gray-800">
          <span className="text-green-400 mr-2 font-mono">{`>`}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command..."
            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm"
          />
          <span className="animate-pulse w-2 h-5 bg-green-400 ml-1"></span>
        </div>
        
        <div className="max-h-64 overflow-y-auto py-2">
          {filteredCommands.map((cmd, index) => (
            <button
              key={cmd.id}
              onClick={() => executeCommand(cmd)}
              className="w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors flex items-center justify-between group"
            >
              <span className="text-gray-300 font-mono text-sm group-hover:text-white">{cmd.label}</span>
              <span className="text-gray-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity">↵</span>
            </button>
          ))}
          {filteredCommands.length === 0 && (
            <div className="px-4 py-3 text-gray-500 text-sm font-mono">No commands found</div>
          )}
        </div>
      </div>
    </div>
  );
}
