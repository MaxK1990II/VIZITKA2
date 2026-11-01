import type {
  BentoDomainCard,
  ImpactMetric,
} from "@/lib/site-content";
import type { Locale } from "@/lib/i18n/locale";

export type LocalizedProject = {
  id: string;
  title: string;
  category: string;
  summary: string;
  result: string;
  technologies: readonly string[];
  powerLevel: number;
};

export type SiteCopy = {
  introLabel: string;
  introHint: string;
  introRoleLine: string;
  name: string;
  roles: readonly string[];
  photoAlt: string;
  bentoDisplayName: string;
  heroHeadline: string;
  heroTagline: string;
  bentoSaveContact: string;
  backLabel: string;
  bentoAboutTitle: string;
  aboutShort: string;
  aboutMetaLocation: string;
  aboutMetaAvailability: string;
  bentoImpactTitle: string;
  impactMetrics: readonly ImpactMetric[];
  bentoConnectTitle: string;
  connectBlurb: string;
  emailLabel: string;
  vkLabel: string;
  contactsPrimaryAria: string;
  contactsSecondaryAria: string;
  wechatAria: string;
  wechatToast: string;
  shareLabel: string;
  shareAria: string;
  shareCopiedToast: string;
  shareFailedToast: string;
  qrContactHint: string;
  bentoProjectsTitle: string;
  powerLevelLabel: string;
  languageSwitcherAria: string;
  bentoDomains: readonly BentoDomainCard[];
  projects: readonly LocalizedProject[];
  domainIconLabels: {
    brain: string;
    robot: string;
    cube: string;
    shield: string;
  };
};

const sharedProjectMeta = {
  dashboard: {
    technologies: ["Python", "React", "Qwen", "Vosk", "Porcupine", "YOLOv8"],
    powerLevel: 9,
  },
  cobots: {
    technologies: ["JAKA", "RoboDK", "Python", "Computer Vision"],
    powerLevel: 8,
  },
  cat: {
    technologies: ["Bambu Lab", "FDM/SLA", "CAD", "Industrial Design"],
    powerLevel: 7,
  },
  judging: {
    technologies: ["Technical Audit", "Mentoring", "Project Management"],
    powerLevel: 6,
  },
} as const;

const ru: SiteCopy = {
  introLabel: "Инженерное портфолио",
  introHint: "нажмите или проведите пальцем",
  introRoleLine:
    "Начальник отдела развития, инноваций и аддитивных технологий · автомобильный завод ГАЗ · Нижний Новгород",
  name: "Максим Каночкин",
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
  ],
  photoAlt: "Портрет Максима Каночкина",
  bentoDisplayName: "Максим Каночкин",
  heroHeadline: "Драйвер промышленных инноваций",
  heroTagline:
    "Трансформирую сложные производственные вызовы в работающие решения на базе ИИ, робототехники\nи\u00A0аддитивных технологий.",
  bentoSaveContact: "Сохранить контакт",
  backLabel: "Назад",
  bentoAboutTitle: "Обо мне",
  aboutShort:
    "С 2013 года прошёл путь от слесаря-ремонтника окрасочных роботов до начальника отдела развития, инноваций и аддитивных технологий и руководителя ЦАТ на Горьковском автозаводе. Я не верю в «инновации ради инноваций». Мой подход — это глубокое понимание болей реального производства, грязных рук и жестких бюджетов. Я создаю технологии, которые работают на конвейере 24/7, заменяя бюрократию алгоритмами, а рутину — роботами.",
  aboutMetaLocation: "Нижний Новгород",
  aboutMetaAvailability: "Открыт к диалогу с работодателями и редакцией",
  bentoImpactTitle: "Цифры, которые говорят за себя",
  impactMetrics: [
    { value: "13", label: "Лет в индустриальном секторе" },
    { value: "до 70%", label: "пластиковых запчастей роботов окраски" },
    { value: "6+", label: "IT/R&D проектов в 2026 году" },
    { value: "100%", label: "In-house разработка" },
  ],
  bentoConnectTitle: "Связаться",
  connectBlurb: "Напишите на личную почту или в Telegram.",
  emailLabel: "Почта",
  vkLabel: "ВКонтакте",
  contactsPrimaryAria: "Основные контакты",
  contactsSecondaryAria: "Другие контакты",
  wechatAria: "WeChat Maxim_Ka — скопировать ID и открыть",
  wechatToast: "WeChat ID скопирован — вставьте в «Добавить друга»",
  shareLabel: "Поделиться",
  shareAria: "Поделиться ссылкой на портфолио",
  shareCopiedToast: "Ссылка скопирована",
  shareFailedToast: "Не удалось скопировать ссылку",
  qrContactHint: "Сканируйте — сохранить контакт",
  bentoProjectsTitle: "Проекты",
  powerLevelLabel: "Power Level",
  languageSwitcherAria: "Выбор языка",
  domainIconLabels: {
    brain: "Промышленный ИИ",
    robot: "Робототехника",
    cube: "Аддитивные технологии",
    shield: "Экспертиза",
  },
  bentoDomains: [
    {
      id: "industrial-ai",
      title: "Промышленный\nИИ",
      description:
        "ИИ-решения для предиктивного обслуживания, контроля качества и оптимизации процессов.",
      icon: "brain",
      showSparkline: true,
      metrics: [
        { value: "100%", label: "Безопасность данных" },
        { value: "on-prem", label: "Решения в контуре предприятия" },
      ],
    },
    {
      id: "robotics",
      title: "Робототехника",
      description:
        "Интеграция роботизированных систем и программирование траекторий для 100+ типов кузовов и кабин.",
      icon: "robot",
      showSparkline: true,
      metrics: [
        { value: "2–3×", label: "Ниже стоимость внедрения" },
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
        { value: ">5 млн ₽", label: "Экономический эффект в год" },
        { value: "до 70%", label: "пластиковых вспомогательных деталей" },
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
  ],
  projects: [
    {
      id: "dashboard",
      title: "Интеллектуальная система мониторинга и управления",
      category: "Industrial AI",
      summary:
        "Dashboard реального времени для цеха окраски с голосовым Edge-AI-ассистентом в закрытом контуре.",
      result:
        "Бесконтактное управление и визуализация критических параметров в условиях промышленного шума.",
      ...sharedProjectMeta.dashboard,
    },
    {
      id: "cobots",
      title: "Автоматизация с коллаборативными роботами",
      category: "Robotics",
      summary:
        "Проектирование ячеек с коботами JAKA, настройка траекторий нанесения мастики на кузова.",
      result:
        "Исключение человеческого фактора на критических участках конвейера; опыт переносился на другие площадки.",
      ...sharedProjectMeta.cobots,
    },
    {
      id: "cat",
      title: "Центр аддитивных технологий (ЦАТ)",
      category: "Additive Tech",
      summary:
        "Полный цикл: от реверс-инжиниринга до 3D-печати функциональных деталей и промышленного дизайна.",
      result:
        "50+ серийных позиций; до 70% пластиковых ЗИП окрасочных роботов внутри завода; эффект более 5 млн ₽/год.",
      ...sharedProjectMeta.cat,
    },
    {
      id: "judging",
      title: "Экспертная деятельность и наставничество",
      category: "Expertise",
      summary:
        "Судейство международных инженерных конкурсов, технический аудит проектов в области робототехники, ИИ и промдизайна.",
      result:
        "Формирование кадрового резерва и оценка жизнеспособности инновационных разработок.",
      ...sharedProjectMeta.judging,
    },
  ],
};

const en: SiteCopy = {
  introLabel: "Engineering portfolio",
  introHint: "tap, click, or swipe to explore",
  introRoleLine:
    "Head of development, innovation and additive technology · GAZ automotive plant · Nizhny Novgorod",
  name: "Maxim Kanochkin",
  roles: [
    "Robotics engineer",
    "Automation lead",
    "Systems integrator",
    "Mechatronics engineer",
    "AI specialist",
    "CV engineer",
    "Data engineer",
    "ML architect",
    "Software engineer",
    "Developer",
    "Full-stack developer",
    "Software architect",
    "3D designer",
    "Mechanical designer",
    "Industrial designer",
    "Additive manufacturing engineer",
    "Engineer",
    "Systems designer",
    "R&D lead",
    "Process engineer",
    "Researcher",
    "Innovator",
    "Visual engineer",
    "Expert judge",
    "Mentor",
  ],
  photoAlt: "Portrait of Maxim Kanochkin",
  bentoDisplayName: "Maxim Kanochkin",
  heroHeadline: "Driving industrial innovation",
  heroTagline:
    "I turn tough shop-floor challenges into working solutions powered by AI, robotics,\nand\u00A0additive manufacturing.",
  bentoSaveContact: "Save contact",
  backLabel: "Back",
  bentoAboutTitle: "About",
  aboutShort:
    "Since 2013 I have gone from paint-robot maintenance mechanic to head of development, innovation and additive technology — and of the Additive Technology Center — at the GAZ plant. I don’t buy “innovation for innovation’s sake.” My work begins with real production pain — dirty hands, hard constraints, and tight budgets. I build systems that run on the line 24/7: algorithms instead of paperwork, robots instead of rote labor.",
  aboutMetaLocation: "Nizhny Novgorod",
  aboutMetaAvailability: "Open to employers and editors",
  bentoImpactTitle: "Numbers that speak for themselves",
  impactMetrics: [
    { value: "13", label: "Years in industrial engineering" },
    { value: "~70%", label: "paint-robot plastic spare parts" },
    { value: "6+", label: "IT/R&D projects in 2026" },
    { value: "100%", label: "In-house development" },
  ],
  bentoConnectTitle: "Get in touch",
  connectBlurb: "Write to the personal email or Telegram.",
  emailLabel: "Email",
  vkLabel: "VK",
  contactsPrimaryAria: "Primary contacts",
  contactsSecondaryAria: "More contacts",
  wechatAria: "WeChat Maxim_Ka — copy ID and open",
  wechatToast: "WeChat ID copied — paste it in Add Friend",
  shareLabel: "Share",
  shareAria: "Share portfolio link",
  shareCopiedToast: "Link copied",
  shareFailedToast: "Could not copy the link",
  qrContactHint: "Scan to save the contact",
  bentoProjectsTitle: "Projects",
  powerLevelLabel: "Power Level",
  languageSwitcherAria: "Language",
  domainIconLabels: {
    brain: "Industrial AI",
    robot: "Robotics",
    cube: "Additive manufacturing",
    shield: "Expertise",
  },
  bentoDomains: [
    {
      id: "industrial-ai",
      title: "Industrial\nAI",
      description:
        "AI for predictive maintenance, quality inspection, and process optimization.",
      icon: "brain",
      showSparkline: true,
      metrics: [
        { value: "100%", label: "Data stays on-site" },
        { value: "on-prem", label: "Plant-network solutions" },
      ],
    },
    {
      id: "robotics",
      title: "Robotics",
      description:
        "Robot cell integration and path programming for 100+ body and cab types.",
      icon: "robot",
      showSparkline: true,
      metrics: [
        { value: "2–3×", label: "Lower deployment cost" },
        { value: "end-to-end", label: "Design → commissioning → support" },
      ],
    },
    {
      id: "additive",
      title: "Additive\nmanufacturing",
      description:
        "Full-cycle additive solutions — from prototypes to production parts.",
      icon: "cube",
      showWireframe: true,
      metrics: [
        { value: ">₽5M", label: "Annual economic impact" },
        { value: "~70%", label: "plastic auxiliary robot parts" },
      ],
    },
    {
      id: "expertise",
      title: "Expertise",
      description:
        "Strategy, technical audits, and mentorship — from the shop floor to international contests.",
      icon: "shield",
      bullets: [
        "Industrial strategy",
        "Technology roadmap",
        "Digital transformation",
        "Smart manufacturing",
        "Project leadership",
        "Systems integration",
      ],
    },
  ],
  projects: [
    {
      id: "dashboard",
      title: "Intelligent monitoring & control system",
      category: "Industrial AI",
      summary:
        "Real-time paint-shop dashboard with a voice Edge-AI assistant running fully on-prem.",
      result:
        "Hands-free control and live visibility of critical parameters — even in industrial noise.",
      ...sharedProjectMeta.dashboard,
    },
    {
      id: "cobots",
      title: "Collaborative robot automation",
      category: "Robotics",
      summary:
        "JAKA cobot cell design and sealant path programming for vehicle bodies.",
      result:
        "Took people out of critical conveyor stations; the approach was reused on other sites.",
      ...sharedProjectMeta.cobots,
    },
    {
      id: "cat",
      title: "Additive Technology Center (ATC)",
      category: "Additive Tech",
      summary:
        "Full cycle: reverse engineering, functional 3D-printed parts, and industrial design.",
      result:
        "50+ serial part numbers; up to 70% of paint-robot plastic spares in-house; over ₽5M annual impact.",
      ...sharedProjectMeta.cat,
    },
    {
      id: "judging",
      title: "Expert review & mentorship",
      category: "Expertise",
      summary:
        "Judging international engineering contests; technical audits across robotics, AI, and industrial design.",
      result:
        "Building the talent pipeline and stress-testing early-stage innovation.",
      ...sharedProjectMeta.judging,
    },
  ],
};

const zh: SiteCopy = {
  introLabel: "工程作品集",
  introHint: "点击或滑动继续",
  introRoleLine: "发展、创新与增材技术部门负责人 · 高尔基汽车厂（GAZ） · 下诺夫哥罗德",
  name: "马克西姆·卡诺奇金",
  roles: [
    "机器人工程师",
    "自动化负责人",
    "系统集成工程师",
    "机电工程师",
    "人工智能专家",
    "计算机视觉工程师",
    "数据工程师",
    "机器学习架构师",
    "软件工程师",
    "开发工程师",
    "全栈开发",
    "软件架构师",
    "三维设计师",
    "机械设计师",
    "工业设计师",
    "增材制造工程师",
    "工程师",
    "系统设计师",
    "研发负责人",
    "工艺工程师",
    "研究员",
    "创新者",
    "可视化工程师",
    "专家评委",
    "导师",
  ],
  photoAlt: "马克西姆·卡诺奇金肖像",
  bentoDisplayName: "马克西姆·卡诺奇金",
  heroHeadline: "驱动工业创新",
  heroTagline:
    "把复杂的生产难题转化为可落地的解决方案——基于人工智能、机器人技术与增材制造。",
  bentoSaveContact: "保存联系人",
  backLabel: "返回",
  bentoAboutTitle: "关于我",
  aboutShort:
    "自 2013 年起，我从喷涂机器人维修钳工做起，如今在高尔基汽车厂担任发展、创新与增材技术部门负责人及增材技术中心负责人。我不相信“为了创新而创新”。真正的起点，是产线痛点、脏活累活和硬预算。我打造的是能在流水线上 24/7 稳定运行的技术：用算法替代繁琐流程，用机器人替代重复劳动。",
  aboutMetaLocation: "下诺夫哥罗德",
  aboutMetaAvailability: "欢迎雇主与媒体来信",
  bentoImpactTitle: "用数字说话",
  impactMetrics: [
    { value: "13", label: "年工业工程经验" },
    { value: "~70%", label: "机器人进口备件国产化" },
    { value: "6+", label: "2026 年 IT/研发项目" },
    { value: "100%", label: "自主研发" },
  ],
  bentoConnectTitle: "联系方式",
  connectBlurb: "请通过个人邮箱或 Telegram 联系。",
  emailLabel: "邮箱",
  vkLabel: "VK",
  contactsPrimaryAria: "主要联系方式",
  contactsSecondaryAria: "其他联系方式",
  wechatAria: "微信 Maxim_Ka — 复制 ID 并打开",
  wechatToast: "微信 ID 已复制 — 请在「添加朋友」中粘贴",
  shareLabel: "分享",
  shareAria: "分享作品集链接",
  shareCopiedToast: "链接已复制",
  shareFailedToast: "无法复制链接",
  qrContactHint: "扫码保存联系人",
  bentoProjectsTitle: "项目",
  powerLevelLabel: "能力指数",
  languageSwitcherAria: "选择语言",
  domainIconLabels: {
    brain: "工业人工智能",
    robot: "机器人技术",
    cube: "增材制造",
    shield: "专业能力",
  },
  bentoDomains: [
    {
      id: "industrial-ai",
      title: "工业\n人工智能",
      description: "面向预测性维护、质量检测与工艺优化的人工智能方案。",
      icon: "brain",
      showSparkline: true,
      metrics: [
        { value: "100%", label: "数据不出厂" },
        { value: "本地部署", label: "企业内网方案" },
      ],
    },
    {
      id: "robotics",
      title: "机器人技术",
      description: "机器人系统集成，以及 100 多种车身与驾驶室的轨迹编程。",
      icon: "robot",
      showSparkline: true,
      metrics: [
        { value: "2–3×", label: "实施成本更低" },
        { value: "全流程", label: "设计 → 调试 → 运维" },
      ],
    },
    {
      id: "additive",
      title: "增材\n制造",
      description: "全链路增材方案——从原型到量产零件。",
      icon: "cube",
      showWireframe: true,
      metrics: [
        { value: ">500万卢布", label: "年经济效益" },
        { value: "~70%", label: "替代进口部件" },
      ],
    },
    {
      id: "expertise",
      title: "专业能力",
      description:
        "战略、技术审计与辅导——从车间一线到国际工程竞赛。",
      icon: "shield",
      bullets: [
        "工业战略",
        "技术路线图",
        "数字化转型",
        "智能制造",
        "项目管理",
        "系统集成",
      ],
    },
  ],
  projects: [
    {
      id: "dashboard",
      title: "智能监控与管理系统",
      category: "工业人工智能",
      summary:
        "喷涂车间实时看板，搭配完全本地部署的语音边缘人工智能助手。",
      result: "在工业噪声环境下实现关键参数可视化与非接触操控。",
      ...sharedProjectMeta.dashboard,
    },
    {
      id: "cobots",
      title: "协作机器人自动化",
      category: "机器人技术",
      summary: "JAKA 协作机器人单元设计，以及车身涂胶轨迹编程与调试。",
      result: "在关键工位消除人为因素；方法后来用到了其他产线。",
      ...sharedProjectMeta.cobots,
    },
    {
      id: "cat",
      title: "增材技术中心",
      category: "增材技术",
      summary: "全流程：逆向工程、功能件 3D 打印与工业设计。",
      result: "50 多个系列件号；喷涂机器人塑料备件约 70% 厂内自制；年效益超过 500 万卢布。",
      ...sharedProjectMeta.cat,
    },
    {
      id: "judging",
      title: "专家评审与辅导",
      category: "专业能力",
      summary:
        "担任国际工程竞赛评委；对机器人、人工智能与工业设计项目进行技术审计。",
      result: "建设人才储备，并在早期阶段评估创新方案的可行性。",
      ...sharedProjectMeta.judging,
    },
  ],
};

const ko: SiteCopy = {
  introLabel: "엔지니어링 포트폴리오",
  introHint: "탭하거나 스와이프해 보세요",
  introRoleLine:
    "개발·혁신·적층기술 부서장 · GAZ 자동차 공장 · 니즈니노브고로드",
  name: "막심 카노츠킨",
  roles: [
    "로봇 엔지니어",
    "자동화 리드",
    "시스템 통합 엔지니어",
    "메카트로닉스 엔지니어",
    "AI 전문가",
    "CV 엔지니어",
    "데이터 엔지니어",
    "ML 아키텍트",
    "소프트웨어 엔지니어",
    "개발자",
    "풀스택 개발자",
    "소프트웨어 아키텍트",
    "3D 디자이너",
    "기계 설계자",
    "산업 디자이너",
    "적층제조 엔지니어",
    "엔지니어",
    "시스템 설계자",
    "R&D 리드",
    "공정 엔지니어",
    "연구원",
    "혁신가",
    "시각화 엔지니어",
    "전문 심사위원",
    "멘토",
  ],
  photoAlt: "막심 카노츠킨 프로필 사진",
  bentoDisplayName: "막심 카노츠킨",
  heroHeadline: "산업 혁신을 이끕니다",
  heroTagline:
    "까다로운 현장 과제를 AI·로보틱스·적층제조로\n해결하는\u00A0실전 솔루션으로 바꿉니다.",
  bentoSaveContact: "연락처 저장",
  backLabel: "뒤로",
  bentoAboutTitle: "소개",
  aboutShort:
    "2013년부터 도장 로봇 정비공으로 시작해, 현재는 GAZ 공장의 적층기술센터와 개발·혁신·적층기술 부서를 이끕니다. ‘혁신을 위한 혁신’은 믿지 않습니다. 진짜 출발점은 현장의 고충입니다—더러운 손, 빡빡한 제약, 빠듯한 예산. 라인에서 24/7 돌아가는 시스템을 만듭니다. 서류 대신 알고리즘, 단순 반복 대신 로봇입니다.",
  aboutMetaLocation: "니즈니노브고로드",
  aboutMetaAvailability: "채용 담당자와 편집자를 환영합니다",
  bentoImpactTitle: "숫자가 증명합니다",
  impactMetrics: [
    { value: "13", label: "산업 엔지니어링 경력" },
    { value: "~70%", label: "로봇 부품 국산화" },
    { value: "6+", label: "2026년 IT/R&D 프로젝트" },
    { value: "100%", label: "자체 개발" },
  ],
  bentoConnectTitle: "연락하기",
  connectBlurb: "개인 이메일 또는 Telegram으로 연락해 주세요.",
  emailLabel: "이메일",
  vkLabel: "VK",
  contactsPrimaryAria: "주요 연락처",
  contactsSecondaryAria: "기타 연락처",
  wechatAria: "WeChat Maxim_Ka — ID 복사 후 열기",
  wechatToast: "WeChat ID가 복사되었습니다 — 「친구 추가」에 붙여넣으세요",
  shareLabel: "공유",
  shareAria: "포트폴리오 링크 공유",
  shareCopiedToast: "링크가 복사되었습니다",
  shareFailedToast: "링크를 복사하지 못했습니다",
  qrContactHint: "스캔하면 연락처가 저장됩니다",
  bentoProjectsTitle: "프로젝트",
  powerLevelLabel: "Power Level",
  languageSwitcherAria: "언어 선택",
  domainIconLabels: {
    brain: "산업 AI",
    robot: "로봇 자동화",
    cube: "적층제조",
    shield: "전문성",
  },
  bentoDomains: [
    {
      id: "industrial-ai",
      title: "산업\nAI",
      description: "예지보전, 품질검사, 공정 최적화를 위한 AI 솔루션.",
      icon: "brain",
      showSparkline: true,
      metrics: [
        { value: "100%", label: "데이터 사내 보관" },
        { value: "온프레미스", label: "사내망 솔루션" },
      ],
    },
    {
      id: "robotics",
      title: "로봇 자동화",
      description: "로봇 시스템 통합과 차체·캡 100여 종의 경로 프로그래밍.",
      icon: "robot",
      showSparkline: true,
      metrics: [
        { value: "2–3×", label: "도입 비용 절감" },
        { value: "전 과정", label: "설계 → 시운전 → 지원" },
      ],
    },
    {
      id: "additive",
      title: "적층\n제조",
      description: "시제품부터 양산 부품까지, 전 주기 적층제조 솔루션.",
      icon: "cube",
      showWireframe: true,
      metrics: [
        { value: ">500만 루블", label: "연간 경제적 효과" },
        { value: "~70%", label: "수입 부품 국산화" },
      ],
    },
    {
      id: "expertise",
      title: "전문성",
      description: "전략, 기술 감사, 멘토링 — 현장부터 국제 대회까지.",
      icon: "shield",
      bullets: [
        "산업 전략",
        "기술 로드맵",
        "디지털 전환",
        "스마트 팩토리",
        "프로젝트 리더십",
        "시스템 통합",
      ],
    },
  ],
  projects: [
    {
      id: "dashboard",
      title: "지능형 모니터링·제어 시스템",
      category: "산업 AI",
      summary:
        "도장공장 실시간 대시보드와 완전 온프레미스 음성 Edge-AI 어시스턴트.",
      result:
        "산업 소음 환경에서도 핵심 파라미터를 실시간으로 보고, 비접촉으로 제어합니다.",
      ...sharedProjectMeta.dashboard,
    },
    {
      id: "cobots",
      title: "협동로봇 자동화",
      category: "로봇 자동화",
      summary:
        "JAKA 협동로봇 셀 설계와 차체 실러 도포 경로 프로그래밍.",
      result:
        "컨베이어 핵심 공정에서 인력 개입을 없앴습니다. 같은 접근을 다른 현장에도 적용했습니다.",
      ...sharedProjectMeta.cobots,
    },
    {
      id: "cat",
      title: "적층기술센터 (ATC)",
      category: "적층제조",
      summary: "전 주기: 역설계, 기능성 3D 프린팅 부품, 산업 디자인.",
      result: "시리즈 품목 50개 이상; 도장 로봇 플라스틱 부품의 최대 70%를 사내 생산; 연간 효과 500만 루블 이상.",
      ...sharedProjectMeta.cat,
    },
    {
      id: "judging",
      title: "전문가 심사·멘토링",
      category: "전문성",
      summary:
        "국제 엔지니어링 대회 심사; 로봇·AI·산업디자인 프로젝트 기술 감사.",
      result:
        "인재 파이프라인을 만들고, 초기 혁신의 실현 가능성을 검증합니다.",
      ...sharedProjectMeta.judging,
    },
  ],
};

const de: SiteCopy = {
  introLabel: "Engineering-Portfolio",
  introHint: "Tippen, klicken oder wischen",
  introRoleLine:
    "Leiter Entwicklung, Innovation und Additive Fertigung · Automobilwerk GAZ · Nischni Nowgorod",
  name: "Maxim Kanochkin",
  roles: [
    "Robotikingenieur",
    "Leiter Automatisierung",
    "Systemintegrator",
    "Mechatronikingenieur",
    "KI-Spezialist",
    "CV-Ingenieur",
    "Data Engineer",
    "ML-Architekt",
    "Softwareingenieur",
    "Entwickler",
    "Full-Stack-Entwickler",
    "Softwarearchitekt",
    "3D-Designer",
    "Konstrukteur",
    "Industriedesigner",
    "Ingenieur Additive Fertigung",
    "Ingenieur",
    "Systemdesigner",
    "Leiter F&E",
    "Prozessingenieur",
    "Forscher",
    "Innovator",
    "Visualisierungsingenieur",
    "Fachjuror",
    "Mentor",
  ],
  photoAlt: "Porträt von Maxim Kanochkin",
  bentoDisplayName: "Maxim Kanochkin",
  heroHeadline: "Industrielle Innovation vorantreiben",
  heroTagline:
    "Schwierige Herausforderungen aus der Fertigung verwandle ich in belastbare Lösungen — mit KI, Robotik\nund\u00A0Additiver Fertigung.",
  bentoSaveContact: "Kontakt speichern",
  backLabel: "Zurück",
  bentoAboutTitle: "Über mich",
  aboutShort:
    "Seit 2013 bin ich vom Instandhaltungsmechaniker für Lackierroboter zum Leiter des Zentrums für Additive Fertigung und der Abteilung Entwicklung am GAZ-Werk geworden. An „Innovation um der Innovation willen“ glaube ich nicht. Meine Arbeit beginnt bei echten Produktionsproblemen — schmutzige Hände, harte Randbedingungen und knappe Budgets. Ich baue Systeme, die rund um die Uhr auf der Linie laufen: Algorithmen statt Papierkram, Roboter statt stumpfer Routine.",
  aboutMetaLocation: "Nischni Nowgorod",
  aboutMetaAvailability: "Offen für Arbeitgeber und Redaktionen",
  bentoImpactTitle: "Zahlen, die für sich sprechen",
  impactMetrics: [
    { value: "13", label: "Jahre industrielle Technik" },
    { value: "~70%", label: "Roboterersatzteile lokal gefertigt" },
    { value: "6+", label: "IT-/F&E-Projekte 2026" },
    { value: "100%", label: "Eigenentwicklung" },
  ],
  bentoConnectTitle: "Kontakt",
  connectBlurb: "Schreiben Sie an die private E-Mail oder Telegram.",
  emailLabel: "E-Mail",
  vkLabel: "VK",
  contactsPrimaryAria: "Hauptkontakte",
  contactsSecondaryAria: "Weitere Kontakte",
  wechatAria: "WeChat Maxim_Ka — ID kopieren und öffnen",
  wechatToast: "WeChat-ID kopiert — in „Freund hinzufügen“ einfügen",
  shareLabel: "Teilen",
  shareAria: "Portfolio-Link teilen",
  shareCopiedToast: "Link kopiert",
  shareFailedToast: "Link konnte nicht kopiert werden",
  qrContactHint: "Scannen — Kontakt speichern",
  bentoProjectsTitle: "Projekte",
  powerLevelLabel: "Power Level",
  languageSwitcherAria: "Sprache",
  domainIconLabels: {
    brain: "Industrielle KI",
    robot: "Robotik",
    cube: "Additive Fertigung",
    shield: "Expertise",
  },
  bentoDomains: [
    {
      id: "industrial-ai",
      title: "Industrielle\nKI",
      description:
        "KI für vorausschauende Instandhaltung, Qualitätsprüfung und Prozessoptimierung.",
      icon: "brain",
      showSparkline: true,
      metrics: [
        { value: "100%", label: "Daten bleiben im Werk" },
        { value: "On-Prem", label: "Lösungen im Werksnetz" },
      ],
    },
    {
      id: "robotics",
      title: "Robotik",
      description:
        "Integration von Roboterzellen und Bahnprogrammierung für mehr als 100 Karosserie- und Kabinentypen.",
      icon: "robot",
      showSparkline: true,
      metrics: [
        { value: "2–3×", label: "Geringere Einführungskosten" },
        { value: "Vollzyklus", label: "Auslegung → Inbetriebnahme → Support" },
      ],
    },
    {
      id: "additive",
      title: "Additive\nFertigung",
      description:
        "Additive Fertigung im Vollzyklus — vom Prototyp bis zum Serienteil.",
      icon: "cube",
      showWireframe: true,
      metrics: [
        { value: ">5 Mio. ₽", label: "Wirtschaftlicher Nutzen pro Jahr" },
        { value: "~70%", label: "Importteile ersetzt" },
      ],
    },
    {
      id: "expertise",
      title: "Expertise",
      description:
        "Strategie, technische Audits und Mentoring — von der Halle bis zu internationalen Wettbewerben.",
      icon: "shield",
      bullets: [
        "Industriestrategie",
        "Technologieroadmap",
        "Digitale Transformation",
        "Intelligente Fertigung",
        "Projektleitung",
        "Systemintegration",
      ],
    },
  ],
  projects: [
    {
      id: "dashboard",
      title: "Intelligentes Monitoring- und Steuerungssystem",
      category: "Industrielle KI",
      summary:
        "Echtzeit-Dashboard für die Lackiererei mit sprachgesteuertem Edge-KI-Assistenten — vollständig On-Premises.",
      result:
        "Berührungslose Steuerung und Live-Übersicht kritischer Parameter — auch bei Industrielärm.",
      ...sharedProjectMeta.dashboard,
    },
    {
      id: "cobots",
      title: "Automatisierung mit kollaborativen Robotern",
      category: "Robotik",
      summary:
        "Auslegung von JAKA-Cobot-Zellen und Bahnprogrammierung für Dichtstoffauftrag auf Karosserien.",
      result:
        "Personal an kritischen Bandstationen abgelöst; der Ansatz wurde auf andere Standorte übertragen.",
      ...sharedProjectMeta.cobots,
    },
    {
      id: "cat",
      title: "Zentrum für Additive Fertigung (ZAF)",
      category: "Additive Fertigung",
      summary:
        "Vollzyklus: Reverse Engineering, funktionsfähige 3D-gedruckte Bauteile und Industriedesign.",
      result: "50+ Serienpositionen; bis zu 70 % der Kunststoff-Ersatzteile für Lackierroboter intern; Nutzen über 5 Mio. ₽/Jahr.",
      ...sharedProjectMeta.cat,
    },
    {
      id: "judging",
      title: "Expertentätigkeit und Mentoring",
      category: "Expertise",
      summary:
        "Jury bei internationalen Ingenieurwettbewerben; technische Audits in Robotik, KI und Industriedesign.",
      result:
        "Aufbau von Fachkräftenachwuchs und Belastungsprobe früher Innovationsideen.",
      ...sharedProjectMeta.judging,
    },
  ],
};

const fr: SiteCopy = {
  introLabel: "Portfolio d'ingénierie",
  introHint: "touchez, cliquez ou glissez",
  introRoleLine:
    "Chef du développement, de l'innovation et des technologies additives · usine automobile GAZ · Nijni Novgorod",
  name: "Maxim Kanochkin",
  roles: [
    "Ingénieur robotique",
    "Responsable automatisation",
    "Intégrateur de systèmes",
    "Ingénieur mécatronique",
    "Spécialiste IA",
    "Ingénieur vision",
    "Ingénieur data",
    "Architecte ML",
    "Ingénieur logiciel",
    "Développeur",
    "Développeur full-stack",
    "Architecte logiciel",
    "Designer 3D",
    "Concepteur mécanique",
    "Designer industriel",
    "Ingénieur fabrication additive",
    "Ingénieur",
    "Concepteur de systèmes",
    "Responsable R&D",
    "Ingénieur process",
    "Chercheur",
    "Innovateur",
    "Ingénieur visualisation",
    "Expert-juré",
    "Mentor",
  ],
  photoAlt: "Portrait de Maxim Kanochkin",
  bentoDisplayName: "Maxim Kanochkin",
  heroHeadline: "Faire avancer l'innovation industrielle",
  heroTagline:
    "Je transforme les défis exigeants de l'atelier en solutions qui tournent — grâce à l'IA, la robotique\net\u00A0la fabrication additive.",
  bentoSaveContact: "Enregistrer le contact",
  backLabel: "Retour",
  bentoAboutTitle: "À propos",
  aboutShort:
    "Depuis 2013, je suis passé de mécanicien de maintenance sur robots de peinture à responsable du Centre de technologies additives et du service développement de l'usine GAZ. Je ne crois pas à « l'innovation pour l'innovation ». Mon travail part des vraies difficultés de production — mains sales, contraintes dures, budgets serrés. Je construis des systèmes qui tournent sur la ligne 24 h/24 : des algorithmes à la place de la paperasse, des robots à la place des gestes répétitifs.",
  aboutMetaLocation: "Nijni Novgorod",
  aboutMetaAvailability: "Ouvert aux employeurs et aux rédactions",
  bentoImpactTitle: "Des chiffres qui parlent d'eux-mêmes",
  impactMetrics: [
    { value: "13", label: "Ans d'ingénierie industrielle" },
    { value: "~70%", label: "Pièces de rechange robots localisées" },
    { value: "6+", label: "Projets IT/R&D en 2026" },
    { value: "100%", label: "Développement interne" },
  ],
  bentoConnectTitle: "Me contacter",
  connectBlurb: "Écrivez à l'e-mail personnel ou sur Telegram.",
  emailLabel: "E-mail",
  vkLabel: "VK",
  contactsPrimaryAria: "Contacts principaux",
  contactsSecondaryAria: "Autres contacts",
  wechatAria: "WeChat Maxim_Ka — copier l'ID et ouvrir",
  wechatToast: "ID WeChat copié — collez-le dans « Ajouter un ami »",
  shareLabel: "Partager",
  shareAria: "Partager le lien du portfolio",
  shareCopiedToast: "Lien copié",
  shareFailedToast: "Impossible de copier le lien",
  qrContactHint: "Scannez pour enregistrer le contact",
  bentoProjectsTitle: "Projets",
  powerLevelLabel: "Power Level",
  languageSwitcherAria: "Langue",
  domainIconLabels: {
    brain: "IA industrielle",
    robot: "Robotique",
    cube: "Fabrication additive",
    shield: "Expertise",
  },
  bentoDomains: [
    {
      id: "industrial-ai",
      title: "IA\nindustrielle",
      description:
        "IA pour la maintenance prédictive, le contrôle qualité et l'optimisation des process.",
      icon: "brain",
      showSparkline: true,
      metrics: [
        { value: "100%", label: "Données conservées sur site" },
        { value: "on-prem", label: "Solutions dans le réseau usine" },
      ],
    },
    {
      id: "robotics",
      title: "Robotique",
      description:
        "Intégration de cellules robotisées et programmation de trajectoires pour plus de 100 types de carrosseries et cabines.",
      icon: "robot",
      showSparkline: true,
      metrics: [
        { value: "2–3×", label: "Coût de déploiement réduit" },
        { value: "bout en bout", label: "Conception → mise en service → support" },
      ],
    },
    {
      id: "additive",
      title: "Fabrication\nadditive",
      description:
        "Solutions additives de bout en bout — du prototype à la pièce de série.",
      icon: "cube",
      showWireframe: true,
      metrics: [
        { value: ">5 M₽", label: "Gain économique annuel" },
        { value: "~70%", label: "Pièces importées remplacées" },
      ],
    },
    {
      id: "expertise",
      title: "Expertise",
      description:
        "Stratégie, audits techniques et mentorat — de l'atelier aux concours internationaux.",
      icon: "shield",
      bullets: [
        "Stratégie industrielle",
        "Feuille de route technologique",
        "Transformation numérique",
        "Usine intelligente",
        "Pilotage de projets",
        "Intégration de systèmes",
      ],
    },
  ],
  projects: [
    {
      id: "dashboard",
      title: "Système intelligent de supervision et de pilotage",
      category: "IA industrielle",
      summary:
        "Tableau de bord temps réel pour l'atelier de peinture, avec assistant vocal Edge-AI entièrement on-premise.",
      result:
        "Pilotage mains libres et visibilité en direct des paramètres critiques — même en environnement bruyant.",
      ...sharedProjectMeta.dashboard,
    },
    {
      id: "cobots",
      title: "Automatisation par robots collaboratifs",
      category: "Robotique",
      summary:
        "Conception de cellules cobots JAKA et programmation des trajectoires de dépôt de mastic sur carrosseries.",
      result:
        "Personnel libéré des postes critiques du convoyeur ; l'approche a été reprise ailleurs.",
      ...sharedProjectMeta.cobots,
    },
    {
      id: "cat",
      title: "Centre de technologies additives (CTA)",
      category: "Fabrication additive",
      summary:
        "Cycle complet : rétroconception, pièces fonctionnelles imprimées en 3D et design industriel.",
      result:
        "Plus de 50 références de série ; jusqu'à 70 % des pièces plastiques de robots de peinture en interne ; plus de 5 M₽/an.",
      ...sharedProjectMeta.cat,
    },
    {
      id: "judging",
      title: "Expertise et mentorat",
      category: "Expertise",
      summary:
        "Jury de concours d'ingénierie internationaux ; audits techniques en robotique, IA et design industriel.",
      result:
        "Constitution d'une filière de talents et mise à l'épreuve des innovations en amont.",
      ...sharedProjectMeta.judging,
    },
  ],
};

const hi: SiteCopy = {
  introLabel: "इंजीनियरिंग पोर्टफोलियो",
  introHint: "टैप, क्लिक या स्वाइप करें",
  introRoleLine:
    "विकास, नवाचार और एडिटिव टेक्नोलॉजी प्रमुख · GAZ ऑटो प्लांट · निज़नी नोवगोरोड",
  name: "Maxim Kanochkin",
  roles: [
    "रोबोटिक्स इंजीनियर",
    "ऑटोमेशन लीड",
    "सिस्टम इंटीग्रेटर",
    "मेक्ट्रोनिक्स इंजीनियर",
    "AI विशेषज्ञ",
    "CV इंजीनियर",
    "डेटा इंजीनियर",
    "ML आर्किटेक्ट",
    "सॉफ्टवेयर इंजीनियर",
    "डेवलपर",
    "फुल-स्टैक डेवलपर",
    "सॉफ्टवेयर आर्किटेक्ट",
    "3D डिज़ाइनर",
    "मैकेनिकल डिज़ाइनर",
    "इंडस्ट्रियल डिज़ाइनर",
    "एडिटिव मैन्युफैक्चरिंग इंजीनियर",
    "इंजीनियर",
    "सिस्टम डिज़ाइनर",
    "R&D लीड",
    "प्रोसेस इंजीनियर",
    "शोधकर्ता",
    "इनोवेटर",
    "विज़ुअल इंजीनियर",
    "विशेषज्ञ जज",
    "मेंटर",
  ],
  photoAlt: "Maxim Kanochkin का पोर्ट्रेट",
  bentoDisplayName: "Maxim Kanochkin",
  heroHeadline: "औद्योगिक नवाचार को गति दें",
  heroTagline:
    "कठिन शॉप-फ़्लोर चुनौतियों को AI, रोबोटिक्स और\nएडिटिव\u00A0मैन्युफैक्चरिंग पर आधारित कारगर समाधानों में बदलता हूँ।",
  bentoSaveContact: "संपर्क सहेजें",
  backLabel: "वापस",
  bentoAboutTitle: "परिचय",
  aboutShort:
    "2013 से पेंट-रोबोट मेंटेनेंस मैकेनिक से शुरू किया, और आज GAZ प्लांट में Additive Technology Center तथा विकास विभाग का नेतृत्व करता हूँ। \"इनोवेशन सिर्फ़ इनोवेशन के लिए\" — इसमें यकीन नहीं। काम असली उत्पादन की तकलीफ़ से शुरू होता है: गंदे हाथ, सख़्त सीमाएँ, तंग बजट। मैं वे सिस्टम बनाता हूँ जो लाइन पर 24/7 चलते हैं — कागज़बाज़ी की जगह एल्गोरिद्म, दोहराव वाले श्रम की जगह रोबोट।",
  aboutMetaLocation: "निज़नी नोवगोरोड",
  aboutMetaAvailability: "नियोक्ताओं और संपादकों के लिए उपलब्ध",
  bentoImpactTitle: "आँकड़े जो खुद बोलते हैं",
  impactMetrics: [
    { value: "13", label: "औद्योगिक इंजीनियरिंग में वर्ष" },
    { value: "~70%", label: "रोबोट स्पेयर पार्ट्स का स्थानीयकरण" },
    { value: "6+", label: "2026 में IT/R&D प्रोजेक्ट" },
    { value: "100%", label: "इन-हाउस डेवलपमेंट" },
  ],
  bentoConnectTitle: "संपर्क करें",
  connectBlurb: "व्यक्तिगत ईमेल या Telegram पर लिखें।",
  emailLabel: "ईमेल",
  vkLabel: "VK",
  contactsPrimaryAria: "मुख्य संपर्क",
  contactsSecondaryAria: "अन्य संपर्क",
  wechatAria: "WeChat Maxim_Ka — ID कॉपी करें और खोलें",
  wechatToast: "WeChat ID कॉपी हो गया — Add Friend में पेस्ट करें",
  shareLabel: "शेयर करें",
  shareAria: "पोर्टफोलियो लिंक शेयर करें",
  shareCopiedToast: "लिंक कॉपी हो गया",
  shareFailedToast: "लिंक कॉपी नहीं हो सका",
  qrContactHint: "स्कैन करें — संपर्क सेव होगा",
  bentoProjectsTitle: "प्रोजेक्ट्स",
  powerLevelLabel: "Power Level",
  languageSwitcherAria: "भाषा चुनें",
  domainIconLabels: {
    brain: "औद्योगिक AI",
    robot: "रोबोटिक्स",
    cube: "एडिटिव मैन्युफैक्चरिंग",
    shield: "विशेषज्ञता",
  },
  bentoDomains: [
    {
      id: "industrial-ai",
      title: "औद्योगिक\nAI",
      description:
        "प्रेडिक्टिव मेंटेनेंस, क्वालिटी इंस्पेक्शन और प्रोसेस ऑप्टिमाइज़ेशन के लिए AI।",
      icon: "brain",
      showSparkline: true,
      metrics: [
        { value: "100%", label: "डेटा प्लांट में ही रहता है" },
        { value: "on-prem", label: "प्लांट-नेटवर्क समाधान" },
      ],
    },
    {
      id: "robotics",
      title: "रोबोटिक्स",
      description:
        "रोबोट सेल इंटीग्रेशन और 100+ बॉडी व कैब प्रकारों के लिए पथ प्रोग्रामिंग।",
      icon: "robot",
      showSparkline: true,
      metrics: [
        { value: "2–3×", label: "कम डिप्लॉयमेंट लागत" },
        { value: "end-to-end", label: "डिज़ाइन → कमीशनिंग → सपोर्ट" },
      ],
    },
    {
      id: "additive",
      title: "एडिटिव\nमैन्युफैक्चरिंग",
      description:
        "पूर्ण-चक्र एडिटिव समाधान — प्रोटोटाइप से लेकर प्रोडक्शन पार्ट्स तक।",
      icon: "cube",
      showWireframe: true,
      metrics: [
        { value: ">5 मिलियन रूबल", label: "वार्षिक आर्थिक प्रभाव" },
        { value: "~70%", label: "आयातित पार्ट्स का प्रतिस्थापन" },
      ],
    },
    {
      id: "expertise",
      title: "विशेषज्ञता",
      description:
        "रणनीति, तकनीकी ऑडिट और मेंटरशिप — शॉप फ़्लोर से अंतरराष्ट्रीय प्रतियोगिताओं तक।",
      icon: "shield",
      bullets: [
        "औद्योगिक रणनीति",
        "टेक्नोलॉजी रोडमैप",
        "डिजिटल ट्रांसफ़ॉर्मेशन",
        "स्मार्ट मैन्युफैक्चरिंग",
        "प्रोजेक्ट लीडरशिप",
        "सिस्टम इंटीग्रेशन",
      ],
    },
  ],
  projects: [
    {
      id: "dashboard",
      title: "इंटेलिजेंट मॉनिटरिंग और कंट्रोल सिस्टम",
      category: "औद्योगिक AI",
      summary:
        "पेंट शॉप के लिए रियल-टाइम डैशबोर्ड, पूरी तरह on-prem वॉइस Edge-AI असिस्टेंट के साथ।",
      result:
        "हाथ छुए बिना कंट्रोल और क्रिटिकल पैरामीटर की लाइव विज़िबिलिटी — औद्योगिक शोर में भी।",
      ...sharedProjectMeta.dashboard,
    },
    {
      id: "cobots",
      title: "कोलैबोरेटिव रोबोट ऑटोमेशन",
      category: "रोबोटिक्स",
      summary:
        "JAKA कोबोट सेल डिज़ाइन और वाहन बॉडी पर सीलेंट पथ प्रोग्रामिंग।",
      result:
        "क्रिटिकल कन्वेयर स्टेशनों से मैन्युअल निर्भरता हटाई; यही तरीका अन्य साइटों पर भी अपनाया गया।",
      ...sharedProjectMeta.cobots,
    },
    {
      id: "cat",
      title: "Additive Technology Center (ATC)",
      category: "एडिटिव तकनीक",
      summary:
        "पूर्ण चक्र: रिवर्स इंजीनियरिंग, फ़ंक्शनल 3D-प्रिंटेड पार्ट्स और इंडस्ट्रियल डिज़ाइन।",
      result: "50+ सीरियल पार्ट नंबर; पेंट-रोबोट प्लास्टिक स्पेयर्स का ~70% इन-हाउस; सालाना प्रभाव 50 लाख रूबल से अधिक।",
      ...sharedProjectMeta.cat,
    },
    {
      id: "judging",
      title: "विशेषज्ञ समीक्षा और मेंटरशिप",
      category: "विशेषज्ञता",
      summary:
        "अंतरराष्ट्रीय इंजीनियरिंग प्रतियोगिताओं में जजिंग; रोबोटिक्स, AI और इंडस्ट्रियल डिज़ाइन में तकनीकी ऑडिट।",
      result:
        "टैलेंट पाइपलाइन बनाना और शुरुआती नवाचार की व्यवहार्यता परख।",
      ...sharedProjectMeta.judging,
    },
  ],
};

const ja: SiteCopy = {
  introLabel: "エンジニアリング・ポートフォリオ",
  introHint: "タップ・クリック・スワイプで探索",
  introRoleLine:
    "開発・イノベーション・積層造形部門長 · GAZ自動車工場 · ニジニ・ノヴゴロド",
  name: "マキシム・カノツキン",
  roles: [
    "ロボットエンジニア",
    "自動化リード",
    "システムインテグレーター",
    "メカトロニクスエンジニア",
    "AIスペシャリスト",
    "CVエンジニア",
    "データエンジニア",
    "MLアーキテクト",
    "ソフトウェアエンジニア",
    "デベロッパー",
    "フルスタック開発者",
    "ソフトウェアアーキテクト",
    "3Dデザイナー",
    "機械設計者",
    "インダストリアルデザイナー",
    "積層造形エンジニア",
    "エンジニア",
    "システム設計者",
    "R&Dリード",
    "生産技術エンジニア",
    "研究者",
    "イノベーター",
    "ビジュアルエンジニア",
    "専門審査員",
    "メンター",
  ],
  photoAlt: "マキシム・カノツキンの肖像",
  bentoDisplayName: "マキシム・カノツキン",
  heroHeadline: "産業イノベーションを牽引",
  heroTagline:
    "現場の難題を、AI・ロボティクス・積層造形で\n動く\u00A0ソリューションに変えます。",
  bentoSaveContact: "連絡先を保存",
  backLabel: "戻る",
  bentoAboutTitle: "私について",
  aboutShort:
    "2013年から塗装ロボットの整備工としてキャリアを始め、現在はGAZ工場で積層造形技術センターと開発部門を率いています。「イノベーションのためのイノベーション」は信じません。出発点は現場の課題——汚れた手、厳しい制約、限られた予算です。ラインで24時間365日回り続ける仕組みをつくります。書類の代わりにアルゴリズムを、単純作業の代わりにロボットを。",
  aboutMetaLocation: "ニジニ・ノヴゴロド",
  aboutMetaAvailability: "採用担当・編集者からの連絡を歓迎",
  bentoImpactTitle: "数字が証明します",
  impactMetrics: [
    { value: "13", label: "産業エンジニアリング歴" },
    { value: "~70%", label: "ロボット部品の国産化" },
    { value: "6+", label: "2026年のIT／R&Dプロジェクト" },
    { value: "100%", label: "内製開発" },
  ],
  bentoConnectTitle: "連絡先",
  connectBlurb: "個人メールまたは Telegram へご連絡ください。",
  emailLabel: "メール",
  vkLabel: "VK",
  contactsPrimaryAria: "主な連絡先",
  contactsSecondaryAria: "その他の連絡先",
  wechatAria: "WeChat Maxim_Ka — IDをコピーして開く",
  wechatToast: "WeChat IDをコピーしました — 「友達を追加」に貼り付けてください",
  shareLabel: "共有",
  shareAria: "ポートフォリオのリンクを共有",
  shareCopiedToast: "リンクをコピーしました",
  shareFailedToast: "リンクをコピーできませんでした",
  qrContactHint: "スキャンで連絡先を保存",
  bentoProjectsTitle: "プロジェクト",
  powerLevelLabel: "Power Level",
  languageSwitcherAria: "言語",
  domainIconLabels: {
    brain: "産業AI",
    robot: "ロボティクス",
    cube: "積層造形",
    shield: "専門性",
  },
  bentoDomains: [
    {
      id: "industrial-ai",
      title: "産業\nAI",
      description: "予知保全、品質検査、工程最適化向けのAIソリューション。",
      icon: "brain",
      showSparkline: true,
      metrics: [
        { value: "100%", label: "データは構内完結" },
        { value: "オンプレミス", label: "工場ネットワーク対応" },
      ],
    },
    {
      id: "robotics",
      title: "ロボティクス",
      description: "ロボットセルの統合と、車体・キャビン100種以上の軌道プログラミング。",
      icon: "robot",
      showSparkline: true,
      metrics: [
        { value: "2–3×", label: "導入コスト低減" },
        { value: "一気通貫", label: "設計 → 立上げ → 保守" },
      ],
    },
    {
      id: "additive",
      title: "積層\n造形",
      description:
        "試作から量産部品まで、フルサイクルの積層造形ソリューション。",
      icon: "cube",
      showWireframe: true,
      metrics: [
        { value: ">500万₽", label: "年間経済効果" },
        { value: "~70%", label: "輸入部品の代替" },
      ],
    },
    {
      id: "expertise",
      title: "専門性",
      description:
        "戦略、技術監査、メンタリング——現場から国際コンテストまで。",
      icon: "shield",
      bullets: [
        "産業戦略",
        "技術ロードマップ",
        "デジタル変革",
        "スマートファクトリー",
        "プロジェクト推進",
        "システム統合",
      ],
    },
  ],
  projects: [
    {
      id: "dashboard",
      title: "インテリジェント監視・制御システム",
      category: "産業AI",
      summary:
        "塗装工場向けリアルタイムダッシュボードと、完全オンプレミスの音声エッジAIアシスタント。",
      result:
        "産業騒音下でも、重要パラメータの可視化と非接触操作を実現します。",
      ...sharedProjectMeta.dashboard,
    },
    {
      id: "cobots",
      title: "協働ロボットによる自動化",
      category: "ロボティクス",
      summary:
        "JAKA協働ロボットセルの設計と、車体へのシーラー塗布軌道のプログラミング。",
      result:
        "コンベアの重要ステーションから作業者を外しました。同じ手法を他拠点にも展開しました。",
      ...sharedProjectMeta.cobots,
    },
    {
      id: "cat",
      title: "積層造形技術センター（ATC）",
      category: "積層造形",
      summary:
        "フルサイクル：リバースエンジニアリング、機能部品の3D造形、インダストリアルデザイン。",
      result: "シリーズ品目50以上。塗装ロボット用プラスチック部品の最大70%を内製。年間効果は500万ルーブル超。",
      ...sharedProjectMeta.cat,
    },
    {
      id: "judging",
      title: "専門審査とメンタリング",
      category: "専門性",
      summary:
        "国際エンジニアリングコンテストの審査；ロボット・AI・インダストリアルデザイン領域の技術監査。",
      result:
        "人材パイプラインを育て、初期段階のイノベーションの実現性を見極めます。",
      ...sharedProjectMeta.judging,
    },
  ],
};

const es: SiteCopy = {
  introLabel: "Portfolio de ingeniería",
  introHint: "toque, haga clic o deslice",
  introRoleLine:
    "Jefe de desarrollo, innovación y tecnologías aditivas · planta automotriz GAZ · Nizhni Nóvgorod",
  name: "Maxim Kanochkin",
  roles: [
    "Ingeniero en robótica",
    "Responsable de automatización",
    "Integrador de sistemas",
    "Ingeniero en mecatrónica",
    "Especialista en IA",
    "Ingeniero de visión artificial",
    "Ingeniero de datos",
    "Arquitecto de ML",
    "Ingeniero de software",
    "Desarrollador",
    "Desarrollador full-stack",
    "Arquitecto de software",
    "Diseñador 3D",
    "Diseñador mecánico",
    "Diseñador industrial",
    "Ingeniero en fabricación aditiva",
    "Ingeniero",
    "Diseñador de sistemas",
    "Responsable de I+D",
    "Ingeniero de procesos",
    "Investigador",
    "Innovador",
    "Ingeniero de visualización",
    "Juez experto",
    "Mentor",
  ],
  photoAlt: "Retrato de Maxim Kanochkin",
  bentoDisplayName: "Maxim Kanochkin",
  heroHeadline: "Impulsando la innovación industrial",
  heroTagline:
    "Transformo retos exigentes de planta en soluciones operativas basadas en IA, robótica\ny\u00A0fabricación aditiva.",
  bentoSaveContact: "Guardar contacto",
  backLabel: "Volver",
  bentoAboutTitle: "Sobre mí",
  aboutShort:
    "Desde 2013 pasé de mecánico de mantenimiento de robots de pintura a responsable del Centro de Tecnologías Aditivas y del departamento de desarrollo en la planta GAZ. No creo en la «innovación por la innovación». Mi trabajo parte de las dificultades reales de la producción: manos sucias, restricciones duras y presupuestos ajustados. Construyo sistemas que operan en línea 24/7: algoritmos en lugar de papeleo, robots en lugar de trabajo rutinario.",
  aboutMetaLocation: "Nizhni Nóvgorod",
  aboutMetaAvailability: "Abierto a empleadores y redacciones",
  bentoImpactTitle: "Cifras que hablan por sí solas",
  impactMetrics: [
    { value: "13", label: "Años en ingeniería industrial" },
    { value: "~70%", label: "Repuestos de robots localizados" },
    { value: "6+", label: "Proyectos IT/I+D en 2026" },
    { value: "100%", label: "Desarrollo interno" },
  ],
  bentoConnectTitle: "Contacto",
  connectBlurb: "Escriba al correo personal o a Telegram.",
  emailLabel: "Correo",
  vkLabel: "VK",
  contactsPrimaryAria: "Contactos principales",
  contactsSecondaryAria: "Más contactos",
  wechatAria: "WeChat Maxim_Ka — copiar el ID y abrir",
  wechatToast: "ID de WeChat copiado — péguelo en «Añadir amigo»",
  shareLabel: "Compartir",
  shareAria: "Compartir enlace del portafolio",
  shareCopiedToast: "Enlace copiado",
  shareFailedToast: "No se pudo copiar el enlace",
  qrContactHint: "Escanee para guardar el contacto",
  bentoProjectsTitle: "Proyectos",
  powerLevelLabel: "Power Level",
  languageSwitcherAria: "Idioma",
  domainIconLabels: {
    brain: "IA industrial",
    robot: "Robótica",
    cube: "Fabricación aditiva",
    shield: "Expertise",
  },
  bentoDomains: [
    {
      id: "industrial-ai",
      title: "IA\nindustrial",
      description:
        "IA para mantenimiento predictivo, control de calidad y optimización de procesos.",
      icon: "brain",
      showSparkline: true,
      metrics: [
        { value: "100%", label: "Datos que permanecen en planta" },
        { value: "on-prem", label: "Soluciones en la red de planta" },
      ],
    },
    {
      id: "robotics",
      title: "Robótica",
      description:
        "Integración de células robotizadas y programación de trayectorias para más de 100 tipos de carrocerías y cabinas.",
      icon: "robot",
      showSparkline: true,
      metrics: [
        { value: "2–3×", label: "Menor costo de implantación" },
        { value: "ciclo completo", label: "Diseño → puesta en marcha → soporte" },
      ],
    },
    {
      id: "additive",
      title: "Fabricación\naditiva",
      description:
        "Soluciones aditivas de ciclo completo — del prototipo a la pieza de serie.",
      icon: "cube",
      showWireframe: true,
      metrics: [
        { value: ">5 M₽", label: "Impacto económico anual" },
        { value: "~70%", label: "Piezas importadas sustituidas" },
      ],
    },
    {
      id: "expertise",
      title: "Expertise",
      description:
        "Estrategia, auditorías técnicas y mentoría — de la planta a los concursos internacionales.",
      icon: "shield",
      bullets: [
        "Estrategia industrial",
        "Hoja de ruta tecnológica",
        "Transformación digital",
        "Fábrica inteligente",
        "Dirección de proyectos",
        "Integración de sistemas",
      ],
    },
  ],
  projects: [
    {
      id: "dashboard",
      title: "Sistema inteligente de supervisión y control",
      category: "IA industrial",
      summary:
        "Panel en tiempo real para el taller de pintura con asistente de voz Edge-AI totalmente on-prem.",
      result:
        "Control manos libres y visibilidad en vivo de parámetros críticos, incluso con ruido industrial.",
      ...sharedProjectMeta.dashboard,
    },
    {
      id: "cobots",
      title: "Automatización con robots colaborativos",
      category: "Robótica",
      summary:
        "Diseño de células con cobots JAKA y programación de trayectorias de sellador sobre carrocerías.",
      result:
        "Personal liberado de puestos críticos del transportador; el enfoque se reutilizó en otras plantas.",
      ...sharedProjectMeta.cobots,
    },
    {
      id: "cat",
      title: "Centro de Tecnologías Aditivas (ATC)",
      category: "Fabricación aditiva",
      summary:
        "Ciclo completo: ingeniería inversa, piezas funcionales impresas en 3D y diseño industrial.",
      result:
        "Más de 50 referencias de serie; hasta el 70% de recambios plásticos de robots de pintura en planta; más de 5 M₽ al año.",
      ...sharedProjectMeta.cat,
    },
    {
      id: "judging",
      title: "Actividad experta y mentoría",
      category: "Expertise",
      summary:
        "Jurado en concursos internacionales de ingeniería; auditorías técnicas en robótica, IA y diseño industrial.",
      result:
        "Formación de cantera de talento y validación de innovaciones en etapa temprana.",
      ...sharedProjectMeta.judging,
    },
  ],
};

const pt: SiteCopy = {
  introLabel: "Portfólio de engenharia",
  introHint: "toque, clique ou deslize",
  introRoleLine:
    "Chefe de desenvolvimento, inovação e manufatura aditiva · fábrica automotiva GAZ · Níjni Novgorod",
  name: "Maxim Kanochkin",
  roles: [
    "Engenheiro de robótica",
    "Líder de automação",
    "Integrador de sistemas",
    "Engenheiro de mecatrônica",
    "Especialista em IA",
    "Engenheiro de visão computacional",
    "Engenheiro de dados",
    "Arquiteto de ML",
    "Engenheiro de software",
    "Desenvolvedor",
    "Desenvolvedor full-stack",
    "Arquiteto de software",
    "Designer 3D",
    "Projetista mecânico",
    "Designer industrial",
    "Engenheiro de manufatura aditiva",
    "Engenheiro",
    "Projetista de sistemas",
    "Líder de P&D",
    "Engenheiro de processos",
    "Pesquisador",
    "Inovador",
    "Engenheiro de visualização",
    "Juiz especialista",
    "Mentor",
  ],
  photoAlt: "Retrato de Maxim Kanochkin",
  bentoDisplayName: "Maxim Kanochkin",
  heroHeadline: "Impulsionando a inovação industrial",
  heroTagline:
    "Transformo desafios exigentes do chão de fábrica em soluções que funcionam, com IA, robótica\ne\u00A0manufatura aditiva.",
  bentoSaveContact: "Salvar contato",
  backLabel: "Voltar",
  bentoAboutTitle: "Sobre mim",
  aboutShort:
    "Desde 2013, saí de mecânico de manutenção de robôs de pintura para líder do Centro de Tecnologias Aditivas e do departamento de desenvolvimento na fábrica GAZ. Não acredito em «inovação pela inovação». Meu trabalho parte das dificuldades reais da produção: mãos sujas, restrições duras e orçamentos apertados. Construo sistemas que rodam na linha 24/7: algoritmos no lugar da burocracia, robôs no lugar do trabalho rotineiro.",
  aboutMetaLocation: "Níjni Novgorod",
  aboutMetaAvailability: "Aberto a empregadores e redações",
  bentoImpactTitle: "Números que falam por si",
  impactMetrics: [
    { value: "13", label: "Anos em engenharia industrial" },
    { value: "~70%", label: "Peças de reposição de robôs localizadas" },
    { value: "6+", label: "Projetos de TI/P&D em 2026" },
    { value: "100%", label: "Desenvolvimento interno" },
  ],
  bentoConnectTitle: "Contato",
  connectBlurb: "Escreva no e-mail pessoal ou no Telegram.",
  emailLabel: "E-mail",
  vkLabel: "VK",
  contactsPrimaryAria: "Contatos principais",
  contactsSecondaryAria: "Outros contatos",
  wechatAria: "WeChat Maxim_Ka — copiar o ID e abrir",
  wechatToast: "ID do WeChat copiado — cole em «Adicionar amigo»",
  shareLabel: "Compartilhar",
  shareAria: "Compartilhar link do portfólio",
  shareCopiedToast: "Link copiado",
  shareFailedToast: "Não foi possível copiar o link",
  qrContactHint: "Escaneie para salvar o contato",
  bentoProjectsTitle: "Projetos",
  powerLevelLabel: "Power Level",
  languageSwitcherAria: "Idioma",
  domainIconLabels: {
    brain: "IA industrial",
    robot: "Robótica",
    cube: "Manufatura aditiva",
    shield: "Expertise",
  },
  bentoDomains: [
    {
      id: "industrial-ai",
      title: "IA\nindustrial",
      description:
        "IA para manutenção preditiva, inspeção de qualidade e otimização de processos.",
      icon: "brain",
      showSparkline: true,
      metrics: [
        { value: "100%", label: "Dados ficam na planta" },
        { value: "on-prem", label: "Soluções na rede da planta" },
      ],
    },
    {
      id: "robotics",
      title: "Robótica",
      description:
        "Integração de células robotizadas e programação de trajetórias para mais de 100 tipos de carrocerias e cabines.",
      icon: "robot",
      showSparkline: true,
      metrics: [
        { value: "2–3×", label: "Menor custo de implantação" },
        { value: "ciclo completo", label: "Projeto → comissionamento → suporte" },
      ],
    },
    {
      id: "additive",
      title: "Manufatura\naditiva",
      description:
        "Soluções aditivas de ciclo completo — do protótipo à peça de série.",
      icon: "cube",
      showWireframe: true,
      metrics: [
        { value: ">5 mi ₽", label: "Impacto econômico anual" },
        { value: "~70%", label: "Peças importadas substituídas" },
      ],
    },
    {
      id: "expertise",
      title: "Expertise",
      description:
        "Estratégia, auditorias técnicas e mentoria — do chão de fábrica aos concursos internacionais.",
      icon: "shield",
      bullets: [
        "Estratégia industrial",
        "Roteiro tecnológico",
        "Transformação digital",
        "Manufatura inteligente",
        "Liderança de projetos",
        "Integração de sistemas",
      ],
    },
  ],
  projects: [
    {
      id: "dashboard",
      title: "Sistema inteligente de monitoramento e controle",
      category: "IA industrial",
      summary:
        "Dashboard em tempo real para o setor de pintura com assistente de voz Edge-AI totalmente on-prem.",
      result:
        "Controle mãos livres e visualização ao vivo dos parâmetros críticos — mesmo com ruído industrial.",
      ...sharedProjectMeta.dashboard,
    },
    {
      id: "cobots",
      title: "Automação com robôs colaborativos",
      category: "Robótica",
      summary:
        "Projeto de células com cobots JAKA e programação de trajetórias de selante em carrocerias.",
      result: "Pessoas retiradas de postos críticos da linha; a abordagem foi reaplicada em outras plantas.",
      ...sharedProjectMeta.cobots,
    },
    {
      id: "cat",
      title: "Centro de Tecnologias Aditivas (CTA)",
      category: "Manufatura aditiva",
      summary:
        "Ciclo completo: engenharia reversa, peças funcionais impressas em 3D e design industrial.",
      result: "Mais de 50 itens de série; até 70% das peças plásticas de robôs de pintura internamente; mais de 5 mi ₽/ano.",
      ...sharedProjectMeta.cat,
    },
    {
      id: "judging",
      title: "Atividade de especialista e mentoria",
      category: "Expertise",
      summary:
        "Jurado em concursos internacionais de engenharia; auditorias técnicas em robótica, IA e design industrial.",
      result:
        "Formação de talentos e validação de inovações em estágio inicial.",
      ...sharedProjectMeta.judging,
    },
  ],
};

const it: SiteCopy = {
  introLabel: "Portfolio di ingegneria",
  introHint: "tocchi, clicchi o scorra",
  introRoleLine:
    "Responsabile sviluppo, innovazione e tecnologie additive · stabilimento GAZ · Nižnij Novgorod",
  name: "Maxim Kanochkin",
  roles: [
    "Ingegnere di robotica",
    "Responsabile automazione",
    "Integratore di sistemi",
    "Ingegnere meccatronico",
    "Specialista IA",
    "Ingegnere di visione artificiale",
    "Ingegnere dei dati",
    "Architetto ML",
    "Ingegnere software",
    "Sviluppatore",
    "Sviluppatore full-stack",
    "Architetto software",
    "Designer 3D",
    "Progettista meccanico",
    "Designer industriale",
    "Ingegnere di produzione additiva",
    "Ingegnere",
    "Progettista di sistemi",
    "Responsabile R&S",
    "Ingegnere di processo",
    "Ricercatore",
    "Innovatore",
    "Ingegnere di visualizzazione",
    "Giudice esperto",
    "Mentore",
  ],
  photoAlt: "Ritratto di Maxim Kanochkin",
  bentoDisplayName: "Maxim Kanochkin",
  heroHeadline: "Far avanzare l'innovazione industriale",
  heroTagline:
    "Trasformo le sfide più complesse di reparto in soluzioni operative basate su IA, robotica\ne\u00A0produzione additiva.",
  bentoSaveContact: "Salva contatto",
  backLabel: "Indietro",
  bentoAboutTitle: "Su di me",
  aboutShort:
    "Dal 2013 sono passato da meccanico di manutenzione dei robot di verniciatura a responsabile del Centro di tecnologie additive e del reparto sviluppo dello stabilimento GAZ. Non credo nell'«innovazione per l'innovazione». Il mio lavoro parte dalle difficoltà reali della produzione: mani sporche, vincoli duri e budget stretti. Costruisco sistemi che lavorano in linea 24/7: algoritmi al posto della burocrazia, robot al posto del lavoro ripetitivo.",
  aboutMetaLocation: "Nižnij Novgorod",
  aboutMetaAvailability: "Disponibile per datori di lavoro e redazioni",
  bentoImpactTitle: "Numeri che parlano da soli",
  impactMetrics: [
    { value: "13", label: "Anni di ingegneria industriale" },
    { value: "~70%", label: "Ricambi robot localizzati" },
    { value: "6+", label: "Progetti IT/R&S nel 2026" },
    { value: "100%", label: "Sviluppo interno" },
  ],
  bentoConnectTitle: "Contatti",
  connectBlurb: "Scriva all'e-mail personale o su Telegram.",
  emailLabel: "E-mail",
  vkLabel: "VK",
  contactsPrimaryAria: "Contatti principali",
  contactsSecondaryAria: "Altri contatti",
  wechatAria: "WeChat Maxim_Ka — copia l'ID e apri",
  wechatToast: "ID WeChat copiato — lo inserisca in «Aggiungi amico»",
  shareLabel: "Condividi",
  shareAria: "Condividi il link del portfolio",
  shareCopiedToast: "Link copiato",
  shareFailedToast: "Impossibile copiare il link",
  qrContactHint: "Scansiona per salvare il contatto",
  bentoProjectsTitle: "Progetti",
  powerLevelLabel: "Power Level",
  languageSwitcherAria: "Lingua",
  domainIconLabels: {
    brain: "IA industriale",
    robot: "Robotica",
    cube: "Produzione additiva",
    shield: "Expertise",
  },
  bentoDomains: [
    {
      id: "industrial-ai",
      title: "IA\nindustriale",
      description:
        "IA per manutenzione predittiva, controllo qualità e ottimizzazione di processo.",
      icon: "brain",
      showSparkline: true,
      metrics: [
        { value: "100%", label: "Dati che restano in stabilimento" },
        { value: "on-prem", label: "Soluzioni nella rete di fabbrica" },
      ],
    },
    {
      id: "robotics",
      title: "Robotica",
      description:
        "Integrazione di celle robotizzate e programmazione delle traiettorie per oltre 100 tipi di scocche e cabine.",
      icon: "robot",
      showSparkline: true,
      metrics: [
        { value: "2–3×", label: "Costo di implementazione inferiore" },
        {
          value: "ciclo completo",
          label: "Progettazione → messa in servizio → supporto",
        },
      ],
    },
    {
      id: "additive",
      title: "Produzione\nadditiva",
      description:
        "Soluzioni additive a ciclo completo — dal prototipo al pezzo di serie.",
      icon: "cube",
      showWireframe: true,
      metrics: [
        { value: ">5 mln ₽", label: "Impatto economico annuo" },
        { value: "~70%", label: "Componenti importati sostituiti" },
      ],
    },
    {
      id: "expertise",
      title: "Expertise",
      description:
        "Strategia, audit tecnici e mentorship — dal reparto ai concorsi internazionali.",
      icon: "shield",
      bullets: [
        "Strategia industriale",
        "Roadmap tecnologica",
        "Trasformazione digitale",
        "Fabbrica intelligente",
        "Direzione di progetto",
        "Integrazione di sistemi",
      ],
    },
  ],
  projects: [
    {
      id: "dashboard",
      title: "Sistema intelligente di monitoraggio e controllo",
      category: "IA industriale",
      summary:
        "Dashboard in tempo reale per il reparto verniciatura con assistente vocale Edge-AI interamente on-prem.",
      result:
        "Controllo senza contatto e visibilità in tempo reale dei parametri critici — anche in ambiente rumoroso.",
      ...sharedProjectMeta.dashboard,
    },
    {
      id: "cobots",
      title: "Automazione con robot collaborativi",
      category: "Robotica",
      summary:
        "Progettazione di celle con cobot JAKA e programmazione delle traiettorie di stesura mastice su scocche.",
      result:
        "Operatori sottratti alle postazioni critiche del trasportatore; l'approccio è stato ripreso su altri siti.",
      ...sharedProjectMeta.cobots,
    },
    {
      id: "cat",
      title: "Centro di tecnologie additive (CTA)",
      category: "Produzione additiva",
      summary:
        "Ciclo completo: reverse engineering, pezzi funzionali stampati in 3D e design industriale.",
      result:
        "Oltre 50 posizioni di serie; fino al 70% dei ricambi plastici dei robot di verniciatura internamente; oltre 5 mln ₽/anno.",
      ...sharedProjectMeta.cat,
    },
    {
      id: "judging",
      title: "Attività di esperto e mentorship",
      category: "Expertise",
      summary:
        "Giuria in concorsi internazionali di ingegneria; audit tecnici in robotica, IA e design industriale.",
      result:
        "Costruzione di una filiera di talenti e verifica delle innovazioni in fase iniziale.",
      ...sharedProjectMeta.judging,
    },
  ],
};

const tr: SiteCopy = {
  introLabel: "Mühendislik portföyü",
  introHint: "dokunun, tıklayın veya kaydırın",
  introRoleLine:
    "Geliştirme, inovasyon ve eklemeli imalat müdürü · GAZ otomobil fabrikası · Nijni Novgorod",
  name: "Maxim Kanochkin",
  roles: [
    "Robotik mühendisi",
    "Otomasyon lideri",
    "Sistem entegratörü",
    "Mekatronik mühendisi",
    "Yapay zeka uzmanı",
    "Bilgisayarlı görü mühendisi",
    "Veri mühendisi",
    "ML mimarı",
    "Yazılım mühendisi",
    "Geliştirici",
    "Full-stack geliştirici",
    "Yazılım mimarı",
    "3D tasarımcı",
    "Mekanik tasarımcı",
    "Endüstriyel tasarımcı",
    "Eklemeli imalat mühendisi",
    "Mühendis",
    "Sistem tasarımcısı",
    "Ar-Ge lideri",
    "Proses mühendisi",
    "Araştırmacı",
    "Yenilikçi",
    "Görselleştirme mühendisi",
    "Uzman jüri",
    "Mentor",
  ],
  photoAlt: "Maxim Kanochkin’in portresi",
  bentoDisplayName: "Maxim Kanochkin",
  heroHeadline: "Endüstriyel inovasyonu ileri taşıyorum",
  heroTagline:
    "Sahadaki zorlu üretim sorunlarını yapay zeka, robotik\nve\u00A0eklemeli imalatla işleyen çözümlere dönüştürüyorum.",
  bentoSaveContact: "Kişiyi kaydet",
  backLabel: "Geri",
  bentoAboutTitle: "Hakkımda",
  aboutShort:
    "2013’ten beri boyama robotları bakım mekanikerliğinden, GAZ fabrikasında Eklemeli Teknolojiler Merkezi ve geliştirme birimi yöneticiliğine geldim. «İnovasyon için inovasyon»a inanmam. Çalışmam gerçek üretim sorunlarından başlar — kirli eller, sert kısıtlar ve sıkı bütçeler. Hat üzerinde 7/24 çalışan sistemler kuruyorum: evrak yerine algoritmalar, rutin iş yerine robotlar.",
  aboutMetaLocation: "Nijni Novgorod",
  aboutMetaAvailability: "İşverenlere ve editörlere açığım",
  bentoImpactTitle: "Kendi adına konuşan rakamlar",
  impactMetrics: [
    { value: "13", label: "Endüstriyel mühendislikte yıl" },
    { value: "~70%", label: "Robot yedek parçası yerelleştirildi" },
    { value: "6+", label: "2026’da BT/Ar-Ge projesi" },
    { value: "100%", label: "Kurum içi geliştirme" },
  ],
  bentoConnectTitle: "İletişim",
  connectBlurb: "Kişisel e-posta veya Telegram’dan yazın.",
  emailLabel: "E-posta",
  vkLabel: "VK",
  contactsPrimaryAria: "Birincil iletişim",
  contactsSecondaryAria: "Diğer iletişim kanalları",
  wechatAria: "WeChat Maxim_Ka — kimliği kopyalayın ve açın",
  wechatToast: "WeChat kimliği kopyalandı — Arkadaş Ekle’ye yapıştırın",
  shareLabel: "Paylaş",
  shareAria: "Portföy bağlantısını paylaş",
  shareCopiedToast: "Bağlantı kopyalandı",
  shareFailedToast: "Bağlantı kopyalanamadı",
  qrContactHint: "Tarayın — kişi kaydedilir",
  bentoProjectsTitle: "Projeler",
  powerLevelLabel: "Power Level",
  languageSwitcherAria: "Dil",
  domainIconLabels: {
    brain: "Endüstriyel yapay zeka",
    robot: "Robotik",
    cube: "Eklemeli imalat",
    shield: "Uzmanlık",
  },
  bentoDomains: [
    {
      id: "industrial-ai",
      title: "Endüstriyel\nyapay zeka",
      description:
        "Öngörücü bakım, kalite kontrolü ve proses optimizasyonu için yapay zeka.",
      icon: "brain",
      showSparkline: true,
      metrics: [
        { value: "100%", label: "Veriler tesis içinde kalır" },
        { value: "on-prem", label: "Fabrika ağı çözümleri" },
      ],
    },
    {
      id: "robotics",
      title: "Robotik",
      description:
        "Robot hücre entegrasyonu ve 100’den fazla gövde ile kabin tipi için yörünge programlama.",
      icon: "robot",
      showSparkline: true,
      metrics: [
        { value: "2–3×", label: "Daha düşük devreye alma maliyeti" },
        { value: "uçtan uca", label: "Tasarım → devreye alma → destek" },
      ],
    },
    {
      id: "additive",
      title: "Eklemeli\nimalat",
      description: "Tam döngü eklemeli çözümler — prototipten seri parçaya.",
      icon: "cube",
      showWireframe: true,
      metrics: [
        { value: ">5 milyon ₽", label: "Yıllık ekonomik etki" },
        { value: "~70%", label: "İthal parça ikamesi" },
      ],
    },
    {
      id: "expertise",
      title: "Uzmanlık",
      description:
        "Strateji, teknik denetim ve mentorluk — atölyeden uluslararası yarışmalara.",
      icon: "shield",
      bullets: [
        "Endüstriyel strateji",
        "Teknoloji yol haritası",
        "Dijital dönüşüm",
        "Akıllı üretim",
        "Proje liderliği",
        "Sistem entegrasyonu",
      ],
    },
  ],
  projects: [
    {
      id: "dashboard",
      title: "Akıllı izleme ve kontrol sistemi",
      category: "Endüstriyel yapay zeka",
      summary:
        "Tamamen on-prem çalışan, sesli Edge-AI asistanlı gerçek zamanlı boyahane panosu.",
      result:
        "Kritik parametrelerin temassız kontrolü ve canlı görünürlüğü — endüstriyel gürültüde bile.",
      ...sharedProjectMeta.dashboard,
    },
    {
      id: "cobots",
      title: "İşbirlikçi robotlarla otomasyon",
      category: "Robotik",
      summary:
        "JAKA cobot hücre tasarımı ve araç gövdelerine sızdırmazlık macunu yolu programlama.",
      result: "Kritik konveyör istasyonlarından insanı çektik; yaklaşım başka sahalara da taşındı.",
      ...sharedProjectMeta.cobots,
    },
    {
      id: "cat",
      title: "Eklemeli Teknolojiler Merkezi (ETM)",
      category: "Eklemeli teknoloji",
      summary:
        "Tam döngü: tersine mühendislik, işlevsel 3D baskı parçalar ve endüstriyel tasarım.",
      result: "50’den fazla seri kalem; boyama robotu plastik yedeklerinin %70’ine kadar iç üretim; yılda 5 milyon ₽ üzeri etki.",
      ...sharedProjectMeta.cat,
    },
    {
      id: "judging",
      title: "Uzman değerlendirme ve mentorluk",
      category: "Uzmanlık",
      summary:
        "Uluslararası mühendislik yarışmalarında jüri; robotik, yapay zeka ve endüstriyel tasarımda teknik denetim.",
      result:
        "Yetenek havuzu oluşturma ve erken aşama inovasyonu sahada sınama.",
      ...sharedProjectMeta.judging,
    },
  ],
};

const ar: SiteCopy = {
  introLabel: "محفظة هندسية",
  introHint: "انقر أو اسحب للاستكشاف",
  introRoleLine:
    "رئيس قسم التطوير والابتكار وتقنيات التصنيع الإضافي · مصنع غاز للسيارات · نيجني نوفغورود",
  name: "Maxim Kanochkin",
  roles: [
    "مهندس روبوتات",
    "قائد أتمتة",
    "مكامل أنظمة",
    "مهندس ميكاترونكس",
    "متخصص AI",
    "مهندس CV",
    "مهندس بيانات",
    "معماري ML",
    "مهندس برمجيات",
    "مطوّر",
    "مطوّر Full-stack",
    "مهندس معماري للبرمجيات",
    "مصمم ثلاثي الأبعاد",
    "مصمم ميكانيكي",
    "مصمم صناعي",
    "مهندس تصنيع إضافي",
    "مهندس",
    "مصمم أنظمة",
    "قائد R&D",
    "مهندس عمليات",
    "باحث",
    "مبتكر",
    "مهندس تصور بصري",
    "محكّم خبير",
    "مرشد",
  ],
  photoAlt: "صورة Maxim Kanochkin",
  bentoDisplayName: "Maxim Kanochkin",
  heroHeadline: "محرّك الابتكار الصناعي",
  heroTagline:
    "أحوّل صعوبات الإنتاج الحقيقية إلى حلول عملية تعتمد على AI والروبوتات\nو\u00A0التصنيع الإضافي.",
  bentoSaveContact: "حفظ جهة الاتصال",
  backLabel: "رجوع",
  bentoAboutTitle: "نبذة عني",
  aboutShort:
    "منذ عام 2013 انتقلت من فني صيانة لروبوتات الطلاء إلى رئيس مركز تقنيات التصنيع الإضافي وقسم التطوير في مصنع غاز. لا أؤمن بـ«الابتكار من أجل الابتكار». ينطلق عملي من صعوبات الإنتاج الحقيقية — الأيدي المتسخة، والقيود الصارمة، والميزانيات المحدودة. أبني أنظمة تعمل على خط الإنتاج على مدار الساعة: خوارزميات بدلًا من البيروقراطية، وروبوتات بدلًا من الأعمال الروتينية.",
  aboutMetaLocation: "نيجني نوفغورود",
  aboutMetaAvailability: "متاح لأصحاب العمل وهيئات التحرير",
  bentoImpactTitle: "أرقام تتحدث عن نفسها",
  impactMetrics: [
    { value: "13", label: "سنوات في الهندسة الصناعية" },
    { value: "~70%", label: "توطين قطع غيار الروبوتات" },
    { value: "6+", label: "مشاريع IT/R&D في عام 2026" },
    { value: "100%", label: "تطوير داخل المنشأة" },
  ],
  bentoConnectTitle: "تواصل",
  connectBlurb: "راسل البريد الشخصي أو Telegram.",
  emailLabel: "البريد الإلكتروني",
  vkLabel: "VK",
  contactsPrimaryAria: "جهات الاتصال الرئيسية",
  contactsSecondaryAria: "جهات اتصال إضافية",
  wechatAria: "WeChat Maxim_Ka — انسخ المعرّف وافتح التطبيق",
  wechatToast: "تم نسخ معرّف WeChat — الصقه في «إضافة صديق»",
  shareLabel: "مشاركة",
  shareAria: "مشاركة رابط المعرض",
  shareCopiedToast: "تم نسخ الرابط",
  shareFailedToast: "تعذّر نسخ الرابط",
  qrContactHint: "امسح لحفظ جهة الاتصال",
  bentoProjectsTitle: "المشاريع",
  powerLevelLabel: "Power Level",
  languageSwitcherAria: "اختيار اللغة",
  domainIconLabels: {
    brain: "AI الصناعي",
    robot: "الروبوتات",
    cube: "التصنيع الإضافي",
    shield: "الخبرة",
  },
  bentoDomains: [
    {
      id: "industrial-ai",
      title: "AI\nالصناعي",
      description: "حلول AI للصيانة التنبؤية وفحص الجودة وتحسين العمليات.",
      icon: "brain",
      showSparkline: true,
      metrics: [
        { value: "100%", label: "البيانات تبقى داخل المنشأة" },
        { value: "on-prem", label: "حلول على شبكة المصنع" },
      ],
    },
    {
      id: "robotics",
      title: "الروبوتات",
      description: "تكامل خلايا الروبوتات وبرمجة المسارات لأكثر من 100 نوع من الهياكل والكابينات.",
      icon: "robot",
      showSparkline: true,
      metrics: [
        { value: "2–3×", label: "تكلفة تنفيذ أقل" },
        { value: "دورة كاملة", label: "تصميم → تشغيل تجريبي → دعم" },
      ],
    },
    {
      id: "additive",
      title: "التصنيع\nالإضافي",
      description:
        "حلول تصنيع إضافي كاملة الدورة — من النماذج الأولية إلى قطع الإنتاج.",
      icon: "cube",
      showWireframe: true,
      metrics: [
        { value: ">5 ملايين روبل", label: "الأثر الاقتصادي السنوي" },
        { value: "~70%", label: "استبدال القطع المستوردة" },
      ],
    },
    {
      id: "expertise",
      title: "الخبرة",
      description:
        "استراتيجية ومراجعات تقنية وإرشاد — من أرضية المصنع إلى المسابقات الدولية.",
      icon: "shield",
      bullets: [
        "الاستراتيجية الصناعية",
        "خارطة الطريق التقنية",
        "التحول الرقمي",
        "التصنيع الذكي",
        "قيادة المشاريع",
        "تكامل الأنظمة",
      ],
    },
  ],
  projects: [
    {
      id: "dashboard",
      title: "نظام ذكي للمراقبة والتحكم",
      category: "AI الصناعي",
      summary:
        "لوحة متابعة فورية لورشة الطلاء مع مساعد صوتي Edge-AI يعمل بالكامل on-prem.",
      result:
        "تحكم دون تلامس ورؤية مباشرة للمعاملات الحرجة — حتى في الضوضاء الصناعية.",
      ...sharedProjectMeta.dashboard,
    },
    {
      id: "cobots",
      title: "الأتمتة بالروبوتات التعاونية",
      category: "الروبوتات",
      summary:
        "تصميم خلايا روبوتات تعاونية JAKA وبرمجة مسارات وضع المادة المانعة على هياكل المركبات.",
      result: "إخراج العنصر البشري من محطات الناقل الحرجة؛ نُقل النهج إلى مواقع أخرى.",
      ...sharedProjectMeta.cobots,
    },
    {
      id: "cat",
      title: "مركز تقنيات التصنيع الإضافي (ATC)",
      category: "التصنيع الإضافي",
      summary:
        "دورة كاملة: هندسة عكسية، قطع مطبوعة ثلاثية الأبعاد وظيفية، وتصميم صناعي.",
      result: "أكثر من 50 بندًا تسلسليًا؛ حتى 70% من القطع البلاستيكية لروبوتات الطلاء داخل المصنع؛ أثر سنوي يتجاوز 5 ملايين روبل.",
      ...sharedProjectMeta.cat,
    },
    {
      id: "judging",
      title: "المراجعة الخبيرة والإرشاد",
      category: "الخبرة",
      summary:
        "تحكيم مسابقات هندسية دولية؛ مراجعات تقنية في الروبوتات وAI والتصميم الصناعي.",
      result:
        "بناء احتياطي المواهب واختبار جدوى الابتكارات في مراحلها المبكرة.",
      ...sharedProjectMeta.judging,
    },
  ],
};

export const SITE_COPY: Record<Locale, SiteCopy> = {
  ru,
  en,
  zh,
  ko,
  de,
  fr,
  hi,
  ja,
  es,
  pt,
  it,
  tr,
  ar,
};

export function getSiteCopy(locale: Locale): SiteCopy {
  return SITE_COPY[locale];
}
