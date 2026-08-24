import { Link } from 'react-router-dom';
import Section from '../components/Section';
import CaseCard from '../components/CaseCard';
import { ArrowRight, Bars, Check, Shield, Spark } from '../components/Icons';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">Customer feedback intelligence</div>
            <h1>Отзывы показывают, <span>где бизнес теряет клиентов.</span></h1>
            <p className="hero-lead">Разбираем массив клиентской обратной связи, находим повторяющиеся проблемы и превращаем их в конкретный план: что исправить сначала, что сохранить и где спрятана точка роста.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/free-audit">Получить бесплатный мини-аудит <ArrowRight/></Link>
              <Link className="btn btn-ghost" to="/cases">Посмотреть кейсы</Link>
            </div>
            <div className="trust-line"><span><Check/> Без долгих внедрений</span><span><Check/> Понятный отчёт</span><span><Check/> Первичный разбор бесплатно</span></div>
          </div>
          <div className="insight-panel" aria-label="Пример аналитики">
            <div className="panel-head"><span>Обзор обратной связи</span><span className="live-dot">DEMO</span></div>
            <div className="score-row"><div><span className="mini-label">Сигнал</span><strong>Просрочки ремонта</strong></div><div className="score danger">HIGH</div></div>
            <div className="bars-chart">
              {[74, 56, 45, 31, 20].map((v, i) => <div className="bar-row" key={v}><span>{['Сроки','Коммуникация','Цена','Качество','Выдача'][i]}</span><div className="bar-track"><i style={{width:`${v}%`}}/></div><b>{v}</b></div>)}
            </div>
            <div className="quote-box">«Обещали позвонить вечером, но статус пришлось узнавать самому.»</div>
            <div className="panel-foot"><div><strong>284</strong><span>отзыва</span></div><div><strong>9</strong><span>тем</span></div><div><strong>4</strong><span>приоритета</span></div></div>
          </div>
        </div>
      </section>

      <Section eyebrow="Что вы получите" title="Не облако слов. Решения, которые можно внедрить." intro="Мы отделяем шум от полезных сигналов и показываем не только что говорят клиенты, но и почему это важно для бизнеса.">
        <div className="feature-grid">
          <div className="feature"><span className="icon"><Bars/></span><h3>Повторяющиеся проблемы</h3><p>Группируем отзывы по темам и показываем, какие проблемы встречаются системно, а какие единичны.</p></div>
          <div className="feature"><span className="icon"><Shield/></span><h3>Качество данных</h3><p>Однотипные, короткие и потенциально стимулированные отзывы учитываем отдельно, не принимая их за чистую выборку.</p></div>
          <div className="feature"><span className="icon"><Spark/></span><h3>Приоритеты действий</h3><p>Выделяем изменения с максимальным потенциальным эффектом: что исправить первым, а что можно отложить.</p></div>
        </div>
      </Section>

      <Section eyebrow="Демо-кейсы" title="Посмотрите, как выглядит результат" intro="Первые кейсы используют синтетические данные и честно отмечены как демонстрационные. Они показывают формат и глубину анализа.">
        <div className="case-grid">
          <CaseCard tag="DEMO · сервис" title="Ремонт компьютеров" text="Нашли узкие места в сроках, коммуникации с клиентом и прозрачности цены." stats={[["284","отзыва"],["9","тем"],["4","приоритета"]]} theme="case-green"/>
          <CaseCard tag="DEMO · товар" title="Товар на маркетплейсе" text="Отделили проблемы продукта от доставки и выявили причины снижения повторных покупок." stats={[["812","отзывов"],["13","тем"],["6","решений"]]} theme="case-yellow"/>
          <CaseCard tag="DEMO · услуга" title="Клининговый сервис" text="Выявили разницу качества между исполнителями и точки, влияющие на повторный заказ." stats={[["356","отзывов"],["8","тем"],["5","решений"]]} theme="case-blue"/>
        </div>
        <div className="center-action"><Link className="text-link" to="/cases">Открыть все кейсы <ArrowRight/></Link></div>
      </Section>

      <section className="cta-band">
        <div className="container cta-grid">
          <div><div className="eyebrow light">Бесплатный старт</div><h2>Дадим первые выводы до продажи полного аудита.</h2></div>
          <div><p>Пришлите ссылку на отзывы. Мы разберём часть массива и покажем несколько повторяющихся проблем, сильных сторон и возможных действий.</p><Link to="/free-audit" className="btn btn-light">Получить мини-аудит <ArrowRight/></Link></div>
        </div>
      </section>
    </>
  );
}
