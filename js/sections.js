/**
 * sections.js — data.js の内容から各セクションの DOM を組み立てる
 *
 * 生成する要素のうち、背景ネットワークと接続したいものには data-node="card" を付ける。
 * network.js がこれをアンカーノードとして拾い、背景の網と線で結ぶ。
 */

import { ABOUT, WORKS, ARTICLES, ARCHIVES, CAREER, FOOTER_LINKS } from '../data.js';

// ── 共通ユーティリティ ────────────────────────────────────

const PLATFORM_LABELS = {
  zenn: 'Zenn', qiita: 'Qiita', note: 'note', medium: 'Medium', blog: 'Blog',
};

const PLATFORM_ICONS = {
  zenn: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.264 23.771h4.984c.264 0 .498-.147.645-.352L19.614.874c.176-.293-.029-.645-.381-.645h-4.72c-.235 0-.44.117-.557.323L.03 23.361c-.088.176.029.41.234.41zM17.445 23.419l6.479-10.408c.205-.323-.029-.733-.41-.733h-4.691c-.176 0-.352.088-.44.235l-6.655 10.643c-.176.264.029.616.352.616h4.779c.234-.001.468-.118.586-.353z"/></svg>`,
  qiita: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.3726 0 0 5.3726 0 12s5.3726 12 12 12c3.3984 0 6.4665-1.413 8.6498-3.6832-.383-.0574-.7746-.2062-1.1466-.4542-.7145-.4763-1.3486-.9263-1.6817-1.674-1.2945 1.3807-3.0532 1.835-5.1822 2.0503-4.311.4359-8.0456-1.4893-8.4979-6.2996-.1922-2.045.2628-3.989 1.1804-5.582l-.5342-2.1009c-.0862-.3652.2498-.7126.6057-.6262l1.8456.448c1.0974-.9012 2.4249-1.49 3.8892-1.638 1.2526-.1267 2.467.0834 3.571.5624l1.7348-1.0494c.3265-.1974.7399.0257.7711.4164l.1 2.4747v.0002c1.334 1.4084 2.2424 3.3319 2.4478 5.516.116 1.2339-.012 2.1776-.339 3.078-.1531.4215-.1992.7778.0776 1.1305.2674.3408.6915 1.0026 1.1644.8917.7107-.1666 1.4718-.1223 1.9422.1715C23.4925 15.9525 24 14.0358 24 12c0-6.6274-5.3726-12-12-12Zm-.0727 5.727a5.2731 5.2731 0 0 0-.6146.0273c-2.2084.2233-3.9572 1.8135-4.4937 3.8484l-1.3176-.1996-.014.2589 1.2972.1407c-.0352.1497-.0643.2384-.086.3923l-1.1319.0902.0103.2025 1.1032-.088c-.0194.1713-.031.2814-.0332.4565l-1.0078.412.0495.2499.9598-.4492c.002.1339.008.2053.0207.3407.2667 2.8371 2.6364 3.3981 5.4677 3.1118 2.8312-.2863 5.0517-1.3114 4.785-4.1486-.013-.1361-.0324-.2068-.0553-.3392l1.0397.2257.0242-.229-1.0906-.207c-.0342-.1687-.0765-.271-.1264-.4327l1.1208-.1374-.0158-.2019-1.1499.1409a5.1093 5.1093 0 0 0-.1665-.4259l1.2665-.4042-.0397-.2536-1.3471.4667c-.819-1.7168-2.5002-2.8224-4.4546-2.8482Z"/></svg>`,
};

const isImage = src => Boolean(src) && /\.(png|jpe?g|gif|webp|svg)$/i.test(src);

function formatDate(str) {
  try {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric', month: 'long', day: 'numeric',
    }).format(new Date(str));
  } catch {
    return str;
  }
}

/** 動画URLを埋め込みプレイヤーのHTMLに変換する（非対応なら null） */
function videoEmbed(url) {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  if (yt) return `<iframe src="https://www.youtube.com/embed/${yt[1]}?rel=0" allowfullscreen loading="lazy"></iframe>`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `<iframe src="https://player.vimeo.com/video/${vm[1]}" allowfullscreen loading="lazy"></iframe>`;
  if (/\.(mp4|webm|ogg|mov)$/i.test(url)) return `<video src="${url}" controls muted playsinline></video>`;
  return null;
}

/** "03" のようなゼロ埋め件数表示 */
function setCount(id, n) {
  const el = document.getElementById(id);
  if (el) el.textContent = String(n).padStart(2, '0');
}

// ── Archive ───────────────────────────────────────────────

function buildArchive() {
  const grid = document.getElementById('archive-grid');
  if (!grid || !ARCHIVES?.length) return;

  // カテゴリの絞り込みチップ（"All" + 実在するカテゴリ）
  const filters = document.getElementById('archive-filters');
  if (filters) {
    const categories = [...new Set(ARCHIVES.map(a => a.category).filter(Boolean))];
    filters.innerHTML = ['All', ...categories]
      .map((c, i) => `
        <button type="button" class="filter-chip${i === 0 ? ' is-active' : ''}"
                data-filter="${c}" aria-pressed="${i === 0}">${c}</button>`)
      .join('');
  }

  grid.innerHTML = ARCHIVES.map((item, i) => {
    const tag = item.url ? 'a' : 'article';
    const linkAttrs = item.url
      ? `href="${item.url}" target="_blank" rel="noopener noreferrer"`
      : '';
    return `
      <${tag} class="archive-card reveal-item${item.url ? ' is-link' : ''}"
              data-node="card" data-category="${item.category ?? ''}" ${linkAttrs}
              style="--delay:${i * 70}ms">
        <span class="card-tick" aria-hidden="true"></span>
        ${item.image ? `
          <div class="archive-thumb">
            <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async">
          </div>` : ''}
        <div class="archive-body">
          <div class="archive-meta">
            <span class="archive-year">${item.year}</span>
            ${item.category ? `<span class="archive-category">${item.category}</span>` : ''}
            ${item.url ? '<span class="archive-ext" aria-hidden="true">↗</span>' : ''}
          </div>
          <h3 class="archive-title">${item.title}</h3>
          <p class="archive-event">${item.event || ''}</p>
        </div>
      </${tag}>
    `;
  }).join('');

  setCount('archive-count', ARCHIVES.length);
}

// ── Works ─────────────────────────────────────────────────

function buildWorks() {
  const grid = document.getElementById('works-grid');
  if (!grid || !WORKS?.length) return;

  grid.innerHTML = WORKS.map((work, i) => {
    const embed = work.video ? videoEmbed(work.video) : null;
    const media = embed
      ?? (work.thumbnail
        ? `<img src="${work.thumbnail}" alt="${work.title}" loading="lazy" decoding="async">`
        : `<div class="work-thumb-empty"><span>${work.title.at(0)}</span></div>`);

    const tags = (work.tags ?? [])
      .map(t => `<li class="work-tag">${t}</li>`)
      .join('');

    // 作品番号（01, 02 …）
    const index = String(i + 1).padStart(2, '0');

    return `
      <article class="work-card reveal-item" data-node="card" style="--delay:${i * 90}ms">
        <span class="card-tick" aria-hidden="true"></span>
        <div class="work-thumb">${media}</div>
        <div class="work-body">
          <span class="work-index">${index}</span>
          <h3 class="work-title">${work.title}</h3>
          <ul class="work-tags">${tags}</ul>
          <p class="work-desc" id="work-desc-${i}">${work.desc}</p>
          <button type="button" class="work-more" aria-expanded="false" aria-controls="work-desc-${i}">
            <span class="work-more-label">続きを読む</span>
          </button>
          ${work.url
            ? `<a class="work-link" href="${work.url}" target="_blank" rel="noopener noreferrer">View Project</a>`
            : '<span class="work-link is-disabled">Private</span>'}
        </div>
      </article>
    `;
  }).join('');

  setCount('works-count', WORKS.length);
}

// ── Articles ──────────────────────────────────────────────

function buildArticles() {
  const list = document.getElementById('articles-list');
  if (!list || !ARTICLES?.length) return;

  list.innerHTML = ARTICLES.map((article, i) => {
    const label = PLATFORM_LABELS[article.platform] ?? article.platform;
    const icon = PLATFORM_ICONS[article.platform];
    return `
      <a class="article-item reveal-item" data-node="card"
         href="${article.url}" target="_blank" rel="noopener noreferrer"
         style="--delay:${i * 70}ms">
        <span class="article-platform" aria-hidden="true">
          ${icon ?? `<span class="article-platform-text">${label}</span>`}
        </span>
        <span class="article-body">
          <span class="article-title">${article.title}</span>
          <span class="article-meta">${label} <span class="dot">·</span> ${formatDate(article.date)}</span>
        </span>
        <span class="article-arrow" aria-hidden="true">→</span>
      </a>
    `;
  }).join('');

  setCount('articles-count', ARTICLES.length);
}

// ── About ─────────────────────────────────────────────────

function buildAbout() {
  if (!ABOUT) return;

  const bio = document.getElementById('about-bio');
  if (bio && ABOUT.bio) {
    bio.innerHTML = ABOUT.bio
      .split(/\n\n+/)
      .map((p, i) => `<span class="bio-para reveal-item" style="--delay:${i * 90}ms">${p.trim()}</span>`)
      .join('');
  }

  const links = document.getElementById('about-links');
  if (links && ABOUT.links?.length) {
    links.innerHTML = ABOUT.links
      .map((l, i) => `
        <a class="about-link-btn reveal-item" style="--delay:${i * 80}ms"
           href="${l.url}" target="_blank" rel="noopener noreferrer">
          ${l.icon ? `<span class="link-icon">${l.icon}</span>` : ''}<span>${l.label}</span>
        </a>`)
      .join('');
  }
}

// ── Career（ノードとエッジで描く年表） ────────────────────

function buildCareer() {
  const el = document.getElementById('career-timeline');
  if (!el || !CAREER?.length) return;

  el.innerHTML = `
    <div class="career-track">
      ${CAREER.map((item, i) => `
        <div class="career-row career-row--${item.side}" style="--delay:${i * 90}ms">
          <div class="career-card reveal-item" data-node="card">
            <span class="card-tick" aria-hidden="true"></span>
            <span class="career-icon">
              ${isImage(item.icon)
                ? `<img src="${item.icon}" alt="" loading="lazy" decoding="async">`
                : `<span>${item.icon}</span>`}
            </span>
            <span class="career-text">
              <span class="career-name">${item.title}</span>
              <span class="career-sub">${item.subtitle}</span>
            </span>
          </div>
          <span class="career-joint" aria-hidden="true"></span>
          <span class="career-period reveal-item">${item.period}</span>
        </div>
      `).join('')}
    </div>
  `;
}

// ── ソーシャルリンク ──────────────────────────────────────

/** url が空のリンクは表示しない */
const activeLinks = () => (FOOTER_LINKS ?? []).filter(l => l.url);

function renderLinks(targetId, className) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = activeLinks()
    .map(l => `
      <a class="${className}" href="${l.url}" target="_blank"
         rel="noopener noreferrer" aria-label="${l.label}">
        ${l.icon ?? l.label}
      </a>`)
    .join('');
}

// ── エントリポイント ──────────────────────────────────────

export function buildSections() {
  buildArchive();
  buildWorks();
  buildArticles();
  buildAbout();
  buildCareer();

  renderLinks('nav-icons', 'nav-icon-link');
  renderLinks('footer-links', 'footer-social-link');

  const year = document.getElementById('footer-year');
  if (year) year.textContent = new Date().getFullYear();
}
