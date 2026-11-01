from pathlib import Path

from PIL import Image

src = Path(
    r"C:\Users\Максим\.cursor\projects\c-VIZITKA\assets"
    r"\c__Users________AppData_Roaming_Cursor_User_workspaceStorage"
    r"_d969c1a31fb52d5f64b1d222fc2b3cf8_images_image-a533d41f-2bb6-4988-a44b-8fed309c4137.png"
)
out = Path(r"c:\VIZITKA\kanochkinmm-portfolio\public\icons\domain")
im = Image.open(src).convert("RGBA")


def to_mask(img: Image.Image) -> Image.Image:
    px = img.load()
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = px[x, y]
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if lum < 35:
                px[x, y] = (0, 0, 0, 0)
            else:
                alpha = min(255, int((lum - 20) * 1.6))
                px[x, y] = (255, 255, 255, alpha)
    return img


def to_transparent_bg(img: Image.Image, thresh: int = 18) -> Image.Image:
    px = img.load()
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = px[x, y]
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if lum < thresh:
                px[x, y] = (0, 0, 0, 0)
    return img


# Precise icon crops from hunt images (card-local coords + card origin)
# TL card origin ~ (8,8), icon ~ (24,22)-(52,50)
# TR card origin ~ (292,8)
# BL card origin ~ (8,292)
# BR card origin ~ (292,292)

icons = {
    "ai.png": (24, 22, 52, 50),
    "robot.png": (308, 22, 336, 50),
    "cube.png": (24, 306, 52, 334),
    "shield.png": (308, 306, 336, 334),
}

for name, box in icons.items():
    c = to_mask(im.crop(box))
    # upscale 2x with nearest then slight smooth via LANCZOS for sharper mask
    c = c.resize((56, 56), Image.Resampling.NEAREST)
    c.save(out / name)
    print("icon", name, box)

# Lattice: bottom-right of ADD card, keep grayscale with transparent bg
lattice = to_transparent_bg(im.crop((155, 400, 278, 558)), thresh=12)
lattice.save(out / "lattice.png")
print("lattice", lattice.size)

# Sparklines for visual QA
im.crop((195, 215, 278, 275)).save(out / "spark-ai.png")
im.crop((475, 215, 558, 275)).save(out / "spark-rob.png")
print("done")
