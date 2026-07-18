import { useId } from 'react';

export default function Logo({ size = 28, className = '', animated = true }) {
  const gradId = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Fulcrum"
      className={className}
    >
      <defs>
        <linearGradient id={gradId} x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${gradId})`} />
      {/* Fulcrum (static) */}
      <path d="M32 29 L41.5 46 H22.5 Z" fill="#fff" />
      <rect x="19" y="48" width="26" height="3.6" rx="1.8" fill="#fff" fillOpacity="0.9" />
      {/* Lever + weight — rocks around the fulcrum apex to "find balance" */}
      <g className={animated ? 'logo-lever' : ''}>
        <rect x="15" y="25.5" width="34" height="5" rx="2.5" fill="#fff" transform="rotate(-11 32 28)" />
        <circle cx="47" cy="20.5" r="3.4" fill="#fff" />
      </g>
    </svg>
  );
}
