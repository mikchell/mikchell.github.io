/* ================================================================
   script.js — ポートフォリオ メインロジック
   ================================================================ */

document.getElementById('footer-year').textContent = new Date().getFullYear();

// ── Works グリッド ─────────────────────────────────────────
function getVideoEmbed(url) {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  if (yt) return `<iframe src="https://www.youtube.com/embed/${yt[1]}?rel=0" allowfullscreen loading="lazy"></iframe>`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `<iframe src="https://player.vimeo.com/video/${vm[1]}" allowfullscreen loading="lazy"></iframe>`;
  if (/\.(mp4|webm|ogg|mov)$/i.test(url)) return `<video src="${url}" controls muted playsinline></video>`;
  return null;
}

function buildWorks() {
  const grid = document.getElementById('works-grid');
  if (!grid || typeof WORKS === 'undefined') return;

  WORKS.forEach((work, i) => {
    const card = document.createElement('article');
    card.className = 'work-card';
    card.style.animationDelay = `${i * 0.12}s`;

    const videoEmbed = work.video ? getVideoEmbed(work.video) : null;
    const thumb = videoEmbed
      ? videoEmbed
      : work.thumbnail
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

const PLATFORM_ICONS = {
  zenn: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.264 23.771h4.984c.264 0 .498-.147.645-.352L19.614.874c.176-.293-.029-.645-.381-.645h-4.72c-.235 0-.44.117-.557.323L.03 23.361c-.088.176.029.41.234.41zM17.445 23.419l6.479-10.408c.205-.323-.029-.733-.41-.733h-4.691c-.176 0-.352.088-.44.235l-6.655 10.643c-.176.264.029.616.352.616h4.779c.234-.001.468-.118.586-.353z"/></svg>`,
  qiita: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.3726 0 0 5.3726 0 12s5.3726 12 12 12c3.3984 0 6.4665-1.413 8.6498-3.6832-.383-.0574-.7746-.2062-1.1466-.4542-.7145-.4763-1.3486-.9263-1.6817-1.674-1.2945 1.3807-3.0532 1.835-5.1822 2.0503-4.311.4359-8.0456-1.4893-8.4979-6.2996-.1922-2.045.2628-3.989 1.1804-5.582l-.5342-2.1009c-.0862-.3652.2498-.7126.6057-.6262l1.8456.448c1.0974-.9012 2.4249-1.49 3.8892-1.638 1.2526-.1267 2.467.0834 3.571.5624l1.7348-1.0494c.3265-.1974.7399.0257.7711.4164l.1 2.4747v.0002c1.334 1.4084 2.2424 3.3319 2.4478 5.516.116 1.2339-.012 2.1776-.339 3.078-.1531.4215-.1992.7778.0776 1.1305.2674.3408.6915 1.0026 1.1644.8917.7107-.1666 1.4718-.1223 1.9422.1715C23.4925 15.9525 24 14.0358 24 12c0-6.6274-5.3726-12-12-12Zm-.0727 5.727a5.2731 5.2731 0 0 0-.6146.0273c-2.2084.2233-3.9572 1.8135-4.4937 3.8484l-1.3176-.1996-.014.2589 1.2972.1407c-.0352.1497-.0643.2384-.086.3923l-1.1319.0902.0103.2025 1.1032-.088c-.0194.1713-.031.2814-.0332.4565l-1.0078.412.0495.2499.9598-.4492c.002.1339.008.2053.0207.3407.2667 2.8371 2.6364 3.3981 5.4677 3.1118 2.8312-.2863 5.0517-1.3114 4.785-4.1486-.013-.1361-.0324-.2068-.0553-.3392l1.0397.2257.0242-.229-1.0906-.207c-.0342-.1687-.0765-.271-.1264-.4327l1.1208-.1374-.0158-.2019-1.1499.1409a5.1093 5.1093 0 0 0-.1665-.4259l1.2665-.4042-.0397-.2536-1.3471.4667c-.819-1.7168-2.5002-2.8224-4.4546-2.8482Z"/></svg>`,
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
    const platformIcon = PLATFORM_ICONS[article.platform];

    item.innerHTML = `
      <div class="article-platform">
        ${platformIcon
          ? platformIcon
          : `<span class="article-platform-text">${platformLabel}</span>`}
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
      .map((p, i) => `<p class="reveal-item" style="transition-delay:${0.15 + i * 0.14}s">${p.trim()}</p>`)
      .join('');
  }

  const skillsEl = document.getElementById('about-skills');
  if (skillsEl && ABOUT.skills) {
    skillsEl.innerHTML = ABOUT.skills
      .map((s, i) => `<span class="skill-item reveal-item" style="transition-delay:${0.2 + i * 0.07}s">${s}</span>`)
      .join('');
  }

  const linksEl = document.getElementById('about-links');
  if (linksEl && ABOUT.links) {
    linksEl.innerHTML = ABOUT.links
      .map((l, i) => `<a class="about-link-btn reveal-item" style="transition-delay:${0.25 + i * 0.1}s" href="${l.url}" target="_blank" rel="noopener">
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
function buildArchive() {
  const el = document.getElementById('archive-grid');
  if (!el || typeof ARCHIVES === 'undefined' || !ARCHIVES.length) return;

  el.innerHTML = ARCHIVES.map((item, i) => {
    const tag = item.url ? 'a' : 'div';
    const attrs = item.url
      ? `href="${item.url}" target="_blank" rel="noopener" class="archive-card work-card${item.url ? ' archive-card--link' : ''}" style="transition-delay:${i * 0.08}s"`
      : `class="archive-card work-card" style="transition-delay:${i * 0.08}s"`;
    return `
    <${tag} ${attrs}>
      ${item.image ? `<div class="archive-thumb"><img src="${item.image}" alt="${item.title}" loading="lazy"></div>` : ''}
      <div class="archive-card-inner">
        <div class="archive-meta">
          <span class="archive-year">${item.year}</span>
          ${item.category ? `<span class="archive-category">${item.category}</span>` : ''}
          ${item.url ? `<span class="archive-link-icon">↗</span>` : ''}
        </div>
        <h3 class="archive-title">${item.title}</h3>
        <p class="archive-event">${item.event || ''}</p>
      </div>
    </${tag}>
  `;
  }).join('');
}

function buildCareer() {
  const el = document.getElementById('career-timeline');
  if (!el || typeof CAREER === 'undefined' || !CAREER.length) return;

  const isImg = src => src && /\.(png|jpe?g|gif|webp|svg)$/i.test(src);

  el.innerHTML = `
    <h2 class="career-heading reveal-item">Career</h2>
    <div class="career-track">
      ${CAREER.map((item, i) => {
        const row = i + 1;
        return `
        <div class="career-item career-item--${item.side}">
          <div class="career-item-body reveal-item" style="grid-row:${row};transition-delay:${i * 0.1}s">
            <div class="career-icon">
              ${isImg(item.icon)
                ? `<img src="${item.icon}" alt="${item.title}">`
                : `<span>${item.icon}</span>`}
            </div>
            <h3 class="career-name">${item.title}</h3>
            <p class="career-sub">${item.subtitle}</p>
          </div>
          <div class="career-item-dot" style="grid-row:${row}"></div>
          <div class="career-item-period reveal-item" style="grid-row:${row};transition-delay:${i * 0.1 + 0.05}s">${item.period}</div>
        </div>
      `;}).join('')}
    </div>
  `;
}

function buildFooterLinks() {
  // フッターにはアイコンを表示しない
}

// ── ヒーロー キャンバスアニメーション ────────────────────
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w, h, particles, rings = [], ringTimer, rafId;
  let visible = true;
  const mouse = { x: -9999, y: -9999 };
  const COUNT = 180;
  const LINK_DIST   = 150;
  const LINK_DIST2  = LINK_DIST * LINK_DIST;
  const REPEL_DIST  = 120;
  const REPEL_DIST2 = REPEL_DIST * REPEL_DIST;

  function resize() {
    w = canvas.width  = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function spawn() {
    const CONST_POSITIONS = [
      // Cassiopeia（W字・上部）
      [0.06,0.10],[0.13,0.05],[0.20,0.09],[0.27,0.04],[0.34,0.08],
      // Cygnus（北十字・右上）
      [0.74,0.06],[0.71,0.15],[0.68,0.25],[0.65,0.35],[0.62,0.44],[0.59,0.25],[0.77,0.25],
      // Pegasus（大四辺形・右）
      [0.82,0.40],[0.82,0.56],[0.70,0.56],[0.70,0.40],
      // Andromeda
      [0.60,0.34],[0.50,0.27],
      // Aquila（わし・左中）
      [0.23,0.57],[0.23,0.50],[0.23,0.64],[0.15,0.62],[0.31,0.62],
      // Delphinus（イルカ・中央）
      [0.44,0.51],[0.41,0.55],[0.43,0.60],[0.47,0.58],[0.53,0.53],
    ];

    const constParticles = CONST_POSITIONS.map(([nx, ny]) => ({
      x: nx * w + (Math.random() - 0.5) * 6,
      y: ny * h + (Math.random() - 0.5) * 6,
      r: Math.random() * 1.6 + 1.0,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      base: Math.random() * 0.3 + 0.4,
      t: Math.random() * Math.PI * 2,
      ts: Math.random() * 0.015 + 0.004,
      star: Math.random() < 0.3,
    }));

    const bgCount = COUNT - CONST_POSITIONS.length;
    const bgParticles = Array.from({ length: bgCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 1.0,
      vy: (Math.random() - 0.5) * 1.0,
      base: Math.random() * 0.35 + 0.06,
      t: Math.random() * Math.PI * 2,
      ts: Math.random() * 0.022 + 0.005,
      star: false,
    }));

    particles = [...constParticles, ...bgParticles];
  }

  function scheduleRing() {
    rings.push({ r: 0, alpha: 0.55 });
    ringTimer = setTimeout(scheduleRing, 2000 + Math.random() * 2000);
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (let i = rings.length - 1; i >= 0; i--) {
      const ring = rings[i];
      ring.r   += 2.8;
      ring.alpha *= 0.973;
      if (ring.alpha < 0.004) { rings.splice(i, 1); continue; }
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, ring.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(196,193,168,${ring.alpha * 0.28})`;
      ctx.lineWidth = 1.3;
      ctx.stroke();
    }

    // 接続線を一括描画
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(196,193,168,0.14)';
    ctx.lineWidth = 0.65;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        if (dx * dx + dy * dy < LINK_DIST2) {
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
        }
      }
    }
    ctx.stroke();

    for (const p of particles) {
      p.t += p.ts;
      const mdx = p.x - mouse.x;
      const mdy = p.y - mouse.y;
      const md2 = mdx * mdx + mdy * mdy;
      if (md2 < REPEL_DIST2 && md2 > 0) {
        const md = Math.sqrt(md2);
        const f  = ((REPEL_DIST - md) / REPEL_DIST) * 6;
        p.x += (mdx / md) * f;
        p.y += (mdy / md) * f;
      }
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;

      const alpha = p.base * (0.55 + 0.45 * Math.sin(p.t));
      if (p.star) {
        // 輝星：グロー2層
        ctx.shadowBlur  = 28;
        ctx.shadowColor = 'rgba(220,216,190,0.95)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,253,240,${alpha * 0.35})`;
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,253,240,${alpha})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      } else if (p.r > 1.2) {
        // 中間星：薄いグロー
        ctx.shadowBlur  = 8;
        ctx.shadowColor = 'rgba(196,193,168,0.5)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,228,215,${alpha})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        // 暗い小星：グローなし
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,178,165,${alpha * 0.7})`;
        ctx.fill();
      }
    }

    rafId = requestAnimationFrame(draw);
  }

  const hero = document.getElementById('hero');
  if (hero) {
    hero.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    }, { passive: true });
    hero.addEventListener('mouseleave', () => {
      mouse.x = -9999; mouse.y = -9999;
    }, { passive: true });

    // ヒーローが見えない間はrAFを停止
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !rafId) rafId = requestAnimationFrame(draw);
      if (!visible) { cancelAnimationFrame(rafId); rafId = null; }
    }).observe(hero);
  }

  resize();
  spawn();
  scheduleRing();
  rafId = requestAnimationFrame(draw);

  window.addEventListener('resize', () => {
    cancelAnimationFrame(rafId);
    clearTimeout(ringTimer);
    rings = [];
    resize();
    spawn();
    scheduleRing();
    rafId = requestAnimationFrame(draw);
  }, { passive: true });
}

// ── スクロール表示アニメーション ─────────────────────────
function initScrollReveal() {
  const aboutRevealItems = new Set(document.querySelectorAll('#about .reveal-item'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.work-card, .archive-card, .article-item, .reveal-item').forEach(el => {
    if (!aboutRevealItems.has(el)) observer.observe(el);
  });

  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
    });
  }, { threshold: 0.15 });

  aboutRevealItems.forEach(el => aboutObserver.observe(el));

  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          aboutSection.classList.add('img-visible');
          imgObserver.disconnect();
        }
      });
    }, { threshold: 0.15 });
    imgObserver.observe(aboutSection);
  }
}

// ── 初期化 ───────────────────────────────────────────────
function initAboutBg() {
  const about = document.getElementById('about');
  const bg = document.getElementById('about-bg');
  if (!about || !bg) return;

  let phase = 0;
  let targetY = 0;
  let smoothY = 0;

  window.addEventListener('scroll', () => {
    const rect = about.getBoundingClientRect();
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + about.offsetHeight);
    targetY = (Math.max(0, Math.min(1, progress)) - 0.5) * 200;
  }, { passive: true });

  function tick() {
    phase += 0.0004;
    const dx = Math.sin(phase * 1.3) * 12;
    const dy = Math.sin(phase * 0.7) * 10;
    smoothY += (targetY - smoothY) * 0.08;
    bg.style.transform = `translate(${dx}px, ${dy + smoothY}px)`;
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

document.addEventListener('DOMContentLoaded', () => {
  buildArchive();
  buildWorks();
  buildArticles();
  buildAbout();
  buildCareer();
  buildNavIcons();
  buildHeroSocial();
  buildFooterLinks();
  initHeroCanvas();
  initAboutBg();

  requestAnimationFrame(initScrollReveal);
});
