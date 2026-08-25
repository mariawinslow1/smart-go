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
    <section className="audit-page"><div className="container audit-grid"><div className="audit-copy"><div className="eyebrow">Бесплатный первичный разбор</div><h1>Оставьте ссылку — получите 3 наблюдения по отзывам</h1><p>Я покажу повторяющийся сигнал, объясню, чем он важен, и предложу первое действие. Каждый вывод можно будет проверить по публичным отзывам.</p><div className="audit-price"><span>Стоимость</span><strong>{siteConfig.auditPrice}</strong></div><p className="audit-promise">Сначала вы увидите результат. Затем сами решите, нужен ли платный анализ.</p><a className="btn btn-primary audit-jump" href="#audit-form">Оставить ссылку</a><div className="audit-benefits">{['Конкретная ситуация, а не общая тема', 'Примеры, на которых основан вывод', 'Первое действие для проверки'].map(x => <div key={x}><Check /><span>{x}</span></div>)}</div><div className="audit-note"><strong>Доступы не нужны</strong><p>Достаточно ссылки на сайт, карточку организации, товар или страницу с отзывами.</p></div><div className="audit-paid-next"><strong>Если захотите продолжить</strong><p>Платный пилот стоит {siteConfig.pilotPrice}, расширенный анализ — {siteConfig.extendedPrice}. Оплата на этой странице не списывается: сначала я подтвержу состав работы и срок письменно.</p><a href="/#pricing">Сравнить форматы и результат</a></div></div>
      <div className="form-card" id="audit-form">{status === 'sent' ? <div className="success-box" role="status"><div className="success-icon">✓</div><h2>Спасибо. Заявка отправлена.</h2><p>Я изучу информацию и пришлю наблюдения по указанному контакту.</p><button className="btn btn-secondary" type="button" onClick={() => setStatus('idle')}>Отправить ещё одну заявку</button></div> : <><div className="form-head"><div><span>Оставьте одну ссылку</span><p>Поля со звёздочкой обязательны</p></div><span className="price-pill">0 ₽</span></div><form name="primary-audit" method="POST" data-netlify="true" onSubmit={submit}><input type="hidden" name="form-name" value="primary-audit" />
        <label htmlFor="company">Название компании *</label><input id="company" name="company" autoComplete="organization" required />
        <label htmlFor="website">Ссылка на сайт, карточку или отзывы *</label><input id="website" name="website" type="url" placeholder="https://" required />
        <label htmlFor="contact">Куда прислать результат: Telegram или email *</label><input id="contact" name="contact" placeholder="@username или name@example.com" required />
        <div className="form-two"><div><label htmlFor="name">Имя <span>необязательно</span></label><input id="name" name="name" autoComplete="name" /></div><div><label htmlFor="reviews">Ещё одна ссылка <span>если нужна</span></label><input id="reviews" name="reviews" type="url" placeholder="https://" /></div></div>
        <label htmlFor="message">Что хотите понять? <span>необязательно</span></label><textarea id="message" name="message" rows="4" placeholder="Например: почему снижается рейтинг или чем конкурент нравится клиентам больше" />
        <label className="consent" htmlFor="consent"><input id="consent" name="consent" type="checkbox" required /><span>Согласен(на) на обработку данных для ответа на заявку.</span></label>
        {error && <div className="form-error" role="alert">{error}</div>}<button className="btn btn-primary btn-full" disabled={status === 'sending'}>{status === 'sending' ? 'Отправляем…' : 'Получить 3 наблюдения'}</button><p className="privacy-note">Контакт используется только для ответа на заявку. <Link to="/privacy">Условия обработки данных</Link>.</p><p className="direct-contact">Удобнее написать напрямую? <a href={`https://t.me/${siteConfig.telegram}`} target="_blank" rel="noreferrer">Telegram @{siteConfig.telegram}</a> · <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p></form></>}</div>
    </div></section>
  </>;
}
