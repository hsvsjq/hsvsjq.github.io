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
		console.log("frame", events[currentEventsId].frame)

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
	if(aa.relativeElement){
		//todo: check cause of frznote afterhit and arrow weird positioning when starting midsong

		//place an observer to destroy the old arrowAnimationDiv when it loses all children
/* 	
		if(currentArrowAnimationsDivs[aa.key]){
			if(!currentArrowAnimationsDivs[aa.key].hasChildNodes()){
				currentArrowAnimationsDivs[aa.key].remove()
			}else{
				const hasChildrenObserver = new MutationObserver(
					(mutationList, observer) => {
						if(!mutationList[0].target.hasChildNodes()){
							mutationList[0].target.parentNode.removeChild(mutationList[0].target);
						}
					}
				)
				hasChildrenObserver.observe(currentArrowAnimationsDivs[aa.key], {childList: true});
			}
		}
		rtnDiv = document.createElement("div");
		aa.relativeElement.appendChild(rtnDiv);

		r = -degreesToRadians(aa.rotation);

		rtnDiv.style.transform = `rotate(${aa.rotation}deg)`;
		rtnDiv.style.left = "0px";
		rtnDiv.style.top = "0px";
		rtnDiv.style.position = "absolute" 

		upScrollDiv = document.createElement("div");
		rtnDiv.appendChild(upScrollDiv);
		upScrollDiv.style.left = "0px";
		upScrollDiv.style.top = "0px"; //todo offset the y position to make the absolute end position of the arrow 0px of the rtnDiv
		upScrollDiv.style.position = "absolute"
		
		downScrollDiv = document.createElement("div");
		rtnDiv.appendChild(downScrollDiv);
		downScrollDiv.style.left = "0px";
		downScrollDiv.style.top = "0px"; //todo offset the y position to make the absolute end position of the arrow 0px of the rtnDiv
		downScrollDiv.style.position = "absolute"

		currentArrowAnimationsDivs[aa.key] = { up: upScrollDiv, down: downScrollDiv };
 */
		//because of main line 10715
		//  the position of the stepRootN is important so 
		//  use another div for the position of the event objects?
		//    maybe this isnt good?? ↑
		//    use a singleton div for all events
		//    only for steproots??

		//var baseY = C_STEP_Y + g_posObj.reverseStepY * g_workObj.scrollDir[aa.key];

		

		//main line 10619
		//  delete frz logic

		/* 
		//remove 'px' and convert to float
		//invert signal to offset the original position (effectively making the coordinates equal to the ArrowSprite's)
		x = -parseFloat(aa.relativeElement.style.left.slice(0, -2));
		y = -parseFloat(aa.relativeElement.style.top.slice(0, -2));
		//rotate the coordinates
		xx = (x * Math.cos(r) + y * Math.sin(r));
		yy = (-x * Math.sin(r) + y * Math.cos(r));

		console.log(aa.key, x, y, xx, yy)

 		newDiv.style.left = `${xx}px`;
		newDiv.style.top = `${yy}px`;
		newDiv.style.position = "absolute" 
		currentArrowAnimationsDivs[aa.key] = newDiv;
		 */
	}else{
		stepRootDivs[aa.key].root.appendChild(stepRootDivs[aa.key].arrowContainer);
		destroyWhenChildless(stepRootDivs[aa.key].arrowContainer);

		arrowDiv = createArrowContainerDiv(aa.key);
		stepRootDivs[aa.key].arrowContainer = arrowDiv;
		stepRootDivs[aa.key].rtn.appendChild(arrowDiv);
		stepRootDivs[aa.key].rtn.style.transform = `rotate(${aa.rotation}deg)`;
	}

	//console.log(aa)

	currentArrowAnimations[aa.key] = aa;
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
	
	currentArrowAnimationsId = 0;
	currentArrowAnimations = [];
	currentArrowAnimationsDivs = [];
	currentEventsId = 0;
	currentEvents.clear()

	//maybe theres an easier way to find the arrival frame
	arrivalFrame = g_workObj.arrivalFrame.find(x => x);


	//observe arrow creation
	document.querySelectorAll('[id^=arrowSprite]').forEach(x => {
		const arrowCreationObserver = new MutationObserver(
			(mutationList, observer) => {
				for(const mutation of mutationList){
					mutation.addedNodes.forEach((node, key, parent) => {
						d = arrivalFrame * 50 / 3;
						k = parseInt(node.id.match(/^(arrow|frz)([0-9]+)_.*/)[2]);
						
						//rotate arrow/frzArrow components
						node.childNodes.forEach(x => {
							if(x.id.substring(0, 6) != "frzBar"){
								r = isNaN(g_workObj.arrowRtn[k]) ? 0 : g_workObj.arrowRtn[k];
								x.style.transform = x.style.transform.replace(/rotate\((-)?[0-9]+(deg)?\)/, `rotate(${r - currentArrowAnimations[k].rotation}deg)`);
							}
						});

						//the same offset to y bv top left
						node.style.setProperty("left", "0px", "important");
						stepRootDivs[k].arrowContainer.appendChild(node);
						//todo: fix this ↓ and check if its still necessary
						//currentArrowAnimations[k].relativeElement.appendChild(node); 
						//currentArrowAnimationsDivs[k].appendChild(node); 

						//todo: test animations

						//if(currentArrowAnimations[k].style){ node.style = currentArrowAnimations[k].style; }
						//placing styles this way to allow the use of 'important' priority
						if(currentArrowAnimations[k].style){
							currentArrowAnimations[k].style.forEach(a => node.style.setProperty(a.name, a.value, a.priority ?? ""))
						}

						if(d && currentArrowAnimations[k].animation){ 
							node.animate(currentArrowAnimations[k].animation, { duration: d, easing: "linear"}) 
						}
					})
				} 
			}
		);

		arrowCreationObserver.observe(x, {childList: true});
	})

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