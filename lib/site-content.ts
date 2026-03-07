export type ContactAction = {
  id: "phone" | "email" | "telegram" | "whatsapp";
  label: string;
  value: string;
  href?: string;
  note: string;
  copyValue?: string;
};

export type ProjectEntry = {
  id: string;
  title: string;
  category: string;
  role: string;
  summary: string;
  impact: string;
};

export const HERO_NAME = "Максим Каночкин";

export const HERO_ROLES = [
  "Робототехник",
  "3D-дизайнер",
  "Программист",
  "Инженер",
  "Разработчик",
  "Автоматизатор",
  "ИИ-специалист",
  "Визуализатор",
  "Кодер",
  "Системщик",
  "Дизайнер",
  "Художник",
  "Креатор",
  "Изобретатель",
  "Новатор",
  "Наставник",
  "Педагог",
  "Руководитель",
  "Исследователь",
  "Аналитик",
  "Эксперт",
  "Специалист",
];

export const HERO_ACTIONS = [
  {
    id: "contacts",
    label: "Контакты",
    description: "Связаться, сохранить vCard, открыть QR",
  },
  {
    id: "projects",
    label: "Проекты",
    description: "Кураторская подборка ключевых направлений",
  },
  {
    id: "portrait",
    label: "Портрет",
    description: "Кто я, мой вектор и мой подход",
  },
] as const;

export const CONTACT_INTRO = {
  eyebrow: "Direct channel",
  title: "Контактный профиль",
  description:
    "Минималистичная панель для быстрого контакта, переноса визитки в телефон и мгновенного перехода к нужному каналу связи.",
  website: "https://www.kanochkinmm.ru/",
  vcardHref: "/contact.vcf",
  qrValue: "https://www.kanochkinmm.ru/contact.vcf",
};

export const CONTACT_ACTIONS: ContactAction[] = [
  {
    id: "phone",
    label: "Телефон",
    value: "+7 (999) 123-45-67",
    href: "tel:+79991234567",
    note: "Тестовый номер для демонстрации сценария связи.",
    copyValue: "+79991234567",
  },
  {
    id: "email",
    label: "Email",
    value: "hello@kanochkinmm.ru",
    href: "mailto:hello@kanochkinmm.ru",
    note: "Тестовый адрес для проверки почтового сценария.",
  },
  {
    id: "telegram",
    label: "Telegram",
    value: "@maxk_future",
    href: "https://t.me/maxk_future",
    note: "Быстрый тестовый канал для мгновенного перехода.",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+7 (999) 123-45-67",
    href: "https://wa.me/79991234567",
    note: "Тестовый чат для проверки deep-link на мобильных.",
    copyValue: "+79991234567",
  },
];

export const PORTRAIT_CONTENT = {
  eyebrow: "Personal frame",
  title: "Инженерный портрет",
  description:
    "Технологическое мышление, системный взгляд и тяга к будущему. Я соединяю инженерную дисциплину, цифровое творчество и прикладные инновации.",
  imageSrc: "/portrait-placeholder.svg",
  imageAlt: "Портрет-заглушка Максима Каночкина",
  highlights: [
    "Инженерия и автоматизация",
    "Робототехника и 3D",
    "ИИ и компьютерное зрение",
  ],
  paragraphs: [
    "Мне близки проекты, где идея превращается в работающую систему: от исследования и моделирования до внедрения и масштабирования.",
    "Я ценю чистую архитектуру, сильную визуальную подачу и решения, которые ощущаются современными не только сегодня, но и немного впереди времени.",
    "Этот сайт задуман как цифровая визитка высокого класса: коротко, уверенно, технологично и без лишнего шума.",
  ],
};

export const FEATURED_PROJECTS: ProjectEntry[] = [
  {
    id: "robotics",
    title: "Роботизированные системы",
    category: "Automation",
    role: "Архитектура и интеграция",
    summary:
      "Проектирование сценариев автоматизации, в которых механика, логика и пользовательский опыт работают как единый контур.",
    impact: "Снижение ручной рутины и рост повторяемости процессов.",
  },
  {
    id: "additive",
    title: "Аддитивное производство",
    category: "3D / Manufacturing",
    role: "Стратегия применения",
    summary:
      "Выбор точек, где 3D-печать и цифровое моделирование дают максимальную скорость в прототипировании и производственных улучшениях.",
    impact: "Быстрый переход от идеи к физическому результату.",
  },
  {
    id: "vision",
    title: "Компьютерное зрение",
    category: "Vision Systems",
    role: "Исследование и внедрение",
    summary:
      "Создание прикладных сценариев контроля, анализа и интеллектуального наблюдения на базе машинного зрения.",
    impact: "Больше точности, прозрачности и данных для решений.",
  },
  {
    id: "ai",
    title: "ИИ-инструменты",
    category: "AI Systems",
    role: "Продуктовый дизайн",
    summary:
      "Подбор и внедрение AI-подходов там, где они усиливают экспертизу, а не просто добавляют модный слой поверх процесса.",
    impact: "Ускорение анализа, генерации и инженерной поддержки.",
  },
];
