
var stepRoots = null;
var stepRootPos = null;
var reverse = null;

var s0 = 0;
var p0 = 0;

doOnMainInit.push(() => {
  keyCount = g_workObj.keyCtrl.length;
  reverse = g_stateObj.reverse == C_FLG_ON;
  stepRoots = [...Array(keyCount).keys()].map(i => document.getElementById(`stepRoot${i}`));

  s0 = reverse ? 0 : 3;
  p0 = C_STEP_Y + (reverse ? g_posObj.reverseStepY : 0);
})

const $x = key => abs => absolutePositionToStepRoot(abs, key, "x")
const $y = key => abs => absolutePositionToStepRoot(abs, key, "y")


doOnMainInit.push(() => setCustomMove(
  [
    {
      scoreId: 0,
      data: [
        {
          frame: 0,
          events: [
            { elements: [stepRootDivs[0].pos], 
              style: { left: { from: 0, to: $x(0) (100), func: fromTo, suffix: "px" },
                       top:  { from: 0, to: $y(0) (100), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[1].pos], 
              style: { left: { from: 0, to: $x(1) (200), func: fromTo, suffix: "px" },
                       top:  { from: 0, to: $y(1) (100), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[2].pos], 
              style: { left: { from: 0, to: $x(2) (300), func: fromTo, suffix: "px" },
                       top:  { from: 0, to: $y(2) (100), func: fromTo, suffix: "px" }, 
            }, duration: 1, },

            { elements: [stepRootDivs[3].pos], 
              style: { left: { from: 0, to: $x(3) (100), func: fromTo, suffix: "px" },
                       top:  { from: 0, to: $y(3) (200), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[4].pos], 
              style: { left: { from: 0, to: $x(4) (200), func: fromTo, suffix: "px" },
                       top:  { from: 0, to: $y(4) (200), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[5].pos], 
              style: { left: { from: 0, to: $x(5) (300), func: fromTo, suffix: "px" },
                       top:  { from: 0, to: $y(5) (200), func: fromTo, suffix: "px" }, 
            }, duration: 1, },

            { elements: [stepRootDivs[6].pos], 
              style: { left: { from: 0, to: $x(6) (100), func: fromTo, suffix: "px" },
                       top:  { from: 0, to: $y(6) (300), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[7].pos], 
              style: { left: { from: 0, to: $x(7) (200), func: fromTo, suffix: "px" },
                       top:  { from: 0, to: $y(7) (300), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[8].pos], 
              style: { left: { from: 0, to: $x(8) (300), func: fromTo, suffix: "px" },
                       top:  { from: 0, to: $y(8) (300), func: fromTo, suffix: "px" }, 
            }, duration: 1, },


            { elements: [stepRootDivs[9].pos], 
              style: { left: { from: 0, to: $x(9) (500), func: fromTo, suffix: "px" },
                       top:  { from: 0, to: $y(9) (100), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[10].pos], 
              style: { left: { from: 0, to: $x(10) (600), func: fromTo, suffix: "px" },
                       top:  { from: 0, to: $y(10) (100), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[11].pos], 
              style: { left: { from: 0, to: $x(11) (700), func: fromTo, suffix: "px" },
                       top:  { from: 0, to: $y(11) (100), func: fromTo, suffix: "px" }, 
            }, duration: 1, },

            { elements: [stepRootDivs[12].pos], 
              style: { left: { from: 0, to: $x(12) (500), func: fromTo, suffix: "px" },
                       top:  { from: 0, to: $y(12) (200), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[13].pos], 
              style: { left: { from: 0, to: $x(13) (600), func: fromTo, suffix: "px" },
                       top:  { from: 0, to: $y(13) (200), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[14].pos], 
              style: { left: { from: 0, to: $x(14) (700), func: fromTo, suffix: "px" },
                       top:  { from: 0, to: $y(14) (200), func: fromTo, suffix: "px" }, 
            }, duration: 1, },

            { elements: [stepRootDivs[15].pos], 
              style: { left: { from: 0, to: $x(15) (500), func: fromTo, suffix: "px" },
                       top:  { from: 0, to: $y(15) (300), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[16].pos], 
              style: { left: { from: 0, to: $x(16) (600), func: fromTo, suffix: "px" },
                       top:  { from: 0, to: $y(16) (300), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[17].pos], 
              style: { left: { from: 0, to: $x(17) (700), func: fromTo, suffix: "px" },
                       top:  { from: 0, to: $y(17) (300), func: fromTo, suffix: "px" }, 
            }, duration: 1, },

          ],
          arrowAnimations: [
            { keys: [...Array(18).keys()],  rotation: 0,
              animation: { transform: [`scale(${s0})`, "scale(1)"], easing: ["linear"], },
              style: `{ top: ${p0}px !important; position: absolute; }` 
            },
          ],
        }
      ]
    }
  ]
));