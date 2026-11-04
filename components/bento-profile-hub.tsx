"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import heroImage from "@/lib/hero-image.json";
import {
  ArrowLeft,
  BarChart3,
  Contact,
  Download,
  Globe,
  MapPin,
  User,
} from "lucide-react";
import { PROFILE, type BentoDomainCard } from "@/lib/site-content";
import { downloadVCard, saveContact } from "@/lib/vcard";
import { DomainIcon } from "@/components/domain-card-icons";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ConnectQr } from "@/components/connect-qr";
import { SharePageButton } from "@/components/share-page-button";
import { DemoShowcase } from "@/components/demo-showcase";
import { COBOT_DEMO } from "@/lib/cobot-demo";
import { useLocale } from "@/lib/i18n/locale-provider";
import { CatCaseStudy } from "@/components/cat-case-study";
import { PressHighlights } from "@/components/press-highlights";
import { ProjectList } from "@/components/project-list";
import { PortfolioNavigation } from "@/components/portfolio-navigation";
import { PortfolioAnalytics } from "@/components/portfolio-analytics";
import { profileAnchor } from "@/lib/portfolio-navigation";

type BentoProfileHubProps = {
  isMobile: boolean;
  onReturn: () => void;
};

const tileVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
};

const domainAreas: Record<string, string> = {
  "industrial-ai": "bento-area-ai",
  robotics: "bento-area-rob",
  additive: "bento-area-add",
  expertise: "bento-area-exp",
};

function WireframeGraphic() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="bento-wireframe"
      src="/icons/domain/lattice.png?v=10"
      alt=""
      aria-hidden="true"
      draggable={false}
    />
  );
}

function BentoDisplayName({ name }: { name: string }) {
  if (!name.includes("·")) {
    return name;
  }

  const [given, ...surnameParts] = name.split("·").map((part) => part.trim());
  const surname = surnameParts.join("·");

  return (
    <>
      <span className="bento-name-part">{given}·</span>
      <span className="bento-name-part">{surname}</span>
    </>
  );
}

function BentoHeroTile({
  isMobile,
  index,
  onReturn,
}: {
  isMobile: boolean;
  index: number;
  onReturn: () => void;
}) {
  const { copy } = useLocale();
  const backButton = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    backButton.current?.focus({ preventScroll: true });
  }, []);

  const handleSave = async () => {
    try {
      await saveContact();
    } catch {
      downloadVCard();
    }
  };

  return (
    <motion.article
      className="bento-tile bento-tile-hero"
      custom={index}
      initial="hidden"
      animate="visible"
      variants={tileVariants}
    >
      {/* Static hosting uses prebuilt responsive assets rather than /_next/image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={PROFILE.bentoHeroSrc}
        srcSet={heroImage.variants.map(({ src, width }) => `${src} ${width}w`).join(", ")}
        alt={copy.photoAlt}
        width={heroImage.width}
        height={heroImage.height}
        sizes="(max-width: 1024px) calc(100vw - 32px), 780px"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="bento-hero-image"
      />
      <div className="bento-hero-overlay" aria-hidden="true" />
      <div className="bento-hero-content">
        <div className="bento-hero-toolbar">
          <button
            ref={backButton}
            type="button"
            className="bento-back-btn"
            data-hover
            onClick={onReturn}
          >
            <ArrowLeft size={14} strokeWidth={1.75} />
            <span>{copy.backLabel}</span>
          </button>
          <LanguageSwitcher />
        </div>
        <h1 className="bento-hero-name">
          <BentoDisplayName name={copy.bentoDisplayName} />
        </h1>
        <p className="bento-hero-headline">{copy.heroHeadline}</p>
        <p className="bento-hero-tagline">{copy.heroTagline}</p>
        <button
          type="button"
          className="bento-cta"
          data-analytics-event="contact_save"
          data-hover
          onClick={handleSave}
        >
          {isMobile ? <Contact size={16} /> : <Download size={16} />}
          {copy.bentoSaveContact}
        </button>
      </div>
    </motion.article>
  );
}

function BentoDomainTile({
  card,
  index,
}: {
  card: BentoDomainCard;
  index: number;
}) {
  const areaClass = domainAreas[card.id] ?? "";

  return (
    <motion.article
      className={`bento-tile bento-tile-domain ${areaClass}`}
      custom={index}
      initial="hidden"
      animate="visible"
      variants={tileVariants}
    >
      <div className="bento-domain-body">
        <div className="bento-tile-head">
          <span className="bento-tile-icon">
            <DomainIcon icon={card.icon} />
          </span>
          <h2 className="bento-tile-title">{card.title}</h2>
        </div>

        {card.description ? (
          <p className="bento-tile-desc">{card.description}</p>
        ) : null}

        {card.bullets ? (
          <ul className="bento-tile-bullets">
            {card.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>

      {card.metrics ? (
        <div className="bento-domain-footer">
          <div className="bento-tile-metrics">
            {card.metrics.map((metric) => (
              <div key={metric.label} className="bento-metric">
                <span
                  className={`bento-metric-value${
                    metric.value.length > 8 ? " is-compact" : ""
                  }`}
                >
                  {metric.value}
                </span>
                <span className="bento-metric-label">{metric.label}</span>
              </div>
            ))}
          </div>
          {card.showWireframe ? <WireframeGraphic /> : null}
        </div>
      ) : null}
    </motion.article>
  );
}

function BentoAboutTile({ index }: { index: number }) {
  const { copy } = useLocale();

  return (
    <motion.article
      className="bento-tile bento-tile-about"
      id="about"
      tabIndex={-1}
      custom={index}
      initial="hidden"
      animate="visible"
      variants={tileVariants}
    >
      <div className="bento-tile-head">
        <span className="bento-tile-icon">
          <User size={18} strokeWidth={1.35} />
        </span>
        <h2 className="bento-tile-title">{copy.bentoAboutTitle}</h2>
      </div>
      <p className="bento-tile-desc">{copy.aboutShort}</p>
      <div className="bento-about-meta">
        <span>
          <MapPin size={14} />
          {copy.aboutMetaLocation}
        </span>
        <span>
          <Globe size={14} />
          {copy.aboutMetaAvailability}
        </span>
      </div>
    </motion.article>
  );
}

function BentoImpactTile({ index }: { index: number }) {
  const { copy } = useLocale();

  return (
    <motion.article
      className="bento-tile bento-tile-impact"
      custom={index}
      initial="hidden"
      animate="visible"
      variants={tileVariants}
    >
      <div className="bento-tile-head">
        <span className="bento-tile-icon">
          <BarChart3 size={18} strokeWidth={1.35} />
        </span>
        <h2 className="bento-tile-title">{copy.bentoImpactTitle}</h2>
      </div>
      <div className="bento-impact-grid">
        {copy.impactMetrics.map((metric) => (
          <div key={metric.label} className="bento-impact-item">
            <span className="bento-impact-value">{metric.value}</span>
            <span className="bento-impact-label">{metric.label}</span>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

function ConnectChannelIcon({
  id,
}: {
  id: "email" | "telegram" | "vk" | "max" | "wechat" | "github";
}) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
  };

  if (id === "github") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85.01 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .26.18.58.69.48A10.27 10.27 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
      </svg>
    );
  }

  if (id === "email") {
    return (
      <svg {...common}>
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M4 7.5 12 13l8-5.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (id === "telegram") {
    return (
      <svg {...common}>
        <path
          d="M21.5 4.5 2.8 11.7c-.9.35-.9 1.62.05 1.92l4.55 1.45 1.75 5.35c.28.86 1.4 1.05 1.95.32l2.55-3.35 4.85 3.55c.75.55 1.8.15 2.05-.75L22.7 5.7c.28-.98-.62-1.85-1.2-1.2Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (id === "vk") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2Zm3.01 14.62h-1.46c-.55 0-.72-.44-1.71-1.45-.86-.84-1.24-.95-1.45-.95-.3 0-.38.08-.38.49v1.33c0 .36-.11.58-1.07.58-1.58 0-3.33-.96-4.56-2.74-1.85-2.7-2.36-4.73-2.36-5.15 0-.21.08-.4.49-.4h1.46c.37 0 .5.17.65.56.72 2.1 1.94 3.94 2.44 3.94.19 0 .27-.09.27-.56V9.86c-.06-.98-.58-1.06-.58-1.41 0-.17.14-.34.37-.34h2.29c.31 0 .42.17.42.53v2.86c0 .31.14.42.22.42.19 0 .35-.11.7-.46 1.08-1.21 1.85-3.08 1.85-3.08.1-.22.27-.4.64-.4h1.46c.44 0 .53.23.44.53-.18.84-1.94 3.32-1.94 3.32-.16.25-.21.37 0 .65.15.21.64.63 1 1.02.63.7 1.12 1.29 1.25 1.7.13.4-.07.61-.48.61Z" />
      </svg>
    );
  }

  if (id === "wechat") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M9.5 4.2c-3.7 0-6.7 2.5-6.7 5.6 0 1.8 1.1 3.4 2.8 4.4l-.5 1.9 2.2-1.1c.6.2 1.3.3 2 .3.2 0 .5 0 .7-.1-.2-.5-.3-1-.3-1.6 0-3.1 3-5.6 6.7-5.6.3 0 .6 0 .9.1C16.5 5.7 13.3 4.2 9.5 4.2Zm-2.2 3.3c.5 0 .8.4.8.8s-.4.8-.8.8-.8-.4-.8-.8.4-.8.8-.8Zm4.2 0c.5 0 .8.4.8.8s-.4.8-.8.8-.8-.4-.8-.8.3-.8.8-.8Z" />
        <path d="M19.8 14.1c0-2.6-2.6-4.7-5.7-4.7s-5.7 2.1-5.7 4.7 2.6 4.7 5.7 4.7c.5 0 1.1-.1 1.6-.2l1.9.9-.4-1.6c1.5-.9 2.6-2.2 2.6-3.8Zm-7.5-.8c-.3 0-.6-.3-.6-.6s.3-.6.6-.6.6.3.6.6-.3.6-.6.6Zm3.6 0c-.3 0-.6-.3-.6-.6s.3-.6.6-.6.6.3.6.6-.3.6-.6.6Z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect
        x="3.25"
        y="3.25"
        width="17.5"
        height="17.5"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7.1 15.4V8.7l2.55 4.35L12.2 8.7v6.7"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.55 8.7h2.2M15.65 8.7v6.7"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

async function openWeChatContact() {
  const id = PROFILE.wechatId;
  try {
    await navigator.clipboard.writeText(id);
  } catch {
    // clipboard may be blocked — still try deep link
  }

  // WeChat не даёт стабильный https-профиль по ID; deep-link работает
  // только если приложение установлено и ОС не блокирует схему.
  window.location.href = PROFILE.wechatDeepLink;
}

function BentoConnectTile({ index }: { index: number }) {
  const { copy } = useLocale();
  const [wechatHint, setWechatHint] = useState(false);

  const connectChips = [
    {
      id: "github" as const,
      label: "GitHub",
      href: () => PROFILE.githubUrl,
      external: true,
    },
    {
      id: "max" as const,
      label: "MAX",
      href: () => PROFILE.maxUrl,
      external: true,
    },
    {
      id: "vk" as const,
      label: copy.vkLabel,
      href: () => PROFILE.vkUrl,
      external: true,
    },
  ] as const;

  const handleWeChat = async () => {
    await openWeChatContact();
    setWechatHint(true);
    window.setTimeout(() => setWechatHint(false), 2600);
  };

  return (
    <motion.article
      className="bento-tile bento-tile-connect"
      id="contact"
      tabIndex={-1}
      custom={index}
      initial="hidden"
      animate="visible"
      variants={tileVariants}
    >
      <header className="bento-connect-head">
        <h2 className="bento-tile-title">{copy.bentoConnectTitle}</h2>
        <p className="bento-tile-desc">{copy.connectBlurb}</p>
      </header>

      <div className="bento-connect-body">
        <div className="bento-connect-primary">
          <a className="bento-connect-link" href={`https://t.me/${PROFILE.telegram.replace("@", "")}`} target="_blank" rel="noreferrer" data-analytics-event="contact_click" data-analytics-channel="telegram">
            <span className="bento-connect-link-icon"><ConnectChannelIcon id="telegram" /></span>
            <span className="bento-connect-link-text"><span className="bento-connect-link-label">{copy.details.contact.telegram}</span><span className="bento-connect-link-value">{PROFILE.telegram}</span></span>
          </a>
          <a className="bento-connect-link" href={`mailto:${PROFILE.emailPersonal}`} data-analytics-event="contact_click" data-analytics-channel="email">
            <span className="bento-connect-link-icon"><ConnectChannelIcon id="email" /></span>
            <span className="bento-connect-link-text"><span className="bento-connect-link-label">{copy.details.contact.email}</span><span className="bento-connect-link-value">{PROFILE.emailPersonal}</span></span>
          </a>
        </div>
        <div className="bento-profile-download">
          <a href="/files/maxim-kanochkin-profile-ru.pdf" download data-analytics-event="profile_pdf"><Download size={16} aria-hidden="true" />{copy.details.contact.profilePdf}</a>
          <p>{copy.details.contact.pdfNote}</p>
        </div>

        <nav
          className="bento-connect-secondary"
          aria-label={copy.contactsSecondaryAria}
        >
          {connectChips.map((channel) => (
            <a
              key={channel.id}
              href={channel.href()}
              className="bento-connect-chip"
              data-analytics-event="contact_click"
              data-analytics-channel={channel.id}
              aria-label={channel.label}
              title={channel.label}
              {...(channel.external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              <ConnectChannelIcon id={channel.id} />
            </a>
          ))}

          <button
            type="button"
            className="bento-connect-chip"
            onClick={handleWeChat}
            data-analytics-event="contact_click"
            data-analytics-channel="wechat"
            aria-label={copy.wechatAria}
            title="WeChat"
          >
            <ConnectChannelIcon id="wechat" />
          </button>

        </nav>

        <details className="bento-qr-details"><summary>{copy.qrContactHint}</summary><ConnectQr /></details>

        <SharePageButton />

        {wechatHint ? (
          <p className="bento-connect-toast" role="status">
            {copy.wechatToast}
          </p>
        ) : null}
      </div>
    </motion.article>
  );
}

export function BentoProfileHub({ isMobile, onReturn }: BentoProfileHubProps) {
  const { copy, locale } = useLocale();
  let tileIndex = 1;

  useEffect(() => {
    const focusSection = () => {
      const id = profileAnchor(window.location.hash);
      if (!id || id === "profile") return;
      const section = document.getElementById(id);
      section?.scrollIntoView({ block: "start" });
      (id === "cobot-demo" ? section?.querySelector("button") : section)?.focus({ preventScroll: true });
    };
    focusSection();
    window.addEventListener("hashchange", focusSection);
    return () => window.removeEventListener("hashchange", focusSection);
  }, []);

  return (
    <motion.main
      id="profile"
      className="bento-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.45, delay: 0.08 } }}
      exit={{ opacity: 0 }}
    >
      <div className="bento-hub">
      <div className="bento-grid">
        <BentoHeroTile
          isMobile={isMobile}
          index={tileIndex++}
          onReturn={onReturn}
        />
        {copy.bentoDomains.map((card) => (
          <BentoDomainTile key={card.id} card={card} index={tileIndex++} />
        ))}
        <div className="bento-summary">
          <div className="bento-summary-main">
            <BentoAboutTile index={tileIndex++} />
            <BentoImpactTile index={tileIndex++} />
          </div>
          <BentoConnectTile index={tileIndex++} />
        </div>
      </div>

      <DemoShowcase copy={copy.demo} source={COBOT_DEMO.source} poster={COBOT_DEMO.poster} />

      <CatCaseStudy copy={copy.details.caseStudy} />

      <ProjectList copy={copy} />
      <PressHighlights copy={copy.details.press} />
      </div>
      <PortfolioNavigation copy={copy.details.nav} />
      <PortfolioAnalytics locale={locale} />
    </motion.main>
  );
}
