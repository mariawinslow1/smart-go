import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from './Icons';

const money = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat('ru-RU');

export default function ImpactCalculator() {
  const [reviews, setReviews] = useState(350);
  const [rating, setRating] = useState(4.3);
  const [clients, setClients] = useState(300);
  const [averageCheck, setAverageCheck] = useState(3500);
  const [affectedShare, setAffectedShare] = useState(5);

  const result = useMemo(() => {
    const affectedClients = Math.max(0, Math.round(clients * affectedShare / 100));
    return {
      affectedClients,
      affectedRevenue: affectedClients * averageCheck,
    };
  }, [averageCheck, clients, affectedShare]);

  const priorities = [
    rating < 4.3
      ? 'Разобрать причины низких оценок отдельно от единичных эмоциональных отзывов.'
      : 'Проверить, какие повторяющиеся жалобы мешают рейтингу расти дальше.',
    reviews >= 300
      ? 'Разделить большой массив по периодам и этапам клиентского пути.'
      : 'Сопоставить ваши отзывы с конкурентами, чтобы увидеть недостающие сигналы.',
    affectedShare >= 8
      ? 'Начать со стандарта работы в самой частой проблемной ситуации.'
      : 'Найти одну частую ситуацию, которую можно исправить без перестройки всего бизнеса.',
  ];

  return (
    <section className="impact-calculator">
      <div className="container">
        <div className="calculator-head">
          <div>
            <div className="eyebrow">Интерактивный расчёт</div>
            <h2>Какой объём выручки зависит от клиентского опыта?</h2>
          </div>
          <p>Задайте свой сценарий. Это не прогноз потерь, а способ оценить масштаб ситуаций, которые стоит проверить по отзывам.</p>
        </div>

        <div className="calculator-shell">
          <div className="calculator-inputs">
            <div className="calculator-field">
              <label htmlFor="calc-reviews">Публичных отзывов</label>
              <input id="calc-reviews" type="number" min="10" max="100000" step="10" value={reviews} onChange={(event) => setReviews(Number(event.target.value) || 0)} />
            </div>
            <div className="calculator-field">
              <label htmlFor="calc-rating">Текущий рейтинг</label>
              <input id="calc-rating" type="number" min="1" max="5" step="0.1" value={rating} onChange={(event) => setRating(Math.min(5, Number(event.target.value) || 0))} />
            </div>
            <div className="calculator-field">
              <label htmlFor="calc-clients">Клиентов или заказов в месяц</label>
              <input id="calc-clients" type="number" min="1" max="1000000" step="10" value={clients} onChange={(event) => setClients(Number(event.target.value) || 0)} />
            </div>
            <div className="calculator-field">
              <label htmlFor="calc-check">Средний чек, ₽</label>
              <input id="calc-check" type="number" min="1" max="100000000" step="500" value={averageCheck} onChange={(event) => setAverageCheck(Number(event.target.value) || 0)} />
            </div>
            <div className="calculator-range">
              <div><label htmlFor="calc-share">Доля клиентов с проблемной ситуацией</label><output htmlFor="calc-share">{affectedShare}%</output></div>
              <input id="calc-share" type="range" min="1" max="20" step="1" value={affectedShare} onChange={(event) => setAffectedShare(Number(event.target.value))} />
              <div className="range-scale"><span>1%</span><span>20%</span></div>
            </div>
          </div>

          <div className="calculator-output" aria-live="polite">
            <span className="calculator-output-label">Ваш сценарий</span>
            <div className="calculator-main-result"><strong>{money.format(result.affectedRevenue)}</strong><p>месячного оборота связано с опытом примерно {number.format(result.affectedClients)} клиентов в заданном сценарии</p></div>
            <div className="calculator-formula">{number.format(clients)} клиентов × {affectedShare}% × {money.format(averageCheck)}</div>
            <div className="calculator-priorities"><span>Что проверить первым</span>{priorities.map((item, index) => <p key={item}><b>0{index + 1}</b>{item}</p>)}</div>
            <Link className="btn btn-light btn-full" to="/audit">Получить 3 наблюдения по своим отзывам <ArrowRight /></Link>
          </div>
        </div>
        <p className="calculator-note">Расчёт не означает, что указанная сумма потеряна или гарантированно будет получена после изменений. Он показывает оборот, связанный с выбранной долей клиентских ситуаций.</p>
      </div>
    </section>
  );
}
