import { getSiteCopy } from "@/lib/i18n/content";
import { PRESS_ITEMS } from "@/lib/press";
import { PROFILE } from "@/lib/site-content";
import { COBOT_DEMO } from "@/lib/cobot-demo";
import { localePath, type Locale } from "@/lib/i18n/locale";
import { buildApexAbsoluteUrl } from "@/lib/site-url";
import Link from "next/link";

export function CrawlableProfile({ locale }: { locale: Locale }) {
  const copy = getSiteCopy(locale);
  return (
    <article className="crawlable-profile" aria-hidden="true">
      <h1>
        {copy.name} — {copy.introRoleLine}
      </h1>
      <p>{copy.introRoleLine}</p>
      <p>{copy.heroTagline.replace(/\s+/g, " ").trim()}</p>
      <p>{copy.aboutShort}</p>

      <h2>{copy.introLabel}</h2>
      <ul>
        {copy.bentoDomains.map((domain) => (
          <li key={domain.id}>
            <strong>{domain.title.replace(/\n/g, " ")}</strong>
            {" — "}
            {domain.description}
          </li>
        ))}
      </ul>

      <h2>{copy.demo.title}</h2>
      <p>{copy.demo.description}</p>
      <p>{copy.demo.modelNote}</p>
      <a tabIndex={-1} href={COBOT_DEMO.source}>{copy.demo.launch}</a>

      <h2>{copy.details.caseStudy.title}</h2>
      <p>{copy.details.caseStudy.lead}</p>
      {copy.details.caseStudy.chapters.map(chapter => <section key={chapter.title}><h3>{chapter.title}</h3><p>{chapter.body}</p></section>)}
      <ul>{copy.details.caseStudy.metrics.map(metric => <li key={metric.label}>{metric.value} — {metric.label}</li>)}</ul>
      <p>{copy.details.caseStudy.sourceNote}</p>
      <a tabIndex={-1} href={copy.details.caseStudy.sourceUrl}>{copy.details.caseStudy.sourceLabel}</a>

      <h2>{copy.bentoProjectsTitle}</h2>
      <ul>
        {copy.projects.map((project) => (
          <li key={project.id}>
            <strong>{project.title}</strong>
            {" — "}
            {project.summary} {project.result}
          </li>
        ))}
      </ul>

      {locale === "ru" && <>
      <h2>Пресса</h2>
      <p>
        Подборка публикаций:{" "}
        <Link tabIndex={-1} href="/press/" prefetch={false}>https://kanochkinmm.ru/press/</Link>
      </p>
      <ul>
        {PRESS_ITEMS.map((item) => (
          <li key={item.id}>
            <a tabIndex={-1} href={item.href} rel="noopener noreferrer">
              {item.source}: {item.title}
            </a>
          </li>
        ))}
      </ul>
      </>}

      <h2>{copy.bentoConnectTitle}</h2>
      <a tabIndex={-1} href="/files/maxim-kanochkin-profile-ru.pdf">{copy.details.contact.profilePdf}</a>
      <ul>
        <li>
          {copy.emailLabel}:{" "}
          <a tabIndex={-1} href={`mailto:${PROFILE.emailPersonal}`}>{PROFILE.emailPersonal}</a>
        </li>
        <li>
          Telegram:{" "}
          <a tabIndex={-1} href={`https://t.me/${PROFILE.telegram.replace("@", "")}`}>
            {PROFILE.telegram}
          </a>
        </li>
        <li>
          <a tabIndex={-1} href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        </li>
        <li>
          <a tabIndex={-1} href={localePath(locale)}>{buildApexAbsoluteUrl(localePath(locale))}</a>
        </li>
        <li>
          GitHub: <a tabIndex={-1} href={PROFILE.githubUrl}>{PROFILE.github}</a>
        </li>
      </ul>
    </article>
  );
}
