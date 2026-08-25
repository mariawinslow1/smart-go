import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { Check } from '../components/Icons';
import { pageMeta, siteConfig } from '../config';

export default function FreeAudit() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    setError('');
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    setStatus('sending');
    try {
      const body = new URLSearchParams(new FormData(form)).toString();
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('idle');
      setError('Не удалось отправить заявку. Форма принимает заявки после публикации проекта на Netlify.');
    }
  }

  return <>
    <Seo {...pageMeta.audit} path="/audit" />
    <section className="audit-page"><div className="container audit-grid"><div className="audit-copy"><div className="eyebrow">Первичный разбор</div><h1>Первичный разбор отзывов</h1><p>Рассмотрим часть открытой клиентской обратной связи и покажем несколько повторяющихся закономерностей, на которые стоит обратить внимание.</p><div className="audit-price"><span>Стоимость первичного разбора</span><strong>{siteConfig.auditPrice}</strong></div><p className="audit-promise">Первичный разбор не обязывает заказывать полный аудит.</p><div className="audit-benefits">{['Несколько повторяющихся тем', 'Проблемы, которые стоит проверить', 'Сильные стороны, которые важно сохранить', 'Ориентиры по конкурентам — если согласуем сравнение'].map(x => <div key={x}><Check /><span>{x}</span></div>)}</div><div className="audit-author"><img src="/maria-winslow-avatar.jpg" alt="" width="960" height="960" loading="lazy" decoding="async" /><div><strong>Maria Winslow</strong><span>Разбор провожу лично</span><p>Весь проект можно согласовать в переписке — видеозвонок не требуется.</p></div></div></div>
      <div className="form-card">{status === 'sent' ? <div className="success-box" role="status"><div className="success-icon">✓</div><h2>Спасибо. Заявка отправлена.</h2><p>Мы изучим информацию и свяжемся с вами по указанному контакту.</p><button className="btn btn-secondary" type="button" onClick={() => setStatus('idle')}>Отправить ещё одну заявку</button></div> : <><div className="form-head"><div><span>Форма заявки</span><p>Поля со звёздочкой обязательны</p></div><span className="price-pill">0 ₽</span></div><form name="primary-audit" method="POST" data-netlify="true" onSubmit={submit}><input type="hidden" name="form-name" value="primary-audit" />
        <label htmlFor="company">Название компании *</label><input id="company" name="company" autoComplete="organization" required />
        <label htmlFor="website">Сайт или карточка компании *</label><input id="website" name="website" type="url" placeholder="https://" required />
        <label htmlFor="reviews">Ссылка на отзывы <span>если отличается</span></label><input id="reviews" name="reviews" type="url" placeholder="https://" />
        <div className="form-two"><div><label htmlFor="name">Имя *</label><input id="name" name="name" autoComplete="name" required /></div><div><label htmlFor="contact">Telegram или email *</label><input id="contact" name="contact" autoComplete="email" required /></div></div>
        <label htmlFor="message">Комментарий <span>необязательно</span></label><textarea id="message" name="message" rows="4" placeholder="Что особенно важно понять из отзывов?" />
        <label className="consent" htmlFor="consent"><input id="consent" name="consent" type="checkbox" required /><span>Согласен(на) на обработку данных для ответа на заявку.</span></label>
        {error && <div className="form-error" role="alert">{error}</div>}<button className="btn btn-primary btn-full" disabled={status === 'sending'}>{status === 'sending' ? 'Отправляем…' : 'Запросить первичный разбор'}</button><p className="privacy-note">Отправляя форму, вы принимаете <Link to="/privacy">условия обработки данных</Link>.</p><p className="direct-contact">Или напишите напрямую в <a href={`https://t.me/${siteConfig.telegram}`} target="_blank" rel="noreferrer">Telegram @{siteConfig.telegram}</a></p></form></>}</div>
    </div></section>
  </>;
}
