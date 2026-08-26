from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "real-review-analysis-cleanbros.pdf"
PUBLIC = ROOT / "public" / "materials" / OUT.name
OUT.parent.mkdir(parents=True, exist_ok=True)
PUBLIC.parent.mkdir(parents=True, exist_ok=True)

FONTS = Path("C:/Windows/Fonts")
pdfmetrics.registerFont(TTFont("Arial", str(FONTS / "arial.ttf")))
pdfmetrics.registerFont(TTFont("ArialBold", str(FONTS / "arialbd.ttf")))
pdfmetrics.registerFont(TTFont("Georgia", str(FONTS / "georgia.ttf")))

W, H = A4
GREEN = colors.HexColor("#173b34")
INK = colors.HexColor("#18231f")
MUTED = colors.HexColor("#65706a")
PAPER = colors.HexColor("#f5f2ea")
MINT = colors.HexColor("#e4ece8")
LINE = colors.HexColor("#cad2ce")


def wrap(c, text, font, size, max_width):
    words = text.split()
    lines, current = [], ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if c.stringWidth(candidate, font, size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_lines(c, lines, x, y, font="Arial", size=9.5, leading=13, color=INK):
    c.setFont(font, size)
    c.setFillColor(color)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


c = canvas.Canvas(str(OUT), pagesize=A4)
c.setTitle("Одностраничный разбор отзывов - Братья Чистовы")
c.setAuthor("Maria Winslow")
c.setFillColor(PAPER)
c.rect(0, 0, W, H, fill=1, stroke=0)

margin = 16 * mm
content_w = W - 2 * margin

c.setFillColor(GREEN)
c.rect(0, H - 62 * mm, W, 62 * mm, fill=1, stroke=0)
c.setFont("ArialBold", 7.5)
c.setFillColor(colors.HexColor("#bcd0c7"))
c.drawString(margin, H - 15 * mm, "MARIA WINSLOW  /  РЕАЛЬНЫЙ ПРИМЕР НА ОТКРЫТЫХ ДАННЫХ")
c.setFont("Georgia", 27)
c.setFillColor(colors.white)
c.drawString(margin, H - 31 * mm, "Где клининг теряет доверие")
c.drawString(margin, H - 43 * mm, "после сильного старта")
c.setFont("Arial", 8.5)
c.setFillColor(colors.HexColor("#d7e3de"))
c.drawString(margin, H - 54 * mm, "Экспресс-разбор публичных отзывов о сервисе «Братья Чистовы»")

y = H - 73 * mm
c.setFont("ArialBold", 7.3)
c.setFillColor(GREEN)
c.drawString(margin, y, "ГЛАВНЫЙ СИГНАЛ")
y -= 9 * mm
headline = "Сильную услугу портит разрыв между обещанным заказом и тем, что происходит на объекте."
for line in wrap(c, headline, "Georgia", 18, content_w):
    c.setFont("Georgia", 18)
    c.setFillColor(INK)
    c.drawString(margin, y, line)
    y -= 7.2 * mm

y -= 3 * mm
c.setFillColor(MINT)
c.roundRect(margin, y - 31 * mm, content_w, 31 * mm, 2 * mm, fill=1, stroke=0)
c.setFont("ArialBold", 7.2)
c.setFillColor(GREEN)
c.drawString(margin + 5 * mm, y - 7 * mm, "ЧТО ПОВТОРЯЕТСЯ В ИНФОРМАТИВНЫХ ОТЗЫВАХ")
evidence = [
    "01  Оператор подробно объяснил процесс, но на объекте не оказалось ожидаемого набора оборудования.",
    "02  Отдельно заказанные работы или зоны иногда остаются невыполненными.",
    "03  Негатив усиливается, когда претензия долго остаётся без ответа и понятного итога.",
]
ey = y - 13 * mm
for item in evidence:
    ey = draw_lines(c, wrap(c, item, "Arial", 8.1, content_w - 10 * mm), margin + 5 * mm, ey, size=8.1, leading=10.2)
    ey -= 1.2 * mm

y -= 40 * mm
col_gap = 7 * mm
col_w = (content_w - col_gap) / 2

c.setStrokeColor(LINE)
c.setLineWidth(0.7)
c.rect(margin, y - 53 * mm, col_w, 53 * mm, fill=0, stroke=1)
c.rect(margin + col_w + col_gap, y - 53 * mm, col_w, 53 * mm, fill=0, stroke=1)

c.setFont("ArialBold", 7.2)
c.setFillColor(GREEN)
c.drawString(margin + 5 * mm, y - 7 * mm, "ПОЧЕМУ ЭТО ВАЖНО")
why = "Клиент доверяет приложению, чек-листу и заранее согласованной цене. Несовпадение воспринимается не как случайная ошибка исполнителя, а как нарушение обещания бренда."
draw_lines(c, wrap(c, why, "Arial", 8.7, col_w - 10 * mm), margin + 5 * mm, y - 15 * mm, size=8.7, leading=12.2, color=INK)

rx = margin + col_w + col_gap
c.setFont("ArialBold", 7.2)
c.setFillColor(GREEN)
c.drawString(rx + 5 * mm, y - 7 * mm, "ЧТО ПРОВЕРИТЬ ПЕРВЫМ")
first = "За 24 часа до визита одной карточкой подтвердить: состав работ, дополнительные опции, число исполнителей, обязательный инвентарь и контакт для быстрой эскалации."
draw_lines(c, wrap(c, first, "Arial", 8.7, col_w - 10 * mm), rx + 5 * mm, y - 15 * mm, size=8.7, leading=12.2, color=INK)

y -= 63 * mm
c.setFillColor(GREEN)
c.roundRect(margin, y - 35 * mm, content_w, 35 * mm, 2 * mm, fill=1, stroke=0)
c.setFont("ArialBold", 7.2)
c.setFillColor(colors.HexColor("#bcd0c7"))
c.drawString(margin + 5 * mm, y - 7 * mm, "МИНИ-ТЕСТ НА 14 ДНЕЙ")
test = "Взять одну группу заказов, использовать карточку подтверждения и сравнить: несоответствия заказа, время первого ответа на претензию и обращения без итога через 24 часа."
draw_lines(c, wrap(c, test, "Arial", 9, content_w - 10 * mm), margin + 5 * mm, y - 15 * mm, size=9, leading=12.5, color=colors.white)

y -= 44 * mm
c.setFont("ArialBold", 7.2)
c.setFillColor(GREEN)
c.drawString(margin, y, "ВЫВОД ЗА 15 СЕКУНД")
y -= 6 * mm
takeaway = "Не нужно «повышать качество вообще». Сначала синхронизировать обещание, ресурсы и приёмку результата."
draw_lines(c, wrap(c, takeaway, "Georgia", 13.5, content_w), margin, y, font="Georgia", size=13.5, leading=18, color=INK)

c.setStrokeColor(LINE)
c.line(margin, 20 * mm, W - margin, 20 * mm)
c.setFont("Arial", 6.8)
c.setFillColor(MUTED)
c.drawString(margin, 15 * mm, "Источник: 4 публичные карточки Яндекс Карт, отзывы 2024-2026. Качественный экспресс-разбор, не статистическая оценка.")
c.drawString(margin, 10 * mm, "Независимый пример, не заказ и не одобрение компании. Выводы - гипотезы для проверки на внутренних данных.")
c.drawRightString(W - margin, 10 * mm, "maria-winslow.netlify.app")

c.showPage()
c.save()
PUBLIC.write_bytes(OUT.read_bytes())
print(OUT)
print(PUBLIC)
