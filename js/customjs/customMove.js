'use strict';

var isFunny = true;

function customMainInit() {
	if(isFunny){
		customMoveBase();
		doOnMainInit.forEach(f => f());
		customMoveInit();
	}
}

function customMainEnterFrame() {
	if(isFunny){
		onFrameUpdate();
	}
}

function customOptionInit() {
	//todo: make check per chart/difficulty

	//funnies button
	const sprite = setSpriteList({funny: { heightPos: 13.5, y: 0, dw: 0, dh: 0 }});

	g_settings.funnys = [C_FLG_OFF, C_FLG_ON];
	g_settings.funnyNum = 0;

	g_lblNameObj.Funny = "Funnies"

	if (g_localStorage["funny"] !== undefined) {
		g_stateObj.funny = g_localStorage["funny"] ?? C_FLG_ON;
		g_settings.funnyNum = roundZero(g_settings.funnys.findIndex(funny => funny === g_stateObj.funny));
	} else {
		g_stateObj.funny = C_FLG_ON;
		g_settings.funnyNum = 1;
	}

	createGeneralSetting(sprite.funny, `funny`, {
		addRFunc: _ => {
			isFunny = g_stateObj.funny == C_FLG_ON;
			g_localStorage["funny"] = g_stateObj.funny;
		}
	});
}

function customResultInit() {
	//it currently doenst show on any of the copy buttons
	//  bc its too troublesome to do so :yum:
	document.getElementById("lblStyleData").innerHTML += isFunny ? ", Funny" : "";
}
