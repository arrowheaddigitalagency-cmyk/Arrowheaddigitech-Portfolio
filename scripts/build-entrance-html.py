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

    # Full-bleed cover for laptop/tablet Interactive framing (matches brand hero).
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


# Laptop + tablet: light scale so map reaches edges like the brand hero frame.
extract(
    "Arrowhead_Interactive.html",
    "arrowhead-motion",
    "desktop.html",
    "center 42%",
    "1.05",
    extra_css="""
@media (max-width:1180px){
  #arrowhead-motion canvas{
    object-position:center 38%!important;
    transform:scale(1.08)!important;
  }
}
@media (max-width:900px){
  #arrowhead-motion canvas{
    object-position:center 34%!important;
    transform:scale(1.12)!important;
  }
}
""",
)
extract(
    "Arrowhead_Mobile.html",
    "arrowhead-mobile",
    "mobile.html",
    "center top",
    "1.04",
)
print("done")
