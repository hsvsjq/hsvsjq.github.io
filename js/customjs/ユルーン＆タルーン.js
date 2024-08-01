
var stepRoots = null;
var stepRootPos = null;
var reverse = null;

doOnMainInit.push(() => {
  keyCount = g_workObj.keyCtrl.length;
  reverse = g_stateObj.reverse == C_FLG_ON ? 1 : 0;
  stepRoots = [...Array(keyCount).keys()].map(i => document.getElementById(`stepRoot${i}`));

  arrowId = [...Array(keyCount).keys()].filter((v, i, a) => g_workObj.arrowRtn[i] != "onigiri")

})

const $x = key => abs => absolutePositionToStepRoot(abs, key, "x")
const $y = key => abs => absolutePositionToStepRoot(abs, key, "y")


doOnMainInit.push(() => setCustomMove(
  [
    {
      scoreId: 0,
      data: [
        {
          frame: 1861,
          events: [
            { elements: [stepRootDivs[arrowId[0]].pos], 
              style: { top:  { from: 0, to: $y(arrowId[0]) (g_sHeight / 2),     func: fromTo, suffix: "px" }, 
                       left: { from: 0, to: $x(arrowId[0]) (g_sWidth / 2 - 50), func: fromTo, suffix: "px" },
            }, duration: 111, },
            { elements: [stepRootDivs[arrowId[1]].pos], 
              style: { top:  { from: 0, to: $y(arrowId[1]) (g_sHeight / 2 + 50), func: fromTo, suffix: "px" }, 
                       left: { from: 0, to: $x(arrowId[1]) (g_sWidth / 2),       func: fromTo, suffix: "px" },
            }, duration: 111, },
            { elements: [stepRootDivs[arrowId[2]].pos], 
              style: { top:  { from: 0, to: $y(arrowId[2]) (g_sHeight / 2 - 50), func: fromTo, suffix: "px" }, 
                       left: { from: 0, to: $x(arrowId[2]) (g_sWidth / 2),       func: fromTo, suffix: "px" },
            }, duration: 111, },
            { elements: [stepRootDivs[arrowId[3]].pos], 
              style: { top:  { from: 0, to: $y(arrowId[3]) (g_sHeight / 2),      func: fromTo, suffix: "px" }, 
                       left: { from: 0, to: $x(arrowId[3]) (g_sWidth / 2 + 50),  func: fromTo, suffix: "px" },
            }, duration: 111, },
          ],
          arrowAnimations: [
            { keys: [arrowId[0]],  rotation: 90 + 180 * reverse },
            { keys: [arrowId[1]],  rotation: 0 + 180 * reverse },
            { keys: [arrowId[2]],  rotation: 180 + 180 * reverse },
            { keys: [arrowId[3]],  rotation: 270 + 180 * reverse },
          ],
        },
        {
          frame: 3190,
          events: [
            { elements: [stepRootDivs[arrowId[0]].pos], 
              style: { top:  { from: $y(arrowId[0]) (g_sHeight / 2),      to: $y(arrowId[0])(C_STEP_Y - g_posObj.reverseStepY * (reverse - 1)), func: fromTo, suffix: "px" }, 
                       left: { from: $x(arrowId[0]) (g_sWidth / 2 - 50),  to: 0, func: fromTo, suffix: "px"},
            }, duration: 111, },
            { elements: [stepRootDivs[arrowId[1]].pos], 
              style: { top:  { from: $y(arrowId[1]) (g_sHeight / 2 + 50), to: $y(arrowId[1])(C_STEP_Y - g_posObj.reverseStepY * (reverse - 1)), func: fromTo, suffix: "px" }, 
                       left: { from: $x(arrowId[1]) (g_sWidth / 2),       to: 0, func: fromTo, suffix: "px"},
            }, duration: 111, },
            { elements: [stepRootDivs[arrowId[2]].pos], 
              style: { top:  { from: $y(arrowId[2]) (g_sHeight / 2 - 50), to: $y(arrowId[2])(C_STEP_Y - g_posObj.reverseStepY * (reverse - 1)), func: fromTo, suffix: "px" }, 
                       left: { from: $x(arrowId[2]) (g_sWidth / 2),       to: 0, func: fromTo, suffix: "px"},
            }, duration: 111, },
            { elements: [stepRootDivs[arrowId[3]].pos], 
              style: { top:  { from: $y(arrowId[3]) (g_sHeight / 2),      to: $y(arrowId[3])(C_STEP_Y - g_posObj.reverseStepY * (reverse - 1)), func: fromTo, suffix: "px" }, 
                       left: { from: $x(arrowId[3]) (g_sWidth / 2 + 50),  to: 0, func: fromTo, suffix: "px"},
            }, duration: 111, },
          ],
          arrowAnimations: [
            { keys: [arrowId[0],arrowId[1],arrowId[2],arrowId[3]],  rotation: 180 },
          ],
        }
      ]
    }
  ]
));
//|space_data=1861,1972,3190,3301|frzSpace_data=|speed_data=