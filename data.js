/**
 * ================================================================
 *  PORTFOLIO DATA — ここを編集してコンテンツを更新する
 * ================================================================
 */

// ── 自己紹介 ──────────────────────────────────────────────────
const ABOUT = {
  bio: `ソフトウェアエンジニア。
使いやすく、美しく、堅牢なプロダクトを作ることに情熱を持っています。
フロントエンドからバックエンド、インフラまで幅広く手がけ、
技術とデザインの交差点に立つことを好みます。`,

  skills: [
    'TypeScript', 'React', 'Next.js', 'Node.js',
    'Go', 'Python', 'PostgreSQL', 'Docker',
    'AWS', 'Figma',
  ],

  links: [
    { label: 'GitHub',   url: 'https://github.com/mikchell' },
    { label: 'Zenn',     url: 'https://zenn.dev/mikchell' },
    { label: 'Twitter',  url: 'https://twitter.com/mikchell' },
  ],
};

// ── 作品 ──────────────────────────────────────────────────────
//  thumbnail: 画像URL (外部URLでも /images/hoge.png でも可)
//             null にするとイニシャルプレースホルダーを表示
const WORKS = [
  {
    title:     'Project Alpha',
    url:       'https://example.com/alpha',
    thumbnail: null,
    tags:      ['Next.js', 'TypeScript', 'PostgreSQL'],
    desc:      'フルスタックのSaaSアプリケーション。認証・課金・ダッシュボードを含む完全なプロダクト。',
  },
  {
    title:     'Project Beta',
    url:       'https://example.com/beta',
    thumbnail: null,
    tags:      ['React', 'WebGL', 'Three.js'],
    desc:      'WebGLを使ったインタラクティブなデータビジュアライゼーションツール。',
  },
  {
    title:     'CLI Tool',
    url:       'https://github.com/mikchell/cli-tool',
    thumbnail: null,
    tags:      ['Go', 'CLI'],
    desc:      '開発ワークフローを自動化するGoで書かれたCLIツール。',
  },
];

// ── 記事 ──────────────────────────────────────────────────────
//  platform: 'zenn' | 'qiita' | 'note' | 'medium' | 'blog' など
//  date:     'YYYY-MM-DD' 形式
const ARTICLES = [
  {
    title:    'Next.js App Router の実践的な使い方',
    url:      'https://zenn.dev/mikchell/articles/nextjs-app-router',
    platform: 'zenn',
    date:     '2024-03-15',
  },
  {
    title:    'TypeScript で作る型安全な API クライアント',
    url:      'https://zenn.dev/mikchell/articles/ts-api-client',
    platform: 'zenn',
    date:     '2024-01-20',
  },
  {
    title:    'Go で高速な REST API を設計する',
    url:      'https://qiita.com/mikchell/items/go-rest-api',
    platform: 'qiita',
    date:     '2023-11-08',
  },
];

// ── フッターリンク (SNS など) ─────────────────────────────────
const FOOTER_LINKS = [
  { label: 'GitHub',  url: 'https://github.com/mikchell' },
  { label: 'Zenn',    url: 'https://zenn.dev/mikchell' },
  { label: 'Twitter', url: 'https://twitter.com/mikchell' },
];
