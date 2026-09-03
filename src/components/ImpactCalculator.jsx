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
  const [clients, setClients] = useState(300);
  const [averageCheck, setAverageCheck] = useState(3500);
  const [lostShare, setLostShare] = useState(1);

  const result = useMemo(() => {
    const lostClients = Math.max(0, Math.round(clients * lostShare / 100));
    return {
      lostClients,
      revenueAtRisk: lostClients * averageCheck,
    };
  }, [averageCheck, clients, lostShare]);

  return (
    <section className="impact-calculator">
      <div className="container">
        <div className="calculator-head">
          <div>
            <div className="eyebrow">Интерактивный расчёт</div>
            <h2>Сколько может стоить одна повторяющаяся проблема?</h2>
          </div>
          <p>Представим, что после неприятной ситуации часть клиентов не возвращается за следующей покупкой. Посчитайте такой сценарий на своих цифрах.</p>
        </div>

        <div className="calculator-shell">
          <div className="calculator-inputs">
            <div className="calculator-field">
              <label htmlFor="calc-clients">Клиентов или заказов в месяц</label>
              <input id="calc-clients" type="number" min="1" max="1000000" step="10" value={clients} onChange={(event) => setClients(Number(event.target.value) || 0)} />
            </div>
            <div className="calculator-field">
              <label htmlFor="calc-check">Средний чек, ₽</label>
              <input id="calc-check" type="number" min="1" max="100000000" step="500" value={averageCheck} onChange={(event) => setAverageCheck(Number(event.target.value) || 0)} />
            </div>
            <div className="calculator-range">
              <div><label htmlFor="calc-share">Сколько клиентов из 100 могут не вернуться из-за проблемы</label><output htmlFor="calc-share">{lostShare} из 100</output></div>
              <input id="calc-share" type="range" min="1" max="20" step="1" value={lostShare} onChange={(event) => setLostShare(Number(event.target.value))} />
              <div className="range-scale"><span>1%</span><span>20%</span></div>
            </div>
          </div>

          <div className="calculator-output" aria-live="polite">
            <span className="calculator-output-label">Если не вернутся {number.format(result.lostClients)} из {number.format(clients)} клиентов</span>
            <div className="calculator-main-result"><strong>{money.format(result.revenueAtRisk)}</strong><p>может недополучить бизнес на одной следующей покупке при среднем чеке {money.format(averageCheck)}</p></div>
            <div className="calculator-formula">{number.format(clients)} клиентов × {lostShare}% × {money.format(averageCheck)} = {money.format(result.revenueAtRisk)}</div>
            <div className="calculator-priorities"><span>Зачем анализировать отзывы</span><p><b>01</b>Найти конкретную ситуацию, после которой клиенты не хотят возвращаться.</p><p><b>02</b>Понять, как эту же ситуацию решают конкуренты.</p><p><b>03</b>Выбрать изменение, которое можно проверить первым.</p></div>
            <Link className="btn btn-light btn-full" to="/audit">Получить 1 наблюдение по своим отзывам <ArrowRight /></Link>
          </div>
        </div>
        <p className="calculator-note">Это пример одного возможного сценария, а не прогноз и не обещанный результат. Калькулятор считает только одну следующую покупку и не утверждает, что все недовольные клиенты обязательно уйдут.</p>
      </div>
    </section>
  );
}
