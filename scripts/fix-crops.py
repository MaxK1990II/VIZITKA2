from pathlib import Path

from PIL import Image

src = Path(
    r"C:\Users\Максим\.cursor\projects\c-VIZITKA\assets"
    r"\c__Users________AppData_Roaming_Cursor_User_workspaceStorage"
    r"_d969c1a31fb52d5f64b1d222fc2b3cf8_images_image-a533d41f-2bb6-4988-a44b-8fed309c4137.png"
)
out = Path(r"c:\VIZITKA\kanochkinmm-portfolio\public\icons\domain")
full = Image.open(src).convert("RGBA")
print("full", full.size)

# Save ADD card full for measuring lattice crop
add = full.crop((6, 287, 282, 563))
add.save(out / "_debug-add-card.png")
print("add card", add.size)

# Save EXP card header for shield
exp = full.crop((287, 287, 563, 563))
exp.save(out / "_debug-exp-card.png")
print("exp card", exp.size)

# Also save bottom-right quadrant of ADD for lattice hunting
add.br = add.crop((120, 120, 276, 276))
add.br.save(out / "_debug-add-br.png")
print("add br", add.br.size)
