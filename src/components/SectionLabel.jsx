import { cn } from '@/utils/cn';

export default function SectionLabel({ children, className }) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 text-xs uppercase tracking-widest text-accent',
        className
      )}
    >
      <span className="relative flex h-2 w-2 items-center justify-center">
        <span className="absolute h-2 w-2 rounded-full border border-accent/60" />
        <span className="h-0.5 w-0.5 rounded-full bg-accent" />
      </span>
      <span className="font-heading font-medium">{children}</span>
      <span className="h-px w-12 bg-gradient-to-r from-accent/50 to-transparent" />
    </div>
  );
}