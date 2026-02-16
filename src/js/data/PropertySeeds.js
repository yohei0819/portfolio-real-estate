/**
 * 物件シードデータ
 *
 * PropertyFactory.expandSeeds() で完全な物件オブジェクトに展開される。
 * 各シードは ~10行 のコンパクトな定義で済み、floorplan / initialCosts /
 * nearby / company / gradient / similarIds 等は自動生成される。
 *
 * ■ 物件追加方法:
 *   1. このファイルの SEEDS 配列にシードを追加
 *   2. 必要に応じて badge / gradient / parking 等を明示指定
 *   3. 保存 → ビルド完了（他ファイル変更不要）
 *
 * ■ ID について:
 *   実際のIDは PropertyData.js の既存最大ID+1 から自動採番されます。
 *   コメント内の番号は参考値です。
 *
 * ■ 必須フィールド:
 *   name, areaKey, prefecture, city, address, station,
 *   totalFloors, floor, direction,
 *   price, managementFee, depositMonths, keyMoneyMonths,
 *   type, layout, area, buildDate, features
 */

const SEEDS = [
  // ==========================================
  // 北海道・東北
  // ==========================================

  // 24: 北海道 旭川
  {
    name: 'アーバンコート旭川',
    areaKey: 'hokkaido',
    prefecture: '北海道',
    city: '旭川市',
    address: '北海道旭川市宮下通',
    station: '旭川駅まで徒歩7分',
    totalFloors: 8, floor: 4, direction: '南西',
    price: 4.2, managementFee: 3500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 38.5, buildDate: '2021年3月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '温水洗浄便座', '追い焚き風呂', '灯油暖房', '二重窓'],
  },

  // 25: 青森
  {
    name: 'ベルフォーレ青森',
    areaKey: 'aomori',
    prefecture: '青森県',
    city: '青森市',
    address: '青森県青森市新町',
    station: '青森駅まで徒歩10分',
    totalFloors: 6, floor: 3, direction: '南',
    price: 4.0, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 28.0, buildDate: '2020年5月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '灯油暖房', '二重窓', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 26: 岩手
  {
    name: 'プレミアム盛岡駅前',
    areaKey: 'iwate',
    prefecture: '岩手県',
    city: '盛岡市',
    address: '岩手県盛岡市盛岡駅前通',
    station: '盛岡駅まで徒歩5分',
    totalFloors: 10, floor: 6, direction: '南東',
    price: 5.0, managementFee: 3500, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 35.0, buildDate: '2022年9月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '宅配ボックス', '温水洗浄便座', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額5,000円）',
    badge: 'NEW',
  },

  // 27: 秋田
  {
    name: 'グリーンパレス秋田',
    areaKey: 'akita',
    prefecture: '秋田県',
    city: '秋田市',
    address: '秋田県秋田市中通',
    station: '秋田駅まで徒歩6分',
    totalFloors: 7, floor: 4, direction: '南',
    price: 3.8, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 26.0, buildDate: '2019年4月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '灯油暖房', '二重窓', '追い焚き風呂'],
  },

  // 28: 山形
  {
    name: 'リバーサイド山形',
    areaKey: 'yamagata',
    prefecture: '山形県',
    city: '山形市',
    address: '山形県山形市香澄町',
    station: '山形駅まで徒歩8分',
    totalFloors: 6, floor: 3, direction: '東',
    price: 4.5, managementFee: 3000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2DK', area: 42.0, buildDate: '2018年7月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額4,000円）',
  },

  // 29: 福島
  {
    name: 'シティハウス郡山',
    areaKey: 'fukushima',
    prefecture: '福島県',
    city: '郡山市',
    address: '福島県郡山市駅前',
    station: '郡山駅まで徒歩4分',
    totalFloors: 12, floor: 8, direction: '南',
    price: 5.5, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2023年2月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '宅配ボックス', '温水洗浄便座', '追い焚き風呂', '室内洗濯機置場'],
    badge: 'おすすめ物件',
  },

  // ==========================================
  // 関東
  // ==========================================

  // 30: 茨城
  {
    name: 'グランドールつくば',
    areaKey: 'ibaraki',
    prefecture: '茨城県',
    city: 'つくば市',
    address: '茨城県つくば市竹園',
    station: 'つくば駅まで徒歩6分',
    totalFloors: 10, floor: 5, direction: '南',
    price: 6.0, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2024年1月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '宅配ボックス', '温水洗浄便座', '室内洗濯機置場', 'インターネット無料'],
    badge: 'NEW',
  },

  // 31: 栃木
  {
    name: 'サンライズ宇都宮',
    areaKey: 'tochigi',
    prefecture: '栃木県',
    city: '宇都宮市',
    address: '栃木県宇都宮市駅前通り',
    station: '宇都宮駅まで徒歩7分',
    totalFloors: 8, floor: 5, direction: '南東',
    price: 5.5, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 38.0, buildDate: '2022年6月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '駐車場あり', '温水洗浄便座', '室内洗濯機置場', '追い焚き風呂'],
    parking: '敷地内（月額5,000円）',
  },

  // 32: 群馬
  {
    name: 'フォレストヒル高崎',
    areaKey: 'gunma',
    prefecture: '群馬県',
    city: '高崎市',
    address: '群馬県高崎市八島町',
    station: '高崎駅まで徒歩5分',
    totalFloors: 9, floor: 4, direction: '南西',
    price: 5.0, managementFee: 3500, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2DK', area: 45.0, buildDate: '2021年11月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '温水洗浄便座', '駐車場あり'],
    parking: '敷地内（月額4,000円）',
  },

  // 33: 東京（追加）
  {
    name: 'ラフィネ品川',
    areaKey: 'tokyo',
    prefecture: '東京都',
    city: '品川区',
    address: '東京都品川区北品川',
    station: '品川駅まで徒歩8分',
    totalFloors: 14, floor: 9, direction: '南',
    price: 11.0, managementFee: 10000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2024年3月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '宅配ボックス', '温水洗浄便座', '浴室乾燥機', 'インターネット無料', '24時間ゴミ出し可'],
    badge: 'NEW',
  },

  // 34: 神奈川（追加）
  {
    name: 'シーブリーズ湘南',
    areaKey: 'kanagawa',
    prefecture: '神奈川県',
    city: '藤沢市',
    address: '神奈川県藤沢市鵠沼海岸',
    station: '藤沢駅まで徒歩12分',
    totalFloors: 5, floor: 3, direction: '南',
    price: 7.5, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 55.0, buildDate: '2020年8月',
    features: ['ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', 'バルコニー広め'],
  },

  // ==========================================
  // 中部
  // ==========================================

  // 35: 富山
  {
    name: 'セレーナ富山',
    areaKey: 'toyama',
    prefecture: '富山県',
    city: '富山市',
    address: '富山県富山市桜町',
    station: '富山駅まで徒歩5分',
    totalFloors: 8, floor: 5, direction: '南',
    price: 4.8, managementFee: 3000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 38.0, buildDate: '2021年5月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '温水洗浄便座', '室内洗濯機置場', '追い焚き風呂', '駐車場あり'],
    parking: '敷地内（月額4,000円）',
  },

  // 36: 石川
  {
    name: 'プレステージ金沢',
    areaKey: 'ishikawa',
    prefecture: '石川県',
    city: '金沢市',
    address: '石川県金沢市広坂',
    station: '金沢駅まで徒歩10分',
    totalFloors: 10, floor: 7, direction: '南東',
    price: 5.5, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 42.0, buildDate: '2023年4月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '温水洗浄便座', '室内洗濯機置場', '宅配ボックス', '追い焚き風呂'],
    badge: 'おすすめ物件',
  },

  // 37: 福井
  {
    name: 'コンフォート福井',
    areaKey: 'fukui',
    prefecture: '福井県',
    city: '福井市',
    address: '福井県福井市中央',
    station: '福井駅まで徒歩6分',
    totalFloors: 7, floor: 3, direction: '南',
    price: 4.0, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 28.0, buildDate: '2020年10月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 38: 山梨
  {
    name: 'グランビュー甲府',
    areaKey: 'yamanashi',
    prefecture: '山梨県',
    city: '甲府市',
    address: '山梨県甲府市丸の内',
    station: '甲府駅まで徒歩5分',
    totalFloors: 9, floor: 6, direction: '南',
    price: 5.0, managementFee: 3500, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 36.0, buildDate: '2022年2月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '温水洗浄便座', '室内洗濯機置場', '追い焚き風呂', '駐車場あり'],
    parking: '敷地内（月額5,000円）',
  },

  // 39: 岐阜
  {
    name: 'リバーフロント岐阜',
    areaKey: 'gifu',
    prefecture: '岐阜県',
    city: '岐阜市',
    address: '岐阜県岐阜市神田町',
    station: '岐阜駅まで徒歩7分',
    totalFloors: 10, floor: 5, direction: '南東',
    price: 5.2, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2DK', area: 45.0, buildDate: '2021年6月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '温水洗浄便座', '駐車場あり'],
    parking: '敷地内（月額5,000円）',
  },

  // 40: 三重
  {
    name: 'カーサ津',
    areaKey: 'mie',
    prefecture: '三重県',
    city: '津市',
    address: '三重県津市羽所町',
    station: '津駅まで徒歩5分',
    totalFloors: 7, floor: 4, direction: '南',
    price: 4.5, managementFee: 3000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 36.0, buildDate: '2020年9月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '追い焚き風呂', '駐車場あり'],
    parking: '敷地内（月額4,000円）',
  },

  // ==========================================
  // 近畿
  // ==========================================

  // 41: 和歌山
  {
    name: 'サニーコート和歌山',
    areaKey: 'wakayama',
    prefecture: '和歌山県',
    city: '和歌山市',
    address: '和歌山県和歌山市友田町',
    station: '和歌山駅まで徒歩4分',
    totalFloors: 8, floor: 5, direction: '南',
    price: 4.5, managementFee: 3000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 38.0, buildDate: '2019年12月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '温水洗浄便座', '室内洗濯機置場', '追い焚き風呂'],
  },

  // 42: 大阪（追加）
  {
    name: 'リヴィエール難波',
    areaKey: 'osaka',
    prefecture: '大阪府',
    city: '大阪市中央区',
    address: '大阪府大阪市中央区難波',
    station: 'なんば駅まで徒歩3分',
    totalFloors: 18, floor: 12, direction: '南西',
    price: 8.5, managementFee: 7000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 38.0, buildDate: '2024年5月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '宅配ボックス', '温水洗浄便座', '浴室乾燥機', 'インターネット無料', '24時間ゴミ出し可'],
    badge: 'NEW',
  },

  // ==========================================
  // 中国・四国
  // ==========================================

  // 43: 鳥取
  {
    name: 'レイクサイド鳥取',
    areaKey: 'tottori',
    prefecture: '鳥取県',
    city: '鳥取市',
    address: '鳥取県鳥取市栄町',
    station: '鳥取駅まで徒歩5分',
    totalFloors: 5, floor: 3, direction: '南',
    price: 3.8, managementFee: 2500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 25.0, buildDate: '2018年3月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 44: 島根
  {
    name: 'ヒルズ松江',
    areaKey: 'shimane',
    prefecture: '島根県',
    city: '松江市',
    address: '島根県松江市朝日町',
    station: '松江駅まで徒歩6分',
    totalFloors: 6, floor: 4, direction: '南東',
    price: 4.2, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1DK', area: 30.0, buildDate: '2020年11月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '追い焚き風呂', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 45: 山口
  {
    name: 'パークレジデンス下関',
    areaKey: 'yamaguchi',
    prefecture: '山口県',
    city: '下関市',
    address: '山口県下関市竹崎町',
    station: '下関駅まで徒歩5分',
    totalFloors: 8, floor: 5, direction: '南',
    price: 4.5, managementFee: 3000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 38.0, buildDate: '2021年7月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '温水洗浄便座', '室内洗濯機置場', '追い焚き風呂'],
  },

  // 46: 徳島
  {
    name: 'ブリーゼ徳島',
    areaKey: 'tokushima',
    prefecture: '徳島県',
    city: '徳島市',
    address: '徳島県徳島市寺島本町',
    station: '徳島駅まで徒歩4分',
    totalFloors: 7, floor: 4, direction: '南',
    price: 4.0, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 26.0, buildDate: '2019年5月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 47: 香川
  {
    name: 'サンポート高松',
    areaKey: 'kagawa',
    prefecture: '香川県',
    city: '高松市',
    address: '香川県高松市サンポート',
    station: '高松駅まで徒歩3分',
    totalFloors: 12, floor: 8, direction: '南',
    price: 5.0, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 38.0, buildDate: '2023年8月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '宅配ボックス', '温水洗浄便座', '室内洗濯機置場', '追い焚き風呂'],
    badge: 'おすすめ物件',
  },

  // 48: 愛媛
  {
    name: 'エルシティ松山',
    areaKey: 'ehime',
    prefecture: '愛媛県',
    city: '松山市',
    address: '愛媛県松山市大街道',
    station: '大街道駅まで徒歩3分',
    totalFloors: 10, floor: 6, direction: '南西',
    price: 4.8, managementFee: 3500, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 36.0, buildDate: '2022年4月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '温水洗浄便座', '室内洗濯機置場', '追い焚き風呂', 'オートロック'],
  },

  // 49: 高知
  {
    name: 'リバーガーデン高知',
    areaKey: 'kochi',
    prefecture: '高知県',
    city: '高知市',
    address: '高知県高知市帯屋町',
    station: 'はりまや橋駅まで徒歩4分',
    totalFloors: 7, floor: 4, direction: '南',
    price: 4.0, managementFee: 2500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 26.0, buildDate: '2020年2月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // ==========================================
  // 九州・沖縄
  // ==========================================

  // 50: 佐賀
  {
    name: 'プラザ佐賀',
    areaKey: 'saga',
    prefecture: '佐賀県',
    city: '佐賀市',
    address: '佐賀県佐賀市駅前中央',
    station: '佐賀駅まで徒歩4分',
    totalFloors: 7, floor: 4, direction: '南',
    price: 4.2, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 35.0, buildDate: '2021年1月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '温水洗浄便座', '室内洗濯機置場', '追い焚き風呂', '駐車場あり'],
    parking: '敷地内（月額4,000円）',
  },

  // 51: 長崎
  {
    name: 'ハーバービュー長崎',
    areaKey: 'nagasaki',
    prefecture: '長崎県',
    city: '長崎市',
    address: '長崎県長崎市大黒町',
    station: '長崎駅まで徒歩5分',
    totalFloors: 10, floor: 7, direction: '南',
    price: 5.0, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 38.0, buildDate: '2023年3月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '温水洗浄便座', '宅配ボックス', '室内洗濯機置場', '追い焚き風呂'],
    badge: 'NEW',
  },

  // 52: 大分
  {
    name: 'スパレジデンス大分',
    areaKey: 'oita',
    prefecture: '大分県',
    city: '大分市',
    address: '大分県大分市中央町',
    station: '大分駅まで徒歩6分',
    totalFloors: 9, floor: 5, direction: '南東',
    price: 4.5, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 36.0, buildDate: '2022年8月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '温水洗浄便座', '室内洗濯機置場', '追い焚き風呂'],
  },

  // 53: 宮崎
  {
    name: 'サンフラワー宮崎',
    areaKey: 'miyazaki',
    prefecture: '宮崎県',
    city: '宮崎市',
    address: '宮崎県宮崎市橘通西',
    station: '宮崎駅まで徒歩8分',
    totalFloors: 7, floor: 4, direction: '南',
    price: 4.0, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 27.0, buildDate: '2019年11月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 54: 鹿児島
  {
    name: 'ヴィラ天文館',
    areaKey: 'kagoshima',
    prefecture: '鹿児島県',
    city: '鹿児島市',
    address: '鹿児島県鹿児島市東千石町',
    station: '天文館通駅まで徒歩3分',
    totalFloors: 10, floor: 6, direction: '南西',
    price: 5.0, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 38.0, buildDate: '2023年6月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '温水洗浄便座', '室内洗濯機置場', '追い焚き風呂', '宅配ボックス'],
    badge: 'おすすめ物件',
  },

  // ==========================================
  // 追加（既存エリア の多様化）
  // ==========================================

  // 55: 愛知（追加 2DK）
  {
    name: 'クレスト栄',
    areaKey: 'aichi',
    prefecture: '愛知県',
    city: '名古屋市中区',
    address: '愛知県名古屋市中区栄',
    station: '栄駅まで徒歩3分',
    totalFloors: 15, floor: 10, direction: '南',
    price: 8.0, managementFee: 6000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '2DK', area: 48.0, buildDate: '2024年2月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '宅配ボックス', '温水洗浄便座', '浴室乾燥機', 'インターネット無料', '24時間ゴミ出し可'],
    badge: 'NEW',
  },

  // 56: 埼玉（追加 2LDK ファミリー向け）
  {
    name: 'ファミーユ大宮',
    areaKey: 'saitama',
    prefecture: '埼玉県',
    city: 'さいたま市大宮区',
    address: '埼玉県さいたま市大宮区桜木町',
    station: '大宮駅まで徒歩6分',
    totalFloors: 12, floor: 8, direction: '南',
    price: 9.5, managementFee: 8000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '2LDK', area: 58.0, buildDate: '2023年10月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '宅配ボックス', '温水洗浄便座', '追い焚き風呂', 'ウォークインクローゼット', '24時間ゴミ出し可'],
    badge: 'おすすめ物件',
  },

  // 57: 千葉（追加 ペット可）
  {
    name: 'ペットガーデン船橋',
    areaKey: 'chiba',
    prefecture: '千葉県',
    city: '船橋市',
    address: '千葉県船橋市本町',
    station: '船橋駅まで徒歩5分',
    totalFloors: 8, floor: 4, direction: '南東',
    price: 7.0, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2022年1月',
    features: ['ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '温水洗浄便座', '室内洗濯機置場', '追い焚き風呂', 'オートロック'],
  },

  // 58: 福岡（追加 一戸建て）
  {
    name: 'メゾン博多',
    areaKey: 'fukuoka',
    prefecture: '福岡県',
    city: '福岡市博多区',
    address: '福岡県福岡市博多区博多駅南',
    station: '博多駅まで徒歩10分',
    totalFloors: 2, floor: 1, direction: '南',
    price: 8.5, managementFee: 0, depositMonths: 2, keyMoneyMonths: 1,
    type: '一戸建て', layout: '3LDK', area: 82.0, buildDate: '2019年4月',
    features: ['ペット可', '駐車場あり', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'システムキッチン', '庭付き'],
    parking: '敷地内（2台分）',
  },

  // ==========================================
  // 追加シード（物件数倍増用）
  // 既存エリアに多様な物件タイプを追加
  // ==========================================

  // --- 北海道・東北 追加 ---

  // 59: 北海道（ファミリー向け）
  {
    name: 'ファミーユ札幌白石',
    areaKey: 'hokkaido',
    prefecture: '北海道',
    city: '札幌市白石区',
    address: '北海道札幌市白石区南郷通',
    station: '南郷7丁目駅まで徒歩4分',
    totalFloors: 11, floor: 6, direction: '南',
    price: 6.8, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 56.0, buildDate: '2023年8月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット', '二重窓'],
    badge: 'おすすめ物件',
  },

  // 60: 北海道（一人暮らし向け）
  {
    name: 'アクティ琴似',
    areaKey: 'hokkaido',
    prefecture: '北海道',
    city: '札幌市西区',
    address: '北海道札幌市西区琴似',
    station: '琴似駅まで徒歩3分',
    totalFloors: 8, floor: 5, direction: '南東',
    price: 4.0, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 25.0, buildDate: '2020年11月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '灯油暖房', '二重窓', 'インターネット無料'],
  },

  // 61: 宮城（デザイナーズ）
  {
    name: 'デザイナーズ仙台一番町',
    areaKey: 'miyagi',
    prefecture: '宮城県',
    city: '仙台市青葉区',
    address: '宮城県仙台市青葉区一番町',
    station: '広瀬通駅まで徒歩3分',
    totalFloors: 15, floor: 11, direction: '南西',
    price: 8.5, managementFee: 7000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 45.0, buildDate: '2025年1月',
    features: ['デザイナーズ', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '浴室乾燥機', '宅配ボックス', 'インターネット無料', '24時間ゴミ出し可'],
    badge: 'NEW',
  },

  // 62: 宮城（ペット可）
  {
    name: 'ペットフレンドリー長町',
    areaKey: 'miyagi',
    prefecture: '宮城県',
    city: '仙台市太白区',
    address: '宮城県仙台市太白区長町南',
    station: '長町南駅まで徒歩5分',
    totalFloors: 6, floor: 3, direction: '南',
    price: 6.0, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2021年6月',
    features: ['ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '温水洗浄便座'],
  },

  // 63: 福島（一戸建て）
  {
    name: 'ガーデンハウス郡山',
    areaKey: 'fukushima',
    prefecture: '福島県',
    city: '郡山市',
    address: '福島県郡山市安積町',
    station: '安積永盛駅まで徒歩10分',
    totalFloors: 2, floor: 1, direction: '南',
    price: 7.0, managementFee: 0, depositMonths: 2, keyMoneyMonths: 1,
    type: '一戸建て', layout: '3LDK', area: 85.0, buildDate: '2020年3月',
    features: ['ペット可', '駐車場あり', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'システムキッチン', '庭付き'],
    parking: '敷地内（2台分）',
  },

  // --- 関東 追加 ---

  // 64: 東京（高級タワー）
  {
    name: 'タワーレジデンス六本木',
    areaKey: 'tokyo',
    prefecture: '東京都',
    city: '港区',
    address: '東京都港区六本木',
    station: '六本木駅まで徒歩2分',
    totalFloors: 40, floor: 28, direction: '南西',
    price: 25.0, managementFee: 20000, depositMonths: 2, keyMoneyMonths: 2,
    type: 'マンション', layout: '2LDK', area: 70.0, buildDate: '2024年11月',
    features: ['タワーマンション', 'デザイナーズ', 'オートロック', 'コンシェルジュ', '宅配ボックス', '浴室乾燥機', 'インターネット無料', '24時間ゴミ出し可', 'ジム付き'],
    badge: 'NEW',
  },

  // 65: 東京（下町）
  {
    name: 'レトロハウス谷根千',
    areaKey: 'tokyo',
    prefecture: '東京都',
    city: '台東区',
    address: '東京都台東区谷中',
    station: '日暮里駅まで徒歩6分',
    totalFloors: 3, floor: 2, direction: '南',
    price: 7.8, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'アパート', layout: '1DK', area: 32.0, buildDate: '2015年4月',
    features: ['リノベーション', 'バス・トイレ別', 'エアコン', 'フローリング', '独立洗面台', '室内洗濯機置場'],
  },

  // 66: 東京（学生向け）
  {
    name: 'スチューデントハイツ高田馬場',
    areaKey: 'tokyo',
    prefecture: '東京都',
    city: '新宿区',
    address: '東京都新宿区高田馬場',
    station: '高田馬場駅まで徒歩4分',
    totalFloors: 8, floor: 5, direction: '東',
    price: 6.5, managementFee: 4000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 22.0, buildDate: '2021年3月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', 'インターネット無料', '宅配ボックス', '室内洗濯機置場'],
  },

  // 67: 神奈川（タワマン）
  {
    name: 'ベイタワー横浜',
    areaKey: 'kanagawa',
    prefecture: '神奈川県',
    city: '横浜市中区',
    address: '神奈川県横浜市中区山下町',
    station: '元町・中華街駅まで徒歩3分',
    totalFloors: 30, floor: 22, direction: '南',
    price: 16.0, managementFee: 15000, depositMonths: 2, keyMoneyMonths: 1,
    type: 'マンション', layout: '2LDK', area: 62.0, buildDate: '2025年3月',
    features: ['タワーマンション', 'オートロック', 'コンシェルジュ', '宅配ボックス', '浴室乾燥機', 'インターネット無料', '24時間ゴミ出し可'],
    badge: 'NEW',
  },

  // 68: 神奈川（ファミリー）
  {
    name: 'パークヒルズ武蔵小杉',
    areaKey: 'kanagawa',
    prefecture: '神奈川県',
    city: '川崎市中原区',
    address: '神奈川県川崎市中原区新丸子東',
    station: '武蔵小杉駅まで徒歩5分',
    totalFloors: 20, floor: 14, direction: '南東',
    price: 14.5, managementFee: 12000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '3LDK', area: 72.0, buildDate: '2023年6月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット', '食洗機', '24時間ゴミ出し可'],
    badge: 'おすすめ物件',
  },

  // 69: 埼玉（一人暮らし）
  {
    name: 'ソレイユ川越',
    areaKey: 'saitama',
    prefecture: '埼玉県',
    city: '川越市',
    address: '埼玉県川越市脇田本町',
    station: '川越駅まで徒歩3分',
    totalFloors: 7, floor: 4, direction: '南',
    price: 5.8, managementFee: 4000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 25.0, buildDate: '2022年5月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '温水洗浄便座', 'インターネット無料'],
  },

  // 70: 埼玉（一戸建て）
  {
    name: 'ガーデンテラス浦和',
    areaKey: 'saitama',
    prefecture: '埼玉県',
    city: 'さいたま市浦和区',
    address: '埼玉県さいたま市浦和区仲町',
    station: '浦和駅まで徒歩8分',
    totalFloors: 2, floor: 1, direction: '南',
    price: 12.0, managementFee: 0, depositMonths: 2, keyMoneyMonths: 1,
    type: '一戸建て', layout: '4LDK', area: 105.0, buildDate: '2021年9月',
    features: ['駐車場あり', 'ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'システムキッチン', '庭付き', '食洗機'],
    parking: '敷地内（2台分）',
  },

  // 71: 千葉（ファミリー）
  {
    name: 'ブライトコート柏の葉',
    areaKey: 'chiba',
    prefecture: '千葉県',
    city: '柏市',
    address: '千葉県柏市若柴',
    station: '柏の葉キャンパス駅まで徒歩4分',
    totalFloors: 15, floor: 10, direction: '南',
    price: 10.5, managementFee: 8000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '3LDK', area: 75.0, buildDate: '2024年4月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット', '食洗機', 'インターネット無料'],
    badge: 'NEW',
  },

  // 72: 茨城（ペット可）
  {
    name: 'ペットハイムつくば',
    areaKey: 'ibaraki',
    prefecture: '茨城県',
    city: 'つくば市',
    address: '茨城県つくば市春日',
    station: 'つくば駅まで徒歩8分',
    totalFloors: 5, floor: 2, direction: '南',
    price: 5.5, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'アパート', layout: '1LDK', area: 42.0, buildDate: '2022年7月',
    features: ['ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額5,000円）',
  },

  // 73: 栃木（ファミリー）
  {
    name: 'グランファミリア宇都宮',
    areaKey: 'tochigi',
    prefecture: '栃木県',
    city: '宇都宮市',
    address: '栃木県宇都宮市東宿郷',
    station: '宇都宮駅まで徒歩10分',
    totalFloors: 10, floor: 7, direction: '南',
    price: 7.5, managementFee: 6000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '2LDK', area: 58.0, buildDate: '2023年11月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット', '駐車場あり'],
    parking: '敷地内（月額5,000円）',
    badge: 'おすすめ物件',
  },

  // --- 中部 追加 ---

  // 74: 愛知（ファミリー）
  {
    name: 'ブランシエラ名古屋',
    areaKey: 'aichi',
    prefecture: '愛知県',
    city: '名古屋市千種区',
    address: '愛知県名古屋市千種区覚王山通',
    station: '覚王山駅まで徒歩3分',
    totalFloors: 12, floor: 8, direction: '南',
    price: 12.0, managementFee: 10000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '3LDK', area: 75.0, buildDate: '2024年6月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット', '食洗機', '24時間ゴミ出し可'],
    badge: 'NEW',
  },

  // 75: 愛知（一人暮らし）
  {
    name: 'アクア金山',
    areaKey: 'aichi',
    prefecture: '愛知県',
    city: '名古屋市中区',
    address: '愛知県名古屋市中区金山',
    station: '金山駅まで徒歩2分',
    totalFloors: 10, floor: 6, direction: '東',
    price: 5.8, managementFee: 4000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 24.0, buildDate: '2021年8月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', 'インターネット無料', '宅配ボックス'],
  },

  // 76: 新潟
  {
    name: 'リバーサイド新潟',
    areaKey: 'niigata',
    prefecture: '新潟県',
    city: '新潟市中央区',
    address: '新潟県新潟市中央区万代',
    station: '新潟駅まで徒歩8分',
    totalFloors: 12, floor: 7, direction: '南',
    price: 5.5, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2022年10月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '温水洗浄便座', '室内洗濯機置場', '追い焚き風呂', '二重窓'],
  },

  // 77: 新潟（ファミリー）
  {
    name: 'グランハート長岡',
    areaKey: 'niigata',
    prefecture: '新潟県',
    city: '長岡市',
    address: '新潟県長岡市大手通',
    station: '長岡駅まで徒歩6分',
    totalFloors: 8, floor: 4, direction: '南東',
    price: 6.0, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 55.0, buildDate: '2021年4月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'ウォークインクローゼット', '駐車場あり', '二重窓'],
    parking: '敷地内（月額4,000円）',
  },

  // 78: 長野
  {
    name: 'アルプスビュー松本',
    areaKey: 'nagano',
    prefecture: '長野県',
    city: '松本市',
    address: '長野県松本市中央',
    station: '松本駅まで徒歩5分',
    totalFloors: 9, floor: 6, direction: '南西',
    price: 5.0, managementFee: 3500, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 38.0, buildDate: '2022年3月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '温水洗浄便座', '室内洗濯機置場', '追い焚き風呂', '駐車場あり'],
    parking: '敷地内（月額5,000円）',
  },

  // 79: 静岡（海の近く）
  {
    name: 'オーシャンフロント清水',
    areaKey: 'shizuoka',
    prefecture: '静岡県',
    city: '静岡市清水区',
    address: '静岡県静岡市清水区真砂町',
    station: '清水駅まで徒歩7分',
    totalFloors: 10, floor: 8, direction: '南',
    price: 6.0, managementFee: 4500, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2023年1月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '温水洗浄便座', '追い焚き風呂', '室内洗濯機置場', '眺望良好'],
    badge: 'おすすめ物件',
  },

  // 80: 静岡（一人暮らし）
  {
    name: 'コンパクトステイ浜松',
    areaKey: 'shizuoka',
    prefecture: '静岡県',
    city: '浜松市中央区',
    address: '静岡県浜松市中央区鍛冶町',
    station: '浜松駅まで徒歩4分',
    totalFloors: 8, floor: 5, direction: '南東',
    price: 4.8, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 24.0, buildDate: '2020年6月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', 'インターネット無料', '駐車場あり'],
    parking: '敷地内（月額5,000円）',
  },

  // 81: 富山（ファミリー）
  {
    name: 'フェリシア富山',
    areaKey: 'toyama',
    prefecture: '富山県',
    city: '富山市',
    address: '富山県富山市牛島町',
    station: '富山駅まで徒歩3分',
    totalFloors: 12, floor: 9, direction: '南',
    price: 6.5, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '2LDK', area: 58.0, buildDate: '2024年8月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット', '二重窓'],
    badge: 'NEW',
  },

  // --- 近畿 追加 ---

  // 82: 大阪（タワマン）
  {
    name: 'タワーグランデ梅田',
    areaKey: 'osaka',
    prefecture: '大阪府',
    city: '大阪市北区',
    address: '大阪府大阪市北区大淀中',
    station: '大阪駅まで徒歩5分',
    totalFloors: 35, floor: 25, direction: '南',
    price: 18.0, managementFee: 15000, depositMonths: 2, keyMoneyMonths: 1,
    type: 'マンション', layout: '2LDK', area: 65.0, buildDate: '2025年2月',
    features: ['タワーマンション', 'オートロック', 'コンシェルジュ', '宅配ボックス', '浴室乾燥機', 'インターネット無料', '24時間ゴミ出し可', 'ジム付き'],
    badge: 'NEW',
  },

  // 83: 大阪（一人暮らし）
  {
    name: 'プチメゾン天王寺',
    areaKey: 'osaka',
    prefecture: '大阪府',
    city: '大阪市天王寺区',
    address: '大阪府大阪市天王寺区堀越町',
    station: '天王寺駅まで徒歩3分',
    totalFloors: 9, floor: 6, direction: '南西',
    price: 5.8, managementFee: 4000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 22.0, buildDate: '2020年12月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', 'インターネット無料', '宅配ボックス'],
  },

  // 84: 京都（デザイナーズ）
  {
    name: 'アトリエ京都御所',
    areaKey: 'kyoto',
    prefecture: '京都府',
    city: '京都市上京区',
    address: '京都府京都市上京区今出川通',
    station: '今出川駅まで徒歩4分',
    totalFloors: 5, floor: 3, direction: '南',
    price: 9.5, managementFee: 6000, depositMonths: 2, keyMoneyMonths: 2,
    type: 'マンション', layout: '1LDK', area: 42.0, buildDate: '2024年9月',
    features: ['デザイナーズ', 'リノベーション', 'バス・トイレ別', 'エアコン', 'フローリング', '独立洗面台', '浴室乾燥機', 'インターネット無料'],
    badge: 'NEW',
  },

  // 85: 京都（学生向け）
  {
    name: 'カレッジコート出町柳',
    areaKey: 'kyoto',
    prefecture: '京都府',
    city: '京都市左京区',
    address: '京都府京都市左京区田中下柳町',
    station: '出町柳駅まで徒歩3分',
    totalFloors: 6, floor: 4, direction: '南東',
    price: 5.0, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 22.0, buildDate: '2019年3月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', 'インターネット無料', '室内洗濯機置場', '自転車置場あり'],
  },

  // 86: 兵庫（タワマン）
  {
    name: 'ハーバービュー神戸',
    areaKey: 'hyogo',
    prefecture: '兵庫県',
    city: '神戸市中央区',
    address: '兵庫県神戸市中央区海岸通',
    station: '元町駅まで徒歩5分',
    totalFloors: 25, floor: 18, direction: '南',
    price: 14.0, managementFee: 12000, depositMonths: 2, keyMoneyMonths: 1,
    type: 'マンション', layout: '2LDK', area: 60.0, buildDate: '2024年10月',
    features: ['タワーマンション', 'オートロック', '宅配ボックス', '浴室乾燥機', 'インターネット無料', '24時間ゴミ出し可', '眺望良好'],
    badge: 'おすすめ物件',
  },

  // 87: 兵庫（一人暮らし）
  {
    name: 'ステラ西宮北口',
    areaKey: 'hyogo',
    prefecture: '兵庫県',
    city: '西宮市',
    address: '兵庫県西宮市高松町',
    station: '西宮北口駅まで徒歩2分',
    totalFloors: 10, floor: 7, direction: '南',
    price: 6.5, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 26.0, buildDate: '2023年2月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '温水洗浄便座', '宅配ボックス'],
  },

  // 88: 奈良
  {
    name: 'ならまちレジデンス',
    areaKey: 'nara',
    prefecture: '奈良県',
    city: '奈良市',
    address: '奈良県奈良市三条町',
    station: '奈良駅まで徒歩6分',
    totalFloors: 8, floor: 5, direction: '南',
    price: 5.5, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 38.0, buildDate: '2022年11月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '温水洗浄便座', '室内洗濯機置場', '追い焚き風呂', 'オートロック'],
  },

  // 89: 滋賀
  {
    name: 'レイクフロント大津',
    areaKey: 'shiga',
    prefecture: '滋賀県',
    city: '大津市',
    address: '滋賀県大津市浜大津',
    station: '大津駅まで徒歩5分',
    totalFloors: 10, floor: 8, direction: '南西',
    price: 6.0, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2023年5月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '温水洗浄便座', '追い焚き風呂', '宅配ボックス', '眺望良好'],
    badge: 'おすすめ物件',
  },

  // --- 中国・四国 追加 ---

  // 90: 岡山（ファミリー）
  {
    name: 'サンガーデン岡山',
    areaKey: 'okayama',
    prefecture: '岡山県',
    city: '岡山市北区',
    address: '岡山県岡山市北区駅前町',
    station: '岡山駅まで徒歩5分',
    totalFloors: 14, floor: 10, direction: '南',
    price: 7.0, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '2LDK', area: 55.0, buildDate: '2023年9月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット'],
    badge: 'おすすめ物件',
  },

  // 91: 岡山（一人暮らし）
  {
    name: 'コンフォール倉敷',
    areaKey: 'okayama',
    prefecture: '岡山県',
    city: '倉敷市',
    address: '岡山県倉敷市阿知',
    station: '倉敷駅まで徒歩4分',
    totalFloors: 7, floor: 4, direction: '南東',
    price: 4.2, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 25.0, buildDate: '2020年8月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 92: 広島（デザイナーズ）
  {
    name: 'アーキテクト広島',
    areaKey: 'hiroshima',
    prefecture: '広島県',
    city: '広島市中区',
    address: '広島県広島市中区袋町',
    station: '本通駅まで徒歩2分',
    totalFloors: 12, floor: 9, direction: '南',
    price: 8.0, managementFee: 6000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 42.0, buildDate: '2024年7月',
    features: ['デザイナーズ', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '浴室乾燥機', '宅配ボックス', 'インターネット無料'],
    badge: 'NEW',
  },

  // 93: 広島（ファミリー）
  {
    name: 'リバーコート広島',
    areaKey: 'hiroshima',
    prefecture: '広島県',
    city: '広島市南区',
    address: '広島県広島市南区松原町',
    station: '広島駅まで徒歩6分',
    totalFloors: 15, floor: 11, direction: '南西',
    price: 9.0, managementFee: 7000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '2LDK', area: 58.0, buildDate: '2023年12月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット', '24時間ゴミ出し可'],
    badge: 'おすすめ物件',
  },

  // 94: 香川（ファミリー）
  {
    name: 'オリーブハイツ高松',
    areaKey: 'kagawa',
    prefecture: '香川県',
    city: '高松市',
    address: '香川県高松市番町',
    station: '瓦町駅まで徒歩5分',
    totalFloors: 10, floor: 6, direction: '南東',
    price: 6.5, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 55.0, buildDate: '2022年9月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'ウォークインクローゼット', '室内洗濯機置場'],
  },

  // 95: 愛媛（ファミリー）
  {
    name: 'シエル松山道後',
    areaKey: 'ehime',
    prefecture: '愛媛県',
    city: '松山市',
    address: '愛媛県松山市道後北代',
    station: '道後温泉駅まで徒歩6分',
    totalFloors: 8, floor: 5, direction: '南',
    price: 6.5, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 52.0, buildDate: '2023年7月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'ウォークインクローゼット', '温水洗浄便座'],
    badge: 'おすすめ物件',
  },

  // --- 九州・沖縄 追加 ---

  // 96: 福岡（タワマン）
  {
    name: 'タワーレジデンス天神',
    areaKey: 'fukuoka',
    prefecture: '福岡県',
    city: '福岡市中央区',
    address: '福岡県福岡市中央区天神',
    station: '天神駅まで徒歩2分',
    totalFloors: 28, floor: 20, direction: '南',
    price: 14.0, managementFee: 12000, depositMonths: 2, keyMoneyMonths: 1,
    type: 'マンション', layout: '2LDK', area: 60.0, buildDate: '2025年1月',
    features: ['タワーマンション', 'オートロック', 'コンシェルジュ', '宅配ボックス', '浴室乾燥機', 'インターネット無料', '24時間ゴミ出し可'],
    badge: 'NEW',
  },

  // 97: 福岡（一人暮らし）
  {
    name: 'コンパクト西新',
    areaKey: 'fukuoka',
    prefecture: '福岡県',
    city: '福岡市早良区',
    address: '福岡県福岡市早良区西新',
    station: '西新駅まで徒歩3分',
    totalFloors: 8, floor: 5, direction: '南東',
    price: 4.5, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 23.0, buildDate: '2021年5月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', 'インターネット無料'],
  },

  // 98: 熊本
  {
    name: 'キャッスルビュー熊本',
    areaKey: 'kumamoto',
    prefecture: '熊本県',
    city: '熊本市中央区',
    address: '熊本県熊本市中央区上通町',
    station: '通町筋駅まで徒歩3分',
    totalFloors: 14, floor: 10, direction: '南',
    price: 6.0, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2023年4月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '温水洗浄便座', '追い焚き風呂', '宅配ボックス', '眺望良好'],
    badge: 'おすすめ物件',
  },

  // 99: 熊本（ファミリー）
  {
    name: 'グリーンコート熊本東',
    areaKey: 'kumamoto',
    prefecture: '熊本県',
    city: '熊本市東区',
    address: '熊本県熊本市東区健軍',
    station: '健軍町駅まで徒歩5分',
    totalFloors: 8, floor: 4, direction: '南東',
    price: 7.0, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 55.0, buildDate: '2022年6月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'ウォークインクローゼット', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額5,000円）',
  },

  // 100: 長崎（ファミリー）
  {
    name: 'シーサイド長崎',
    areaKey: 'nagasaki',
    prefecture: '長崎県',
    city: '長崎市',
    address: '長崎県長崎市出島町',
    station: '出島駅まで徒歩3分',
    totalFloors: 12, floor: 9, direction: '南西',
    price: 6.5, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 52.0, buildDate: '2024年1月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', '眺望良好'],
    badge: 'NEW',
  },

  // 101: 大分（温泉地）
  {
    name: 'スパリゾート別府',
    areaKey: 'oita',
    prefecture: '大分県',
    city: '別府市',
    address: '大分県別府市北浜',
    station: '別府駅まで徒歩5分',
    totalFloors: 7, floor: 5, direction: '南',
    price: 4.8, managementFee: 3500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 36.0, buildDate: '2021年11月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '温水洗浄便座', '室内洗濯機置場', '温泉引込可'],
  },

  // 102: 鹿児島（ファミリー）
  {
    name: 'サザンコート鹿児島',
    areaKey: 'kagoshima',
    prefecture: '鹿児島県',
    city: '鹿児島市',
    address: '鹿児島県鹿児島市中央町',
    station: '鹿児島中央駅まで徒歩4分',
    totalFloors: 14, floor: 10, direction: '南',
    price: 7.0, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '2LDK', area: 58.0, buildDate: '2024年3月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット', '24時間ゴミ出し可'],
    badge: 'NEW',
  },

  // 103: 沖縄
  {
    name: 'オーシャンテラス那覇',
    areaKey: 'okinawa',
    prefecture: '沖縄県',
    city: '那覇市',
    address: '沖縄県那覇市久茂地',
    station: '県庁前駅まで徒歩4分',
    totalFloors: 12, floor: 9, direction: '南西',
    price: 7.5, managementFee: 6000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2023年11月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '温水洗浄便座', '宅配ボックス', '眺望良好', 'インターネット無料'],
    badge: 'おすすめ物件',
  },

  // 104: 沖縄（リゾート）
  {
    name: 'サンセットビュー北谷',
    areaKey: 'okinawa',
    prefecture: '沖縄県',
    city: '中頭郡北谷町',
    address: '沖縄県中頭郡北谷町美浜',
    station: 'バス停美浜入口まで徒歩5分',
    totalFloors: 6, floor: 4, direction: '南',
    price: 6.5, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 38.0, buildDate: '2022年4月',
    features: ['ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '眺望良好', 'バルコニー広め'],
  },

  // --- 主要都市に更に追加 ---

  // 105: 東京（ペット可ファミリー）
  {
    name: 'ペットガーデン世田谷',
    areaKey: 'tokyo',
    prefecture: '東京都',
    city: '世田谷区',
    address: '東京都世田谷区三軒茶屋',
    station: '三軒茶屋駅まで徒歩5分',
    totalFloors: 6, floor: 3, direction: '南',
    price: 15.0, managementFee: 12000, depositMonths: 2, keyMoneyMonths: 1,
    type: 'マンション', layout: '2LDK', area: 58.0, buildDate: '2022年10月',
    features: ['ペット可', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'ウォークインクローゼット', '宅配ボックス'],
  },

  // 106: 東京（リノベ）
  {
    name: 'リノベーションスイート中目黒',
    areaKey: 'tokyo',
    prefecture: '東京都',
    city: '目黒区',
    address: '東京都目黒区上目黒',
    station: '中目黒駅まで徒歩3分',
    totalFloors: 5, floor: 4, direction: '南西',
    price: 13.5, managementFee: 8000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 45.0, buildDate: '2010年8月',
    features: ['リノベーション', 'デザイナーズ', 'バス・トイレ別', 'エアコン', 'フローリング', '独立洗面台', 'システムキッチン', '室内洗濯機置場'],
    badge: 'おすすめ物件',
  },

  // 107: 大阪（ペット可）
  {
    name: 'ペットレジデンス江坂',
    areaKey: 'osaka',
    prefecture: '大阪府',
    city: '吹田市',
    address: '大阪府吹田市江坂町',
    station: '江坂駅まで徒歩4分',
    totalFloors: 10, floor: 6, direction: '南',
    price: 7.5, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 42.0, buildDate: '2021年9月',
    features: ['ペット可', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '温水洗浄便座'],
  },

  // 108: 大阪（ファミリー大型）
  {
    name: 'グランヴィスタ堺',
    areaKey: 'osaka',
    prefecture: '大阪府',
    city: '堺市堺区',
    address: '大阪府堺市堺区市之町東',
    station: '堺駅まで徒歩5分',
    totalFloors: 15, floor: 11, direction: '南',
    price: 9.5, managementFee: 8000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '3LDK', area: 72.0, buildDate: '2024年2月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット', '食洗機', '24時間ゴミ出し可'],
    badge: 'NEW',
  },

  // 109: 愛知（デザイナーズ）
  {
    name: 'ザ・デザイン名駅',
    areaKey: 'aichi',
    prefecture: '愛知県',
    city: '名古屋市中村区',
    address: '愛知県名古屋市中村区名駅',
    station: '名古屋駅まで徒歩3分',
    totalFloors: 20, floor: 15, direction: '南',
    price: 10.5, managementFee: 8000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 45.0, buildDate: '2025年2月',
    features: ['デザイナーズ', 'タワーマンション', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '浴室乾燥機', 'インターネット無料', '24時間ゴミ出し可'],
    badge: 'NEW',
  },

  // 110: 福岡（ペット可ファミリー）
  {
    name: 'ペットフレンドリー大橋',
    areaKey: 'fukuoka',
    prefecture: '福岡県',
    city: '福岡市南区',
    address: '福岡県福岡市南区大橋',
    station: '大橋駅まで徒歩4分',
    totalFloors: 8, floor: 5, direction: '南',
    price: 7.5, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 55.0, buildDate: '2022年8月',
    features: ['ペット可', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'ウォークインクローゼット', '室内洗濯機置場'],
  },

  // 111: 神奈川（一人暮らし）
  {
    name: 'セレクト溝の口',
    areaKey: 'kanagawa',
    prefecture: '神奈川県',
    city: '川崎市高津区',
    address: '神奈川県川崎市高津区溝口',
    station: '溝の口駅まで徒歩3分',
    totalFloors: 9, floor: 6, direction: '南東',
    price: 7.0, managementFee: 5000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 26.0, buildDate: '2023年3月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', 'インターネット無料', '宅配ボックス', '温水洗浄便座'],
  },

  // 112: 千葉（デザイナーズ）
  {
    name: 'デザイナーズ海浜幕張',
    areaKey: 'chiba',
    prefecture: '千葉県',
    city: '千葉市美浜区',
    address: '千葉県千葉市美浜区ひび野',
    station: '海浜幕張駅まで徒歩5分',
    totalFloors: 18, floor: 14, direction: '南',
    price: 11.0, managementFee: 9000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '2LDK', area: 58.0, buildDate: '2024年5月',
    features: ['デザイナーズ', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '浴室乾燥機', '宅配ボックス', 'インターネット無料', '24時間ゴミ出し可'],
    badge: 'NEW',
  },

  // 113: 埼玉（リノベ）
  {
    name: 'リノベスタイル所沢',
    areaKey: 'saitama',
    prefecture: '埼玉県',
    city: '所沢市',
    address: '埼玉県所沢市日吉町',
    station: '所沢駅まで徒歩4分',
    totalFloors: 7, floor: 4, direction: '南',
    price: 6.8, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2012年6月',
    features: ['リノベーション', 'バス・トイレ別', 'エアコン', 'フローリング', '独立洗面台', 'システムキッチン', '室内洗濯機置場', '追い焚き風呂'],
  },

  // 114: 京都（ファミリー）
  {
    name: 'フォレスト京都桂',
    areaKey: 'kyoto',
    prefecture: '京都府',
    city: '京都市西京区',
    address: '京都府京都市西京区桂',
    station: '桂駅まで徒歩5分',
    totalFloors: 10, floor: 7, direction: '南',
    price: 8.5, managementFee: 6000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '3LDK', area: 70.0, buildDate: '2023年10月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット', '食洗機'],
    badge: 'おすすめ物件',
  },

  // 115: 岐阜（ペット可）
  {
    name: 'ペットライフ各務原',
    areaKey: 'gifu',
    prefecture: '岐阜県',
    city: '各務原市',
    address: '岐阜県各務原市那加桜町',
    station: '各務原市役所前駅まで徒歩5分',
    totalFloors: 5, floor: 2, direction: '南',
    price: 4.8, managementFee: 3000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'アパート', layout: '1LDK', area: 42.0, buildDate: '2021年10月',
    features: ['ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額4,000円）',
  },

  // 116: 三重（ファミリー）
  {
    name: 'パークサイド四日市',
    areaKey: 'mie',
    prefecture: '三重県',
    city: '四日市市',
    address: '三重県四日市市安島',
    station: '近鉄四日市駅まで徒歩4分',
    totalFloors: 12, floor: 8, direction: '南',
    price: 6.5, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 55.0, buildDate: '2023年8月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', '駐車場あり'],
    parking: '敷地内（月額5,000円）',
    badge: 'おすすめ物件',
  },

  // ==========================================
  // 物件倍増 第2弾（117〜232）
  // 全国各エリアに多様な物件を追加
  // ==========================================

  // --- 北海道・東北 ---

  // 117: 北海道（デザイナーズ）
  {
    name: 'デザイナーズ円山',
    areaKey: 'hokkaido',
    prefecture: '北海道',
    city: '札幌市中央区',
    address: '北海道札幌市中央区南一条西',
    station: '円山公園駅まで徒歩4分',
    totalFloors: 6, floor: 4, direction: '南',
    price: 7.0, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 42.0, buildDate: '2024年4月',
    features: ['デザイナーズ', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '浴室乾燥機', '二重窓', 'インターネット無料'],
    badge: 'NEW',
  },

  // 118: 北海道（ファミリー一戸建て）
  {
    name: 'ガーデンハウス新札幌',
    areaKey: 'hokkaido',
    prefecture: '北海道',
    city: '札幌市厚別区',
    address: '北海道札幌市厚別区厚別中央',
    station: '新札幌駅まで徒歩8分',
    totalFloors: 2, floor: 1, direction: '南',
    price: 8.0, managementFee: 0, depositMonths: 2, keyMoneyMonths: 1,
    type: '一戸建て', layout: '4LDK', area: 110.0, buildDate: '2020年10月',
    features: ['駐車場あり', 'ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'システムキッチン', '庭付き', '二重窓'],
    parking: '敷地内（2台分）',
  },

  // 119: 北海道（学生向け）
  {
    name: 'キャンパスハイツ北大前',
    areaKey: 'hokkaido',
    prefecture: '北海道',
    city: '札幌市北区',
    address: '北海道札幌市北区北18条西',
    station: '北18条駅まで徒歩2分',
    totalFloors: 5, floor: 3, direction: '南東',
    price: 3.5, managementFee: 2500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 22.0, buildDate: '2019年3月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', 'インターネット無料', '室内洗濯機置場', '二重窓', '自転車置場あり'],
  },

  // 120: 北海道（函館）
  {
    name: 'ベイサイド函館',
    areaKey: 'hokkaido',
    prefecture: '北海道',
    city: '函館市',
    address: '北海道函館市若松町',
    station: '函館駅まで徒歩5分',
    totalFloors: 8, floor: 6, direction: '南西',
    price: 4.5, managementFee: 3500, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 38.0, buildDate: '2021年8月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '温水洗浄便座', '追い焚き風呂', '室内洗濯機置場', '眺望良好', '二重窓'],
  },

  // 121: 青森（ファミリー）
  {
    name: 'ねぶたスクエア青森',
    areaKey: 'aomori',
    prefecture: '青森県',
    city: '青森市',
    address: '青森県青森市柳川',
    station: '青森駅まで徒歩7分',
    totalFloors: 9, floor: 5, direction: '南',
    price: 5.5, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 52.0, buildDate: '2023年1月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '温水洗浄便座', '二重窓', '駐車場あり'],
    parking: '敷地内（月額4,000円）',
    badge: 'おすすめ物件',
  },

  // 122: 岩手（ペット可）
  {
    name: 'ペットウェルカム盛岡',
    areaKey: 'iwate',
    prefecture: '岩手県',
    city: '盛岡市',
    address: '岩手県盛岡市中ノ橋通',
    station: '盛岡駅まで徒歩10分',
    totalFloors: 6, floor: 3, direction: '南',
    price: 4.8, managementFee: 3500, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2022年5月',
    features: ['ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '二重窓', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 123: 秋田（ファミリー）
  {
    name: 'ファミリーコート秋田',
    areaKey: 'akita',
    prefecture: '秋田県',
    city: '秋田市',
    address: '秋田県秋田市大町',
    station: '秋田駅まで徒歩8分',
    totalFloors: 8, floor: 5, direction: '南東',
    price: 5.0, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 50.0, buildDate: '2021年11月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'ウォークインクローゼット', '室内洗濯機置場', '灯油暖房', '二重窓', '駐車場あり'],
    parking: '敷地内（月額4,000円）',
  },

  // 124: 山形（デザイナーズ）
  {
    name: 'モダンレジデンス山形',
    areaKey: 'yamagata',
    prefecture: '山形県',
    city: '山形市',
    address: '山形県山形市七日町',
    station: '山形駅まで徒歩6分',
    totalFloors: 10, floor: 7, direction: '南',
    price: 5.5, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2024年6月',
    features: ['デザイナーズ', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '浴室乾燥機', '温水洗浄便座', '二重窓'],
    badge: 'NEW',
  },

  // 125: 宮城（ファミリー大型）
  {
    name: 'グランドファミリー泉',
    areaKey: 'miyagi',
    prefecture: '宮城県',
    city: '仙台市泉区',
    address: '宮城県仙台市泉区泉中央',
    station: '泉中央駅まで徒歩4分',
    totalFloors: 14, floor: 10, direction: '南',
    price: 9.0, managementFee: 7000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '3LDK', area: 72.0, buildDate: '2023年8月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット', '食洗機', '24時間ゴミ出し可'],
    badge: 'おすすめ物件',
  },

  // 126: 福島（一人暮らし）
  {
    name: 'ステラ福島駅前',
    areaKey: 'fukushima',
    prefecture: '福島県',
    city: '福島市',
    address: '福島県福島市栄町',
    station: '福島駅まで徒歩3分',
    totalFloors: 9, floor: 6, direction: '南',
    price: 4.5, managementFee: 3500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 25.0, buildDate: '2022年2月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', 'インターネット無料', '宅配ボックス'],
  },

  // --- 関東 ---

  // 127: 東京（高級ファミリー）
  {
    name: 'パレス広尾ガーデン',
    areaKey: 'tokyo',
    prefecture: '東京都',
    city: '渋谷区',
    address: '東京都渋谷区広尾',
    station: '広尾駅まで徒歩3分',
    totalFloors: 8, floor: 6, direction: '南',
    price: 28.0, managementFee: 22000, depositMonths: 2, keyMoneyMonths: 2,
    type: 'マンション', layout: '3LDK', area: 85.0, buildDate: '2024年8月',
    features: ['デザイナーズ', 'オートロック', 'コンシェルジュ', '宅配ボックス', '浴室乾燥機', '食洗機', 'ウォークインクローゼット', 'ディスポーザー'],
    badge: 'NEW',
  },

  // 128: 東京（テレワーク向け）
  {
    name: 'ワークスタイル吉祥寺',
    areaKey: 'tokyo',
    prefecture: '東京都',
    city: '武蔵野市',
    address: '東京都武蔵野市吉祥寺本町',
    station: '吉祥寺駅まで徒歩5分',
    totalFloors: 7, floor: 4, direction: '南西',
    price: 9.8, managementFee: 7000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2023年2月',
    features: ['テレワーク対応', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', 'インターネット無料', '独立洗面台', '宅配ボックス'],
    badge: 'おすすめ物件',
  },

  // 129: 東京（一戸建て）
  {
    name: 'ガーデンヒルズ練馬',
    areaKey: 'tokyo',
    prefecture: '東京都',
    city: '練馬区',
    address: '東京都練馬区石神井町',
    station: '石神井公園駅まで徒歩7分',
    totalFloors: 2, floor: 1, direction: '南',
    price: 16.0, managementFee: 0, depositMonths: 2, keyMoneyMonths: 1,
    type: '一戸建て', layout: '4LDK', area: 110.0, buildDate: '2022年6月',
    features: ['駐車場あり', 'ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'システムキッチン', '庭付き', '食洗機'],
    parking: '敷地内（1台分）',
  },

  // 130: 東京（コンパクト）
  {
    name: 'プチレジ秋葉原',
    areaKey: 'tokyo',
    prefecture: '東京都',
    city: '千代田区',
    address: '東京都千代田区外神田',
    station: '秋葉原駅まで徒歩3分',
    totalFloors: 12, floor: 8, direction: '東',
    price: 8.5, managementFee: 6000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 20.0, buildDate: '2023年9月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', 'インターネット無料', '宅配ボックス', '24時間ゴミ出し可'],
  },

  // 131: 東京（女性向け）
  {
    name: 'エレガンス自由が丘',
    areaKey: 'tokyo',
    prefecture: '東京都',
    city: '目黒区',
    address: '東京都目黒区自由が丘',
    station: '自由が丘駅まで徒歩4分',
    totalFloors: 6, floor: 4, direction: '南',
    price: 10.0, managementFee: 7000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1DK', area: 30.0, buildDate: '2024年2月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '独立洗面台', '浴室乾燥機', '宅配ボックス', 'TVモニター付きインターホン'],
    badge: 'NEW',
  },

  // 132: 東京（下町ファミリー）
  {
    name: 'シティテラス亀戸',
    areaKey: 'tokyo',
    prefecture: '東京都',
    city: '江東区',
    address: '東京都江東区亀戸',
    station: '亀戸駅まで徒歩5分',
    totalFloors: 14, floor: 9, direction: '南東',
    price: 12.0, managementFee: 10000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '2LDK', area: 55.0, buildDate: '2023年5月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット', '24時間ゴミ出し可'],
  },

  // 133: 神奈川（デザイナーズ）
  {
    name: 'アーキレジデンス鎌倉',
    areaKey: 'kanagawa',
    prefecture: '神奈川県',
    city: '鎌倉市',
    address: '神奈川県鎌倉市御成町',
    station: '鎌倉駅まで徒歩3分',
    totalFloors: 4, floor: 3, direction: '南',
    price: 11.0, managementFee: 8000, depositMonths: 2, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 45.0, buildDate: '2024年1月',
    features: ['デザイナーズ', 'バス・トイレ別', 'エアコン', 'フローリング', '独立洗面台', '浴室乾燥機', 'システムキッチン'],
    badge: 'NEW',
  },

  // 134: 神奈川（1人暮らし）
  {
    name: 'コンフォート相模大野',
    areaKey: 'kanagawa',
    prefecture: '神奈川県',
    city: '相模原市南区',
    address: '神奈川県相模原市南区相模大野',
    station: '相模大野駅まで徒歩4分',
    totalFloors: 8, floor: 5, direction: '南東',
    price: 5.5, managementFee: 4000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 24.0, buildDate: '2021年4月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', 'インターネット無料'],
  },

  // 135: 埼玉（デザイナーズ）
  {
    name: 'デザイナーズ大宮',
    areaKey: 'saitama',
    prefecture: '埼玉県',
    city: 'さいたま市大宮区',
    address: '埼玉県さいたま市大宮区宮町',
    station: '大宮駅まで徒歩4分',
    totalFloors: 12, floor: 9, direction: '南',
    price: 9.0, managementFee: 7000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 42.0, buildDate: '2025年1月',
    features: ['デザイナーズ', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '浴室乾燥機', '宅配ボックス', 'インターネット無料'],
    badge: 'NEW',
  },

  // 136: 埼玉（ペット可）
  {
    name: 'ペットガーデン越谷',
    areaKey: 'saitama',
    prefecture: '埼玉県',
    city: '越谷市',
    address: '埼玉県越谷市南越谷',
    station: '南越谷駅まで徒歩5分',
    totalFloors: 7, floor: 3, direction: '南',
    price: 6.2, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2022年3月',
    features: ['ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '温水洗浄便座'],
  },

  // 137: 千葉（一戸建て）
  {
    name: 'ヴィラージュ松戸',
    areaKey: 'chiba',
    prefecture: '千葉県',
    city: '松戸市',
    address: '千葉県松戸市松戸',
    station: '松戸駅まで徒歩10分',
    totalFloors: 2, floor: 1, direction: '南',
    price: 9.5, managementFee: 0, depositMonths: 2, keyMoneyMonths: 1,
    type: '一戸建て', layout: '3LDK', area: 90.0, buildDate: '2020年9月',
    features: ['駐車場あり', 'ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'システムキッチン', '庭付き'],
    parking: '敷地内（1台分）',
  },

  // 138: 千葉（学生向け）
  {
    name: 'スチューデント西千葉',
    areaKey: 'chiba',
    prefecture: '千葉県',
    city: '千葉市中央区',
    address: '千葉県千葉市中央区西千葉',
    station: '西千葉駅まで徒歩3分',
    totalFloors: 6, floor: 4, direction: '南東',
    price: 4.5, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 22.0, buildDate: '2020年3月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', 'インターネット無料', '室内洗濯機置場', '自転車置場あり'],
  },

  // 139: 茨城（ファミリー）
  {
    name: 'クレストヒル水戸',
    areaKey: 'ibaraki',
    prefecture: '茨城県',
    city: '水戸市',
    address: '茨城県水戸市宮町',
    station: '水戸駅まで徒歩5分',
    totalFloors: 12, floor: 8, direction: '南',
    price: 7.0, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '2LDK', area: 55.0, buildDate: '2023年4月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット', '駐車場あり'],
    parking: '敷地内（月額5,000円）',
    badge: 'おすすめ物件',
  },

  // 140: 群馬（ファミリー）
  {
    name: 'ファミリータウン前橋',
    areaKey: 'gunma',
    prefecture: '群馬県',
    city: '前橋市',
    address: '群馬県前橋市本町',
    station: '前橋駅まで徒歩6分',
    totalFloors: 10, floor: 6, direction: '南',
    price: 6.0, managementFee: 4500, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 55.0, buildDate: '2022年9月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額4,000円）',
  },

  // 141: 栃木（一人暮らし）
  {
    name: 'プチコート小山',
    areaKey: 'tochigi',
    prefecture: '栃木県',
    city: '小山市',
    address: '栃木県小山市中央町',
    station: '小山駅まで徒歩5分',
    totalFloors: 6, floor: 4, direction: '南',
    price: 4.2, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 24.0, buildDate: '2020年7月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // --- 中部 ---

  // 142: 新潟（デザイナーズ）
  {
    name: 'デザイナーズ万代',
    areaKey: 'niigata',
    prefecture: '新潟県',
    city: '新潟市中央区',
    address: '新潟県新潟市中央区万代',
    station: '新潟駅まで徒歩6分',
    totalFloors: 14, floor: 10, direction: '南',
    price: 7.0, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 42.0, buildDate: '2025年2月',
    features: ['デザイナーズ', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '浴室乾燥機', '宅配ボックス', '二重窓'],
    badge: 'NEW',
  },

  // 143: 富山（一人暮らし）
  {
    name: 'コンパクト富山',
    areaKey: 'toyama',
    prefecture: '富山県',
    city: '富山市',
    address: '富山県富山市総曲輪',
    station: 'グランドプラザ前駅まで徒歩2分',
    totalFloors: 7, floor: 5, direction: '南',
    price: 3.8, managementFee: 2500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 24.0, buildDate: '2019年9月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '駐車場あり', '二重窓'],
    parking: '敷地内（月額3,000円）',
  },

  // 144: 石川（ファミリー）
  {
    name: 'グランシティ金沢',
    areaKey: 'ishikawa',
    prefecture: '石川県',
    city: '金沢市',
    address: '石川県金沢市本町',
    station: '金沢駅まで徒歩4分',
    totalFloors: 14, floor: 10, direction: '南',
    price: 8.0, managementFee: 6000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '2LDK', area: 58.0, buildDate: '2024年3月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット', '二重窓'],
    badge: 'NEW',
  },

  // 145: 福井（ファミリー）
  {
    name: 'レイクビュー福井',
    areaKey: 'fukui',
    prefecture: '福井県',
    city: '福井市',
    address: '福井県福井市大手',
    station: '福井駅まで徒歩4分',
    totalFloors: 10, floor: 7, direction: '南',
    price: 5.5, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 52.0, buildDate: '2023年5月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額4,000円）',
    badge: 'おすすめ物件',
  },

  // 146: 山梨（ファミリー）
  {
    name: 'フジビューテラス甲府',
    areaKey: 'yamanashi',
    prefecture: '山梨県',
    city: '甲府市',
    address: '山梨県甲府市中央',
    station: '甲府駅まで徒歩7分',
    totalFloors: 8, floor: 6, direction: '南西',
    price: 6.0, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 52.0, buildDate: '2022年11月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'ウォークインクローゼット', '室内洗濯機置場', '駐車場あり', '眺望良好'],
    parking: '敷地内（月額5,000円）',
  },

  // 147: 長野（リゾート）
  {
    name: 'マウンテンリゾート軽井沢',
    areaKey: 'nagano',
    prefecture: '長野県',
    city: '北佐久郡軽井沢町',
    address: '長野県北佐久郡軽井沢町軽井沢東',
    station: '軽井沢駅まで徒歩10分',
    totalFloors: 3, floor: 2, direction: '南',
    price: 8.5, managementFee: 5000, depositMonths: 2, keyMoneyMonths: 1,
    type: 'マンション', layout: '2LDK', area: 60.0, buildDate: '2021年6月',
    features: ['ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'システムキッチン', '眺望良好', 'バルコニー広め'],
  },

  // 148: 長野（一人暮らし）
  {
    name: 'ステーションフロント長野',
    areaKey: 'nagano',
    prefecture: '長野県',
    city: '長野市',
    address: '長野県長野市南千歳',
    station: '長野駅まで徒歩3分',
    totalFloors: 10, floor: 7, direction: '南',
    price: 5.2, managementFee: 3500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 25.0, buildDate: '2022年8月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', 'インターネット無料', '宅配ボックス'],
  },

  // 149: 岐阜（ファミリー）
  {
    name: 'サンフォレスト大垣',
    areaKey: 'gifu',
    prefecture: '岐阜県',
    city: '大垣市',
    address: '岐阜県大垣市高屋町',
    station: '大垣駅まで徒歩5分',
    totalFloors: 10, floor: 7, direction: '南',
    price: 6.0, managementFee: 4500, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 55.0, buildDate: '2023年3月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額4,000円）',
  },

  // 150: 静岡（ファミリー）
  {
    name: 'ベルヴィ沼津',
    areaKey: 'shizuoka',
    prefecture: '静岡県',
    city: '沼津市',
    address: '静岡県沼津市大手町',
    station: '沼津駅まで徒歩4分',
    totalFloors: 11, floor: 7, direction: '南',
    price: 6.8, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 55.0, buildDate: '2023年7月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット'],
    badge: 'おすすめ物件',
  },

  // 151: 愛知（一戸建て）
  {
    name: 'ガーデンスクエア長久手',
    areaKey: 'aichi',
    prefecture: '愛知県',
    city: '長久手市',
    address: '愛知県長久手市長湫',
    station: 'リニモ長久手古戦場駅まで徒歩6分',
    totalFloors: 2, floor: 1, direction: '南',
    price: 10.5, managementFee: 0, depositMonths: 2, keyMoneyMonths: 1,
    type: '一戸建て', layout: '4LDK', area: 105.0, buildDate: '2022年4月',
    features: ['駐車場あり', 'ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'システムキッチン', '庭付き', '食洗機'],
    parking: '敷地内（2台分）',
  },

  // 152: 愛知（学生向け）
  {
    name: 'アカデミア本山',
    areaKey: 'aichi',
    prefecture: '愛知県',
    city: '名古屋市千種区',
    address: '愛知県名古屋市千種区末盛通',
    station: '本山駅まで徒歩2分',
    totalFloors: 6, floor: 4, direction: '南東',
    price: 4.5, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 22.0, buildDate: '2020年3月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', 'インターネット無料', '室内洗濯機置場', '自転車置場あり'],
  },

  // 153: 三重（一人暮らし）
  {
    name: 'アクティ津駅前',
    areaKey: 'mie',
    prefecture: '三重県',
    city: '津市',
    address: '三重県津市栄町',
    station: '津駅まで徒歩3分',
    totalFloors: 8, floor: 5, direction: '南',
    price: 4.0, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 24.0, buildDate: '2021年5月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '温水洗浄便座'],
  },

  // --- 近畿 ---

  // 154: 大阪（リノベ）
  {
    name: 'リノベスタイル中崎町',
    areaKey: 'osaka',
    prefecture: '大阪府',
    city: '大阪市北区',
    address: '大阪府大阪市北区中崎',
    station: '中崎町駅まで徒歩2分',
    totalFloors: 5, floor: 3, direction: '南西',
    price: 7.0, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2012年4月',
    features: ['リノベーション', 'デザイナーズ', 'バス・トイレ別', 'エアコン', 'フローリング', '独立洗面台', 'システムキッチン', '室内洗濯機置場'],
    badge: 'おすすめ物件',
  },

  // 155: 大阪（学生向け）
  {
    name: 'カレッジメゾン千里',
    areaKey: 'osaka',
    prefecture: '大阪府',
    city: '豊中市',
    address: '大阪府豊中市新千里東町',
    station: '千里中央駅まで徒歩4分',
    totalFloors: 8, floor: 5, direction: '南',
    price: 5.0, managementFee: 3500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 23.0, buildDate: '2019年9月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', 'インターネット無料', '室内洗濯機置場'],
  },

  // 156: 大阪（一戸建て）
  {
    name: 'ヴィラ箕面',
    areaKey: 'osaka',
    prefecture: '大阪府',
    city: '箕面市',
    address: '大阪府箕面市箕面',
    station: '箕面駅まで徒歩6分',
    totalFloors: 2, floor: 1, direction: '南',
    price: 12.0, managementFee: 0, depositMonths: 2, keyMoneyMonths: 1,
    type: '一戸建て', layout: '4LDK', area: 100.0, buildDate: '2021年10月',
    features: ['駐車場あり', 'ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'システムキッチン', '庭付き'],
    parking: '敷地内（2台分）',
  },

  // 157: 京都（リノベ）
  {
    name: 'リノベーション京町屋',
    areaKey: 'kyoto',
    prefecture: '京都府',
    city: '京都市中京区',
    address: '京都府京都市中京区壬生',
    station: '四条大宮駅まで徒歩5分',
    totalFloors: 2, floor: 1, direction: '南',
    price: 8.0, managementFee: 3000, depositMonths: 2, keyMoneyMonths: 2,
    type: '一戸建て', layout: '2LDK', area: 65.0, buildDate: '1975年4月',
    features: ['リノベーション', 'デザイナーズ', 'バス・トイレ別', 'エアコン', 'システムキッチン', '独立洗面台'],
    badge: 'おすすめ物件',
  },

  // 158: 京都（コンパクト）
  {
    name: 'プチメゾン河原町',
    areaKey: 'kyoto',
    prefecture: '京都府',
    city: '京都市下京区',
    address: '京都府京都市下京区河原町通',
    station: '河原町駅まで徒歩2分',
    totalFloors: 8, floor: 6, direction: '南',
    price: 6.5, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 22.0, buildDate: '2023年6月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', 'インターネット無料', '宅配ボックス'],
  },

  // 159: 兵庫（ファミリー）
  {
    name: 'グランファミリー明石',
    areaKey: 'hyogo',
    prefecture: '兵庫県',
    city: '明石市',
    address: '兵庫県明石市大明石町',
    station: '明石駅まで徒歩5分',
    totalFloors: 12, floor: 8, direction: '南',
    price: 8.5, managementFee: 6000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '3LDK', area: 70.0, buildDate: '2023年11月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット', '食洗機'],
    badge: 'おすすめ物件',
  },

  // 160: 兵庫（ペット可）
  {
    name: 'ペットコート宝塚',
    areaKey: 'hyogo',
    prefecture: '兵庫県',
    city: '宝塚市',
    address: '兵庫県宝塚市栄町',
    station: '宝塚駅まで徒歩4分',
    totalFloors: 7, floor: 4, direction: '南',
    price: 7.0, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 52.0, buildDate: '2022年7月',
    features: ['ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '温水洗浄便座'],
  },

  // 161: 奈良（ファミリー）
  {
    name: 'パークレジデンス学園前',
    areaKey: 'nara',
    prefecture: '奈良県',
    city: '奈良市',
    address: '奈良県奈良市学園北',
    station: '学園前駅まで徒歩5分',
    totalFloors: 10, floor: 7, direction: '南',
    price: 7.0, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '2LDK', area: 58.0, buildDate: '2023年3月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'ウォークインクローゼット', '宅配ボックス'],
    badge: 'NEW',
  },

  // 162: 滋賀（ファミリー）
  {
    name: 'レイクガーデン草津',
    areaKey: 'shiga',
    prefecture: '滋賀県',
    city: '草津市',
    address: '滋賀県草津市大路',
    station: '草津駅まで徒歩4分',
    totalFloors: 12, floor: 9, direction: '南',
    price: 7.5, managementFee: 6000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '3LDK', area: 72.0, buildDate: '2024年5月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット', '食洗機'],
    badge: 'NEW',
  },

  // 163: 和歌山（ファミリー）
  {
    name: 'サンシャイン和歌山',
    areaKey: 'wakayama',
    prefecture: '和歌山県',
    city: '和歌山市',
    address: '和歌山県和歌山市太田',
    station: '和歌山駅まで徒歩6分',
    totalFloors: 10, floor: 6, direction: '南東',
    price: 5.8, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 52.0, buildDate: '2022年4月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '温水洗浄便座', '駐車場あり'],
    parking: '敷地内（月額4,000円）',
  },

  // --- 中国・四国 ---

  // 164: 鳥取（ファミリー）
  {
    name: 'ファミリーコート倉吉',
    areaKey: 'tottori',
    prefecture: '鳥取県',
    city: '倉吉市',
    address: '鳥取県倉吉市昭和町',
    station: '倉吉駅まで徒歩8分',
    totalFloors: 6, floor: 4, direction: '南',
    price: 4.5, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '2DK', area: 45.0, buildDate: '2020年6月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 165: 島根（ファミリー）
  {
    name: 'グリーンパーク出雲',
    areaKey: 'shimane',
    prefecture: '島根県',
    city: '出雲市',
    address: '島根県出雲市今市町',
    station: '出雲市駅まで徒歩5分',
    totalFloors: 8, floor: 5, direction: '南',
    price: 5.0, managementFee: 3500, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 50.0, buildDate: '2022年12月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '温水洗浄便座', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
    badge: 'おすすめ物件',
  },

  // 166: 岡山（デザイナーズ）
  {
    name: 'デザインレジデンス岡山',
    areaKey: 'okayama',
    prefecture: '岡山県',
    city: '岡山市北区',
    address: '岡山県岡山市北区表町',
    station: '岡山駅まで徒歩8分',
    totalFloors: 10, floor: 7, direction: '南西',
    price: 7.5, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 42.0, buildDate: '2024年9月',
    features: ['デザイナーズ', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '浴室乾燥機', '宅配ボックス', 'インターネット無料'],
    badge: 'NEW',
  },

  // 167: 広島（一人暮らし）
  {
    name: 'スマートステイ広島',
    areaKey: 'hiroshima',
    prefecture: '広島県',
    city: '広島市中区',
    address: '広島県広島市中区紙屋町',
    station: '紙屋町東駅まで徒歩2分',
    totalFloors: 12, floor: 8, direction: '南',
    price: 5.5, managementFee: 4000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 24.0, buildDate: '2022年5月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', 'インターネット無料', '宅配ボックス'],
  },

  // 168: 広島（一戸建て）
  {
    name: 'ヴィラ海田',
    areaKey: 'hiroshima',
    prefecture: '広島県',
    city: '安芸郡海田町',
    address: '広島県安芸郡海田町南堀川町',
    station: '海田市駅まで徒歩6分',
    totalFloors: 2, floor: 1, direction: '南',
    price: 7.5, managementFee: 0, depositMonths: 2, keyMoneyMonths: 1,
    type: '一戸建て', layout: '3LDK', area: 85.0, buildDate: '2020年11月',
    features: ['駐車場あり', 'ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'システムキッチン', '庭付き'],
    parking: '敷地内（2台分）',
  },

  // 169: 山口（ファミリー）
  {
    name: 'ベイサイド周南',
    areaKey: 'yamaguchi',
    prefecture: '山口県',
    city: '周南市',
    address: '山口県周南市みなみ銀座',
    station: '徳山駅まで徒歩5分',
    totalFloors: 10, floor: 7, direction: '南',
    price: 5.5, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 52.0, buildDate: '2023年2月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '温水洗浄便座'],
    badge: 'おすすめ物件',
  },

  // 170: 徳島（ファミリー）
  {
    name: 'アクアテラス徳島',
    areaKey: 'tokushima',
    prefecture: '徳島県',
    city: '徳島市',
    address: '徳島県徳島市東船場町',
    station: '徳島駅まで徒歩6分',
    totalFloors: 10, floor: 6, direction: '南東',
    price: 5.5, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 50.0, buildDate: '2023年10月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '宅配ボックス'],
    badge: 'NEW',
  },

  // 171: 香川（デザイナーズ）
  {
    name: 'デザインコート丸亀',
    areaKey: 'kagawa',
    prefecture: '香川県',
    city: '丸亀市',
    address: '香川県丸亀市大手町',
    station: '丸亀駅まで徒歩4分',
    totalFloors: 7, floor: 5, direction: '南',
    price: 5.0, managementFee: 3500, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 38.0, buildDate: '2024年4月',
    features: ['デザイナーズ', 'バス・トイレ別', 'エアコン', 'フローリング', '独立洗面台', '浴室乾燥機', '駐車場あり'],
    parking: '敷地内（月額4,000円）',
    badge: 'NEW',
  },

  // 172: 愛媛（リノベ）
  {
    name: 'リノベハウス今治',
    areaKey: 'ehime',
    prefecture: '愛媛県',
    city: '今治市',
    address: '愛媛県今治市常盤町',
    station: '今治駅まで徒歩5分',
    totalFloors: 5, floor: 3, direction: '南',
    price: 4.5, managementFee: 3000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 38.0, buildDate: '2010年6月',
    features: ['リノベーション', 'バス・トイレ別', 'エアコン', 'フローリング', '独立洗面台', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 173: 高知（ファミリー）
  {
    name: 'かつおテラス高知',
    areaKey: 'kochi',
    prefecture: '高知県',
    city: '高知市',
    address: '高知県高知市はりまや町',
    station: 'はりまや橋駅まで徒歩3分',
    totalFloors: 10, floor: 7, direction: '南',
    price: 5.5, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 52.0, buildDate: '2023年8月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '温水洗浄便座', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額4,000円）',
    badge: 'おすすめ物件',
  },

  // --- 九州・沖縄 ---

  // 174: 福岡（デザイナーズ）
  {
    name: 'デザイナーズ薬院',
    areaKey: 'fukuoka',
    prefecture: '福岡県',
    city: '福岡市中央区',
    address: '福岡県福岡市中央区薬院',
    station: '薬院駅まで徒歩2分',
    totalFloors: 10, floor: 7, direction: '南',
    price: 8.5, managementFee: 7000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 42.0, buildDate: '2024年12月',
    features: ['デザイナーズ', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '浴室乾燥機', '宅配ボックス', 'インターネット無料'],
    badge: 'NEW',
  },

  // 175: 福岡（ファミリー大型）
  {
    name: 'グランファミリア百道',
    areaKey: 'fukuoka',
    prefecture: '福岡県',
    city: '福岡市早良区',
    address: '福岡県福岡市早良区百道浜',
    station: '藤崎駅まで徒歩8分',
    totalFloors: 20, floor: 15, direction: '南西',
    price: 13.0, managementFee: 10000, depositMonths: 2, keyMoneyMonths: 1,
    type: 'マンション', layout: '3LDK', area: 78.0, buildDate: '2023年10月',
    features: ['オートロック', 'コンシェルジュ', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット', '食洗機', '眺望良好'],
    badge: 'おすすめ物件',
  },

  // 176: 福岡（学生向け）
  {
    name: 'キャンパスビレッジ箱崎',
    areaKey: 'fukuoka',
    prefecture: '福岡県',
    city: '福岡市東区',
    address: '福岡県福岡市東区箱崎',
    station: '箱崎駅まで徒歩3分',
    totalFloors: 6, floor: 4, direction: '南東',
    price: 3.8, managementFee: 2500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 21.0, buildDate: '2019年3月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', 'インターネット無料', '室内洗濯機置場', '自転車置場あり'],
  },

  // 177: 佐賀（ファミリー）
  {
    name: 'ファミリーテラス佐賀',
    areaKey: 'saga',
    prefecture: '佐賀県',
    city: '佐賀市',
    address: '佐賀県佐賀市駅前中央',
    station: '佐賀駅まで徒歩6分',
    totalFloors: 10, floor: 6, direction: '南',
    price: 5.5, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 52.0, buildDate: '2023年6月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額4,000円）',
    badge: 'おすすめ物件',
  },

  // 178: 長崎（デザイナーズ）
  {
    name: 'デザインレジデンス佐世保',
    areaKey: 'nagasaki',
    prefecture: '長崎県',
    city: '佐世保市',
    address: '長崎県佐世保市京坪町',
    station: '佐世保駅まで徒歩5分',
    totalFloors: 8, floor: 6, direction: '南',
    price: 5.5, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 38.0, buildDate: '2024年7月',
    features: ['デザイナーズ', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '浴室乾燥機', '温水洗浄便座'],
    badge: 'NEW',
  },

  // 179: 熊本（デザイナーズ）
  {
    name: 'モダンスイート熊本',
    areaKey: 'kumamoto',
    prefecture: '熊本県',
    city: '熊本市中央区',
    address: '熊本県熊本市中央区下通',
    station: '辛島町駅まで徒歩3分',
    totalFloors: 12, floor: 9, direction: '南西',
    price: 6.5, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2025年1月',
    features: ['デザイナーズ', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '浴室乾燥機', '宅配ボックス', 'インターネット無料'],
    badge: 'NEW',
  },

  // 180: 大分（ファミリー）
  {
    name: 'グランパーク大分',
    areaKey: 'oita',
    prefecture: '大分県',
    city: '大分市',
    address: '大分県大分市府内町',
    station: '大分駅まで徒歩4分',
    totalFloors: 14, floor: 10, direction: '南',
    price: 6.5, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 55.0, buildDate: '2024年1月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット'],
    badge: 'NEW',
  },

  // 181: 宮崎（ファミリー）
  {
    name: 'サンシャイン宮崎',
    areaKey: 'miyazaki',
    prefecture: '宮崎県',
    city: '宮崎市',
    address: '宮崎県宮崎市広島通',
    station: '宮崎駅まで徒歩5分',
    totalFloors: 10, floor: 7, direction: '南',
    price: 5.5, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 52.0, buildDate: '2023年9月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額4,000円）',
    badge: 'おすすめ物件',
  },

  // 182: 宮崎（ペット可）
  {
    name: 'ペットヴィレッジ延岡',
    areaKey: 'miyazaki',
    prefecture: '宮崎県',
    city: '延岡市',
    address: '宮崎県延岡市幸町',
    station: '延岡駅まで徒歩6分',
    totalFloors: 5, floor: 2, direction: '南',
    price: 4.0, managementFee: 2500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1LDK', area: 40.0, buildDate: '2021年2月',
    features: ['ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 183: 鹿児島（一人暮らし）
  {
    name: 'コンパクト鹿児島中央',
    areaKey: 'kagoshima',
    prefecture: '鹿児島県',
    city: '鹿児島市',
    address: '鹿児島県鹿児島市中央町',
    station: '鹿児島中央駅まで徒歩3分',
    totalFloors: 9, floor: 6, direction: '南',
    price: 4.2, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 24.0, buildDate: '2022年10月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', 'インターネット無料', '宅配ボックス'],
  },

  // 184: 沖縄（ファミリー）
  {
    name: 'パームヒルズ浦添',
    areaKey: 'okinawa',
    prefecture: '沖縄県',
    city: '浦添市',
    address: '沖縄県浦添市安波茶',
    station: 'ゆいレール経塚駅まで徒歩5分',
    totalFloors: 10, floor: 7, direction: '南',
    price: 8.5, managementFee: 6000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '3LDK', area: 72.0, buildDate: '2024年6月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット', '食洗機'],
    badge: 'NEW',
  },

  // 185: 沖縄（ペット可コンパクト）
  {
    name: 'ペットハウス首里',
    areaKey: 'okinawa',
    prefecture: '沖縄県',
    city: '那覇市',
    address: '沖縄県那覇市首里当蔵町',
    station: 'ゆいレール首里駅まで徒歩4分',
    totalFloors: 5, floor: 3, direction: '南西',
    price: 5.8, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 38.0, buildDate: '2022年8月',
    features: ['ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '温水洗浄便座'],
  },

  // --- さらに主要都市の追加分 ---

  // 186: 東京（八王子）
  {
    name: 'フォレストハイツ八王子',
    areaKey: 'tokyo',
    prefecture: '東京都',
    city: '八王子市',
    address: '東京都八王子市旭町',
    station: '八王子駅まで徒歩5分',
    totalFloors: 12, floor: 8, direction: '南',
    price: 7.0, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 52.0, buildDate: '2022年12月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', 'ウォークインクローゼット'],
  },

  // 187: 東京（立川）
  {
    name: 'シティフロント立川',
    areaKey: 'tokyo',
    prefecture: '東京都',
    city: '立川市',
    address: '東京都立川市曙町',
    station: '立川駅まで徒歩4分',
    totalFloors: 18, floor: 13, direction: '南',
    price: 10.0, managementFee: 8000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '2LDK', area: 55.0, buildDate: '2024年3月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', '24時間ゴミ出し可', 'インターネット無料'],
    badge: 'NEW',
  },

  // 188: 東京（町田）
  {
    name: 'リバーフロント町田',
    areaKey: 'tokyo',
    prefecture: '東京都',
    city: '町田市',
    address: '東京都町田市原町田',
    station: '町田駅まで徒歩3分',
    totalFloors: 10, floor: 7, direction: '南西',
    price: 8.0, managementFee: 6000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 42.0, buildDate: '2023年7月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '温水洗浄便座', '追い焚き風呂', '宅配ボックス'],
    badge: 'おすすめ物件',
  },

  // 189: 神奈川（横須賀）
  {
    name: 'オーシャンビュー横須賀',
    areaKey: 'kanagawa',
    prefecture: '神奈川県',
    city: '横須賀市',
    address: '神奈川県横須賀市若松町',
    station: '横須賀中央駅まで徒歩4分',
    totalFloors: 12, floor: 9, direction: '南',
    price: 7.5, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2023年1月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '宅配ボックス', '眺望良好'],
    badge: 'おすすめ物件',
  },

  // 190: 大阪（テレワーク）
  {
    name: 'ワークライフ本町',
    areaKey: 'osaka',
    prefecture: '大阪府',
    city: '大阪市中央区',
    address: '大阪府大阪市中央区本町',
    station: '本町駅まで徒歩2分',
    totalFloors: 15, floor: 11, direction: '南',
    price: 9.0, managementFee: 7000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 42.0, buildDate: '2024年8月',
    features: ['テレワーク対応', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', 'インターネット無料', '宅配ボックス', '24時間ゴミ出し可'],
    badge: 'NEW',
  },

  // 191: 大阪（女性向け）
  {
    name: 'エレガント心斎橋',
    areaKey: 'osaka',
    prefecture: '大阪府',
    city: '大阪市中央区',
    address: '大阪府大阪市中央区心斎橋筋',
    station: '心斎橋駅まで徒歩2分',
    totalFloors: 12, floor: 8, direction: '南西',
    price: 7.8, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1DK', area: 28.0, buildDate: '2023年4月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '独立洗面台', '浴室乾燥機', '宅配ボックス', 'TVモニター付きインターホン'],
  },

  // 192: 愛知（テレワーク）
  {
    name: 'ワークスペース伏見',
    areaKey: 'aichi',
    prefecture: '愛知県',
    city: '名古屋市中区',
    address: '愛知県名古屋市中区錦',
    station: '伏見駅まで徒歩2分',
    totalFloors: 14, floor: 10, direction: '南',
    price: 8.5, managementFee: 6000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2024年10月',
    features: ['テレワーク対応', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', 'インターネット無料', '宅配ボックス', '24時間ゴミ出し可'],
    badge: 'NEW',
  },

  // 193: 愛知（ペット可ファミリー）
  {
    name: 'ペットフレンドリー一社',
    areaKey: 'aichi',
    prefecture: '愛知県',
    city: '名古屋市名東区',
    address: '愛知県名古屋市名東区一社',
    station: '一社駅まで徒歩3分',
    totalFloors: 8, floor: 4, direction: '南',
    price: 8.0, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '2LDK', area: 55.0, buildDate: '2022年2月',
    features: ['ペット可', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'ウォークインクローゼット', '室内洗濯機置場'],
  },

  // 194: 兵庫（デザイナーズ）
  {
    name: 'デザインロフト三宮',
    areaKey: 'hyogo',
    prefecture: '兵庫県',
    city: '神戸市中央区',
    address: '兵庫県神戸市中央区北長狭通',
    station: '三ノ宮駅まで徒歩3分',
    totalFloors: 8, floor: 6, direction: '南',
    price: 8.0, managementFee: 6000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2024年11月',
    features: ['デザイナーズ', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '浴室乾燥機', '独立洗面台', 'インターネット無料'],
    badge: 'NEW',
  },

  // 195: 石川（一人暮らし）
  {
    name: 'スマートステイ金沢',
    areaKey: 'ishikawa',
    prefecture: '石川県',
    city: '金沢市',
    address: '石川県金沢市片町',
    station: '野町駅まで徒歩5分',
    totalFloors: 7, floor: 5, direction: '南東',
    price: 4.0, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 24.0, buildDate: '2020年4月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', 'インターネット無料', '二重窓'],
  },

  // 196: 山梨（ペット可）
  {
    name: 'ペットテラス甲府南',
    areaKey: 'yamanashi',
    prefecture: '山梨県',
    city: '甲府市',
    address: '山梨県甲府市住吉',
    station: '南甲府駅まで徒歩8分',
    totalFloors: 5, floor: 2, direction: '南',
    price: 4.8, managementFee: 3000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'アパート', layout: '1LDK', area: 42.0, buildDate: '2021年7月',
    features: ['ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額4,000円）',
  },

  // 197: 福岡（リノベ）
  {
    name: 'リノベスタイル大名',
    areaKey: 'fukuoka',
    prefecture: '福岡県',
    city: '福岡市中央区',
    address: '福岡県福岡市中央区大名',
    station: '赤坂駅まで徒歩3分',
    totalFloors: 5, floor: 3, direction: '南',
    price: 7.0, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2011年9月',
    features: ['リノベーション', 'デザイナーズ', 'バス・トイレ別', 'エアコン', 'フローリング', '独立洗面台', 'システムキッチン', '室内洗濯機置場'],
    badge: 'おすすめ物件',
  },

  // 198: 神奈川（一戸建て）
  {
    name: 'ガーデンコート茅ヶ崎',
    areaKey: 'kanagawa',
    prefecture: '神奈川県',
    city: '茅ヶ崎市',
    address: '神奈川県茅ヶ崎市幸町',
    station: '茅ヶ崎駅まで徒歩7分',
    totalFloors: 2, floor: 1, direction: '南',
    price: 11.0, managementFee: 0, depositMonths: 2, keyMoneyMonths: 1,
    type: '一戸建て', layout: '3LDK', area: 90.0, buildDate: '2021年3月',
    features: ['駐車場あり', 'ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'システムキッチン', '庭付き'],
    parking: '敷地内（1台分）',
  },

  // 199: 千葉（テレワーク）
  {
    name: 'ワークスタイル流山',
    areaKey: 'chiba',
    prefecture: '千葉県',
    city: '流山市',
    address: '千葉県流山市おおたかの森北',
    station: '流山おおたかの森駅まで徒歩3分',
    totalFloors: 14, floor: 10, direction: '南',
    price: 9.5, managementFee: 7000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '2LDK', area: 55.0, buildDate: '2024年7月',
    features: ['テレワーク対応', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', 'インターネット無料', '宅配ボックス', '追い焚き風呂', '24時間ゴミ出し可'],
    badge: 'NEW',
  },

  // 200: 埼玉（テレワーク）
  {
    name: 'ワークプラザさいたま新都心',
    areaKey: 'saitama',
    prefecture: '埼玉県',
    city: 'さいたま市中央区',
    address: '埼玉県さいたま市中央区新都心',
    station: 'さいたま新都心駅まで徒歩3分',
    totalFloors: 20, floor: 15, direction: '南',
    price: 11.0, managementFee: 9000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '2LDK', area: 55.0, buildDate: '2025年2月',
    features: ['テレワーク対応', 'タワーマンション', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', 'インターネット無料', '宅配ボックス', '24時間ゴミ出し可'],
    badge: 'NEW',
  },

  // 201: 京都（ペット可）
  {
    name: 'ペットフレンドリー嵐山',
    areaKey: 'kyoto',
    prefecture: '京都府',
    city: '京都市右京区',
    address: '京都府京都市右京区嵯峨天龍寺',
    station: '嵐山駅まで徒歩5分',
    totalFloors: 4, floor: 2, direction: '南',
    price: 6.8, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2021年5月',
    features: ['ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '眺望良好'],
  },

  // 202: 大阪（コンパクト高級）
  {
    name: 'プレミアムスイート北浜',
    areaKey: 'osaka',
    prefecture: '大阪府',
    city: '大阪市中央区',
    address: '大阪府大阪市中央区北浜',
    station: '北浜駅まで徒歩2分',
    totalFloors: 25, floor: 20, direction: '南',
    price: 15.0, managementFee: 12000, depositMonths: 2, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 48.0, buildDate: '2024年11月',
    features: ['タワーマンション', 'デザイナーズ', 'オートロック', 'コンシェルジュ', '宅配ボックス', '浴室乾燥機', 'インターネット無料', '24時間ゴミ出し可'],
    badge: 'NEW',
  },

  // 203: 広島（ペット可）
  {
    name: 'ペットレジデンス廿日市',
    areaKey: 'hiroshima',
    prefecture: '広島県',
    city: '廿日市市',
    address: '広島県廿日市市地御前',
    station: '廿日市駅まで徒歩6分',
    totalFloors: 6, floor: 3, direction: '南',
    price: 5.0, managementFee: 3500, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 42.0, buildDate: '2022年1月',
    features: ['ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額4,000円）',
  },

  // 204: 北海道（テレワーク）
  {
    name: 'ワークベース札幌',
    areaKey: 'hokkaido',
    prefecture: '北海道',
    city: '札幌市中央区',
    address: '北海道札幌市中央区北2条西',
    station: 'さっぽろ駅まで徒歩3分',
    totalFloors: 15, floor: 10, direction: '南',
    price: 6.5, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 38.0, buildDate: '2024年2月',
    features: ['テレワーク対応', 'オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', 'インターネット無料', '宅配ボックス', '二重窓'],
    badge: 'NEW',
  },

  // 205: 宮城（リノベ）
  {
    name: 'リノベスタイル国分町',
    areaKey: 'miyagi',
    prefecture: '宮城県',
    city: '仙台市青葉区',
    address: '宮城県仙台市青葉区国分町',
    station: '勾当台公園駅まで徒歩3分',
    totalFloors: 6, floor: 4, direction: '南',
    price: 6.5, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 38.0, buildDate: '2013年5月',
    features: ['リノベーション', 'バス・トイレ別', 'エアコン', 'フローリング', '独立洗面台', 'システムキッチン', '室内洗濯機置場'],
    badge: 'おすすめ物件',
  },

  // 206: 岡山（ペット可）
  {
    name: 'ペットガーデン津山',
    areaKey: 'okayama',
    prefecture: '岡山県',
    city: '津山市',
    address: '岡山県津山市山下',
    station: '津山駅まで徒歩8分',
    totalFloors: 5, floor: 2, direction: '南',
    price: 3.8, managementFee: 2500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1LDK', area: 40.0, buildDate: '2020年5月',
    features: ['ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 207: 栃木（デザイナーズ）
  {
    name: 'デザインフラット那須塩原',
    areaKey: 'tochigi',
    prefecture: '栃木県',
    city: '那須塩原市',
    address: '栃木県那須塩原市大原間',
    station: '那須塩原駅まで徒歩5分',
    totalFloors: 5, floor: 3, direction: '南',
    price: 4.5, managementFee: 3000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 38.0, buildDate: '2023年12月',
    features: ['デザイナーズ', 'バス・トイレ別', 'エアコン', 'フローリング', '独立洗面台', '駐車場あり'],
    parking: '敷地内（月額4,000円）',
    badge: 'NEW',
  },

  // 208: 群馬（一人暮らし）
  {
    name: 'プチガーデン太田',
    areaKey: 'gunma',
    prefecture: '群馬県',
    city: '太田市',
    address: '群馬県太田市浜町',
    station: '太田駅まで徒歩6分',
    totalFloors: 5, floor: 3, direction: '南東',
    price: 3.8, managementFee: 2500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 24.0, buildDate: '2019年8月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 209: 和歌山（ペット可）
  {
    name: 'ペットテラス白浜',
    areaKey: 'wakayama',
    prefecture: '和歌山県',
    city: '西牟婁郡白浜町',
    address: '和歌山県西牟婁郡白浜町',
    station: '白浜駅まで徒歩10分',
    totalFloors: 4, floor: 2, direction: '南',
    price: 4.0, managementFee: 2500, depositMonths: 1, keyMoneyMonths: 0,
    type: 'アパート', layout: '1LDK', area: 40.0, buildDate: '2020年8月',
    features: ['ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '眺望良好', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 210: 山口（一人暮らし）
  {
    name: 'スマートコート山口',
    areaKey: 'yamaguchi',
    prefecture: '山口県',
    city: '山口市',
    address: '山口県山口市中央',
    station: '山口駅まで徒歩6分',
    totalFloors: 6, floor: 4, direction: '南',
    price: 3.8, managementFee: 2500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 24.0, buildDate: '2021年3月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 211: 佐賀（一人暮らし）
  {
    name: 'プチメゾン鳥栖',
    areaKey: 'saga',
    prefecture: '佐賀県',
    city: '鳥栖市',
    address: '佐賀県鳥栖市京町',
    station: '鳥栖駅まで徒歩4分',
    totalFloors: 6, floor: 4, direction: '南',
    price: 3.5, managementFee: 2500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 23.0, buildDate: '2020年11月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 212: 大分（一人暮らし）
  {
    name: 'コンパクト中津',
    areaKey: 'oita',
    prefecture: '大分県',
    city: '中津市',
    address: '大分県中津市豊田町',
    station: '中津駅まで徒歩5分',
    totalFloors: 5, floor: 3, direction: '南',
    price: 3.5, managementFee: 2500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 24.0, buildDate: '2019年6月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 213: 熊本（ペット可）
  {
    name: 'ペットフレンドリー八代',
    areaKey: 'kumamoto',
    prefecture: '熊本県',
    city: '八代市',
    address: '熊本県八代市本町',
    station: '八代駅まで徒歩7分',
    totalFloors: 5, floor: 2, direction: '南',
    price: 4.0, managementFee: 2500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1LDK', area: 40.0, buildDate: '2021年4月',
    features: ['ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 214: 鹿児島（デザイナーズ）
  {
    name: 'デザイナーズ指宿',
    areaKey: 'kagoshima',
    prefecture: '鹿児島県',
    city: '指宿市',
    address: '鹿児島県指宿市湊',
    station: '指宿駅まで徒歩5分',
    totalFloors: 5, floor: 4, direction: '南',
    price: 4.5, managementFee: 3000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 38.0, buildDate: '2024年5月',
    features: ['デザイナーズ', 'バス・トイレ別', 'エアコン', 'フローリング', '独立洗面台', '眺望良好', '温泉引込可'],
    badge: 'NEW',
  },

  // 215: 長崎（一人暮らし）
  {
    name: 'ステーション諫早',
    areaKey: 'nagasaki',
    prefecture: '長崎県',
    city: '諫早市',
    address: '長崎県諫早市永昌町',
    station: '諫早駅まで徒歩3分',
    totalFloors: 7, floor: 5, direction: '南',
    price: 4.0, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 24.0, buildDate: '2022年3月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '温水洗浄便座'],
  },

  // 216: 福井（一人暮らし）
  {
    name: 'コンパクト敦賀',
    areaKey: 'fukui',
    prefecture: '福井県',
    city: '敦賀市',
    address: '福井県敦賀市白銀町',
    station: '敦賀駅まで徒歩5分',
    totalFloors: 6, floor: 4, direction: '南東',
    price: 3.8, managementFee: 2500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 24.0, buildDate: '2020年9月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 217: 茨城（一人暮らし）
  {
    name: 'ステーションコート日立',
    areaKey: 'ibaraki',
    prefecture: '茨城県',
    city: '日立市',
    address: '茨城県日立市幸町',
    station: '日立駅まで徒歩4分',
    totalFloors: 8, floor: 5, direction: '南',
    price: 4.5, managementFee: 3500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 25.0, buildDate: '2021年10月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '温水洗浄便座'],
  },

  // 218: 滋賀（一人暮らし）
  {
    name: 'レイクコンパクト大津',
    areaKey: 'shiga',
    prefecture: '滋賀県',
    city: '大津市',
    address: '滋賀県大津市春日町',
    station: '大津京駅まで徒歩3分',
    totalFloors: 8, floor: 6, direction: '南西',
    price: 4.8, managementFee: 3500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 24.0, buildDate: '2023年1月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', 'インターネット無料', '眺望良好'],
  },

  // 219: 徳島（一人暮らし）
  {
    name: 'プチメゾン鳴門',
    areaKey: 'tokushima',
    prefecture: '徳島県',
    city: '鳴門市',
    address: '徳島県鳴門市撫養町斎田',
    station: '鳴門駅まで徒歩6分',
    totalFloors: 5, floor: 3, direction: '南',
    price: 3.5, managementFee: 2500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 24.0, buildDate: '2019年10月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 220: 高知（一人暮らし）
  {
    name: 'コンパクト高知駅前',
    areaKey: 'kochi',
    prefecture: '高知県',
    city: '高知市',
    address: '高知県高知市栄田町',
    station: '高知駅まで徒歩3分',
    totalFloors: 8, floor: 5, direction: '南',
    price: 3.8, managementFee: 2500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 23.0, buildDate: '2021年9月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '温水洗浄便座'],
  },

  // 221: 奈良（一人暮らし）
  {
    name: 'プチレジ生駒',
    areaKey: 'nara',
    prefecture: '奈良県',
    city: '生駒市',
    address: '奈良県生駒市北新町',
    station: '生駒駅まで徒歩3分',
    totalFloors: 7, floor: 5, direction: '南',
    price: 4.5, managementFee: 3000, depositMonths: 0, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 24.0, buildDate: '2022年6月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', 'インターネット無料'],
  },

  // 222: 島根（一人暮らし）
  {
    name: 'ステーションハイツ益田',
    areaKey: 'shimane',
    prefecture: '島根県',
    city: '益田市',
    address: '島根県益田市駅前町',
    station: '益田駅まで徒歩4分',
    totalFloors: 5, floor: 3, direction: '南',
    price: 3.5, managementFee: 2500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 24.0, buildDate: '2018年11月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額2,000円）',
  },

  // 223: 鳥取（一人暮らし）
  {
    name: 'コンパクト米子',
    areaKey: 'tottori',
    prefecture: '鳥取県',
    city: '米子市',
    address: '鳥取県米子市明治町',
    station: '米子駅まで徒歩5分',
    totalFloors: 6, floor: 4, direction: '南',
    price: 3.5, managementFee: 2500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 23.0, buildDate: '2020年2月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 224: 香川（一人暮らし）
  {
    name: 'プチメゾン坂出',
    areaKey: 'kagawa',
    prefecture: '香川県',
    city: '坂出市',
    address: '香川県坂出市駒止町',
    station: '坂出駅まで徒歩4分',
    totalFloors: 5, floor: 3, direction: '南東',
    price: 3.5, managementFee: 2500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 23.0, buildDate: '2019年4月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 225: 愛媛（一人暮らし）
  {
    name: 'ステーションコート新居浜',
    areaKey: 'ehime',
    prefecture: '愛媛県',
    city: '新居浜市',
    address: '愛媛県新居浜市坂井町',
    station: '新居浜駅まで徒歩5分',
    totalFloors: 6, floor: 4, direction: '南',
    price: 3.5, managementFee: 2500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 23.0, buildDate: '2020年7月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 226: 宮城（一戸建て）
  {
    name: 'ガーデンコート利府',
    areaKey: 'miyagi',
    prefecture: '宮城県',
    city: '宮城郡利府町',
    address: '宮城県宮城郡利府町利府',
    station: '利府駅まで徒歩8分',
    totalFloors: 2, floor: 1, direction: '南',
    price: 8.0, managementFee: 0, depositMonths: 2, keyMoneyMonths: 1,
    type: '一戸建て', layout: '4LDK', area: 100.0, buildDate: '2022年3月',
    features: ['駐車場あり', 'ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'システムキッチン', '庭付き'],
    parking: '敷地内（2台分）',
  },

  // 227: 愛知（女性向け）
  {
    name: 'エレガンス藤が丘',
    areaKey: 'aichi',
    prefecture: '愛知県',
    city: '名古屋市名東区',
    address: '愛知県名古屋市名東区藤が丘',
    station: '藤が丘駅まで徒歩3分',
    totalFloors: 8, floor: 6, direction: '南',
    price: 6.0, managementFee: 4000, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1K', area: 26.0, buildDate: '2023年11月',
    features: ['オートロック', 'バス・トイレ別', 'エアコン', 'フローリング', '独立洗面台', '浴室乾燥機', '宅配ボックス', 'TVモニター付きインターホン'],
    badge: 'おすすめ物件',
  },

  // 228: 福岡（一戸建て）
  {
    name: 'ヴィラ春日',
    areaKey: 'fukuoka',
    prefecture: '福岡県',
    city: '春日市',
    address: '福岡県春日市春日原',
    station: '春日原駅まで徒歩5分',
    totalFloors: 2, floor: 1, direction: '南',
    price: 9.0, managementFee: 0, depositMonths: 2, keyMoneyMonths: 1,
    type: '一戸建て', layout: '4LDK', area: 98.0, buildDate: '2021年8月',
    features: ['駐車場あり', 'ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'システムキッチン', '庭付き'],
    parking: '敷地内（2台分）',
  },

  // 229: 静岡（デザイナーズ）
  {
    name: 'デザインフラット熱海',
    areaKey: 'shizuoka',
    prefecture: '静岡県',
    city: '熱海市',
    address: '静岡県熱海市銀座町',
    station: '熱海駅まで徒歩8分',
    totalFloors: 6, floor: 5, direction: '南東',
    price: 7.5, managementFee: 5000, depositMonths: 1, keyMoneyMonths: 1,
    type: 'マンション', layout: '1LDK', area: 40.0, buildDate: '2024年1月',
    features: ['デザイナーズ', 'バス・トイレ別', 'エアコン', 'フローリング', '独立洗面台', '眺望良好', '温泉引込可'],
    badge: 'NEW',
  },

  // 230: 岐阜（一人暮らし）
  {
    name: 'プチコート各務原',
    areaKey: 'gifu',
    prefecture: '岐阜県',
    city: '各務原市',
    address: '岐阜県各務原市蘇原柿沢町',
    station: '六軒駅まで徒歩5分',
    totalFloors: 5, floor: 3, direction: '南',
    price: 3.5, managementFee: 2500, depositMonths: 0, keyMoneyMonths: 0,
    type: 'アパート', layout: '1K', area: 23.0, buildDate: '2019年12月',
    features: ['バス・トイレ別', 'エアコン', 'フローリング', '室内洗濯機置場', '駐車場あり'],
    parking: '敷地内（月額3,000円）',
  },

  // 231: 沖縄（一戸建て）
  {
    name: 'コーラルハウス読谷',
    areaKey: 'okinawa',
    prefecture: '沖縄県',
    city: '中頭郡読谷村',
    address: '沖縄県中頭郡読谷村楚辺',
    station: 'バス停楚辺まで徒歩3分',
    totalFloors: 2, floor: 1, direction: '南',
    price: 8.0, managementFee: 0, depositMonths: 2, keyMoneyMonths: 1,
    type: '一戸建て', layout: '3LDK', area: 85.0, buildDate: '2022年5月',
    features: ['駐車場あり', 'ペット可', 'バス・トイレ別', 'エアコン', 'フローリング', '追い焚き風呂', 'システムキッチン', '庭付き', '眺望良好'],
    parking: '敷地内（2台分）',
  },

  // 232: 三重（デザイナーズ）
  {
    name: 'デザインメゾン伊勢',
    areaKey: 'mie',
    prefecture: '三重県',
    city: '伊勢市',
    address: '三重県伊勢市本町',
    station: '伊勢市駅まで徒歩4分',
    totalFloors: 6, floor: 4, direction: '南',
    price: 5.0, managementFee: 3500, depositMonths: 1, keyMoneyMonths: 0,
    type: 'マンション', layout: '1LDK', area: 38.0, buildDate: '2024年8月',
    features: ['デザイナーズ', 'バス・トイレ別', 'エアコン', 'フローリング', '独立洗面台', '浴室乾燥機', '駐車場あり'],
    parking: '敷地内（月額4,000円）',
    badge: 'NEW',
  },
]

export default Object.freeze(SEEDS)
