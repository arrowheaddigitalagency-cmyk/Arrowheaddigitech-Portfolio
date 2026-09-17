from pathlib import Path

root = Path(r"d:/Projects/Arrowhead Portfolio Website")
out = root / "public" / "entrance"
out.mkdir(parents=True, exist_ok=True)

# Always fit the FULL canvas inside the visible viewport (no crop, no forced zoom).
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
    var vw = size.w;
    var vh = size.h;
    var cw = canvas.width || 1440;
    var ch = canvas.height || 960;
    // Small inset so edges never clip under browser chrome / notches.
    var pad = Math.max(8, Math.round(Math.min(vw, vh) * 0.02));
    var scale = Math.min((vw - pad * 2) / cw, (vh - pad * 2) / ch);
    if (!isFinite(scale) || scale <= 0) scale = 1;
    var dw = Math.round(cw * scale);
    var dh = Math.round(ch * scale);
    var left = Math.round((vw - dw) / 2);
    var top = Math.round((vh - dh) / 2);

    var box = vw + 'px';
    var boxH = vh + 'px';
    document.documentElement.style.width = box;
    document.documentElement.style.height = boxH;
    document.body.style.width = box;
    document.body.style.height = boxH;
    root.style.width = box;
    root.style.height = boxH;

    canvas.style.position = 'absolute';
    canvas.style.left = left + 'px';
    canvas.style.top = top + 'px';
    canvas.style.right = 'auto';
    canvas.style.bottom = 'auto';
    canvas.style.width = dw + 'px';
    canvas.style.height = dh + 'px';
    canvas.style.maxWidth = 'none';
    canvas.style.maxHeight = 'none';
    canvas.style.transform = 'none';
    canvas.style.objectFit = 'fill';
  }

  fit();
  window.addEventListener('resize', fit, { passive: true });
  window.addEventListener('orientationchange', function () { setTimeout(fit, 60); });
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
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
<title>Arrowhead Opening</title>
<style>
html,body{{
  margin:0;padding:0;width:100%;height:100%;
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
  margin:0!important;padding:0!important;
  overflow:hidden!important;
  background:#fafbfc!important;
  touch-action:pan-y!important;
}}
#{root_id} canvas{{
  display:block!important;
  position:absolute!important;
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


extract("Arrowhead_Interactive.html", "arrowhead-motion", "desktop.html")
extract("Arrowhead_Mobile.html", "arrowhead-mobile", "mobile.html")
print("done")
