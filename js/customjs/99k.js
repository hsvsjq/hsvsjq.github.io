'use strict';

// --------------------------------------------
// CONSTANTS
// --------------------------------------------

const __key = '99'
const C_FLG_BOX_WIDTH = 'BoxWidth'
const C_FLG_A_BOX_WIDTH = 'A-BoxWidth'
const C_FLG_SCREEN_WIDTH = 'ScreenWidth'

// --------------------------------------------
// STATE
// --------------------------------------------

let scrollBox
let scrollBoxHalfWidth
let uiElement
let scrollBoxBoundingRect
let scrollBarWidthRatio
let playerGuidanceFunc

// --------------------------------------------
// FOLLOW CURSOR FUNCTIONS
// --------------------------------------------

function followCursorBox(e) {
  let x = e.clientX - scrollBoxBoundingRect.x
  const ratioX = Math.min(x / scrollBoxBoundingRect.width, 1);

  scrollBox.scrollLeft = scrollBox.scrollWidth * ratioX - scrollBoxHalfWidth
}

function followCursorABox(e) {
  const currentRatio = scrollBox.scrollLeft / scrollBox.scrollWidth

  let x = e.clientX - scrollBoxBoundingRect.x
  const ratioX = Math.max(Math.min(x / scrollBoxBoundingRect.width, 1), 0);


  if (currentRatio + scrollBarWidthRatio < ratioX) {
    const delta = ratioX - (currentRatio + scrollBarWidthRatio)
    if (delta <= 0) return
    scrollBox.scrollLeft += scrollBox.scrollWidth * delta
  } else if (ratioX < currentRatio) {
    const delta = currentRatio - ratioX
    if (delta <= 0) return
    scrollBox.scrollLeft -= scrollBox.scrollWidth * delta
  }
}

function followCursorScreen(e) {
  const ratioX = Math.min(e.clientX / document.documentElement.clientWidth, 1);

  scrollBox.scrollLeft = (scrollBox.scrollWidth - scrollBoxBoundingRect.width) * ratioX
}

// --------------------------------------------
// DANONI CALLBACKS
// --------------------------------------------

// center scroll on title enter
function customTitleInit() {
  if (!scrollBox) scrollBox = document.getElementById(`scrollBox`)
  if (!scrollBoxHalfWidth) scrollBoxHalfWidth = scrollBox.getBoundingClientRect().width / 2
  scrollBox.scrollLeft = scrollBox.scrollWidth / 2 - scrollBoxHalfWidth

  cleanUp()
}

// center scroll on settings enter
function customSettingsDisplayInit() {
  if (!scrollBox) scrollBox = document.getElementById(`scrollBox`)
  if (!scrollBoxHalfWidth) scrollBoxHalfWidth = scrollBox.getBoundingClientRect().width / 2
  scrollBox.scrollLeft = scrollBox.scrollWidth / 2 - scrollBoxHalfWidth
}

// on option enter
function customOptionInit() {
  if (g_keyObj.currentKey != __key) return

  // center scroll
  if (!scrollBox) scrollBox = document.getElementById(`scrollBox`)
  if (!scrollBoxHalfWidth) scrollBoxHalfWidth = scrollBox.getBoundingClientRect().width / 2
  scrollBox.scrollLeft = scrollBox.scrollWidth / 2 - scrollBoxHalfWidth

  // create follow cursor setting
  const sprite = setSpriteList({ followCursor: { heightPos: 13.5, y: 0, dw: 0, dh: 0 } });

  g_settings.followCursors = [C_FLG_OFF, C_FLG_BOX_WIDTH, C_FLG_A_BOX_WIDTH, C_FLG_SCREEN_WIDTH];

  g_lblNameObj.FollowCursor = "FollowCursor"

  g_stateObj.followCursor = g_localStorage["followCursor"] ?? C_FLG_OFF;
  g_settings.followCursorNum = roundZero(g_settings.followCursors.findIndex(followCursor => followCursor === g_stateObj.followCursor));

  createGeneralSetting(sprite.followCursor, `followCursor`, {
    addRFunc: _ => {
      g_localStorage["followCursor"] = g_stateObj.followCursor;
    }
  });
}

// on result enter
function customResultInit() {
  // center scroll
  if (!scrollBox) scrollBox = document.getElementById(`scrollBox`)
  if (!scrollBoxHalfWidth) scrollBoxHalfWidth = scrollBox.getBoundingClientRect().width / 2
  scrollBox.scrollLeft = scrollBox.scrollWidth / 2 - scrollBoxHalfWidth

  // clear state
  cleanUp()
}

// on main enter 
function customMainInit() {
  if (g_keyObj.currentKey == __key) {

    // populate state
    if (!scrollBox) scrollBox = document.getElementById(`scrollBox`)
    scrollBoxBoundingRect = scrollBox.getBoundingClientRect()
    scrollBarWidthRatio = scrollBoxBoundingRect.width / scrollBox.scrollWidth
    if (!scrollBoxHalfWidth) scrollBoxHalfWidth = scrollBoxBoundingRect.width / 2

    // move UI and onigiri (stepRoot98) to static element
    if (uiElement == null) {
      uiElement = document.createElement("div")
      uiElement.style = `position: absolute; width: ${scrollBoxBoundingRect.width}px; height: ${scrollBoxBoundingRect.height}px; top: 0px; left: 0px; user-select: none; pointer-events: none; overflow-x: hidden; overflow-y: hidden;`
      document.getElementById(`staticBox`).appendChild(uiElement)
    }

    const lblframe = document.getElementById(`lblframe`)
    const stepRootOnigiri = document.getElementById(`stepRoot98`)
    const frzHitOnigiri = document.getElementById(`frzHit98`)
    const infoSprite = document.getElementById(`infoSprite`)
    const judgeSprite = document.getElementById(`judgeSprite`)
    const arrowSprite = document.getElementById(`arrowSprite${g_stateObj.reverse == C_FLG_ON ? 0 : 1}`)

    let t = `${scrollBoxHalfWidth - 25}px`
    stepRootOnigiri.style.left = t
    frzHitOnigiri.style.left = t

    arrowSprite.style.left = `${-scrollBox.scrollWidth / 2 + scrollBoxHalfWidth}px`

    t = `${scrollBoxBoundingRect.width - 110}px`
    document.getElementById(`lblIi`).style.left = t
    document.getElementById(`lblShakin`).style.left = t
    document.getElementById(`lblMatari`).style.left = t
    document.getElementById(`lblShobon`).style.left = t
    document.getElementById(`lblUwan`).style.left = t
    document.getElementById(`lblMCombo`).style.left = t
    document.getElementById(`lblKita`).style.left = t
    document.getElementById(`lblIknai`).style.left = t
    document.getElementById(`lblFCombo`).style.left = t

    document.getElementById(`charaJ`).style.left = `${scrollBoxHalfWidth - 220}px`
    document.getElementById(`comboJ`).style.left = `${scrollBoxHalfWidth - 50}px`
    document.getElementById(`diffJ`).style.left = `${scrollBoxHalfWidth - 50}px`
    document.getElementById(`charaFJ`).style.left = `${scrollBoxHalfWidth - 120}px`
    document.getElementById(`comboFJ`).style.left = `${scrollBoxHalfWidth + 50}px`
    document.getElementById(`diffFJ`).style.left = `${scrollBoxHalfWidth + 50}px`
    document.getElementById(`finishView`).style.left = `${scrollBoxHalfWidth - 150}px`

    uiElement.appendChild(lblframe)
    uiElement.appendChild(stepRootOnigiri)
    uiElement.appendChild(frzHitOnigiri)
    uiElement.appendChild(infoSprite)
    uiElement.appendChild(judgeSprite)
    uiElement.appendChild(arrowSprite)

    // add cursor listeners
    if (g_stateObj.followCursor == C_FLG_BOX_WIDTH)
      document.documentElement.addEventListener('mousemove', followCursorBox);

    else if (g_stateObj.followCursor == C_FLG_SCREEN_WIDTH)
      document.documentElement.addEventListener('mousemove', followCursorScreen);

    else if (g_stateObj.followCursor == C_FLG_A_BOX_WIDTH)
      document.documentElement.addEventListener('mousemove', followCursorABox);

    // set main enter frame

    if (playerGuidanceData?.[g_stateObj.scoreId] != null) {
      playerGuidanceFunc = getPlayerGuidanceFunc(playerGuidanceData[g_stateObj.scoreId])
      g_customJsObj.mainEnterFrame.push(playerGuidanceFunc)
    }

  }
}

// clean state on preLoad (handles retry)
g_customJsObj.preloading.push(cleanUp)

// --------------------------------------------
// UTILS
// --------------------------------------------

// cleans setup created by main init
function cleanUp() {
  document.documentElement.removeEventListener('mousemove', followCursorScreen)
  document.documentElement.removeEventListener('mousemove', followCursorBox)
  document.documentElement.removeEventListener('mousemove', followCursorABox)
  scrollBox.style['scrollbar-color'] = 'auto'
  if (playerGuidanceFunc != null) {
    const i = g_customJsObj.mainEnterFrame.indexOf(playerGuidanceFunc);
    if (i > -1) g_customJsObj.mainEnterFrame.splice(i, 1);
    playerGuidanceFunc = null
  }

  if (uiElement) {
    uiElement.remove()
    uiElement = null
  }
}

// --------------------------------------------
// HELPERS
// --------------------------------------------

function getPlayerGuidanceFunc(data) {
  const activeAreaWidth = KDG_CHARA_ARR.length * 50
  const activeAreaPadding = 600
  const scrollWidth = scrollBox.scrollWidth - activeAreaPadding
  const colour = data.colour

  scrollBox.style['scrollbar-color'] = `${colour} #00000000`

  const leftIndicator = createDiv("leftIndicator", 0, 0, 100, scrollBox.clientHeight)
  leftIndicator.style.background = `linear-gradient(to right, ${colour}1C, ${colour}0C 35%, transparent 100%)`
  leftIndicator.style.opacity = 0
  leftIndicator.style.userSelect = 'none'
  leftIndicator.style.pointerEvents = 'none'

  const rightIndicator = createDiv("rightIndicator", scrollBox.clientWidth - 100, 0, 100, scrollBox.clientHeight)
  rightIndicator.style.background = `linear-gradient(to left, ${colour}1C, ${colour}0C 35%, transparent 100%)`
  rightIndicator.style.opacity = 0
  rightIndicator.style.userSelect = 'none'
  rightIndicator.style.pointerEvents = 'none'

  const activeIndicator = createDiv("activeIndicator", 0, scrollBox.clientHeight - 30, 0, 25)
  activeIndicator.style.background = `radial-gradient(circle, #00000000 0%, #00000000 75%, ${colour}80 100%)`
  activeIndicator.style.userSelect = 'none'
  activeIndicator.style.pointerEvents = 'none'
  activeIndicator.style.transitionProperty = 'left, width'
  activeIndicator.style.transitionDuration = '0.5s'
  activeIndicator.style.transitionTimingFunction = 'ease-in-out'

  uiElement.appendChild(leftIndicator)
  uiElement.appendChild(rightIndicator)
  uiElement.appendChild(activeIndicator)

  let activeAreaStart = null
  let activeAreaWidthMultiplied = null
  let currentTimingIndex = 0;

  return () => {
    const frame = g_scoreObj.frameNum
    while (data?.timings?.[currentTimingIndex]?.frame != null && data?.timings?.[currentTimingIndex]?.frame <= frame) {
      // change active
      const targetIdx = data.timings[currentTimingIndex].pos % KDG_LOOP_COUNT
      activeAreaStart = targetIdx * activeAreaWidth
      activeAreaWidthMultiplied = data.timings[currentTimingIndex].width * activeAreaWidth

      currentTimingIndex++
    }

    if (activeAreaStart == null) return

    // active area
    const leftP = activeAreaStart / scrollWidth;
    const widthP = activeAreaWidthMultiplied / scrollWidth;

    activeIndicator.style.left = `${leftP * 100}%`;
    activeIndicator.style.width = `${widthP * 100}%`;

    // direction indicators
    const viewStart = scrollBox.scrollLeft;
    const viewEnd = viewStart + scrollBox.clientWidth;
    const hiddenLeft = Math.max(0, viewStart - activeAreaStart);
    const hiddenRight = Math.max(0, activeAreaWidthMultiplied + activeAreaStart - viewEnd);

    const neededDist = scrollBox.clientWidth * 0.3

    leftIndicator.style.opacity = Math.min(1, hiddenLeft / neededDist);
    rightIndicator.style.opacity = Math.min(1, hiddenRight / neededDist);

  }
}

// --------------------------------------------
// KEY DEFINITION GENERATION
// --------------------------------------------

const KDG_LOOP_COUNT = 7
const KDG_CHARA_ARR = ['g', 'l', 'd', 'u', 'r', 'll', 'dd', 'uu', 'rr', 'i', 'lll', 'ddd', 'uuu', 'rrr']
const KDG_COLOR_ARR = [2, 0, 0, 0, 0, 1, 1, 1, 1, 2, 3, 3, 3, 3]
const KDG_CTRL_ARR = ['Tab/Shift', 'S', 'D', 'E/R', 'F', 'G', 'H', 'Y/U', 'J', 'Enter', 'Left', 'Down', 'Up', 'Right']
const KDG_RTN_ARR = ['giko', '0', '-90', '90', '180', '0', '-90', '90', '180', 'iyo', '0', '-90', '90', '180']
const KDG_SHUFFLE_ARR = [1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 5, 5, 5, 5]

const KDG_CHARA_APP = ['space']
const KDG_COLOR_APP = [2]
const KDG_CTRL_APP = ['Space']
const KDG_RTN_APP = ['onigiri']
const KDG_SHUFFLE_APP = [0]

function generateKeyDefinition() {
  const chara = Array.from({ length: KDG_LOOP_COUNT }, (_a, i) => i).flatMap(i => KDG_CHARA_ARR.map(e => `${i}${e}`)).concat(KDG_CHARA_APP).join(',')
  const color = Array.from({ length: KDG_LOOP_COUNT }, (_a, i) => i).flatMap(() => KDG_COLOR_ARR).concat(KDG_COLOR_APP).join(',')
  const ctrl = Array.from({ length: KDG_LOOP_COUNT }, (_a, i) => i).flatMap(() => KDG_CTRL_ARR).concat(KDG_CTRL_APP).join(',')
  const rtn = Array.from({ length: KDG_LOOP_COUNT }, (_a, i) => i).flatMap(() => KDG_RTN_ARR).concat(KDG_RTN_APP).join(',')
  const shuffle = Array.from({ length: KDG_LOOP_COUNT }, (_a, i) => i).flatMap(() => KDG_SHUFFLE_ARR).concat(KDG_SHUFFLE_APP).join(',')

  const count = KDG_LOOP_COUNT * KDG_CHARA_ARR.length

  return `
  |minWidth${__key}=${count * 50 + 600}| 
  |pos${__key}=0...${count}|
  |div${__key}=${count}|
  |chara${__key}=${chara}|
  |color${__key}=${color}|
  |keyCtrl${__key}=${ctrl}|
  |stepRtn${__key}=${rtn}|
  |shuffle${__key}=${shuffle}|
  `
}
