import { cn } from '@/utils/cn';

export default function SectionLabel({ children, className }) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-medium text-accent',
        className
      )}
    >
      <span className="h-2 w-2 bg-accent" />
      <span className="font-heading">{children}</span>
      <span className="h-px w-12 bg-black" />
    </div>
  );
}