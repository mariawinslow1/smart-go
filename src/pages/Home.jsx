import { Link } from 'react-router-dom';
import Section from '../components/Section';
import Seo from '../components/Seo';
import { ArrowRight, Check } from '../components/Icons';
import ImpactCalculator from '../components/ImpactCalculator';
import { pageMeta } from '../config';

const questions = [
  ['01', 'Из-за чего уходят клиенты?', 'Не список всех жалоб, а повторяющиеся ситуации, которые действительно портят впечатление.'],
  ['02', 'Где конкуренты убедительнее?', 'Что клиенты особенно ценят у других компаний и чего уже ожидают от всей категории.'],
  ['03', 'Что исправить первым?', 'Очередность действий с учётом частоты проблемы, её влияния на клиента и сложности изменений.'],
  ['04', 'Что уже работает хорошо?', 'Сильные стороны, которые важно сохранить, закрепить в стандартах и показывать в рекламе.'],
  ['05', 'Где обещание не совпадает с опытом?', 'Расхождения между сайтом, карточкой товара или услугой и тем, что получает клиент.'],
  ['06', 'Какие жалобы можно предупредить?', 'Точки, где достаточно заранее объяснить условия, сроки, цену или порядок работы.'],
];

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
        <h1>Покажу, почему клиенты недовольны и что исправить первым</h1>
        <p className="hero-lead">Соберу отзывы о вашей компании и конкурентах, найду повторяющиеся причины недовольства и переведу их в конкретный план действий — без отчёта на сто страниц и общих советов.</p>
        <div className="hero-actions"><Link className="btn btn-primary" to="/audit">Получить 3 наблюдения бесплатно <ArrowRight /></Link><Link className="btn btn-secondary" to="/cases">Посмотреть примеры</Link></div>
        <p className="hero-footnote">Чтобы начать, нужна только ссылка на компанию или товар.</p>
      </div>
      <aside className="analysis-preview" aria-label="Демонстрационный фрагмент разбора">
        <div className="preview-top"><span>Как выглядит вывод</span><span className="demo-label">Демонстрационный пример</span></div>
        <p className="preview-kicker">Сервис ремонта техники</p>
        <h2>Клиентов злит не задержка. Их злит неизвестность.</h2>
        <div className="evidence-list"><div><span>В отзывах</span><p>«Обещали во вторник, в пятницу пришлось звонить самому»</p></div><div><span>У конкурентов</span><p>Чаще хвалят сообщения о статусе и согласование нового срока</p></div></div>
        <div className="insight-note"><span>Первое действие</span><p>Сообщать клиенту об изменении срока до того, как он сам позвонит.</p></div>
      </aside>
    </div></section>

    <section className="logic"><div className="container logic-row">{['Отзывы о вас', 'Отзывы о конкурентах', 'Причины потерь', 'План действий'].map((item, i) => <div key={item}><span>0{i + 1}</span><strong>{item}</strong>{i < 3 && <ArrowRight />}</div>)}</div></section>

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

    <Section eyebrow="Практическая польза" title="После разбора вы будете знать ответы, а не просто количество упоминаний.">
      <div className="question-grid">{questions.map(([no, title, text]) => <article key={no}><span>{no}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </Section>

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
