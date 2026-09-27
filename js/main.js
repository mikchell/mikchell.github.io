/**
 * main.js — エントリポイント
 *
 * DOM の組み立て → ネットワーク描画の開始 → インタラクションの初期化 の順に実行する。
 * initNetwork() は内部で [data-node] を走査するため、必ず buildSections() の後に呼ぶ。
 */

import { buildSections } from './sections.js';
import { initNetwork } from './network.js';
import {
  initReveal, initNavSpy, initProgress, initCounters,
  initSpotlight, initMagnetic, initCursor, initFilters, initExpanders,
  initNameReveal,
} from './interactions.js';

buildSections();
initNameReveal();
initNetwork();

initReveal();
initNavSpy();
initProgress();
initCounters();

initSpotlight();
initMagnetic();
initCursor();
initFilters();

// 説明文の高さを測るため、フォント適用後に判定する
document.fonts?.ready.then(initExpanders) ?? initExpanders();
