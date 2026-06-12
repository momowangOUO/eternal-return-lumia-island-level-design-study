# Eternal Return / 永恒轮回 本地资产与来源索引

更新日期：2026-06-12

## 资料基准

本项目的公开资料基准为：2026-06-11 至 2026-06-12 可访问的官方 1.0 Gameplay、官方 1.0 Patch Notes、官方 Help Center Kiosk 说明、官方 11.4 Patch Notes、Eternal Return Wiki（Fandom 资料站）的 Lumia Island / Research Center / Battle Zone 页面、DAK.GG 角色入口，以及已经本地化的官方图片和角色头像资产。

报告写作原则：关卡设计结论优先来自官方资料；角色路线和社区资料只作为实战解释入口。2026-06-13 已能从 DAK.GG 角色页 SSR payload 和 `https://er.dakgg.io/api/v1/data/areas?hl=en` 解码 16 名样本角色的 Plan ID、武器、版本和地区序列；当前正式统计为每名角色 3 条路线，共 48 条 Saved Plan 样本。这些样本可作为“可追溯路线样本”，但不宣称为官方路线、强度排行或唯一最优路线。仍缺逐条浏览器截图证据。

## 官方与可信来源

| ID | 来源 | 等级 | 抓取/复核日期 | URL | 用途 |
|---|---|---|---|---|---|
| official-1-0-gameplay | 官方 1.0 Gameplay | 官方资料 | 2026-06-11，2026-06-12 复核 | https://playeternalreturn.com/posts/news/1281 | Item Spawn、Game Flow、Tree of Life、Meteorite、Alpha、Omega、Battle Zone 历史资料、Rootkit / Escape、变异野兽群、Wickeline、视野机制 |
| official-1-0-map | 官方 1.0 Patch Notes | 官方资料 | 2026-06-11 | https://playeternalreturn.com/posts/news/1286 | Lumia Island 地图扩大、拆区、新路径、建筑开放 |
| official-kiosk | 官方 Help Center：Credits and Kiosks | 官方资料 | 2026-06-11 | https://support.playeternalreturn.com/hc/en-us/articles/20584542119321-What-are-Credits-and-Kiosks | Kiosk 机制与旧位置图底图；当前 Kiosk 区域清单以 official-wiki-map-rules 复核 |
| official-11-4 | 官方 11.4 Patch Notes | 官方资料 | 2026-06-11 | https://playeternalreturn.com/posts/news/3629 | 警察局遗失物箱、教堂地形调整等当前版本补充 |
| official-wiki-map-rules | Eternal Return Wiki：Lumia Island / Research Center | Wiki / 资料站 | 2026-06-12 | https://eternalreturn.fandom.com/wiki/Lumia_Island；https://eternalreturn.fandom.com/wiki/Research_Center | 限制区计时器、通常可进入区域重新开放、当前 Kiosk 8 区域与 260s 启用、Acceleration Influx / Hyperloop / VLS / Launch Pads 交通机制、天气/视野/草丛数量变化、Glowing Flower / Lantern Bloom / Sandy Mushroom 等生态信息物件、Research Center Night 4 后限制区、不再重新开放、Wickeline 从研究中心出来、Night 6 临时安全区与 Day 7 最终安全区规则 |
| wiki-battle-zone-historical | Eternal Return Wiki：Battle Zone | Wiki / 历史机制资料 | 2026-06-12 | https://eternalreturn.fandom.com/wiki/Battle_Zone | 当前页面以历史口吻描述 Battle Zone；报告不再把它作为当前稳定地图机制，只作为旧机制资料和待复核边界 |
| dak-characters | DAK.GG Character Analysis / Saved Plans 入口 | 可信社区/统计站入口 | 2026-06-11，2026-06-12 复核 | https://dak.gg/er/characters | 真实实验体、武器分支、Saved Plans 入口；具体路径证据见 dak-route-payload-20260613 |
| dak-route-payload-20260613 | DAK.GG Saved Plans SSR payload 与区域字典 | 可信社区/统计站结构化数据 | 2026-06-12 | https://dak.gg/er/characters/Jackie/routes 等 16 个角色路线页；https://er.dakgg.io/api/v1/data/areas?hl=en | 已解析 Jackie、Aya、Fiora、Yuki、Magnus、Eleven、Estelle、Luke、Haze、Rio、Nadine、Hyejin、Isol、Shoichi、Johann、Xiukai 各 3 条 Saved Plan，共 48 条；本地结构化数据见 `assets/data/dak-route-guides-20260613.json` |
| dak-routes-sample | DAK.GG 抽样角色路线页 | 可信社区/统计站入口 | 2026-06-12 复核 | Jackie / Magnus / Aya / Rio / Luke / Xiukai / Estelle routes 页 | 页面可确认角色、武器、Plan ID、版本、样本量、Pick/Win/TOP3/Avg Rank，并显示 Start Place / End Place / Movement 栏位；但地区图标名称不能稳定文本读取，部分路线只暴露为“0 Movement”，因此路线顺序只作为待截图复核的行为样例 |

## 官方实景图

这些图是官方页面中的真实局内/机制图，已经下载到本地。报告中若能用这些图说明问题，优先使用真实图，不使用生成图替代。

| 地区/主题 | 本地文件 | 来源 | 用途 |
|---|---|---|---|
| Beach / 海滩 Mutant Herd | `assets/mutant-herd-beach.png` | official-1-0-gameplay | 说明外圈地区如何在中期变成 PvE 停留风险点 |
| Temple / 寺庙 Mutant Herd | `assets/mutant-herd-temple.png` | official-1-0-gameplay | 说明寺庙由搜刮路径转为中期停留/被劝架点 |
| Factory / 工厂 Mutant Herd | `assets/mutant-herd-factory.png` | official-1-0-gameplay | 说明边角经济区如何被定时 PvE 事件重新点亮 |
| Archery Range / 靶场 Mutant Herd | `assets/mutant-herd-archery-range.png` | official-1-0-gameplay | 说明远程角色外圈成长区的中期摩擦 |
| 官方地图重构图 | `assets/lumia-island-map-reconstruction.png` | official-1-0-map | 宏观拓扑、地图扩大和新路径分析 |
| Kiosk 位置图 | `assets/kiosk-locations.png` | official-kiosk | Kiosk 经济兑现、复活补件和 20 地区重绘参考底图；当前具体 Kiosk 区域以 official-wiki-map-rules 复核 |

## image2 与本地重绘图

这些图不是游戏截图。它们必须以真实地图或官方截图为参考，只做信息增强：路径箭头、风险层级、交互点、阅读层次和中文标注。禁止把它们当作官方小地图、死亡热力图或实机截图。

| 图组 | 本地路径 | 参考图 | 真实性边界 |
|---|---|---|---|
| 26 张报告示意图 | `assets/image2-batch-redraws/level_diagram_*.png` | 官方 Kiosk 图、官方地图重构图、地区裁切图、报告上下文 | image2 信息图；不新增未验证建筑、道路、草丛、脚步声半径或死亡热力 |
| F-04 DAK 路线样本叠加图 | `assets/image2-batch-redraws/level_diagram_02_player_route.png` | 官方 Kiosk 图 + `assets/data/dak-route-guides-20260613.json` 中的 48 条 DAK.GG Saved Plan 样本 | 箭头只表达地区序列，不表达精确室内路径、草丛坐标、脚步声半径、路线强度排行或唯一最优路线；边统计另见 `assets/data/dak-route-edge-summary.json`，分布与热度图见 `assets/summary-figures/dak-route-start-end-distribution.png`、`assets/summary-figures/dak-route-area-heatmap.png` |
| 研究中心保形图 | `assets/image2-research-center-preserve-map-annotated.png` | 官方 Kiosk 图、用户认可截图、official-wiki-map-rules | 只用于解释 School / Fire Station / Pond / Forest 接近研究中心外环与 Wickeline 外移路径侧；不得视为普通进入路径或新地图事实 |
| 研究中心局部标注图 | `assets/research-center-image2-local-label-polish.png` | 用户认可的保形母版 + official-wiki-map-rules | 只重绘标注层，保持 Research Center 红区、岛屿轮廓和地点关系；箭头表示接近/压制方向，不表示普通进入路线 |
| 地区裁切/清版图 | `assets/area-redraws/area-*-reference-redraw.png` | 官方 Kiosk 图 | 用于 20 地区章节；不含未验证精确坐标 |

## 角色头像与角色分析图

| 图组 | 本地路径 | 来源/依据 | 真实性边界 |
|---|---|---|---|
| 真实角色头像 | `assets/character-*.png` | DAK.GG 角色入口与本地化资产 | 头像真实；职责标签是报告分析标签，不是官方职业分类 |
| 角色总览 | `assets/summary-figures/character-role-overview.png` | 本地头像 + 报告第 8 章角色案例 | 用于说明角色与空间职责，不表示强度排行 |
| 角色与地形适配矩阵 | `assets/summary-figures/character-terrain-matrix-centered.png` | 本地头像 + DAK 已解析路线样本 + 官方地图路网 | 圆点表示地形依赖，不表示角色强度；已按矩阵单元格中心重排 |
| 角色主动/避战决策图 | `assets/summary-figures/role-engage-avoid-decision-board.png` | 本地头像 + 报告路线卡 | 分析性排版图；具体 Saved Plan 仍需逐条截图复核 |

## 已知资料缺口

- 未找到可靠公开死亡热力图；报告不使用生成图冒充热力图。
- 未找到公开逐格草丛坐标、普通野怪精确坐标、脚步声材质半径、掩体尺寸；报告不写成事实。但 Lumia Island 资料站已能确认天气和生态物件会改变草丛数量、视野距离、听觉范围和临时遮蔽，因此正文按“动态信息压力”分析隐蔽区，不按固定草点坐标分析。
- `assets/vision-checks/vision-*-check.png` 为早期入口检查草稿图，信息层级过乱，已从正式报告正文和图示清单移除；后续如需替换，应重新做更干净的图生图或使用实机截图标注。
- 医院、码头、学校、森林、研究中心外围仍缺当前版本高清实机截图或高水平视频截图；报告第 5.21 节只给入口风险核查框架，不写成精确伏击点坐标。
- 报告第 9 章已列出实机截图采集与替换策略。优先级为：研究中心 Wickeline 外移路径侧交战、学校到研究中心西侧外环、医院三向入口/Kiosk 停顿、森林侧翼、码头离区路线、Kiosk 复活、Mutant Herd 争夺。
- Battle Zone 在官方 1.0 Gameplay 中存在，但当前 Eternal Return Wiki（Fandom 资料站）页面以历史口吻描述；报告不写固定战斗区，也不把 Battle Zone 作为当前稳定地图机制。当前地区压力改按普通区域限制/重开、Temporary Safe Zones、Final Safe Zone、Kiosk 关停和个人限制区计时器分析。
- DAK.GG Saved Plans 的结构化路径已补齐到 48 条：2026-06-13 已复核解析 16 名样本角色各 3 条 Plan ID、版本、武器与地区序列，并已基于这些样本重绘 F-04、样本分布图和地图热度标注图。仍需补齐的是逐条 Saved Plan 的浏览器截图证据；在截图补齐前，F-04 只证明结构化页面样本存在，不证明路线强度排行或唯一最优路线。


