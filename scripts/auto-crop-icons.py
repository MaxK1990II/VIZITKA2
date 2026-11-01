from pathlib import Path

from PIL import Image

out = Path(r"c:\VIZITKA\kanochkinmm-portfolio\public\icons\domain")


def content_bbox(img: Image.Image, thresh: int = 45):
    px = img.load()
    w, h = img.size
    xs, ys = [], []
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if lum > thresh:
                xs.append(x)
                ys.append(y)
    if not xs:
        return None
    return min(xs), min(ys), max(xs) + 1, max(ys) + 1


def to_mask(img: Image.Image, thresh: int = 40) -> Image.Image:
    px = img.load()
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = px[x, y]
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if lum < thresh:
                px[x, y] = (0, 0, 0, 0)
            else:
                alpha = min(255, int((lum - 12) * 1.7))
                px[x, y] = (255, 255, 255, alpha)
    return img


# Recreate hunts from full reference with better card origins
src = Path(
    r"C:\Users\Максим\.cursor\projects\c-VIZITKA\assets"
    r"\c__Users________AppData_Roaming_Cursor_User_workspaceStorage"
    r"_d969c1a31fb52d5f64b1d222fc2b3cf8_images_image-a533d41f-2bb6-4988-a44b-8fed309c4137.png"
)
full = Image.open(src).convert("RGBA")

# From visual: cards are nearly half of 569x574 with ~8px gap
# Measure by finding bright copper pixels near corners
card_origins = {
    "ai": (8, 8),
    "robot": (292, 8),
    "cube": (8, 292),
    "shield": (292, 292),
}

for name, (ox, oy) in card_origins.items():
    # Take a generous top-left region of the card
    region = full.crop((ox, oy, ox + 70, oy + 70))
    region.save(out / f"region-{name}.png")
    # Ignore outer 12px (border radius / padding), search icon in inner area
    inner = region.crop((12, 12, 58, 58))
    bbox = content_bbox(inner, thresh=50)
    print(name, "inner bbox", bbox)
    if not bbox:
        continue
    # Expand a bit and map back to region coords
    x0, y0, x1, y1 = bbox
    pad = 2
    x0 = max(0, x0 - pad) + 12
    y0 = max(0, y0 - pad) + 12
    x1 = min(70, x1 + pad) + 12
    y1 = min(70, y1 + pad) + 12
    # Force square
    side = max(x1 - x0, y1 - y0)
    icon = region.crop((x0, y0, x0 + side, y0 + side))
    icon = to_mask(icon)
    icon = icon.resize((64, 64), Image.Resampling.LANCZOS)
    icon.save(out / f"{name if name != 'ai' else 'ai'}.png".replace("ai.png", "ai.png"))
    # normalize names
    mapping = {"ai": "ai.png", "robot": "robot.png", "cube": "cube.png", "shield": "shield.png"}
    icon.save(out / mapping[name])
    print("saved", mapping[name], side)

# Lattice again
def to_transparent_bg(img: Image.Image, thresh: int = 14) -> Image.Image:
    px = img.load()
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = px[x, y]
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if lum < thresh:
                px[x, y] = (0, 0, 0, 0)
    return img


lattice = to_transparent_bg(full.crop((158, 405, 278, 558)))
lattice.save(out / "lattice.png")
print("lattice ok")
