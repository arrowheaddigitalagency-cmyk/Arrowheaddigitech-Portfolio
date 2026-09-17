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
html,body{{
  margin:0;padding:0;width:100%;height:100%;
  background:#fafbfc;overflow:hidden;
  touch-action:pan-y!important;
  -webkit-overflow-scrolling:touch;
}}
#{root_id}{{
  position:relative!important;
  width:100%!important;max-width:none!important;
  height:100%!important;min-height:100%!important;
  margin:0!important;padding:0!important;
  display:block!important;overflow:hidden!important;
  box-sizing:border-box!important;
  touch-action:pan-y!important;
}}
#{root_id} canvas{{
  position:absolute!important;inset:0!important;
  display:block!important;
  width:100%!important;height:100%!important;
  max-width:none!important;max-height:none!important;
  margin:auto!important;
  object-fit:contain!important;
  object-position:{object_position}!important;
  transform:scale({scale})!important;
  transform-origin:center center!important;
  touch-action:pan-y!important;
}}
@media (pointer:coarse){{
  #{root_id},#{root_id} canvas{{pointer-events:none!important}}
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


# Smaller brand frame on laptop/tablet (contain + scale-down).
extract(
    "Arrowhead_Interactive.html",
    "arrowhead-motion",
    "desktop.html",
    "center center",
    "0.78",
)

# Phone portrait: full stack visible, slightly smaller, scroll-friendly.
extract(
    "Arrowhead_Mobile.html",
    "arrowhead-mobile",
    "mobile.html",
    "center center",
    "0.88",
)
print("done")
