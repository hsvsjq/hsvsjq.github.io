'use strict';
/**
 * 18tkey用カスタムJS adapted from the
 * 9tkey用カスタムJS
 * ステップゾーンの調整を行っています。
 * ノートの動きはarrowMotion_dataによるCSSアニメーションで実現(キリズマ/パンパネと同様)。
 */

// Reverseの表記をSpreadにする
g_lblNameObj.Reverse = 'Spread';
g_lblNameObj['u_Reverse'] = 'Spread';

/**
 * メイン画面(初期表示) [Scene: Main / Banana]
 */
g_customJsObj.main.push(() => {
  if (g_keyObj.currentKey == '18t') {
    // ステップゾーンの中心座標を設定
    document.documentElement.style.setProperty('--18t-center-x', (g_sWidth / 2) + 'px')
    document.documentElement.style.setProperty('--18t-center-y', (g_sHeight / 2) + 'px')

    for (let i = 0; i < 18; i++) {
      // ステップゾーンに9tkey用のcssクラスを適用
      document.getElementById(`stepRoot${i}`).classList.add('step18t')

      // リバース時はステップゾーンの矢印を大きくする
      if (g_stateObj.reverse == "ON") {
        document.getElementById(`stepRoot${i}`).style.transform = 'scale(2)'
      }
    }
  }
})
