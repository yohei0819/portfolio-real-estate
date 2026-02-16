/**
 * 路線・沿線マスタデータ
 * 都道府県別の路線情報を管理
 * station.html で都道府県選択に応じて動的に路線一覧を切り替え
 *
 * 構造:
 *   STATION_DATA[prefectureKey] = {
 *     name     : 表示名（PrefectureData と同期）
 *     railways : [{ company, lines: [{ value, name, count }] }]
 *     adjacent : [{ key, name }]  隣接都道府県
 *   }
 *
 * PREFECTURE_LIST: 地域順ソート済みのドロップダウン用リスト
 * 47都道府県マスタは PrefectureData.js で一元管理
 */

import PREFECTURES from './PrefectureData.js'

/** 地域表示順（JIS X 0401 準拠） */
const REGION_ORDER = ['北海道', '東北', '関東', '中部', '近畿', '中国', '四国', '九州・沖縄']

const STATION_DATA = {

  // ==========================================
  // 関東地方（主要都市）
  // ==========================================

  tokyo: {
    name: '東京都',
    railways: [
      {
        company: 'JR東日本 ─ JR在来線',
        lines: [
          { value: 'yamanote', name: 'JR山手線', count: 28420 },
          { value: 'chuo', name: 'JR中央線（快速）', count: 18530 },
          { value: 'sobu', name: 'JR総武線', count: 15260 },
          { value: 'keihin', name: 'JR京浜東北線', count: 12840 },
          { value: 'saikyo', name: 'JR埼京線', count: 8920 },
          { value: 'tokaido', name: 'JR東海道本線', count: 6350 },
        ],
      },
      {
        company: '東京メトロ',
        lines: [
          { value: 'marunouchi', name: '東京メトロ丸ノ内線', count: 14560 },
          { value: 'ginza', name: '東京メトロ銀座線', count: 11230 },
          { value: 'hibiya', name: '東京メトロ日比谷線', count: 10840 },
          { value: 'tozai', name: '東京メトロ東西線', count: 9650 },
          { value: 'chiyoda', name: '東京メトロ千代田線', count: 8720 },
          { value: 'yurakucho', name: '東京メトロ有楽町線', count: 7830 },
          { value: 'hanzomon', name: '東京メトロ半蔵門線', count: 7120 },
          { value: 'namboku', name: '東京メトロ南北線', count: 6540 },
          { value: 'fukutoshin', name: '東京メトロ副都心線', count: 5920 },
        ],
      },
      {
        company: '都営地下鉄',
        lines: [
          { value: 'oedo', name: '都営大江戸線', count: 9840 },
          { value: 'mita', name: '都営三田線', count: 7250 },
          { value: 'shinjuku', name: '都営新宿線', count: 6830 },
          { value: 'asakusa', name: '都営浅草線', count: 5420 },
        ],
      },
      {
        company: '私鉄',
        lines: [
          { value: 'tokyu-toyoko', name: '東急東横線', count: 8920 },
          { value: 'tokyu-denentoshi', name: '東急田園都市線', count: 7650 },
          { value: 'keio', name: '京王線', count: 9240 },
          { value: 'odakyu', name: '小田急小田原線', count: 8130 },
          { value: 'seibu-ikebukuro', name: '西武池袋線', count: 6820 },
          { value: 'seibu-shinjuku', name: '西武新宿線', count: 5430 },
        ],
      },
    ],
    adjacent: [
      { key: 'kanagawa', name: '神奈川' },
      { key: 'saitama', name: '埼玉' },
      { key: 'chiba', name: '千葉' },
      { key: 'yamanashi', name: '山梨' },
    ],
  },

  // ==========================================
  // 近畿地方（主要都市）
  // ==========================================

  osaka: {
    name: '大阪府',
    railways: [
      {
        company: 'JR西日本 ─ JR在来線',
        lines: [
          { value: 'osaka-loop', name: 'JR大阪環状線', count: 15620 },
          { value: 'tokaido-sanyo', name: 'JR東海道・山陽本線', count: 12340 },
          { value: 'hanwa', name: 'JR阪和線', count: 8560 },
          { value: 'kansai', name: 'JR関西本線（大和路線）', count: 6920 },
          { value: 'gakkentoshi', name: 'JR学研都市線', count: 5430 },
        ],
      },
      {
        company: 'Osaka Metro',
        lines: [
          { value: 'midosuji', name: 'Osaka Metro御堂筋線', count: 18240 },
          { value: 'tanimachi', name: 'Osaka Metro谷町線', count: 10830 },
          { value: 'yotsubashi', name: 'Osaka Metro四つ橋線', count: 6520 },
          { value: 'chuo-osaka', name: 'Osaka Metro中央線', count: 5840 },
          { value: 'sakaisuji', name: 'Osaka Metro堺筋線', count: 5230 },
          { value: 'nagahori', name: 'Osaka Metro長堀鶴見緑地線', count: 4920 },
        ],
      },
      {
        company: '私鉄',
        lines: [
          { value: 'hankyu-kobe', name: '阪急神戸本線', count: 7820 },
          { value: 'hankyu-kyoto', name: '阪急京都本線', count: 8450 },
          { value: 'hankyu-takarazuka', name: '阪急宝塚本線', count: 6230 },
          { value: 'hanshin', name: '阪神本線', count: 5640 },
          { value: 'keihan', name: '京阪本線', count: 7920 },
          { value: 'nankai', name: '南海本線', count: 6340 },
          { value: 'kintetsu-osaka', name: '近鉄大阪線', count: 5820 },
        ],
      },
    ],
    adjacent: [
      { key: 'hyogo', name: '兵庫' },
      { key: 'kyoto', name: '京都' },
      { key: 'nara', name: '奈良' },
      { key: 'wakayama', name: '和歌山' },
    ],
  },

  // ==========================================
  // 中部地方（主要都市）
  // ==========================================

  aichi: {
    name: '愛知県',
    railways: [
      {
        company: 'JR東海 ─ JR在来線',
        lines: [
          { value: 'tokaido-aichi', name: 'JR東海道本線', count: 9820 },
          { value: 'chuo-aichi', name: 'JR中央本線', count: 7560 },
          { value: 'kansai-aichi', name: 'JR関西本線', count: 3240 },
          { value: 'taketoyo', name: 'JR武豊線', count: 2860 },
        ],
      },
      {
        company: '名古屋市営地下鉄',
        lines: [
          { value: 'higashiyama', name: '名古屋市営東山線', count: 12450 },
          { value: 'meijo', name: '名古屋市営名城線', count: 8930 },
          { value: 'tsurumai', name: '名古屋市営鶴舞線', count: 6520 },
          { value: 'sakuradori', name: '名古屋市営桜通線', count: 5840 },
          { value: 'kamiiida', name: '名古屋市営上飯田線', count: 1230 },
        ],
      },
      {
        company: '私鉄',
        lines: [
          { value: 'meitetsu-honsen', name: '名鉄名古屋本線', count: 8640 },
          { value: 'meitetsu-inuyama', name: '名鉄犬山線', count: 4320 },
          { value: 'meitetsu-tokoname', name: '名鉄常滑線', count: 3560 },
          { value: 'meitetsu-mikawa', name: '名鉄三河線', count: 3240 },
          { value: 'kintetsu-nagoya', name: '近鉄名古屋線', count: 4180 },
        ],
      },
    ],
    adjacent: [
      { key: 'gifu', name: '岐阜' },
      { key: 'mie', name: '三重' },
      { key: 'shizuoka', name: '静岡' },
      { key: 'nagano', name: '長野' },
    ],
  },

  // ==========================================
  // 九州地方（主要都市）
  // ==========================================

  fukuoka: {
    name: '福岡県',
    railways: [
      {
        company: 'JR九州 ─ JR在来線',
        lines: [
          { value: 'kagoshima-honsen', name: 'JR鹿児島本線', count: 12840 },
          { value: 'nippo', name: 'JR日豊本線', count: 4560 },
          { value: 'chikuho', name: 'JR筑豊本線', count: 2340 },
          { value: 'sasaguri', name: 'JR篠栗線', count: 3120 },
          { value: 'kashii', name: 'JR香椎線', count: 1860 },
        ],
      },
      {
        company: '福岡市地下鉄',
        lines: [
          { value: 'kuko', name: '福岡市地下鉄空港線', count: 8920 },
          { value: 'hakozaki', name: '福岡市地下鉄箱崎線', count: 3450 },
          { value: 'nanakuma', name: '福岡市地下鉄七隈線', count: 4230 },
        ],
      },
      {
        company: '私鉄',
        lines: [
          { value: 'nishitetsu-tenjin', name: '西鉄天神大牟田線', count: 6840 },
          { value: 'nishitetsu-kaizuka', name: '西鉄貝塚線', count: 1820 },
        ],
      },
      {
        company: '新幹線',
        lines: [
          { value: 'sanyo-shinkansen-f', name: 'JR山陽新幹線', count: 3240 },
          { value: 'kyushu-shinkansen', name: 'JR九州新幹線', count: 2180 },
        ],
      },
    ],
    adjacent: [
      { key: 'saga', name: '佐賀' },
      { key: 'kumamoto', name: '熊本' },
      { key: 'oita', name: '大分' },
      { key: 'yamaguchi', name: '山口' },
    ],
  },

  // ==========================================
  // 北海道
  // ==========================================

  hokkaido: {
    name: '北海道',
    railways: [
      {
        company: 'JR北海道 ─ JR在来線',
        lines: [
          { value: 'hakodate', name: 'JR函館本線', count: 8450 },
          { value: 'chitose', name: 'JR千歳線', count: 5620 },
          { value: 'sassho', name: 'JR札沼線（学園都市線）', count: 4230 },
          { value: 'muroran', name: 'JR室蘭本線', count: 2840 },
        ],
      },
      {
        company: '札幌市営地下鉄',
        lines: [
          { value: 'namboku-sapporo', name: '札幌市営南北線', count: 7820 },
          { value: 'tozai-sapporo', name: '札幌市営東西線', count: 6540 },
          { value: 'toho', name: '札幌市営東豊線', count: 5230 },
        ],
      },
      {
        company: '路面電車',
        lines: [
          { value: 'shiden', name: '札幌市電', count: 2340 },
        ],
      },
    ],
    adjacent: [
      { key: 'aomori', name: '青森（新幹線利用）' },
    ],
  },

  // ==========================================
  // 中国地方（主要都市）
  // ==========================================

  hiroshima: {
    name: '広島県',
    railways: [
      {
        company: '西日本旅客鉄道 (JR) ─ JR在来線',
        lines: [
          { value: 'sanyo', name: 'JR山陽本線(神戸〜門司)', count: 6836 },
          { value: 'kure', name: 'JR呉線', count: 1301 },
          { value: 'takehara', name: 'JR高松線', count: 3702 },
          { value: 'geibi', name: 'JR芸備線', count: 1810 },
          { value: 'fukuen', name: 'JR可部線', count: 2185 },
          { value: 'kisuki', name: 'JR木次線', count: 0 },
        ],
      },
      {
        company: '新幹線',
        lines: [
          { value: 'shinkansen', name: 'JR山陽新幹線', count: 2912 },
        ],
      },
      {
        company: '井原鉄道',
        lines: [
          { value: 'ibara', name: '井原鉄道', count: 309 },
        ],
      },
      {
        company: '広島高速交通',
        lines: [
          { value: 'astram', name: '広島高速交通アストラムライン', count: 1492 },
        ],
      },
      {
        company: '広島電鉄',
        lines: [
          { value: 'hiroden-miyajima', name: '広島電鉄宮島線', count: 1332 },
          { value: 'hiroden-honsen', name: '広島電鉄本線', count: 1516 },
          { value: 'hiroden-ujina', name: '広島電鉄宇品線', count: 938 },
          { value: 'hiroden-yokogawa', name: '広島電鉄横川線', count: 120 },
          { value: 'hiroden-hakushima', name: '広島電鉄白島線', count: 863 },
          { value: 'hiroden-eba', name: '広島電鉄江波線', count: 804 },
        ],
      },
    ],
    adjacent: [
      { key: 'okayama', name: '岡山' },
      { key: 'yamaguchi', name: '山口' },
      { key: 'shimane', name: '島根' },
      { key: 'tottori', name: '鳥取' },
      { key: 'ehime', name: '愛媛' },
    ],
  },

  // --- 関東地方（続き） ---

  kanagawa: {
    name: '神奈川県',
    railways: [
      {
        company: 'JR東日本 ─ JR在来線',
        lines: [
          { value: 'tokaido-kanagawa', name: 'JR東海道本線', count: 9840 },
          { value: 'yokosuka', name: 'JR横須賀線', count: 6520 },
          { value: 'negishi', name: 'JR根岸線', count: 4830 },
          { value: 'nambu', name: 'JR南武線', count: 7240 },
          { value: 'yokohama', name: 'JR横浜線', count: 5620 },
        ],
      },
      {
        company: '横浜市営地下鉄',
        lines: [
          { value: 'blue-line', name: '横浜市営ブルーライン', count: 8430 },
          { value: 'green-line', name: '横浜市営グリーンライン', count: 3560 },
        ],
      },
      {
        company: '私鉄',
        lines: [
          { value: 'tokyu-toyoko-k', name: '東急東横線', count: 6520 },
          { value: 'tokyu-denentoshi-k', name: '東急田園都市線', count: 5830 },
          { value: 'keikyu', name: '京急本線', count: 7240 },
          { value: 'sotetsu', name: '相鉄本線', count: 4560 },
          { value: 'odakyu-kanagawa', name: '小田急線', count: 5940 },
        ],
      },
    ],
    adjacent: [
      { key: 'tokyo', name: '東京' },
      { key: 'saitama', name: '埼玉' },
      { key: 'chiba', name: '千葉' },
      { key: 'shizuoka', name: '静岡' },
    ],
  },

  saitama: {
    name: '埼玉県',
    railways: [
      {
        company: 'JR東日本 ─ JR在来線',
        lines: [
          { value: 'takasaki', name: 'JR高崎線', count: 8340 },
          { value: 'utsunomiya', name: 'JR宇都宮線（上野東京ライン）', count: 7560 },
          { value: 'saikyo-saitama', name: 'JR埼京線', count: 6840 },
          { value: 'keihin-saitama', name: 'JR京浜東北線', count: 5430 },
          { value: 'musashino', name: 'JR武蔵野線', count: 6120 },
        ],
      },
      {
        company: '私鉄・その他',
        lines: [
          { value: 'tobu-tojo', name: '東武東上線', count: 7240 },
          { value: 'tobu-isesaki', name: '東武伊勢崎線（東武スカイツリーライン）', count: 5840 },
          { value: 'seibu-ikebukuro-s', name: '西武池袋線', count: 4560 },
          { value: 'seibu-shinjuku-s', name: '西武新宿線', count: 3920 },
          { value: 'saitama-railway', name: '埼玉高速鉄道', count: 3240 },
        ],
      },
    ],
    adjacent: [
      { key: 'tokyo', name: '東京' },
      { key: 'kanagawa', name: '神奈川' },
      { key: 'chiba', name: '千葉' },
      { key: 'gunma', name: '群馬' },
      { key: 'tochigi', name: '栃木' },
    ],
  },

  chiba: {
    name: '千葉県',
    railways: [
      {
        company: 'JR東日本 ─ JR在来線',
        lines: [
          { value: 'sobu-chiba', name: 'JR総武線', count: 9240 },
          { value: 'keiyo', name: 'JR京葉線', count: 6830 },
          { value: 'joban', name: 'JR常磐線', count: 4560 },
          { value: 'musashino-chiba', name: 'JR武蔵野線', count: 3840 },
          { value: 'uchibo', name: 'JR内房線', count: 3240 },
          { value: 'sotobo', name: 'JR外房線', count: 2860 },
        ],
      },
      {
        company: '私鉄・その他',
        lines: [
          { value: 'keisei', name: '京成本線', count: 5620 },
          { value: 'shin-keisei', name: '新京成線', count: 3240 },
          { value: 'tobu-noda', name: '東武アーバンパークライン', count: 4120 },
          { value: 'hokuso', name: '北総線', count: 2560 },
          { value: 'tsukuba-express', name: 'つくばエクスプレス', count: 3180 },
        ],
      },
    ],
    adjacent: [
      { key: 'tokyo', name: '東京' },
      { key: 'saitama', name: '埼玉' },
      { key: 'ibaraki', name: '茨城' },
    ],
  },

  // --- 近畿地方（続き） ---

  hyogo: {
    name: '兵庫県',
    railways: [
      {
        company: 'JR西日本 ─ JR在来線',
        lines: [
          { value: 'tokaido-hyogo', name: 'JR東海道・山陽本線', count: 10230 },
          { value: 'sanin', name: 'JR山陰本線', count: 2840 },
          { value: 'kakogawa', name: 'JR加古川線', count: 1560 },
          { value: 'bantan', name: 'JR播但線', count: 1240 },
        ],
      },
      {
        company: '神戸市営地下鉄',
        lines: [
          { value: 'seishin-yamate', name: '神戸市営西神・山手線', count: 5840 },
          { value: 'kaigan', name: '神戸市営海岸線', count: 2560 },
        ],
      },
      {
        company: '私鉄',
        lines: [
          { value: 'hankyu-kobe-h', name: '阪急神戸本線', count: 6840 },
          { value: 'hankyu-imazu', name: '阪急今津線', count: 2340 },
          { value: 'hanshin-honsen', name: '阪神本線', count: 5240 },
          { value: 'sanyo-dentetsu', name: '山陽電鉄本線', count: 3840 },
        ],
      },
    ],
    adjacent: [
      { key: 'osaka', name: '大阪' },
      { key: 'kyoto', name: '京都' },
      { key: 'okayama', name: '岡山' },
      { key: 'tottori', name: '鳥取' },
    ],
  },

  kyoto: {
    name: '京都府',
    railways: [
      {
        company: 'JR西日本 ─ JR在来線',
        lines: [
          { value: 'tokaido-kyoto', name: 'JR東海道・山陽本線', count: 6840 },
          { value: 'sanin-kyoto', name: 'JR山陰本線（嵯峨野線）', count: 4560 },
          { value: 'nara-kyoto', name: 'JR奈良線', count: 3240 },
          { value: 'kosei', name: 'JR湖西線', count: 1860 },
        ],
      },
      {
        company: '京都市営地下鉄',
        lines: [
          { value: 'karasuma', name: '京都市営烏丸線', count: 7240 },
          { value: 'tozai-kyoto', name: '京都市営東西線', count: 4830 },
        ],
      },
      {
        company: '私鉄',
        lines: [
          { value: 'hankyu-kyoto-k', name: '阪急京都本線', count: 5620 },
          { value: 'keihan-kyoto', name: '京阪本線', count: 6240 },
          { value: 'kintetsu-kyoto', name: '近鉄京都線', count: 3840 },
          { value: 'eizan', name: '叡山電鉄', count: 1240 },
        ],
      },
    ],
    adjacent: [
      { key: 'osaka', name: '大阪' },
      { key: 'hyogo', name: '兵庫' },
      { key: 'nara', name: '奈良' },
      { key: 'shiga', name: '滋賀' },
    ],
  },

  // ==========================================
  // 東北地方
  // ==========================================

  aomori: {
    name: '青森県',
    railways: [
      {
        company: 'JR東日本',
        lines: [
          { value: 'ou-aomori', name: 'JR奥羽本線', count: 2840 },
          { value: 'tohoku-aomori', name: 'JR東北本線', count: 2120 },
          { value: 'gono', name: 'JR五能線', count: 680 },
          { value: 'tsugaru', name: 'JR津軽線', count: 420 },
        ],
      },
      {
        company: '青い森鉄道',
        lines: [
          { value: 'aoimori', name: '青い森鉄道線', count: 1860 },
        ],
      },
      {
        company: '弘南鉄道',
        lines: [
          { value: 'konan-ohwani', name: '弘南鉄道大鰐線', count: 340 },
          { value: 'konan-hirosaki', name: '弘南鉄道弘南線', count: 520 },
        ],
      },
    ],
    adjacent: [
      { key: 'hokkaido', name: '北海道' },
      { key: 'iwate', name: '岩手' },
      { key: 'akita', name: '秋田' },
    ],
  },

  iwate: {
    name: '岩手県',
    railways: [
      {
        company: 'JR東日本',
        lines: [
          { value: 'tohoku-iwate', name: 'JR東北本線', count: 2640 },
          { value: 'kamaishi', name: 'JR釜石線', count: 580 },
          { value: 'tazawako', name: 'JR田沢湖線', count: 460 },
          { value: 'yamada', name: 'JR山田線', count: 320 },
        ],
      },
      {
        company: 'IGRいわて銀河鉄道',
        lines: [
          { value: 'igr', name: 'IGRいわて銀河鉄道線', count: 1540 },
        ],
      },
    ],
    adjacent: [
      { key: 'aomori', name: '青森' },
      { key: 'miyagi', name: '宮城' },
      { key: 'akita', name: '秋田' },
    ],
  },

  miyagi: {
    name: '宮城県',
    railways: [
      {
        company: 'JR東日本',
        lines: [
          { value: 'tohoku-miyagi', name: 'JR東北本線', count: 8420 },
          { value: 'senseki', name: 'JR仙石線', count: 4560 },
          { value: 'senzan', name: 'JR仙山線', count: 2840 },
          { value: 'joban-miyagi', name: 'JR常磐線', count: 1620 },
        ],
      },
      {
        company: '仙台市営地下鉄',
        lines: [
          { value: 'sendai-namboku', name: '仙台市営南北線', count: 6240 },
          { value: 'sendai-tozai', name: '仙台市営東西線', count: 3820 },
        ],
      },
    ],
    adjacent: [
      { key: 'iwate', name: '岩手' },
      { key: 'akita', name: '秋田' },
      { key: 'yamagata', name: '山形' },
      { key: 'fukushima', name: '福島' },
    ],
  },

  akita: {
    name: '秋田県',
    railways: [
      {
        company: 'JR東日本',
        lines: [
          { value: 'ou-akita', name: 'JR奥羽本線', count: 2460 },
          { value: 'uetsu', name: 'JR羽越本線', count: 1240 },
          { value: 'oga', name: 'JR男鹿線', count: 380 },
          { value: 'tazawako-akita', name: 'JR田沢湖線（秋田新幹線）', count: 860 },
        ],
      },
      {
        company: '秋田内陸縦貫鉄道',
        lines: [
          { value: 'nairiku', name: '秋田内陸線', count: 240 },
        ],
      },
    ],
    adjacent: [
      { key: 'aomori', name: '青森' },
      { key: 'iwate', name: '岩手' },
      { key: 'miyagi', name: '宮城' },
      { key: 'yamagata', name: '山形' },
    ],
  },

  yamagata: {
    name: '山形県',
    railways: [
      {
        company: 'JR東日本',
        lines: [
          { value: 'ou-yamagata', name: 'JR奥羽本線（山形新幹線）', count: 3240 },
          { value: 'senzan-yamagata', name: 'JR仙山線', count: 1860 },
          { value: 'aterazawa', name: 'JR左沢線', count: 620 },
          { value: 'rikuu-west', name: 'JR陸羽西線', count: 280 },
        ],
      },
      {
        company: '山形鉄道',
        lines: [
          { value: 'flower-nagai', name: '山形鉄道フラワー長井線', count: 180 },
        ],
      },
    ],
    adjacent: [
      { key: 'akita', name: '秋田' },
      { key: 'miyagi', name: '宮城' },
      { key: 'fukushima', name: '福島' },
      { key: 'niigata', name: '新潟' },
    ],
  },

  fukushima: {
    name: '福島県',
    railways: [
      {
        company: 'JR東日本',
        lines: [
          { value: 'tohoku-fukushima', name: 'JR東北本線', count: 4620 },
          { value: 'ban-etsu-west', name: 'JR磐越西線', count: 1840 },
          { value: 'ban-etsu-east', name: 'JR磐越東線', count: 680 },
          { value: 'joban-fukushima', name: 'JR常磐線', count: 2240 },
        ],
      },
      {
        company: '福島交通',
        lines: [
          { value: 'iizaka', name: '福島交通飯坂線', count: 860 },
        ],
      },
      {
        company: '阿武隈急行',
        lines: [
          { value: 'abukuma', name: '阿武隈急行線', count: 640 },
        ],
      },
    ],
    adjacent: [
      { key: 'miyagi', name: '宮城' },
      { key: 'yamagata', name: '山形' },
      { key: 'ibaraki', name: '茨城' },
      { key: 'tochigi', name: '栃木' },
      { key: 'niigata', name: '新潟' },
    ],
  },

  // ==========================================
  // 関東地方（残り）
  // ==========================================

  ibaraki: {
    name: '茨城県',
    railways: [
      {
        company: 'JR東日本',
        lines: [
          { value: 'joban-ibaraki', name: 'JR常磐線', count: 7840 },
          { value: 'mito', name: 'JR水戸線', count: 2120 },
          { value: 'suigun', name: 'JR水郡線', count: 860 },
        ],
      },
      {
        company: 'つくばエクスプレス',
        lines: [
          { value: 'tx-ibaraki', name: 'つくばエクスプレス', count: 4560 },
        ],
      },
      {
        company: '関東鉄道',
        lines: [
          { value: 'joso', name: '関東鉄道常総線', count: 1840 },
        ],
      },
    ],
    adjacent: [
      { key: 'fukushima', name: '福島' },
      { key: 'tochigi', name: '栃木' },
      { key: 'saitama', name: '埼玉' },
      { key: 'chiba', name: '千葉' },
    ],
  },

  tochigi: {
    name: '栃木県',
    railways: [
      {
        company: 'JR東日本',
        lines: [
          { value: 'utsunomiya-tochigi', name: 'JR宇都宮線（東北本線）', count: 5840 },
          { value: 'nikko', name: 'JR日光線', count: 1240 },
          { value: 'ryomo-tochigi', name: 'JR両毛線', count: 1620 },
        ],
      },
      {
        company: '東武鉄道',
        lines: [
          { value: 'tobu-nikko', name: '東武日光線', count: 2840 },
          { value: 'tobu-utsunomiya', name: '東武宇都宮線', count: 1560 },
        ],
      },
    ],
    adjacent: [
      { key: 'fukushima', name: '福島' },
      { key: 'ibaraki', name: '茨城' },
      { key: 'saitama', name: '埼玉' },
      { key: 'gunma', name: '群馬' },
    ],
  },

  gunma: {
    name: '群馬県',
    railways: [
      {
        company: 'JR東日本',
        lines: [
          { value: 'takasaki-gunma', name: 'JR高崎線', count: 4620 },
          { value: 'ryomo', name: 'JR両毛線', count: 2240 },
          { value: 'joetsu', name: 'JR上越線', count: 1460 },
          { value: 'agatsuma', name: 'JR吾妻線', count: 680 },
        ],
      },
      {
        company: '東武鉄道',
        lines: [
          { value: 'tobu-isesaki-gunma', name: '東武伊勢崎線', count: 2840 },
        ],
      },
      {
        company: '上信電鉄',
        lines: [
          { value: 'joshin', name: '上信電鉄線', count: 620 },
        ],
      },
    ],
    adjacent: [
      { key: 'fukushima', name: '福島' },
      { key: 'tochigi', name: '栃木' },
      { key: 'saitama', name: '埼玉' },
      { key: 'nagano', name: '長野' },
      { key: 'niigata', name: '新潟' },
    ],
  },

  // ==========================================
  // 中部地方（残り）
  // ==========================================

  niigata: {
    name: '新潟県',
    railways: [
      {
        company: 'JR東日本',
        lines: [
          { value: 'shinetsu', name: 'JR信越本線', count: 4240 },
          { value: 'hakushin', name: 'JR白新線', count: 2860 },
          { value: 'echigo', name: 'JR越後線', count: 1640 },
          { value: 'joetsu-niigata', name: 'JR上越線', count: 1240 },
        ],
      },
      {
        company: '新幹線',
        lines: [
          { value: 'joetsu-shinkansen', name: 'JR上越新幹線', count: 2840 },
        ],
      },
    ],
    adjacent: [
      { key: 'yamagata', name: '山形' },
      { key: 'fukushima', name: '福島' },
      { key: 'gunma', name: '群馬' },
      { key: 'nagano', name: '長野' },
      { key: 'toyama', name: '富山' },
    ],
  },

  toyama: {
    name: '富山県',
    railways: [
      {
        company: 'あいの風とやま鉄道',
        lines: [
          { value: 'ainokaze', name: 'あいの風とやま鉄道線', count: 3420 },
        ],
      },
      {
        company: '富山地方鉄道',
        lines: [
          { value: 'chiho-honsen', name: '富山地方鉄道本線', count: 1240 },
          { value: 'chiho-tateyama', name: '富山地方鉄道立山線', count: 680 },
        ],
      },
      {
        company: '富山ライトレール・市内電車',
        lines: [
          { value: 'toyama-tram', name: '富山市内電車', count: 1860 },
        ],
      },
      {
        company: '新幹線',
        lines: [
          { value: 'hokuriku-shinkansen-toyama', name: 'JR北陸新幹線', count: 2240 },
        ],
      },
    ],
    adjacent: [
      { key: 'niigata', name: '新潟' },
      { key: 'nagano', name: '長野' },
      { key: 'ishikawa', name: '石川' },
      { key: 'gifu', name: '岐阜' },
    ],
  },

  ishikawa: {
    name: '石川県',
    railways: [
      {
        company: 'IRいしかわ鉄道',
        lines: [
          { value: 'ir-ishikawa', name: 'IRいしかわ鉄道線', count: 3240 },
        ],
      },
      {
        company: 'JR西日本',
        lines: [
          { value: 'nanao', name: 'JR七尾線', count: 1060 },
        ],
      },
      {
        company: '北陸鉄道',
        lines: [
          { value: 'hokutetsu-asanogawa', name: '北陸鉄道浅野川線', count: 640 },
          { value: 'hokutetsu-ishikawa', name: '北陸鉄道石川線', count: 520 },
        ],
      },
      {
        company: '新幹線',
        lines: [
          { value: 'hokuriku-shinkansen-ishikawa', name: 'JR北陸新幹線', count: 2460 },
        ],
      },
    ],
    adjacent: [
      { key: 'toyama', name: '富山' },
      { key: 'fukui', name: '福井' },
    ],
  },

  fukui: {
    name: '福井県',
    railways: [
      {
        company: 'ハピラインふくい',
        lines: [
          { value: 'hapline', name: 'ハピラインふくい線', count: 2640 },
        ],
      },
      {
        company: 'えちぜん鉄道',
        lines: [
          { value: 'echizen-katsuyama', name: 'えちぜん鉄道勝山永平寺線', count: 680 },
          { value: 'echizen-mikuni', name: 'えちぜん鉄道三国芦原線', count: 540 },
        ],
      },
      {
        company: '福井鉄道',
        lines: [
          { value: 'fukutetsu', name: '福井鉄道福武線', count: 460 },
        ],
      },
      {
        company: 'JR西日本',
        lines: [
          { value: 'obama', name: 'JR小浜線', count: 380 },
        ],
      },
    ],
    adjacent: [
      { key: 'ishikawa', name: '石川' },
      { key: 'gifu', name: '岐阜' },
      { key: 'shiga', name: '滋賀' },
      { key: 'kyoto', name: '京都' },
    ],
  },

  yamanashi: {
    name: '山梨県',
    railways: [
      {
        company: 'JR東日本・JR東海',
        lines: [
          { value: 'chuo-yamanashi', name: 'JR中央本線', count: 3840 },
          { value: 'minobu', name: 'JR身延線', count: 1240 },
        ],
      },
      {
        company: '富士急行',
        lines: [
          { value: 'fujikyu', name: '富士急行線', count: 860 },
        ],
      },
    ],
    adjacent: [
      { key: 'tokyo', name: '東京' },
      { key: 'saitama', name: '埼玉' },
      { key: 'nagano', name: '長野' },
      { key: 'shizuoka', name: '静岡' },
    ],
  },

  nagano: {
    name: '長野県',
    railways: [
      {
        company: 'JR東日本・JR東海',
        lines: [
          { value: 'chuo-nagano', name: 'JR中央本線', count: 3640 },
          { value: 'shinonoi', name: 'JR篠ノ井線', count: 2460 },
          { value: 'oito', name: 'JR大糸線', count: 860 },
          { value: 'iida', name: 'JR飯田線', count: 1240 },
        ],
      },
      {
        company: 'しなの鉄道',
        lines: [
          { value: 'shinano', name: 'しなの鉄道線', count: 2640 },
          { value: 'shinano-kita', name: 'しなの鉄道北しなの線', count: 1040 },
        ],
      },
      {
        company: '長野電鉄',
        lines: [
          { value: 'nagaden', name: '長野電鉄長野線', count: 1460 },
        ],
      },
      {
        company: '新幹線',
        lines: [
          { value: 'hokuriku-shinkansen-nagano', name: 'JR北陸新幹線', count: 2860 },
        ],
      },
    ],
    adjacent: [
      { key: 'gunma', name: '群馬' },
      { key: 'saitama', name: '埼玉' },
      { key: 'yamanashi', name: '山梨' },
      { key: 'shizuoka', name: '静岡' },
      { key: 'aichi', name: '愛知' },
      { key: 'gifu', name: '岐阜' },
      { key: 'niigata', name: '新潟' },
      { key: 'toyama', name: '富山' },
    ],
  },

  gifu: {
    name: '岐阜県',
    railways: [
      {
        company: 'JR東海',
        lines: [
          { value: 'tokaido-gifu', name: 'JR東海道本線', count: 4860 },
          { value: 'takayama', name: 'JR高山本線', count: 1640 },
        ],
      },
      {
        company: '名鉄',
        lines: [
          { value: 'meitetsu-kakamigahara', name: '名鉄各務原線', count: 2240 },
          { value: 'meitetsu-hiromi', name: '名鉄広見線', count: 1060 },
        ],
      },
    ],
    adjacent: [
      { key: 'toyama', name: '富山' },
      { key: 'nagano', name: '長野' },
      { key: 'aichi', name: '愛知' },
      { key: 'shiga', name: '滋賀' },
      { key: 'mie', name: '三重' },
      { key: 'fukui', name: '福井' },
    ],
  },

  shizuoka: {
    name: '静岡県',
    railways: [
      {
        company: 'JR東海',
        lines: [
          { value: 'tokaido-shizuoka', name: 'JR東海道本線', count: 8640 },
          { value: 'gotemba', name: 'JR御殿場線', count: 1860 },
          { value: 'minobu-shizuoka', name: 'JR身延線', count: 840 },
        ],
      },
      {
        company: '静岡鉄道',
        lines: [
          { value: 'shizutetsu', name: '静岡鉄道静岡清水線', count: 2640 },
        ],
      },
      {
        company: '遠州鉄道',
        lines: [
          { value: 'enshu', name: '遠州鉄道鉄道線', count: 1860 },
        ],
      },
      {
        company: '伊豆急行',
        lines: [
          { value: 'izukyu', name: '伊豆急行線', count: 1240 },
        ],
      },
      {
        company: '新幹線',
        lines: [
          { value: 'tokaido-shinkansen-shizuoka', name: 'JR東海道新幹線', count: 3840 },
        ],
      },
    ],
    adjacent: [
      { key: 'kanagawa', name: '神奈川' },
      { key: 'yamanashi', name: '山梨' },
      { key: 'nagano', name: '長野' },
      { key: 'aichi', name: '愛知' },
    ],
  },

  // ==========================================
  // 近畿地方（残り）
  // ==========================================

  mie: {
    name: '三重県',
    railways: [
      {
        company: 'JR東海',
        lines: [
          { value: 'kansai-mie', name: 'JR関西本線', count: 2840 },
          { value: 'kisei-mie', name: 'JR紀勢本線', count: 1460 },
          { value: 'sangu', name: 'JR参宮線', count: 640 },
        ],
      },
      {
        company: '近鉄',
        lines: [
          { value: 'kintetsu-nagoya-mie', name: '近鉄名古屋線', count: 4240 },
          { value: 'kintetsu-osaka-mie', name: '近鉄大阪線', count: 2460 },
          { value: 'kintetsu-yamada', name: '近鉄山田線', count: 1640 },
          { value: 'kintetsu-suzuka', name: '近鉄鈴鹿線', count: 520 },
        ],
      },
      {
        company: '伊勢鉄道',
        lines: [
          { value: 'ise-railway', name: '伊勢鉄道伊勢線', count: 680 },
        ],
      },
    ],
    adjacent: [
      { key: 'aichi', name: '愛知' },
      { key: 'gifu', name: '岐阜' },
      { key: 'shiga', name: '滋賀' },
      { key: 'kyoto', name: '京都' },
      { key: 'nara', name: '奈良' },
      { key: 'wakayama', name: '和歌山' },
    ],
  },

  shiga: {
    name: '滋賀県',
    railways: [
      {
        company: 'JR西日本',
        lines: [
          { value: 'biwako', name: 'JR東海道本線（琵琶湖線）', count: 5640 },
          { value: 'kosei-shiga', name: 'JR湖西線', count: 2840 },
          { value: 'kusatsu', name: 'JR草津線', count: 1460 },
        ],
      },
      {
        company: '近江鉄道',
        lines: [
          { value: 'ohmi', name: '近江鉄道本線', count: 1240 },
        ],
      },
      {
        company: '京阪電鉄',
        lines: [
          { value: 'keihan-ishiyama', name: '京阪石山坂本線', count: 1640 },
        ],
      },
    ],
    adjacent: [
      { key: 'kyoto', name: '京都' },
      { key: 'mie', name: '三重' },
      { key: 'gifu', name: '岐阜' },
      { key: 'fukui', name: '福井' },
    ],
  },

  nara: {
    name: '奈良県',
    railways: [
      {
        company: 'JR西日本',
        lines: [
          { value: 'yamatoji', name: 'JR関西本線（大和路線）', count: 4240 },
          { value: 'sakurai', name: 'JR桜井線（万葉まほろば線）', count: 1060 },
          { value: 'wakayama-nara', name: 'JR和歌山線', count: 680 },
        ],
      },
      {
        company: '近鉄',
        lines: [
          { value: 'kintetsu-nara', name: '近鉄奈良線', count: 5840 },
          { value: 'kintetsu-osaka-nara', name: '近鉄大阪線', count: 3420 },
          { value: 'kintetsu-kashihara', name: '近鉄橿原線', count: 2240 },
          { value: 'kintetsu-minami-osaka', name: '近鉄南大阪線', count: 1860 },
        ],
      },
    ],
    adjacent: [
      { key: 'osaka', name: '大阪' },
      { key: 'kyoto', name: '京都' },
      { key: 'mie', name: '三重' },
      { key: 'wakayama', name: '和歌山' },
    ],
  },

  wakayama: {
    name: '和歌山県',
    railways: [
      {
        company: 'JR西日本',
        lines: [
          { value: 'kisei', name: 'JR紀勢本線（きのくに線）', count: 2840 },
          { value: 'hanwa-wakayama', name: 'JR阪和線', count: 3640 },
          { value: 'wakayama-line', name: 'JR和歌山線', count: 1240 },
        ],
      },
      {
        company: '南海電鉄',
        lines: [
          { value: 'nankai-honsen-wakayama', name: '南海本線', count: 2460 },
          { value: 'nankai-koya', name: '南海高野線', count: 1640 },
        ],
      },
      {
        company: '和歌山電鐵',
        lines: [
          { value: 'wakayama-dentetsu', name: '和歌山電鐵貴志川線', count: 340 },
        ],
      },
    ],
    adjacent: [
      { key: 'osaka', name: '大阪' },
      { key: 'nara', name: '奈良' },
      { key: 'mie', name: '三重' },
    ],
  },

  // ==========================================
  // 中国地方（残り）
  // ==========================================

  tottori: {
    name: '鳥取県',
    railways: [
      {
        company: 'JR西日本',
        lines: [
          { value: 'sanin-tottori', name: 'JR山陰本線', count: 1860 },
          { value: 'inbi', name: 'JR因美線', count: 460 },
        ],
      },
      {
        company: '若桜鉄道',
        lines: [
          { value: 'wakasa', name: '若桜鉄道若桜線', count: 120 },
        ],
      },
    ],
    adjacent: [
      { key: 'hyogo', name: '兵庫' },
      { key: 'okayama', name: '岡山' },
      { key: 'shimane', name: '島根' },
    ],
  },

  shimane: {
    name: '島根県',
    railways: [
      {
        company: 'JR西日本',
        lines: [
          { value: 'sanin-shimane', name: 'JR山陰本線', count: 2240 },
          { value: 'kisuki-shimane', name: 'JR木次線', count: 180 },
        ],
      },
      {
        company: '一畑電車',
        lines: [
          { value: 'ichibata-kita', name: '一畑電車北松江線', count: 620 },
          { value: 'ichibata-taisha', name: '一畑電車大社線', count: 340 },
        ],
      },
    ],
    adjacent: [
      { key: 'tottori', name: '鳥取' },
      { key: 'hiroshima', name: '広島' },
      { key: 'yamaguchi', name: '山口' },
    ],
  },

  okayama: {
    name: '岡山県',
    railways: [
      {
        company: 'JR西日本',
        lines: [
          { value: 'sanyo-okayama', name: 'JR山陽本線', count: 5640 },
          { value: 'seto-ohashi', name: 'JR瀬戸大橋線（本四備讃線）', count: 2840 },
          { value: 'hakubi', name: 'JR伯備線', count: 1460 },
          { value: 'tsuyama', name: 'JR津山線', count: 1240 },
          { value: 'ako', name: 'JR赤穂線', count: 1640 },
        ],
      },
      {
        company: '岡山電気軌道',
        lines: [
          { value: 'okaden', name: '岡山電気軌道（路面電車）', count: 1860 },
        ],
      },
    ],
    adjacent: [
      { key: 'hyogo', name: '兵庫' },
      { key: 'tottori', name: '鳥取' },
      { key: 'hiroshima', name: '広島' },
      { key: 'kagawa', name: '香川' },
    ],
  },

  yamaguchi: {
    name: '山口県',
    railways: [
      {
        company: 'JR西日本',
        lines: [
          { value: 'sanyo-yamaguchi', name: 'JR山陽本線', count: 3840 },
          { value: 'yamaguchi-line', name: 'JR山口線', count: 1060 },
          { value: 'ube', name: 'JR宇部線', count: 860 },
          { value: 'onoda', name: 'JR小野田線', count: 340 },
        ],
      },
      {
        company: '新幹線',
        lines: [
          { value: 'sanyo-shinkansen-yamaguchi', name: 'JR山陽新幹線', count: 2240 },
        ],
      },
    ],
    adjacent: [
      { key: 'hiroshima', name: '広島' },
      { key: 'shimane', name: '島根' },
      { key: 'fukuoka', name: '福岡' },
    ],
  },

  // ==========================================
  // 四国地方
  // ==========================================

  tokushima: {
    name: '徳島県',
    railways: [
      {
        company: 'JR四国',
        lines: [
          { value: 'kotoku', name: 'JR高徳線', count: 2240 },
          { value: 'tokushima-line', name: 'JR徳島線', count: 1460 },
          { value: 'mugi', name: 'JR牟岐線', count: 640 },
          { value: 'naruto', name: 'JR鳴門線', count: 380 },
        ],
      },
    ],
    adjacent: [
      { key: 'kagawa', name: '香川' },
      { key: 'ehime', name: '愛媛' },
      { key: 'kochi', name: '高知' },
    ],
  },

  kagawa: {
    name: '香川県',
    railways: [
      {
        company: 'JR四国',
        lines: [
          { value: 'yosan-kagawa', name: 'JR予讃線', count: 3240 },
          { value: 'kotoku-kagawa', name: 'JR高徳線', count: 2460 },
          { value: 'dosan-kagawa', name: 'JR土讃線', count: 1060 },
        ],
      },
      {
        company: 'ことでん（高松琴平電気鉄道）',
        lines: [
          { value: 'kotoden-kotohira', name: 'ことでん琴平線', count: 1860 },
          { value: 'kotoden-nagao', name: 'ことでん長尾線', count: 1040 },
          { value: 'kotoden-shido', name: 'ことでん志度線', count: 680 },
        ],
      },
    ],
    adjacent: [
      { key: 'tokushima', name: '徳島' },
      { key: 'ehime', name: '愛媛' },
      { key: 'okayama', name: '岡山' },
    ],
  },

  ehime: {
    name: '愛媛県',
    railways: [
      {
        company: 'JR四国',
        lines: [
          { value: 'yosan-ehime', name: 'JR予讃線', count: 3640 },
          { value: 'uchiko', name: 'JR内子線', count: 460 },
        ],
      },
      {
        company: '伊予鉄道',
        lines: [
          { value: 'iyotetsu-takahama', name: '伊予鉄道高浜線', count: 1240 },
          { value: 'iyotetsu-yokogawara', name: '伊予鉄道横河原線', count: 1040 },
          { value: 'iyotetsu-gunchu', name: '伊予鉄道郡中線', count: 680 },
          { value: 'matsuyama-tram', name: '伊予鉄道松山市内電車', count: 2240 },
        ],
      },
    ],
    adjacent: [
      { key: 'tokushima', name: '徳島' },
      { key: 'kagawa', name: '香川' },
      { key: 'kochi', name: '高知' },
      { key: 'hiroshima', name: '広島' },
    ],
  },

  kochi: {
    name: '高知県',
    railways: [
      {
        company: 'JR四国',
        lines: [
          { value: 'dosan', name: 'JR土讃線', count: 2460 },
        ],
      },
      {
        company: '土佐くろしお鉄道',
        lines: [
          { value: 'tosa-nakamura', name: '土佐くろしお鉄道中村線', count: 580 },
          { value: 'tosa-gomen', name: '土佐くろしお鉄道ごめん・なはり線', count: 460 },
        ],
      },
      {
        company: 'とさでん交通',
        lines: [
          { value: 'tosaden', name: 'とさでん交通（路面電車）', count: 1640 },
        ],
      },
    ],
    adjacent: [
      { key: 'tokushima', name: '徳島' },
      { key: 'ehime', name: '愛媛' },
    ],
  },

  // ==========================================
  // 九州・沖縄地方（残り）
  // ==========================================

  saga: {
    name: '佐賀県',
    railways: [
      {
        company: 'JR九州',
        lines: [
          { value: 'nagasaki-saga', name: 'JR長崎本線', count: 2640 },
          { value: 'sasebo', name: 'JR佐世保線', count: 1240 },
          { value: 'karatsu', name: 'JR唐津線', count: 860 },
          { value: 'chikuhi', name: 'JR筑肥線', count: 1460 },
        ],
      },
    ],
    adjacent: [
      { key: 'fukuoka', name: '福岡' },
      { key: 'nagasaki', name: '長崎' },
    ],
  },

  nagasaki: {
    name: '長崎県',
    railways: [
      {
        company: 'JR九州',
        lines: [
          { value: 'nagasaki-honsen', name: 'JR長崎本線', count: 2840 },
          { value: 'omura', name: 'JR大村線', count: 1060 },
        ],
      },
      {
        company: '西九州新幹線',
        lines: [
          { value: 'nishi-kyushu-shinkansen', name: 'JR西九州新幹線', count: 1640 },
        ],
      },
      {
        company: '長崎電気軌道',
        lines: [
          { value: 'nagasaki-tram', name: '長崎電気軌道（路面電車）', count: 2240 },
        ],
      },
    ],
    adjacent: [
      { key: 'saga', name: '佐賀' },
    ],
  },

  kumamoto: {
    name: '熊本県',
    railways: [
      {
        company: 'JR九州',
        lines: [
          { value: 'kagoshima-kumamoto', name: 'JR鹿児島本線', count: 4860 },
          { value: 'hohi', name: 'JR豊肥本線', count: 1640 },
          { value: 'misumi', name: 'JR三角線', count: 420 },
        ],
      },
      {
        company: '熊本市電',
        lines: [
          { value: 'kumamoto-tram', name: '熊本市電（路面電車）', count: 2860 },
        ],
      },
      {
        company: '熊本電気鉄道',
        lines: [
          { value: 'kumaden', name: '熊本電鉄菊池線', count: 640 },
        ],
      },
      {
        company: '新幹線',
        lines: [
          { value: 'kyushu-shinkansen-kumamoto', name: 'JR九州新幹線', count: 2460 },
        ],
      },
    ],
    adjacent: [
      { key: 'fukuoka', name: '福岡' },
      { key: 'oita', name: '大分' },
      { key: 'miyazaki', name: '宮崎' },
      { key: 'kagoshima', name: '鹿児島' },
    ],
  },

  oita: {
    name: '大分県',
    railways: [
      {
        company: 'JR九州',
        lines: [
          { value: 'nippo-oita', name: 'JR日豊本線', count: 3840 },
          { value: 'kyudai', name: 'JR久大本線', count: 1460 },
          { value: 'hohi-oita', name: 'JR豊肥本線', count: 1060 },
        ],
      },
    ],
    adjacent: [
      { key: 'fukuoka', name: '福岡' },
      { key: 'kumamoto', name: '熊本' },
      { key: 'miyazaki', name: '宮崎' },
    ],
  },

  miyazaki: {
    name: '宮崎県',
    railways: [
      {
        company: 'JR九州',
        lines: [
          { value: 'nippo-miyazaki', name: 'JR日豊本線', count: 2640 },
          { value: 'nichinan', name: 'JR日南線', count: 680 },
          { value: 'kitto', name: 'JR吉都線', count: 320 },
        ],
      },
    ],
    adjacent: [
      { key: 'oita', name: '大分' },
      { key: 'kumamoto', name: '熊本' },
      { key: 'kagoshima', name: '鹿児島' },
    ],
  },

  kagoshima: {
    name: '鹿児島県',
    railways: [
      {
        company: 'JR九州',
        lines: [
          { value: 'kagoshima-honsen-k', name: 'JR鹿児島本線', count: 3640 },
          { value: 'nippo-kagoshima', name: 'JR日豊本線', count: 1860 },
          { value: 'ibusuki', name: 'JR指宿枕崎線', count: 860 },
        ],
      },
      {
        company: '鹿児島市電',
        lines: [
          { value: 'kagoshima-tram', name: '鹿児島市電（路面電車）', count: 2460 },
        ],
      },
      {
        company: '肥薩おれんじ鉄道',
        lines: [
          { value: 'hisatsu-orange', name: '肥薩おれんじ鉄道線', count: 460 },
        ],
      },
      {
        company: '新幹線',
        lines: [
          { value: 'kyushu-shinkansen-kagoshima', name: 'JR九州新幹線', count: 2860 },
        ],
      },
    ],
    adjacent: [
      { key: 'kumamoto', name: '熊本' },
      { key: 'miyazaki', name: '宮崎' },
    ],
  },

  okinawa: {
    name: '沖縄県',
    railways: [
      {
        company: '沖縄都市モノレール',
        lines: [
          { value: 'yui-rail', name: 'ゆいレール', count: 4860 },
        ],
      },
    ],
    adjacent: [
      { key: 'kagoshima', name: '鹿児島（航空便）' },
    ],
  },
}

/**
 * ドロップダウン用の都道府県リスト
 * STATION_DATA に登録されている都道府県のみ、PrefectureData から自動生成
 * 地域順 → JIS X 0401 順でソートし、一貫した表示順を保証
 */
const prefKeyOrder = Object.keys(PREFECTURES)

export const PREFECTURE_LIST = Object.keys(STATION_DATA)
  .map((key) => ({
    key,
    name: PREFECTURES[key]?.name || STATION_DATA[key].name,
    region: PREFECTURES[key]?.region || '',
  }))
  .sort((a, b) => {
    const ra = REGION_ORDER.indexOf(a.region)
    const rb = REGION_ORDER.indexOf(b.region)
    if (ra !== rb) return ra - rb
    // 同一地域内は PrefectureData の定義順（JIS X 0401 順）
    return prefKeyOrder.indexOf(a.key) - prefKeyOrder.indexOf(b.key)
  })

export default STATION_DATA
