/**
 * brew.js — オープニング（珈琲を淹れる演出）の制御
 *
 * 演出は CSS で再生し、読み込みが終わるまでは本注ぎを繰り返す。
 * ここでは裏の準備（ページの読み込み・フォント・最初の画面の画像）を待ち、
 * 終わったら締めくくりを始める時刻 --brew-end を書き込む。
 * あわせて Skip の受け付けと、終わったあとの後片付けを行う。
 */

/** 蒸らしが終わり、本注ぎの円が始まる時刻（秒）。最低でもここまでは見せる */
const POUR_START = 3.85;
/** 本注ぎの円 1 周の長さ（秒）。締めくくりは円の切れ目に揃え、動きが飛ばないようにする */
const SWIRL = 1.8;
/** 回線が極端に遅くても、この秒数で待つのを打ち切る */
const MAX_WAIT = 15;

/** 演出を即座に切り上げる。--brew-delay を 0 にすると CSS 側の時計が全て前倒しされる */
function skip(root) {
  root.style.setProperty('--brew-delay', '0s');
}

/** ページの読み込み完了（load イベント）を待つ */
function pageLoaded() {
  if (document.readyState === 'complete') return Promise.resolve();
  return new Promise(resolve => window.addEventListener('load', resolve, { once: true }));
}

/** 最初の画面に入っている画像のデコードを待つ */
function firstViewImages() {
  const imgs = [...document.images].filter(img => {
    const rect = img.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  });
  // 読み込みに失敗した画像でローディングが止まらないよう、失敗は握りつぶす
  return Promise.all(imgs.map(img => img.decode().catch(() => {})));
}

/** 裏の準備がすべて終わるのを待つ（最大 MAX_WAIT 秒） */
function assetsReady() {
  const ready = Promise.all([
    pageLoaded(),
    document.fonts?.ready ?? Promise.resolve(),
  ]).then(firstViewImages);
  const timeout = new Promise(resolve => setTimeout(resolve, MAX_WAIT * 1000));
  return Promise.race([ready, timeout]);
}

/** 演出の開始からの経過秒数。CSS アニメーションと同じ時計で測る */
function elapsedSeconds(overlay) {
  const anim = overlay.getAnimations({ subtree: true }).find(a => a.startTime !== null);
  const start = anim ? anim.startTime : 0;
  return (document.timeline.currentTime - start) / 1000;
}

/** 経過秒数から、締めくくりを始める時刻（本注ぎの円の切れ目）を求める */
function endTime(elapsed) {
  if (elapsed <= POUR_START) return POUR_START;
  const laps = Math.ceil((elapsed - POUR_START) / SWIRL);
  return POUR_START + laps * SWIRL;
}

export function initBrew() {
  const overlay = document.getElementById('brew');
  if (!overlay) return;

  const root = document.documentElement;

  document.getElementById('brew-skip')?.addEventListener('click', () => skip(root));

  // Esc でも抜けられるようにする
  window.addEventListener('keydown', function onKey(e) {
    if (e.key !== 'Escape') return;
    skip(root);
    window.removeEventListener('keydown', onKey);
  });

  // 準備ができたら、次の円の切れ目で締めくくりを始める
  assetsReady().then(() => {
    const end = endTime(elapsedSeconds(overlay));
    root.style.setProperty('--brew-end', `${end.toFixed(2)}s`);
  });

  // 退場アニメーションが終わったら DOM から取り除く
  overlay.addEventListener('animationend', e => {
    if (e.animationName === 'brew-out') overlay.remove();
  });
}
