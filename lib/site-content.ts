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

export const PROFILE = {
  name: "Максим Каночкин",
  title: "Начальник отдела развития, инноваций и аддитивных технологий",
  company: "Автомобильный завод ГАЗ",
  location: "Нижний Новгород",
  website: "https://www.kanochkinmm.ru",
  email: "kanochkinmm@gaz.ru",
  phone: "+7 953 565 50 88",
  telegram: "@kanochkin",
  photoSrc: "/portrait-placeholder.svg",
  photoAlt: "Портрет Максима Каночкина",
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
        "Исключение человеческого фактора на критических участках конвейера и перенос опыта автоматизации на другие площадки (кейс УАЗ).",
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
        "Перевод части номенклатуры вспомогательных деталей на собственное производство.",
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
        "Исключение человеческого фактора на критических участках конвейера (кейс УАЗ).",
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
        "Перевод части номенклатуры вспомогательных деталей на собственное производство.",
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
    { id: "website", label: "Сайт", value: "kanochkinmm.ru", href: "https://www.kanochkinmm.ru" },
    { id: "email", label: "Email", value: "kanochkinmm@gaz.ru", href: "mailto:kanochkinmm@gaz.ru" },
    { id: "telegram", label: "Telegram", value: "@kanochkin", href: "https://t.me/kanochkin" },
    { id: "phone", label: "Телефон", value: "+7 953 565 50 88", href: "tel:+79535655088" },
    { id: "company", label: "Компания", value: "Автомобильный завод ГАЗ" },
    { id: "location", label: "Город", value: "Нижний Новгород" },
  ] satisfies ContactItem[],
} as const;

export type ScenePhase = "intro" | "implode" | "burst" | "nebula" | "reform";
