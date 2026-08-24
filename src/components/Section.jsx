export default function Section({ eyebrow, title, intro, children, className = '' }) {
  return (
    <section className={`section ${className}`}>
      <div className="container">
        {(eyebrow || title || intro) && <div className="section-head">
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          {title && <h2>{title}</h2>}
          {intro && <p>{intro}</p>}
        </div>}
        {children}
      </div>
    </section>
  );
}
