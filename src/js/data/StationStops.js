/**
 * 路線別 駅一覧データ
 * LineSelector.js でチェック時に駅一覧を展開表示するために使用
 *
 * 構造:
 *   STATION_STOPS[lineValue] = [{ name: '駅名', count: 物件数 }]
 *
 * 駅データが登録されていない路線は「この路線の全駅を検索対象にします」と表示。
 * 主要路線のみ詳細駅データを収録（ポートフォリオ用データ）。
 */

const STATION_STOPS = {

  // ==========================================
  // 東京都
  // ==========================================

  // JR山手線
  yamanote: [
    { name: '東京', count: 2840 },
    { name: '神田', count: 1230 },
    { name: '秋葉原', count: 1560 },
    { name: '御徒町', count: 1340 },
    { name: '上野', count: 1620 },
    { name: '鶯谷', count: 840 },
    { name: '日暮里', count: 920 },
    { name: '西日暮里', count: 780 },
    { name: '田端', count: 640 },
    { name: '駒込', count: 760 },
    { name: '巣鴨', count: 1020 },
    { name: '大塚', count: 1140 },
    { name: '池袋', count: 2460 },
    { name: '目白', count: 680 },
    { name: '高田馬場', count: 1380 },
    { name: '新大久保', count: 620 },
    { name: '新宿', count: 3240 },
    { name: '代々木', count: 540 },
    { name: '原宿', count: 420 },
    { name: '渋谷', count: 2180 },
    { name: '恵比寿', count: 1460 },
    { name: '目黒', count: 1320 },
    { name: '五反田', count: 1180 },
    { name: '大崎', count: 860 },
    { name: '品川', count: 1540 },
    { name: '田町', count: 920 },
    { name: '浜松町', count: 680 },
    { name: '新橋', count: 1240 },
    { name: '有楽町', count: 860 },
  ],

  // JR中央線（快速）
  chuo: [
    { name: '東京', count: 2840 },
    { name: '御茶ノ水', count: 1120 },
    { name: '四ツ谷', count: 860 },
    { name: '新宿', count: 3240 },
    { name: '中野', count: 1680 },
    { name: '高円寺', count: 1240 },
    { name: '阿佐ヶ谷', count: 1120 },
    { name: '荻窪', count: 1460 },
    { name: '西荻窪', count: 980 },
    { name: '吉祥寺', count: 1540 },
    { name: '三鷹', count: 1320 },
    { name: '武蔵境', count: 860 },
    { name: '東小金井', count: 720 },
    { name: '武蔵小金井', count: 840 },
    { name: '国分寺', count: 1060 },
    { name: '西国分寺', count: 640 },
    { name: '国立', count: 780 },
    { name: '立川', count: 1460 },
    { name: '八王子', count: 1230 },
  ],

  // JR総武線
  sobu: [
    { name: '秋葉原', count: 1560 },
    { name: '浅草橋', count: 640 },
    { name: '両国', count: 720 },
    { name: '錦糸町', count: 1480 },
    { name: '亀戸', count: 1240 },
    { name: '平井', count: 860 },
    { name: '新小岩', count: 1120 },
    { name: '小岩', count: 980 },
    { name: '市川', count: 1360 },
    { name: '本八幡', count: 1540 },
    { name: '下総中山', count: 620 },
    { name: '西船橋', count: 1480 },
    { name: '船橋', count: 1820 },
    { name: '津田沼', count: 1640 },
    { name: '幕張', count: 780 },
    { name: '千葉', count: 2240 },
  ],

  // 東京メトロ丸ノ内線
  marunouchi: [
    { name: '荻窪', count: 1460 },
    { name: '南阿佐ヶ谷', count: 620 },
    { name: '新高円寺', count: 780 },
    { name: '東高円寺', count: 640 },
    { name: '新中野', count: 860 },
    { name: '中野坂上', count: 920 },
    { name: '西新宿', count: 740 },
    { name: '新宿', count: 3240 },
    { name: '新宿三丁目', count: 1460 },
    { name: '四谷三丁目', count: 780 },
    { name: '四ツ谷', count: 860 },
    { name: '赤坂見附', count: 540 },
    { name: '国会議事堂前', count: 320 },
    { name: '霞ケ関', count: 280 },
    { name: '銀座', count: 640 },
    { name: '東京', count: 2840 },
    { name: '大手町', count: 560 },
    { name: '後楽園', count: 980 },
    { name: '茗荷谷', count: 860 },
    { name: '池袋', count: 2460 },
  ],

  // 都営大江戸線
  oedo: [
    { name: '新宿西口', count: 2840 },
    { name: '都庁前', count: 420 },
    { name: '中野坂上', count: 920 },
    { name: '練馬', count: 1240 },
    { name: '光が丘', count: 860 },
    { name: '六本木', count: 940 },
    { name: '大門', count: 720 },
    { name: '月島', count: 1060 },
    { name: '門前仲町', count: 1120 },
    { name: '両国', count: 720 },
    { name: '上野御徒町', count: 1340 },
    { name: '飯田橋', count: 640 },
    { name: '新宿', count: 3240 },
  ],

  // ==========================================
  // 神奈川県
  // ==========================================

  // 横浜市営ブルーライン
  'blue-line': [
    { name: '横浜', count: 2460 },
    { name: '高島町', count: 420 },
    { name: '桜木町', count: 680 },
    { name: '関内', count: 860 },
    { name: '伊勢佐木長者町', count: 520 },
    { name: '阪東橋', count: 480 },
    { name: '吉野町', count: 540 },
    { name: '蒔田', count: 460 },
    { name: '弘明寺', count: 640 },
    { name: '上大岡', count: 1080 },
    { name: '上永谷', count: 620 },
    { name: '戸塚', count: 1240 },
    { name: '踊場', count: 420 },
    { name: '中田', count: 380 },
    { name: '立場', count: 520 },
    { name: '湘南台', count: 860 },
    { name: 'あざみ野', count: 940 },
    { name: 'センター北', count: 780 },
    { name: 'センター南', count: 820 },
    { name: '新横浜', count: 1460 },
  ],

  // JR東海道本線（神奈川）
  'tokaido-kanagawa': [
    { name: '横浜', count: 2460 },
    { name: '戸塚', count: 1240 },
    { name: '大船', count: 980 },
    { name: '藤沢', count: 1360 },
    { name: '辻堂', count: 840 },
    { name: '茅ヶ崎', count: 920 },
    { name: '平塚', count: 1060 },
    { name: '大磯', count: 340 },
    { name: '二宮', count: 280 },
    { name: '小田原', count: 860 },
  ],

  // 京急本線
  keikyu: [
    { name: '品川', count: 1540 },
    { name: '北品川', count: 360 },
    { name: '青物横丁', count: 540 },
    { name: '立会川', count: 420 },
    { name: '京急蒲田', count: 980 },
    { name: '京急川崎', count: 1240 },
    { name: '横浜', count: 2460 },
    { name: '上大岡', count: 1080 },
    { name: '金沢文庫', count: 740 },
    { name: '横須賀中央', count: 860 },
  ],

  // ==========================================
  // 大阪府
  // ==========================================

  // JR大阪環状線
  'osaka-loop': [
    { name: '大阪', count: 3640 },
    { name: '天満', count: 860 },
    { name: '桜ノ宮', count: 640 },
    { name: '京橋', count: 1240 },
    { name: '大阪城公園', count: 420 },
    { name: '森ノ宮', count: 680 },
    { name: '玉造', count: 740 },
    { name: '鶴橋', count: 980 },
    { name: '桃谷', count: 620 },
    { name: '寺田町', count: 540 },
    { name: '天王寺', count: 2180 },
    { name: '新今宮', count: 460 },
    { name: '今宮', count: 320 },
    { name: '芦原橋', count: 280 },
    { name: '大正', count: 540 },
    { name: '弁天町', count: 860 },
    { name: '西九条', count: 740 },
    { name: '野田', count: 620 },
    { name: '福島', count: 1120 },
  ],

  // Osaka Metro御堂筋線
  midosuji: [
    { name: '江坂', count: 1460 },
    { name: '新大阪', count: 1840 },
    { name: '西中島南方', count: 1120 },
    { name: '中津', count: 980 },
    { name: '梅田', count: 3240 },
    { name: '淀屋橋', count: 640 },
    { name: '本町', count: 1240 },
    { name: '心斎橋', count: 1060 },
    { name: 'なんば', count: 2460 },
    { name: '大国町', count: 540 },
    { name: '動物園前', count: 380 },
    { name: '天王寺', count: 2180 },
    { name: '昭和町', count: 640 },
    { name: '長居', count: 820 },
    { name: 'あびこ', count: 740 },
    { name: '中百舌鳥', count: 980 },
  ],

  // 阪急京都本線
  'hankyu-kyoto': [
    { name: '大阪梅田', count: 3240 },
    { name: '十三', count: 1060 },
    { name: '南方', count: 780 },
    { name: '淡路', count: 860 },
    { name: '茨木市', count: 1240 },
    { name: '高槻市', count: 1460 },
    { name: '長岡天神', count: 640 },
    { name: '桂', count: 820 },
    { name: '西院', count: 740 },
    { name: '大宮', count: 680 },
    { name: '烏丸', count: 1120 },
    { name: '京都河原町', count: 1840 },
  ],

  // ==========================================
  // 愛知県
  // ==========================================

  // 名古屋市営東山線
  higashiyama: [
    { name: '高畑', count: 480 },
    { name: '中村公園', count: 640 },
    { name: '名古屋', count: 2860 },
    { name: '伏見', count: 1240 },
    { name: '栄', count: 1840 },
    { name: '千種', count: 980 },
    { name: '今池', count: 1060 },
    { name: '池下', count: 740 },
    { name: '覚王山', count: 620 },
    { name: '本山', count: 860 },
    { name: '東山公園', count: 540 },
    { name: '星ヶ丘', count: 920 },
    { name: '一社', count: 680 },
    { name: '藤が丘', count: 840 },
  ],

  // 名鉄名古屋本線
  'meitetsu-honsen': [
    { name: '名鉄名古屋', count: 2860 },
    { name: '金山', count: 1460 },
    { name: '神宮前', count: 680 },
    { name: '堀田', count: 520 },
    { name: '鳴海', count: 640 },
    { name: '前後', count: 480 },
    { name: '知立', count: 720 },
    { name: '新安城', count: 540 },
    { name: '東岡崎', count: 860 },
    { name: '国府', count: 340 },
    { name: '豊橋', count: 1240 },
  ],

  // ==========================================
  // 福岡県
  // ==========================================

  // 福岡市地下鉄空港線
  kuko: [
    { name: '姪浜', count: 1060 },
    { name: '室見', count: 640 },
    { name: '藤崎', count: 780 },
    { name: '西新', count: 1240 },
    { name: '唐人町', count: 540 },
    { name: '大濠公園', count: 680 },
    { name: '赤坂', count: 740 },
    { name: '天神', count: 2460 },
    { name: '中洲川端', count: 860 },
    { name: '祇園', count: 640 },
    { name: '博多', count: 2180 },
    { name: '福岡空港', count: 420 },
  ],

  // JR鹿児島本線（福岡）
  'kagoshima-honsen': [
    { name: '門司港', count: 340 },
    { name: '小倉', count: 1860 },
    { name: '戸畑', count: 640 },
    { name: '八幡', count: 520 },
    { name: '黒崎', count: 780 },
    { name: '折尾', count: 620 },
    { name: '赤間', count: 540 },
    { name: '福間', count: 460 },
    { name: '香椎', count: 860 },
    { name: '博多', count: 2180 },
    { name: '南福岡', count: 740 },
    { name: '大野城', count: 640 },
    { name: '二日市', count: 580 },
    { name: '久留米', count: 1060 },
    { name: '大牟田', count: 480 },
  ],

  // 西鉄天神大牟田線
  'nishitetsu-tenjin': [
    { name: '西鉄福岡（天神）', count: 2460 },
    { name: '薬院', count: 860 },
    { name: '西鉄平尾', count: 640 },
    { name: '大橋', count: 1060 },
    { name: '井尻', count: 540 },
    { name: '春日原', count: 480 },
    { name: '下大利', count: 420 },
    { name: '朝倉街道', count: 380 },
    { name: '久留米', count: 1060 },
    { name: '柳川', count: 340 },
    { name: '大牟田', count: 480 },
  ],

  // ==========================================
  // 北海道
  // ==========================================

  // 札幌市営南北線
  'namboku-sapporo': [
    { name: '麻生', count: 860 },
    { name: '北34条', count: 540 },
    { name: '北24条', count: 740 },
    { name: '北18条', count: 620 },
    { name: '北12条', count: 480 },
    { name: 'さっぽろ', count: 2460 },
    { name: '大通', count: 1840 },
    { name: 'すすきの', count: 1240 },
    { name: '中島公園', count: 860 },
    { name: '幌平橋', count: 540 },
    { name: '中の島', count: 460 },
    { name: '平岸', count: 680 },
    { name: '南平岸', count: 520 },
    { name: '澄川', count: 620 },
    { name: '自衛隊前', count: 340 },
    { name: '真駒内', count: 480 },
  ],

  // JR函館本線
  hakodate: [
    { name: '函館', count: 860 },
    { name: '五稜郭', count: 640 },
    { name: '桔梗', count: 340 },
    { name: '大沼公園', count: 120 },
    { name: '森', count: 180 },
    { name: '長万部', count: 140 },
    { name: '倶知安', count: 220 },
    { name: '余市', count: 180 },
    { name: '小樽', count: 640 },
    { name: '手稲', count: 920 },
    { name: '琴似', count: 1060 },
    { name: '札幌', count: 2460 },
    { name: '白石', count: 780 },
    { name: '江別', count: 620 },
    { name: '岩見沢', count: 340 },
  ],

  // ==========================================
  // 広島県
  // ==========================================

  // JR山陽本線（広島エリア）
  sanyo: [
    { name: '岩国', count: 420 },
    { name: '宮島口', count: 280 },
    { name: '五日市', count: 640 },
    { name: '新井口', count: 460 },
    { name: '横川', count: 680 },
    { name: '広島', count: 2240 },
    { name: '天神川', count: 340 },
    { name: '向洋', count: 280 },
    { name: '海田市', count: 460 },
    { name: '安芸中野', count: 320 },
    { name: '西条', count: 860 },
    { name: '三原', count: 420 },
    { name: '尾道', count: 380 },
    { name: '福山', count: 1060 },
  ],

  // 広島高速交通アストラムライン
  astram: [
    { name: '本通', count: 1240 },
    { name: '県庁前', count: 460 },
    { name: '城北', count: 380 },
    { name: '新白島', count: 640 },
    { name: '牛田', count: 520 },
    { name: '不動院前', count: 340 },
    { name: '祇園新橋北', count: 280 },
    { name: '西原', count: 360 },
    { name: '中筋', count: 420 },
    { name: '古市', count: 340 },
    { name: '大町', count: 460 },
    { name: '大塚', count: 380 },
    { name: '広域公園前', count: 240 },
  ],

  // ==========================================
  // 宮城県
  // ==========================================

  // 仙台市営南北線
  'sendai-namboku': [
    { name: '泉中央', count: 1060 },
    { name: '八乙女', count: 640 },
    { name: '旭ヶ丘', count: 480 },
    { name: '台原', count: 520 },
    { name: '北仙台', count: 680 },
    { name: '北四番丁', count: 540 },
    { name: '勾当台公園', count: 860 },
    { name: '広瀬通', count: 740 },
    { name: '仙台', count: 2460 },
    { name: '五橋', count: 580 },
    { name: '愛宕橋', count: 420 },
    { name: '河原町', count: 380 },
    { name: '長町', count: 860 },
    { name: '長町南', count: 640 },
    { name: '富沢', count: 480 },
  ],

  // ==========================================
  // 京都府
  // ==========================================

  // 京都市営烏丸線
  karasuma: [
    { name: '国際会館', count: 240 },
    { name: '松ヶ崎', count: 380 },
    { name: '北山', count: 460 },
    { name: '北大路', count: 740 },
    { name: '鞍馬口', count: 380 },
    { name: '今出川', count: 640 },
    { name: '丸太町', count: 520 },
    { name: '烏丸御池', count: 860 },
    { name: '四条', count: 1840 },
    { name: '五条', count: 640 },
    { name: '京都', count: 2460 },
    { name: '九条', count: 480 },
    { name: '十条', count: 420 },
    { name: '竹田', count: 580 },
  ],

  // ==========================================
  // 兵庫県
  // ==========================================

  // 神戸市営西神・山手線
  'seishin-yamate': [
    { name: '新神戸', count: 640 },
    { name: '三宮', count: 2240 },
    { name: '県庁前', count: 460 },
    { name: '大倉山', count: 380 },
    { name: '湊川公園', count: 520 },
    { name: '上沢', count: 340 },
    { name: '長田', count: 460 },
    { name: '新長田', count: 740 },
    { name: '板宿', count: 580 },
    { name: '名谷', count: 640 },
    { name: '総合運動公園', count: 280 },
    { name: '学園都市', count: 520 },
    { name: '伊川谷', count: 340 },
    { name: '西神中央', count: 640 },
  ],

  // ==========================================
  // 埼玉県
  // ==========================================

  // JR埼京線
  'saikyo-saitama': [
    { name: '大宮', count: 1860 },
    { name: '日進', count: 420 },
    { name: '西大宮', count: 380 },
    { name: '指扇', count: 340 },
    { name: '南与野', count: 520 },
    { name: '与野本町', count: 460 },
    { name: '北与野', count: 540 },
    { name: '武蔵浦和', count: 860 },
    { name: '中浦和', count: 520 },
    { name: '南浦和', count: 740 },
    { name: '北戸田', count: 480 },
    { name: '戸田', count: 640 },
    { name: '戸田公園', count: 720 },
  ],

  // JR高崎線
  takasaki: [
    { name: '大宮', count: 1860 },
    { name: '宮原', count: 540 },
    { name: '上尾', count: 860 },
    { name: '桶川', count: 640 },
    { name: '北本', count: 520 },
    { name: '鴻巣', count: 480 },
    { name: '熊谷', count: 860 },
    { name: '深谷', count: 420 },
    { name: '本庄', count: 340 },
    { name: '高崎', count: 1240 },
  ],

  // ==========================================
  // 千葉県
  // ==========================================

  // JR総武線（千葉方面）
  'sobu-chiba': [
    { name: '市川', count: 1360 },
    { name: '本八幡', count: 1540 },
    { name: '下総中山', count: 620 },
    { name: '西船橋', count: 1480 },
    { name: '船橋', count: 1820 },
    { name: '東船橋', count: 640 },
    { name: '津田沼', count: 1640 },
    { name: '幕張本郷', count: 740 },
    { name: '幕張', count: 780 },
    { name: '新検見川', count: 640 },
    { name: '稲毛', count: 920 },
    { name: '西千葉', count: 680 },
    { name: '千葉', count: 2240 },
  ],

  // JR京葉線
  keiyo: [
    { name: '東京', count: 2840 },
    { name: '新木場', count: 420 },
    { name: '舞浜', count: 280 },
    { name: '新浦安', count: 1240 },
    { name: '南船橋', count: 640 },
    { name: '海浜幕張', count: 1060 },
    { name: '検見川浜', count: 580 },
    { name: '稲毛海岸', count: 740 },
    { name: '千葉みなと', count: 520 },
    { name: '蘇我', count: 640 },
  ],
}

export default Object.freeze(STATION_STOPS)
