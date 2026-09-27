/**
 * network.js — 背景ネットワーク描画エンジン
 *
 * 全画面 fixed canvas に漂うノード群を描き、近接するノード同士を細線で結ぶ。
 * さらに以下でサイト全体を「一つの繋がったネットワーク」として見せる:
 *   - スクロール速度をノードの流れ（flow）に変換し、網全体が流動する
 *   - DOM 上の [data-node] 要素をアンカーノードとして取り込み、カードと背景網を接続する
 *   - ヒーローの中心ノード（hub）から周辺ノード（spoke）へエッジを張り、光点を流す
 */

// 画面サイズごとの密度設定。モバイルは描画負荷を抑えるため大幅に削る。
const PRESETS = {
  desktop: { count: 130, linkDist: 132, anchorDist: 190 },
  tablet: { count: 80, linkDist: 118, anchorDist: 165 },
  mobile: { count: 38, linkDist: 96, anchorDist: 130 },
};

const MOUSE_RADIUS = 170;
const FLOW_DAMPING = 0.91; // スクロール由来の流れの減衰率
const FLOW_GAIN = 0.05; // スクロール量 → 流速の変換係数
const FLOW_MAX = 14;

/** CSS カスタムプロパティから "r, g, b" 形式の色を読む */
function readRgb(name, fallback) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return raw || fallback;
}

function pickPreset(width) {
  if (width < 640) return PRESETS.mobile;
  if (width < 1100) return PRESETS.tablet;
  return PRESETS.desktop;
}

export function initNetwork() {
  const canvas = document.getElementById('net-canvas');
  if (!canvas) return { refresh() {} };

  const ctx = canvas.getContext('2d', { alpha: true });
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const ink = readRgb('--ink-rgb', '26, 26, 26');
  const accent = readRgb('--accent-rgb', '37, 99, 235');

  let width = 0;
  let height = 0;
  let preset = pickPreset(window.innerWidth);
  let nodes = [];
  let anchors = [];
  let packets = [];
  let pulses = []; // クリック地点から広がる波紋
  let rafId = null;

  let flow = 0;
  let lastScroll = window.scrollY;
  let hotEl = null; // 現在ホバーされているアンカー要素
  let tick = 0;     // 明滅アニメーション用の経過時間
  const pointer = { x: -9999, y: -9999, active: false };

  // ── セットアップ ────────────────────────────────────────

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const next = pickPreset(width);
    if (next !== preset || nodes.length === 0) {
      preset = next;
      spawn();
    }
  }

  function spawn() {
    nodes = Array.from({ length: preset.count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.1 + 0.7,
      // 明滅の位相。ノードごとにずらして網全体がゆっくり呼吸して見えるようにする
      phase: Math.random() * Math.PI * 2,
    }));
  }

  /** [data-node] 要素を走査してアンカーノードとして登録する（カード生成後に呼ぶ） */
  function refresh() {
    anchors = Array.from(document.querySelectorAll('[data-node]')).map(el => ({
      el,
      kind: el.dataset.node, // "hub" | "spoke" | "card"
      x: 0,
      y: 0,
      visible: false,
    }));
    buildPackets();
  }

  /** エッジ上を流れる光点を用意する（hub→spoke と、隣り合うカード同士） */
  function buildPackets() {
    const hub = anchors.find(a => a.kind === 'hub');
    const spokes = anchors.filter(a => a.kind === 'spoke');

    packets = spokes.map((spoke, i) => ({
      from: hub,
      to: spoke,
      kind: 'hub',
      t: i / Math.max(spokes.length, 1),
      speed: 0.0026 + Math.random() * 0.0018,
    }));

    // DOM 順で隣り合うカードを結び、ページ全体を1本の経路として繋ぐ
    const cards = anchors.filter(a => a.kind === 'card');
    for (let i = 0; i < cards.length - 1; i++) {
      packets.push({
        from: cards[i],
        to: cards[i + 1],
        kind: 'card',
        t: Math.random(),
        speed: 0.0032 + Math.random() * 0.0026,
      });
    }
  }

  /**
   * 各アンカーの現在のビューポート座標を取得する。
   *
   * 座標の読み取り（レイアウト）とホバー判定（スタイル計算）を混ぜると
   * 要素ごとに同期レイアウトが走ってフレームが潰れるため、
   * ホバー状態は pointerover で捕まえた要素との比較だけで判定する。
   */
  function measureAnchors() {
    for (const a of anchors) {
      const rect = a.el.getBoundingClientRect();
      // 画面外のアンカーは以降の計算から除外する
      a.visible = rect.bottom > -120 && rect.top < height + 120 && rect.width > 0;
      if (!a.visible) continue;
      a.x = rect.left + rect.width / 2;
      a.y = rect.top + rect.height / 2;
      a.hot = a.el === hotEl;
    }
  }

  // ── 更新 ────────────────────────────────────────────────

  function update() {
    tick += 0.02;
    flow *= FLOW_DAMPING;
    if (Math.abs(flow) < 0.002) flow = 0;

    const margin = 60;
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy - flow;

      // ポインタ近傍のノードをゆるやかに引き寄せる
      if (pointer.active) {
        const dx = pointer.x - n.x;
        const dy = pointer.y - n.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_RADIUS * MOUSE_RADIUS && d2 > 1) {
          const f = (1 - Math.sqrt(d2) / MOUSE_RADIUS) * 0.35;
          n.x += dx * 0.004 * f;
          n.y += dy * 0.004 * f;
        }
      }

      // 画面外へ出たら反対側から回り込ませる
      if (n.x < -margin) n.x = width + margin;
      else if (n.x > width + margin) n.x = -margin;
      if (n.y < -margin) n.y = height + margin;
      else if (n.y > height + margin) n.y = -margin;
    }

    for (const p of packets) {
      p.t += p.speed;
      if (p.t > 1) p.t -= 1;
    }

    // 波紋を広げ、リングに触れたノードを外側へ押し出す
    for (const p of pulses) {
      p.r += 11;
      for (const n of nodes) {
        const dx = n.x - p.x;
        const dy = n.y - p.y;
        const d = Math.hypot(dx, dy) || 1;
        if (Math.abs(d - p.r) > 26) continue;
        const push = (1 - p.r / p.max) * 1.6;
        n.x += (dx / d) * push;
        n.y += (dy / d) * push;
      }
    }
    pulses = pulses.filter(p => p.r < p.max);
  }

  // ── 描画 ────────────────────────────────────────────────

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;

    drawNodeLinks();
    drawAnchorLinks();
    drawEdges();
    drawNodes();
    drawPointerLinks();
    drawPulses();
  }

  /** ノード同士の接続線 */
  function drawNodeLinks() {
    const max = preset.linkDist;
    const max2 = max * max;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > max2) continue;
        // 距離が近いほど濃く
        const alpha = (1 - Math.sqrt(d2) / max) * 0.16;
        ctx.strokeStyle = `rgba(${ink}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  /** アンカー（カード等）と背景ノードの接続線 */
  function drawAnchorLinks() {
    for (const a of anchors) {
      if (!a.visible) continue;

      // ホバー中は接続範囲・本数・濃さを引き上げ、網が反応したように見せる
      const max = a.hot ? preset.anchorDist * 1.9 : preset.anchorDist;
      const max2 = max * max;
      const limit = a.hot ? 14 : 5;
      const gain = a.hot ? 0.75 : 0.3;

      let linked = 0;
      for (const n of nodes) {
        if (linked >= limit) break;
        const dx = a.x - n.x;
        const dy = a.y - n.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > max2) continue;
        linked++;
        const alpha = (1 - Math.sqrt(d2) / max) * gain;
        ctx.strokeStyle = `rgba(${accent}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(n.x, n.y);
        ctx.stroke();
      }

      // アンカー本体の点
      const r = a.kind === 'hub' ? 3 : 1.8;
      ctx.fillStyle = `rgba(${accent}, ${a.hot ? 0.95 : 0.55})`;
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.hot ? r * 1.8 : r, 0, Math.PI * 2);
      ctx.fill();

      if (a.hot) {
        ctx.strokeStyle = `rgba(${accent}, 0.35)`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, r * 5, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }

  /** クリック地点から広がる波紋 */
  function drawPulses() {
    for (const p of pulses) {
      const alpha = (1 - p.r / p.max) * 0.5;
      if (alpha <= 0) continue;
      ctx.strokeStyle = `rgba(${accent}, ${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  /** 主エッジと、その上を流れる光点 */
  function drawEdges() {
    const MAX_CARD_EDGE = 780; // これより離れたカード同士は結ばない

    for (const p of packets) {
      const { from, to } = p;
      if (!from?.visible || !to?.visible) continue;

      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const isHub = p.kind === 'hub';
      if (!isHub && Math.hypot(dx, dy) > MAX_CARD_EDGE) continue;

      ctx.strokeStyle = `rgba(${accent}, ${isHub ? 0.4 : 0.14})`;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();

      // 光点と、その後方へ伸びる軌跡
      const px = from.x + dx * p.t;
      const py = from.y + dy * p.t;
      const tail = Math.max(0, p.t - 0.09);

      const grad = ctx.createLinearGradient(
        from.x + dx * tail, from.y + dy * tail, px, py
      );
      grad.addColorStop(0, `rgba(${accent}, 0)`);
      grad.addColorStop(1, `rgba(${accent}, ${isHub ? 0.85 : 0.5})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(from.x + dx * tail, from.y + dy * tail);
      ctx.lineTo(px, py);
      ctx.stroke();
      ctx.lineWidth = 1;

      ctx.fillStyle = `rgba(${accent}, ${isHub ? 0.95 : 0.6})`;
      ctx.beginPath();
      ctx.arc(px, py, isHub ? 2.6 : 1.9, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawNodes() {
    for (const n of nodes) {
      const beat = Math.sin(tick + n.phase); // -1〜1
      ctx.fillStyle = `rgba(${ink}, ${(0.22 + beat * 0.12).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * (1 + beat * 0.25), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /** ポインタと周辺ノードの接続線 */
  function drawPointerLinks() {
    if (!pointer.active) return;
    const max2 = MOUSE_RADIUS * MOUSE_RADIUS;
    for (const n of nodes) {
      const dx = pointer.x - n.x;
      const dy = pointer.y - n.y;
      const d2 = dx * dx + dy * dy;
      if (d2 > max2) continue;
      const alpha = (1 - Math.sqrt(d2) / MOUSE_RADIUS) * 0.45;
      ctx.strokeStyle = `rgba(${accent}, ${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(pointer.x, pointer.y);
      ctx.lineTo(n.x, n.y);
      ctx.stroke();
    }
  }

  // ── ループ ──────────────────────────────────────────────

  function frame() {
    measureAnchors();
    update();
    draw();
    rafId = requestAnimationFrame(frame);
  }

  function renderStatic() {
    measureAnchors();
    draw();
  }

  function start() {
    if (reduceMotion.matches) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      renderStatic();
    } else if (!rafId) {
      rafId = requestAnimationFrame(frame);
    }
  }

  // ── イベント ────────────────────────────────────────────

  window.addEventListener('resize', () => {
    resize();
    if (reduceMotion.matches) renderStatic();
  }, { passive: true });

  window.addEventListener('scroll', () => {
    const delta = window.scrollY - lastScroll;
    lastScroll = window.scrollY;
    flow = Math.max(-FLOW_MAX, Math.min(FLOW_MAX, flow + delta * FLOW_GAIN));
    if (reduceMotion.matches) renderStatic();
  }, { passive: true });

  window.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;
  }, { passive: true });

  window.addEventListener('pointerleave', () => {
    pointer.active = false;
  }, { passive: true });

  // ホバー中のアンカーを記録しておく（描画ループ内で :hover を問い合わせないため）
  document.addEventListener('pointerover', e => {
    hotEl = e.target.closest?.('[data-node]') ?? null;
  }, { passive: true });

  // クリック / タップで波紋を発生させる（同時に走らせるのは3つまで）
  window.addEventListener('pointerdown', e => {
    if (pulses.length > 2) pulses.shift();
    pulses.push({
      x: e.clientX,
      y: e.clientY,
      r: 0,
      max: Math.hypot(width, height) * 0.55,
    });
  }, { passive: true });

  // タブ非表示中は描画を止める
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    } else {
      start();
    }
  });

  reduceMotion.addEventListener('change', start);

  resize();
  refresh();
  start();

  return { refresh };
}
