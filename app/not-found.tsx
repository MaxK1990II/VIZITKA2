import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <p className="not-found-kicker">404</p>
        <h1 className="not-found-title">Страница не найдена</h1>
        <p className="not-found-copy">
          Адрес не существует или был изменён. Вернитесь на главную страницу и
          откройте нужный раздел портфолио.
        </p>
        <Link href="/" className="not-found-link">
          Перейти на главную
        </Link>
      </div>
    </main>
  );
}


