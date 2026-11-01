import { PRESS_ITEMS } from "@/lib/press";
import { PROFILE } from "@/lib/site-content";
import { SITE_CANONICAL, SITE_ORIGIN } from "@/lib/site-url";

export const SITE_TITLE =
  "Максим Каночкин — ЦАТ и промышленный ИИ, ГАЗ, Нижний Новгород";

export const SITE_DESCRIPTION =
  "Начальник отдела развития, инноваций и аддитивных технологий автомобильного завода ГАЗ. С 2013: путь от слесаря-ремонтника окрасочных роботов. Промышленный ИИ в контуре завода, коботы и аддитив в действующем цехе. Нижний Новгород.";

export type PersonJsonLd = {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  jobTitle: string;
  worksFor: {
    "@type": "Organization";
    name: string;
  };
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressCountry: string;
  };
  url: string;
  email: string;
  telephone: string;
  image: string;
  sameAs: string[];
  subjectOf: Array<{
    "@type": "NewsArticle";
    headline: string;
    url: string;
    publisher: {
      "@type": "Organization";
      name: string;
    };
  }>;
};

export type PressCollectionJsonLd = {
  "@context": "https://schema.org";
  "@type": "CollectionPage";
  name: string;
  url: string;
  about: {
    "@type": "Person";
    name: string;
    url: string;
  };
  mainEntity: {
    "@type": "ItemList";
    itemListElement: Array<{
      "@type": "ListItem";
      position: number;
      url: string;
      name: string;
    }>;
  };
};

export function buildPersonJsonLd(): PersonJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: PROFILE.title,
    worksFor: {
      "@type": "Organization",
      name: PROFILE.company,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: PROFILE.location,
      addressCountry: "RU",
    },
    url: SITE_CANONICAL,
    email: PROFILE.emailPersonal,
    telephone: PROFILE.phone,
    image: `${SITE_ORIGIN}${PROFILE.photoSrc}`,
    sameAs: [
      PROFILE.githubUrl,
      PROFILE.vkUrl,
      `https://t.me/${PROFILE.telegram.replace("@", "")}`,
      PROFILE.maxUrl,
    ],
    subjectOf: PRESS_ITEMS.map((item) => ({
      "@type": "NewsArticle" as const,
      headline: item.title,
      url: item.href,
      publisher: {
        "@type": "Organization" as const,
        name: item.source,
      },
    })),
  };
}

export function buildPressCollectionJsonLd(): PressCollectionJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Пресса — Максим Каночкин",
    url: `${SITE_ORIGIN}/press`,
    about: {
      "@type": "Person",
      name: PROFILE.name,
      url: SITE_CANONICAL,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: PRESS_ITEMS.map((item, index) => ({
        "@type": "ListItem" as const,
        position: index + 1,
        url: item.href,
        name: item.title,
      })),
    },
  };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
