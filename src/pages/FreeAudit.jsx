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
    <section className="audit-page"><div className="container audit-grid"><div className="audit-copy"><div className="eyebrow">Бесплатный первичный разбор</div><h1>Пришлите ссылку — я покажу первые три сигнала</h1><p>Посмотрю открытые отзывы и вернусь с конкретными наблюдениями: что повторяется, почему это важно и что стоит проверить первым.</p><div className="audit-price"><span>Стоимость</span><strong>{siteConfig.auditPrice}</strong></div><p className="audit-promise">Без обязательного созвона и без обязательства заказывать полный анализ.</p><div className="audit-benefits">{['3 конкретных наблюдения по отзывам', 'Одна проблема, которую стоит проверить первой', 'Сильная сторона, которую важно не потерять', 'Короткое сравнение с конкурентом — если оно уместно'].map(x => <div key={x}><Check /><span>{x}</span></div>)}</div><div className="audit-note"><strong>Что нужно от вас</strong><p>Название компании и ссылка на сайт, карточку организации или товар. Этого достаточно, чтобы начать.</p></div></div>
      <div className="form-card">{status === 'sent' ? <div className="success-box" role="status"><div className="success-icon">✓</div><h2>Спасибо. Заявка отправлена.</h2><p>Мы изучим информацию и свяжемся с вами по указанному контакту.</p><button className="btn btn-secondary" type="button" onClick={() => setStatus('idle')}>Отправить ещё одну заявку</button></div> : <><div className="form-head"><div><span>Форма заявки</span><p>Поля со звёздочкой обязательны</p></div><span className="price-pill">0 ₽</span></div><form name="primary-audit" method="POST" data-netlify="true" onSubmit={submit}><input type="hidden" name="form-name" value="primary-audit" />
        <label htmlFor="company">Название компании *</label><input id="company" name="company" autoComplete="organization" required />
        <label htmlFor="website">Сайт или карточка компании *</label><input id="website" name="website" type="url" placeholder="https://" required />
        <label htmlFor="reviews">Ссылка на отзывы <span>если отличается</span></label><input id="reviews" name="reviews" type="url" placeholder="https://" />
        <div className="form-two"><div><label htmlFor="name">Имя *</label><input id="name" name="name" autoComplete="name" required /></div><div><label htmlFor="contact">Telegram или email *</label><input id="contact" name="contact" autoComplete="email" required /></div></div>
        <label htmlFor="message">Что хотите понять? <span>необязательно</span></label><textarea id="message" name="message" rows="4" placeholder="Например: почему снижается рейтинг или чем конкурент нравится клиентам больше" />
        <label className="consent" htmlFor="consent"><input id="consent" name="consent" type="checkbox" required /><span>Согласен(на) на обработку данных для ответа на заявку.</span></label>
        {error && <div className="form-error" role="alert">{error}</div>}<button className="btn btn-primary btn-full" disabled={status === 'sending'}>{status === 'sending' ? 'Отправляем…' : 'Получить 3 наблюдения'}</button><p className="privacy-note">Отправляя форму, вы принимаете <Link to="/privacy">условия обработки данных</Link>.</p><p className="direct-contact">Можно не заполнять форму и написать в <a href={`https://t.me/${siteConfig.telegram}`} target="_blank" rel="noreferrer">Telegram @{siteConfig.telegram}</a> или на <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p></form></>}</div>
    </div></section>
  </>;
}
