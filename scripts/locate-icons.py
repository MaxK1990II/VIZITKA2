from pathlib import Path

from PIL import Image, ImageDraw

src = Path(
    r"C:\Users\Максим\.cursor\projects\c-VIZITKA\assets"
    r"\c__Users________AppData_Roaming_Cursor_User_workspaceStorage"
    r"_d969c1a31fb52d5f64b1d222fc2b3cf8_images_image-a533d41f-2bb6-4988-a44b-8fed309c4137.png"
)
out = Path(r"c:\VIZITKA\kanochkinmm-portfolio\public\icons\domain")
im = Image.open(src).convert("RGBA")

# Draw grid overlay to locate icons precisely
overlay = im.copy()
d = ImageDraw.Draw(overlay)
for x in range(0, im.width, 20):
    d.line([(x, 0), (x, im.height)], fill=(0, 80, 255, 80), width=1)
for y in range(0, im.height, 20):
    d.line([(0, y), (im.width, y)], fill=(0, 80, 255, 80), width=1)
for x in range(0, im.width, 100):
    d.line([(x, 0), (x, im.height)], fill=(0, 180, 255, 160), width=1)
for y in range(0, im.height, 100):
    d.line([(0, y), (im.width, y)], fill=(0, 180, 255, 160), width=1)
overlay.save(out / "grid-overlay.png")
print("saved grid", im.size)

# Also save top-left 80x80 of each card for icon hunting
cards = {
    "tl": (0, 0),
    "tr": (285, 0),
    "bl": (0, 287),
    "br": (285, 287),
}
for name, (ox, oy) in cards.items():
    im.crop((ox, oy, ox + 90, oy + 90)).save(out / f"hunt-{name}.png")
    print("hunt", name)
