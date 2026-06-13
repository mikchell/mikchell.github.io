/* ================================================================
   script.js — ポートフォリオ メインロジック
   ================================================================ */

document.getElementById('footer-year').textContent = new Date().getFullYear();

// ── Works グリッド ─────────────────────────────────────────
function buildWorks() {
  const grid = document.getElementById('works-grid');
  if (!grid || typeof WORKS === 'undefined') return;

  WORKS.forEach((work, i) => {
    const card = document.createElement('article');
    card.className = 'work-card';
    card.style.animationDelay = `${i * 0.12}s`;

    const thumb = work.thumbnail
      ? `<img src="${work.thumbnail}" alt="${work.title}" loading="lazy" />`
      : `<div class="work-thumb-placeholder"><span>${work.title[0]}</span></div>`;

    const tags = (work.tags || [])
      .map(t => `<span class="work-tag">${t}</span>`)
      .join('');

    card.innerHTML = `
      <div class="work-thumb">${thumb}</div>
      <div class="work-body">
        <div class="work-tags">${tags}</div>
        <h3 class="work-title">${work.title}</h3>
        <p class="work-desc">${work.desc}</p>
        <a class="work-link" href="${work.url}" target="_blank" rel="noopener">View Project</a>
      </div>
    `;

    card.addEventListener('click', e => {
      if (!e.target.closest('a')) window.open(work.url, '_blank', 'noopener');
    });

    grid.appendChild(card);
  });
}

// ── Articles リスト ────────────────────────────────────────
const PLATFORM_LABELS = {
  zenn: 'Zenn', qiita: 'Qiita', note: 'note', medium: 'Medium', blog: 'Blog',
};

function formatDate(str) {
  try {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric', month: 'long', day: 'numeric',
    }).format(new Date(str));
  } catch { return str; }
}

function buildArticles() {
  const list = document.getElementById('articles-list');
  if (!list || typeof ARTICLES === 'undefined') return;

  ARTICLES.forEach((article, i) => {
    const item = document.createElement('a');
    item.className = 'article-item';
    item.href = article.url;
    item.target = '_blank';
    item.rel = 'noopener noreferrer';
    item.style.animationDelay = `${i * 0.1}s`;

    const platformLabel = PLATFORM_LABELS[article.platform] || article.platform;

    item.innerHTML = `
      <div class="article-platform">
        <span class="article-platform-text">${platformLabel}</span>
      </div>
      <div class="article-body">
        <p class="article-title">${article.title}</p>
        <p class="article-meta">${platformLabel} &nbsp;·&nbsp; ${formatDate(article.date)}</p>
      </div>
      <span class="article-arrow">→</span>
    `;

    list.appendChild(item);
  });
}

// ── About ────────────────────────────────────────────────
function buildAbout() {
  if (typeof ABOUT === 'undefined') return;

  const bio = document.getElementById('about-bio');
  if (bio) {
    bio.innerHTML = ABOUT.bio
      .split(/\n\n+/)
      .map(p => `<p>${p.trim()}</p>`)
      .join('');
  }

  const skillsEl = document.getElementById('about-skills');
  if (skillsEl && ABOUT.skills) {
    skillsEl.innerHTML = ABOUT.skills
      .map(s => `<span class="skill-pill">${s}</span>`)
      .join('');
  }

  const linksEl = document.getElementById('about-links');
  if (linksEl && ABOUT.links) {
    linksEl.innerHTML = ABOUT.links
      .map(l => `<a class="about-link-btn" href="${l.url}" target="_blank" rel="noopener">
        ${l.icon ? `<span class="link-icon">${l.icon}</span>` : ''}
        <span>${l.label}</span>
      </a>`)
      .join('');
  }
}

// ── ヒーロー ソーシャルアイコン ───────────────────────────
function buildHeroSocial() {
  const el = document.getElementById('hero-social');
  if (!el || typeof FOOTER_LINKS === 'undefined') return;

  el.innerHTML = FOOTER_LINKS
    .map(l => `<a class="hero-social-link" href="${l.url}" target="_blank" rel="noopener" aria-label="${l.label}">
      ${l.icon ? l.icon : l.label}
    </a>`)
    .join('');
}

// ── ナビアイコン ──────────────────────────────────────────
function buildNavIcons() {
  const el = document.getElementById('nav-icons');
  if (!el || typeof FOOTER_LINKS === 'undefined') return;

  el.innerHTML = FOOTER_LINKS
    .map(l => `<a class="nav-icon-link" href="${l.url}" target="_blank" rel="noopener" aria-label="${l.label}">
      ${l.icon ? l.icon : l.label}
    </a>`)
    .join('');
}

// ── フッターリンク ────────────────────────────────────────
function buildFooterLinks() {
  const el = document.getElementById('footer-links');
  if (!el || typeof FOOTER_LINKS === 'undefined') return;

  el.innerHTML = FOOTER_LINKS
    .map(l => `<a class="footer-icon-link" href="${l.url}" target="_blank" rel="noopener" aria-label="${l.label}">
      ${l.icon ? l.icon : l.label}
    </a>`)
    .join('');
}

// ── ナビゲーション スクロール ─────────────────────────────
function initNav() {
  const navbar = document.getElementById('navbar');
  const hero   = document.getElementById('hero');
  const onScroll = () => {
    const past = window.scrollY > (hero ? hero.offsetHeight * 0.6 : 300);
    navbar.classList.toggle('scrolled', past);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ── スクロール表示アニメーション ─────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.work-card, .article-item').forEach(el => {
    observer.observe(el);
  });
}

// ── 初期化 ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildWorks();
  buildArticles();
  buildAbout();
  buildHeroSocial();
  buildNavIcons();
  buildFooterLinks();
  initNav();

  requestAnimationFrame(initScrollReveal);
});
