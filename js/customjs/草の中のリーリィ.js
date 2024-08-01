
var stepRoots = null;
var stepRootPos = null;
var reverse = null;

doOnMainInit.push(() => {
  keyCount = g_workObj.keyCtrl.length;
  reverse = g_stateObj.reverse == C_FLG_ON ? -1 : 1;
  console.log(reverse)
  stepRoots = [...Array(keyCount).keys()].map(i => document.getElementById(`stepRoot${i}`));

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
            { elements: [stepRootDivs[0].pos], style: { 
              left: { from: 0, to: $x(0)(400 - 250), func: fromTo, suffix: "px" }, 
              top:  { from: 0, to: $y(0)(250 - 118), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[1].pos], style: { 
              left: { from: 0, to: $x(1)(400 - 200), func: fromTo, suffix: "px" }, 
              top:  { from: 0, to: $y(1)(250 - 32 ), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[2].pos], style: { 
              left: { from: 0, to: $x(2)(400 - 157), func: fromTo, suffix: "px" }, 
              top:  { from: 0, to: $y(2)(250 + 45 ), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[3].pos], style: { 
              left: { from: 0, to: $x(3)(400 - 107), func: fromTo, suffix: "px" }, 
              top:  { from: 0, to: $y(3)(250 + 126), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[4].pos], style: { 
              left: { from: 0, to: $x(4)(400 - 60 ), func: fromTo, suffix: "px" }, 
              top:  { from: 0, to: $y(4)(250 + 45 ), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[5].pos], style: { 
              left: { from: 0, to: $x(5)(400 - 25 ), func: fromTo, suffix: "px" }, 
              top:  { from: 0, to: $y(5)(250 - 32 ), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[6].pos], style: { 
              left: { from: 0, to: $x(6)(400 + 25 ), func: fromTo, suffix: "px" }, 
              top:  { from: 0, to: $y(6)(250 - 32 ), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[7].pos], style: { 
              left: { from: 0, to: $x(7)(400 + 60 ), func: fromTo, suffix: "px" }, 
              top:  { from: 0, to: $y(7)(250 + 45 ), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[8].pos], style: { 
              left: { from: 0, to: $x(8)(400 + 107), func: fromTo, suffix: "px" }, 
              top:  { from: 0, to: $y(8)(250 + 126), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[9].pos], style: { 
              left: { from: 0, to: $x(9)(400 + 157), func: fromTo, suffix: "px" }, 
              top:  { from: 0, to: $y(9)(250 + 45 ), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[10].pos], style: { 
              left: { from: 0, to: $x(10)(400 + 202), func: fromTo, suffix: "px" }, 
              top:  { from: 0, to: $y(10)(250 - 32 ), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
            { elements: [stepRootDivs[11].pos], style: { 
              left: { from: 0, to: $x(11)(400 + 250), func: fromTo, suffix: "px" }, 
              top:  { from: 0, to: $y(11)(250 - 118), func: fromTo, suffix: "px" }, 
            }, duration: 1, },
          ],
          arrowAnimations: [
            { keys: [0],  rotation: 60.1 },
            { keys: [1],  rotation: 60.1 },
            { keys: [2],  rotation: 60.1 },
            { keys: [3],  rotation: 60.1 },
            { keys: [4],  rotation: 159.4 },
            { keys: [5],  rotation: 159.4 },
            { keys: [6],  rotation: -159.4 },
            { keys: [7],  rotation: -159.4 },
            { keys: [8],  rotation: -30.1 },
            { keys: [9],  rotation: -30.1 },
            { keys: [10], rotation: -30.1 },
            { keys: [11], rotation: -30.1 },
          ],
        }
      ]
    }
  ]
));