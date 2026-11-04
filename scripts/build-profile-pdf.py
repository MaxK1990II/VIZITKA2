"""Build the site's concise Russian profile. Requires reportlab and Pillow.

Run: python scripts/build-profile-pdf.py
Set PROFILE_FONT_DIR to a directory with DejaVuSans.ttf/DejaVuSans-Bold.ttf
when Segoe UI is unavailable. All result metrics below refer to the cited
publication of 30 July 2026; update the facts and their source together.
"""

from io import BytesIO
from pathlib import Path
import os

from PIL import Image
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public/files/maxim-kanochkin-profile-ru.pdf"
PHOTO = ROOT / "public/maxim-kanochkin-portrait.png"
SOURCE = "https://up-pro.ru/library/modernization/technologies_equipment/gaz-centr-additivnyh-tehnologij/"
WEBSITE = "https://kanochkinmm.ru/"
DEMO = WEBSITE + "#cobot-demo"
WIDTH, HEIGHT = 595.2756, 841.8898  # A4, points
MARGIN = 40
INK = colors.HexColor("#161718")
MUTED = colors.HexColor("#575957")
COPPER = colors.HexColor("#8A5C3E")
LIGHT_COPPER = colors.HexColor("#D0AF96")
RULE = colors.HexColor("#DDD7D1")


def fonts():
    configured = os.getenv("PROFILE_FONT_DIR")
    candidates = []
    if configured:
        candidates.append((Path(configured), "DejaVuSans.ttf", "DejaVuSans-Bold.ttf"))
    candidates.extend([
        (Path(os.getenv("WINDIR", "C:/Windows")) / "Fonts", "segoeui.ttf", "segoeuib.ttf"),
        (Path("/usr/share/fonts/truetype/dejavu"), "DejaVuSans.ttf", "DejaVuSans-Bold.ttf"),
    ])
    for folder, regular, bold in candidates:
        if (folder / regular).is_file() and (folder / bold).is_file():
            pdfmetrics.registerFont(TTFont("Profile", str(folder / regular)))
            pdfmetrics.registerFont(TTFont("ProfileBold", str(folder / bold)))
            pdfmetrics.registerFontFamily("Profile", normal="Profile", bold="ProfileBold")
            return
    raise RuntimeError("Set PROFILE_FONT_DIR to a directory containing DejaVu Sans regular and bold TTF files")


def paragraph(pdf, text, x, top, width, size=10, leading=14, color=INK, bold=False):
    style = ParagraphStyle(
        "profile", fontName="ProfileBold" if bold else "Profile",
        fontSize=size, leading=leading, textColor=color, alignment=TA_LEFT,
        spaceBefore=0, spaceAfter=0, allowWidows=0, allowOrphans=0,
    )
    item = Paragraph(text, style)
    _, height = item.wrap(width, HEIGHT)
    item.drawOn(pdf, x, top - height)
    return top - height


def rule(pdf, top):
    pdf.setStrokeColor(RULE)
    pdf.setLineWidth(0.6)
    pdf.line(MARGIN, top, WIDTH - MARGIN, top)


def build():
    fonts()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=(WIDTH, HEIGHT), pageCompression=1)
    pdf.setTitle("Максим Каночкин | Профессиональный профиль")
    pdf.setAuthor("Максим Каночкин")
    pdf.setSubject("Промышленная роботизация, ИИ и аддитивные технологии")
    pdf.setCreator("kanochkinmm.ru")
    pdf.setFillColor(colors.white)
    pdf.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)

    # A short masthead with the same author portrait as the portfolio.
    pdf.setFillColor(INK)
    pdf.rect(0, HEIGHT - 201, WIDTH, 201, fill=1, stroke=0)
    paragraph(pdf, "ПРОФЕССИОНАЛЬНЫЙ ПРОФИЛЬ", MARGIN, HEIGHT - 29, 350,
              size=8, leading=11, color=LIGHT_COPPER, bold=True)
    paragraph(pdf, "Максим<br/>Каночкин", MARGIN, HEIGHT - 53, 340,
              size=31, leading=34, color=colors.white, bold=True)
    paragraph(pdf, "Начальник отдела развития, инноваций<br/>и аддитивных технологий", MARGIN,
              HEIGHT - 133, 350, size=11.3, leading=15, color=colors.HexColor("#E4E2DF"))
    paragraph(pdf, "Автомобильный завод ГАЗ · Нижний Новгород", MARGIN,
              HEIGHT - 173, 350, size=9, leading=12, color=LIGHT_COPPER)
    with Image.open(PHOTO) as photo:
        photo = photo.convert("RGB")
        photo.thumbnail((510, 600))
        image_bytes = BytesIO()
        photo.save(image_bytes, format="JPEG", quality=88, optimize=True)
        image_bytes.seek(0)
        photo_height = 155
        photo_width = photo_height * photo.width / photo.height
        pdf.drawImage(ImageReader(image_bytes), WIDTH - MARGIN - photo_width,
                      HEIGHT - 29 - photo_height, width=photo_width, height=photo_height)

    # Three different result measures: scope, range of mastered parts, impact.
    columns = [MARGIN, 219, 397]
    metrics = [
        ("320", "освоенных позиций<br/>в номенклатуре ЦАТ"),
        ("до 70%", "охват номенклатуры пластиковых<br/>вспомогательных деталей<br/>окрасочных роботов"),
        ("> 5 млн ₽", "экономический эффект<br/>от создания центра в год"),
    ]
    for x, (value, label) in zip(columns, metrics):
        paragraph(pdf, value, x, 617, 158, size=23, leading=28, color=COPPER, bold=True)
        paragraph(pdf, label, x, 583, 158, size=9.2, leading=12.5, color=MUTED)
    paragraph(pdf, "Показатели приведены по публикации от 30 июля 2026 года. Освоенные позиции не равнозначны серийным изделиям.",
              MARGIN, 536, WIDTH - 2 * MARGIN, size=7.7, leading=10.5, color=MUTED)
    rule(pdf, 518)

    paragraph(pdf, "Создание Центра аддитивных технологий", MARGIN, 501,
              WIDTH - 2 * MARGIN, size=15.5, leading=20, bold=True)
    paragraph(pdf,
              "Инициировал проект ЦАТ, участвовал в подборе оборудования и формировании команды. "
              "Центр решает задачи реверс-инжиниринга, изготовления прототипов, подбора материалов "
              "и разработки оснастки для производства.",
              MARGIN, 472, WIDTH - 2 * MARGIN, size=10, leading=14)
    milestones = [
        ("2013", "Начало работы на ГАЗе:<br/>обслуживание окрасочных роботов."),
        ("2022", "Победа проекта ЦАТ<br/>на корпоративной конференции."),
        ("2025", "Запуск полноценного центра<br/>аддитивных технологий."),
    ]
    for x, (year, description) in zip(columns, milestones):
        paragraph(pdf, year, x, 416, 158, size=12, leading=16, bold=True, color=COPPER)
        paragraph(pdf, description, x, 392, 158, size=9, leading=12.5, color=MUTED)
    rule(pdf, 350)

    paragraph(pdf, "Направления работы", MARGIN, 334, WIDTH - 2 * MARGIN,
              size=15.5, leading=20, bold=True)
    rows = [
        ("Роботизация", "Проектирование роботизированных ячеек, оснастки и траекторий; интеграция коботов в производственные задачи."),
        ("Промышленный ИИ", "Инженерные интерфейсы, мониторинг процессов и голосовые инструменты для работы в закрытом контуре предприятия."),
        ("Аддитивные технологии", "От обратного проектирования до функциональной детали: прототипы, запасные части и технологическая оснастка."),
    ]
    for top, (label, description) in zip([302, 260, 218], rows):
        paragraph(pdf, label, MARGIN, top, 137, size=9.2, leading=12.5, bold=True)
        paragraph(pdf, description, 190, top, WIDTH - MARGIN - 190, size=9.5, leading=13)

    pdf.setFillColor(colors.HexColor("#F3EEE9"))
    pdf.roundRect(MARGIN, 122, WIDTH - 2 * MARGIN, 49, 6, fill=1, stroke=0)
    paragraph(pdf, "AL-FLOW / CS620 · интерактивная концепция R13", MARGIN + 12, 160,
              WIDTH - 2 * MARGIN - 24, size=9.3, leading=12, bold=True)
    paragraph(pdf, f'<link href="{DEMO}" color="#8A5C3E">Посмотреть модель перекладки алюминиевых чушек на сайте →</link>',
              MARGIN + 12, 143, WIDTH - 2 * MARGIN - 24, size=8.6, leading=11)

    paragraph(pdf, f'<link href="{WEBSITE}" color="#161718">kanochkinmm.ru</link>   ·   '
              '<link href="mailto:maxi.k@mail.ru" color="#161718">maxi.k@mail.ru</link>   ·   '
              '<link href="https://t.me/MaxSames" color="#161718">Telegram: @MaxSames</link>',
              MARGIN, 104, WIDTH - 2 * MARGIN, size=9.2, leading=13, bold=True)
    paragraph(pdf, f'<link href="{SOURCE}" color="#575957">Источник показателей и истории ЦАТ: «Управление производством», 30.07.2026.</link>',
              MARGIN, 77, WIDTH - 2 * MARGIN, size=7.7, leading=10.5, color=MUTED)
    paragraph(pdf, "Профессиональная информация: kanochkinmm.ru · Редакция: ноябрь 2026 · 1 / 1",
              MARGIN, 59, WIDTH - 2 * MARGIN, size=7.7, leading=10.5, color=MUTED)
    pdf.showPage()
    pdf.save()
    print(f"Created {OUTPUT} ({OUTPUT.stat().st_size:,} bytes)")


if __name__ == "__main__":
    build()
