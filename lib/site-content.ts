import { PROFILE_FACTS } from "@/lib/profile-facts";
import heroImage from "@/lib/hero-image.json";

export type ContactItem = {
  id: string;
  label: string;
  value: string;
  href?: string;
};

export type PowerStackItem = {
  id: string;
  title: string;
  category: string;
  stack: string[];
  essence: string;
  keySolution: string;
  result: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  category: string;
  summary: string;
  result: string;
  technologies: string[];
  powerLevel: number;
};

export type DomainMetric = {
  value: string;
  label: string;
};

export type BentoDomainIcon = "brain" | "robot" | "cube" | "shield";

export type BentoDomainCard = {
  id: string;
  title: string;
  description: string;
  icon: BentoDomainIcon;
  metrics?: [DomainMetric, DomainMetric];
  bullets?: readonly string[];
  showSparkline?: boolean;
  showWireframe?: boolean;
};

export type ImpactMetric = {
  value: string;
  label: string;
};

export const PROFILE = {
  name: "Максим Каночкин",
  title: "Начальник отдела развития, инноваций и аддитивных технологий",
  company: "Автомобильный завод ГАЗ",
  location: "Нижний Новгород",
  website: "https://kanochkinmm.ru",
  email: "kanochkinmm@gaz.ru",
  emailPersonal: "maxi.k@mail.ru",
  phone: "+7 953 565 50 88",
  telegram: "@MaxSames",
  github: "MaxK1990II",
  githubUrl: "https://github.com/MaxK1990II",
  vkUrl: "https://vk.com/id18385380",
  maxUrl:
    "https://max.ru/u/f9LHodD0cOI9U_5US95o__gmjkzq3_4IJkK4hCHRr-2xfA-RMUTsLW011es",
  wechatId: "Maxim_Ka",
  /** Deep-link в приложение WeChat (на сайте часто блокируется ОС — есть fallback copy) */
  wechatDeepLink: "weixin://contacts/profile/Maxim_Ka",
  wechatQrSrc: "/icons/wechat-qr.png",
  photoSrc: "/maxim-kanochkin-portrait.png",
  bentoHeroSrc: heroImage.src,
  photoAlt: "Портрет Максима Каночкина",
  availabilityLabel: "Доступен",
  bentoDisplayName: "Максим Каночкин",
  heroHeadline: "Драйвер промышленных инноваций",
  heroTagline:
    "Трансформирую сложные производственные вызовы в работающие решения на базе ИИ, робототехники\nи\u00A0аддитивных технологий.",
  aboutShort:
    `С ${PROFILE_FACTS.careerStartYear} года прошёл путь от слесаря-ремонтника окрасочных роботов до начальника отдела развития, инноваций и аддитивных технологий и руководителя ЦАТ на Горьковском автозаводе. Я не верю в «инновации ради инноваций». Мой подход — это глубокое понимание болей реального производства, грязных рук и жестких бюджетов. Я создаю технологии, которые работают на конвейере 24/7, заменяя бюрократию алгоритмами, а рутину — роботами.`,
  aboutMetaLocation: "Нижний Новгород",
  aboutMetaAvailability: "Открыт к диалогу с работодателями и редакцией",
  bentoAboutTitle: "Обо мне",
  bentoImpactTitle: "Цифры, которые говорят за себя",
  bentoConnectTitle: "Связаться",
  bentoSaveContact: "Сохранить контакт",
  bentoProjectsTitle: "Проекты",
  statusLine:
    "Now: Industrial AI & Robotics @ GAZ Group | Expert Judge @ International Engineering Contests",

  aboutManifesto:
    "Я занимаюсь цифровой трансформацией промышленности не на бумаге, а в цехах. Мой подход — создание автономных систем, которые решают конкретные задачи: от контроля качества окраски до обучения коллаборативных роботов сложным траекториям.",
  aboutPrinciples: [
    "Автономность: Разработка ИИ-решений, независимых от внешних облаков и санкционных рисков.",
    "Гибкость: Использование аддитивных технологий для моментальной адаптации производства.",
    "Безопасность: Интеграция технологий с учётом промышленной безопасности и человеческого фактора.",
  ],
  aboutKeyCompetencies: [
    "AI/CV: Построение пайплайнов детекции дефектов (YOLO/DINO), локальные голосовые интерфейсы на базе Whisper/Vosk/Qwen.",
    "Robotics: Оффлайн-программирование и пусконаладка коботов (JAKA, Robopro, UR).",
    "Software: Fullstack-разработка инженерных интерфейсов и дашбордов (React, Node.js, Python).",
    "Expertise: Экспертная оценка инженерных проектов и судейство на международных технологических конкурсах.",
  ],

  roles: [
    "Робототехник",
    "Автоматизатор",
    "Интегратор систем",
    "Мехатроник",
    "ИИ-специалист",
    "CV-инженер",
    "Data Engineer",
    "ML-архитектор",
    "Программист",
    "Разработчик",
    "Fullstack Dev",
    "Архитектор ПО",
    "3D-дизайнер",
    "Конструктор",
    "Промдизайнер",
    "Аддитивщик",
    "Инженер",
    "Проектировщик",
    "Руководитель R&D",
    "Технолог",
    "Исследователь",
    "Новатор",
    "Визуализатор",
    "Эксперт-судья",
    "Наставник",
  ] as const,

  tags: ["Робототехника", "ИИ", "3D", "Computer Vision"],

  powerStack: [
    {
      id: "industrial-ai",
      title: "Industrial AI & Vision",
      category: "AI Systems",
      stack: ["Python", "React", "Microservices", "Qwen", "Vosk", "Porcupine"],
      essence:
        "Разработка и внедрение отказоустойчивой системы сбора телеметрии в реальном времени.",
      keySolution:
        "Реализация полностью автономного голосового ассистента (Edge AI). Обработка команд в закрытом контуре предприятия без облачных сервисов.",
      result:
        "Визуализация критических параметров цеха окраски и бесконтактное управление интерфейсом в условиях промышленного шума.",
    },
    {
      id: "robotics",
      title: "Robotics & Automation",
      category: "Robotics",
      stack: ["JAKA", "RoboDK", "Python"],
      essence:
        "Проектирование и пусконаладка роботизированных ячеек для высокоточных операций.",
      keySolution:
        "Разработка и оптимизация траекторий движения роботов для нанесения мастик и клеевых составов на сложные геометрические поверхности (кузова автомобилей). Интеграция систем компьютерного зрения для детекции дефектов.",
      result:
        "Исключение человеческого фактора на критических участках конвейера и перенос опыта автоматизации на другие площадки.",
    },
    {
      id: "additive",
      title: "Additive Manufacturing",
      category: "3D / Manufacturing",
      stack: ["Bambu Lab", "FDM/SLA", "Industrial Design"],
      essence:
        "Полный цикл производства: от реверс-инжиниринга до печати функциональных деталей.",
      keySolution:
        "Оперативное изготовление оснастки, шаблонов и запасных частей для промышленного оборудования, сокращающее время простоя линий.",
      result:
        `${PROFILE_FACTS.serialPositions}+ серийных позиций; до ${PROFILE_FACTS.sparePartsCoveragePercent}% пластиковых ЗИП окрасочных роботов внутри завода; эффект более ${PROFILE_FACTS.annualSavingsMillionsRub} млн ₽/год.`,
    },
    {
      id: "expertise",
      title: "Engineering Expertise",
      category: "Expertise",
      stack: ["Technical Audit", "Mentoring", "Project Management"],
      essence:
        "Оценка инженерных проектов в рамках международных и региональных конкурсов по выявлению технологических талантов.",
      keySolution:
        "Технический аудит проектов в области робототехники, ИИ и промышленного дизайна. Наставничество и методологическая поддержка молодых инженеров.",
      result:
        "Формирование кадрового резерва и оценка жизнеспособности инновационных разработок на ранних стадиях.",
    },
  ] satisfies PowerStackItem[],

  projects: [
    {
      id: "dashboard",
      title: "Интеллектуальная система мониторинга и управления",
      category: "Industrial AI",
      summary:
        "Dashboard реального времени для цеха окраски с голосовым Edge-AI-ассистентом в закрытом контуре.",
      result:
        "Бесконтактное управление и визуализация критических параметров в условиях промышленного шума.",
      technologies: ["Python", "React", "Qwen", "Vosk", "Porcupine", "YOLOv8"],
      powerLevel: 9,
    },
    {
      id: "cobots",
      title: "Автоматизация с коллаборативными роботами",
      category: "Robotics",
      summary:
        "Проектирование ячеек с коботами JAKA, настройка траекторий нанесения мастики на кузова.",
      result:
        "Исключение человеческого фактора на критических участках конвейера; опыт переносился на другие площадки.",
      technologies: ["JAKA", "RoboDK", "Python", "Computer Vision"],
      powerLevel: 8,
    },
    {
      id: "cat",
      title: "Центр аддитивных технологий (ЦАТ)",
      category: "Additive Tech",
      summary:
        "Полный цикл: от реверс-инжиниринга до 3D-печати функциональных деталей и промышленного дизайна.",
      result:
        `${PROFILE_FACTS.serialPositions}+ серийных позиций; до ${PROFILE_FACTS.sparePartsCoveragePercent}% пластиковых ЗИП окрасочных роботов внутри завода; эффект более ${PROFILE_FACTS.annualSavingsMillionsRub} млн ₽/год.`,
      technologies: ["Bambu Lab", "FDM/SLA", "CAD", "Industrial Design"],
      powerLevel: 7,
    },
    {
      id: "judging",
      title: "Экспертная деятельность и наставничество",
      category: "Expertise",
      summary:
        "Судейство международных инженерных конкурсов, технический аудит проектов в области робототехники, ИИ и промдизайна.",
      result:
        "Формирование кадрового резерва и оценка жизнеспособности инновационных разработок.",
      technologies: ["Technical Audit", "Mentoring", "Project Management"],
      powerLevel: 6,
    },
  ] satisfies ProjectItem[],

  contacts: [
    { id: "website", label: "Сайт", value: "kanochkinmm.ru", href: "https://kanochkinmm.ru" },
    {
      id: "email-personal",
      label: "Email (личн.)",
      value: "maxi.k@mail.ru",
      href: "mailto:maxi.k@mail.ru",
    },
    {
      id: "email",
      label: "Email (завод)",
      value: "kanochkinmm@gaz.ru",
      href: "mailto:kanochkinmm@gaz.ru",
    },
    {
      id: "telegram",
      label: "Telegram",
      value: "@MaxSames",
      href: "https://t.me/MaxSames",
    },
    {
      id: "github",
      label: "GitHub",
      value: "MaxK1990II",
      href: "https://github.com/MaxK1990II",
    },
    {
      id: "vk",
      label: "ВКонтакте",
      value: "vk.com/id18385380",
      href: "https://vk.com/id18385380",
    },
    {
      id: "max",
      label: "MAX",
      value: "max.ru",
      href: "https://max.ru/u/f9LHodD0cOI9U_5US95o__gmjkzq3_4IJkK4hCHRr-2xfA-RMUTsLW011es",
    },
    {
      id: "wechat",
      label: "WeChat",
      value: "Maxim_Ka",
    },
    { id: "phone", label: "Телефон", value: "+7 953 565 50 88", href: "tel:+79535655088" },
    { id: "company", label: "Компания", value: "Автомобильный завод ГАЗ" },
    { id: "location", label: "Город", value: "Нижний Новгород" },
  ] satisfies ContactItem[],

  bentoDomains: [
    {
      id: "industrial-ai",
      title: "Промышленный\nИИ",
      description:
        "ИИ-решения для предиктивного обслуживания, контроля качества и оптимизации процессов.",
      icon: "brain",
      showSparkline: true,
      metrics: [
        { value: `${PROFILE_FACTS.localDataPercent}%`, label: "Безопасность данных" },
        { value: "on-prem", label: "Решения в контуре предприятия" },
      ],
    },
    {
      id: "robotics",
      title: "Робототехника",
      description:
        `Интеграция роботизированных систем и программирование траекторий для ${PROFILE_FACTS.robotBodyTypes}+ типов кузовов и кабин.`,
      icon: "robot",
      showSparkline: true,
      metrics: [
        { value: `${PROFILE_FACTS.deploymentCostReduction}`, label: "Ниже стоимость внедрения" },
        { value: "полный цикл", label: "Разработка → ПНР → сопровождение" },
      ],
    },
    {
      id: "additive",
      title: "Аддитивные\nтехнологии",
      description:
        "Аддитивные решения полного цикла — от прототипирования до серийного выпуска.",
      icon: "cube",
      showWireframe: true,
      metrics: [
        { value: `>${PROFILE_FACTS.annualSavingsMillionsRub} млн ₽`, label: "Экономический эффект в год" },
        { value: `до ${PROFILE_FACTS.sparePartsCoveragePercent}%`, label: "пластиковых вспомогательных деталей" },
      ],
    },
    {
      id: "expertise",
      title: "Экспертиза",
      description:
        "Стратегия, технический аудит и наставничество — от цеха до международных конкурсов.",
      icon: "shield",
      bullets: [
        "Промышленная стратегия",
        "Технологический роадмап",
        "Цифровая трансформация",
        "Умное производство",
        "Управление проектами",
        "Интеграция систем",
      ],
    },
  ] satisfies BentoDomainCard[],

  impactMetrics: [
    { value: `${PROFILE_FACTS.yearsInIndustry}`, label: "Лет в индустриальном секторе" },
    { value: `до ${PROFILE_FACTS.sparePartsCoveragePercent}%`, label: "пластиковых запчастей роботов окраски" },
    { value: `${PROFILE_FACTS.itProjects}`, label: `IT/R&D проектов в ${PROFILE_FACTS.referenceYear} году` },
    { value: `${PROFILE_FACTS.inHousePercent}%`, label: "In-house разработка" },
  ] satisfies ImpactMetric[],

  connectBlurb: "Напишите на личную почту или в Telegram.",
} as const;

export type ScenePhase = "intro" | "implode" | "burst" | "nebula" | "reform";
