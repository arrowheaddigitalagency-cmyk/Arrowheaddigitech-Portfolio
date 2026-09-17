from pathlib import Path

root = Path(r"d:/Projects/Arrowhead Portfolio Website")
out = root / "public" / "entrance"
out.mkdir(parents=True, exist_ok=True)


def extract(
    src_name: str,
    root_id: str,
    out_name: str,
    object_position: str,
    scale: str,
    extra_css: str = "",
) -> None:
    raw = (root / src_name).read_text(encoding="utf-8", errors="replace")
    start = raw.find(f'<div id="{root_id}">')
    if start < 0:
        raise SystemExit(f"root not found: {root_id}")
    body = raw[start:].strip()
    if not body.endswith("</div>"):
        body = body + "\n</div>"

    inject = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
<title>Arrowhead Opening</title>
<style>
html,body{{margin:0;padding:0;width:100%;height:100%;background:#fafbfc;overflow:hidden}}
#{root_id}{{
  position:relative!important;
  width:100%!important;max-width:none!important;
  height:100%!important;min-height:100%!important;
  margin:0!important;padding:0!important;
  display:block!important;overflow:hidden!important;
  box-sizing:border-box!important;
}}
#{root_id} canvas{{
  position:absolute!important;inset:0!important;
  display:block!important;
  width:100%!important;height:100%!important;
  max-width:none!important;max-height:none!important;
  object-fit:cover!important;
  object-position:{object_position}!important;
  transform:scale({scale})!important;
  transform-origin:center center!important;
}}
#{root_id} .controls{{display:none!important}}
{extra_css}
</style>
</head>
<body>
{body}
</body>
</html>
"""
    target = out / out_name
    target.write_text(inject, encoding="utf-8")
    print(f"wrote {target} ({len(inject)} bytes)")


# Laptop / tablet landscape: exact Interactive brand frame (no extra zoom media queries).
extract(
    "Arrowhead_Interactive.html",
    "arrowhead-motion",
    "desktop.html",
    "center center",
    "1.02",
)

# Phones: full portrait stack (PORTFOLIO → services → TOUCH TO EXPLORE).
extract(
    "Arrowhead_Mobile.html",
    "arrowhead-mobile",
    "mobile.html",
    "center center",
    "1.0",
    extra_css="""
@media (max-aspect-ratio: 9/18){
  #arrowhead-mobile canvas{
    object-position:center 46%!important;
    transform:scale(1.04)!important;
  }
}
@media (min-aspect-ratio: 9/16) and (max-width:767px){
  #arrowhead-mobile canvas{
    object-position:center center!important;
    transform:scale(1.02)!important;
  }
}
""",
)
print("done")
