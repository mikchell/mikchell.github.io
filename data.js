// ── 自己紹介 ──────────────────────────────────────────────────
const ABOUT = {
  bio: `東京都立大学大学院 システムデザイン研究科 情報科学域専攻 M1

技術・研究・ビジネスの領域を横断して行動し続ける推進力が私の強みです。

長期インターンではRoRを用いたB2Bプラットフォーム開発に加え、社内データ移行プロジェクトのリードと、心理的安全性をDB設計で担保する従業員サーベイシステムの要件定義・開発を主導しました。研究では複数画像からの3次元形状復元に取り組み、学会発表で成果を報告。さらにビジネスアイデアコンテストで準優勝を収めるなど、エンジニアリングに留まらず事業視点でも動いてきました。

「やってみる」を繰り返す中で培った、技術と人間行動を結びつける思考を活かしたいと考えています。`,

  skills: ["JavaScript", "Python", "Ruby", "Ruby on Rails", "React", "Next.js"],

  links: [
    {
      label: "GitHub",
      url: "https://github.com/mikchell",
      icon: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
    },
    {
      label: "Zenn",
      url: "https://zenn.dev/jennyhigh",
      icon: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.264 23.771h4.984c.264 0 .498-.147.645-.352L19.614.874c.176-.293-.029-.645-.381-.645h-4.72c-.235 0-.44.117-.557.323L.03 23.361c-.088.176.029.41.234.41zM17.445 23.419l6.479-10.408c.205-.323-.029-.733-.41-.733h-4.691c-.176 0-.352.088-.44.235l-6.655 10.643c-.176.264.029.616.352.616h4.779c.234-.001.468-.118.586-.353z"/></svg>`,
    },
    {
      label: "Twitter",
      url: "",
      icon: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    },
  ],
};

// ── 作品 ──────────────────────────────────────────────────────
const WORKS = [
  {
    title: "ShipFast Dashboard",
    url: "https://github.com/mikchell/shipfast-dashboard",
    thumbnail: null,
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    desc: "SaaS 向けの管理ダッシュボード。認証・サブスクリプション課金・チーム管理・分析レポートを備えたフルスタックプロダクト。",
  },
  {
    title: "DataVis Studio",
    url: "https://github.com/mikchell/datavis-studio",
    thumbnail: null,
    tags: ["React", "Three.js", "WebGL", "D3.js"],
    desc: "WebGL × D3.js によるインタラクティブなデータ可視化ツール。大規模データセットをリアルタイムで3D描画する。",
  },
  {
    title: "goship CLI",
    url: "https://github.com/mikchell/goship",
    thumbnail: null,
    tags: ["Go", "CLI", "Docker", "GitHub Actions"],
    desc: "デプロイフローを一本化する Go 製 CLI ツール。Docker ビルド・イメージプッシュ・GitHub Actions トリガーを単一コマンドで実行。",
  },
  {
    title: "Storefront",
    url: "https://github.com/mikchell/storefront",
    thumbnail: null,
    tags: ["Next.js", "Prisma", "Vercel", "Tailwind CSS"],
    desc: "ヘッドレス EC サイト。Prisma + PostgreSQL によるカタログ管理と、Vercel Edge Functions を活用した高速な商品ページを実現。",
  },
  {
    title: "LiveRoom",
    url: "https://github.com/mikchell/liveroom",
    thumbnail: null,
    tags: ["Node.js", "WebSocket", "React", "Redis"],
    desc: "リアルタイムチャット & ホワイトボードアプリ。WebSocket と Redis Pub/Sub で複数ルームの同時接続をさばく。",
  },
];

// ── 記事 ──────────────────────────────────────────────────────
const ARTICLES = [
  {
    title: "Next.js App Router の実践的な使い方 — Server Components 完全解説",
    url: "https://zenn.dev/mikchell/articles/nextjs-app-router",
    platform: "zenn",
    date: "2024-05-10",
  },
  {
    title: "TypeScript で作る型安全な API クライアント設計パターン",
    url: "https://zenn.dev/mikchell/articles/ts-api-client",
    platform: "zenn",
    date: "2024-03-22",
  },
  {
    title: "Go で高速な REST API を設計する — 実務から学んだ 10 のプラクティス",
    url: "https://qiita.com/mikchell/items/go-rest-api",
    platform: "qiita",
    date: "2024-01-15",
  },
  {
    title: "WebGL × Three.js でデータを「見える化」する入門ガイド",
    url: "https://zenn.dev/mikchell/articles/webgl-threejs-dataviz",
    platform: "zenn",
    date: "2023-11-30",
  },
  {
    title: "PostgreSQL インデックス戦略 — クエリを 10 倍速くするチューニング術",
    url: "https://zenn.dev/mikchell/articles/postgres-index-tuning",
    platform: "zenn",
    date: "2023-09-08",
  },
];

// ── フッターリンク (SNS など) ─────────────────────────────────
const FOOTER_LINKS = [
  {
    label: "GitHub",
    url: "https://github.com/mikchell",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
  },
  {
    label: "Twitter",
    url: "https://twitter.com/mikchell",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  },
];
