import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { pageMeta } from '../config';

export default function NotFound() {
  return (
    <section className="page-hero not-found">
      <Seo {...pageMeta.notFound} />
      <div className="container narrow">
        <div className="eyebrow">Ошибка 404</div>
        <h1>Этой страницы нет.</h1>
        <p>Возможно, ссылка устарела или в адресе есть опечатка.</p>
        <Link className="btn btn-primary" to="/">Вернуться на главную</Link>
      </div>
    </section>
  );
}
