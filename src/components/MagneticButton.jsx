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
    'group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium tracking-wide transition-colors duration-300',
    className
  );

  const variantClass = {
    primary: cn(
      'bg-accent text-background rounded-full',
      'shadow-[0_0_30px_rgba(77,235,255,0.3)] hover:shadow-[0_0_50px_rgba(77,235,255,0.5)]',
      'hover:bg-accent-glow'
    ),
    secondary: cn(
      'text-white border border-white/15 rounded-full',
      'hover:border-accent/50 hover:bg-white/5'
    ),
    ghost: 'text-text-secondary hover:text-white',
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
        {variant === 'secondary' && (
          <span className="absolute inset-0 rounded-full overflow-hidden">
            <span className="absolute inset-0 rounded-full border border-accent scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" />
          </span>
        )}
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