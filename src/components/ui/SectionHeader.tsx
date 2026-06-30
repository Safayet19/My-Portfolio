type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  copy: string;
  center?: boolean;
};

export function SectionHeader({ eyebrow, title, copy, center = false }: SectionHeaderProps) {
  return (
    <div className={`section-header ${center ? 'center' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      <p className="section-copy">{copy}</p>
    </div>
  );
}
