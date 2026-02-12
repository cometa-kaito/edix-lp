import FadeIn from './FadeIn';

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  labelColor?: string;
  titleColor?: string;
}

export default function SectionHeader({ label, title, subtitle, labelColor, titleColor }: SectionHeaderProps) {
  return (
    <FadeIn className="text-center">
      <span className="section-label" style={labelColor ? { color: labelColor } : undefined}>
        {label}
      </span>
      <h2
        className="section-title"
        style={titleColor ? { color: titleColor } : undefined}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </FadeIn>
  );
}
