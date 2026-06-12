/* ================================================================
   script.js — ポートフォリオ メインロジック
   ================================================================ */

// ── フッター年 ──────────────────────────────────────────────
document.getElementById('footer-year').textContent = new Date().getFullYear();

// ── Works グリッド ─────────────────────────────────────────
function buildWorks() {
  const grid = document.getElementById('works-grid');
  if (!grid || !window.WORKS) return;

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
      if (!e.target.closest('a')) {
        window.open(work.url, '_blank', 'noopener');
      }
    });

    grid.appendChild(card);
  });
}

// ── Articles リスト ────────────────────────────────────────
const PLATFORM_LABELS = {
  zenn:   'Zenn',
  qiita:  'Qiita',
  note:   'note',
  medium: 'Medium',
  blog:   'Blog',
};

function formatDate(str) {
  try {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric', month: 'long', day: 'numeric',
    }).format(new Date(str));
  } catch {
    return str;
  }
}

function buildArticles() {
  const list = document.getElementById('articles-list');
  if (!list || !window.ARTICLES) return;

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
  if (!window.ABOUT) return;

  const bio = document.getElementById('about-bio');
  if (bio) bio.textContent = ABOUT.bio;

  const skillsEl = document.getElementById('about-skills');
  if (skillsEl && ABOUT.skills) {
    skillsEl.innerHTML = ABOUT.skills
      .map(s => `<span class="skill-pill">${s}</span>`)
      .join('');
  }

  const linksEl = document.getElementById('about-links');
  if (linksEl && ABOUT.links) {
    linksEl.innerHTML = ABOUT.links
      .map(l => `<a class="about-link-btn" href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`)
      .join('');
  }
}

// ── フッターリンク ────────────────────────────────────────
function buildFooterLinks() {
  const el = document.getElementById('footer-links');
  if (!el || !window.FOOTER_LINKS) return;

  el.innerHTML = FOOTER_LINKS
    .map(l => `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`)
    .join('');
}

// ── ナビゲーション スクロール ─────────────────────────────
function initNav() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
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

// ── ヒーローキャンバス (粒子アニメーション) ──────────────
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(true); }

    reset(init = false) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 10;
      this.r  = Math.random() * 1.2 + 0.3;
      this.vy = -(Math.random() * 0.4 + 0.1);
      this.vx = (Math.random() - 0.5) * 0.15;
      this.alpha = Math.random() * 0.6 + 0.1;
      this.life  = 0;
      this.maxLife = Math.random() * 300 + 150;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      if (this.y < -10 || this.life > this.maxLife) this.reset();
    }

    draw() {
      const fade = Math.min(this.life / 60, 1) * Math.min((this.maxLife - this.life) / 60, 1);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(120, 90, 20, ${this.alpha * fade})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: 120 }, () => new Particle());
  }

  function drawGrid() {
    const step = 80;
    ctx.strokeStyle = 'rgba(120, 90, 20, 0.06)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
  }

  function drawVignette() {
    const grad = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, H * 0.9);
    grad.addColorStop(0, 'rgba(237,232,222,0)');
    grad.addColorStop(1, 'rgba(237,232,222,0.88)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);

    // 背景グラデーション
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#ede8de');
    bg.addColorStop(0.5, '#e8e2d6');
    bg.addColorStop(1, '#ede8de');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    drawGrid();
    particles.forEach(p => { p.update(); p.draw(); });
    drawVignette();

    requestAnimationFrame(loop);
  }

  init();
  loop();

  window.addEventListener('resize', () => {
    resize();
    particles.forEach(p => p.reset(true));
  }, { passive: true });
}

// ── マウスパララックス (ヒーロー文字) ────────────────────
function initParallax() {
  const content = document.querySelector('.hero-content');
  if (!content) return;

  window.addEventListener('mousemove', e => {
    const cx = (e.clientX / window.innerWidth - 0.5) * 16;
    const cy = (e.clientY / window.innerHeight - 0.5) * 8;
    content.style.transform = `translate(${cx}px, ${cy}px)`;
  }, { passive: true });
}

// ── 初期化 ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildWorks();
  buildArticles();
  buildAbout();
  buildFooterLinks();
  initNav();
  initHeroCanvas();
  initParallax();

  // DOM 構築後に IntersectionObserver をセット
  requestAnimationFrame(initScrollReveal);
});
