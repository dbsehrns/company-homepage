import type { Dictionary } from "./en";

// Translated from the English site. People's names and the office
// addresses stay in English (the form used for mail and map search).
const ja: Dictionary = {
  meta: {
    title: "EASO | Easy Solution",
    description:
      "精密整形外科手術のためのAXトランスフォーメーションとスマート製造を推進します。株式会社EASOによるAIベースの患者適合型手術器具（PSI）設計プラットフォームとハイブリッド関節鏡カニューレ。",
  },
  languageLabel: "言語",
  contactButton: "お問い合わせ",
  hero: {
    lines: [
      "精密整形外科手術のためのAXトランスフォーメーションとスマート製造を推進します。",
      "インテリジェントなAIシステムが外科医の能力を拡張し、不確実性を取り除きます。",
    ],
  },
  about: {
    paragraphs: [
      "株式会社EASOは、精密医療のあり方を再定義するインテリジェントなシステムを開発しています。",
      "先進的なAIにより、複雑で手作業に頼るワークフローを自動化されたプロセスへと転換し、正確性・一貫性・効率性を実現します。",
    ],
    emphasis: "私たちはプロセスを改善するだけではありません。AIでプロセスそのものを再定義します。",
  },
  solutions: {
    rtptial: {
      imageAlts: ["RTPtial PSI 1", "RTPtial PSI 2"],
      viewer: {
        label: "RTPtial-PSIガイドの3Dビューア",
        models: { humerus: "上腕骨PSI", glenoid: "関節窩PSI" },
        loading: "3Dモデルを読み込み中…",
        hintRotate: "ドラッグで回転",
        hintClickZoom: "クリック後、スクロールでズーム",
        hintScroll: "スクロールでズーム",
        hintPinch: "ピンチでズーム",
        tapToExplore: "タップして3Dで見る",
        done: "完了",
        bone: "骨を表示",
        reset: "視点をリセット",
        expand: "全画面表示",
        collapse: "全画面を閉じる",
      },
      description:
        "RTPtial-PSIは、人工関節全置換術向けの3Dプリント患者適合型手術器具（PSI）を、AIによって完全自動で設計・製作するプラットフォームです。外科医に一貫した手術結果をもたらし、手術の最も重要な工程におけるリスクを低減します。",
      features: [
        "樹脂または金属でプリントする上腕骨頭切除用PSI",
        "画像をアップロードしてワンクリック設計、3分以内に最終PSIが完成",
        "0.1°単位の後捻角の自動設定と髄腔エントリー軸ガイド",
        "固定ピンガイド一体型のシンプルで剛性の高いソーガイド",
        "インストール不要のWebベース：確認、プリント、自動製作まで",
      ],
    },
    arthroSpacer: {
      slideAlts: [
        "ArthroSpacer ハイブリッドカニューレ 3本セット",
        "ArthroSpacer ハイブリッドカニューレ 側面",
        "ArthroSpacer カニューレ 立てた状態",
        "ArthroSpacer カニューレ 立てた状態の側面",
        "ArthroSpacer カニューレ 斜めから見た状態",
        "ArthroSpacer カニューレ 寝かせた状態の側面",
        "ArthroSpacer カニューレ マルチウイングの詳細",
        "ArthroSpacer カニューレ 器具ポートの詳細",
        "ArthroSpacer カニューレ 詳細コラージュ",
      ],
      description:
        "ArthroSpacerは、臨床データに基づく関節鏡用ハイブリッドカニューレです。手術中しっかりと固定され、灌流液の漏れを最小限に抑えるよう再設計されています。術野をクリアに保ち、より効率的で信頼性の高い関節鏡手術を実現します。",
      features: [
        "リングタイ固定で確実に保持し、抜けを軽減",
        "マルチウイングによる組織の牽引",
        "デュアルシールで液漏れを防止",
        "広い内腔で縫合糸の絡まりを防止",
        "矢じり形の先端と最適化したシリコン硬度により、組織損傷を抑えてスムーズに挿入",
      ],
    },
  },
  slider: {
    previous: "前の画像",
    next: "次の画像",
    show: "{total}枚中{n}枚目の画像を表示",
  },
  team: {
    intro:
      "前職にて、開発から薬事承認、臨床検証、事業化まで、医療機器のライフサイクル全体を共に担ってきたコアメンバーと実務エキスパートによるチームです。",
    ceo: {
      role: "CEO",
      name: "Louis Youn, Ph.D.",
      items: [
        "韓国カトリック大学校 医科大学 医工学博士",
        "株式会社EASO 代表取締役",
        "延世大学校 医科大学 融合医学科 兼任教授",
        "元 株式会社KAVILAB 副代表・最高技術責任者・品質責任者（イグジット済み）",
        "元 新韓大学校 マイクロディグリー大学 企業専門教授",
        "元 Proton Therapy Pte. Ltd.（シンガポール）臨床助教授・医学物理士",
        "元 名古屋陽子線治療センター 医学物理士インターン",
        "元 近畿大学病院 非常勤講師",
        "元 韓国カトリック大学校 医科大学 研究助教授",
        "元 スタンフォード大学 MIPS 共同研究員（米国）",
        "元 カリフォルニア大学デービス校 BMEGG 共同研究員（米国）",
      ],
    },
    members: {
      coo: {
        role: "COO / 副代表",
        name: "Moo-Sub Kim, Ph.D.",
        items: [
          "韓国カトリック大学校 医科大学 医工学博士",
          "株式会社EASO 副代表・COO",
          "元 株式会社KAVILAB 副代表・COO（イグジット済み）",
          "元 延世大学校 医科大学 融合医学科 兼任教授",
          "元 新韓大学校 企業専門教授",
          "元 韓国カトリック大学校 生体医工学研究所 研究員",
          "元 ソウル聖母病院 医療機器研究員",
          "医療機器の研究開発に12年従事",
          "SCI論文の掲載および特許登録",
          "政府支援R&D事業の研究責任者を多数担当",
        ],
      },
      cso: {
        role: "CSO / ディレクター",
        name: "Hyeonjoo Kim, M.S.",
        items: [
          "延世大学校 医科大学 医療機器産業学修士",
          "株式会社EASO 最高戦略責任者（CSO）",
          "元 株式会社KAVILAB RA/QA責任者",
          "元 株式会社Medical IP RA/QA",
          "RA/QA経験10年",
          "医療画像分野におけるAIベースのデジタル医療製品の事業企画",
          "韓国内外の市場参入戦略および経営戦略の策定",
          "韓国クラスI〜III医療機器の承認取得、海外薬事：FDA / CE MDR",
          "ISO 13485 / MDSAPに基づくQMSの構築・運用",
          "GMP / DGMP認証、内部監査、市販後調査（PMS）",
          "臨床試験・性能試験の設計",
        ],
      },
      cmo: {
        role: "CMO / ディレクター",
        name: "Young Dae Jeon, M.D., Ph.D.",
        items: [
          "蔚山大学校 医科大学 整形外科学博士",
          "株式会社EASO 最高医療責任者（CMO）",
          "蔚山大学校 医科大学 整形外科学教室 助教授",
          "元 株式会社KAVILAB 最高医療責任者（CMO）",
          "元 盆唐ソウル大学校病院 肩・肘関節フェロー",
          "韓国関節鏡学会 国際交流委員会 委員",
          "韓国肩肘関節学会 学術委員会 委員",
          "整形外科スポーツ医学 認定専門医",
          "アジア太平洋整形外科学会（APOA）肩・肘部門 学術委員会 委員",
          "韓国肩肘関節学会 編集運営委員会 幹事",
        ],
      },
      qa: {
        role: "QAエンジニア",
        name: "Da-Young Lee",
        items: [
          "ソウル女子大学校 マルチメディア学士",
          "株式会社EASO QAエンジニア",
          "元 株式会社KAVILAB データ品質チームリーダー",
          "元 株式会社Medical IP データサイエンスチーム データマネージャー",
          "医療画像データ・アノテーション",
          "データベース構築・品質管理",
        ],
      },
      hw: {
        role: "HWエンジニア",
        name: "Beom-Su Kim",
        items: [
          "東南保健大学校 保健3Dプリンティング融合 専門学士",
          "株式会社EASO HWエンジニア",
          "元 株式会社KAVILAB 技術サポートチームリーダー",
          "3Dプリント医療機器の設計・製作",
          "装置運用・技術サポート",
          "生産品質管理",
        ],
      },
      sw: {
        role: "SW/AIエンジニア",
        name: "Jungho Uh",
        items: [
          "湖西大学校 コンピュータ工学士",
          "株式会社EASO SW/AIエンジニア",
          "元 株式会社KAVILAB SW/AIエンジニア",
          "医療AIソフトウェア開発",
          "ITシステム運用",
          "AIによる自動設計プラットフォーム",
        ],
      },
      intern: {
        role: "SW/AIエンジニア",
        name: "JoongHoon Shin",
        items: [
          "建国大学校 ソフトウェア学士",
          "株式会社EASO SW/AIエンジニア",
          "医療AIソフトウェア開発",
          "ITシステム運用",
          "AIによる自動設計プラットフォーム",
        ],
      },
    },
  },
  contact: {
    officesLabel: "EASOの拠点",
    offices: {
      hq: {
        tab: "本社・蔚山",
        name: "EASO本社（蔚山大学校 医科大学）",
      },
      rnd: {
        tab: "R&Dセンター・ソウル",
        name: "EASO R&Dセンター（Bangbae-AcroRiver 104棟）",
      },
    },
    mapTitlePrefix: "Googleマップ：",
    openInMaps: "Googleマップで開く",
    addresses: {
      hq: {
        label: "本社",
        text: "#301-1, College of Medicine, University of Ulsan, 30 Badeurae 1-gil, Dong-gu, Ulsan, Republic of Korea",
      },
      rnd: {
        label: "R&Dセンター",
        text: "Bldg 104, #B107, Bangbae-AcroRiver, 207-10 Bangbaejungang-ro, Seocho-gu, Seoul, Republic of Korea",
      },
    },
    lines: [
      "TEL：+82-70-4077-0601",
      "携帯：+82-10-3115-3758",
      "FAX：+82-70-7507-6666",
      "Email：louis@easo.co.kr",
      "Web：easo.co.kr",
    ],
    careers: {
      heading: "採用情報（通年採用）",
      lines: [
        "募集職種：QA / HW / SW / データエンジニア（医療機器業界の経験者優遇）",
        "業務内容：職種ごとに経験とスキルに応じて担当",
        "応募資格：学歴・経歴不問",
        "給与：応相談",
        "勤務時間：月〜金 9:00〜18:00",
        "選考プロセス：書類選考 → 一次面接 → 二次面接 → 内定",
        "提出書類：履歴書・ポートフォリオ（書式自由）",
        "応募方法：louis@easo.co.kr までメールでご応募ください",
      ],
    },
  },
};

export default ja;
