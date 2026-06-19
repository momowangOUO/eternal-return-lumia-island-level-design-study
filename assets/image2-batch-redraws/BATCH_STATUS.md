# image2 批量重绘状态

更新日期：2026-06-12

## 当前状态

- 已扫描报告：`reports/eternal-return-map-reverse-engineering.md`
- 已识别需要 image2 重绘或优化的分析示意图：31 张
- 已整理逐图中文 image2 重绘说明：`batch-redraw-targets.json`
- 已完成并插入正文：26 张
- 保留真实角色资产：5 张
- 待继续生成：0 张

## 已完成

| ID | 输出文件 | 用途 |
|---|---|---|
| level_diagram_01_pressure_layers | `level_diagram_01_pressure_layers.png` | 全岛压力层与风险收束 |
| level_diagram_02_player_route | `level_diagram_02_player_route.png` | 真实角色搜刮路线与跨区域流转 |
| level_diagram_03_entry_vision | `level_diagram_03_entry_vision.png` | 医院、码头、学校、森林、研究中心外围入口与视野检查 |
| level_diagram_04_midgame_pressure | `level_diagram_04_midgame_pressure.png` | 前中后期冲突压力变化 |
| level_diagram_05_macro_loop_flow | `level_diagram_05_macro_loop_flow.png` | 宏观玩法闭环流程，替换 Mermaid |
| level_diagram_06_research_fight_flow | `level_diagram_06_research_fight_flow.png` | 研究中心六段式战斗流程，替换 Mermaid |

## 已完成：20 地区图组

| 范围 | 输出文件 | 用途 |
|---|---|---|
| level_diagram_07_area_dock 至 level_diagram_26_area_research-center | `level_diagram_07-26_area_*.png` | 20 个地区的区域结构、玩家动线、入口、回撤、奖励、遭遇与节奏风险 |

其中 `level_diagram_26_area_research-center.png` 采用用户已认可的 image2 保形研究中心图，避免重新生成导致中心红区变形。

## 保留真实角色资产

| ID | 原因 |
|---|---|
| level_diagram_27_role_terrain_matrix | 使用真实本地角色头像资产，不用 AI 伪造角色头像 |
| level_diagram_28_role_decision_row 至 level_diagram_31_role_decision_row | 使用真实角色头像裁切图组，不用 AI 伪造角色头像 |

## 不替换为 AI 图的证据资产

以下图片保留为真实资料证据，不纳入 image2 批量替换：

- 官方地图原图
- 官方 Kiosk 位置图
- 官方 Boss / 目标提示图
- 官方 Mutant Herd 实景截图
- 真实角色头像资产

## 真实性边界

所有重绘图必须保留 Lumia Island 的真实地区关系，不伪造草丛坐标、脚步声半径、掩体尺寸、死亡热力图或未公开建筑细节。生成图只承担报告解释用途，不替代官方截图或实机证据。
