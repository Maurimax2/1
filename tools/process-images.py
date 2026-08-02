#!/usr/bin/env python3
"""
Optimises the client's original photographs into responsive WebP sets
(+ a JPEG fallback) and writes a manifest consumed by the site generator.

Usage:  python3 tools/process-images.py <source-dir>
"""
import json
import os
import sys
from io import BytesIO
from base64 import b64encode

from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "assets", "img")
MANIFEST = os.path.join(ROOT, "src", "data", "images.json")

WIDTHS = [480, 960, 1440, 2000]
FALLBACK_WIDTH = 1280

# Original file  ->  semantic slug. Curated by hand after reviewing every photo.
CATALOG = {
    "image04F0C49B-DDBB-4BAA-AA3B-1285E9488552": "dune-joy",
    "image06C1A16A-5783-479D-9F95-0BD1646C60E0": "terjit-oasis-canyon",
    "image08AA93A5-304A-46CB-9AFA-0531632DA0CD": "ocean-silhouettes",
    "image1C129398-BD92-4867-A753-D340C1F5FEE2": "dune-descent",
    "image34B97207-43C5-4D82-9E7E-9B2D80D77277": "oasis-stone-wall",
    "image39557E98-5BCE-4B6F-84D7-564E7F215592": "camel-caravan-dune",
    "image3E1EBA99-E046-4D42-995F-F3641F7B0E31": "arguin-birds-shore",
    "image479769F2-FCF3-4FEB-83DE-6C83490D19B4": "iron-ore-train-mono",
    "image48EE354D-38B2-46BF-8178-BCA959F54D6F": "palm-grove",
    "image56E304B2-9033-4638-A51A-691C7C2D2DCB": "desert-campfire",
    "image58EBF347-B967-4371-9F0E-71A2CBA0F955": "acacia-lunch",
    "image62F8CEE7-254F-42FB-A127-D78F67AD9B5B": "flag-and-camels",
    "image68DC58C4-6C1B-41A6-AFB1-83958EF4D1C3": "guide-and-traveller-ridge",
    "image7AC82794-2D71-4FCB-8935-44410DA237C1": "train-arms-open",
    "image8D7D117A-0BC0-40D4-BBF9-A8236AEB269B": "lone-vehicle-plain",
    "image8D894FBF-01C0-43E5-8900-65757D15A669": "traveller-rock-slope",
    "image90D80FD5-7C95-42CE-B81E-343DF85FF006": "adrar-road-mesa",
    "image9F1694FE-7005-42B4-85CC-85D6616F6E6D": "nouakchott-fish-market",
    "imageA1162BE7-C2AC-4CEA-9718-7B4EEDFEC01D": "ruins-gathering",
    "imageA65453C4-C3CA-4BC8-86B2-5B66714F4306": "atlantic-sunset-group",
    "imageB32DD6BA-8492-402F-B65D-D46058C4F25C": "beach-convoy",
    "imageB3985FA7-9EF8-4E81-B850-E1642C1AD07B": "ouadane-archway",
    "imageB49F1A74-336D-466C-A0B8-6FD9F27C1542": "train-night-rest",
    "imageBC40A523-E2DA-4F8F-A9E0-601D49CE8E85": "chinguetti-minaret",
    "imageE14765B7-5517-4433-BEC0-A327F1496E17": "dune-sunset-crew",
    "imageE4248332-260E-48EC-8E95-81DC42C19C2D": "arguin-pelicans",
    "imageF33E3A3B-7FD9-41AC-A29E-4DE3D66CF718": "summit-arms-raised",
    "imageF481CAC1-9535-4AD1-BEFA-7608582FFB71": "train-night-portrait",
    "imageF8DEE7A2-B4F3-4588-9B18-262B6196CAE1": "plateau-two-travellers",
    "imageFC7084A2-9D5C-4745-9A37-8DEC6DFB2FD8": "beach-arrival",
    "imageFD7A39DA-6311-48AC-A205-7F3D2C892458": "camels-atlantic",
    "imageFF333E3F-62B4-4D85-9CBA-6C84D5E13CA9": "train-riders",
}


def lqip(im):
    """A ~20px blurred placeholder, inlined as a data URI."""
    tiny = im.copy()
    tiny.thumbnail((20, 20), Image.LANCZOS)
    buf = BytesIO()
    tiny.save(buf, "WEBP", quality=45, method=6)
    return "data:image/webp;base64," + b64encode(buf.getvalue()).decode()


def main(src_dir):
    os.makedirs(OUT_DIR, exist_ok=True)
    os.makedirs(os.path.dirname(MANIFEST), exist_ok=True)
    manifest = {}

    for stem, slug in sorted(CATALOG.items(), key=lambda kv: kv[1]):
        path = os.path.join(src_dir, stem + ".jpg")
        if not os.path.exists(path):
            print("  missing:", stem)
            continue

        im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
        w, h = im.size

        # Never upscale: the largest step is the native width, capped at 2000.
        widths = sorted({x for x in WIDTHS if x < w} | {min(w, WIDTHS[-1])})

        for tw in widths:
            th = round(h * tw / w)
            im.resize((tw, th), Image.LANCZOS).save(
                os.path.join(OUT_DIR, f"{slug}-{tw}.webp"),
                "WEBP", quality=80, method=6,
            )

        fw = min(FALLBACK_WIDTH, w)
        im.resize((fw, round(h * fw / w)), Image.LANCZOS).save(
            os.path.join(OUT_DIR, f"{slug}.jpg"),
            "JPEG", quality=78, optimize=True, progressive=True,
        )

        manifest[slug] = {"w": w, "h": h, "widths": widths, "lqip": lqip(im)}
        print(f"  {slug:28s} {w}x{h} -> {widths}")

    with open(MANIFEST, "w") as fh:
        json.dump(manifest, fh, indent=1, sort_keys=True)

    total = sum(
        os.path.getsize(os.path.join(OUT_DIR, f)) for f in os.listdir(OUT_DIR)
    )
    print(f"\n{len(manifest)} images -> {total / 1024 / 1024:.1f} MB in assets/img")


if __name__ == "__main__":
    main(sys.argv[1])
