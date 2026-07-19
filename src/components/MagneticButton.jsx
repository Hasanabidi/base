import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

export default function MagneticButton({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  className,
  ...props
}) {
  const btnRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const baseClass = cn(
    'btn-sweep group relative inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-xs uppercase tracking-[0.15em] font-heading font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
    className
  );

  const variantClass = {
    primary: cn(
      'bg-gradient-to-br from-indigo-500 to-violet-600 text-white border border-transparent shadow-lg shadow-indigo-500/30',
      'hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5'
    ),
    secondary: cn(
      'bg-white text-slate-900 border border-slate-200 shadow-soft',
      'hover:border-indigo-300 hover:text-indigo-600 hover:-translate-y-0.5 hover:shadow-glow'
    ),
    ghost: 'text-slate-500 hover:text-slate-900',
  };

  const content = (
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  );

  const style = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  if (to) {
    return (
      <Link
        ref={btnRef}
        to={to}
        className={cn(baseClass, variantClass[variant])}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      href={href}
      className={cn(baseClass, variantClass[variant])}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {content}
    </button>
  );
}