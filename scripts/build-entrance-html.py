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
    var ratio = size.w / size.h;
    var dpr = Math.min(window.devicePixelRatio || 1, 3);

    document.documentElement.style.width = w;
    document.documentElement.style.height = h;
    document.body.style.width = w;
    document.body.style.height = h;
    root.style.width = w;
    root.style.height = h;
    canvas.style.width = w;
    canvas.style.height = h;

    // Tier classes for QHD / 4K / ultrawide framing
    root.classList.toggle('is-qhd', size.w >= 2560 || size.h >= 1440);
    root.classList.toggle('is-4k', size.w >= 3500 || size.h >= 2000 || (size.w >= 3000 && dpr >= 1.5));
    root.classList.toggle('is-ultrawide', ratio >= 2.05);
    root.classList.toggle('is-tall', ratio <= 1.4);

    document.documentElement.style.setProperty('--entrance-dpr', String(dpr));
    document.documentElement.style.setProperty('--entrance-vw', w);
    document.documentElement.style.setProperty('--entrance-vh', h);
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
    large_css: str,
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
  transform:none;
  transform-origin:center center!important;
  touch-action:pan-y!important;
}}
/* QHD / 2K */
#{root_id}.is-qhd canvas{{
  transform:scale(1.06)!important;
}}
/* 4K and retina large displays — fill bleed, keep brand weight */
#{root_id}.is-4k canvas{{
  transform:scale(1.12)!important;
  object-position:center 46%!important;
}}
#{root_id}.is-ultrawide canvas{{
  transform:scale(1.18)!important;
  object-position:center center!important;
}}
#{root_id}.is-4k.is-ultrawide canvas{{
  transform:scale(1.22)!important;
}}
#{root_id}.is-tall canvas{{
  object-position:center 42%!important;
  transform:scale(1.04)!important;
}}
@media (min-width:2560px){{
  #{root_id} canvas{{transform:scale(1.06)!important}}
}}
@media (min-width:3200px){{
  #{root_id} canvas{{
    transform:scale(1.1)!important;
    object-position:center 46%!important;
  }}
}}
@media (min-width:3840px){{
  #{root_id} canvas{{
    transform:scale(1.14)!important;
    object-position:center 45%!important;
  }}
}}
@media (min-width:5120px){{
  #{root_id} canvas{{
    transform:scale(1.2)!important;
  }}
}}
{large_css}
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
    "",
)
extract(
    "Arrowhead_Mobile.html",
    "arrowhead-mobile",
    "mobile.html",
    "center center",
    """
@media (min-width:768px) and (min-height:1000px){
  #arrowhead-mobile canvas{
    object-position:center center!important;
    transform:scale(1.05)!important;
  }
}
""",
)
print("done")
