import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-inner">
        <p className="not-found-code">404</p>
        <h1 className="not-found-title">Страница не найдена</h1>
        <Link href="/" className="not-found-link">
          На главную
        </Link>
      </div>
    </div>
  );
}
