type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

const baseProps = (size: number, strokeWidth: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className,
  'aria-hidden': true,
  focusable: false,
});

export function EyeIcon({ size = 28, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, className)}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function ZapIcon({ size = 28, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, className)}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
    </svg>
  );
}

export function GraduationCapIcon({ size = 28, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, className)}>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      <path d="M22 10v6" />
    </svg>
  );
}

export function ShieldCheckIcon({ size = 24, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, className)}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function CheckCircleIcon({ size = 24, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, className)}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function BookOpenIcon({ size = 24, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, className)}>
      <path d="M2 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H2Z" />
      <path d="M22 4h-7a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8Z" />
    </svg>
  );
}

export function CheckIcon({ size = 16, className, strokeWidth = 2.5 }: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, className)}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function FileTextIcon({ size = 18, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, className)}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6" />
      <path d="M9 17h5" />
    </svg>
  );
}

export function ImageIcon({ size = 18, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, className)}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="1.6" />
      <path d="m21 15-4.5-4.5L6 21" />
    </svg>
  );
}

export function BarChartIcon({ size = 18, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, className)}>
      <path d="M6 20v-4" />
      <path d="M12 20V8" />
      <path d="M18 20v-8" />
    </svg>
  );
}
