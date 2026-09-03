import { Link } from 'react-router-dom';
import Section from '../components/Section';
import Seo from '../components/Seo';
import { ArrowRight, Check } from '../components/Icons';
import { pageMeta, siteConfig } from '../config';

export default function Home() {
  return <>
    <Seo {...pageMeta.home} path="/" />
    <section className="hero"><div className="container hero-grid">
      <div className="hero-copy">
        <div className="eyebrow">Для сервисных компаний с филиалами</div>
        <h1>Где вы теряете клиентов — видно в отзывах</h1>
        <p className="hero-lead">За 48 часов найду повторяющиеся сбои в клиентском опыте, сравню филиалы или конкурента и предложу один проверяемый тест на 14 дней.</p>
        <div className="hero-actions"><Link className="btn btn-primary" to="/audit">Получить 1 наблюдение бесплатно <ArrowRight /></Link><Link className="btn btn-secondary" to="/cases">Посмотреть результат на 1 странице</Link></div>
        <p className="hero-footnote">Нужна только ссылка на открытые отзывы. Доступы к личным кабинетам не требуются.</p>
      </div>
      <aside className="analysis-preview" aria-label="Пример результата">
        <div className="preview-top"><span>Что получает руководитель</span><span className="demo-label">За 48 часов</span></div>
        <p className="preview-kicker">Не пересказ отзывов</p>
        <h2>Одна ситуация, из-за которой клиент перестаёт доверять сервису.</h2>
        <div className="evidence-list"><div><span>Доказательства</span><p>Фрагменты отзывов и частота повторения ситуации</p></div><div><span>Сравнение</span><p>Где другой филиал или конкурент решает её лучше</p></div></div>
        <div className="insight-note"><span>На выходе</span><p>Конкретное действие и показатель для проверки через 14 дней.</p></div>
      </aside>
    </div></section>

    <section className="logic" aria-label="Формат работы"><div className="container logic-row">{['Открытые отзывы', 'Один главный риск', 'Доказательства', 'Тест на 14 дней'].map((item, i) => <div key={item}><span>0{i + 1}</span><strong>{item}</strong>{i < 3 && <ArrowRight />}</div>)}</div></section>

    <Section eyebrow="Кому это окупается" title="Когда проблема повторяется в разных филиалах, её уже нельзя считать случайностью." intro="Подходит клиникам, стоматологиям, ветеринарным центрам, салонам, автосервисам и другим компаниям, где качество зависит от конкретной точки или сотрудника.">
      <div className="sample-grid">
        <article><span>01</span><h3>Рейтинги филиалов различаются</h3><p>В одной точке клиентов удерживают, в другой — теряют на том же этапе обслуживания.</p></article>
        <article><span>02</span><h3>Жалобы звучат по-разному</h3><p>Я объединяю разные формулировки в конкретную повторяющуюся ситуацию.</p></article>
        <article><span>03</span><h3>Команда спорит, что менять</h3><p>Вместо длинного списка проблем появляется один приоритет и способ его проверить.</p></article>
      </div>
    </Section>

    <section className="real-case-section"><div className="container real-case-grid">
      <div className="real-case-intro"><span className="real-case-label">Реальный пример · открытые данные</span><h2>Один вывод. Одна страница. Примерно одна минута.</h2><p>Независимый разбор публичных отзывов «Братьев Чистовых»: сигнал, подтверждения и первое изменение. Это пример метода, а не заказ или отзыв клиента.</p><div className="real-case-actions"><a className="btn btn-primary" href="/materials/real-review-analysis-cleanbros.pdf" target="_blank" rel="noreferrer">Открыть пример <ArrowRight /></a><Link className="btn btn-secondary" to="/audit">Проверить свою компанию</Link></div></div>
      <div className="real-case-result"><div><span>Главный сигнал</span><strong>Ожидания от состава заказа иногда расходятся с фактическим исполнением.</strong></div><div><span>Что проверить</span><p>За 24 часа подтверждать состав работ, команду, инвентарь и контакт для быстрой эскалации.</p></div><div className="real-case-source"><span>Важно</span><p>Вывод основан только на открытых отзывах и требует проверки на внутренних данных компании.</p></div></div>
    </div></section>

    <section className="pricing-section" id="pricing"><div className="container">
      <div className="pricing-head"><div><div className="eyebrow">Форматы и стоимость</div><h2>Платите за решение, а не за количество страниц.</h2></div><p>Цена и срок фиксируются до начала работы. На сайте оплата не списывается.</p></div>
      <div className="pricing-grid">
        <article><div className="price-top"><span>Первичная проверка</span><strong>{siteConfig.auditPrice}</strong></div><h3>Одно наблюдение</h3><ul><li><Check />Одна компания</li><li><Check />Один повторяющийся сигнал</li><li><Check />Ответ в Telegram или на email</li></ul><Link className="btn btn-secondary btn-full" to="/audit">Оставить ссылку</Link></article>
        <article className="price-featured"><div className="price-top"><span>Экспресс-аудит</span><strong>{siteConfig.pilotPrice}</strong></div><h3>Решение за 48 часов</h3><ul><li><Check />До 150 открытых отзывов</li><li><Check />До трёх филиалов или один конкурент</li><li><Check />Три повторяющиеся ситуации</li><li><Check />Одна страница с приоритетами</li><li><Check />Тест изменений на 14 дней</li></ul><Link className="btn btn-light btn-full" to="/audit">Начать с проверки</Link></article>
        <article><div className="price-top"><span>Ежемесячный контроль</span><strong>{siteConfig.monthlyPrice}</strong></div><h3>Не пропускать новые потери</h3><ul><li><Check />До пяти филиалов</li><li><Check />Новые отзывы и динамика ситуаций</li><li><Check />Сравнение с двумя конкурентами</li><li><Check />Один приоритет на месяц</li><li><Check />Короткий итог для команды</li></ul><Link className="btn btn-secondary btn-full" to="/audit">Обсудить первый аудит</Link></article>
      </div>
      <p className="pricing-note">Результат анализа — проверяемая гипотеза для управленческого решения, а не обещание заранее известного роста выручки или рейтинга.</p>
    </div></section>

    <section className="cta-band"><div className="container split-copy"><div><div className="eyebrow light">Первый шаг — 0 ₽</div><h2>Пришлите ссылку. Я покажу одну конкретную потерю.</h2></div><div><p>Без презентации, созвона и доступа к вашим системам. Если наблюдение полезно — обсудим аудит за {siteConfig.pilotPrice}.</p><Link className="btn btn-light" to="/audit">Проверить отзывы <ArrowRight /></Link></div></div></section>
  </>;
}
