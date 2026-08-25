import { Link } from 'react-router-dom';
import Section from '../components/Section';
import Seo from '../components/Seo';
import { ArrowRight, Check } from '../components/Icons';
import ImpactCalculator from '../components/ImpactCalculator';
import { pageMeta } from '../config';

const cases = [
  ['01', 'Ремонт техники', 'Клиентов злит не перенос срока, а отсутствие информации', 'Что менять: уведомления о статусе и цене'],
  ['02', 'Товар на маркетплейсе', 'Часть негатива относится не к товару, а к упаковке и первому запуску', 'Что менять: карточку, инструкцию и комплектацию'],
  ['03', 'Клининговый сервис', 'Оценка бренда зависит от того, какой исполнитель приехал', 'Что менять: стандарт качества и контроль результата'],
];

export default function Home() {
  return <>
    <Seo {...pageMeta.home} path="/" />
    <section className="hero"><div className="container hero-grid">
      <div className="hero-copy">
        <div className="eyebrow">Анализ отзывов для бизнеса</div>
        <h1>Почему уходят клиенты — и что исправить первым</h1>
        <p className="hero-lead">Разберу отзывы о вас и конкурентах, найду повторяющиеся проблемные ситуации и расставлю действия по приоритету. Вы получите выводы, которые можно проверить по исходным отзывам и обсудить с командой.</p>
        <div className="hero-actions"><Link className="btn btn-primary" to="/audit">Получить 3 наблюдения бесплатно <ArrowRight /></Link><Link className="btn btn-secondary" to="/cases">Посмотреть примеры</Link></div>
        <p className="hero-footnote">Нужны название и одна ссылка. Результат пришлю в Telegram или на email.</p>
      </div>
      <aside className="analysis-preview" aria-label="Демонстрационный фрагмент разбора">
        <div className="preview-top"><span>Как выглядит вывод</span><span className="demo-label">Демонстрационный пример</span></div>
        <p className="preview-kicker">Сервис ремонта техники</p>
        <h2>Клиентов злит не задержка. Их злит неизвестность.</h2>
        <div className="evidence-list"><div><span>В отзывах</span><p>«Обещали во вторник, в пятницу пришлось звонить самому»</p></div><div><span>У конкурентов</span><p>Чаще хвалят сообщения о статусе и согласование нового срока</p></div></div>
        <div className="insight-note"><span>Первое действие</span><p>Сообщать клиенту об изменении срока до того, как он сам позвонит.</p></div>
      </aside>
    </div></section>

    <section className="logic" aria-label="Что входит в анализ"><div className="container logic-row">{['Только открытые отзывы', 'Примеры к каждому выводу', 'Сравнение с 2–3 конкурентами', 'Результат письменно'].map((item, i) => <div key={item}><span>0{i + 1}</span><strong>{item}</strong>{i < 3 && <ArrowRight />}</div>)}</div></section>

    <Section eyebrow="Первый результат — бесплатно" title="Три наблюдения, которые можно проверить, а не принимать на веру." intro="Вы сразу увидите, как я работаю с вашими данными. Нужны только название компании и ссылка на публичные отзывы.">
      <div className="sample-grid">
        <article><span>01</span><h3>Повторяющийся сигнал</h3><p>Не тема вроде «сервис», а конкретная ситуация, которая встречается в разных отзывах.</p></article>
        <article><span>02</span><h3>Почему это важно</h3><p>Какие формулировки клиентов подтверждают вывод и на каком этапе возникает проблема.</p></article>
        <article><span>03</span><h3>Первое действие</h3><p>Что можно проверить или изменить первым, не перестраивая весь бизнес.</p></article>
      </div>
      <div className="sample-next"><p><strong>Что будет дальше:</strong> я пришлю наблюдения по указанному контакту. После этого вы сами решите, нужен ли полный анализ.</p><Link className="btn btn-primary" to="/audit">Оставить ссылку <ArrowRight /></Link></div>
    </Section>

    <section className="demo-impact"><div className="container">
      <div className="demo-impact-head"><div><div className="eyebrow light">Демонстрационный кейс</div><h2>Из сотен отзывов — в три понятных решения.</h2></div><p>Сервис ремонта техники · анализ отзывов компании и трёх конкурентов</p></div>
      <div className="demo-impact-grid">
        <div className="demo-before"><span className="demo-stage">До разбора</span><strong>430</strong><p>отзывов, которые невозможно оценить по одному среднему рейтингу</p><div className="demo-stats"><div><b>128</b><span>негативных и смешанных</span></div><div><b>17</b><span>разных формулировок жалоб</span></div></div></div>
        <div className="demo-arrow" aria-hidden="true"><ArrowRight /></div>
        <div className="demo-after"><span className="demo-stage">После анализа</span><div className="demo-result-list"><div><b>04</b><p>повторяющиеся причины недовольства</p></div><div><b>03</b><p>изменения с наибольшим приоритетом</p></div><div><b>01</b><p>практика конкурентов для адаптации</p></div></div></div>
      </div>
      <div className="demo-actions"><div><span>01</span><div><strong>Сообщать об изменении срока заранее</strong><p>Снижает количество обращений «что с моим заказом?» и жалоб на неизвестность.</p></div><em>Коммуникация</em></div><div><span>02</span><div><strong>Фиксировать новый срок в сообщении</strong><p>Даёт клиенту понятное обещание вместо устной договорённости.</p></div><em>Доверие</em></div><div><span>03</span><div><strong>Согласовывать цену до начала работ</strong><p>Убирает один из главных поводов для споров при выдаче техники.</p></div><em>Оценка сервиса</em></div></div>
      <div className="demo-metrics"><span>Что отслеживать после внедрения</span><p>Жалобы на отсутствие статуса</p><p>Повторные звонки клиентов</p><p>Упоминания коммуникации в отзывах</p></div>
      <p className="demo-disclaimer">Цифры используются для демонстрации формата анализа. Это не результат реального клиента и не обещание заранее известного эффекта.</p>
    </div></section>

    <ImpactCalculator />

    <Section eyebrow="Что вы получите" title="Короткий документ, с которым можно идти к команде." intro="Каждый вывод связан с отзывами, объяснён человеческим языком и заканчивается следующим действием." className="section-tinted">
      <div className="deliverable-cards"><article><span>01</span><h3>Карта проблем</h3><p>Какие ситуации повторяются, на каком этапе возникают и что именно раздражает клиента.</p></article><article><span>02</span><h3>Сравнение с конкурентами</h3><p>Где вы сильнее рынка, где отстаёте и какие удачные практики можно адаптировать.</p></article><article><span>03</span><h3>Очередность изменений</h3><p>Что сделать сейчас, что проверить позже и на что пока не стоит тратить ресурсы.</p></article></div>
      <Link className="text-link" to="/method">Как я прихожу к выводам <ArrowRight /></Link>
    </Section>

    <Section eyebrow="Конкуренты" title="Не копировать лидера. Понять, за что его выбирают.">
      <div className="competitive-grid"><div className="competitive-intro"><p>Отзывы конкурентов показывают стандарт, с которым клиент уже сравнивает вас — даже если никогда об этом не говорит.</p><p>Я отделяю действительно ценные практики от красивых, но бесполезных деталей и показываю, что можно применить именно в вашем бизнесе.</p></div><div className="competitive-points"><div><span>01</span><h3>Ожидания рынка</h3><p>Что клиенты уже считают нормой и перестали воспринимать как преимущество.</p></div><div><span>02</span><h3>Причины выбора</h3><p>За какие конкретные детали сервиса конкурентов благодарят и рекомендуют.</p></div><div><span>03</span><h3>Свободные позиции</h3><p>Какие важные ожидания не закрывает ни один заметный игрок категории.</p></div></div></div>
    </Section>

    <Section eyebrow="Примеры" title="Три ситуации, в которых отзывы меняют решение бизнеса." intro="Это демонстрационные кейсы. Они показывают формат вывода, а не обещают заранее известный результат.">
      <div className="case-preview-grid">{cases.map(([no, title, insight, action]) => <Link to="/cases" className="case-preview" key={no}><div><span className="case-no">{no}</span><span className="demo-label">Демонстрационный кейс</span></div><h3>{title}</h3><p>{insight}</p><strong>{action} <ArrowRight /></strong></Link>)}</div>
    </Section>

    <section className="data-section"><div className="container split-copy"><div><div className="eyebrow light">Когда это нужно</div><h2>Отзывы есть, а ясного решения всё ещё нет.</h2></div><div className="use-cases">{['Рейтинг снижается, но причины кажутся разрозненными', 'Жалобы повторяются, а команда спорит, что важнее', 'Нужно понять, почему конкурента рекомендуют чаще', 'Планируются изменения продукта, сервиса или карточки товара'].map(item => <p key={item}><Check />{item}</p>)}</div></div></section>

    <section className="cta-band"><div className="container split-copy"><div><div className="eyebrow light">Бесплатный первый шаг</div><h2>Пришлите ссылку. Я найду три сигнала в открытых отзывах.</h2></div><div><p>Вы увидите качество работы до заказа полного анализа и сами решите, нужен ли полный разбор.</p><Link className="btn btn-light" to="/audit">Получить первичный разбор <ArrowRight /></Link></div></div></section>
  </>;
}
