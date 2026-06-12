from __future__ import annotations

import html
import json
import re
import time
from datetime import date
from pathlib import Path
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
OUT_PATH = ASSETS / "data" / "dak-route-guides-20260613.json"

CHARACTERS = [
    "Jackie",
    "Aya",
    "Fiora",
    "Yuki",
    "Magnus",
    "Eleven",
    "Estelle",
    "Luke",
    "Haze",
    "Rio",
    "Nadine",
    "Hyejin",
    "Isol",
    "Shoichi",
    "Johann",
    "Xiukai",
]

ROLE_LABELS = {
    "Jackie": "Jackie / 杰琪",
    "Aya": "Aya / 阿雅",
    "Fiora": "Fiora / 菲奥拉",
    "Yuki": "Yuki / 雪",
    "Magnus": "Magnus / 马格努斯",
    "Eleven": "Eleven / 十一",
    "Estelle": "Estelle / 埃丝特尔",
    "Luke": "Luke / 卢克",
    "Haze": "Haze / 海兹",
    "Rio": "Rio / 莉央",
    "Nadine": "Nadine / 娜汀",
    "Hyejin": "Hyejin / 慧珍",
    "Isol": "Isol / 伊索尔",
    "Shoichi": "Shoichi / 彰一",
    "Johann": "Johann / 约翰",
    "Xiukai": "Xiukai / 修凯",
}


def fetch_bytes(url: str) -> bytes:
    req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    last_error: Exception | None = None
    for attempt in range(4):
        try:
            with urlopen(req, timeout=45) as response:
                return response.read()
        except Exception as exc:  # network flakes are common on DAK pages
            last_error = exc
            if attempt == 3:
                break
            time.sleep(1.2 * (attempt + 1))
    raise last_error if last_error else RuntimeError(f"failed to fetch {url}")


def fetch_json_url(url: str):
    return json.loads(fetch_bytes(url).decode("utf-8"))


def fetch_text(url: str) -> str:
    return fetch_bytes(url).decode("utf-8")


def extract_next_data(page: str):
    match = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', page, re.S)
    if not match:
        raise ValueError("Could not find __NEXT_DATA__ block")
    return json.loads(html.unescape(match.group(1)))


def parse_int_list(text: str) -> list[int]:
    try:
        value = json.loads(text)
    except json.JSONDecodeError:
        return []
    if not isinstance(value, list):
        return []
    return [int(v) for v in value if isinstance(v, int)]


def version_key(version: str) -> tuple[int, ...]:
    nums = [int(part) for part in re.findall(r"\d+", version or "")]
    return tuple(nums or [0])


def weapon_label(key: str) -> str:
    replacements = {
        "TwoHandSword": "Two-handed Sword",
        "OneHandSword": "One-handed Sword",
        "DualSword": "Dual Swords",
        "AssaultRifle": "Assault Rifle",
        "CrossBow": "CrossBow",
    }
    if key in replacements:
        return replacements[key]
    return re.sub(r"(?<!^)([A-Z])", r" \1", key).replace("  ", " ")


def get_route_query(page_data):
    queries = page_data["props"]["pageProps"]["dehydratedState"]["queries"]
    for query in queries:
        key = query.get("queryKey", [])
        if key and key[0] == "getCharacterStatistics":
            return query["state"]["data"]
    raise ValueError("Could not find getCharacterStatistics query")


def collect_for_character(character: str, area_by_id: dict[int, str]):
    source_page = f"https://dak.gg/er/characters/{character}/routes"
    page = fetch_text(source_page)
    next_data = extract_next_data(page)
    page_props = next_data["props"]["pageProps"]
    character_info = page_props["character"]
    weapon_by_id = {
        int(w["id"]): weapon_label(w.get("key", str(w["id"])))
        for w in character_info.get("weaponTypes", [])
    }
    route_query = get_route_query(next_data)
    routes = route_query.get("weaponRoutes", [])

    candidates = []
    seen_ids = set()
    for route in routes:
        if route.get("id") in seen_ids:
            continue
        seen_ids.add(route.get("id"))
        path_codes = parse_int_list(route.get("paths", "[]"))
        if not path_codes:
            continue
        path_names = [area_by_id.get(code) for code in path_codes]
        if any(name is None for name in path_names):
            continue
        if any(name in {"???", "Briefing Room", "Credits Lab", "Mutant Lab", "Abandoned Lab", "Blue Lab"} for name in path_names):
            continue
        candidates.append(
            {
                "planId": route.get("id"),
                "title": (route.get("title") or "").strip(),
                "author": route.get("userNickname"),
                "character": character,
                "characterLabel": ROLE_LABELS.get(character, character),
                "weaponType": int(route.get("weaponType")) if route.get("weaponType") is not None else None,
                "weapon": weapon_by_id.get(int(route.get("weaponType")), str(route.get("weaponType"))),
                "version": route.get("version"),
                "languageCode": route.get("languageCode"),
                "teamMode": route.get("teamMode"),
                "routeVersion": route.get("routeVersion"),
                "like": route.get("v2Like") or route.get("v2AccumulateLike") or 0,
                "winRate": route.get("v2WinRate") or route.get("v2AccumulateWinRate") or 0,
                "pathCodes": path_codes,
                "path": path_names,
                "sourcePage": source_page,
                "sourceUrl": f"{source_page}?route={route.get('id')}",
            }
        )

    candidates.sort(
        key=lambda item: (
            version_key(item.get("version") or ""),
            int(item.get("like") or 0),
            float(item.get("winRate") or 0),
        ),
        reverse=True,
    )

    selected = []
    unique_path_weapon = set()
    for route in candidates:
        signature = (route["weapon"], tuple(route["path"]))
        if signature in unique_path_weapon and len(candidates) >= 3:
            continue
        unique_path_weapon.add(signature)
        selected.append(route)
        if len(selected) == 3:
            break
    if len(selected) < 3:
        for route in candidates:
            if route not in selected:
                selected.append(route)
            if len(selected) == 3:
                break
    return selected, len(candidates)


def main() -> None:
    today = date.today().isoformat()
    area_data = fetch_json_url("https://er.dakgg.io/api/v1/data/areas?hl=en")
    area_by_id = {int(area["id"]): area["name"] for area in area_data["areas"]}

    results = []
    coverage = []
    for index, character in enumerate(CHARACTERS, 1):
        routes, available = collect_for_character(character, area_by_id)
        results.extend(routes)
        coverage.append(
            {
                "character": character,
                "characterLabel": ROLE_LABELS.get(character, character),
                "selectedRoutes": len(routes),
                "availableDecodedRoutes": available,
            }
        )
        print(f"{index:02d}/{len(CHARACTERS)} {character}: selected {len(routes)} of {available}")
        time.sleep(0.3)

    payload = {
        "generatedAt": today,
        "captureDateForReport": today,
        "source": "DAK.GG Character Analysis / Saved Plans pages plus er.dakgg.io area dictionary",
        "sourcePages": [f"https://dak.gg/er/characters/{character}/routes" for character in CHARACTERS],
        "areaDictionary": "https://er.dakgg.io/api/v1/data/areas?hl=en",
        "selectionPolicy": "For each report character, prefer newer route versions, then higher DAK likes, then higher DAK displayed win rate; select up to three decodable route guide entries with distinct weapon/path signatures when possible.",
        "truthBoundary": "These are public DAK.GG Saved Plan guide entries. They are real network guide data, not official routes, not win-rate rankings, and not proof that a character has only these routes.",
        "coverage": coverage,
        "routes": results,
    }
    OUT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(OUT_PATH.as_posix().encode("unicode_escape").decode("ascii"))


if __name__ == "__main__":
    main()
