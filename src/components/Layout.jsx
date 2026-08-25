import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { siteConfig } from '../config';
import { Close, Menu } from './Icons';

const nav = [['/', 'Главная'], ['/method', 'Как это работает'], ['/cases', 'Примеры'], ['/audit', 'Бесплатный разбор']];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Перейти к содержанию</a>
      <header className="topbar">
        <div className="container nav-wrap">
          <Link to="/" className="brand" aria-label="Maria Winslow — главная">
            <span className="wordmark">Maria Winslow</span>
            <span className="brand-descriptor">Аналитика отзывов</span>
          </Link>
          <nav className="desktop-nav" aria-label="Основная навигация">
            {nav.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>{label}</NavLink>)}
          </nav>
          <Link className="nav-cta desktop-cta" to="/audit">Получить 3 наблюдения</Link>
          <button className="menu-btn" type="button" aria-label={open ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <Close /> : <Menu />}</button>
        </div>
      </header>
      {open && <nav id="mobile-menu" className="mobile-panel" aria-label="Мобильная навигация"><div className="container mobile-nav">{nav.slice(0, -1).map(([to, label], index) => <NavLink key={to} to={to} end={to === '/'}><span>0{index + 1}</span>{label}</NavLink>)}<Link className="btn btn-primary mobile-nav-cta" to="/audit">Получить 3 наблюдения</Link><p>Анализ отзывов и сравнение с конкурентами</p></div></nav>}
      <main id="main-content"><Outlet /></main>
      <footer className="footer"><div className="container footer-grid">
        <div><Link to="/" className="wordmark footer-wordmark">{siteConfig.brand}</Link><p>{siteConfig.descriptor}</p></div>
        <nav className="footer-links" aria-label="Навигация в подвале"><Link to="/method">Как проходит анализ</Link><Link to="/cases">Примеры выводов</Link><Link to="/audit">Бесплатный разбор</Link><Link to="/privacy">Политика конфиденциальности</Link></nav>
        <div className="footer-meta"><span>Связаться</span><a className="footer-email" href={`https://t.me/${siteConfig.telegram}`} target="_blank" rel="noreferrer">Telegram: @{siteConfig.telegram}</a><a className="footer-email" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><span>© {new Date().getFullYear()} {siteConfig.brand}</span><span>Демонстрационные кейсы отмечены.</span></div>
      </div></footer>
    </div>
  );
}
