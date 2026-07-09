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
    'group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-xs uppercase tracking-[0.15em] font-heading font-bold transition-all duration-300',
    className
  );

  const variantClass = {
    primary: cn(
      'bg-accent text-white border border-black',
      'hover:bg-black hover:text-white'
    ),
    secondary: cn(
      'bg-transparent text-black border border-black',
      'hover:bg-black hover:text-white'
    ),
    ghost: 'text-text-secondary hover:text-black',
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