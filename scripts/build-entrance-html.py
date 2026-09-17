from pathlib import Path
import re

root = Path(r"d:/Projects/Arrowhead Portfolio Website")
out = root / "public" / "entrance"
out.mkdir(parents=True, exist_ok=True)


def extract(src_name: str, root_id: str, out_name: str, canvas_fit_css: str) -> None:
    raw = (root / src_name).read_text(encoding="utf-8", errors="replace")
    start = raw.find(f'<div id="{root_id}">')
    if start < 0:
        raise SystemExit(f"root not found: {root_id}")
    # take from root div to the matching close before EOF (file ends with </div>)
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
  width:100%!important;max-width:none!important;height:100%!important;margin:0!important;
  display:flex!important;flex-direction:column!important;justify-content:center!important;
  align-items:center!important;overflow:hidden!important;box-sizing:border-box!important;
  padding-top:max(12px, env(safe-area-inset-top, 0px))!important;
  padding-bottom:max(8px, env(safe-area-inset-bottom, 0px))!important;
}}
#{root_id} canvas{{{canvas_fit_css}}}
#{root_id} .controls{{display:none!important}}
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


extract(
    "Arrowhead_Interactive.html",
    "arrowhead-motion",
    "desktop.html",
    "display:block;width:100%;height:100%;max-width:100%;max-height:100%;object-fit:contain;object-position:center center",
)
extract(
    "Arrowhead_Mobile.html",
    "arrowhead-mobile",
    "mobile.html",
    "display:block;width:100%;height:100%;max-width:100%;max-height:100%;object-fit:contain;object-position:center top",
)
print("done")
