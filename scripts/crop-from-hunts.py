from pathlib import Path

from PIL import Image

out = Path(r"c:\VIZITKA\kanochkinmm-portfolio\public\icons\domain")


def to_mask(img: Image.Image, thresh: int = 40) -> Image.Image:
    px = img.load()
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = px[x, y]
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if lum < thresh:
                px[x, y] = (0, 0, 0, 0)
            else:
                alpha = min(255, int((lum - 15) * 1.55))
                px[x, y] = (255, 255, 255, alpha)
    return img


def to_transparent_bg(img: Image.Image, thresh: int = 14) -> Image.Image:
    px = img.load()
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = px[x, y]
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if lum < thresh:
                px[x, y] = (0, 0, 0, 0)
    return img


# Hunt crops already contain the icon in the top-left area of each 90x90 tile
hunts = {
    "ai.png": "hunt-tl.png",
    "robot.png": "hunt-tr.png",
    "cube.png": "hunt-bl.png",
    "shield.png": "hunt-br.png",
}

# Icon bbox inside each hunt image (measured from visual inspection)
icon_box = (20, 20, 50, 50)

for name, hunt in hunts.items():
    src = Image.open(out / hunt).convert("RGBA")
    c = to_mask(src.crop(icon_box))
    c = c.resize((60, 60), Image.Resampling.LANCZOS)
    c.save(out / name)
    print("saved", name, c.size)

# Lattice from full reference
src_full = Path(
    r"C:\Users\Максим\.cursor\projects\c-VIZITKA\assets"
    r"\c__Users________AppData_Roaming_Cursor_User_workspaceStorage"
    r"_d969c1a31fb52d5f64b1d222fc2b3cf8_images_image-a533d41f-2bb6-4988-a44b-8fed309c4137.png"
)
full = Image.open(src_full).convert("RGBA")
lattice = to_transparent_bg(full.crop((158, 405, 278, 558)))
lattice.save(out / "lattice.png")
print("lattice", lattice.size)
