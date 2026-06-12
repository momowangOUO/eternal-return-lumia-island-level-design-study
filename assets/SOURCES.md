# Eternal Return / Lumia Island 证据与素材索引

更新日期：2026-06-13

## 证据原则

本报告的关卡设计结论优先来自官方资料、当前可访问的资料站页面、本地化截图资产和可复核的数据文件。正文不插入外链，所有外部来源集中列在报告第 10-11 章和本索引中。

角色路线只作为“真实网络攻略样本”使用，不写成官方推荐路线、强度排行或唯一最优路线。2026-06-13 已能从 DAK.GG 角色页 SSR payload 与 `https://er.dakgg.io/api/v1/data/areas?hl=en` 地区字典解析 16 名样本角色的 Saved Plan 数据，每名角色 3 条路线，共 48 条 Plan ID、武器、版本和地区序列。逐条浏览器截图可作为未来审计增强，但当前报告的路线图已经以本地 JSON 数据作为可追溯证据。

## 公开资料索引

| ID | 来源 | 类型 | 抓取 / 复核日期 | URL | 用途 |
|---|---|---|---|---|---|
| official-1-0-gameplay | Eternal Return 1.0 Gameplay | 官方资料 | 2026-06-11 / 2026-06-12 | https://playeternalreturn.com/posts/news/1281 | Item Spawn、Game Flow、Tree of Life、Meteorite、Alpha、Omega、Battle Zone、Rootkit / Escape、Hyperloop、Wickeline 等历史与基础机制。 |
| official-1-0-map | Eternal Return 1.0 Patch Notes | 官方资料 | 2026-06-11 | https://playeternalreturn.com/posts/news/1286 | Lumia Island 地图结构、1.0 地区关系和历史版本背景。 |
| official-kiosk | Help Center: Credits and Kiosks | 官方帮助资料 | 2026-06-11 | https://support.playeternalreturn.com/hc/en-us/articles/20584542119321-What-are-Credits-and-Kiosks | Credits / Kiosk 机制说明与旧位置图；当前 Kiosk 区域再用 S-06 复核。 |
| official-11-4 | 11.4 Patch Notes | 官方公告 | 2026-06-11 | https://playeternalreturn.com/posts/news/3629 | Police Station 遗失物箱、Chapel 地形调整等当前版本局部改动。 |
| official-wiki-map-rules | Lumia Island / Research Center | Wiki / 资料站 | 2026-06-12 | https://eternalreturn.fandom.com/wiki/Lumia_Island；https://eternalreturn.fandom.com/wiki/Research_Center | 限制区计时、普通区域重开、Kiosk 当前区域、交通机制、天气与生态物、Research Center 与 Wickeline 行为。 |
| wiki-battle-zone-historical | Battle Zone | Wiki / 历史机制资料 | 2026-06-12 | https://eternalreturn.fandom.com/wiki/Battle_Zone | Battle Zone 作为历史机制边界，不作为当前稳定地图机制。 |
| dak-characters | DAK.GG Character Analysis / Saved Plans 入口 | 社区统计 / 攻略站 | 2026-06-11 / 2026-06-12 | https://dak.gg/er/characters | 真实角色、武器分支与 Saved Plans 入口。 |
| dak-route-payload-20260613 | DAK.GG Saved Plans SSR payload 与地区字典 | 社区统计 / 结构化数据 | 2026-06-13 | 16 个角色路线页；https://er.dakgg.io/api/v1/data/areas?hl=en | 48 条真实网络攻略路线样本，支撑 F-04 / F-04a / F-04b 和样本热度图。 |

## 本地图片与数据资产

| 资产组 | 本地路径 | 来源 / 生成方式 | 说明 |
|---|---|---|---|
| 官方 Mutant Herd 场景图 | `assets/mutant-herd-*.png` | official-1-0-gameplay | Beach、Temple、Factory、Archery Range 的官方 PvE 目标截图，用于解释中期吸力与停留风险。 |
| 官方地图与 Kiosk 图 | `assets/lumia-island-map-reconstruction.png`；`assets/kiosk-locations.png` | official-1-0-map；official-kiosk | 地图结构和 Kiosk 机制底图；当前 Kiosk 区域以资料站复核。 |
| DAK 路线数据 | `assets/data/dak-route-guides-20260613.json`；`assets/data/dak-route-edge-summary.json` | DAK.GG SSR payload + 地区字典解析 | 每个样本角色 3 条路线，共 48 条；包含 Plan ID、武器、版本、路径代码和地名。 |
| 真实路线与样本图 | `assets/design-diagrams/core-route-lines-real-data.png`；`assets/summary-figures/dak-route-start-end-distribution.png`；`assets/summary-figures/dak-route-area-heatmap.png` | 本地数据可视化 | 只编码路线样本出现频次，不编码胜率排行、官方路线或精确击杀热力。 |
| image2 重绘图 | `assets/image2-batch-redraws/level_diagram_*.png` | OpenAI image2 / 本地化输出 | 基于报告证据、旧裁切图和研究中心保形图生成的解释性示意，不作为草丛坐标、脚步声半径或掩体尺寸证据。 |
| 研究中心专项图 | `assets/image2-research-center-preserve-map-annotated.png`；`assets/research-center-image2-local-label-polish.png` | 官方地图 / 保形重绘 / 本地标注 | 用于说明 Research Center、School、Forest、Pond、Fire Station 外环压力和 Wickeline 外移路径侧。 |
| 20 地区重绘 | `assets/area-redraws/area-*-reference-redraw.png` | Kiosk / 地图资料 + 本地重绘 | 用于逐区说明入口、邻接、目标吸力和 Kiosk 兑现关系。 |
| 角色头像与矩阵 | `assets/character-*.png`；`assets/summary-figures/character-role-overview.png`；`assets/summary-figures/character-terrain-matrix-centered.png` | DAK.GG 角色页与本地矩阵生成 | 支撑角色样本选择、角色定位和地形适配讨论。 |

## 证据边界

- 未公开的死亡 / 交战统计热力图不进入事实结论；报告中的热度图只表示 DAK Saved Plan 路线样本出现频次。
- 普通野怪精确坐标、草丛坐标、箱体高度、单向视线窗和脚步声传播半径没有公开可靠数据；正文只按地图邻接、战争迷雾、Kiosk 停顿和目标机制分析。
- Research Center 内部房间、墙体和 Night 4 后 Wickeline 外移路径侧的实机截图可继续作为视觉增强，但不替代当前的公开规则证据。
- Battle Zone 在 1.0 Gameplay 和 Wiki 历史机制资料中出现；本报告不把它写成当前稳定地图机制。
