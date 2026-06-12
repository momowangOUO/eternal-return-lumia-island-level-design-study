import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('reports');
const assetDir = path.join(outDir, 'assets', 'eternal-return');
fs.mkdirSync(assetDir, { recursive: true });

const today = '2026-06-11';
const evidencePath = path.join(assetDir, 'data', 'map-evidence.json');
const mapEvidence = JSON.parse(fs.readFileSync(evidencePath, 'utf8'));
const sourceById = Object.fromEntries(mapEvidence.sources.map((source) => [source.id, source]));

const official = {
  patch: 'https://playeternalreturn.com/posts/news/1286',
  gameplay: 'https://playeternalreturn.com/posts/news/1281',
  kiosk: 'https://support.playeternalreturn.com/hc/en-us/articles/20584542119321-What-are-Credits-and-Kiosks',
  patch113: 'https://playeternalreturn.com/posts/news/3606',
  patch114: 'https://playeternalreturn.com/posts/news/3629',
  map: 'assets/eternal-return/lumia-island-map-reconstruction.png',
  kioskShop: 'assets/eternal-return/kiosk-shop.jpg',
  kioskLocations: 'assets/eternal-return/kiosk-locations.png',
  mutantBeach: 'assets/eternal-return/mutant-herd-beach.png',
  mutantTemple: 'assets/eternal-return/mutant-herd-temple.png',
  mutantFactory: 'assets/eternal-return/mutant-herd-factory.png',
  mutantArchery: 'assets/eternal-return/mutant-herd-archery-range.png',
  bossNotice: 'assets/eternal-return/boss-minimap-notification.png',
  radarGif: 'assets/eternal-return/satellite-radar-hyperloop.gif',
};

const schematic = 'assets/eternal-return/source-grounded-lumia-island-pressure-schematic.png';
const evidenceDiagram = 'assets/eternal-return/lumia-evidence-overlay.png';

const avatar = (name) => `assets/eternal-return/character-${name.toLowerCase()}.png`;
const dak = (name) => `https://dak.gg/er/characters/${name}`;

const itemFacts = {
  溪流: '锤子12、十字镐15、弓7、针7、防风衣12、袈裟12、羽毛11、十字架11、碳酸饮料7、原石15、捕鼠夹9',
  警察局: '铁锈剑10、锤子12、短棍11、钢珠12、弓9、瓦尔特PPK9、钢链12、发箍12、面包8、激光笔12、套索9',
  工厂: '短柄斧7、鞭子7、瓦尔特PPK7、费德洛夫自动步枪7、自行车头盔13、望远镜13、钉子13、废铁15、打火机12、电池13、油13',
  海滩: '双刀9、锤子13、十字镐17、短柄斧9、短矛9、鞭子9、玻璃瓶17、瓦尔特PPK9、钢链13、全覆盖式泳衣13、原石17',
  墓园: '十字镐15、竹11、棒球7、钢链12、镜头7、布甲12、手表11、羽毛11、望远镜11、冰块7、五马牌12、火药11',
  医院: '剪刀13、双刀9、劳工手套9、剃刀9、针9、镜头9、绷带13、拖鞋13、面包7、冰块8、废铁17、激光笔13、电池13',
  教堂: '剪刀12、铁锈剑9、锤子12、短棍12、鞭子7、玻璃瓶15、剃刀7、粉笔12、弓7、短弩7、圣杯13、十字架12',
  消防局: '钢笔12、玻璃瓶15、扑克牌12、长步枪7、红心7、镜头7、手表12、拖鞋12、裤袜12、望远镜11、钉子12、废铁13、电池13、油12',
  森林: '十字镐15、短矛7、竹12、劳工手套7、钢珠11、短弩7、长步枪7、钢链12、袈裟11、布甲12、羽毛11',
  靶场: '铁锈剑10、竹13、钢珠13、棒球8、弓8、短弩8、鸭舌帽13、袈裟13、布甲13、跑鞋13、钉子13、胶带13、油13',
  池塘: '锤子10、十字镐14、短柄斧6、短矛6、短棍9、竹10、长步枪6、鸭舌帽10、手镯10、野山参6、原石14、套索9',
  寺庙: '菜刀7、铁锈剑10、双刀7、短矛7、竹13、琉璃球7、袈裟13、羽毛12、佛经13、野山参8、五马牌12、布料13、原石15、纸12、火药12',
  加油站: '剪刀12、钢笔11、锤子12、短棍11、鞭子6、粉笔11、短弩6、费德洛夫自动步枪6、绷带12、裤袜11、羽毛11、钉子11、打火机11、油11',
  仓库: '钢笔11、玻璃瓶15、剃刀7、扑克牌11、布甲11、拖鞋11、拉面7、巧克力7、冰块7、胶带11、废铁15、五马牌11、电池11、布料11、火药11',
  学校: '剪刀14、短柄斧9、剃刀9、粉笔12、吉他9、绷带14、打火机13',
  码头: '菜刀7、铁锈剑9、双刀7、短棍11、劳工手套7、玻璃瓶15、长步枪7、全覆盖式泳衣11、绷带12、跑鞋11、废铁15、打火机11、电池12',
  旅馆: '菜刀9、瓦尔特PPK9、费德洛夫自动步枪9、针9、吉他9、手表13、废铁17、电池14',
  小巷: '剪刀10、菜刀7、钢链11、针7、鸭舌帽11、跑鞋11、十字架10、打火机10、五马牌10、胶水11、钢琴线11',
  高级住宅区: '钢笔13、棒球8、费德洛夫自动步枪8、镜头8、发箍13、手表13、跑鞋12、巧克力9、碳酸饮料8、激光笔12、油13、钢琴线13',
};

const characters = [
  {
    name: 'Jackie', cn: '杰琪', weapon: 'Two-handed Sword / 双手剑', role: '突进收割 / 第三方劝架机会位',
    route: ['警察局', '工厂', '医院', '墓园'],
    key: '警察局提供铁锈剑、锤子与短棍，工厂提供废铁、电池、油，医院补绷带、废铁与激光笔，墓园补十字镐、羽毛、钢链。',
    poi: '适合从外圈完成武器后进入 Alpha/Omega 外围等残局，不宜第一时间在中心久留。',
    solo: '单排 Jackie 更像机会主义猎手：绕开第一波正面团，利用战争迷雾（FOW）和目标提示抓残血。',
    team: '多人中 Jackie 需要前排或控制先交信息，她负责后手进场，不应单独站在 Kiosk 或首领点正面。',
    lesson: '地图给她的不是“固定刺客路”，而是侧翼路径和目标公开后的收割窗口。若侧翼太少，Jackie 会退化成正面硬冲；若视野反制太弱，她会过度惩罚新手。',
  },
  {
    name: 'Aya', cn: '阿雅', weapon: 'Assault Rifle / 突击步枪', role: '中远程持续输出 / 视线收益位',
    route: ['工厂', '旅馆', '消防局', '森林'],
    key: '工厂与旅馆都有费德洛夫自动步枪，消防局/森林提供长步枪，工厂/旅馆还提供废铁、电池等远程成装核心材料。',
    poi: '适合站在战场（Battle Zone）外圈和首领区入口附近控线，利用摄像机/监控扩大中距离安全带。',
    solo: '单排 Aya 需要把开阔地当作安全距离，而不是无脑追击；没有视野时不要跨越中心路口。',
    team: '多人中 Aya 是持续 DPS 核心，前排拉住入口后，她才能把 TTK 压低。',
    lesson: '远程角色要求地图给出“可读但不无限”的视线。开放地过长会让她无风险压制，转角过多又会让她被突进无预警秒杀。',
  },
  {
    name: 'Fiora', cn: '菲欧娜', weapon: 'Rapier / 西洋剑', role: '决斗切入 / 窄口惩罚位',
    route: ['教堂', '寺庙', '墓园', '森林'],
    key: '教堂/寺庙提供铁锈剑、短矛、圣杯、十字架等武器与防具线索，墓园/森林补十字镐、钢链、原石。',
    poi: '适合在教堂、寺庙、研究中心外侧窄路做短距离决斗。',
    solo: '单排 Fiora 要利用窄口切断远程风筝，但不能在摄像机/监控过期后盲追。',
    team: '多人中 Fiora 可以负责第二入口压迫，让对手不能只把防线压在正门。',
    lesson: '她证明窄口不是天然坏设计：只要旁边有绕路和视野反制，窄口能成为高技巧决斗空间。',
  },
  {
    name: 'Yuki', cn: '雪', weapon: 'Two-handed Sword / 双手剑', role: '稳定开战 / 阵线修正位',
    route: ['警察局', '教堂', '学校', '旅馆'],
    key: '警察局/教堂提供铁锈剑与锤子，学校提供绷带、打火机，旅馆补手表、费德洛夫自动步枪、废铁、电池。',
    poi: '适合从中线转入 Kiosk 或目标点，负责逼退入口而不是单纯追杀。',
    solo: '单排 Yuki 更依赖路线完整度，装备成型前不要强闯高价值变异野兽群（Mutant Herd）。',
    team: '多人中 Yuki 的价值在于把队伍阵线往前推半个屏幕，给 Aya/Haze/Rio 建立输出走廊。',
    lesson: '稳定近战角色需要地图给出“推进后可撤”的阶梯式空间，只有一条直线入口会让他变成赌博式开团。',
  },
  {
    name: 'Magnus', cn: '马格努斯', weapon: 'Hammer / 锤', role: '前排撞线 / 路口封堵位',
    route: ['池塘', '海滩', '工厂', '寺庙'],
    key: '池塘/海滩提供锤子与十字镐，工厂补废铁、电池、油，寺庙提供袈裟、佛经与原石。',
    poi: '适合在寺庙熊变异野兽群、阿尔法外围或 Kiosk 路口承担第一波身体压力。',
    solo: '单排 Magnus 可以打安全变异野兽群，但不应在无视野时把自己锁进中心。',
    team: '多人中他是入口锚点，负责让后排有 2-3 秒稳定输出窗口。',
    lesson: '前排角色需要可占住的短通道，但通道必须有侧绕，否则会形成无脑堵门。',
  },
  {
    name: 'Eleven', cn: '11号', weapon: 'Hammer / 锤', role: '入口承压 / 团队开团位',
    route: ['海滩', '池塘', '学校', '寺庙'],
    key: '海滩/池塘提供锤子、十字镐，学校提供绷带、打火机，寺庙提供袈裟、佛经、原石。',
    poi: '适合在研究中心外圈、战场圆边和 Kiosk 交互点保护队友。',
    solo: '单排 Eleven 的击杀效率不是重点，重点是用高容错带走资源。',
    team: '三排里 Eleven 是入口承压点，站位决定队友是否能安全使用 Kiosk 或接维克莱恩。',
    lesson: '地图对重前排的考题是“能不能把压力变成队友行动权”。如果 Kiosk 周边没有反绕路，Eleven 会让区域过度固化。',
  },
  {
    name: 'Estelle', cn: '埃斯特尔', weapon: 'Axe / 斧', role: '保护推进 / 消防式救援位',
    route: ['工厂', '消防局', '医院', '学校'],
    key: '工厂有短柄斧与工业材料，消防局有玻璃瓶、长步枪、油电材料，医院/学校提供绷带、废铁、打火机。',
    poi: '适合在队伍撤退线和复活/Kiosk 节点做保护，不适合单人追远。',
    solo: '单排 Estelle 更适合稳路线和少打不必要架。',
    team: '多人中她把“撤退”设计成可执行战术：前排救线、队友换位、Kiosk 交互。',
    lesson: '保护型角色提醒关卡设计不要只奖励冲进目标点的人，也要奖励能把队伍带出来的人。',
  },
  {
    name: 'Luke', cn: '卢克', weapon: 'Bat / 球棒', role: '清点突进 / 经济滚雪球位',
    route: ['高级住宅区', '小巷', '学校', '旅馆'],
    key: '高级住宅区提供棒球、费德洛夫自动步枪、油、钢琴线，小巷提供菜刀、针、打火机，学校/旅馆补绷带、手表、废铁、电池。',
    poi: '适合扫外圈低血目标和抢残余尸体资源。',
    solo: '单排 Luke 强在快速滚经济，但过早进入维克莱恩正面会丢掉节奏优势。',
    team: '多人中他可以承担第二波进场，等 Eleven/Magnus 先吃控制后再追击。',
    lesson: '高机动清点角色需要地图有“收益碎片”，否则他只剩正面团战，特色会被压平。',
  },
  {
    name: 'Haze', cn: '海兹', weapon: 'Assault Rifle / 突击步枪', role: '火力压制 / 入口封锁位',
    route: ['工厂', '旅馆', '加油站', '消防局'],
    key: '工厂/旅馆/加油站提供费德洛夫自动步枪与油电材料，消防局提供长步枪、玻璃瓶与补充工业件。',
    poi: '适合守首领外围入口与战场圆边，逼迫敌人提前交位移。',
    solo: '单排 Haze 要靠路线控制获得先手视野，避免被近战贴脸。',
    team: '三排中 Haze 是区域拒止核心，前排把人留在火力线上才有价值。',
    lesson: '区域压制角色需要地图提供明确“射击走廊”，但走廊两侧必须有草丛、战争迷雾和侧道给刺客反制。',
  },
  {
    name: 'Rio', cn: '里央', weapon: 'Bow / 弓', role: '远程风筝 / 边缘输出位',
    route: ['溪流', '靶场', '森林', '教堂'],
    key: '溪流/靶场/教堂都有弓，森林/教堂补短弩、钢链、原石、圣杯。',
    poi: '适合在靶场、森林和首领外环保持中远距离换血。',
    solo: '单排 Rio 以风筝和避战为主，盲进窄口会把射程优势交给近战。',
    team: '多人中 Rio 需要前排给她稳定的输出线，最好配合监控/摄像机。',
    lesson: '风筝型角色要求地图有“可退两步”的边缘空间，过度窄化会让射程失去教学意义。',
  },
  {
    name: 'Nadine', cn: '娜汀', weapon: 'CrossBow / 弩', role: '野区成长 / 目标前置位',
    route: ['教堂', '靶场', '森林', '池塘'],
    key: '教堂/靶场/森林提供短弩、弓、钢链、原石，池塘补十字镐、长步枪与原石。',
    poi: '适合围绕狼变异野兽群、熊变异野兽群和外圈野怪做成长。',
    solo: '单排 Nadine 可利用外圈变异野兽群与野怪路线延迟进团。',
    team: '多人中她需要队友帮忙占住野区入口，否则打野过程会被第三方读秒。',
    lesson: '成长型角色证明野怪不是附属物；野怪点位就是她的路线骨架。',
  },
  {
    name: 'Hyejin', cn: '慧珍', weapon: 'Bow / 弓', role: '控制风筝 / 目标外环牵制位',
    route: ['溪流', '寺庙', '墓园', '森林'],
    key: '溪流提供弓、十字镐、原石，寺庙/墓园/森林补控制与防具常用材料：佛经、羽毛、钢链、原石。',
    poi: '适合在寺庙、墓园、研究中心外环控制入口。',
    solo: '单排 Hyejin 不应硬吃中心目标，适合用控制和距离换撤退空间。',
    team: '多人中她为前排创造二次进场窗口，也能阻止敌方 Jackie/Shoichi 直切后排。',
    lesson: '控制型远程让路口宽度变得非常敏感：太窄会一招封死，太宽又失去控制价值。',
  },
  {
    name: 'Isol', cn: '伊索尔', weapon: 'Assault Rifle / 突击步枪', role: '陷阱信息 / 区域拒止位',
    route: ['工厂', '旅馆', '加油站', '消防局'],
    key: '工厂/旅馆/加油站提供费德洛夫自动步枪、钉子、油、电池等枪械与陷阱相关材料，消防局补长步枪、玻璃瓶、废铁。',
    poi: '适合在 Kiosk、战场边缘、首领入口做提前布防。',
    solo: '单排 Isol 强在不对称信息，提前设伏比正面拼 TTK 更重要。',
    team: '多人中他负责把队伍撤退线变成敌方高风险区。',
    lesson: '陷阱角色要求地图给出可预判路径；如果入口过多且不可读，陷阱失去教材价值。',
  },
  {
    name: 'Shoichi', cn: '彰一', weapon: 'Dagger / 匕首', role: '爆发切入 / 侧翼处决位',
    route: ['医院', '旅馆', '小巷', '码头'],
    key: '医院/旅馆/小巷/码头提供菜刀、剃刀、针、废铁、绷带等近战与续航材料。',
    poi: '适合在旅馆、小巷、研究中心外侧寻找短距离切入。',
    solo: '单排 Shoichi 最怕无视野正面进场，最擅长从已交技能的战斗侧边进入。',
    team: '多人中他需要队友制造控制或分割，不能先手吃满视野。',
    lesson: '爆发刺客让战争迷雾和摄像机的价值非常直观：30/60/90 秒信息窗会改变他能否进场。',
  },
  {
    name: 'Johann', cn: '约翰', weapon: 'Arcana / 秘法牌', role: '团队保护 / 资源兑现位',
    route: ['教堂', '寺庙', '医院', '学校'],
    key: '教堂/寺庙提供圣杯、十字架、佛经等宗教主题材料，医院/学校提供绷带、废铁、打火机。',
    poi: '适合围绕 Kiosk、复活、撤退线和首领后撤路线服务团队。',
    solo: '单排 Johann 的路线应避开高爆发热区，优先稳定成装和保命。',
    team: '多人中他把队伍从“拿到目标”推进到“带着目标活着离开”。',
    lesson: '支援角色要求地图存在可保护的动作：复活、兑换、撤退、打首领，而不是只有击杀。',
  },
  {
    name: 'Xiukai', cn: '秀凯', weapon: 'Dagger / 匕首', role: '补给运营 / 食物经济位',
    route: ['码头', '旅馆', '小巷', '海滩'],
    key: '码头/旅馆/小巷/海滩提供菜刀、玻璃瓶、绷带、面包、巧克力、碳酸饮料等食物/饮料与近战材料。',
    poi: '适合先建立补给优势，再带队进入熊变异野兽群、阿尔法或 Kiosk 兑现。',
    solo: '单排 Xiukai 通过食物和外圈路线提高容错，不宜过早抢中心。',
    team: '多人中他能把长时间目标争夺变成补给优势，尤其适合 Night 2 后的连续战斗。',
    lesson: '补给型角色证明“食物点位”也是关卡资源，不能只按武器材料评价区域价值。',
  },
];

const terms = [
  ['Test Subject', '实验体', '玩家操控角色，本报告按真实实验体写案例。', '所有职责必须绑定具体角色，不写空泛职业。'],
  ['Point of Interest / POI', '兴趣点/关键区', '资源、目标、路线交汇或战斗高发区域。', '决定玩家为何停留、绕行或交战。'],
  ['Tree of Life', '生命树枝', '官方中文 Gameplay 物资名。高价值动态材料目标。', 'Day 2 后把玩家从搜刮推向目标争夺。'],
  ['Meteorite', '陨石', '高价值动态材料目标。', '与生命树共同形成第一轮资源重力。'],
  ['Alpha / Omega', '阿尔法 / 奥米加', '中后期目标实体。', '提供高价值材料并制造可预期冲突。'],
  ['Dr. Wickeline', '维克莱恩博士 / 维克莱恩', 'Night 4 高压首领。', '终局最大诱饵之一。'],
  ['Battle Zone', '战场', 'Night 2 一次性特殊战斗空间。官方中文使用“战场”，内部有蚕食值规则。', '通过蚕食值、倒计时和奖励强制修正航线。'],
  ['Credits', '荣誉值', 'Kiosk 消费货币，可购买特殊材料、无人机、复活、Rootkit 等。', '把经济收益转化成空间停留风险。'],
  ['Kiosk', 'Kiosk', '官方中文页面保留英文写法。荣誉值消费点。', '让“缺件/复活/逃离”变成可被伏击的空间动作。'],
  ['Remote Drone', '无人机', '使用荣誉值远程订购材料。', '降低缺件挫败，但让经济路线仍受到荣誉值约束。'],
  ['Hyperloop', '传送门', '官方中文 Gameplay 用语。用于区域间快速移动。', '连接远距离 POI，也能被卫星雷达等动态机制影响。'],
  ['Air Supply Box', '航空补给箱', '定时投放的高价值资源箱。', '制造临时 POI 与第三方劝架窗口。'],
  ['Satellite Radar', '卫星雷达', '官方中文 Gameplay 用语。可揭示玩家位置并影响传送门使用。', '把“安全转线”改造成公开信息压力。'],
  ['Eye of the Beholder', '注视者之眼', '官方中文 Gameplay 用语。属于视野/侦察类动态机制。', '让信息优势不只来自地形，也来自限时系统工具。'],
  ['System Collapse', '系统坍缩', '官方中文 Gameplay 用语。用于终局/高压阶段的区域压迫。', '把拖延战转化成必须决策的倒计时。'],
  ['Camera / CCTV', '摄像机 / 监控', '60s 道具视野与 90s 区域视野。', '把控图变成短时窗口。'],
  ['FOW', '战争迷雾', '不可见区域。', '让路线判断具有风险。'],
  ['Third-party', '第三方劝架', '在两队交火后由另一队进场收割。', '高价值目标区的核心风险。'],
];

const locationDesigns = [
  ['码头（Dock）', itemFacts.码头, '与仓库、海滩、旅馆路线相连，适合菜刀/双刀/长步枪起手与食物线转接；秀凯、彰一能把码头作为外圈低风险成型点。', '官方未标注固定变异野兽群；设计重点是起手材料密集与外圈转线，不应写成固定首领点。', '若夜间安全区或战场压到附近，码头从“避战边缘”变成被迫离岸的窄转线；隐蔽逻辑主要来自战争迷雾与建筑转角，公开资料未给草丛坐标。'],
  ['仓库（Warehouse）', itemFacts.仓库, '由旧码头拆分而来，承担工业补件与食物补件功能，连接码头/池塘/小巷一侧的外圈经济。', '无官方固定变异野兽群图；更像补件缓冲区。', '仓库的关卡价值在于“可改路”：缺废铁、电池、胶带、布料时可从主路线短停，而不是强迫玩家进中心。'],
  ['池塘（Pond）', itemFacts.池塘, '与溪流拆分形成水系双区，锤子/十字镐/短矛/长步枪/原石让前排、远程和工艺线都能起手。', '无官方固定变异野兽群图；与海滩/寺庙路线常被熊变异野兽群与阿尔法时间表间接牵引。', '池塘设计适合 Eleven、Magnus、Nadine：可外圈发育，也可向寺庙/海滩目标转压。战场随机刷到时，水系边界会把撤退线压缩成短选择题。'],
  ['溪流（Stream）', itemFacts.溪流, '与池塘分离后承担弓/十字镐/原石/防具线，服务 Rio、Hyejin、Nadine 等远程/控制路线。', '无官方固定变异野兽群图；常作为通往靶场、森林、寺庙的前置路线。', '溪流的核心是“远程角色不必第一时间进中心”：先拿弓与原石，再根据 Day 2 目标提示决定向森林/靶场/寺庙转。'],
  ['海滩（Beach）', itemFacts.海滩, '锤子、十字镐、短柄斧、短矛、鞭子、钢链与全覆盖式泳衣，使前排/近战/工具线都能开局。', '官方截图确认海滩有熊变异野兽群；Night 2 后成为中期 PvE 高价值点。', '海滩是外圈高收益高停留区：打熊会暴露时间，Eleven/Magnus 可承压，Xiukai 可用补给把长战变成优势，Jackie/Shoichi 可等开怪队技能交完后第三方进场。'],
  ['高级住宅区（Uptown）', itemFacts.高级住宅区, '棒球、费德洛夫自动步枪、手表、跑鞋、巧克力、碳酸饮料、油和钢琴线使其兼具武器、移速、食物与枪械补件。', '无官方固定变异野兽群图；更偏路线经济与追击起点。', 'Luke 可从这里滚经济；远程角色也能拿枪械线。高住的设计逻辑是“收益碎片多但非单一首领点”，玩家会短停、换线、进旅馆/小巷，而不是久守。'],
  ['小巷（Alley）', itemFacts.小巷, '由 1.0 拆分后的新区域之一，提供剪刀、菜刀、钢链、针、跑鞋、打火机、胶水、钢琴线，适合近战与陷阱/补件路线。', '无官方固定变异野兽群图；与加油站/高级住宅区/旅馆形成短转线。', '小巷适合 Jackie、Shoichi、Luke 这类短距离进出角色；公开资料没有草丛坐标，因此报告只把它作为战争迷雾、转角、短路口的设计案例，不伪造掩体数据。'],
  ['加油站（Gas Station）', itemFacts.加油站, '由旧小巷拆出，打火机、油、钉子、电池、费德洛夫自动步枪、绷带等让枪械与陷阱路线成立。', '无官方固定变异野兽群图；在 Haze/Isol 路线中是工厂-旅馆-消防局之间的油电补件点。', '加油站是“工业补件+短线控图”节点：它的战斗价值不是首领，而是让 Isol/Haze 能把油电材料转成区域拒止。战场随机刷到时会放大短路口火力压力。'],
  ['旅馆（Hotel）', itemFacts.旅馆, '菜刀、瓦尔特PPK、费德洛夫自动步枪、针、吉他、手表、废铁、电池，适合枪械、近战、手表补件和中线转接。', '无官方固定变异野兽群图；常在路线里承担第二/第三站补件。', '旅馆是典型中继 POI：Aya/Haze/Isol 可补枪械线，Shoichi/Xiukai 可补近战与食物线。设计上它应允许短暂停留与快速撤退，避免变成无意义中心死斗。'],
  ['工厂（Factory）', itemFacts.工厂, '短柄斧、鞭子、瓦尔特PPK、费德洛夫自动步枪、头盔、望远镜、钉子、废铁、打火机、电池、油，是工业件最密的区域之一。', '官方截图确认工厂有狼变异野兽群；Day 2 后从装备工厂变成目标争夺点。', '工厂支持 Jackie、Aya、Haze、Isol、Estelle 等大量路线，因此人口密度天然高。设计逻辑是“材料吸力先发生，狼变异野兽群再叠加二次吸力”，玩家必须选择拿完即走还是争中期 PvE。'],
  ['墓园（Cemetery）', itemFacts.墓园, '十字镐、竹、棒球、钢链、镜头、布甲、手表、羽毛、望远镜、冰块、五马牌、火药，偏防具/饰品/工艺补件。', '无官方固定变异野兽群图；与寺庙/森林/教堂构成传统控制与防具线。', 'Fiora、Hyejin 可把墓园作为窄口控制与防具补件节点。战场随机出现时，墓园会把“慢材料区”转成限时对抗区；无公开草丛数据时不应写具体伏击点。'],
  ['医院（Hospital）', itemFacts.医院, '剪刀、双刀、劳工手套、剃刀、针、镜头、绷带、拖鞋、面包、冰块、废铁、激光笔、电池，使续航、近战与补件强绑定。', '无官方固定变异野兽群图；常作为 Jackie、Shoichi、Estelle、Johann 的路线中段。', '医院的核心不是“治疗站”，而是绷带/废铁/电池把战后恢复和成装连接起来。它适合设计成短暂停留高频区，过长停留会被 Kiosk/目标提示吸走。'],
  ['教堂（Chapel）', itemFacts.教堂, '剪刀、铁锈剑、锤子、短棍、鞭子、玻璃瓶、剃刀、粉笔、弓、短弩、圣杯、十字架，服务宗教材料、弓弩、近战和支援线。', '无官方固定变异野兽群图；与寺庙/医院/学校组成 Johann、Fiora、Hyejin 的路线骨架。', '教堂是“控制与支援材料”教学区：Johann 拿圣杯/十字架，Rio/Nadine 拿弓弩，Fiora 拿铁锈剑。它的动线价值来自能向寺庙、医院、墓园多向转线。'],
  ['消防局（Fire Station）', itemFacts.消防局, '钢笔、玻璃瓶、扑克牌、长步枪、红心、镜头、手表、拖鞋、裤袜、望远镜、钉子、废铁、电池、油，兼具远程、饰品、工业补件。', '无官方固定变异野兽群图；与警察局作为 1.0 拆区后的城市功能区。', '消防局服务 Aya/Haze/Isol/Estelle：一边给远程长步枪/工业件，一边给保护型路线的补件。设计上适合做进入中心前的装备校验点。'],
  ['警察局（Police Station）', itemFacts.警察局, '铁锈剑、锤子、短棍、钢珠、弓、瓦尔特PPK、钢链、发箍、面包、激光笔、套索，让近战、弓、手枪、控制件都能起手。', '无官方固定变异野兽群图；从旧大街（Avenue）拆分后承担城市起手与近战前置。', 'Jackie、Yuki 可从警察局快速拿武器线。它的设计意义是把城市开局从单一大街碰撞拆成更细粒度路线，降低开局被迫 TTK。'],
  ['森林（Forest）', itemFacts.森林, '十字镐、短矛、竹、劳工手套、钢珠、短弩、长步枪、钢链、袈裟、布甲、羽毛，适合远程、成长、风筝与防具补件。', '无官方固定变异野兽群图；但常作为靶场/溪流/教堂路线的目标前置。', '森林适合 Rio、Nadine、Hyejin：它不是单点奖励，而是远程角色的安全边缘空间。若目标提示把队伍拉入森林，远程架线和近战绕后会同时发生。'],
  ['靶场（Archery Range）', itemFacts.靶场, '铁锈剑、竹、钢珠、棒球、弓、短弩、鸭舌帽、袈裟、布甲、跑鞋、钉子、胶带、油，天然服务弓弩与防具路线。', '官方截图确认靶场有狼变异野兽群；Day 2 后与远程路线强耦合。', '靶场是 Rio/Nadine 的教材 POI：先用弓弩材料成立角色路线，再用狼变异野兽群制造停留风险。对 Jackie/Shoichi 来说，这里是读取远程角色打野的第三方窗口。'],
  ['寺庙（Temple）', itemFacts.寺庙, '菜刀、铁锈剑、双刀、短矛、竹、琉璃球、袈裟、羽毛、佛经、野山参、五马牌、布料、原石、纸、火药，材料类型宽，适合近战/控制/支援。', '官方截图确认寺庙有熊变异野兽群；Night 2 后变成中期重压点。', '寺庙的设计像“材料池+首领前置”：Fiora/Hyejin/Johann/Eleven 都有理由到此，但熊变异野兽群会把普通路线升级为多人争夺。窄路控制强，因此必须依赖视野工具反制。'],
  ['学校（School）', itemFacts.学校, '剪刀、短柄斧、剃刀、粉笔、吉他、绷带、打火机，材料不多但非常关键，常用于补件/续航/点火路线。', '无官方固定变异野兽群图；但靠近研究中心侧的路线可参与维克莱恩与中心目标争夺。', '学校是短停补件区：Yuki、Eleven、Estelle、Johann 都会路过。它的设计价值在于把普通材料点放在高压中心旁，使玩家必须选择“拿补件后走”还是“顺势看维克莱恩/战场”。'],
  ['研究中心（Research Center）', '官方 1.0 Item Spawn 表不把研究中心列为普通材料区；它更像中心高压目标/轮转枢纽。', '连接学校、医院、墓园等中线区域，适合作为维克莱恩与终局轮转的课堂案例。', '官方 Gameplay 明确 Night 4 出现维克莱恩，且目标提示会显示首领刷新位置与剩余时间；不要把未公开箱体/草丛坐标写成事实。', '研究中心的设计逻辑是“信息公开后的共同诱饵”：前排吃入口，远程架外环，控制/陷阱限制侧翼，支援/补给负责把收益带走。'],
];

const officialImages = [
  ['官方 1.0 Lumia Island 地图重构图', official.map],
  ['官方 Kiosk 商店界面', official.kioskShop],
  ['官方 Kiosk 地图位置图', official.kioskLocations],
  ['熊变异野兽群：海滩（Beach）', official.mutantBeach],
  ['熊变异野兽群：寺庙（Temple）', official.mutantTemple],
  ['狼变异野兽群：工厂（Factory）', official.mutantFactory],
  ['狼变异野兽群：靶场（Archery Range）', official.mutantArchery],
  ['首领目标刷新提示图', official.bossNotice],
  ['卫星雷达禁用传送门示例 GIF', official.radarGif],
];

const imageSourceRows = [
  ['官方 1.0 Lumia Island 地图重构图', official.map, official.patch],
  ['官方 Kiosk 商店界面', official.kioskShop, official.kiosk],
  ['官方 Kiosk 地图位置图', official.kioskLocations, official.kiosk],
  ['熊变异野兽群：海滩（Beach）', official.mutantBeach, official.gameplay],
  ['熊变异野兽群：寺庙（Temple）', official.mutantTemple, official.gameplay],
  ['狼变异野兽群：工厂（Factory）', official.mutantFactory, official.gameplay],
  ['狼变异野兽群：靶场（Archery Range）', official.mutantArchery, official.gameplay],
  ['首领目标刷新提示图', official.bossNotice, official.gameplay],
  ['卫星雷达禁用传送门示例 GIF', official.radarGif, official.gameplay],
  ['16 个实验体头像', 'assets/eternal-return/character-*.png', 'https://dak.gg/er/characters'],
  ['理论示意图（非游戏截图）', schematic, '基于官方地图、Gameplay 时间表、Kiosk 与视野机制生成'],
  ['资料重绘示意图（非游戏截图）', evidenceDiagram, '基于 map-evidence.json、官方 Kiosk 图、官方 Herd 图、官方 11.4 Patch Notes 生成'],
];

function sourceNames(ids = []) {
  return ids.map((id) => sourceById[id]?.label || id).join('；') || '无来源';
}

function evidenceNote(block) {
  if (!block) return '证据：未找到';
  const sourceText = block.sourceIds?.length ? `；来源：${sourceNames(block.sourceIds)}` : '';
  return `证据：${block.evidenceLevel || '未标注'}${sourceText}`;
}

function resourceDensity(itemsText) {
  const nums = [...String(itemsText).matchAll(/(\d+)/g)].map((m) => Number(m[1]));
  if (!nums.length) return '资源密度：非普通物资区';
  const types = String(itemsText).split('、').filter(Boolean).length;
  const total = nums.reduce((sum, n) => sum + n, 0);
  return `资源密度：${types} 类，表内数量合计 ${total}`;
}

const evidenceLocationRows = mapEvidence.locations.map((loc) => {
  const patch = loc.currentPatchEvidence?.length
    ? loc.currentPatchEvidence.map((entry) => `${entry.summary}（${evidenceNote(entry)}）`).join('；')
    : '无当前版本官方地形/局部 POI 改动资料。';
  return [
    `${loc.nameCn}（${loc.nameEn}）`,
    `${resourceDensity(loc.resources.itemsText)}。${loc.resources.itemsText}。${evidenceNote(loc.resources)}`,
    `${loc.pathing.summary} ${evidenceNote(loc.pathing)}；代表路线：${loc.routeExamples.map((r) => `${r.character}｜${r.weapon}｜${r.route.join('→')}`).join('；')}`,
    `${loc.pve.summary} ${evidenceNote(loc.pve)}`,
    `${loc.objectives.summary} ${evidenceNote(loc.objectives)}；${loc.concealment.summary} ${evidenceNote(loc.concealment)}`,
    `${loc.battleZone.summary} ${evidenceNote(loc.battleZone)}；当前版本证据：${patch}`,
  ];
});

function mdTable(headers, rows) {
  return [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
    ...rows.map((row) => `| ${row.join(' | ')} |`),
  ].join('\n');
}

function characterCard(c) {
  const route = c.route.join(' → ');
  const facts = c.route.map((r) => itemFacts[r.replace(/\s+/g, '')] || itemFacts[r] || '').filter(Boolean).join('；');
  return `### ${c.cn}（${c.name}）｜${c.weapon}

![真实资料：${c.name} 角色头像，来源 DAK.GG 角色分析页](${avatar(c.name)})

- **DAK.GG 角色/路线入口**：[${c.name} Character Analysis / Saved Plans](${dak(c.name)})；抓取日期：${today}。DAK 页面标题显示当前统计武器分支为 **${c.weapon}**，并提供 Saved Plans 入口。
- **教学路线剖面**：${route}。
- **官方物资表校验**：${facts}。${c.key}
- **适配 POI 与目标**：${c.poi}
- **单排读法**：${c.solo}
- **多人读法**：${c.team}
- **关卡设计启示**：${c.lesson}

> 说明：DAK.GG 的单个 Saved Plan 详情页在本环境中不可稳定展开，本卡不声称复刻某一个 Plan ID 的逐格路线；它使用 DAK.GG 的真实角色/武器/Saved Plans 入口作为实战来源入口，并用官方 Item Spawn 表解释路线为什么在地图资源上成立。`;
}

function buildMarkdown() {
  const roleRows = [
    ['入口承压/开团', 'Eleven、Estelle、Magnus、Yuki', 'Kiosk、战场、阿尔法/奥米加/维克莱恩入口', '关卡需要短通道和侧绕并存；只有堵门没有侧绕会变成低技巧压制。'],
    ['侧翼爆发/收割', 'Jackie、Shoichi、Luke', '旅馆、小巷、研究中心外环、目标刷新后第三方路线', '战争迷雾、摄像机、监控必须形成反制关系，不能让刺客无成本进后排。'],
    ['中远程持续输出', 'Aya、Haze、Rio、Nadine', '靶场、森林、战场圆边、首领外环', '视线要有退路和遮挡，避免无限射程或无预警贴脸。'],
    ['控制/陷阱/信息', 'Hyejin、Isol', '寺庙、墓园、Kiosk 路口、战场边缘', '路线越可预测，控制与陷阱越有意义；但必须给绕路与短时视野反制。'],
    ['团队容错/补给兑现', 'Johann、Xiukai、Estelle', 'Kiosk、复活、撤退线、变异野兽群连续战斗', '地图不只奖励击杀，也要奖励把收益带出去的能力。'],
  ];

  return `# 《永恒轮回》Lumia Island 地图逆向工程教材版

> 面向中文关卡策划、系统策划、战斗策划与数值策划的教材型研究报告。  
> 资料基准：官方 1.0.0 Patch Notes、官方 1.0.0 Gameplay、官方 Kiosk Help Center、DAK.GG 角色分析/Saved Plans 入口；抓取日期：${today}。  
> 图像原则：真实官方图和 DAK.GG 真实角色头像优先；生成图只保留 1 张基于官方地图/时间表/视野/Kiosk 数据的理论示意图，并明确标注不是游戏截图。  
> 重要边界：不伪造死亡热力图、不编造脚步声材质半径、不写未公开箱体高度/草丛坐标。路线卡使用 DAK.GG 角色/武器/Saved Plans 入口与官方 Item Spawn 表进行教学拆解，不声称替代游戏内实时最优路线。

---

## 0. 如何阅读本报告：从“资料”到“设计方案”

这份报告不是百科条目，也不是单纯战报。它把《永恒轮回》的真实资料转成关卡设计教材：先看官方地图和系统参数，再看真实角色如何与路线、物资、视野、Kiosk、首领和战场（Battle Zone）发生互动，最后把这些案例抽象成可复用的设计方法。

阅读顺序建议如下。第一遍只看图：Lumia Island 1.0 地图重构、Kiosk 位置、变异野兽群截图、首领提示图、角色头像卡。第二遍看时间表：Day 2、Night 2、Night 3、Night 4 分别如何把玩家从搜刮推向冲突。第三遍看角色路线：每个实验体并不是“职业标签”，而是带着武器、材料需求、移动方式和队伍职责进入地图。

本报告使用三个证据等级。**A 级**是官方页面直接给出的图、机制和数值。**B 级**是 DAK.GG 角色分析页显示的真实实验体、武器分支、统计版本和 Saved Plans 入口。**C 级**是基于 A/B 资料做出的设计解释。所有 C 级内容都会写成“设计启示”或“教学路线剖面”，不会伪装成官方结论。

---

## 1. 地图核心博弈哲学（TL;DR）

- **Lumia Island 的地图不是一张平面，而是一台时间驱动的风险收益机器。** 8 队/24 人在外圈搜刮，Day 2 被生命树枝（Tree of Life）和陨石（Meteorite）牵引，Night 2 被战场（Battle Zone）和阿尔法（Alpha）挤压，Night 4 被维克莱恩博士（Dr. Wickeline）推向终局冲突。
- **路线不是“从 A 走到 B”，而是角色构筑、物资表、Kiosk、野怪、视野和撤退线共同决定的经济路径。** Jackie 的侧翼、Aya 的射线、Eleven 的入口承压、Johann 的撤退保护，都要在真实区域和真实材料上成立。
- **单排与多人不是同一张地图的同一种玩法。** 单排更重视低风险路线、第三方窗口和 Rootkit 兑现；双排开始出现看线/开资源分工；三排/Squad 则把阿尔法/奥米加/维克莱恩变成近似 MOBA 的目标团战。

---

## 2. 官方地图结构：1.0 为什么要扩图、拆区和开建筑

\`\`\`mermaid
flowchart LR
  Spawn["分散出生 / 起手路线<br/>8队，24名玩家"] --> Outer["外圈搜刮 POI<br/>角色构筑材料"]
  Outer --> Kiosk["Kiosk / 无人机<br/>补件、复活、Rootkit"]
  Outer --> D2["Day 2<br/>生命树枝 / 陨石 / 狼变异野兽群"]
  D2 --> N2["Night 2<br/>战场 / 阿尔法 / 熊变异野兽群"]
  N2 --> N3["Night 3<br/>奥米加"]
  N3 --> N4["Night 4<br/>维克莱恩 / 传说航空补给箱"]
  Vision["蝙蝠 30s/8m<br/>摄像机 60s<br/>监控 90s"] --> D2
  Vision --> N2
  Vision --> N4
\`\`\`

![真实案例：官方 1.0 Lumia Island 地图重构图，黄色区域为新开放/新增路径区域](${official.map})

官方 1.0 Patch Notes 说明，Lumia Island 进行了大规模施工：旧 Alley、Avenue、Pond、Dock 被拆分成 Alley/Gas Station、Police Station/Fire Station、Pond/Stream、Dock/Warehouse，地图总体扩大约 15%，并新增路径、开放建筑。对关卡设计而言，这不是“面积变大”这么简单，而是把早期随机碰撞拆成更多可选择路径。

如果 8 队/24 人都被压在旧式单核地图里，开局 TTK 风险会过高，弱势角色和新手会被迫用战斗代替学习。扩图、拆区、开建筑的作用，是把第一阶段从“落点决斗”改为“路线完成率”：玩家先判断当前实验体的关键材料在哪里，再决定是否进入目标点。地图越能支持这种判断，玩家越容易把死亡归因于路线选择，而不是地图恶意。

---

## 3. 资料抽象图：资源重力与信息黑盒

**资料依据包**

- 官方地图依据：1.0 Lumia Island 地图重构图，包含 15% 扩图、新路径与开放建筑。
- 官方时间表：Day 2 生命树枝/陨石/狼变异野兽群，Night 2 战场/阿尔法/熊变异野兽群，Night 3 奥米加，Night 4 维克莱恩/传说航空补给箱。
- 官方视野参数：蝙蝠（Bat）30s/8m，摄像机（Camera）60s，监控（CCTV）90s。
- 官方经济依据：Kiosk Help Center 标注 9 个 Kiosk，并说明特殊材料、复活、Rootkit 等功能。
- 抽象内容：外圈搜刮环、分布式 Kiosk、目标刷新脉冲、短时视野泡、向中心高压目标汇聚的轮转箭头。

![理论示意：基于官方地图、时间表、Kiosk 与视野参数抽象的 Lumia Island 压力拓扑，不是游戏截图](${schematic})

这张图不是小地图复刻，也不是热力图。它的用途是帮助中文读者理解“为什么 Lumia Island 会从外圈搜刮逐渐走向中心冲突”：因为资源、时间和信息都在不断把玩家拉向同一批可预期的高价值点。

---

## 4. 资源经济设计课：Kiosk 如何把“缺件”变成空间风险

![真实案例：官方 Kiosk 商店界面，展示荣誉值（Credits）消费与特殊材料购买入口](${official.kioskShop})

![真实案例：官方 Kiosk 地图位置示意，Help Center 明确 9 个 Kiosk 分布于地图各处](${official.kioskLocations})

Kiosk 是 Lumia Island 最重要的空间经济节点之一。官方 Help Center 说明，荣誉值（Credits）可以通过狩猎野怪、击杀实验体（Test Subject）、击杀阿尔法/奥米加/维克莱恩等方式获得，并可在 Kiosk 购买特殊材料、复活队友或购买 Rootkit 相关逃离道具。1.0 Gameplay 进一步给出 Kiosk Day 2 激活、复用等待 1s、Day 3 后可用荣誉值复活队友。

教材化理解：Kiosk 把“搜不到材料”从纯随机挫败，转化成“我是否愿意暴露在 Kiosk 点位上”的空间问题。对 Jackie、Shoichi、Luke 这类收割角色来说，Kiosk 是伏击点；对 Johann、Estelle、Eleven 来说，Kiosk 是保护点；对 Aya、Haze、Rio 来说，Kiosk 外圈是射线控制点；对 Xiukai 来说，Kiosk 是把补给优势转成团队容错的地方。

价格结构也会塑造路线选择：无人机（Remote Drone）使用 30 荣誉值，生命树枝（Tree of Life）/陨石（Meteorite）为 200 荣誉值，秘银（Mythril）/战术技能模块（Tactical Skill Module）为 250 荣誉值，能量核心（Force Core）为 350 荣誉值，VF 血液样本（VF Blood Sample）为 450 荣誉值，Rootkit 为 150 荣誉值。价格越高，玩家越倾向通过 PvE 与 PvP 获得荣誉值；荣誉值越重要，野怪与目标点就越像“有声音的银行”。

---

## 5. PvE 摩擦设计课：野怪不是怪物，是路线机关

![真实案例：熊变异野兽群（Bear Mutant Herd）1，海滩（Beach）区域官方截图](${official.mutantBeach})

![真实案例：熊变异野兽群（Bear Mutant Herd）2，寺庙（Temple）区域官方截图](${official.mutantTemple})

![真实案例：狼变异野兽群（Wolf Mutant Herd）1，工厂（Factory）区域官方截图](${official.mutantFactory})

![真实案例：狼变异野兽群（Wolf Mutant Herd）2，靶场（Archery Range）区域官方截图](${official.mutantArchery})

官方 1.0 Gameplay 给出变异野兽群（Mutant Herd）的清晰配置：狼变异野兽群（Wolf Mutant Herd）为 3 只狼，Day 2 出现，310s 重生；熊变异野兽群（Bear Mutant Herd）为 2 只熊，Night 2 出现，310s 重生；位置覆盖海滩、寺庙、工厂、靶场。这个分布非常重要：高价值 PvE 没有被全部塞进中心首领房，而是拆到了外圈和半外圈。

对 Nadine 来说，野怪点位是成长路线；对 Xiukai 来说，长时间打点意味着补给优势；对 Jackie/Shoichi/Luke 来说，野怪点位是读取敌人停留的信号；对 Aya/Haze/Rio 来说，野怪点位外圈是提前架线的位置。PvE 的核心设计价值不只是掉落，而是让玩家在“停留”中承担信息、血量、技能冷却和第三方风险。

---

## 6. 动态任务设计课：时间表如何强制修正航线

![真实案例：官方首领怪物扩展地图 / 小地图目标刷新提示](${official.bossNotice})

官方在 1.0 加入首领怪物扩展地图 / 小地图刷新位置提示：玩家可以在扩展地图/小地图上看到目标刷新位置和剩余时间。这让目标从“隐性知识”变成“全局共同诱饵”。当所有队伍同时知道目标在哪里，关卡设计就不再依赖随机遭遇，而是依赖玩家是否愿意进入同一压力场。

${mdTable(
    ['时间段', '核心事件', '教材解读', '典型受益角色'],
    [
      ['Day 1', '野生动物生成，无人机可用', '完成第一轮装备闭环，避免过早中心团。', 'Jackie、Aya、Yuki、Rio'],
      ['Day 2', '生命树枝 x2、陨石 x2、狼变异野兽群', '第一轮资源重力，外圈路线开始向目标点弯折。', 'Nadine、Hyejin、Fiora、Luke'],
      ['Night 2', '战场 x3、阿尔法 x2、熊变异野兽群', '中期压力峰值，路线选择最复杂，第三方价值最高。', 'Eleven、Estelle、Haze、Isol'],
      ['Night 3', '奥米加、英雄航空补给箱', '目标减少，信息战更集中。', 'Aya、Rio、Johann'],
      ['Night 4', '维克莱恩、传说航空补给箱 x2', '终局诱饵，首领、空投、安全区压缩叠加。', '全队职责完整的 Squad'],
    ],
  )}

战场（Battle Zone）是最像“局内课程”的系统。官方给出最大蚕食值 100、蚕食值更新间隔 0.1s、满蚕食值到爆炸 8s、飞艇 5m 回复范围、爆炸冻结范围 15m、击杀敌人回复 40 蚕食值，并明确战场只在 Night 2 出现一次。它把玩家从自由拉扯带进一个有边界、有倒计时、有击杀回补、有奖励的规则空间。

---

## 7. 真实角色 × 地图机制教学矩阵

${mdTable(['职责标签', '真实实验体', '互动地图机制', '关卡设计启示'], roleRows)}

这张表不是职业系统，也不是官方分类。它是关卡设计教材里的“职责阅读法”：先看真实实验体和武器，再看他们怎样消费地图空间。抽象职责只是帮助 LD/系统/战斗团队沟通，不应该替代真实角色分析。

---

## 8. 每个地点的关卡设计逻辑：资源、动线、敌人、战场与隐蔽区

这一节改用本地结构化证据集 \`assets/eternal-return/data/map-evidence.json\` 生成，不再只靠正文硬写。每个地点都拆成资源分配、动线、PvE/首领、Kiosk/传送门/视野、战场风险和当前版本证据。需要特别说明：公开资料没有给出草丛坐标、箱体高度、脚步声传播半径、死亡热力图，因此本节不会把这些内容写成“实测数据”。如果提到隐蔽区或听觉压力，只会作为关卡设计读法：战争迷雾、建筑转角、短时摄像机/监控、目标提示公开后产生的信息窗口。

**资料重绘示意依据包**

- 真实地图依据：官方 1.0 Lumia Island 地图重构图。
- Kiosk/传送门依据：官方 Help Center Kiosk 位置图，经人工读图标注为 K。
- PvE 依据：官方 1.0 Gameplay 的海滩/寺庙熊变异野兽群、工厂/靶场狼变异野兽群截图，经人工整理标注为 H。
- 当前版本依据：官方 11.4 Patch Notes 的警察局遗失物箱与教堂地形改动，标注为 P。
- 中心目标依据：官方 1.0 Gameplay 的目标提示与维克莱恩/首领时间表，标注为 C。
- 边界：该图为资料重绘示意图，不表达精确坐标，不伪造草丛、脚步声、普通野怪或死亡热力图。

![资料重绘示意：基于官方图与本地证据集重绘的 Lumia Island 证据覆盖图，不是游戏截图](${evidenceDiagram})

${mdTable(['地点', '资源分配与密度', '动线与角色路线', '敌人/怪物/首领证据', 'Kiosk/传送门/隐蔽区证据', '战场与当前版本证据'], evidenceLocationRows)}

从教材角度看，Lumia Island 的地点不是“资源丰富/贫瘠”这种一维标签，而是四层叠加。第一层是官方物资表：决定角色能否完成武器、防具、食物或工业件闭环。第二层是动线：决定角色拿完材料后能否转向 Kiosk、目标或撤退线。第三层是 PvE/首领时间表：决定普通路线何时变成公开争夺点。第四层是信息：决定玩家看到目标后，是敢进、敢蹲，还是只能绕行。

---

## 9. 16 张真实角色路线卡

${characters.map(characterCard).join('\n\n')}

---

## 10. 单排、双排、三排/Squad 的地图差异

### 10.1 单排：路线首先是保命工具

单排玩家没有队友看线、补控制或保护 Kiosk 交互，因此同一张地图会变得更“薄”：每一次进入中心、Kiosk、变异野兽群或目标点，都需要自己承担完整信息成本。Jackie、Shoichi、Luke 在单排中更容易通过第三方窗口获得收益，但他们也最容易在摄像机/监控视野下被提前读到。Aya、Rio、Haze 这类远程角色需要把开阔地当作安全距离，而不是追杀许可。Xiukai、Johann、Estelle 则更依赖外圈路线和补给/防守容错。

单排路线的设计重点是“可放弃”。一个好的 POI 应允许玩家看到风险后撤退，而不是一进门就锁死。Kiosk 在单排里更像结算点：Rootkit、补件、复活以外的功能，都要通过暴露时间付费。若 Kiosk 周边只有一条入口，单排会变成被伏击教学；若入口太多且没有信息工具，伏击者也没有可学习空间。

### 10.2 双排：开始出现看线/开资源分工

双排比单排多了一个很关键的动作：一人处理资源，一人处理信息。比如 Nadine 打狼变异野兽群时，Hyejin 或 Isol 可以提前占入口；Aya/Haze 站住外圈射线时，Yuki/Magnus 可以压住近点；Xiukai 经营补给时，Estelle 可以保护撤退方向。双排的地图体验开始接近“微型目标团”，但容错仍然有限。

双排关卡的重点不是把所有 POI 做成大团战场，而是让每个高价值点至少有一个看线位、一个资源位和一个撤退分叉。这样玩家能学会分工，而不是两个人一起蹲同一个门口。

### 10.3 三排/Squad：地图变成目标团战机器

三排/Squad 里，角色职责会成型。Eleven/Estelle/Magnus/Yuki 负责入口与承压，Aya/Haze/Rio/Nadine 负责持续输出，Hyejin/Isol/Shoichi/Jackie 负责控制、侧翼或处决，Johann/Xiukai 负责容错与补给。阿尔法/奥米加/维克莱恩不再是“谁先看到谁打”，而是近似 MOBA 的目标团战：先占视野，再逼入口，再打目标，再处理第三方，再撤退兑现。

这也是为什么官方的 30/60/90 秒视野参数很重要。Squad 不缺输出，缺的是“谁知道敌人从哪里来”。蝙蝠 30s/8m 用于小路口；摄像机 60s 用于目标前站位；监控 90s 用于区域级控图。强队的优势来自把这些短时窗口转成行动，而不是永久点亮地图。

---

## 11. 研究中心 / 学校侧维克莱恩课堂案例

![真实案例：官方目标提示图显示首领刷新位置与剩余时间会出现在扩展地图 / 小地图上](${official.bossNotice})

研究中心 / 学校侧维克莱恩枢纽是最适合作为课堂案例的高压 POI，因为它把时间表、目标公开、首领技能、第三方、撤退兑现全部叠在一起。官方 1.0 Gameplay 说明维克莱恩会启用毒性爆炸（Toxic Explosion）：让 8m 内最近实验体进入中毒（Poisoned），减速 10%，之后造成当前 HP 10% 的爆炸伤害并传播，中毒最多转移 3 次，冷却 60s。

用真实角色拆这一区域，会比写“职业原型”更清楚。Eleven/Magnus/Yuki 负责在入口先吃压力；Aya/Haze/Rio 在外环压视线；Hyejin/Isol 用控制或陷阱限制侧翼；Jackie/Shoichi/Luke 等待第一波技能和维克莱恩毒爆后从侧面进场；Johann/Estelle 负责让队伍在拿到高价值掉落后活着离开；Xiukai 的补给优势会影响连续战斗能力。

进入路线有三层。第一层是直插中心，适合装备和视野领先队。第二层是学校侧切入，利用 1.0 新路径/开放建筑降低正门拥堵。第三层是外圈等待第三方：不抢第一手首领，而是在目标提示公开后靠近，等开维克莱恩队伍吃毒性爆炸、系统坍缩（System Collapse）或其他队伍消耗后再进入。

撤退线的核心不是“有没有路”，而是“视野是否过期”。如果摄像机 60s 或监控 90s 已经结束，拿到维克莱恩收益的队伍会从控图者变成携带战利品的可见目标。Kiosk、Rootkit、复活和安全区方向会成为二次战场。好的关卡不会让击杀首领等于立刻结算，而是把“拿到”和“带走”拆成两个阶段。

---

## 12. 术语中译表

${mdTable(['官方英文', '中文教材译名', '机制解释', '关卡设计意义'], terms)}

---

## 13. 设计检查表：把《永恒轮回》的方法迁移到自己的地图

- 每个高价值目标是否至少能被三类角色互动：入口承压、远程架线、侧翼/信息反制？
- 每条起手路线是否能用真实材料解释，而不是只靠“这条路感觉舒服”？
- Kiosk 或等价经济终端是否既提供纠错，也提供暴露风险？
- PvE 点位是否只是送钱，还是能制造停留、声音、视野和第三方窗口？
- 30/60/90 秒级信息窗口是否能改变行动，而不是只作为界面提示？
- 单排玩家是否有低风险外圈路线和可放弃目标？
- Squad 玩家是否有足够的入口、看线位和撤退线来展开职责分工？
- 任何生成图、热力图、路线图是否都能追溯到真实资料？不能追溯就必须标注为理论示意，不能装作实测。

---

## 14. 图片与资料来源索引

${mdTable(
    ['用途', '来源', 'URL'],
    [
      ['宏观地图结构', '官方 1.0.0 Patch Notes', official.patch],
      ['Gameplay 时间表、Item Spawn、蝙蝠、战场、维克莱恩、变异野兽群', '官方 1.0.0 Gameplay', official.gameplay],
      ['Kiosk 功能与 9 个 Kiosk 位置', '官方 Help Center', official.kiosk],
      ['11.3 Lumi Item Exchange 冷却', '官方 11.3 Patch Notes', official.patch113],
      ['角色、武器分支、Saved Plans 入口', 'DAK.GG Character Analysis', 'https://dak.gg/er/characters'],
      ['理论示意图', '基于官方地图/时间表/视野/Kiosk 资料生成', schematic],
    ],
  )}

### DAK.GG 角色来源列表

${mdTable(['实验体', '武器分支', 'DAK.GG 来源'], characters.map((c) => [c.name, c.weapon, dak(c.name)]))}

### 本地图片文件与原始来源页面

${mdTable(['图片用途', '本地文件', '原始来源页面'], imageSourceRows)}

### 结构化证据集与资料抓取边界

- 本报告地点矩阵由 \`assets/eternal-return/data/map-evidence.json\` 生成；该文件记录每个地点的资源、动线、PvE、Kiosk/传送门、视野/隐蔽、战场、当前版本证据与缺口。
- 当前资料策略：官方资料 > DAK.GG/可信统计入口 > 截图/人工读图；任何非官方或人工读图都在证据等级里标出。

${mdTable(['抓取/验证对象', '结果'], mapEvidence.collectionAttempts.map((entry) => [entry.target, `${entry.result} 来源/入口：${entry.url}`]))}

### 未找到且未写入事实结论的数据

${mapEvidence.dataGaps.map((gap) => `- ${gap}`).join('\n')}
`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

function markdownToHtml(md) {
  const lines = md.split(/\r?\n/);
  let html = '';
  let inCode = false;
  let inUl = false;
  let inTable = false;
  const closeUl = () => { if (inUl) { html += '</ul>\n'; inUl = false; } };
  const closeTable = () => { if (inTable) { html += '</tbody></table>\n'; inTable = false; } };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('```')) {
      closeUl(); closeTable();
      inCode = !inCode;
      html += inCode ? '<pre><code>' : '</code></pre>\n';
      continue;
    }
    if (inCode) { html += escapeHtml(line) + '\n'; continue; }
    if (!line.trim()) { closeUl(); closeTable(); html += '\n'; continue; }
    if (line.startsWith('| ') && line.endsWith(' |')) {
      closeUl();
      const cells = line.slice(2, -2).split(' | ');
      const next = lines[i + 1] || '';
      if (!inTable && next.startsWith('| ---')) {
        html += '<table><thead><tr>' + cells.map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>\n';
        inTable = true;
        i++;
      } else if (inTable) {
        html += '<tr>' + cells.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>\n';
      }
      continue;
    }
    closeTable();
    const img = line.match(/^!\[(.+?)\]\((.+?)\)$/);
    if (img) {
      closeUl();
      html += `<figure><img src="${escapeHtml(img[2])}" alt="${escapeHtml(img[1])}"><figcaption>${escapeHtml(img[1])}</figcaption></figure>\n`;
      continue;
    }
    if (line.startsWith('# ')) { closeUl(); html += `<h1>${inline(line.slice(2))}</h1>\n`; continue; }
    if (line.startsWith('## ')) { closeUl(); html += `<h2>${inline(line.slice(3))}</h2>\n`; continue; }
    if (line.startsWith('### ')) { closeUl(); html += `<h3>${inline(line.slice(4))}</h3>\n`; continue; }
    if (line.startsWith('> ')) { closeUl(); html += `<blockquote>${inline(line.slice(2))}</blockquote>\n`; continue; }
    if (line.startsWith('- ')) {
      if (!inUl) { html += '<ul>\n'; inUl = true; }
      html += `<li>${inline(line.slice(2))}</li>\n`;
      continue;
    }
    if (line === '---') { closeUl(); html += '<hr>\n'; continue; }
    closeUl();
    html += `<p>${inline(line)}</p>\n`;
  }
  closeUl(); closeTable();
  return html;
}

function inline(s) {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}

function htmlPage(md) {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>《永恒轮回》Lumia Island 地图逆向工程教材版</title>
  <style>
    :root{--ink:#17202a;--muted:#627080;--line:#d9e1ea;--accent:#1e6f9f;--soft:#f4f8fb;--code:#101820}
    body{margin:0;background:#eef3f7;color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei","PingFang SC",Arial,sans-serif;line-height:1.78}
    main{max-width:1040px;margin:0 auto;background:#fff;min-height:100vh;padding:48px 56px 80px;box-shadow:0 20px 60px rgba(30,50,70,.12)}
    h1{font-size:34px;line-height:1.25;margin:0 0 24px;color:#0c2438}
    h2{font-size:25px;margin:52px 0 18px;border-left:6px solid var(--accent);padding-left:14px}
    h3{font-size:20px;margin:34px 0 12px;color:#123b57}
    p{margin:12px 0} blockquote{margin:16px 0;padding:14px 18px;background:var(--soft);border-left:4px solid var(--accent);color:#30465a}
    img{max-width:100%;border-radius:8px;border:1px solid var(--line);background:#f8fafc}
    figure{margin:22px 0;text-align:center} figcaption{font-size:13px;color:var(--muted);margin-top:8px}
    table{border-collapse:collapse;width:100%;margin:18px 0;font-size:14px} th,td{border:1px solid var(--line);padding:9px 10px;vertical-align:top} th{background:#eaf3f9;color:#17334a}
    ul{padding-left:24px} li{margin:6px 0} a{color:#0b6fa4;text-decoration:none} a:hover{text-decoration:underline}
    pre{background:var(--code);color:#f3f6f8;padding:16px;border-radius:8px;overflow:auto}
    code{font-family:"Cascadia Code",Consolas,monospace;font-size:.94em}
    hr{border:0;border-top:1px solid var(--line);margin:34px 0}
    @media print{body{background:#fff}main{box-shadow:none;padding:20mm}a{color:#000}}
  </style>
</head>
<body><main>
${markdownToHtml(md)}
</main></body></html>`;
}

function stripMarkdown(md) {
  return md
    .replace(/!\[(.*?)\]\((.*?)\)/g, '$1：$2')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1（$2）')
    .replace(/[`*_>#]/g, '')
    .replace(/\|/g, '    ');
}

function xmlEscape(s) {
  return String(s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[ch]));
}

function paragraph(text, style = '') {
  const pStyle = style ? `<w:pPr><w:pStyle w:val="${style}"/></w:pPr>` : '';
  return `<w:p>${pStyle}<w:r><w:t xml:space="preserve">${xmlEscape(text)}</w:t></w:r></w:p>`;
}

function imagePara(rId, docPrId, name, cx = 5486400, cy = 3086100) {
  return `<w:p><w:r><w:drawing><wp:inline xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${cx}" cy="${cy}"/><wp:docPr id="${docPrId}" name="${xmlEscape(name)}"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="${docPrId}" name="${xmlEscape(name)}"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${rId}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`;
}

function buildDocx(md) {
  const files = [];
  const lines = md.split(/\r?\n/);
  const body = [];
  const imageEntries = [];
  let inCode = false;
  const clean = (line) => line
    .replace(/!\[(.*?)\]\((.*?)\)/g, '$1：$2')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1（$2）')
    .replace(/[`*_>#]/g, '')
    .replace(/\|/g, '    ')
    .trim();
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith('```')) {
      inCode = !inCode;
      body.push(paragraph(line));
      continue;
    }
    const img = line.match(/^!\[(.+?)\]\((.+?)\)$/);
    if (img) {
      const [, caption, src] = img;
      body.push(paragraph(caption));
      const localPath = src.startsWith('assets/') ? path.join(outDir, src) : '';
      if (localPath && fs.existsSync(localPath)) {
        const ext = path.extname(src).slice(1).toLowerCase();
        const mediaName = `image-${imageEntries.length + 1}.${ext === 'jpeg' ? 'jpg' : ext}`;
        const rId = `rIdImage${imageEntries.length + 1}`;
        const isAvatar = path.basename(src).startsWith('character-');
        const isGif = ext === 'gif';
        imageEntries.push({ rId, mediaName, filePath: localPath, ext: ext === 'jpg' || ext === 'jpeg' ? 'jpg' : ext });
        body.push(imagePara(rId, imageEntries.length, mediaName, isAvatar ? 914400 : 5486400, isAvatar ? 914400 : isGif ? 3086100 : 3086100));
      } else {
        body.push(paragraph(src));
      }
      continue;
    }
    const text = clean(line);
    if (!text) continue;
    if (rawLine.startsWith('# ')) {
      body.push(paragraph(text, 'Title'));
    } else if (rawLine.startsWith('## ')) {
      body.push(paragraph(text, 'Heading1'));
    } else if (rawLine.startsWith('### ')) {
      body.push(paragraph(text, 'Heading2'));
    } else {
      body.push(paragraph(text));
    }
  }
  body.push('<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1200" w:bottom="1440" w:left="1200" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr>');
  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>${body.join('')}</w:body></w:document>`;
  const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:rPr><w:b/><w:sz w:val="40"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:rPr><w:b/><w:sz w:val="28"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:rPr><w:b/><w:sz w:val="24"/></w:rPr></w:style></w:styles>`;
  const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`;
  const docRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${imageEntries.map((entry) => `<Relationship Id="${entry.rId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${entry.mediaName}"/>`).join('')}</Relationships>`;
  const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="jpg" ContentType="image/jpeg"/><Default Extension="jpeg" ContentType="image/jpeg"/><Default Extension="gif" ContentType="image/gif"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>`;
  files.push(['[Content_Types].xml', Buffer.from(contentTypes)]);
  files.push(['_rels/.rels', Buffer.from(relsXml)]);
  files.push(['word/document.xml', Buffer.from(documentXml)]);
  files.push(['word/styles.xml', Buffer.from(stylesXml)]);
  files.push(['word/_rels/document.xml.rels', Buffer.from(docRelsXml)]);
  for (const entry of imageEntries) {
    files.push([`word/media/${entry.mediaName}`, fs.readFileSync(entry.filePath)]);
  }
  return makeZip(files);
}

function makeZip(files) {
  const chunks = [];
  const central = [];
  let offset = 0;
  for (const [name, data] of files) {
    const nameBuf = Buffer.from(name);
    const crc = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 6);
    local.writeUInt16LE(0, 8);
    local.writeUInt16LE(0, 10);
    local.writeUInt16LE(0, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);
    chunks.push(local, nameBuf, data);
    const cent = Buffer.alloc(46);
    cent.writeUInt32LE(0x02014b50, 0);
    cent.writeUInt16LE(20, 4);
    cent.writeUInt16LE(20, 6);
    cent.writeUInt16LE(0, 8);
    cent.writeUInt16LE(0, 10);
    cent.writeUInt16LE(0, 12);
    cent.writeUInt16LE(0, 14);
    cent.writeUInt32LE(crc, 16);
    cent.writeUInt32LE(data.length, 20);
    cent.writeUInt32LE(data.length, 24);
    cent.writeUInt16LE(nameBuf.length, 28);
    cent.writeUInt16LE(0, 30);
    cent.writeUInt16LE(0, 32);
    cent.writeUInt16LE(0, 34);
    cent.writeUInt16LE(0, 36);
    cent.writeUInt32LE(0, 38);
    cent.writeUInt32LE(offset, 42);
    central.push(cent, nameBuf);
    offset += local.length + nameBuf.length + data.length;
  }
  const centralSize = central.reduce((n, b) => n + b.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);
  return Buffer.concat([...chunks, ...central, end]);
}

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return (~c) >>> 0;
}

const md = buildMarkdown();
fs.writeFileSync(path.join(outDir, 'eternal-return-map-reverse-engineering.md'), md, 'utf8');
fs.writeFileSync(path.join(outDir, 'eternal-return-map-reverse-engineering.html'), htmlPage(md), 'utf8');
fs.writeFileSync(path.join(outDir, 'eternal-return-map-reverse-engineering.docx'), buildDocx(md));

const sourceMd = `# Eternal Return 报告图片与路线来源清单

生成日期：${today}

## 官方资料

${mdTable(['资料', 'URL'], [
  ['1.0.0 Patch Notes：地图重构、8队/24人、15%扩图', official.patch],
  ['1.0.0 Gameplay：Item Spawn、Game Flow、蝙蝠、变异野兽群、战场、维克莱恩', official.gameplay],
  ['Kiosk Help Center：荣誉值、9个Kiosk、复活/Rootkit', official.kiosk],
  ['Patch Notes 11.3：Lumi Item Exchange 0.2s -> 0.3s', official.patch113],
  ['Patch Notes 11.4：警察局遗失物箱、教堂地形改动', official.patch114],
])}

## 结构化证据源

${mdTable(['ID', '资料', '可信等级', '抓取日期', 'URL'], mapEvidence.sources.map((source) => [source.id, source.label, source.level, source.capturedAt, source.url]))}

## 真实官方图片与本地文件

${mdTable(['用途', '本地文件', '原始来源页面'], imageSourceRows)}

## 本地证据数据集

- \`assets/eternal-return/data/map-evidence.json\`：20 个地点的资源、动线、敌人/怪物/首领、Kiosk/传送门、视野/隐蔽、战场、当前版本证据与缺口。
- \`${evidenceDiagram}\`：基于官方图与证据集重绘的清版示意图，不是游戏截图，不表达精确坐标。

## DAK.GG 角色与路线入口

${mdTable(['实验体', '武器分支', '角色头像', 'DAK.GG 页面'], characters.map((c) => [c.name, c.weapon, avatar(c.name), dak(c.name)]))}

## 生成图边界

本目录中的 \`source-grounded-lumia-island-pressure-schematic.png\` 是理论示意图，不是游戏截图。依据：官方 1.0 地图、官方 Gameplay 时间表/视野参数、官方 Kiosk 资料。它只表达资源重力与信息窗口关系，不表达精确建筑、真实热力图或真实小地图。

## 未找到且未伪造的资料

${mapEvidence.dataGaps.map((gap) => `- ${gap}`).join('\n')}

## 抓取尝试与边界

${mdTable(['对象', '入口', '结果'], mapEvidence.collectionAttempts.map((entry) => [entry.target, entry.url, entry.result]))}
`;
fs.writeFileSync(path.join(assetDir, 'SOURCES.md'), sourceMd, 'utf8');

console.log('Generated report outputs in reports/');
