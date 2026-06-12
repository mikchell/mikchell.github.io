/**
 * ================================================================
 *  PORTFOLIO DATA — ここを編集してコンテンツを更新する
 * ================================================================
 */

// ── 自己紹介 ──────────────────────────────────────────────────
const ABOUT = {
  bio: `フルスタックのソフトウェアエンジニア。
TypeScript・React を中心としたフロントエンドから、Go・Node.js によるバックエンド API、
AWS 上のインフラ設計まで一貫して担当します。
ユーザーにとって心地よく、開発者にとって保守しやすいプロダクトを追求しています。`,

  skills: [
    'TypeScript', 'React', 'Next.js', 'Node.js',
    'Go', 'Python', 'PostgreSQL', 'Docker',
    'AWS', 'Prisma', 'GraphQL', 'Figma',
  ],

  links: [
    {
      label: 'GitHub',
      url: 'https://github.com/mikchell',
      icon: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
    },
    {
      label: 'Zenn',
      url: 'https://zenn.dev/mikchell',
      icon: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.264 23.771h4.984c.264 0 .498-.147.645-.352L19.614.874c.176-.293-.029-.645-.381-.645h-4.72c-.235 0-.44.117-.557.323L.03 23.361c-.088.176.029.41.234.41zM17.445 23.419l6.479-10.408c.205-.323-.029-.733-.41-.733h-4.691c-.176 0-.352.088-.44.235l-6.655 10.643c-.176.264.029.616.352.616h4.779c.234-.001.468-.118.586-.353z"/></svg>`,
    },
    {
      label: 'Twitter',
      url: 'https://twitter.com/mikchell',
      icon: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    },
  ],
};

// ── 作品 ──────────────────────────────────────────────────────
const WORKS = [
  {
    title:     'ShipFast Dashboard',
    url:       'https://github.com/mikchell/shipfast-dashboard',
    thumbnail: null,
    tags:      ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe'],
    desc:      'SaaS 向けの管理ダッシュボード。認証・サブスクリプション課金・チーム管理・分析レポートを備えたフルスタックプロダクト。',
  },
  {
    title:     'DataVis Studio',
    url:       'https://github.com/mikchell/datavis-studio',
    thumbnail: null,
    tags:      ['React', 'Three.js', 'WebGL', 'D3.js'],
    desc:      'WebGL × D3.js によるインタラクティブなデータ可視化ツール。大規模データセットをリアルタイムで3D描画する。',
  },
  {
    title:     'goship CLI',
    url:       'https://github.com/mikchell/goship',
    thumbnail: null,
    tags:      ['Go', 'CLI', 'Docker', 'GitHub Actions'],
    desc:      'デプロイフローを一本化する Go 製 CLI ツール。Docker ビルド・イメージプッシュ・GitHub Actions トリガーを単一コマンドで実行。',
  },
  {
    title:     'Storefront',
    url:       'https://github.com/mikchell/storefront',
    thumbnail: null,
    tags:      ['Next.js', 'Prisma', 'Vercel', 'Tailwind CSS'],
    desc:      'ヘッドレス EC サイト。Prisma + PostgreSQL によるカタログ管理と、Vercel Edge Functions を活用した高速な商品ページを実現。',
  },
  {
    title:     'LiveRoom',
    url:       'https://github.com/mikchell/liveroom',
    thumbnail: null,
    tags:      ['Node.js', 'WebSocket', 'React', 'Redis'],
    desc:      'リアルタイムチャット & ホワイトボードアプリ。WebSocket と Redis Pub/Sub で複数ルームの同時接続をさばく。',
  },
];

// ── 記事 ──────────────────────────────────────────────────────
const ARTICLES = [
  {
    title:    'Next.js App Router の実践的な使い方 — Server Components 完全解説',
    url:      'https://zenn.dev/mikchell/articles/nextjs-app-router',
    platform: 'zenn',
    date:     '2024-05-10',
  },
  {
    title:    'TypeScript で作る型安全な API クライアント設計パターン',
    url:      'https://zenn.dev/mikchell/articles/ts-api-client',
    platform: 'zenn',
    date:     '2024-03-22',
  },
  {
    title:    'Go で高速な REST API を設計する — 実務から学んだ 10 のプラクティス',
    url:      'https://qiita.com/mikchell/items/go-rest-api',
    platform: 'qiita',
    date:     '2024-01-15',
  },
  {
    title:    'WebGL × Three.js でデータを「見える化」する入門ガイド',
    url:      'https://zenn.dev/mikchell/articles/webgl-threejs-dataviz',
    platform: 'zenn',
    date:     '2023-11-30',
  },
  {
    title:    'PostgreSQL インデックス戦略 — クエリを 10 倍速くするチューニング術',
    url:      'https://zenn.dev/mikchell/articles/postgres-index-tuning',
    platform: 'zenn',
    date:     '2023-09-08',
  },
];

// ── フッターリンク (SNS など) ─────────────────────────────────
const FOOTER_LINKS = [
  {
    label: 'GitHub',
    url: 'https://github.com/mikchell',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
  },
  {
    label: 'Zenn',
    url: 'https://zenn.dev/mikchell',
    icon: `<svg viewBox="0 0 88 88" fill="currentColor" aria-hidden="true"><path d="M0 72.4L29.6 19.2c.2-.4.8-.4 1.1 0l8.4 14.3c.3.5.3 1.1 0 1.6L16.2 74.1c-.3.5-.8.9-1.4.9H1.4C.3 75 -.3 73.5 0 72.4z"/><path d="M44.6 13H58c1.1 0 1.7 1.3 1 2.2L25.2 74.2c-.3.5-.8.8-1.4.8h-13c-1.1 0-1.7-1.3-1-2.2l33.4-59.1c.3-.4.8-.7 1.4-.7z"/><path d="M56.5 49.4l8.1-14.2c.3-.6 1-.9 1.6-.6.2.1.4.3.6.6l21 37.2c.5.9-.1 2-1.2 2h-16c-.6 0-1.1-.3-1.4-.8l-12.7-22.5c-.3-.6-.3-1.2 0-1.7z"/></svg>`,
  },
  {
    label: 'Twitter',
    url: 'https://twitter.com/mikchell',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  },
];
