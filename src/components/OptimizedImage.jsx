import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * CLS-safe responsive image with explicit dimensions and sizes.
 * Use for all content images outside the Wix Media Image component.
 */
const OptimizedImage = forwardRef(function OptimizedImage(
  {
    src,
    alt,
    width,
    height,
    sizes = '(max-width: 768px) 100vw, 50vw',
    loading = 'lazy',
    decoding = 'async',
    fetchPriority,
    className,
    wrapperClassName,
    aspectRatio,
    ...props
  },
  ref
) {
  const ratioStyle = aspectRatio ? { aspectRatio } : undefined;

  return (
    <span
      className={cn('block overflow-hidden', wrapperClassName)}
      style={ratioStyle || (width && height ? { aspectRatio: `${width} / ${height}` } : undefined)}
    >
      <img
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={cn('h-full w-full object-cover', className)}
        {...props}
      />
    </span>
  );
});

export default OptimizedImage;
