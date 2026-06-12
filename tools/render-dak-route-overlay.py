from __future__ import annotations

import json
import math
from collections import Counter, defaultdict
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
DATA_PATH = ASSETS / "data" / "dak-route-guides-20260613.json"
BASE_MAP = ASSETS / "kiosk-locations.png"
OUT_PATH = ASSETS / "image2-batch-redraws" / "level_diagram_02_player_route.png"
DIST_PATH = ASSETS / "summary-figures" / "dak-route-start-end-distribution.png"
HEAT_PATH = ASSETS / "summary-figures" / "dak-route-area-heatmap.png"
SUMMARY_PATH = ASSETS / "data" / "dak-route-edge-summary.json"


AREA_POS = {
    "Gas Station": (310, 82),
    "Alley": (478, 74),
    "Temple": (696, 145),
    "Archery Range": (196, 210),
    "Police Station": (500, 206),
    "Stream": (692, 246),
    "School": (305, 338),
    "Fire Station": (424, 296),
    "Pond": (528, 374),
    "Hospital": (707, 416),
    "Hotel": (120, 447),
    "Beach": (150, 526),
    "Research Center": (403, 415),
    "Forest": (418, 548),
    "Cemetery": (566, 540),
    "Factory": (724, 638),
    "Uptown": (226, 642),
    "Chapel": (420, 665),
    "Warehouse": (304, 728),
    "Dock": (498, 726),
    "Barge": (592, 746),
}

AREA_CN = {
    "Gas Station": "加油站",
    "Alley": "小巷",
    "Temple": "寺庙",
    "Archery Range": "靶场",
    "Police Station": "警察局",
    "Stream": "溪流",
    "School": "学校",
    "Fire Station": "消防局",
    "Pond": "池塘",
    "Hospital": "医院",
    "Hotel": "旅馆",
    "Beach": "海滩",
    "Research Center": "研究中心",
    "Forest": "森林",
    "Cemetery": "墓园",
    "Factory": "工厂",
    "Uptown": "高级住宅区",
    "Chapel": "教堂",
    "Warehouse": "仓库",
    "Dock": "码头",
    "Barge": "驳船区",
}

PALETTE = [
    (85, 205, 252),
    (255, 143, 71),
    (142, 218, 105),
    (255, 216, 77),
    (191, 142, 255),
    (255, 116, 161),
    (79, 226, 186),
    (110, 155, 255),
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


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = [
        "C:/Windows/Fonts/msyhbd.ttc" if bold else "C:/Windows/Fonts/msyh.ttc",
        "C:/Windows/Fonts/simhei.ttf",
        "C:/Windows/Fonts/arial.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def draw_round_rect(draw: ImageDraw.ImageDraw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def draw_arrow(draw: ImageDraw.ImageDraw, a, b, color, width=5, offset=0, head=True):
    ax, ay = a
    bx, by = b
    dx, dy = bx - ax, by - ay
    length = math.hypot(dx, dy) or 1
    nx, ny = -dy / length, dx / length
    start = (ax + nx * offset, ay + ny * offset)
    end = (bx + nx * offset, by + ny * offset)
    draw.line([start, end], fill=color, width=width)
    if head:
        angle = math.atan2(end[1] - start[1], end[0] - start[0])
        head_len = 18
        spread = 0.55
        p1 = (
            end[0] - head_len * math.cos(angle - spread),
            end[1] - head_len * math.sin(angle - spread),
        )
        p2 = (
            end[0] - head_len * math.cos(angle + spread),
            end[1] - head_len * math.sin(angle + spread),
        )
        draw.polygon([end, p1, p2], fill=color)


def route_edges(path):
    return list(zip(path, path[1:]))


def wrap_text(draw: ImageDraw.ImageDraw, text: str, font_obj, width: int) -> list[str]:
    lines: list[str] = []
    current = ""
    for char in str(text):
        test = current + char
        if draw.textlength(test, font=font_obj) <= width or not current:
            current = test
        else:
            lines.append(current)
            current = char
    if current:
        lines.append(current)
    return lines


def short_path(path: list[str]) -> str:
    return " -> ".join(path)


def short_weapon(name: str) -> str:
    replacements = {
        "Two-handed Sword": "2H Sword",
        "One-handed Sword": "1H Sword",
        "Assault Rifle": "AR",
        "Dual Swords": "Dual",
        "CrossBow": "Crossbow",
    }
    return replacements.get(name, name)


def count_route_usage(samples):
    start_counter = Counter()
    end_counter = Counter()
    mid_counter = Counter()
    area_counter = Counter()
    for sample in samples:
        path = sample["path"]
        if not path:
            continue
        start_counter[path[0]] += 1
        if len(path) > 1:
            end_counter[path[-1]] += 1
            mid_counter.update(path[1:-1])
        area_counter.update(path)
    edge_counter = Counter()
    for sample in samples:
        edge_counter.update(route_edges(sample["path"]))
    return start_counter, end_counter, mid_counter, area_counter, edge_counter


def render_distribution(samples, capture_date: str) -> None:
    start_counter, end_counter, mid_counter, area_counter, _ = count_route_usage(samples)
    areas = sorted(
        area_counter,
        key=lambda area: (-area_counter[area], AREA_CN.get(area, area)),
    )

    width = 1500
    row_h = 34
    height = 190 + len(areas) * row_h + 90
    image = Image.new("RGBA", (width, height), (248, 250, 252, 255))
    draw = ImageDraw.Draw(image)
    title_font = font(34, True)
    head_font = font(18, True)
    body_font = font(16)
    tiny_font = font(13)

    draw.text((48, 34), "DAK Saved Plan 样本地区分布", fill=(15, 23, 42), font=title_font)
    draw.text(
        (50, 82),
        f"统计对象：{capture_date} 解析的 {len(samples)} 条 DAK.GG 11.4 Saved Plan 路线；按起点、终点与中继地区分别计数。",
        fill=(71, 85, 105),
        font=body_font,
    )

    legend = [("起点", (85, 205, 252)), ("终点", (255, 143, 71)), ("中继", (142, 218, 105))]
    lx = 52
    for label, color in legend:
        draw.rounded_rectangle([lx, 122, lx + 26, 146], radius=5, fill=color)
        draw.text((lx + 34, 123), label, fill=(51, 65, 85), font=body_font)
        lx += 92

    left, top = 280, 170
    max_count = max(area_counter.values()) or 1
    bar_w = 780

    draw.text((52, top - 34), "地区", fill=(15, 23, 42), font=head_font)
    draw.text((left, top - 34), "出现次数（起点 / 终点 / 中继）", fill=(15, 23, 42), font=head_font)
    draw.text((left + bar_w + 52, top - 34), "合计", fill=(15, 23, 42), font=head_font)

    for i, area in enumerate(areas):
        y = top + i * row_h
        if i % 2:
            draw.rectangle([40, y - 4, width - 48, y + row_h - 5], fill=(238, 242, 247))
        cn = AREA_CN.get(area, area)
        draw.text((52, y), f"{cn} / {area}", fill=(30, 41, 59), font=tiny_font)
        x = left
        for label, color, count in [
            ("S", (85, 205, 252), start_counter[area]),
            ("E", (255, 143, 71), end_counter[area]),
            ("M", (142, 218, 105), mid_counter[area]),
        ]:
            if count:
                w = max(36, int(bar_w * count / max_count))
                draw.rounded_rectangle([x, y + 1, x + w, y + 23], radius=5, fill=color)
                draw.text((x + 8, y + 4), f"{label}:{count}", fill=(15, 23, 42), font=tiny_font)
                x += w + 4
        draw.text((left + bar_w + 58, y + 2), str(area_counter[area]), fill=(15, 23, 42), font=head_font)

    foot = (
        "边界：这不是出场率、胜率或官方路线排行；它只把公开 DAK Saved Plan 路线序列转成可复核样本统计。"
    )
    draw.rounded_rectangle([48, height - 78, width - 48, height - 28], radius=10, fill=(226, 232, 240))
    draw.text((68, height - 62), foot, fill=(51, 65, 85), font=tiny_font)

    DIST_PATH.parent.mkdir(parents=True, exist_ok=True)
    image.convert("RGB").save(DIST_PATH, quality=95)


def render_heatmap(samples, capture_date: str) -> None:
    _, _, _, area_counter, edge_counter = count_route_usage(samples)
    base = Image.open(BASE_MAP).convert("RGBA")
    map_size = 920
    base.thumbnail((map_size, map_size), Image.LANCZOS)

    width, height = 1600, 1000
    canvas = Image.new("RGBA", (width, height), (245, 247, 250, 255))
    draw = ImageDraw.Draw(canvas)
    title_font = font(34, True)
    body_font = font(17)
    small_font = font(14)
    tiny_font = font(12)

    draw.text((42, 28), "DAK Saved Plan 样本热度标注", fill=(15, 23, 42), font=title_font)
    draw.text(
        (44, 76),
        f"统计 {capture_date} 解析的 {len(samples)} 条真实网络攻略路线；圆越大表示该地区在路线序列中出现越多。",
        fill=(71, 85, 105),
        font=body_font,
    )

    map_x, map_y = 44, 112
    canvas.alpha_composite(base, (map_x, map_y))
    scale_x = base.width / 773
    scale_y = base.height / 771

    def pos(area):
        x, y = AREA_POS[area]
        return (map_x + x * scale_x, map_y + y * scale_y)

    max_count = max(area_counter.values()) or 1
    for area, count in sorted(area_counter.items(), key=lambda item: item[1]):
        x, y = pos(area)
        radius = 13 + int(34 * count / max_count)
        draw.ellipse([x - radius, y - radius, x + radius, y + radius], fill=(255, 75, 75, 92), outline=(185, 28, 28, 210), width=3)
        label = str(count)
        tw = draw.textlength(label, font=font(18, True))
        draw.rounded_rectangle([x - tw / 2 - 8, y - 14, x + tw / 2 + 8, y + 14], radius=7, fill=(255, 255, 255, 220))
        draw.text((x - tw / 2, y - 11), label, fill=(127, 29, 29), font=font(18, True))

    panel_x = 1040
    draw.rounded_rectangle([panel_x, 112, 1548, 928], radius=14, fill=(255, 255, 255, 255), outline=(203, 213, 225), width=2)
    draw.text((panel_x + 26, 138), "热度最高地区", fill=(15, 23, 42), font=font(25, True))
    y = 186
    for rank, (area, count) in enumerate(area_counter.most_common(14), 1):
        cn = AREA_CN.get(area, area)
        if rank % 2:
            draw.rectangle([panel_x + 18, y - 6, 1530, y + 35], fill=(248, 250, 252))
        draw.text((panel_x + 28, y), f"{rank:02d}", fill=(71, 85, 105), font=small_font)
        draw.text((panel_x + 74, y), f"{cn} / {area}", fill=(15, 23, 42), font=small_font)
        draw.text((panel_x + 406, y), f"{count}", fill=(185, 28, 28), font=font(16, True))
        y += 44

    draw.text((panel_x + 26, 824), "最高频路线边", fill=(15, 23, 42), font=font(20, True))
    y = 854
    for (a, b), count in edge_counter.most_common(4):
        line = f"{AREA_CN.get(a, a)} -> {AREA_CN.get(b, b)}  x{count}"
        draw.text((panel_x + 28, y), line, fill=(71, 85, 105), font=tiny_font)
        y += 20

    draw.rounded_rectangle([44, 934, 1002, 982], radius=10, fill=(226, 232, 240, 255))
    draw.text(
        (66, 950),
        "读图边界：热度来自 DAK Saved Plan 地区序列，不是官方死亡热力图、胜率排行或实机精确行走轨迹。",
        fill=(51, 65, 85),
        font=tiny_font,
    )

    HEAT_PATH.parent.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(HEAT_PATH, quality=95)


def main() -> None:
    data = json.loads(DATA_PATH.read_text(encoding="utf-8-sig"))
    samples = data["routes"]
    capture_date = data.get("captureDateForReport") or data.get("generatedAt") or "2026-06-12"
    by_character = defaultdict(list)
    for sample in samples:
        by_character[sample["character"]].append(sample)

    base = Image.open(BASE_MAP).convert("RGBA")
    map_size = 960
    base.thumbnail((map_size, map_size), Image.LANCZOS)

    canvas = Image.new("RGBA", (1920, 1280), (13, 22, 32, 255))
    draw = ImageDraw.Draw(canvas)

    # Background bands.
    draw.rectangle([0, 0, 1125, 1280], fill=(16, 32, 46, 255))
    draw.rectangle([1125, 0, 1920, 1280], fill=(245, 247, 250, 255))
    draw.line([1125, 0, 1125, 1280], fill=(202, 213, 225, 255), width=2)

    title_font = font(36, True)
    sub_font = font(20)
    body_font = font(17)
    small_font = font(14)
    tiny_font = font(12)

    draw.text((40, 34), "图 F-04：DAK Saved Plan 路线样本叠加", fill=(245, 250, 255), font=title_font)
    draw.text(
        (42, 84),
        f"基于 {capture_date} 解析的 {len(samples)} 条 DAK.GG 11.4 Saved Plan；每个报告角色选 3 条可解码真实网络攻略路线。",
        fill=(188, 209, 225),
        font=sub_font,
    )

    map_x, map_y = 56, 128
    canvas.alpha_composite(base, (map_x, map_y))
    overlay = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)

    scale_x = base.width / 773
    scale_y = base.height / 771

    def pos(area):
        x, y = AREA_POS[area]
        return (map_x + x * scale_x, map_y + y * scale_y)

    start_counter, end_counter, mid_counter, area_counter, edge_counter = count_route_usage(samples)

    # Draw all sample transitions as low-opacity evidence lines.
    for sample_idx, sample in enumerate(samples, 1):
        color = PALETTE[(sample_idx - 1) % len(PALETTE)] + (145,)
        for edge_idx, (a, b) in enumerate(route_edges(sample["path"])):
            offset = ((sample_idx + edge_idx) % 7 - 3) * 3
            draw_arrow(odraw, pos(a), pos(b), color, width=2, offset=offset, head=True)

    # Emphasize repeated route edges after the raw evidence layer.
    for (a, b), count in sorted(edge_counter.items(), key=lambda item: item[1]):
        if count < 2:
            continue
        color = (255, 199, 77, min(90 + count * 28, 225))
        draw_arrow(odraw, pos(a), pos(b), color, width=min(4 + count * 2, 14), offset=0, head=True)

    canvas = Image.alpha_composite(canvas, overlay)
    draw = ImageDraw.Draw(canvas)

    # Area heat markers keep the 48-route overlay readable.
    max_count = max(area_counter.values()) or 1
    for area, count in sorted(area_counter.items(), key=lambda item: item[1]):
        x, y = pos(area)
        radius = 9 + int(25 * count / max_count)
        draw.ellipse([x - radius, y - radius, x + radius, y + radius], fill=(255, 255, 255, 185), outline=(255, 90, 90), width=3)
        label = str(count)
        tw = draw.textlength(label, font=small_font)
        draw.text((x - tw / 2, y - 8), label, fill=(127, 29, 29), font=small_font)

    # Legend.
    draw_round_rect(draw, [56, 1132, 1080, 1234], 12, (8, 20, 32, 232), (93, 126, 150, 255), 1)
    draw.text((78, 1148), "读图边界", fill=(255, 255, 255), font=font(19, True))
    notes = [
        "1. 透明线为 48 条 Saved Plan 地区序列；粗黄线表示重复出现的路线边。",
        "2. 地区圆点数字为该地区在路线序列中的出现次数；不代表死亡热力、胜率或官方推荐。",
        "3. 箭头只连接地区顺序，不表示精确室内路径、草丛坐标或行走轨迹。",
    ]
    for i, note in enumerate(notes):
        draw.text((78, 1178 + i * 16), note, fill=(210, 225, 238), font=tiny_font)

    # Right table.
    draw.text((1158, 34), "16 角色 x 3 条真实攻略路线", fill=(15, 23, 42), font=font(29, True))
    draw.text((1160, 76), "Source: DAK.GG Saved Plans, decoded with DAK area dictionary", fill=(71, 85, 105), font=body_font)
    y = 114
    row_h = 70
    table_font = font(11)
    for i, character in enumerate(ROLE_LABELS, 1):
        routes = by_character.get(character, [])
        if i % 2:
            draw.rectangle([1144, y - 8, 1890, y + row_h - 8], fill=(235, 240, 246))
        color = PALETTE[(i - 1) % len(PALETTE)]
        draw.rounded_rectangle([1156, y + 4, 1182, y + 30], radius=6, fill=color)
        draw.text((1164, y + 6), f"{i}", fill=(15, 23, 42), font=small_font)
        draw.text((1192, y), ROLE_LABELS.get(character, character), fill=(15, 23, 42), font=small_font)
        for ridx, route in enumerate(routes[:3], 1):
            line = f"R{ridx} P{route['planId']} {short_weapon(route['weapon'])}: {short_path(route['path'])}"
            draw.text((1192, y + 20 + (ridx - 1) * 15), line, fill=(71, 85, 105), font=table_font)
        y += row_h

    # Edge summary.
    draw.text((1158, 1240), "高频路线边", fill=(15, 23, 42), font=font(18, True))
    edge_lines = [f"{a} -> {b}: {count}" for (a, b), count in edge_counter.most_common(3)]
    for i, line in enumerate(edge_lines):
        draw.text((1310, 1242 + i * 13), line, fill=(71, 85, 105), font=tiny_font)

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(OUT_PATH, quality=95)
    render_distribution(samples, capture_date)
    render_heatmap(samples, capture_date)

    summary = {
        "generatedAt": capture_date,
        "source": str(DATA_PATH.relative_to(ROOT)).replace("\\", "/"),
        "output": str(OUT_PATH.relative_to(ROOT)).replace("\\", "/"),
        "distributionOutput": str(DIST_PATH.relative_to(ROOT)).replace("\\", "/"),
        "heatmapOutput": str(HEAT_PATH.relative_to(ROOT)).replace("\\", "/"),
        "sampleCount": len(samples),
        "coverage": data.get("coverage", []),
        "areas": [
            {
                "area": area,
                "areaCn": AREA_CN.get(area, area),
                "count": count,
                "startCount": start_counter[area],
                "endCount": end_counter[area],
                "midCount": mid_counter[area],
            }
            for area, count in area_counter.most_common()
        ],
        "edges": [
            {"from": a, "to": b, "count": count}
            for (a, b), count in edge_counter.most_common()
        ],
        "notes": [
            "Arrows connect area sequence from DAK.GG Saved Plan samples; they do not encode exact in-game movement geometry, death heat, or win rate.",
            "The base map is the local official Kiosk-location evidence image.",
            "Base material density is intentionally not drawn as a separate layer because the publicly available route evidence does not make density differences clear enough for this report.",
        ],
    }
    SUMMARY_PATH.write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(OUT_PATH.as_posix().encode("unicode_escape").decode("ascii"))
    print(DIST_PATH.as_posix().encode("unicode_escape").decode("ascii"))
    print(SUMMARY_PATH.as_posix().encode("unicode_escape").decode("ascii"))


if __name__ == "__main__":
    main()
