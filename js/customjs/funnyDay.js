
var stepRoots = null;
var stepRootPos = null;
var nDistance = 52.5;
var cX = null;
var reverse = null;

doOnMainInit.push(() => {
  keyCount = g_workObj.keyCtrl.length;
  reverse = g_stateObj.reverse == C_FLG_ON ? -1 : 1;
  stepRoots = [...Array(keyCount).keys()].map(i => document.getElementById(`stepRoot${i}`));

})

const srp = stepRootPos;

const $x = key => abs => absolutePositionToStepRoot(abs, key, "x")
const $y = key => abs => absolutePositionToStepRoot(abs, key, "y")

/*
          arrowAnimations: 
            [...Array(9).keys()].map(i => {
              return { 
                key: i, relativeElement: stepRoots[i],
                animation: [
                  { transform: "translate(0px, 500px)"},
                  { transform: "translate(0px, 0px)"},
                ],
                style: [
                  {name: "left", value: "100px", priority: "important"}
                ]
              }
            }),
*/


doOnMainInit.push(() => setCustomMove(
  [
    {
      scoreId: 0,
      data: [
        {
          frame: 0,
          arrowAnimations: 
            [...Array(9).keys()].map(i => {
              return { 
                key: i,
                rotation: 0,
              }
            }),
        },
        {
          frame: 2192,
          events: [
            { elements: [stepRootDivs[0].pos], style: { left: { from: 0, to: nDistance,            func: fromTo, suffix: "px" }, }, duration: 29, },
            { elements: [stepRootDivs[1].pos], style: { left: { from: 0, to: nDistance,            func: fromTo, suffix: "px" }, }, duration: 29, },
            { elements: [stepRootDivs[2].pos], style: {  top: { from: 0, to: -nDistance * reverse, func: fromTo, suffix: "px" }, }, duration: 29, },
            { elements: [stepRootDivs[7].pos], style: {  top: { from: 0, to: -nDistance * reverse, func: fromTo, suffix: "px" },
                                                        left: { from: 0, to: -nDistance,           func: fromTo, suffix: "px" }, }, duration: 29, },
            { elements: [stepRootDivs[8].pos], style: { left: { from: 0, to: -nDistance,           func: fromTo, suffix: "px" }, }, duration: 29, },
          ],
        },
        {
          frame: 4096,

          arrowAnimations: [
            { key: 0, rotation: 90 * reverse },
            { key: 1, rotation: 90 - 90 * reverse },
            { key: 2, rotation: 90 + 90 * reverse },
            { key: 3, rotation: -90 * reverse },
          ],
          
          events: [
            { elements: [stepRootDivs[0].pos], style: { left: { from: nDistance,             to: nDistance,              func: fromTo, suffix: "px" },
                                                        top:  { from: 0,                     to: $y(0)(250),             func: fromTo, suffix: "px" }, }, duration: 29, },

            { elements: [stepRootDivs[1].pos], style: { left: { from: nDistance,             to: nDistance,              func: fromTo, suffix: "px" },
                                                        top:  { from: 0,                     to: $y(1)(250),             func: fromTo, suffix: "px" }, }, duration: 29, },
            { elements: [stepRootDivs[2].pos], style: { left: { from: -nDistance * reverse,  to: 0,                      func: fromTo, suffix: "px" },
                                                        top:  { from: 0,                     to: $y(2)(250 - nDistance), func: fromTo, suffix: "px" }, }, duration: 29, },

            { elements: [stepRootDivs[3].pos], style: { left: { from: 0,                     to: 0,                      func: fromTo, suffix: "px" },
                                                        top:  { from: 0,                     to: $y(3)(250),             func: fromTo, suffix: "px" }, }, duration: 29, },
            { elements: [stepRootDivs[7].pos], style: { left: { from: -nDistance,            to: 0,                      func: fromTo, suffix: "px" },
                                                        top:  { from: -nDistance * reverse,  to: 0,                      func: fromTo, suffix: "px" }, }, duration: 29, },      
            { elements: [stepRootDivs[8].pos], style: { left: { from: -nDistance,            to: 0,                      func: fromTo, suffix: "px" }, }, duration: 29, },
          ],
        },
        {
          frame: 4988,
          arrowAnimations: [
            { key: 0, rotation: 90 + 90 * reverse },
            { key: 1, rotation: 90 + 90 * reverse },
            { key: 2, rotation: 90 + 90 * reverse },
            { key: 3, rotation: 90 + 90 * reverse },
          ],
          events: [
            { elements: [stepRootDivs[0].pos], style: { left: { from: nDistance,              to: 0, func: fromTo, suffix: "px" },
                                                        top:  { from: $y(0)(250),             to: 0, func: fromTo, suffix: "px" }, }, duration: 29, },
            { elements: [stepRootDivs[1].pos], style: { left: { from: nDistance,              to: 0, func: fromTo, suffix: "px" },
                                                        top:  { from: $y(1)(250),             to: 0, func: fromTo, suffix: "px" }, }, duration: 29, },
            { elements: [stepRootDivs[2].pos], style: { top:  { from: $y(2)(250 - nDistance), to: 0, func: fromTo, suffix: "px" }, }, duration: 29, },
            { elements: [stepRootDivs[3].pos], style: { top:  { from: $y(3)(250),             to: 0, func: fromTo, suffix: "px" }, }, duration: 29, },
          ],
        },
        {
          frame: 6000,
          events: [
            { elements: [
              stepRootDivs[0].pos,
              stepRootDivs[1].pos,
              stepRootDivs[2].pos,
              stepRootDivs[3].pos,
              stepRootDivs[4].pos,
              stepRootDivs[5].pos,
              stepRootDivs[6].pos,
              stepRootDivs[7].pos,
              stepRootDivs[8].pos,

            ], style: { top:  { 
              from: $y(0)(C_STEP_Y - g_posObj.reverseStepY * (reverse == 1 ? -1 : 0)), 
              to:   $y(0)(C_STEP_Y - g_posObj.reverseStepY * (reverse == 1 ? -1 : 0)), func: fromTo, suffix: "px" }, 
              left: {from: 0, to: 0, func: fromTo, suffix: "px"},
            }, duration: 1, },
            
          ],
        },
        {
          frame: 6030,
          arrowAnimations: [
            { key: 0, rotation: 90 - 90 * reverse },
            { key: 1, rotation: 90 - 90 * reverse },
            { key: 2, rotation: 90 - 90 * reverse },
            { key: 3, rotation: 90 - 90 * reverse },
            { key: 4, rotation: 90 - 90 * reverse },
            { key: 5, rotation: 90 - 90 * reverse },
            { key: 6, rotation: 90 - 90 * reverse },
            { key: 7, rotation: 90 - 90 * reverse },
            { key: 8, rotation: 90 - 90 * reverse },
          ],
        },
        {
          frame: 6982,
          events: [
            { elements: [stepRootDivs[0].pos], duration: 119, style: 
              { top: { from: $y(0)(C_STEP_Y - g_posObj.reverseStepY * (reverse == 1 ? -1 : 0)), to: $y(0)(C_STEP_Y + g_posObj.reverseStepY / 2), func: fromTo, suffix: "px", }, 
               left: { from: 0, to: $x(0)(nDistance / 2), func: fromTo, suffix: "px", }, }, 
            },
            { elements: [stepRootDivs[8].pos], duration: 119, style: 
              { top: { from: $y(8)(C_STEP_Y - g_posObj.reverseStepY * (reverse == 1 ? -1 : 0)), to: $y(8)(C_STEP_Y + g_posObj.reverseStepY / 2), func: fromTo, suffix: "px", }, 
                left: { from: 0, to: $x(8)(g_sWidth - nDistance / 2 * 3), func: fromTo, suffix: "px", }, }, 
            },

            { elements: [stepRootDivs[3].pos], duration: 119, style: 
              { top: { from: $y(3)(C_STEP_Y - g_posObj.reverseStepY * (reverse == 1 ? -1 : 0)), to: $y(3)(C_STEP_Y + g_posObj.reverseStepY / 2), func: fromTo, suffix: "px", }, 
                left: { from: 0, to: 0, func: fromTo, suffix: "px", }, }, 
            },
            { elements: [stepRootDivs[5].pos], duration: 119, style: 
              { top: { from: $y(5)(C_STEP_Y - g_posObj.reverseStepY * (reverse == 1 ? -1 : 0)), to: $y(5)(C_STEP_Y + g_posObj.reverseStepY / 2), func: fromTo, suffix: "px", }, 
                left: { from: 0, to: 0, func: fromTo, suffix: "px", }, }, 
            },
            { elements: [stepRootDivs[4].pos], duration: 119, style: 
              { top: { from: $y(5)(C_STEP_Y - g_posObj.reverseStepY * (reverse == 1 ? -1 : 0)), to: $y(5)(C_STEP_Y + g_posObj.reverseStepY / 2), func: fromTo, suffix: "px", }, 
                left: { from: 0, to: 0, func: fromTo, suffix: "px", }, }, 
            },
          
            { elements: [stepRootDivs[2].pos], duration: 119, style: 
              { top: { from: $y(2)(C_STEP_Y - g_posObj.reverseStepY * (reverse == 1 ? -1 : 0)), to: $y(2)(C_STEP_Y), func: fromTo, suffix: "px", }, 
                left: { from: 0, to: $x(2)(g_sWidth / 4 * 1 - 25), func: fromTo, suffix: "px", }, }, 
            },
            { elements: [stepRootDivs[7].pos], duration: 119, style: 
              { top: { from: $y(7)(C_STEP_Y - g_posObj.reverseStepY * (reverse == 1 ? -1 : 0)), to: $y(7)(C_STEP_Y), func: fromTo, suffix: "px", }, 
                left: { from: 0, to: $x(7)(g_sWidth / 4 * 3 - 25), func: fromTo, suffix: "px", }, }, 
            },
                
            { elements: [stepRootDivs[1].pos], duration: 119, style: 
              { top: { from: $y(1)(C_STEP_Y - g_posObj.reverseStepY * (reverse == 1 ? -1 : 0)), to: $y(1)(C_STEP_Y + g_posObj.reverseStepY), func: fromTo, suffix: "px", }, 
                left: { from: 0, to: $x(1)(g_sWidth / 4 * 1 - 25), func: fromTo, suffix: "px", }, }, 
            },
            { elements: [stepRootDivs[6].pos], duration: 119, style: 
              { top: { from: $y(6)(C_STEP_Y - g_posObj.reverseStepY * (reverse == 1 ? -1 : 0)), to: $y(6)(C_STEP_Y + g_posObj.reverseStepY), func: fromTo, suffix: "px", }, 
                left: { from: 0, to: $x(6)(g_sWidth / 4 * 3 - 25), func: fromTo, suffix: "px", }, }, 
            },
          ],
          arrowAnimations: [
            { key: 0, rotation: 90 },
            { key: 1, rotation: 0 },
            { key: 2, rotation: 180 },
            { key: 3, rotation: -90 },
            { key: 5, rotation: 90 },
            { key: 6, rotation: 0 },
            { key: 7, rotation: 180 },
            { key: 8, rotation: -90 },
          ],
        },
        {
          frame: 7904,
          arrowAnimations: [
            { key: 0, rotation: 90 + 90 * reverse },
            { key: 1, rotation: 90 + 90 * reverse },
            { key: 2, rotation: 90 + 90 * reverse },
            { key: 3, rotation: 90 + 90 * reverse },
            { key: 4, rotation: 90 + 90 * reverse },
            { key: 5, rotation: 90 + 90 * reverse },
            { key: 6, rotation: 90 + 90 * reverse },
            { key: 7, rotation: 90 + 90 * reverse },
            { key: 8, rotation: 90 + 90 * reverse },
          ],
          events: [
            { elements: [
              stepRootDivs[0].pos,
              stepRootDivs[1].pos,
              stepRootDivs[2].pos,
              stepRootDivs[3].pos,
              stepRootDivs[4].pos,
              stepRootDivs[5].pos,
              stepRootDivs[6].pos,
              stepRootDivs[7].pos,
              stepRootDivs[8].pos,
            ], style: { 
              top:  { from: 0, to: 0, func: fromTo, suffix: "px" }, 
              left: { from: 0, to: 0, func: fromTo, suffix: "px"},
            }, duration: 1, },
          ],
        },
      ]
    },
  ]
));

/*
|space_data=
317, 	   start
2192,2221, 7k
4096,4125, 7k end; left arrows
4988,5078, left normal; right arrows
6000,6030, all normal
6982,7101, something funny (sabi again)
7904,7934  all normal
|frzSpace_data=|speed_data=
*/


//https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
//https://www.w3schools.com/jsref/jsref_object_entries.asp
//https://stackoverflow.com/questions/69069956/change-value-of-specific-keys-of-an-object

//do also colors?
//and freeze

//reverse