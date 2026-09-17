from pathlib import Path

root = Path(r"d:/Projects/Arrowhead Portfolio Website")
out = root / "public" / "entrance"
out.mkdir(parents=True, exist_ok=True)

FIT_SCRIPT = r"""
<script>
(function () {
  var root = document.getElementById('__ROOT__');
  var canvas = root && root.querySelector('canvas');
  if (!root || !canvas) return;

  function viewport() {
    var vv = window.visualViewport;
    return {
      w: Math.max(1, Math.round((vv && vv.width) || window.innerWidth || document.documentElement.clientWidth)),
      h: Math.max(1, Math.round((vv && vv.height) || window.innerHeight || document.documentElement.clientHeight)),
    };
  }

  function fit() {
    var size = viewport();
    var w = size.w + 'px';
    var h = size.h + 'px';
    document.documentElement.style.width = w;
    document.documentElement.style.height = h;
    document.body.style.width = w;
    document.body.style.height = h;
    root.style.width = w;
    root.style.height = h;
    canvas.style.width = w;
    canvas.style.height = h;
  }

  fit();
  window.addEventListener('resize', fit, { passive: true });
  window.addEventListener('orientationchange', function () { setTimeout(fit, 50); });
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', fit, { passive: true });
    window.visualViewport.addEventListener('scroll', fit, { passive: true });
  }
  if (window.ResizeObserver) {
    new ResizeObserver(fit).observe(document.documentElement);
  }
})();
</script>
"""


def extract(
    src_name: str,
    root_id: str,
    out_name: str,
    object_position: str,
) -> None:
    raw = (root / src_name).read_text(encoding="utf-8", errors="replace")
    start = raw.find(f'<div id="{root_id}">')
    if start < 0:
        raise SystemExit(f"root not found: {root_id}")
    body = raw[start:].strip()
    if not body.endswith("</div>"):
        body = body + "\n</div>"

    script = FIT_SCRIPT.replace("__ROOT__", root_id)

    inject = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5"/>
<title>Arrowhead Opening</title>
<style>
html,body{{
  margin:0;padding:0;width:100%;height:100%;
  min-height:100%;
  background:#fafbfc;overflow:hidden;
  touch-action:pan-y!important;
  -webkit-text-size-adjust:100%;
  text-size-adjust:100%;
}}
#{root_id}{{
  position:fixed!important;
  inset:0!important;
  width:100%!important;
  height:100%!important;
  min-width:100%!important;
  min-height:100%!important;
  max-width:none!important;
  margin:0!important;padding:0!important;
  display:block!important;overflow:hidden!important;
  box-sizing:border-box!important;
  touch-action:pan-y!important;
  background:#fafbfc!important;
}}
#{root_id} canvas{{
  position:absolute!important;
  inset:0!important;
  display:block!important;
  width:100%!important;
  height:100%!important;
  max-width:none!important;
  max-height:none!important;
  object-fit:cover!important;
  object-position:{object_position}!important;
  touch-action:pan-y!important;
}}
@media (pointer:coarse){{
  #{root_id},#{root_id} canvas{{pointer-events:none!important}}
}}
#{root_id} .controls{{display:none!important}}
</style>
</head>
<body>
{body}
{script}
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
    "center center",
)
extract(
    "Arrowhead_Mobile.html",
    "arrowhead-mobile",
    "mobile.html",
    "center center",
)
print("done")
