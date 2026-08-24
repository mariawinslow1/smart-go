import { ArrowUpRight } from './Icons';

export default function CaseCard({ tag, title, text, stats, theme }) {
  return (
    <article className={`case-card ${theme || ''}`}>
      <div className="case-topline"><span className="pill">{tag}</span><ArrowUpRight/></div>
      <h3>{title}</h3>
      <p>{text}</p>
      <div className="case-stats">
        {stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
      </div>
    </article>
  );
}
