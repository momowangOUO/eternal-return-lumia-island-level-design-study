from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DAK_PATH = ROOT / "assets" / "data" / "dak-route-guides-20260613.json"


def image_refs(markdown: str) -> list[str]:
    return re.findall(r"!\[[^\]]*\]\((assets/[^)]+)\)", markdown)


def verify_markdown_images(name: str) -> tuple[int, list[str]]:
    text = (ROOT / name).read_text(encoding="utf-8")
    refs = image_refs(text)
    missing = [ref for ref in refs if not (ROOT / ref).exists()]
    return len(refs), missing


def main() -> None:
    dak = json.loads(DAK_PATH.read_text(encoding="utf-8"))
    checks = []
    for name in ["README.md", "README.en.md"]:
        count, missing = verify_markdown_images(name)
        checks.append((name, count, len(missing), missing[:5]))

    print(f"DAK generatedAt={dak.get('generatedAt')}")
    print(f"DAK captureDateForReport={dak.get('captureDateForReport')}")
    print(f"DAK routeCount={len(dak.get('routes', []))}")
    print(f"DAK coverageCharacters={len(dak.get('coverage', []))}")
    for name, count, missing_count, sample in checks:
        print(f"{name} imageRefs={count} missing={missing_count}")
        if sample:
            print("  missing sample:", sample)

    ok = (
        dak.get("captureDateForReport") == "2026-06-13"
        and len(dak.get("routes", [])) == 48
        and len(dak.get("coverage", [])) == 16
        and all(missing_count == 0 for _, _, missing_count, _ in checks)
    )
    print("STATUS=PASS" if ok else "STATUS=RECHECK")
    raise SystemExit(0 if ok else 1)


if __name__ == "__main__":
    main()

