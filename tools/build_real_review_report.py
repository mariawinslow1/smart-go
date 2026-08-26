from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    NextPageTemplate,
    PageTemplate,
    Paragraph,
    PageBreak,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "real-review-analysis-cleanbros.pdf"
PUBLIC = ROOT / "public" / "materials" / OUT.name
OUT.parent.mkdir(parents=True, exist_ok=True)
PUBLIC.parent.mkdir(parents=True, exist_ok=True)

FONT_DIR = Path("C:/Windows/Fonts")
pdfmetrics.registerFont(TTFont("Arial", str(FONT_DIR / "arial.ttf")))
pdfmetrics.registerFont(TTFont("ArialBold", str(FONT_DIR / "arialbd.ttf")))
pdfmetrics.registerFont(TTFont("Georgia", str(FONT_DIR / "georgia.ttf")))
pdfmetrics.registerFont(TTFont("GeorgiaBold", str(FONT_DIR / "georgiab.ttf")))

PAGE_W, PAGE_H = A4
INK = colors.HexColor("#17231f")
GREEN = colors.HexColor("#173b34")
MINT = colors.HexColor("#dfe9e4")
PAPER = colors.HexColor("#f5f2ea")
MUTED = colors.HexColor("#65706a")
LINE = colors.HexColor("#cfd5d1")
WHITE = colors.white
AMBER = colors.HexColor("#a66b20")


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Kicker", fontName="ArialBold", fontSize=7.5, leading=10, textColor=GREEN, tracking=1.4, spaceAfter=8))
styles.add(ParagraphStyle(name="TitleMW", fontName="Georgia", fontSize=31, leading=34, textColor=INK, spaceAfter=12))
styles.add(ParagraphStyle(name="LeadMW", fontName="Arial", fontSize=11.5, leading=17, textColor=MUTED, spaceAfter=16))
styles.add(ParagraphStyle(name="H1MW", fontName="Georgia", fontSize=23, leading=27, textColor=INK, spaceBefore=3, spaceAfter=13))
styles.add(ParagraphStyle(name="H2MW", fontName="Georgia", fontSize=15, leading=19, textColor=INK, spaceBefore=4, spaceAfter=7))
styles.add(ParagraphStyle(name="BodyMW", fontName="Arial", fontSize=9.4, leading=14, textColor=INK, spaceAfter=8))
styles.add(ParagraphStyle(name="SmallMW", fontName="Arial", fontSize=7.5, leading=11, textColor=MUTED, spaceAfter=5))
styles.add(ParagraphStyle(name="LabelMW", fontName="ArialBold", fontSize=7, leading=9, textColor=GREEN, tracking=1, spaceAfter=4))
styles.add(ParagraphStyle(name="QuoteMW", fontName="Georgia", fontSize=10.2, leading=15, textColor=INK, leftIndent=9, borderColor=GREEN, borderWidth=1.5, borderPadding=(0, 0, 0, 9), spaceAfter=10))
styles.add(ParagraphStyle(name="WhiteKicker", fontName="ArialBold", fontSize=7.5, leading=10, textColor=colors.HexColor("#b9cec6"), tracking=1.4, spaceAfter=10))
styles.add(ParagraphStyle(name="WhiteTitle", fontName="Georgia", fontSize=27, leading=31, textColor=WHITE, spaceAfter=12))
styles.add(ParagraphStyle(name="WhiteBody", fontName="Arial", fontSize=10, leading=15, textColor=colors.HexColor("#dce7e2"), spaceAfter=9))
styles.add(ParagraphStyle(name="Number", fontName="Georgia", fontSize=28, leading=30, textColor=GREEN, alignment=TA_CENTER))
styles.add(ParagraphStyle(name="CenterSmall", fontName="Arial", fontSize=7.2, leading=10, textColor=MUTED, alignment=TA_CENTER))
styles.add(ParagraphStyle(name="LinkMW", fontName="Arial", fontSize=7, leading=10, textColor=GREEN, wordWrap="CJK"))


def P(text, style="BodyMW"):
    return Paragraph(text, styles[style])


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setStrokeColor(LINE)
    canvas.line(18 * mm, 14 * mm, PAGE_W - 18 * mm, 14 * mm)
    canvas.setFont("Arial", 6.7)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 9 * mm, "MARIA WINSLOW  /  АНАЛИТИКА КЛИЕНТСКИХ ОТЗЫВОВ")
    canvas.drawRightString(PAGE_W - 18 * mm, 9 * mm, f"{doc.page}")
    canvas.restoreState()


def cover(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(GREEN)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setFillColor(colors.HexColor("#b9cec6"))
    canvas.setFont("ArialBold", 7.5)
    canvas.drawString(20 * mm, PAGE_H - 22 * mm, "MARIA WINSLOW  /  РЕАЛЬНЫЙ ПРИМЕР РЕЗУЛЬТАТА")
    canvas.setStrokeColor(colors.HexColor("#41645b"))
    canvas.line(20 * mm, PAGE_H - 28 * mm, PAGE_W - 20 * mm, PAGE_H - 28 * mm)
    canvas.setFont("Georgia", 34)
    canvas.setFillColor(WHITE)
    y = PAGE_H - 70 * mm
    for line in ["Где клининг", "теряет доверие", "после сильного старта"]:
        canvas.drawString(20 * mm, y, line)
        y -= 15 * mm
    canvas.setFont("Arial", 11)
    canvas.setFillColor(colors.HexColor("#dce7e2"))
    canvas.drawString(20 * mm, y - 4 * mm, "Экспресс-анализ публичных отзывов о сервисе «Братья Чистовы»")
    canvas.setFont("Arial", 8)
    canvas.setFillColor(colors.HexColor("#a9beb6"))
    canvas.drawString(20 * mm, 31 * mm, "Открытые данные  /  качественный анализ  /  26 августа 2026")
    canvas.drawString(20 * mm, 24 * mm, "Не заказ клиента. Не содержит обещаний финансового результата.")
    canvas.restoreState()


doc = BaseDocTemplate(
    str(OUT),
    pagesize=A4,
    leftMargin=18 * mm,
    rightMargin=18 * mm,
    topMargin=19 * mm,
    bottomMargin=18 * mm,
    title="Реальный пример анализа отзывов - Братья Чистовы",
    author="Maria Winslow",
)
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
doc.addPageTemplates([
    PageTemplate(id="cover", frames=[frame], onPage=cover),
    PageTemplate(id="body", frames=[frame], onPage=header_footer),
])

story = [Spacer(1, 245 * mm), NextPageTemplate("body"), PageBreak()]

story += [
    P("КРАТКИЙ ВЫВОД", "Kicker"),
    P("Проблема не сводится к качеству уборки.", "H1MW"),
    P("Публичные отзывы показывают сильный продукт: удобный заказ, понятный чек-лист, удачных исполнителей и заметный результат. Но доверие проседает, когда фактическая команда, инвентарь или объём работ отличаются от ожиданий, а претензия не получает быстрого и понятного завершения.", "LeadMW"),
]

summary_data = [
    [P("01", "Number"), P("02", "Number"), P("03", "Number")],
    [P("Сильная сторона", "CenterSmall"), P("Зона риска", "CenterSmall"), P("Первый приоритет", "CenterSmall")],
    [P("Приложение, чек-лист, прозрачность заказа и сильные клинеры", "CenterSmall"), P("Разрыв между обещанным составом услуги и исполнением на объекте", "CenterSmall"), P("Подтверждать заказ за 24 часа и закрывать претензии по единому сценарию", "CenterSmall")],
]
summary_table = Table(summary_data, colWidths=[doc.width / 3] * 3, rowHeights=[13 * mm, 7 * mm, 24 * mm])
summary_table.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#e8ece8")),
    ("BOX", (0, 0), (-1, -1), 0.6, LINE),
    ("INNERGRID", (0, 0), (-1, -1), 0.6, LINE),
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("LEFTPADDING", (0, 0), (-1, -1), 7),
    ("RIGHTPADDING", (0, 0), (-1, -1), 7),
]))
story += [summary_table, Spacer(1, 8 * mm), P("Что важно", "LabelMW"), P("Это экспресс-разбор открытых отзывов, а не аудит внутренних процессов. Отдельный отзыв не доказывает системную проблему. Повторяющиеся ситуации здесь используются как сигналы, которые стоит проверить на операционных данных: составе заказов, назначениях клинеров, обращениях и повторных заказах.", "BodyMW")]

story += [PageBreak(), P("МЕТОД И ГРАНИЦЫ", "Kicker"), P("Что именно было проанализировано", "H1MW")]
method_rows = [
    [P("Источник", "LabelMW"), P("Открытые карточки «Братьев Чистовых» на Яндекс Картах", "BodyMW")],
    [P("Подход", "LabelMW"), P("Качественное чтение информативных положительных, смешанных и негативных отзывов за 2024-2026 годы", "BodyMW")],
    [P("Фокус", "LabelMW"), P("Ожидания до визита, состав заказа, исполнение на объекте, реакция на претензию и причины повторного обращения", "BodyMW")],
    [P("Ограничение", "LabelMW"), P("Выборка не является репрезентативным количественным исследованием и не позволяет оценивать долю недовольных клиентов", "BodyMW")],
]
mt = Table(method_rows, colWidths=[38 * mm, doc.width - 38 * mm])
mt.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LINEBELOW", (0, 0), (-1, -1), 0.5, LINE),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ("TOPPADDING", (0, 0), (-1, -1), 7),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
]))
story += [mt, Spacer(1, 9 * mm), P("Позитивный контур", "H2MW"), P("В сильных отзывах повторяются конкретные причины ценности: удобное приложение, возможность увидеть состав заказа, пунктуальность, собственное оборудование, понятная цена, внимательный менеджер и хороший результат без постоянного контроля клиента.", "BodyMW"), P("Это важная опора: задача не в том, чтобы полностью перестраивать сервис, а в том, чтобы сделать сильный сценарий воспроизводимым для каждого заказа.", "BodyMW")]

story += [PageBreak(), P("СИГНАЛ 01", "Kicker"), P("Обещание в приложении сильнее, чем устная договорённость", "H1MW"), P("Клиент воспринимает чек-лист, выбранные дополнительные услуги и обещанное оборудование как точный контракт ожиданий. Если на объект приезжает один уставший исполнитель с ограниченным набором средств или часть отдельно заказанной работы не выполнена, претензия относится уже не только к уборке, но и к несоответствию обещанию бренда.", "LeadMW"), P("Примеры формулировок", "LabelMW"), P("«Оператор быстро и подробно рассказала о процессе... По факту пришла уборщица с шваброй и тряпкой».", "QuoteMW"), P("«Отсутствие у клинеров некоторых чистящих средств - для мытья окон и туалета».", "QuoteMW"), P("Интерпретация", "H2MW"), P("Сигнал требует проверки связки: выбранный пакет -> назначенный исполнитель -> фактически выданный инвентарь -> выполненные пункты. Ошибка может возникать не у клинера, а раньше - при оценке объёма, планировании загрузки или передаче заказа.", "BodyMW"), P("Что проверить в данных", "H2MW"), P("Долю заказов, где менялся состав услуги на объекте; долю выездов без заявленного оборудования; жалобы на невыполненные дополнительные опции; связь таких случаев с конкретным типом уборки и загрузкой исполнителя.", "BodyMW")]

story += [PageBreak(), P("СИГНАЛ 02", "Kicker"), P("Незакрытая претензия превращает ошибку в потерю доверия", "H1MW"), P("В нескольких информативных отзывах негатив усиливается не только из-за результата уборки, но и из-за отсутствия ответа, спора или неясного сценария компенсации. Клиенту приходится повторно писать, звонить или публично дублировать обращение.", "LeadMW"), P("Примеры формулировок", "LabelMW"), P("«На мои жалобы ни ответа ни привета уже более недели».", "QuoteMW"), P("«Никто на почте не отвечает. Вопрос никак не урегулировали».", "QuoteMW"), P("«На претензии от менеджера ответа нет».", "QuoteMW"), P("Интерпретация", "H2MW"), P("Даже без возможности немедленно решить спор компания может сохранить доверие, если быстро подтверждает получение, называет ответственного и срок следующего контакта. Молчание оставляет клиенту только публичный канал.", "BodyMW"), P("Что проверить в данных", "H2MW"), P("Медиану первого ответа; долю обращений без ответа более 24 часов; повторные обращения по одной претензии; долю случаев с зафиксированным итогом; повторный заказ после урегулирования.", "BodyMW")]

story += [PageBreak(), P("СИГНАЛ 03", "Kicker"), P("Лучший сценарий уже существует - его нужно стандартизировать", "H1MW"), P("Положительные отзывы описывают противоположный опыт: менеджер заранее объяснил процесс, команда приехала вовремя и с оборудованием, цена не изменилась, а заказ был выполнен по понятному составу. Это готовая модель для стандарта, а не абстрактное пожелание «повысить качество».", "LeadMW"), P("Примеры формулировок", "LabelMW"), P("«Понравилось приложение с прозрачным и максимально ясным чек-листом и конструктором по цене».", "QuoteMW"), P("«Приехали 4 человека с оборудованием... Цену озвучили заранее и не меняли».", "QuoteMW"), P("«Менеджер всегда на связи, ответят на вопросы и решат вопрос, если что-то возникло».", "QuoteMW"), P("Интерпретация", "H2MW"), P("Сильная сторона бренда - предсказуемость. Её можно защищать не общим контролем каждого движения, а тремя точками: подтверждение до визита, сверка на старте и понятное принятие результата.", "BodyMW")]

story += [PageBreak(), P("ПРИОРИТЕТ", "Kicker"), P("Первое изменение: карточка подтверждения заказа", "H1MW"), P("За 24 часа до визита клиент и исполнитель получают одну короткую карточку. Она не добавляет новую услугу - она синхронизирует то, что уже было продано.", "LeadMW")]
actions = [
    [P("1", "Number"), P("Состав", "H2MW"), P("Тип уборки, все дополнительные опции, исключения и зоны особого внимания.", "BodyMW")],
    [P("2", "Number"), P("Ресурс", "H2MW"), P("Число исполнителей, ожидаемая длительность, обязательный инвентарь и средства.", "BodyMW")],
    [P("3", "Number"), P("Эскалация", "H2MW"), P("Один контакт и правило: сообщить о несоответствии до начала работ, не после ухода.", "BodyMW")],
    [P("4", "Number"), P("Приёмка", "H2MW"), P("Три критичные зоны проверяются вместе с клиентом или фиксируются фотографиями.", "BodyMW")],
]
at = Table(actions, colWidths=[18 * mm, 39 * mm, doc.width - 57 * mm])
at.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("LINEBELOW", (0, 0), (-1, -1), 0.6, LINE),
    ("LEFTPADDING", (0, 0), (-1, -1), 3),
    ("RIGHTPADDING", (0, 0), (-1, -1), 7),
    ("TOPPADDING", (0, 0), (-1, -1), 8),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
]))
story += [at, Spacer(1, 8 * mm), P("Почему именно это", "H2MW"), P("Карточка одновременно снижает риск неверных ожиданий, помогает исполнителю подготовиться и создаёт проверяемую точку для разбора претензий. Это более узкое и контролируемое изменение, чем попытка «обучить всех лучше убирать».", "BodyMW")]

story += [PageBreak(), P("ПЛАН НА 14 ДНЕЙ", "Kicker"), P("Небольшой тест вместо большой перестройки", "H1MW")]
plan = [
    [P("Дни 1-2", "LabelMW"), P("Собрать 10-15 последних претензий и отметить: обещание, фактическое исполнение, первый ответ, итог.", "BodyMW")],
    [P("Дни 3-4", "LabelMW"), P("Создать карточку подтверждения и сценарий ответа на претензию: получили -> ответственный -> срок -> итог.", "BodyMW")],
    [P("Дни 5-12", "LabelMW"), P("Использовать карточку на одной группе заказов, не меняя остальные процессы.", "BodyMW")],
    [P("Дни 13-14", "LabelMW"), P("Сравнить ошибки ожиданий, скорость ответа и повторные обращения с предыдущими заказами.", "BodyMW")],
]
pt = Table(plan, colWidths=[32 * mm, doc.width - 32 * mm])
pt.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (0, -1), MINT),
    ("LINEBELOW", (0, 0), (-1, -1), 0.6, LINE),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 7),
    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ("TOPPADDING", (0, 0), (-1, -1), 8),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
]))
story += [pt, Spacer(1, 8 * mm), P("Метрики теста", "H2MW")]
metrics = [
    [P("Подтверждённые заказы", "LabelMW"), P("доля карточек, подтверждённых клиентом и исполнителем", "SmallMW")],
    [P("Несоответствие", "LabelMW"), P("случаи, где состав команды, инвентарь или опции не совпали", "SmallMW")],
    [P("Первый ответ", "LabelMW"), P("время от претензии до подтверждения и назначения ответственного", "SmallMW")],
    [P("Закрытие", "LabelMW"), P("обращения без зафиксированного итога через 24 часа", "SmallMW")],
]
met = Table(metrics, colWidths=[42 * mm, doc.width - 42 * mm])
met.setStyle(TableStyle([("BOX", (0, 0), (-1, -1), 0.6, LINE), ("INNERGRID", (0, 0), (-1, -1), 0.6, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 7), ("RIGHTPADDING", (0, 0), (-1, -1), 7), ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 5)]))
story += [met]

story += [PageBreak(), P("ИСТОЧНИКИ", "Kicker"), P("Открытые страницы, использованные в разборе", "H1MW"), P("Ссылки ведут на публичные карточки с отзывами. Содержание и порядок отображения могут меняться после даты анализа.", "BodyMW")]
sources = [
    "https://yandex.com/maps/org/bratya_chistovy/134423225518/reviews/",
    "https://yandex.com/maps/org/bratya_chistovy/5035956521/reviews/",
    "https://yandex.com/maps/org/bratya_chistovy/34762811226/reviews/",
    "https://yandex.com/maps/org/bratya_chistovy/4212502559/reviews/",
]
for idx, url in enumerate(sources, 1):
    story += [P(f"0{idx}", "LabelMW"), P(f'<link href="{url}">{url}</link>', "LinkMW"), Spacer(1, 4 * mm)]
story += [Spacer(1, 9 * mm), P("Правовая и аналитическая оговорка", "H2MW"), P("Отчёт подготовлен независимо на основе открытых пользовательских материалов. Он не является заказом или одобрением со стороны компании «Братья Чистовы». Формулировки отзывов отражают опыт их авторов. Выводы являются аналитическими гипотезами для проверки, а не утверждениями о фактическом устройстве внутренних процессов.", "BodyMW"), Spacer(1, 10 * mm), P("Maria Winslow", "H2MW"), P("Аналитика клиентских отзывов для бизнеса<br/>maria-winslow.netlify.app  /  @winslowmaria  /  winslowmaria044@gmail.com", "BodyMW")]

doc.build(story)
PUBLIC.write_bytes(OUT.read_bytes())
print(OUT)
print(PUBLIC)
