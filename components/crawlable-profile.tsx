import { getSiteCopy } from "@/lib/i18n/content";
import { PRESS_ITEMS } from "@/lib/press";
import { PROFILE } from "@/lib/site-content";

const copy = getSiteCopy("ru");

export function CrawlableProfile() {
  return (
    <article className="crawlable-profile">
      <h1>
        {PROFILE.name} — {PROFILE.title}, {PROFILE.company}, {PROFILE.location}
      </h1>
      <p>{copy.introRoleLine}</p>
      <p>{copy.heroTagline.replace(/\s+/g, " ").trim()}</p>
      <p>{copy.aboutShort}</p>

      <h2>Компетенции</h2>
      <ul>
        {copy.bentoDomains.map((domain) => (
          <li key={domain.id}>
            <strong>{domain.title.replace(/\n/g, " ")}</strong>
            {" — "}
            {domain.description}
          </li>
        ))}
      </ul>

      <h2>Проекты</h2>
      <ul>
        {copy.projects.map((project) => (
          <li key={project.id}>
            <strong>{project.title}</strong>
            {" — "}
            {project.summary} {project.result}
          </li>
        ))}
      </ul>

      <h2>Пресса</h2>
      <p>
        Подборка публикаций:{" "}
        <a href="https://kanochkinmm.ru/press">https://kanochkinmm.ru/press</a>
      </p>
      <ul>
        {PRESS_ITEMS.map((item) => (
          <li key={item.id}>
            <a href={item.href} rel="noopener noreferrer">
              {item.source}: {item.title}
            </a>
          </li>
        ))}
      </ul>

      <h2>Контакты</h2>
      <ul>
        <li>
          Личная почта:{" "}
          <a href={`mailto:${PROFILE.emailPersonal}`}>{PROFILE.emailPersonal}</a>
        </li>
        <li>
          Telegram:{" "}
          <a href={`https://t.me/${PROFILE.telegram.replace("@", "")}`}>
            {PROFILE.telegram}
          </a>
        </li>
        <li>
          Рабочая почта завода:{" "}
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        </li>
        <li>
          Сайт: <a href={PROFILE.website}>{PROFILE.website}</a>
        </li>
        <li>
          GitHub: <a href={PROFILE.githubUrl}>{PROFILE.github}</a>
        </li>
      </ul>
    </article>
  );
}
