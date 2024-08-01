//memo
//https://github.com/cwtickle/danoniplus-docs/wiki/dos-e0005-motionData
//https://github.com/cwtickle/danoniplus-docs/wiki/dos-e0004-animationData
//https://github.com/cwtickle/danoniplus-docs/wiki/IdReferenceIndex
//https://www.w3schools.com/cssref/css_selectors.php
//https://www.w3schools.com/jsref/dom_obj_style.asp




//g_attrObj[`arrow0${arrowCnts[0]}`]  make past arrows not be affected by ArrowPathAnimationEvent event


class Transform{
	//Map(String name, [String] value)
	constructor(componentsMap){
		this.componentsMap = componentsMap;
	}

	setComponent(name, value){
		this.componentsMap[name] = value;
	}

	getComponent(name){
		return this.componentsMap[name];
	}

	getString(){
		return this.componentsMap.reduce((a, c) => {
			a + `${c.name}(${[...Array(c.value.length * 2).keys()].reduce(x, y => x + (y % 2 == 0 ? c.value[y / 2] : ","))});`
		})
	}
}

class Point{
	constructor (x, y){
		this.x = x;
		this.y = y;
	}
}

//---------------------------------------------------------------------------------

var stepRootDivs = [];
var stepRootPos = [];

var arrowAnimations = [];
var currentArrowAnimationsId = 0;
var currentArrowAnimations = [];
var currentArrowAnimationsDivs = [];

var currentStyles = [];

var events = [];
var currentEventsId = 0;
var currentEvents = new Map();

var arrivalFrame = null;
var scoreIdsWithMoviment = [];

//function to receive movimentData from chart specific js file
function setCustomMove(moveData){
	arrowAnimations = [];
	events = [];

	scoreIdsWithMoviment = moveData.map(x => x.scoreId);

	if(!scoreIdsWithMoviment.includes(g_stateObj.scoreId)) return;

	var data = undefined;
	data = moveData.filter(x => x.scoreId == g_stateObj.scoreId)[0].data;
	if(data == undefined) return;

	data.forEach(x => {
		//offset arrow animation frame by arrivalFrame 
		//  so the user can insert the time that the arrow will be hit, not the time its created
		if(x.arrowAnimations){
			arrowAnimations.push({frame: x.frame - arrivalFrame, data: x.arrowAnimations}); 
		}
		if(x.events){
			events.push({frame: x.frame, data: x.events});
		}
	})
}

//function called on customMainEnterFrame (customMove.js)
function onFrameUpdate(){
	//check for arrow animation change
	while(arrowAnimations[currentArrowAnimationsId] && g_scoreObj.baseFrame >= arrowAnimations[currentArrowAnimationsId].frame){
		arrowAnimations[currentArrowAnimationsId].data.forEach(aa => changeArrowAnimation(aa))
		currentArrowAnimationsId++;
	}

	//check for events
	while(events[currentEventsId] && g_scoreObj.baseFrame >= events[currentEventsId].frame){

		events[currentEventsId].data.forEach(event => {
			if(event.duration <= 0) { event.duration = 1 };
			var step = 1 / event.duration;
			var currFrame = 0;

			for (let [key, value] of Object.entries(event.style)) { 
				if(value.from == value.to) {
					event.elements.forEach(element => { 
						currentEvents.delete(element);
						element.style[key] = `${value.to}${value.suffix}` 
					});
					delete event.style[key];
				}
			}

			event.elements.forEach(element => {
				if(Object.keys(event.style).length != 0) { 				
					currentEvents.set(element, () => {
						if (currFrame >= event.duration) { currentEvents.delete(element); }
						for (let [key, value] of Object.entries(event.style)) {
							//element.style.setProperty(key, `${value.func(value.from, value.to, step * currFrame)}${value.suffix}`, "important");
							element.style[key] = `${value.func(value.from, value.to, step * currFrame)}${value.suffix}`
						}
						currFrame++;
					});		
				}
			})
		})
		currentEventsId++;
	}

	//update current events' frames
	currentEvents.forEach((value, key) => {value();})
}

function changeArrowAnimation(aa){	

	aa.keys.forEach(k => {
		stepRootDivs[k].root.appendChild(stepRootDivs[k].arrowContainer);
		destroyWhenChildless(stepRootDivs[k].arrowContainer);
	
		arrowDiv = createArrowContainerDiv(k);
		stepRootDivs[k].arrowContainer = arrowDiv;
		stepRootDivs[k].rtn.appendChild(arrowDiv);
		stepRootDivs[k].rtn.style.transform = `rotate(${aa.rotation}deg)`;
	
		if(aa.style){
			currentStyles[k].textContent = `[id^="arrow${k}_"] ${aa.style}`;
		}
	
		currentArrowAnimations[k] = aa;
	})

}

function createArrowContainerDiv(key){
	arrowDiv = document.createElement("div");
	arrowDiv.id = `arrowContainer${key}`;

	arrowDiv.style.top = `-${C_STEP_Y + g_posObj.reverseStepY * g_workObj.dividePos[key]}px`;
	arrowDiv.style.width = "50px";
	arrowDiv.style.height = "50px";
	arrowDiv.style.position = "absolute";
	return arrowDiv;
}

function destroyWhenChildless(element){
	if(!element.hasChildNodes()){
		element.remove()
	}else{
		const hasChildrenObserver = new MutationObserver(
			(mutationList, observer) => {
				if(!mutationList[0].target.hasChildNodes()){
					mutationList[0].target.parentNode.removeChild(mutationList[0].target);
				}
			}
		)
		hasChildrenObserver.observe(element, {childList: true});
	}
}

function createArrowObserver(){

	//maybe theres an easier way to find the arrival frame
	arrivalFrame = g_workObj.mkArrow.find(f => f != null)[0].arrivalFrame

	//observe arrow creation
	document.querySelectorAll('[id^=arrowSprite]').forEach(x => {
		const arrowCreationObserver = new MutationObserver(
			(mutationList, observer) => {
				for(const mutation of mutationList){
					mutation.addedNodes.forEach((node, key, parent) => {
						d = arrivalFrame * 50 / 3;
						k = parseInt(node.id.match(/^(arrow|frz)([0-9]+)_.*/)[2]);
						
						//rotate arrow/frzArrow components
						if(currentArrowAnimations[k].rotation != 0){
							node.childNodes.forEach(x => {
								if(x.id.substring(0, 6) != "frzBar"){
									r = isNaN(g_workObj.arrowRtn[k]) ? 0 : g_workObj.arrowRtn[k];
									x.style.transform = x.style.transform.replace(/rotate\((-)?[0-9]+(deg)?\)/, `rotate(${r - currentArrowAnimations[k].rotation}deg)`);
								}
							});
						}	

						//the same offset to y bv top left
						node.style.setProperty("left", "0px", "important");
						stepRootDivs[k].arrowContainer.appendChild(node);


						if(d && currentArrowAnimations[k].animation){ 
							node.animate(currentArrowAnimations[k].animation, d) 
						}
						
					})
				} 
			}
		);

		arrowCreationObserver.observe(x, {childList: true});
	})
}

function customMoveBase(){
	stepRootDivs = [];

	//createStepRootMovimentDivs
	keyCount = g_workObj.keyCtrl.length;
	stepRoots = [...Array(keyCount).keys()].map(i => document.getElementById(`stepRoot${i}`));
	stepRootPos = stepRoots.map(x => new Point(parseFloat(x.style.left.slice(0, -2)), parseFloat(x.style.top.slice(0, -2))))
	mainSprite = document.getElementById("mainSprite");

	[...Array(keyCount).keys()].forEach(k => {
		posDiv = document.createElement("div");
		posDiv.id = `posDiv${k}`;
		posDiv.style.left = "0px";
		posDiv.style.top = "0px";
		posDiv.style.position = "absolute";

		mainSprite.appendChild(posDiv);
		posDiv.appendChild(stepRoots[k]);
		
		rtnDiv = document.createElement("div");
		rtnDiv.id = `rtnDiv${k}`;
		rtnDiv.style.width = "50px";
		rtnDiv.style.height = "50px";
		rtnDiv.style.position = "absolute";
		stepRoots[k].appendChild(rtnDiv);

		arrowDiv = createArrowContainerDiv(k);
		rtnDiv.appendChild(arrowDiv);

		stepRootDivs[k] = { pos: posDiv, root: stepRoots[k], rtn: rtnDiv, arrowContainer: arrowDiv };
	})
}


//[void function(void)]
//array of functions that will be executed on MainInit (customMove.js)
var doOnMainInit = [];

function customMoveInit(){

	//reset current event and arrow animation index
	if(!scoreIdsWithMoviment.includes(g_stateObj.scoreId)) return;
	
	keyCount = g_workObj.keyCtrl.length;
	currentArrowAnimationsId = 0;
	currentArrowAnimations = [...Array(keyCount).keys()].map(x => { return { keys: [x], rotation: 0} });
	currentArrowAnimationsDivs = [];
	currentEventsId = 0;
	currentEvents.clear()
	currentStyles = [...Array(keyCount).keys()].map(() => document.createElement("style"));
	[...Array(keyCount).keys()].forEach(k => stepRootDivs[k].pos.appendChild(currentStyles[k]))

	createArrowObserver();

	//put frzHitN inside stepRootN to make them move together
	document.querySelectorAll('[id^=frzHit]').forEach(x => {
		n = x.id.slice(6)
		if (!isNaN(n)) { 
			document.getElementById(`stepRoot${n}`).appendChild(x)
			x.style.left = "0px";
			x.style.top = "0px";
			x.style.position = "absolute";
		}
	})

}

/* 
//prevent arrow default moviment and fix stepHit to the center of the stepRoot
var styleSheet = document.createElement("style")
styleSheet.textContent = `[id^="arrow"] { top: 0px !important; left: 0px !important; } [id^="stepHit"] { top: -15px !important; left: -15px !important; }`
document.head.appendChild(styleSheet)
 */




//moviment-------------------------------

function fromTo(s, e, variable){
	return (e - s) * variable + s;
}

function parabola(s, e, variable){
	return (e - s) * (-4 * variable * variable + 4 * variable) + s;
}

function bounce(s, e, variable){
	return 2 * (e - s) * (variable % 0.5) + s;
}


//coordinates util-------------------------------

//from https://stackoverflow.com/questions/7198144/how-to-draw-a-n-sided-regular-polygon-in-cartesian-coordinates
function regularPolygonVertices(num, rotation){
	return Array.from({length: num}, (_, i) => {return new Point (Math.cos(2 * Math.PI * i / num + rotation).toFixed(3), Math.sin(2 * Math.PI * i / num + rotation).toFixed(3), 1, 0)})
}


function pointOnLineFromDistance(centerPoint, otherPoint, distance, rightSidePoint){
	var resultX, resultY;

	if(centerPoint.x == otherPoint.x){
		resultX = centerPoint.x;
		resultY = centerPoint.y + (rightSidePoint ? 1 : -1) * distance;
		
	}else{
		var m = (centerPoint.y - otherPoint.y) / (centerPoint.x - otherPoint.x);
		var c = centerPoint.y - centerPoint.x * m;
		resultX = (rightSidePoint ? 1 : -1) * Math.sqrt(distance * distance / (1 + m * m)) + centerPoint.x;
		resultY = resultX * m + c;
	}

	return new Point(resultX, resultY, 1, 0);
}

function pointsDistance(point1, point2){
	var dy = point1.y - point2.y;
	var dx = point1.x - point2.x;
	return Math.sqrt(dy * dy + dx * dx)
}

function pointsRadians(point1, point2){
	return Math.atan2(point2.y - point1.y, point2.x - point1.x);
}

function degreesToRadians(deg){
	return deg * Math.PI / 180;
}

function absolutePositionToStepRoot(c, key, dimension){
	return c - stepRootPos[key][dimension];
}


//https://www.desmos.com/calculator/gglzoo9row?lang=pt-BR
//https://www.desmos.com/calculator/64yy5qi5op?lang=pt-BR
