// ── 自己紹介 ──────────────────────────────────────────────────
const ABOUT = {
  bio: `東京都立大学大学院 システムデザイン研究科 情報科学域専攻 M1

技術・研究・ビジネスの領域を横断して行動し続ける推進力が私の強みです。

長期インターンではRoRを用いたBtoBプラットフォーム開発に加え、社内データ移行プロジェクトのリードと、心理的安全性をDB設計で担保する従業員サーベイシステムの要件定義・開発を主導しました。

研究では複数画像からの3次元形状復元に取り組み、学会発表で成果を報告。さらにビジネスアイデアコンテストで準優勝を収めるなど、エンジニアリングに留まらず事業視点でも動いてきました。

「やってみる」を繰り返す中で培った、技術と人間行動を結びつける思考を活かしたいと考えています。`,

  skills: ["JavaScript", "Python", "Ruby", "Ruby on Rails", "React", "Next.js"],

  links: [],
};

// ── 作品 ──────────────────────────────────────────────────────
const WORKS = [
  {
    title: "「Pulseee」従業員パルスサーベイシステム",
    url: "https://pulseee.onrender.com",
    thumbnail: "images/Pulseee.gif",
    tags: ["Ruby on Rais", "JavaScript", "PostgreSQL", "NeonDB", "Render"],
    desc: "人事担当者や経営者が組織の状態をリアルタイムに把握するためのパルスサーベイツールとして、Ruby on Rails + Hotwire + PostgreSQL + Google OAuth 構成を用いて、複雑な認証設定や外部SaaSへの依存を最小限に抑えながら、Solid Queue による非同期ジョブとSlack Webhook 連携による自動通知により、サーベイ対象者への定期配信・未回答リマインドを人の手を介さずに動かし続け、ロールベースのアクセス制御と匿名性を保った定量集計により、管理者は回収率やグループ別スコアをダッシュボードで即座に確認できる、エンジニアなしでも日常運用が回るサーベイ基盤。",
  },
  {
    title: "フリーランスアーティストの公式Webサイト",
    url: "",
    thumbnail: "images/ishikawa-official.gif",
    tags: ["Next.js", "microCMS", "Vercel", "Tailwind CSS", "Cloudflare"],
    desc: "フリーランスのクラリネット奏者の公式サイトとして、Jamstack構成（Next.js+microCMS+Vercel）を用いて、ドメイン代以外の運用コストと保守の手間を抑えつつ、高速かつSEOに強い静的配信を実現し、スマートフォン対応CMSとWebhook連携による自動ビルドにより、公演前後の多忙なタイミングでも本人が日付・会場・プログラム等を入力するだけで最新情報を即座に発信できる、エンジニアレス運用のWebサイト。",
  },
  {
    title:
      "「T-muse」都立大の都立大生による都立大生のためのWebアプリケーション",
    url: "",
    thumbnail: "images/T-muse.gif",
    tags: ["Ruby on Rails", "React", "Vercel", "Tailwind CSS", "Cloudflare"],
    desc: "都立大生の授業選びを支援する、履修登録＋授業レビューアプリ。授業レビュー数を圧倒的に増やし、学生と教員の双方向フィードバックを可能に。これまでバラバラだった授業情報・レビュー・履修管理を一つのプラットフォームに統合。まず都立大で展開し、その後は他大学にも展開して各大学固有の悩み解決を目指す。",
  },
];

// ── 記事 ──────────────────────────────────────────────────────
const ARTICLES = [
    {
    title: "Google共有ドライブで社内ファイル管理体制を再設計した話",
    url: "https://zenn.dev/localworksdev/articles/2026-06-google-drive-shared-drive-design",
    platform: "zenn",
    date: "2026-06-18",
  },
  {
    title: "Next.js App Router の実践的な使い方 — Server Components 完全解説",
    url: "https://zenn.dev/mikchell/articles/nextjs-app-router",
    platform: "zenn",
    date: "2025-05-10",
  },
];

// ── アーカイブ ─────────────────────────────────────────────────────────
// year     : 年（文字列）
// category : "Award" | "Talk" | "Paper" | "Hackathon" など自由記述
// title    : 受賞名・発表タイトル
// event    : イベント名・主催
// url      : リンク（なければ空文字 ""）
// image    : 画像パス（なければ省略 or 空文字 ""）例: "images/award.jpg"
const ARCHIVES = [
  {
    year: "2026.05",
    category: "Contest",
    title: "株式会社いつも U20 新規事業創造コンテスト優勝",
    event:
      "株式会社いつもさんのアセットを活用して、新規の事業を提案し、優勝することができました。",
    url: "",
    image: "images/itsmo.jpg",
  },
  {
    year: "2026.03",
    category: "Paper",
    title: "複数画像からの3次元構造復元に関する学会発表",
    event: "IEICE2026にて学会発表を行いました。",
    url: "",
    image: "images/paper-ieice2026.jpg",
  },

  {
    year: "2024.12",
    category: "Contest",
    title: "TMU EntreBloom 2024 準優勝・オーディエンス賞・企業賞受賞",
    event:
      "都立大生による都立大生のための履修管理アプリ「T-muse」を提案し、準優勝を果たしました。",
    url: "https://research-miyacology.tmu.ac.jp/news/27923/",
    image: "images/business-contest.jpg",
  },
  {
    year: "2024.09",
    category: "Internship",
    title: "セイコーエプソン株式会社 2weeksインターン",
    event: "プロジェクター投影PCアプリケーションの開発に従事しました。",
    url: "",
    image: "images/seiko-epson.jpg",
  },
  {
    year: "2021.12",
    category: "Sports",
    title:
      "群馬県バスケットボールIH準優勝、優秀選手賞を受賞。",
    event:
      "群馬県バスケットボールIH2021にて準優勝を果たし、優秀選手賞を受賞しました。",
    url: "http://gunma.japanbasketball.jp/hs/yusyumeiboR2.pdf",
    image: "images/best-player.jpg",
  },
];

// ── キャリア年表 ───────────────────────────────────────────────────────
// side    : "left" = 教育機関 / "right" = 職歴・活動
// period  : 期間（文字列）例: "2021.04 〜 2025.03"
// icon    : 絵文字 or 画像パス（例: "images/logo.png"）
// title   : 英語名 or メインタイトル
// subtitle: 日本語名 or サブタイトル
const CAREER = [
  {
    period: "2018.04 〜 2021.03",
    side: "left",
    icon: "./images/太田高校.gif",
    title: "Gunma Prefectural Ota High School",
    subtitle: "群馬県立太田高等学校",
  },
  {
    period: "2022.04 〜 2026.03",
    side: "left",
    icon: "./images/東京都立大学.png",
    title: "Tokyo Metropolitan University",
    subtitle: "東京都立大学 システムデザイン学部 <br>電子情報システム工学科",
  },
  {
    period: "2024.09 ",
    side: "right",
    icon: "./images/セイコーエプソン.jpeg",
    title: "Seiko Epson, Inc.",
    subtitle: "セイコーエプソン株式会社 短期インターン",
  },
  {
    period: "2025.07 〜 ",
    side: "right",
    icon: "./images/ローカルワークス.png",
    title: "LocalWorks, Inc.",
    subtitle: "株式会社ローカルワークス 長期インターン",
  },
  {
    period: "2026.04 〜",
    side: "left",
    icon: "./images/東京都立大学.png",
    title: "Tokyo Metropolitan University Graduate School",
    subtitle: "東京都立大学大学院 システムデザイン研究科 <br>情報科学域専攻",
  },
];

// ── SNSリンク（ヘッダーナビに表示、フッターには非表示） ──────────────
const FOOTER_LINKS = [
  {
    label: "GitHub",
    url: "https://github.com/mikchell",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
  },
  {
    label: "Twitter",
    url: "",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  },
];
