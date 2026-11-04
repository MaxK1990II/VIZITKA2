import { PROFILE_FACTS } from "@/lib/profile-facts";
import type { Locale } from "@/lib/i18n/locale";

export const CAT_SOURCE_URL = "https://up-pro.ru/library/modernization/technologies_equipment/gaz-centr-additivnyh-tehnologij/";

export type ProjectEvidence = {
  status: string;
  role: string;
  period?: string;
  sourceUrl?: string;
  sourceLabel?: string;
};

export type CatCaseStudyCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  chapters: readonly { title: string; body: string }[];
  timeline: readonly { year: string; text: string }[];
  metrics: readonly { value: string; label: string }[];
  sourceNote: string;
  sourceLabel: string;
  sourceUrl: string;
};

export type PortfolioDetailsCopy = {
  nav: { label: string; projects: string; demo: string; about: string; contact: string };
  contact: { telegram: string; email: string; profilePdf: string; pdfNote: string };
  press: { eyebrow: string; title: string; description: string; all: string; readArticle: string };
  projectLabels: { status: string; role: string; period: string; evidence: string };
  projectEvidence: Record<"dashboard" | "cobots" | "cat" | "judging", ProjectEvidence>;
  caseStudy: CatCaseStudyCopy;
};

type LanguageDetails = Omit<PortfolioDetailsCopy, "caseStudy"> & {
  caseStudy: Omit<CatCaseStudyCopy, "sourceUrl">;
};

function withSource(copy: LanguageDetails): PortfolioDetailsCopy {
  return {
    ...copy,
    projectEvidence: {
      ...copy.projectEvidence,
      cobots: { ...copy.projectEvidence.cobots, sourceUrl: CAT_SOURCE_URL },
      cat: { ...copy.projectEvidence.cat, sourceUrl: CAT_SOURCE_URL },
    },
    caseStudy: { ...copy.caseStudy, sourceUrl: CAT_SOURCE_URL },
  };
}

export const PORTFOLIO_DETAILS: Record<Locale, PortfolioDetailsCopy> = {
  ru: withSource({
    nav: { label: "Разделы портфолио", projects: "Проекты", demo: "3D-демо", about: "Обо мне", contact: "Связаться" },
    contact: { telegram: "Написать в Telegram", email: "Написать на почту", profilePdf: "Краткий профиль · PDF", pdfNote: "Русская версия для отправки коллегам" },
    press: { eyebrow: "Внешний взгляд", title: "Публикации о моей работе", description: "Материалы о создании ЦАТ, роботизации и профессиональном пути на ГАЗе.", all: "Все публикации", readArticle: "Читать материал" },
    projectLabels: { status: "Статус", role: "Мой вклад", period: "Период", evidence: "Подробнее" },
    projectEvidence: {
      dashboard: { status: "Инженерная разработка", role: "Разработка интерфейса мониторинга и локального голосового управления" },
      cobots: { status: "Опытная партия прошла аудит качества", role: "Проектирование ячейки, оснастка и программирование вместе с командой ЦАТ", period: "По публикации 30 июля 2026", sourceLabel: "Публикация о проекте" },
      cat: { status: "Центр запущен в 2025 году", role: "Инициатор проекта и руководитель ЦАТ", period: "2022–2026", sourceLabel: "История создания ЦАТ" },
      judging: { status: "Экспертная практика", role: "Техническая оценка инженерных проектов и наставничество" },
    },
    caseStudy: {
      eyebrow: "Кейс · организация инженерной работы", title: "От задачи цеха — к Центру аддитивных технологий",
      lead: "Инициировал создание ЦАТ на ГАЗе и вместе с командой превратил производственную потребность в собственную инженерную площадку.",
      chapters: [
        { title: "Производственная задача", body: "Износ небольших пластиковых деталей мог останавливать окрасочных роботов. Внешние поставки требовали времени, а производство — постоянного запаса деталей." },
        { title: "Моя роль и команда", body: "Предложил проект центра и победил с ним на корпоративной конференции в 2022 году. Вместе с коллегами преобразили помещение в цехе, подобрали оборудование и сформировали команду." },
        { title: "Техническое решение", body: "Объединили реверс-инжиниринг, подбор износостойких материалов и 3D-печать. Центр работает с готовыми моделями и задачами с нуля: от эскиза детали до оснастки для производства." },
      ],
      timeline: [{ year: "2022", text: "Защита проекта и победа на корпоративной конференции" }, { year: "2025", text: "Запуск полноценного Центра аддитивных технологий" }, { year: "2026", text: "Работа с внутренними заказчиками, оснасткой и роботизированными ячейками" }],
      metrics: [{ value: `>${PROFILE_FACTS.annualSavingsMillionsRub} млн ₽`, label: "экономический эффект в год" }, { value: `до ${PROFILE_FACTS.sparePartsCoveragePercent}%`, label: "Охват номенклатуры пластиковых вспомогательных деталей роботов окраски" }, { value: `${PROFILE_FACTS.developedPartTypes}`, label: "позиций в освоенной номенклатуре центра" }],
      sourceNote: `Показатели и этапы — по публикации от 30 июля 2026 года. ${PROFILE_FACTS.developedPartTypes} освоенных позиций и ${PROFILE_FACTS.serialPositions}+ серийных позиций из портфолио — разные показатели.`,
      sourceLabel: "История ЦАТ в «Управлении производством»",
    },
  }),
  de: withSource({
    nav: { label: "Portfolio-Bereiche", projects: "Projekte", demo: "3D-Demo", about: "Über mich", contact: "Kontakt" },
    contact: { telegram: "Über Telegram schreiben", email: "E-Mail schreiben", profilePdf: "Kurzprofil · PDF", pdfNote: "Russische Fassung zum Weitergeben" },
    press: { eyebrow: "Externe Berichte", title: "Meine Arbeit in der Presse", description: "Berichte über das Zentrum für additive Technologien, Robotik und meinen Weg bei GAZ.", all: "Alle Veröffentlichungen", readArticle: "Artikel lesen" },
    projectLabels: { status: "Status", role: "Mein Beitrag", period: "Zeitraum", evidence: "Details" },
    projectEvidence: {
      dashboard: { status: "Technische Entwicklung", role: "Entwicklung der Monitoring-Oberfläche und lokalen Sprachsteuerung" },
      cobots: { status: "Pilotserie bestand das Qualitätsaudit", role: "Zellenplanung, Vorrichtungen und Programmierung mit dem ATC-Team", period: "Bericht vom 30. Juli 2026", sourceLabel: "Projektbericht" },
      cat: { status: "Zentrum 2025 eröffnet", role: "Projektinitiator und Leiter des ATC", period: "2022–2026", sourceLabel: "Entstehung des ATC" },
      judging: { status: "Expertentätigkeit", role: "Technische Bewertung von Ingenieurprojekten und Mentoring" },
    },
    caseStudy: {
      eyebrow: "Fallstudie · Aufbau technischer Kompetenz", title: "Vom Problem in der Fertigung zum Zentrum für additive Technologien",
      lead: "Ich initiierte das ATC bei GAZ und schuf mit dem Team aus einem Fertigungsbedarf eine eigene technische Einrichtung.",
      chapters: [
        { title: "Die Produktionsaufgabe", body: "Verschlissene kleine Kunststoffteile konnten Lackierroboter stillsetzen. Externe Beschaffung dauerte lange und erforderte ständige Ersatzteilbestände." },
        { title: "Meine Rolle und das Team", body: "Ich stellte das Zentrumskonzept vor und gewann damit 2022 einen Unternehmenswettbewerb. Gemeinsam bauten wir Räume um, wählten Anlagen aus und stellten das Team zusammen." },
        { title: "Die technische Lösung", body: "Reverse Engineering, die Auswahl verschleißfester Werkstoffe und 3D-Druck bilden einen Ablauf. Das Zentrum verarbeitet fertige Modelle und entwickelt Bauteile sowie Vorrichtungen aus ersten Skizzen." },
      ],
      timeline: [{ year: "2022", text: "Projektvorstellung und Wettbewerbserfolg" }, { year: "2025", text: "Eröffnung des vollwertigen Zentrums" }, { year: "2026", text: "Interne Kunden, Fertigungsvorrichtungen und Roboterzellen" }],
      metrics: [{ value: `>${PROFILE_FACTS.annualSavingsMillionsRub} Mio. ₽`, label: "wirtschaftlicher Nutzen pro Jahr" }, { value: `bis zu ${PROFILE_FACTS.sparePartsCoveragePercent}%`, label: "Abdeckung des Spektrums an Kunststoff-Hilfsteilen für Lackierroboter" }, { value: `${PROFILE_FACTS.developedPartTypes}`, label: "Positionen im erschlossenen Teilespektrum" }],
      sourceNote: `Zahlen und Meilensteine laut Bericht vom 30. Juli 2026. Die ${PROFILE_FACTS.serialPositions}+ Serienpositionen im Portfolio sind eine gesonderte Kennzahl zum erschlossenen Teilespektrum.`, sourceLabel: "Die ATC-Geschichte bei Upravlenie Proizvodstvom",
    },
  }),
  fr: withSource({
    nav: { label: "Rubriques du portfolio", projects: "Projets", demo: "Démo 3D", about: "À propos", contact: "Contact" },
    contact: { telegram: "Écrire sur Telegram", email: "Envoyer un e-mail", profilePdf: "Profil résumé · PDF", pdfNote: "Version russe à partager avec vos collègues" },
    press: { eyebrow: "Regards extérieurs", title: "Mon travail dans la presse", description: "Articles sur le centre de technologies additives, la robotique et mon parcours chez GAZ.", all: "Toutes les publications", readArticle: "Lire l’article" },
    projectLabels: { status: "État", role: "Ma contribution", period: "Période", evidence: "En savoir plus" },
    projectEvidence: {
      dashboard: { status: "Développement technique", role: "Interface de supervision et commande vocale locale" },
      cobots: { status: "La présérie a passé l’audit qualité", role: "Conception de cellule, outillage et programmation avec l’équipe du centre", period: "Article du 30 juillet 2026", sourceLabel: "Article sur le projet" },
      cat: { status: "Centre ouvert en 2025", role: "Initiateur du projet et responsable du centre", period: "2022–2026", sourceLabel: "Création du centre" },
      judging: { status: "Activité d’expertise", role: "Évaluation technique de projets d’ingénierie et mentorat" },
    },
    caseStudy: {
      eyebrow: "Étude de cas · création d’une capacité d’ingénierie", title: "D’un besoin d’atelier au centre de technologies additives",
      lead: "J’ai initié le centre chez GAZ et, avec l’équipe, transformé un besoin de production en une structure d’ingénierie interne.",
      chapters: [
        { title: "Le besoin industriel", body: "L’usure de petites pièces en plastique pouvait arrêter les robots de peinture. Les délais des fournisseurs imposaient de conserver un stock permanent de rechange." },
        { title: "Mon rôle et l’équipe", body: "J’ai proposé le centre et remporté un concours interne en 2022. Ensemble, nous avons réaménagé un local, choisi les équipements et constitué l’équipe." },
        { title: "La solution technique", body: "Nous avons associé rétro-ingénierie, choix de matériaux résistants à l’usure et impression 3D. Le centre exploite des modèles fournis et conçoit pièces et outillages à partir d’un croquis." },
      ],
      timeline: [{ year: "2022", text: "Présentation du projet et victoire au concours interne" }, { year: "2025", text: "Ouverture du centre à part entière" }, { year: "2026", text: "Clients internes, outillages et cellules robotisées" }],
      metrics: [{ value: `>${PROFILE_FACTS.annualSavingsMillionsRub} M₽`, label: "d’effet économique annuel" }, { value: `jusqu’à ${PROFILE_FACTS.sparePartsCoveragePercent}%`, label: "Couverture des références de pièces auxiliaires plastiques des robots de peinture" }, { value: `${PROFILE_FACTS.developedPartTypes}`, label: "références dans la gamme maîtrisée par le centre" }],
      sourceNote: `Chiffres et étapes publiés le 30 juillet 2026. Les ${PROFILE_FACTS.serialPositions}+ références de série du portfolio constituent un indicateur distinct de la gamme totale maîtrisée.`, sourceLabel: "L’histoire du centre dans Upravlenie Proizvodstvom",
    },
  }),
  es: withSource({
    nav: { label: "Secciones del portafolio", projects: "Proyectos", demo: "Demo 3D", about: "Sobre mí", contact: "Contacto" },
    contact: { telegram: "Escribir por Telegram", email: "Enviar un correo", profilePdf: "Perfil breve · PDF", pdfNote: "Versión rusa para compartir con colegas" },
    press: { eyebrow: "Mirada externa", title: "Mi trabajo en la prensa", description: "Publicaciones sobre el centro de fabricación aditiva, robótica y mi trayectoria en GAZ.", all: "Todas las publicaciones", readArticle: "Leer artículo" },
    projectLabels: { status: "Estado", role: "Mi contribución", period: "Periodo", evidence: "Detalles" },
    projectEvidence: {
      dashboard: { status: "Desarrollo de ingeniería", role: "Interfaz de supervisión y control por voz local" },
      cobots: { status: "El lote piloto superó la auditoría de calidad", role: "Diseño de célula, utillaje y programación con el equipo del centro", period: "Artículo del 30 de julio de 2026", sourceLabel: "Artículo del proyecto" },
      cat: { status: "Centro abierto en 2025", role: "Impulsor del proyecto y responsable del centro", period: "2022–2026", sourceLabel: "Creación del centro" },
      judging: { status: "Actividad como experto", role: "Evaluación técnica de proyectos de ingeniería y mentoría" },
    },
    caseStudy: {
      eyebrow: "Caso · creación de capacidad de ingeniería", title: "De una necesidad del taller a un centro de fabricación aditiva",
      lead: "Impulsé el centro en GAZ y trabajé con el equipo para convertir una necesidad de producción en capacidad técnica propia.",
      chapters: [
        { title: "El problema de producción", body: "El desgaste de pequeñas piezas plásticas podía detener los robots de pintura. Los plazos de suministro exigían mantener una reserva constante de repuestos." },
        { title: "Mi papel y el equipo", body: "Propuse el centro y gané un concurso interno en 2022. Juntos acondicionamos un espacio, seleccionamos equipos y formamos el equipo de trabajo." },
        { title: "La solución técnica", body: "Combinamos ingeniería inversa, selección de materiales resistentes al desgaste e impresión 3D. El centro trabaja con modelos existentes y desarrolla piezas y utillaje desde bocetos iniciales." },
      ],
      timeline: [{ year: "2022", text: "Presentación y premio en el concurso interno" }, { year: "2025", text: "Apertura del centro completo" }, { year: "2026", text: "Clientes internos, utillaje y células robotizadas" }],
      metrics: [{ value: `>${PROFILE_FACTS.annualSavingsMillionsRub} M₽`, label: "de efecto económico anual" }, { value: `hasta el ${PROFILE_FACTS.sparePartsCoveragePercent}%`, label: "Cobertura de referencias de piezas auxiliares plásticas de robots de pintura" }, { value: `${PROFILE_FACTS.developedPartTypes}`, label: "referencias en la gama desarrollada por el centro" }],
      sourceNote: `Cifras e hitos del artículo del 30 de julio de 2026. Las más de ${PROFILE_FACTS.serialPositions} referencias de serie del portafolio son un indicador distinto de la gama total desarrollada.`, sourceLabel: "La historia del centro en Upravlenie Proizvodstvom",
    },
  }),
  pt: withSource({
    nav: { label: "Seções do portfólio", projects: "Projetos", demo: "Demo 3D", about: "Sobre mim", contact: "Contato" },
    contact: { telegram: "Enviar pelo Telegram", email: "Enviar e-mail", profilePdf: "Perfil resumido · PDF", pdfNote: "Versão em russo para compartilhar com colegas" },
    press: { eyebrow: "Visão externa", title: "Meu trabalho na imprensa", description: "Publicações sobre o centro de manufatura aditiva, robótica e minha trajetória na GAZ.", all: "Todas as publicações", readArticle: "Ler matéria" },
    projectLabels: { status: "Situação", role: "Minha contribuição", period: "Período", evidence: "Detalhes" },
    projectEvidence: {
      dashboard: { status: "Desenvolvimento de engenharia", role: "Interface de monitoramento e controle por voz local" },
      cobots: { status: "Lote piloto aprovado na auditoria de qualidade", role: "Projeto da célula, dispositivos e programação com a equipe do centro", period: "Publicação de 30 de julho de 2026", sourceLabel: "Matéria sobre o projeto" },
      cat: { status: "Centro inaugurado em 2025", role: "Idealizador do projeto e líder do centro", period: "2022–2026", sourceLabel: "Criação do centro" },
      judging: { status: "Atuação como especialista", role: "Avaliação técnica de projetos de engenharia e mentoria" },
    },
    caseStudy: {
      eyebrow: "Caso · criação de capacidade de engenharia", title: "Da necessidade no chão de fábrica ao centro de manufatura aditiva",
      lead: "Idealizei o centro na GAZ e, com a equipe, transformei uma necessidade de produção em uma estrutura própria de engenharia.",
      chapters: [
        { title: "O problema de produção", body: "O desgaste de pequenas peças plásticas podia parar robôs de pintura. Prazos de fornecedores exigiam uma reserva permanente de reposição." },
        { title: "Meu papel e a equipe", body: "Apresentei o centro e venci um concurso interno em 2022. Juntos reformamos o espaço, selecionamos equipamentos e formamos a equipe." },
        { title: "A solução técnica", body: "Unimos engenharia reversa, seleção de materiais resistentes ao desgaste e impressão 3D. O centro atende modelos prontos e desenvolve peças e dispositivos a partir de esboços." },
      ],
      timeline: [{ year: "2022", text: "Apresentação e vitória no concurso interno" }, { year: "2025", text: "Inauguração do centro completo" }, { year: "2026", text: "Clientes internos, dispositivos e células robotizadas" }],
      metrics: [{ value: `>${PROFILE_FACTS.annualSavingsMillionsRub} mi ₽`, label: "de efeito econômico anual" }, { value: `até ${PROFILE_FACTS.sparePartsCoveragePercent}%`, label: "Cobertura da gama de peças auxiliares plásticas de robôs de pintura" }, { value: `${PROFILE_FACTS.developedPartTypes}`, label: "itens na gama desenvolvida pelo centro" }],
      sourceNote: `Indicadores e etapas publicados em 30 de julho de 2026. Os mais de ${PROFILE_FACTS.serialPositions} itens de série do portfólio são um indicador distinto da gama total desenvolvida.`, sourceLabel: "A história do centro em Upravlenie Proizvodstvom",
    },
  }),
  it: withSource({
    nav: { label: "Sezioni del portfolio", projects: "Progetti", demo: "Demo 3D", about: "Profilo", contact: "Contatti" },
    contact: { telegram: "Scrivi su Telegram", email: "Invia un’e-mail", profilePdf: "Profilo breve · PDF", pdfNote: "Versione russa da condividere con i colleghi" },
    press: { eyebrow: "Uno sguardo esterno", title: "Il mio lavoro sulla stampa", description: "Articoli sul centro di tecnologie additive, la robotica e il mio percorso in GAZ.", all: "Tutte le pubblicazioni", readArticle: "Leggi l’articolo" },
    projectLabels: { status: "Stato", role: "Il mio contributo", period: "Periodo", evidence: "Dettagli" },
    projectEvidence: {
      dashboard: { status: "Sviluppo ingegneristico", role: "Interfaccia di monitoraggio e controllo vocale locale" },
      cobots: { status: "Il lotto pilota ha superato l’audit qualità", role: "Progettazione della cella, attrezzature e programmazione con il team del centro", period: "Articolo del 30 luglio 2026", sourceLabel: "Articolo sul progetto" },
      cat: { status: "Centro avviato nel 2025", role: "Promotore del progetto e responsabile del centro", period: "2022–2026", sourceLabel: "Come è nato il centro" },
      judging: { status: "Attività di esperto", role: "Valutazione tecnica di progetti ingegneristici e mentoring" },
    },
    caseStudy: {
      eyebrow: "Caso · costruire capacità ingegneristica", title: "Da un’esigenza di reparto al centro di tecnologie additive",
      lead: "Ho promosso il centro in GAZ e lavorato con il team per trasformare un’esigenza produttiva in una struttura ingegneristica interna.",
      chapters: [
        { title: "Il problema produttivo", body: "L’usura di piccoli componenti plastici poteva fermare i robot di verniciatura. Le forniture esterne richiedevano tempo e scorte costanti di ricambi." },
        { title: "Il mio ruolo e il team", body: "Ho proposto il centro e vinto un concorso aziendale nel 2022. Insieme abbiamo trasformato uno spazio, scelto le attrezzature e costituito il team." },
        { title: "La soluzione tecnica", body: "Abbiamo unito reverse engineering, scelta di materiali resistenti all’usura e stampa 3D. Il centro lavora su modelli forniti e sviluppa componenti e attrezzature da schizzi iniziali." },
      ],
      timeline: [{ year: "2022", text: "Presentazione del progetto e vittoria al concorso aziendale" }, { year: "2025", text: "Avvio del centro completo" }, { year: "2026", text: "Clienti interni, attrezzature e celle robotizzate" }],
      metrics: [{ value: `>${PROFILE_FACTS.annualSavingsMillionsRub} mln ₽`, label: "di effetto economico annuo" }, { value: `fino al ${PROFILE_FACTS.sparePartsCoveragePercent}%`, label: "Copertura della gamma di componenti ausiliari plastici dei robot di verniciatura" }, { value: `${PROFILE_FACTS.developedPartTypes}`, label: "voci nella gamma sviluppata dal centro" }],
      sourceNote: `Dati e tappe pubblicati il 30 luglio 2026. Le oltre ${PROFILE_FACTS.serialPositions} voci di serie del portfolio sono un indicatore distinto dalla gamma complessiva sviluppata.`, sourceLabel: "La storia del centro su Upravlenie Proizvodstvom",
    },
  }),
  tr: withSource({
    nav: { label: "Portföy bölümleri", projects: "Projeler", demo: "3D demo", about: "Hakkımda", contact: "İletişim" },
    contact: { telegram: "Telegram’dan yazın", email: "E-posta gönderin", profilePdf: "Kısa profil · PDF", pdfNote: "İş arkadaşlarıyla paylaşmak için Rusça sürüm" },
    press: { eyebrow: "Dışarıdan bakış", title: "Basında çalışmalarım", description: "Eklemeli teknolojiler merkezi, robotik ve GAZ’daki kariyerim hakkında yayınlar.", all: "Tüm yayınlar", readArticle: "Yazıyı okuyun" },
    projectLabels: { status: "Durum", role: "Katkım", period: "Dönem", evidence: "Ayrıntılar" },
    projectEvidence: {
      dashboard: { status: "Mühendislik geliştirmesi", role: "İzleme arayüzü ve yerel sesli kontrol geliştirmesi" },
      cobots: { status: "Pilot parti kalite denetimini geçti", role: "Merkez ekibiyle hücre tasarımı, fikstür ve programlama", period: "30 Temmuz 2026 tarihli yayına göre", sourceLabel: "Proje yazısı" },
      cat: { status: "Merkez 2025’te açıldı", role: "Projenin başlatıcısı ve merkez yöneticisi", period: "2022–2026", sourceLabel: "Merkezin kuruluşu" },
      judging: { status: "Uzmanlık çalışmaları", role: "Mühendislik projelerinin teknik değerlendirmesi ve mentorluk" },
    },
    caseStudy: {
      eyebrow: "Vaka · mühendislik kapasitesi kurmak", title: "Üretim sahasındaki bir ihtiyaçtan eklemeli teknolojiler merkezine",
      lead: "GAZ’da merkezin kurulmasını başlattım; ekiple birlikte üretim ihtiyacını kurum içi mühendislik kapasitesine dönüştürdük.",
      chapters: [
        { title: "Üretim sorunu", body: "Küçük plastik parçaların aşınması boyama robotlarını durdurabiliyordu. Dış tedarik zaman alıyor, üretim için sürekli yedek stok gerekiyordu." },
        { title: "Benim rolüm ve ekip", body: "Merkez projesini önerdim ve 2022’de şirket içi yarışmayı kazandım. Birlikte alanı dönüştürdük, ekipman seçtik ve ekibi kurduk." },
        { title: "Teknik çözüm", body: "Tersine mühendislik, aşınmaya dayanıklı malzeme seçimi ve 3D baskıyı birleştirdik. Merkez hazır modellerle çalışıyor; eskizlerden parça ve üretim fikstürü geliştiriyor." },
      ],
      timeline: [{ year: "2022", text: "Proje sunumu ve şirket içi yarışma başarısı" }, { year: "2025", text: "Tam donanımlı merkezin açılışı" }, { year: "2026", text: "İç müşteriler, üretim fikstürleri ve robot hücreleri" }],
      metrics: [{ value: `>${PROFILE_FACTS.annualSavingsMillionsRub} milyon ₽`, label: "yıllık ekonomik etki" }, { value: `%${PROFILE_FACTS.sparePartsCoveragePercent}’e kadar`, label: "Boyama robotlarının plastik yardımcı parça çeşitlerinin kapsamı" }, { value: `${PROFILE_FACTS.developedPartTypes}`, label: "merkezin üretimini geliştirdiği parça çeşidi" }],
      sourceNote: `Veriler ve aşamalar 30 Temmuz 2026 tarihli yayındandır. Portföydeki ${PROFILE_FACTS.serialPositions}’den fazla seri parça, geliştirilen tüm parça çeşitlerinden ayrı bir göstergedir.`, sourceLabel: "Upravlenie Proizvodstvom’da merkezin hikâyesi",
    },
  }),
  zh: withSource({
    nav: { label: "作品集导航", projects: "项目", demo: "3D 演示", about: "关于我", contact: "联系我" },
    contact: { telegram: "通过 Telegram 联系", email: "发送邮件", profilePdf: "个人简介 · PDF", pdfNote: "俄语版，可转发给同事" },
    press: { eyebrow: "外部报道", title: "关于我的工作", description: "有关 GAZ 增材技术中心、机器人应用与职业发展的报道。", all: "所有报道", readArticle: "阅读报道" },
    projectLabels: { status: "状态", role: "我的贡献", period: "时间", evidence: "了解更多" },
    projectEvidence: {
      dashboard: { status: "工程开发", role: "开发监控界面与本地语音控制" },
      cobots: { status: "试制批次通过质量审核", role: "与中心团队共同设计工作站、工装与控制程序", period: "据 2026 年 7 月 30 日报道", sourceLabel: "项目报道" },
      cat: { status: "中心于 2025 年投入运行", role: "项目发起人及中心负责人", period: "2022–2026", sourceLabel: "中心创建历程" },
      judging: { status: "专家评审实践", role: "工程项目技术评审与指导" },
    },
    caseStudy: {
      eyebrow: "案例 · 工程团队与组织建设", title: "从车间需求到增材技术中心", lead: "我发起了 GAZ 增材技术中心项目，并与团队一起将生产需求转化为内部工程能力。",
      chapters: [
        { title: "生产中的问题", body: "小型塑料零件的磨损可能导致喷涂机器人停机。外部采购周期较长，而生产需要持续的备件供应。" },
        { title: "我的职责与团队", body: "我提出建立中心的方案，并在 2022 年企业内部技术大会上获奖。随后与同事一起改造车间场地、选择设备并组建团队。" },
        { title: "技术方案", body: "将逆向工程、耐磨材料选择与 3D 打印相结合。中心既使用现有模型，也从零开始解决问题，涵盖零件草图到生产工装。" },
      ],
      timeline: [{ year: "2022", text: "中心方案在企业内部技术大会上获奖" }, { year: "2025", text: "中心全面投入运行" }, { year: "2026", text: "承接内部需求、工装与机器人工作站项目" }],
      metrics: [{ value: `>${PROFILE_FACTS.annualSavingsMillionsRub}00 万₽`, label: "年度经济效益" }, { value: `最高 ${PROFILE_FACTS.sparePartsCoveragePercent}%`, label: "喷涂机器人塑料辅助零件的品种覆盖率" }, { value: `${PROFILE_FACTS.developedPartTypes}`, label: "已开发的零件品种" }],
      sourceNote: `数据与阶段以 2026 年 7 月 30 日报道为准。${PROFILE_FACTS.developedPartTypes} 个已开发品种与作品集中的 ${PROFILE_FACTS.serialPositions} 多个系列生产件号是不同指标。`, sourceLabel: "《生产管理》中的中心报道",
    },
  }),
  ko: withSource({
    nav: { label: "포트폴리오 탐색", projects: "프로젝트", demo: "3D 데모", about: "소개", contact: "연락" },
    contact: { telegram: "Telegram으로 연락", email: "이메일 보내기", profilePdf: "프로필 요약 · PDF", pdfNote: "동료에게 공유할 수 있는 러시아어 버전" },
    press: { eyebrow: "외부 보도", title: "업무 관련 기사", description: "GAZ의 적층 기술 센터 설립, 로봇화와 경력에 관한 기사입니다.", all: "전체 기사", readArticle: "기사 읽기" },
    projectLabels: { status: "상태", role: "기여", period: "기간", evidence: "자세히 보기" },
    projectEvidence: {
      dashboard: { status: "엔지니어링 개발", role: "모니터링 인터페이스 및 로컬 음성 제어 개발" },
      cobots: { status: "시범 생산분 품질 감사 통과", role: "센터 팀과 함께 셀 설계, 치공구 제작 및 프로그래밍", period: "2026년 7월 30일 기사 기준", sourceLabel: "프로젝트 기사" },
      cat: { status: "2025년 센터 가동", role: "프로젝트 제안자 및 센터 책임자", period: "2022–2026", sourceLabel: "센터 설립 이야기" },
      judging: { status: "전문가 활동", role: "엔지니어링 프로젝트 기술 심사 및 멘토링" },
    },
    caseStudy: {
      eyebrow: "사례 · 엔지니어링 조직 구축", title: "현장의 필요에서 적층 기술 센터로", lead: "GAZ의 적층 기술 센터 설립을 제안하고 팀과 함께 생산 현장의 필요를 사내 엔지니어링 기반으로 발전시켰습니다.",
      chapters: [
        { title: "생산 과제", body: "작은 플라스틱 부품의 마모가 도장 로봇을 멈출 수 있었습니다. 외부 조달에는 시간이 걸렸고, 생산에는 지속적인 예비 부품 공급이 필요했습니다." },
        { title: "역할과 팀", body: "센터 설립안을 제안하여 2022년 사내 기술 콘퍼런스에서 수상했습니다. 동료들과 작업장 공간을 정비하고 장비를 선정하며 팀을 구성했습니다." },
        { title: "기술적 해결", body: "역설계, 내마모성 소재 선정 및 3D 프린팅을 결합했습니다. 센터는 기존 모델뿐 아니라 부품 스케치에서 생산용 치공구까지 처음부터 개발하는 과제도 수행합니다." },
      ],
      timeline: [{ year: "2022", text: "사내 기술 콘퍼런스에서 센터 제안 수상" }, { year: "2025", text: "센터 본격 가동" }, { year: "2026", text: "사내 수요, 치공구 및 로봇 셀 프로젝트 수행" }],
      metrics: [{ value: `>${PROFILE_FACTS.annualSavingsMillionsRub}00만 ₽`, label: "연간 경제 효과" }, { value: `최대 ${PROFILE_FACTS.sparePartsCoveragePercent}%`, label: "도장 로봇 플라스틱 보조 부품의 품목 범위" }, { value: `${PROFILE_FACTS.developedPartTypes}`, label: "개발한 부품 품목" }],
      sourceNote: `수치와 단계는 2026년 7월 30일 기사 기준입니다. 개발한 ${PROFILE_FACTS.developedPartTypes}개 품목과 포트폴리오의 양산 품목 ${PROFILE_FACTS.serialPositions}개 이상은 서로 다른 지표입니다.`, sourceLabel: "‘생산 관리’의 센터 기사",
    },
  }),
  hi: withSource({
    nav: { label: "पोर्टफोलियो नेविगेशन", projects: "परियोजनाएँ", demo: "3D डेमो", about: "परिचय", contact: "संपर्क" },
    contact: { telegram: "Telegram पर संपर्क करें", email: "ईमेल भेजें", profilePdf: "संक्षिप्त प्रोफाइल · PDF", pdfNote: "सहकर्मियों के साथ साझा करने के लिए रूसी संस्करण" },
    press: { eyebrow: "बाहरी दृष्टिकोण", title: "मेरे काम पर प्रकाशन", description: "GAZ में एडिटिव टेक्नोलॉजी सेंटर की स्थापना, रोबोटीकरण और पेशेवर यात्रा पर लेख।", all: "सभी प्रकाशन", readArticle: "लेख पढ़ें" },
    projectLabels: { status: "स्थिति", role: "मेरा योगदान", period: "अवधि", evidence: "विस्तार से" },
    projectEvidence: {
      dashboard: { status: "इंजीनियरिंग विकास", role: "मॉनिटरिंग इंटरफेस और स्थानीय वॉइस कंट्रोल का विकास" },
      cobots: { status: "पायलट बैच ने गुणवत्ता ऑडिट पास किया", role: "सेंटर की टीम के साथ सेल डिजाइन, टूलिंग और प्रोग्रामिंग", period: "30 जुलाई 2026 के प्रकाशन के अनुसार", sourceLabel: "परियोजना पर लेख" },
      cat: { status: "सेंटर 2025 में शुरू हुआ", role: "परियोजना के प्रस्तावक और सेंटर प्रमुख", period: "2022–2026", sourceLabel: "सेंटर की स्थापना" },
      judging: { status: "विशेषज्ञ कार्य", role: "इंजीनियरिंग परियोजनाओं का तकनीकी मूल्यांकन और मार्गदर्शन" },
    },
    caseStudy: {
      eyebrow: "केस · इंजीनियरिंग कार्य का संगठन", title: "शॉप फ्लोर की जरूरत से एडिटिव टेक्नोलॉजी सेंटर तक", lead: "मैंने GAZ में सेंटर की स्थापना की पहल की और टीम के साथ उत्पादन की जरूरत को अपनी इंजीनियरिंग सुविधा में बदला।",
      chapters: [
        { title: "उत्पादन की समस्या", body: "छोटे प्लास्टिक पार्ट्स का घिसना पेंटिंग रोबोट को रोक सकता था। बाहर से आपूर्ति में समय लगता था, जबकि उत्पादन के लिए पार्ट्स का नियमित भंडार आवश्यक था।" },
        { title: "मेरी भूमिका और टीम", body: "सेंटर का प्रस्ताव रखा और 2022 के कॉर्पोरेट सम्मेलन में पुरस्कार जीता। सहकर्मियों के साथ शॉप फ्लोर की जगह तैयार की, उपकरण चुने और टीम बनाई।" },
        { title: "तकनीकी समाधान", body: "रिवर्स इंजीनियरिंग, घिसाव-रोधी सामग्री के चयन और 3D प्रिंटिंग को जोड़ा। सेंटर तैयार मॉडल के साथ भी काम करता है और पार्ट के स्केच से उत्पादन टूलिंग तक नए समाधान भी विकसित करता है।" },
      ],
      timeline: [{ year: "2022", text: "कॉर्पोरेट सम्मेलन में सेंटर के प्रस्ताव को पुरस्कार" }, { year: "2025", text: "सेंटर का पूर्ण संचालन शुरू" }, { year: "2026", text: "आंतरिक ग्राहकों, टूलिंग और रोबोट सेल की परियोजनाएँ" }],
      metrics: [{ value: `>${PROFILE_FACTS.annualSavingsMillionsRub * 10} लाख ₽`, label: "वार्षिक आर्थिक प्रभाव" }, { value: `अधिकतम ${PROFILE_FACTS.sparePartsCoveragePercent}%`, label: "पेंटिंग रोबोट के प्लास्टिक सहायक पार्ट्स के प्रकारों का कवरेज" }, { value: `${PROFILE_FACTS.developedPartTypes}`, label: "विकसित पार्ट्स के प्रकार" }],
      sourceNote: `आँकड़े और चरण 30 जुलाई 2026 के प्रकाशन के अनुसार हैं। ${PROFILE_FACTS.developedPartTypes} विकसित प्रकार और पोर्टफोलियो के ${PROFILE_FACTS.serialPositions}+ सीरियल उत्पादन पार्ट्स अलग संकेतक हैं।`, sourceLabel: "‘उत्पादन प्रबंधन’ में सेंटर की कहानी",
    },
  }),
  ja: withSource({
    nav: { label: "ポートフォリオの案内", projects: "プロジェクト", demo: "3D デモ", about: "プロフィール", contact: "連絡" },
    contact: { telegram: "Telegram で連絡", email: "メールを送る", profilePdf: "プロフィール概要 · PDF", pdfNote: "同僚への共有用ロシア語版" },
    press: { eyebrow: "外部メディア", title: "取り組みに関する記事", description: "GAZ の積層造形技術センター設立、ロボット化、キャリアを紹介した記事です。", all: "すべての記事", readArticle: "記事を読む" },
    projectLabels: { status: "状況", role: "担当・貢献", period: "時期", evidence: "詳細" },
    projectEvidence: {
      dashboard: { status: "エンジニアリング開発", role: "監視インターフェースとローカル音声制御の開発" },
      cobots: { status: "試験生産車が品質監査に合格", role: "センターのチームとセル設計、治具製作、プログラミングを担当", period: "2026年7月30日掲載記事時点", sourceLabel: "プロジェクトの記事" },
      cat: { status: "2025年にセンター稼働", role: "プロジェクト発案者・センター責任者", period: "2022–2026", sourceLabel: "センター設立の経緯" },
      judging: { status: "専門家としての活動", role: "技術プロジェクトの審査と指導" },
    },
    caseStudy: {
      eyebrow: "事例 · エンジニアリング組織の構築", title: "現場の課題から積層造形技術センターへ", lead: "GAZ でセンターの設立を提案し、チームとともに生産上の課題を社内のエンジニアリング基盤へとつなげました。",
      chapters: [
        { title: "生産現場の課題", body: "小さな樹脂部品の摩耗が塗装ロボットの停止につながる可能性がありました。外部調達には時間がかかり、生産には継続的な部品供給が必要でした。" },
        { title: "役割とチーム", body: "センター設立を提案し、2022年の社内技術大会で受賞しました。同僚と工場内のスペースを改装し、設備を選定してチームを組織しました。" },
        { title: "技術的な解決策", body: "リバースエンジニアリング、耐摩耗材料の選定、3D プリンティングを組み合わせました。既存モデルの活用だけでなく、部品のスケッチから生産用治具まで新規開発にも対応しています。" },
      ],
      timeline: [{ year: "2022", text: "社内技術大会でセンター構想が受賞" }, { year: "2025", text: "センターが本格稼働" }, { year: "2026", text: "社内部門向けの治具・ロボットセルなどを開発" }],
      metrics: [{ value: `>${PROFILE_FACTS.annualSavingsMillionsRub}00万 ₽`, label: "年間経済効果" }, { value: `最大${PROFILE_FACTS.sparePartsCoveragePercent}%`, label: "塗装ロボット用樹脂補助部品の品目カバー率" }, { value: `${PROFILE_FACTS.developedPartTypes}`, label: "開発した部品の品目数" }],
      sourceNote: `数値と経緯は2026年7月30日掲載記事に基づきます。開発した${PROFILE_FACTS.developedPartTypes}品目と、ポートフォリオに記載した量産品目${PROFILE_FACTS.serialPositions}以上は異なる指標です。`, sourceLabel: "「生産管理」掲載のセンター紹介記事",
    },
  }),
  ar: withSource({
    nav: { label: "أقسام الملف المهني", projects: "المشاريع", demo: "عرض ثلاثي الأبعاد", about: "نبذة عني", contact: "تواصل" },
    contact: { telegram: "تواصل عبر Telegram", email: "أرسل بريدًا إلكترونيًا", profilePdf: "ملف مهني موجز · PDF", pdfNote: "نسخة باللغة الروسية لمشاركتها مع الزملاء" },
    press: { eyebrow: "من الصحافة", title: "منشورات عن عملي", description: "مواد عن تأسيس مركز التقنيات الإضافية والروبوتات والمسار المهني في GAZ.", all: "جميع المنشورات", readArticle: "قراءة المقال" },
    projectLabels: { status: "الحالة", role: "مساهمتي", period: "الفترة", evidence: "المزيد" },
    projectEvidence: {
      dashboard: { status: "تطوير هندسي", role: "تطوير واجهة المراقبة والتحكم الصوتي المحلي" },
      cobots: { status: "اجتازت الدفعة التجريبية تدقيق الجودة", role: "تصميم الخلية والتجهيزات والبرمجة مع فريق المركز", period: "وفقًا لمنشور 30 يوليو 2026", sourceLabel: "مقال عن المشروع" },
      cat: { status: "بدأ المركز العمل في 2025", role: "صاحب مبادرة المشروع ومدير المركز", period: "2022–2026", sourceLabel: "قصة تأسيس المركز" },
      judging: { status: "ممارسة مهنية", role: "التقييم التقني للمشاريع الهندسية والإرشاد" },
    },
    caseStudy: {
      eyebrow: "دراسة حالة · تنظيم العمل الهندسي", title: "من حاجة الورشة إلى مركز التقنيات الإضافية", lead: "بادرت بإنشاء المركز في GAZ، وحوّلنا مع الفريق حاجة إنتاجية إلى قدرة هندسية داخلية.",
      chapters: [
        { title: "مشكلة الإنتاج", body: "كان تآكل قطع بلاستيكية صغيرة قد يؤدي إلى توقف روبوتات الطلاء. يستغرق التوريد الخارجي وقتًا، بينما يحتاج الإنتاج إلى مخزون مستمر من القطع." },
        { title: "دوري والفريق", body: "اقترحت مشروع المركز وفزت به في المؤتمر المؤسسي عام 2022. ومع الزملاء جهزنا مساحة في الورشة، واخترنا المعدات وشكّلنا الفريق." },
        { title: "الحل التقني", body: "جمعنا الهندسة العكسية واختيار المواد المقاومة للتآكل والطباعة ثلاثية الأبعاد. يعمل المركز بالنماذج الجاهزة ويطور حلولًا من الصفر، من رسم القطعة إلى تجهيزات الإنتاج." },
      ],
      timeline: [{ year: "2022", text: "فوز مقترح المركز في المؤتمر المؤسسي" }, { year: "2025", text: "بدء التشغيل الكامل للمركز" }, { year: "2026", text: "مشاريع للعملاء الداخليين والتجهيزات وخلايا الروبوتات" }],
      metrics: [{ value: `>${PROFILE_FACTS.annualSavingsMillionsRub} ملايين ₽`, label: "الأثر الاقتصادي السنوي" }, { value: `حتى ${PROFILE_FACTS.sparePartsCoveragePercent}%`, label: "تغطية أصناف القطع البلاستيكية المساعدة لروبوتات الطلاء" }, { value: `${PROFILE_FACTS.developedPartTypes}`, label: "صنفًا من القطع المطوّرة" }],
      sourceNote: `الأرقام والمراحل وفقًا لمنشور 30 يوليو 2026. يختلف مؤشر ${PROFILE_FACTS.developedPartTypes} صنفًا مطوّرًا عن مؤشر أكثر من ${PROFILE_FACTS.serialPositions} صنفًا للإنتاج المتسلسل الوارد في الملف المهني.`, sourceLabel: "قصة المركز في مجلة «إدارة الإنتاج»",
    },
  }),
  en: withSource({
    nav: { label: "Portfolio sections", projects: "Projects", demo: "3D demo", about: "About", contact: "Contact" },
    contact: { telegram: "Message on Telegram", email: "Send an email", profilePdf: "Brief profile · PDF", pdfNote: "Russian edition to share with colleagues" },
    press: { eyebrow: "Independent coverage", title: "My work in the press", description: "Reporting on the Additive Technology Center, robotics and my career at GAZ.", all: "All publications", readArticle: "Read article" },
    projectLabels: { status: "Status", role: "My contribution", period: "Period", evidence: "Details" },
    projectEvidence: {
      dashboard: { status: "Engineering development", role: "Monitoring interface and local voice-control development" },
      cobots: { status: "Pilot vehicle batch passed quality audit", role: "Cell design, tooling and programming with the ATC team", period: "Reported on 30 July 2026", sourceLabel: "Project coverage" },
      cat: { status: "Center launched in 2025", role: "Project initiator and ATC lead", period: "2022–2026", sourceLabel: "How the ATC was created" },
      judging: { status: "Expert practice", role: "Technical assessment of engineering projects and mentoring" },
    },
    caseStudy: {
      eyebrow: "Case study · building engineering capability", title: "From a shop-floor problem to an Additive Technology Center",
      lead: "I initiated the ATC at GAZ and worked with the team to turn a production need into an in-house engineering facility.",
      chapters: [
        { title: "The production problem", body: "Wear in small plastic parts could stop paint robots. External supplies took time, while production needed a constant reserve of spares." },
        { title: "My role and the team", body: "I proposed the center and won a corporate project competition in 2022. Together we converted shop-floor space, selected equipment and built the team." },
        { title: "The technical approach", body: "We combined reverse engineering, wear-resistant material selection and 3D printing. The center handles supplied models and develops parts and production tooling from initial sketches." },
      ],
      timeline: [{ year: "2022", text: "Project presentation and corporate competition win" }, { year: "2025", text: "Full Additive Technology Center opened" }, { year: "2026", text: "Internal customers, production tooling and robot cells" }],
      metrics: [{ value: `>₽${PROFILE_FACTS.annualSavingsMillionsRub}M`, label: "annual economic impact" }, { value: `up to ${PROFILE_FACTS.sparePartsCoveragePercent}%`, label: "Coverage of plastic auxiliary part types for paint robots" }, { value: `${PROFILE_FACTS.developedPartTypes}`, label: "part types in the center’s developed range" }],
      sourceNote: `Figures and milestones were reported on 30 July 2026. The ${PROFILE_FACTS.developedPartTypes} developed part types and the ${PROFILE_FACTS.serialPositions}+ serial-production part numbers in the portfolio are distinct measures.`, sourceLabel: "Read the ATC story in Upravlenie Proizvodstvom",
    },
  }),
};
