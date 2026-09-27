/**
 * interactions.js — スクロールに連動する UI 挙動
 *   - reveal   : 要素がビューポートに入ったらフェードインさせる
 *   - navSpy   : 現在表示中のセクションに対応するナビ項目をハイライトする
 *   - progress : ページ上端のスクロール進捗ラインを更新する
 */

/** ビューポートに入った .reveal-item を可視化する（一度きり） */
export function initReveal() {
  const items = document.querySelectorAll('.reveal-item');
  if (!items.length) return;

  // アニメーションを好まない環境では即座に全て表示する
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

  items.forEach(el => observer.observe(el));
}

/** 表示中のセクションに対応するナビ項目へ .is-active を付ける */
export function initNavSpy() {
  const links = new Map(
    Array.from(document.querySelectorAll('[data-nav]'))
      .map(a => [a.dataset.nav, a])
  );
  const sections = Array.from(links.keys())
    .map(id => document.getElementById(id))
    .filter(Boolean);
  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const link = links.get(entry.target.id);
      if (!link) continue;
      link.classList.toggle('is-active', entry.isIntersecting);
    }
  }, { rootMargin: '-45% 0px -45% 0px' });

  sections.forEach(section => observer.observe(section));
}

/**
 * カード上のカーソル位置を CSS 変数として渡す。
 *   --mx / --my : スポットライトの中心
 *   --rx / --ry : カードを傾ける角度（3D チルト）
 */
export function initSpotlight() {
  const targets = document.querySelectorAll(
    '.archive-card, .work-card, .career-card, .article-item'
  );
  const canTilt =
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const MAX_TILT = 5; // 度。強すぎると文字が読みにくくなる

  for (const el of targets) {
    const tiltable = canTilt && !el.classList.contains('career-card') &&
                     !el.classList.contains('article-item');

    el.addEventListener('pointermove', e => {
      const rect = el.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      el.style.setProperty('--mx', `${px}px`);
      el.style.setProperty('--my', `${py}px`);

      if (!tiltable) return;
      // 中心を 0 とした -0.5〜0.5 の比率に変換して傾ける
      const rx = (0.5 - py / rect.height) * 2 * MAX_TILT;
      const ry = (px / rect.width - 0.5) * 2 * MAX_TILT;
      el.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
      el.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
    }, { passive: true });

    if (!tiltable) continue;
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    }, { passive: true });
  }
}

/** ヒーローの名前を1文字ずつの span に分割し、順に持ち上げる */
export function initNameReveal() {
  const name = document.querySelector('.hero-name');
  if (!name) return;

  const text = name.textContent.trim();
  name.textContent = '';
  name.setAttribute('aria-label', text);

  text.split('').forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'ch';
    span.style.setProperty('--i', i);
    span.textContent = ch;
    span.setAttribute('aria-hidden', 'true');
    name.append(span);
  });
}

/** セクションの件数を 00 からカウントアップさせる */
export function initCounters() {
  const counters = document.querySelectorAll('.section-count');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      obs.unobserve(entry.target);

      const target = Number(entry.target.textContent);
      if (!Number.isFinite(target) || target === 0) continue;

      let current = 0;
      const step = () => {
        current += 1;
        entry.target.textContent = String(current).padStart(2, '0');
        if (current < target) setTimeout(step, 90);
      };
      entry.target.textContent = '00';
      setTimeout(step, 200);
    }
  }, { threshold: 1 });

  counters.forEach(el => observer.observe(el));
}

/** ヒーローの周辺ノードをカーソルへわずかに引き寄せる（磁石のような挙動） */
export function initMagnetic() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const RANGE = 130; // この距離まで近づくと反応し始める
  const PULL = 0.32; // 引き寄せる強さ
  const spokes = document.querySelectorAll('.hero-spoke');
  if (!spokes.length) return;

  window.addEventListener('pointermove', e => {
    for (const el of spokes) {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy);

      if (dist < RANGE) {
        const f = (1 - dist / RANGE) * PULL;
        el.style.setProperty('--mx', `${dx * f}px`);
        el.style.setProperty('--my', `${dy * f}px`);
        el.classList.add('is-near');
      } else if (el.classList.contains('is-near')) {
        el.style.setProperty('--mx', '0px');
        el.style.setProperty('--my', '0px');
        el.classList.remove('is-near');
      }
    }
  }, { passive: true });
}

/** カーソルに追従するリング。リンク等の上では拡大する */
export function initCursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const ring = document.createElement('div');
  ring.id = 'cursor-ring';
  ring.setAttribute('aria-hidden', 'true');
  document.body.append(ring);

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let tx = x;
  let ty = y;

  window.addEventListener('pointermove', e => {
    tx = e.clientX;
    ty = e.clientY;
    ring.classList.add('is-visible');
    // 押せるものの上では大きくする
    ring.classList.toggle('is-active', Boolean(e.target.closest('a, button')));
  }, { passive: true });

  document.addEventListener('pointerleave', () => ring.classList.remove('is-visible'));
  window.addEventListener('pointerdown', () => ring.classList.add('is-press'));
  window.addEventListener('pointerup', () => ring.classList.remove('is-press'));

  (function follow() {
    // 少し遅れて追従させる
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    ring.style.translate = `${x}px ${y}px`;
    requestAnimationFrame(follow);
  })();
}

/** Archive をカテゴリで絞り込む */
export function initFilters() {
  const bar = document.getElementById('archive-filters');
  const grid = document.getElementById('archive-grid');
  if (!bar || !grid) return;

  bar.addEventListener('click', e => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;

    for (const b of bar.querySelectorAll('.filter-chip')) {
      const on = b === chip;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    }

    const filter = chip.dataset.filter;
    for (const card of grid.children) {
      const match = filter === 'All' || card.dataset.category === filter;
      card.classList.toggle('is-filtered-out', !match);
      card.toggleAttribute('inert', !match);
    }
  });
}

/** Works の説明文を展開・折りたたみする */
export function initExpanders() {
  for (const btn of document.querySelectorAll('.work-more')) {
    const desc = document.getElementById(btn.getAttribute('aria-controls'));
    if (!desc) continue;

    // 折り返さずに収まる説明文にはボタンを出さない
    if (desc.scrollHeight <= desc.clientHeight + 2) {
      btn.hidden = true;
      continue;
    }

    btn.addEventListener('click', () => {
      const open = desc.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
      btn.querySelector('.work-more-label').textContent = open ? '折りたたむ' : '続きを読む';
    });
  }
}

/** ページ上端の進捗ラインを更新する */
export function initProgress() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;

  let ticking = false;

  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    bar.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  update();
}
