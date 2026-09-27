/**
 * brew.js — オープニング（珈琲を淹れる演出）の制御
 *
 * 演出そのものは CSS だけで最後まで再生されるため、
 * ここでは Skip の受け付けと、終わったあとの後片付けだけを行う。
 */

/** 演出を即座に切り上げる。--brew-delay を 0 にすると CSS 側の時計が全て前倒しされる */
function skip(root) {
  root.style.setProperty('--brew-delay', '0s');
}

export function initBrew() {
  const overlay = document.getElementById('brew');
  if (!overlay) return;

  const root = document.documentElement;

  // 再生済みとして記録する。次に同じセッションで開いたときは演出を出さない。
  try {
    sessionStorage.setItem('brewed', '1');
  } catch {
    // 保存できない環境では毎回再生されるだけなので、無視してよい
  }

  document.getElementById('brew-skip')?.addEventListener('click', () => skip(root));

  // Esc でも抜けられるようにする
  window.addEventListener('keydown', function onKey(e) {
    if (e.key !== 'Escape') return;
    skip(root);
    window.removeEventListener('keydown', onKey);
  });

  // 退場アニメーションが終わったら DOM から取り除く
  overlay.addEventListener('animationend', e => {
    if (e.animationName === 'brew-out') overlay.remove();
  });
}
