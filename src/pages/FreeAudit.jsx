import { useState } from 'react';
import { siteConfig } from '../config';
import { Check } from '../components/Icons';

export default function FreeAudit() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!data.get('company') || !data.get('reviews') || !data.get('contact')) {
      setError('Заполните название компании, ссылку на отзывы и контакт для ответа.');
      return;
    }
    setStatus('sending');
    try {
      const body = new URLSearchParams(data).toString();
      const res = await fetch('/', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body });
      if (!res.ok) throw new Error('submit failed');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
      setError('Форма заработает после публикации на Netlify. Пока можно заменить контакт в src/config.js.');
    }
  }

  return (
    <section className="audit-page">
      <div className="container audit-grid">
        <div className="audit-copy">
          <div className="eyebrow">Бесплатный мини-аудит</div>
          <h1>Покажем, что уже видно в ваших отзывах.</h1>
          <p>Разберём небольшую часть обратной связи и вернём несколько наблюдений, которые можно использовать для улучшения клиентского опыта.</p>
          <div className="audit-benefits">
            <div><Check/> <span><b>{siteConfig.freeAuditLimit}</b><br/>для первого разбора</span></div>
            <div><Check/> <span><b>3 главных сигнала</b><br/>из массива отзывов</span></div>
            <div><Check/> <span><b>2 сильные стороны</b><br/>которые важно сохранить</span></div>
            <div><Check/> <span><b>3 действия</b><br/>что можно проверить или исправить</span></div>
          </div>
          <p className="small-note">Мини-аудит — ознакомительный формат. Он не заменяет полный анализ всей клиентской обратной связи.</p>
        </div>
        <div className="form-card">
          {status === 'sent' ? <div className="success-box"><div className="success-icon">✓</div><h2>Заявка отправлена</h2><p>Спасибо. Контакт и ссылка на отзывы получены.</p><button className="btn btn-ghost" onClick={() => setStatus('idle')}>Отправить ещё одну</button></div> : <>
            <div className="form-head"><span>Заявка на мини-аудит</span><span className="pill">0 ₽</span></div>
            <form name="free-audit" method="POST" data-netlify="true" onSubmit={submit}>
              <input type="hidden" name="form-name" value="free-audit" />
              <label>Название компании<input name="company" placeholder="Например, Сервис Плюс" /></label>
              <label>Ссылка на отзывы<input name="reviews" type="url" placeholder="https://..." /></label>
              <label>Ваш контакт<input name="contact" placeholder="Telegram, email или телефон" /></label>
              <label>Комментарий <span>необязательно</span><textarea name="message" rows="4" placeholder="Что особенно хотите понять из отзывов?" /></label>
              <label className="consent"><input type="checkbox" name="consent" required/><span>Согласен(на) на обработку данных для ответа на заявку.</span></label>
              {error && <div className="form-error">{error}</div>}
              <button className="btn btn-primary btn-full" disabled={status === 'sending'}>{status === 'sending' ? 'Отправляем…' : 'Получить бесплатный разбор'}</button>
              <p className="privacy-note">Нажимая кнопку, вы принимаете <a href="/privacy">условия обработки данных</a>.</p>
            </form>
          </>}
        </div>
      </div>
    </section>
  );
}
