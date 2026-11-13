#!/usr/bin/env python3
"""Generate an image with the OpenAI Images API (GPT Image 2.6, quality: low).

Usage:
  python3 scripts/gen_image.py OUT_PATH "prompt" [--size 1024x1024|1536x1024|1024x1536]
                               [--model gpt-image-2.6-sunburst|gpt-image-2.6-flare]
                               [--transparent]

Reads the key from the OPENAI_API_KEY environment variable. Never commit keys.
Writes WebP/JPEG/PNG based on OUT_PATH extension (prefer .webp), resized to --max-width.
"""
import argparse, base64, json, os, sys, time, urllib.request, urllib.error

p = argparse.ArgumentParser()
p.add_argument("out")
p.add_argument("prompt")
p.add_argument("--size", default="1024x1024")
p.add_argument("--model", default="gpt-image-2.6-sunburst")
p.add_argument("--transparent", action="store_true")
p.add_argument("--max-width", type=int, default=1200, help="downscale so width <= this (default 1200)")
p.add_argument("--webp-quality", type=int, default=78)
a = p.parse_args()

ext = os.path.splitext(a.out)[1].lower().lstrip(".")
fmt = {"jpg": "jpeg", "jpeg": "jpeg", "webp": "webp"}.get(ext, "png")
body = {"model": a.model, "prompt": a.prompt, "size": a.size, "quality": "low", "n": 1,
        "output_format": fmt}
if a.transparent:
    body["background"] = "transparent"
    if fmt == "jpeg":
        body["output_format"] = "png"

req = urllib.request.Request(
    "https://api.openai.com/v1/images/generations",
    data=json.dumps(body).encode(),
    headers={"Authorization": f"Bearer {os.environ['OPENAI_API_KEY']}", "Content-Type": "application/json"},
)
for attempt in range(4):
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            d = json.load(r)
        break
    except urllib.error.HTTPError as e:
        msg = e.read().decode()[:500]
        if e.code in (429, 500, 502, 503, 504) and attempt < 3:
            time.sleep(5 * (attempt + 1)); continue
        sys.exit(f"HTTP {e.code}: {msg}")
    except Exception as e:
        if attempt < 3:
            time.sleep(5 * (attempt + 1)); continue
        sys.exit(str(e))
os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
raw = base64.b64decode(d["data"][0]["b64_json"])
try:  # shrink for the web: resize + recompress (keeps alpha for transparent images)
    import io
    from PIL import Image
    im = Image.open(io.BytesIO(raw))
    if im.width > a.max_width:
        im = im.resize((a.max_width, round(im.height * a.max_width / im.width)), Image.LANCZOS)
    buf = io.BytesIO()
    if fmt == "webp":
        im.save(buf, "WEBP", quality=a.webp_quality, method=6)
    elif fmt == "jpeg":
        im.convert("RGB").save(buf, "JPEG", quality=82, optimize=True, progressive=True)
    else:
        im.save(buf, "PNG", optimize=True)
    raw = buf.getvalue()
except ImportError:
    pass
with open(a.out, "wb") as f:
    f.write(raw)
print(f"{a.out} ({len(raw)//1024} KB)")
