import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { siteConfig } from '../config';
import { ArrowUpRight, Close, Menu } from './Icons';

const nav = [
  ['/', 'Главная'],
  ['/method', 'Методика'],
  ['/cases', 'Кейсы'],
  ['/free-audit', 'Бесплатный аудит'],
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <span className="brand-mark">R</span>
            <span>{siteConfig.brand}</span>
          </Link>
          <nav className="desktop-nav" aria-label="Основная навигация">
            {nav.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{label}</NavLink>
            ))}
          </nav>
          <Link className="nav-cta desktop-cta" to="/free-audit">Получить разбор <ArrowUpRight size={16}/></Link>
          <button className="menu-btn" aria-label="Открыть меню" onClick={() => setOpen(!open)}>{open ? <Close/> : <Menu/>}</button>
        </div>
        {open && (
          <div className="mobile-panel">
            <div className="container mobile-nav">
              {nav.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}
            </div>
          </div>
        )}
      </header>
      <main><Outlet /></main>
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <Link to="/" className="brand footer-brand"><span className="brand-mark">R</span><span>{siteConfig.brand}</span></Link>
            <p className="muted footer-copy">Анализируем клиентскую обратную связь и превращаем её в понятные приоритеты для бизнеса.</p>
          </div>
          <div className="footer-links">
            <Link to="/method">Методика</Link>
            <Link to="/cases">Кейсы</Link>
            <Link to="/free-audit">Бесплатный аудит</Link>
            <Link to="/privacy">Конфиденциальность</Link>
          </div>
          <div className="footer-meta">
            <span>© {new Date().getFullYear()} {siteConfig.brand}</span>
            <span className="muted">Демо-кейсы отмечены отдельно и не выдаются за реальные проекты.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
