let currentTime = Date.now()
let gameData = {tab: "De Noido", lastTab: "DeNoido", lastMetaTab: "Rage", treePoints: new Decimal(0), wastedTreePoints: new Decimal(0), totalTreePoints: new Decimal(0), lastTreeTab: "Tree of Skill", achNotifShow: false, achNotifTimer: new Decimal(5), fileNotifShow: false, fileNotifTimer: new Decimal(1), metaTab: "Main", firstTime: false, prestiges: new Decimal(0), rage: new Decimal(0), despair: new Decimal(0), maxPoints: new Decimal(0), gameState: "stop", points: new Decimal(0), maxPoints: new Decimal(0), timeSurvival: new Decimal(0), autosave: new Decimal(60), timer: new Decimal(10), deNoidoPoints: new Decimal(1), deNoidoPower: new Decimal(1), currentSave: "", upgrades: [], metaUpgrades: [], permUpgrades: [], buyables: [], metaBuyables: [], permBuyables: [], achievements: []}
let upgrades = {
	"0_0": {
		title: "Slightly Irritating Boost",
		description: "Boosts your point gain by points",
		cost: new Decimal(11),
		pointName: "points",
		pointStuff: "points",
		effect(){return gameData.points.add(1).log(10).add(1)},
		effectDisplay(){return "x"+numberFormat(this.effect(), 2)},
		displayUpgrade(){return true}
	},
	"0_1": {
		title: "Peppino's Blessing",
		description: "Boosts point and rage gain by 1.2x",
		cost: new Decimal(110),
		pointName: "points",
		pointStuff: "points",
		effect(){return 0},
		displayUpgrade(){return hasUpgrade("0_0")}
	},
	"0_2": {
		title: "hi",
		description: "THis is tmt mod",
		cost: new Decimal(11063),
		pointName: "points",
		pointStuff: "points",
		effect(){return gameData.points.add(1).log(10).add(1)},
		effectDisplay(){return "x"+numberFormat(this.effect(), 2)},
		effect(){return 0},
		displayUpgrade(){return hasUpgrade("0_1")}
	},
	"0_3": {
		title: "hi",
		description: "THis is tmt mod",
		cost: new Decimal(1106311),
		pointName: "points",
		pointStuff: "points",
		effect(){return gameData.points.add(1).log(10).add(1)},
		effectDisplay(){return "x"+numberFormat(this.effect(), 2)},
		effect(){return 0},
		displayUpgrade(){return hasUpgrade("0_2")}
	},
	"0_4": {
		title: "hi",
		description: "THis is tmt mod",
		cost: new Decimal(1106311063),
		pointName: "points",
		pointStuff: "points",
		effect(){return gameData.points.add(1).log(10).add(1)},
		effectDisplay(){return "x"+numberFormat(this.effect(), 2)},
		effect(){return 0},
		displayUpgrade(){return hasUpgrade("0_3")}
	},
	"R0_0": {
		title: "Panic Attack",
		description: "Boosts your point gain based on how close you are to De Noido De Noido's speed.",
		cost: new Decimal(1),
		pointName: "rages",
		pointStuff: "rage",
		effect(){return gameData.deNoidoPoints.add(gameData.points).div(gameData.points.max(1)).mul(gameData.deNoidoPower)},
		effectDisplay(){return "x"+numberFormat(this.effect(), 2)},
		displayUpgrade(){return true}
	},
	"R0_1": {
		title: "Brick",
		description: "Decreases De Noido's speed by 2",
		cost: new Decimal(3),
		pointName: "rages",
		pointStuff: "rage",
		effect(){return gameData.deNoidoPoints.add(gameData.points).div(gameData.points.max(1)).mul(gameData.deNoidoPower)},
		displayUpgrade(){return hasUpgrade("R0_0")}
	},
	"R0_2": {
		title: "Tremendous Erratic Terrifyingly Random Additional Tomfoolery of Irrational Obligated Numeration",
		description: "Quadruples your point gain, but only when you reach 176 points or above",
		cost: new Decimal(6),
		pointName: "rages",
		pointStuff: "rage",
		effect(){return new Decimal(gameData.points.gte(176)?4:1)},
		displayUpgrade(){return hasUpgrade("R0_1")}
	},
	"R0_3": {
		title: "Full Power",
		description: "Unlocks other Meta tabs.",
		cost: new Decimal(10),
		pointName: "rages",
		pointStuff: "rage",
		displayUpgrade(){return hasUpgrade("R0_2")}
	},
	"T0_0": {
		title: "WIP",
		description: "Come back a bit later...",
		cost: new Decimal(9999999999999999999999999999999999999999999999),
		pointName: "tree points",
		pointStuff: "treePoints",
		displayUpgrade(){return true}
	},
}
let stressTest = []

let buyables = {
	"Prestige": {
		title: "X-iry's Annoyance",
		description: "You gain 4 more points after everything and you gain +x0.1 more rages and despairs each",
		canBuy(){return gameData.rage.gte(this.requirements()[0]) && gameData.despair.gte(this.requirements()[1])},
		requirements(){return [Decimal.pow(3, gameData.metaBuyables["Prestige"]==undefined?0:gameData.metaBuyables["Prestige"]).mul(50),Decimal.mul(100, gameData.metaBuyables["Prestige"]==undefined?1:gameData.metaBuyables["Prestige"].add(1))]},
		requirementDescription(){return numberFormat(this.requirements()[0],2)+" rages and "+numberFormat(this.requirements()[1],2)+" despairs"},
		effect(){return [Decimal.mul(4, gameData.metaBuyables["Prestige"]),Decimal.mul(0.1, gameData.metaBuyables["Prestige"]).add(1)]},
		effectDisplay(){return "+"+numberFormat(this.effect()[0], 2)+"/sec, x"+numberFormat(this.effect()[1], 2)},
		displayBuyable(){return true}
	},
	"R0_0": {
		title: "Desperation",
		description: "Increases your despair gain by 0.01 each",
		cost(){return Decimal.pow(1.4, gameData.metaBuyables["R0_0"]==undefined?0:gameData.metaBuyables["R0_0"]).mul(5)},
		canBuy(){return gameData[this.pointStuff].gte(this.cost())},
		pointName: "rages",
		pointStuff: "rage",
		effect(){return Decimal.mul(0.01, gameData.metaBuyables["R0_0"]==undefined?0:gameData.metaBuyables["R0_0"])},
		effectDisplay(){return "+"+numberFormat(this.effect(), 2)},
		displayBuyable(){return hasUpgrade("R0_3")}
	},
	"D0_0": {
		title: "Ragebait",
		description: "Multiplies your rage gain by roughly x1.31 each",
		cost(){return Decimal.mul(10, gameData.metaBuyables["D0_0"]==undefined?1:gameData.metaBuyables["D0_0"].add(1))},
		canBuy(){return gameData[this.pointStuff].gte(this.cost())},
		pointName: "despairs",
		pointStuff: "despair",
		effect(){return Decimal.pow(new Decimal(10).root(2).div(10).add(1), gameData.metaBuyables["D0_0"]==undefined?0:gameData.metaBuyables["D0_0"])},
		effectDisplay(){return "x"+numberFormat(this.effect(), 2)},
		displayBuyable(){return true}
	}
}
	
let achievements = {
	11: {
		description: "Man.",
		tooltip: "Lose for the first time<br>Reward: Unlocks Meta tab",
		thumbnail: "images/tooslow",
		requirement(){return gameData.firstTime},
	},
	12: {
		description: "THE WRATH AWAITS",
		tooltip: "Purchase your first Meta Upgrade",
		thumbnail: "images/aurafarming",
		requirement(){return hasUpgrade("R0_0")},
	},
	13: {
		description: "The Show Is<p style='height:16px'></p>Just Starting!",
		descriptionPopUp: "The Show Is Just Starting!",
		tooltip: "Unlock the rest of Meta.",
		thumbnail: "images/jokewritesitself",
		requirement(){return hasUpgrade("R0_3")},
	},
	14: {
		description: "i hate this stupid goblin",
		tooltip: "Rejoice.<br>Reward: Keep DoMaIn subtab and unlocks Tree tab",
		thumbnail: "images/noise",
		requirement(){return gameData.metaBuyables["Prestige"] !== undefined},
	},
}

function getGameData(){
	return {tab: "De Noido", lastTab: "DeNoido", lastMetaTab: "Rage", treePoints: new Decimal(0), wastedTreePoints: new Decimal(0), totalTreePoints: new Decimal(0), lastTreeTab: "Tree of Skill", achNotifShow: false, achNotifTimer: new Decimal(5), fileNotifShow: false, fileNotifTimer: new Decimal(1), metaTab: "Main", firstTime: false, prestiges: new Decimal(0), rage: new Decimal(0), despair: new Decimal(0), maxPoints: new Decimal(0), gameState: "stop", points: new Decimal(0), maxPoints: new Decimal(0), timeSurvival: new Decimal(0), autosave: new Decimal(60), timer: new Decimal(10), deNoidoPoints: new Decimal(1), deNoidoPower: new Decimal(1), currentSave: "", upgrades: [], metaUpgrades: [], permUpgrades: [], buyables: [], metaBuyables: [], permBuyables: [], achievements: []}
}

function deusExMachina(){
	if(!localStorage.currentSave){
		gameData.currentSave = "Default"
		localStorage.setItem("currentSave", "Default")
		localStorage.setItem("Default", btoa(JSON.stringify(getGameData())))
	}
	else {
		gameData = Object.fromEntries(Object.entries(JSON.parse(atob(localStorage.getItem(localStorage.currentSave)))).sort())
		let sortedGameData = Object.fromEntries(Object.entries(JSON.parse(atob(btoa(JSON.stringify(getGameData()))))).sort())  
		for(let i=0;i<Object.getOwnPropertyNames(sortedGameData).length;i++){
			if(gameData[Object.getOwnPropertyNames(sortedGameData)[i]]==undefined) gameData[Object.getOwnPropertyNames(sortedGameData)[i]] = sortedGameData[Object.getOwnPropertyNames(sortedGameData)[i]]
			if(typeof gameData[Object.getOwnPropertyNames(gameData)[i]] == "number") gameData[Object.getOwnPropertyNames(gameData)[i]] = new Decimal(gameData[Object.getOwnPropertyNames(gameData)[i]])
			if(isNumeric(gameData[Object.getOwnPropertyNames(gameData)[i]])) gameData[Object.getOwnPropertyNames(gameData)[i]] = new Decimal(gameData[Object.getOwnPropertyNames(gameData)[i]])
		}
		currentSave = localStorage.currentSave
	}
	nowDoItAgain()
}

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function prestige(){
	if(buyables["Prestige"].canBuy()){
		if(gameData.metaBuyables["Prestige"] == undefined){
			gameData.metaBuyables["Prestige"] = new Decimal(1)
			firstTimeCheck = true
		}
		let keepThis = gameData.metaBuyables["Prestige"]
		gameData.rage = new Decimal(0)
		gameData.despair = new Decimal(0)
		document.getElementById("mainTheme").pause()
		document.getElementById("mainTheme").currentTime = 0 
		document.getElementById("noiseScream").pause()
		document.getElementById("noiseScream").currentTime = 0 
		document.getElementById("evilChase").pause()
		document.getElementById("evilChase").currentTime = 0 
		document.getElementById("evilChase").volume = 1
		gameData.timeSurvival = new Decimal(0)
		gameData.maxPoints = new Decimal(0)
		gameData.timer = new Decimal(10)
		gameData.points = new Decimal(0)
		gameData.treePoints = gameData.treePoints.add(1)
		gameData.upgrades = []
		gameData.metaUpgrades = []
		gameData.buyables = []
		gameData.metaBuyables = []
		gameData.deNoidoPoints = new Decimal(1)
		gameData.deNoidoPower = new Decimal(1.1)
		gameData.gameState = "stop"
		gameData.metaBuyables["Prestige"] = keepThis.add(firstTimeCheck?0:1)
	}
	nowDoItAgain()
}

function buyableDisplay(){
	stuff = `<br><br><br><br><br><br><br>${hasAchievement(14)?"<br>":""}<tr>`
	if(gameData.tab=="Rage"){
		stuff = "<br><tr>"
		for(let i=0;i<1;i++){
			for(let v=0;v<1;v++){
				id = "R"+i+"_"+v
				stuff = !buyables[id].displayBuyable()?stuff:stuff+`<td><button onclick='buyBuyable(${JSON.stringify(id)}); nowDoItAgain(); ' class='buyable' style='background-color: ${buyables[id].canBuy()?"lightgreen":"gray"}'><span style='font-size:32px;'>${buyables[id].title}</span><br><span style='font-size:16px;'>${buyables[id].description}<br><br>${buyables[id].effectDisplay!==undefined?`Effects: ${buyables[id].effectDisplay()}<br>`:""}Amount: ${numberFormat(gameData.buyables[id]?gameData.buyables[id]:0, 0)}<br>Cost: ${numberFormat(buyables[id].cost(),2)} ${buyables[id].pointName}</span></button></td>`
			}
		}
	}
	if(gameData.tab=="Domain"){
		stuff = `<br><br><br><br><br><br><br>${hasAchievement(14)?"<br>":""}<tr><td>
		<div id="leftBar"></div>
		<div id="leftHandle" ></div>
		<button id="prestige" onclick='prestige(); nowDoItAgain();' class='buyable'><span style='font-size:32px;'>${buyables["Prestige"].title}</span><br><span style='font-size:16px;'>${buyables["Prestige"].description}<br><br>${buyables["Prestige"].effectDisplay!==undefined?`Effects: ${buyables["Prestige"].effectDisplay()}<br>`:""}Level of Annoyance: ${numberFormat(gameData.metaBuyables["Prestige"]?gameData.metaBuyables["Prestige"]:0,0)}<br>Requirements: ${buyables["Prestige"].requirementDescription()}</span></button>
		<div id="rightBar"></div>
		<div id="rightHandle"></div></td>`
	}
	if(gameData.tab=="Despair"){
		for(let i=0;i<1;i++){
			for(let v=0;v<1;v++){
				id = "D"+i+"_"+v
				stuff = !buyables[id].displayBuyable()?stuff:stuff+`<td><button onclick='buyBuyable(${JSON.stringify(id)}); nowDoItAgain(); ' class='buyable' style='background-color: ${buyables[id].canBuy()?"lightgreen":"gray"}'><span style='font-size:32px;'>${buyables[id].title}</span><br><span style='font-size:16px;'>${buyables[id].description}<br><br>${buyables[id].effectDisplay!==undefined?`Effects: ${buyables[id].effectDisplay()}<br>`:""}Amount: ${numberFormat(gameData.metaBuyables[id]?gameData.metaBuyables[id]:0, 0)}<br>Cost: ${numberFormat(buyables[id].cost(),2)} ${buyables[id].pointName}</span></button></td>`
			}
		}
	}
	return stuff+"</tr>"
}

function upgradeDisplay(){
	stuff = `<br><br><br><br>${hasAchievement(14)?"<br>":""}`+(gameData.firstTime?"<br><br><br><tr>":"<tr>")
	let id = 9
	if(gameData.tab=="Upgrade Section"){
		for(let i=0;i<1;i++){
			for(let v=0;v<4;v++){
				id = i+"_"+v
				stuff = !upgrades[id].displayUpgrade()?stuff:stuff+`<td><button onclick='buyUpgrade(${JSON.stringify(id)}); nowDoItAgain(); ' class='upgrade' style='background-color: ${Object.values(gameData.upgrades).includes(i+"_"+v)?"lightgreen":"gray"}'><span style='font-size:24px;'>${upgrades[id].title}</span><br><span>${upgrades[id].description}<br><br>${upgrades[id].effectDisplay!==undefined?`Effects: <span id="upg${i+"_"+v}"></span><br>`:""}Cost: ${numberFormat(upgrades[id].cost,2)} ${upgrades[id].pointName}</span></button></td>`
			}
		}
	}
	if(gameData.tab=="Rage"){
		for(let i=0;i<1;i++){
			for(let v=0;v<4;v++){
				id = "R"+i+"_"+v
				stuff = !upgrades[id].displayUpgrade()?stuff:stuff+`<td><button onclick='buyUpgrade(${JSON.stringify(id)}); nowDoItAgain();' class='upgrade' style='background-color: ${Object.values(gameData.metaUpgrades).includes("R"+i+"_"+v)?"lightgreen;":"gray;"} ${id=="R0_2"?`max-height: 300px;`:``}'>${id=="R0_2"?`<p style='font-size: 24px; transform: scale(1,0.5) translateY(-200px);'>${upgrades[id].title}</p>`:`<span style='font-size:24px;'>${upgrades[id].title}</span>`}<br>${id=="R0_2"?`<p style='transform: translateY(-225px);'>${upgrades[id].description}</p>`:`<span>${upgrades[id].description}`}<br><br>${upgrades[id].effectDisplay!==undefined?`Effects: <span id="upg${"R"+i+"_"+v}"></span><br>`:""} ${id=="R0_2"?`<p style='transform: translateY(-270px);'>Cost: ${numberFormat(upgrades[id].cost,2)} ${upgrades[id].pointName}</p>`:`Cost: ${numberFormat(upgrades[id].cost,2)} ${upgrades[id].pointName}`}</span></button></td>`
			}
		}
	}
	if(gameData.tab=="Tree of Skill"){
		for(let i=0;i<1;i++){
			for(let v=0;v<1;v++){
				id = "T"+i+"_"+v
				stuff = !upgrades[id].displayUpgrade()?stuff:stuff+`<td><button onclick='buyUpgrade(${JSON.stringify(id)}); nowDoItAgain();' class='upgrade' style='background-color: ${Object.values(gameData.metaUpgrades).includes("R"+i+"_"+v)?"lightgreen;":"gray;"} ${id=="R0_2"?`max-height: 300px;`:``}'>${id=="R0_2"?`<p style='font-size: 24px; transform: scale(1,0.5) translateY(-200px);'>${upgrades[id].title}</p>`:`<span style='font-size:24px;'>${upgrades[id].title}</span>`}<br>${id=="R0_2"?`<p style='transform: translateY(-225px);'>${upgrades[id].description}</p>`:`<span>${upgrades[id].description}`}<br><br>${upgrades[id].effectDisplay!==undefined?`Effects: <span id="upg${"R"+i+"_"+v}"></span><br>`:""} ${id=="R0_2"?`<p style='transform: translateY(-270px);'>Cost: ${numberFormat(upgrades[id].cost,2)} ${upgrades[id].pointName}</p>`:`Cost: ${numberFormat(upgrades[id].cost,2)} ${upgrades[id].pointName}`}</span></button></td>`
			}
		}
	}
	return (gameData.tab=="Rage"||gameData.tab=="Tree of Skill"||gameData.tab=="Upgrade Section")?stuff+"</tr>":""
}

function achievementDisplay(){
	stuff = "<br><br><br><br>"+(gameData.firstTime?"<br><br><br><tr>":"<tr>")
	for(let i=0;i<1;i++){ 
		for(let v=0;v<4;v++){
			stuff = stuff+`<td class="achievement" style="background-image: ${hasAchievement((i+1)*10+v+1)?"linear-gradient(rgba(144, 238, 144, 0.5), rgba(144, 238, 144, 0.5)),":""} url(${achievements[(i+1)*10+v+1].thumbnail}.png); ${hasAchievement((i+1)*10+v+1)?"":"filter: grayscale(99%) saturate(99900) grayscale(100%);"} background-size: 100px 100px;"><span style="overflow-wrap: break-word; inline-size: 100px; position: absolute; font-family: Impact; color: white; text-shadow: 0px 0px 2px black, 0px 0px 2px black, 0px 0px 2px black, 0px 0px 2px black, 0px 0px 2px black, 0px 0px 2px black, 0px 0px 2px black, 0px 0px 2px black; margin-top: -42px; transform: translateX(-50%);">${hasAchievement((i+1)*10+v+1)?achievements[(i+1)*10+v+1].description:"???"}<span class="tooltiptext">${achievements[(i+1)*10+v+1].tooltip}</span></span></td>`
		}
		stuff = stuff+"</tr><tr>"
	}
	return gameData.tab=="Achievements"?stuff+"</tr>":""
}

function tabDisplay(){
	return gameData.tab=="Update Notes" || gameData.tab=="Credits"?
		`<button onclick="tabSwitch('Credits'); nowDoItAgain()" id="tab">Credits</button>
		<button onclick="tabSwitch('Update Notes'); nowDoItAgain()" id="tab">Update Notes</button>`:
		(gameData.firstTime?`
		<button onclick="metaTabSwitch('Main'); nowDoItAgain()" id="mainTab">Main</button>&emsp;
		<button onclick="metaTabSwitch('Meta'); nowDoItAgain()" id="metaTab">Meta</button>`+
		(hasAchievement(14)?`&emsp;<button onclick="metaTabSwitch('Tree'); tabSwitch('Tree of Skill'); nowDoItAgain()" id="treeTab">Tree</button><br><br>`:`<br><br>`):``)+(gameData.metaTab=="Main"?`
		<button onclick="tabSwitch('De Noido'); nowDoItAgain()" id="tab" style="background-color:Gold;"><span style="color: yellow;">de noido</span></button>&emsp;
		<button onclick="tabSwitch('Upgrade Section'); nowDoItAgain()" id="tab">Upgrade Section</button>&emsp;
		<button onclick="tabSwitch('Achievements'); nowDoItAgain()" id="tab">Achievements</button>`:gameData.metaTab=="Meta"?(`
		<button onclick="tabSwitch('Rage'); nowDoItAgain()" style="color: white; text-shadow: 0px 0px 5px black, 0px 0px 5px black, 0px 0px 5px black, 0px 0px 5px black; background: radial-gradient(magenta, crimson 20%, darkred 70%); background-position: 0% 50%; background-size: 200% 1666%;" id="tab">RAGE</button>`+(hasUpgrade("R0_3")?`
		&emsp;<button onclick="tabSwitch('Domain'); nowDoItAgain()" style="color: black; text-shadow: -10px 0px 10px crimson, -5px 0px 20px magenta, 0px 0px 30px white, 5px 0px 20px magenta, 10px 0px 10px blueviolet;background: radial-gradient(white, white 20%, magenta); background-position: 50% 50%; background-size: 100% 833%;" id="tab">DoMaIn</button>
		&emsp;<button onclick="tabSwitch('Despair'); nowDoItAgain()" style="color: white; text-shadow: 0px 0px 5px black, 0px 0px 5px black, 0px 0px 5px black, 0px 0px 5px black;background: radial-gradient(magenta, blueviolet 20%, purple 70%); background-position: 100% 50%; background-size: 200% 1666%;" id="tab">despair</button>`:hasAchievement(14)?`&emsp;<button onclick="tabSwitch('Domain'); nowDoItAgain()" style="color: black; text-shadow: -10px 0px 10px crimson, -5px 0px 20px magenta, 0px 0px 30px white, 5px 0px 20px magenta, 10px 0px 10px blueviolet;background: radial-gradient(white, white 20%, magenta); background-position: 50% 50%; background-size: 100% 833%;" id="tab">DoMaIn</button>`:"")):``)
}

function buyUpgrade(id){
	if(gameData[upgrades[id].pointStuff].gte(upgrades[id].cost) && !Object.values(id.includes("R"||"D")?gameData.metaUpgrades:gameData.upgrades).includes(id)){
		(id.includes("D") || id.includes("R")?gameData.metaUpgrades:gameData.upgrades).push(id)
		gameData[upgrades[id].pointStuff] = gameData[upgrades[id].pointStuff].sub(upgrades[id].cost)
	}
	nowDoItAgain()
}

function buyBuyable(id){
	if(gameData[buyables[id].pointStuff].gte(buyables[id].cost()) && !Object.values(id.includes("R"||"D")?gameData.metaBuyables:gameData.buyables).includes(id) && buyables[id].canBuy()){
		gameData[buyables[id].pointStuff] = gameData[buyables[id].pointStuff].sub(buyables[id].cost())
		let firstTimeCheck = false
		if(!(id.includes("D") || id.includes("R")) && gameData.buyables[id] == undefined){
			gameData.buyables[id] = new Decimal(1)
			firstTimeCheck = true
		}
		if((id.includes("D") || id.includes("R")) && gameData.metaBuyables[id] == undefined){
			gameData.metaBuyables[id] = new Decimal(1)
			firstTimeCheck = true
		}
		id.includes("D") || id.includes("R")?gameData.metaBuyables[id] = gameData.metaBuyables[id].add(firstTimeCheck?0:1):gameData.buyables[id] = gameData.buyables[id].add(firstTimeCheck?0:1)
	}
	nowDoItAgain()
}

function hasUpgrade(id){
	return id.includes("R"||"D")?Object.values(gameData.metaUpgrades).includes(id):Object.values(gameData.upgrades).includes(id)
}

function hasAchievement(id){
	return Object.values(gameData.achievements).includes(id)
}

function upgradeEffect(id){
	return upgrades[id].effect()
}

function achievementEffect(id){
	return achievements[id].effect()
}

function numberFormat(number, scale){
	number = new Decimal(number)
	scale = new Decimal(scale).add(1)
	return number.gte("1e15") ? number.toFixed(2) : number.gte(new Decimal(10).pow(scale.sub(1))) ? number.round() : number.toPrecision(new Decimal(scale).sub(number.add(1).log(10).floor()))
}

function timeSaveDisplay(milliseconds) {
	const date = new Date(milliseconds);
	const hours = date.getUTCHours();
	const minutes = date.getUTCMinutes();
	const seconds = date.getUTCSeconds();
    
	return `${hours}:${minutes}:${seconds}`;
}

function tabSwitch(x){
	gameData.tab = x
	if(gameData.metaTab == "Main" && document.getElementById("info").innerHTML !== "Go back") gameData.lastTab = x
	if(gameData.metaTab == "Meta" && document.getElementById("info").innerHTML !== "Go back") gameData.lastMetaTab = x
	if(gameData.metaTab == "Tree" && document.getElementById("info").innerHTML !== "Go back") gameData.lastTreeTab = x
	nowDoItAgain()
}

function infoSwitch(){
	if(document.getElementById("info").innerHTML=="Info"){
		document.getElementById("info").innerHTML = "Go back"
		gameData.tab = "Credits"
	}
	else if(document.getElementById("info").innerHTML=="Go back"){
		document.getElementById("info").innerHTML = "Info"
		if(gameData.metaTab == "Main") gameData.tab = gameData.lastTab
		if(gameData.metaTab == "Meta") gameData.tab = gameData.lastMetaTab
		if(gameData.metaTab == "Tree") gameData.tab = gameData.lastTreeTab
	}
	nowDoItAgain()
}

function metaTabSwitch(x){
	gameData.metaTab = x
	if(gameData.metaTab == "Main") gameData.tab = gameData.lastTab
	if(gameData.metaTab == "Meta") gameData.tab = gameData.lastMetaTab
	if(gameData.metaTab == "Tree") gameData.tab = gameData.lastTreeTab
	nowDoItAgain()
}

function lerp(a, b, t){
	return Decimal.add(a, Decimal.sub(b, a).mul(t))
}

function metaEffects(){
	let rageEffect = new Decimal(1)
	let despairEffect = gameData.despair.add(1).root(10)
	return [rageEffect, despairEffect]
}

function gameTick(){
	if(gameData.tab == 0) gameData.tab = "De Noido"
	if(gameData.metaTab == 0) gameData.metaTab = "Main"
	if(gameData.firstTime == 0) gameData.firstTime = false
	if(gameData.upgrades==0) gameData.upgrades = []
	if(gameData.permUpgrades==0) gameData.permUpgrades = []
	if(gameData.gameState == 0) gameData.gameState = "stop"
	let time = Date.now()
	let timeThing = new Decimal((time-currentTime)/1000)
	document.getElementById("infoID").style["left"] = window.innerWidth-150+"px"
	document.getElementById("infoID").style["margin-bottom"] = "-60px"
	for(let i=0;i<12;i++){
		document.getElementById("optionButton"+i).style["margin-bottom"] = new Decimal(i).div(5).floor().mul(10).sub(50)+"px"
		document.getElementById("optionButton"+i).style["transform"] = `translateY(${new Decimal(i).div(5).floor().mul(10)}px)`
		document.getElementById("optionButton"+i).style["margin-top"] = "200px"
		document.getElementById("optionButton"+i).style["margin-left"] = new Decimal(i).mod(5).mul(120)+"px"
	}
	stressTest.push(timeThing.mul(1000/10).toNumber())
	if(stressTest.length>=60){
		document.getElementById("fps").innerHTML = "<span>"+numberFormat(stressTest.reduce((accumulator, currentValue) => accumulator + currentValue, 0),0)+" FPS"
		stressTest=[]
		
	}
	for(let i=0;i<1;i++){
		for(let v=0;v<4;v++){
			if(achievements[(i+1)*10+v+1].requirement()&&!Object.values(gameData.achievements).includes((i+1)*10+v+1)){
				gameData.achievements.push((i+1)*10+v+1)
				gameData.achNotifShow = true
				nowDoItAgain()
			}
		}
	}
	let noiseSpeed = 60
	if(hasUpgrade("R0_1")) noiseSpeed = noiseSpeed-2
	document.getElementById("start").style["opacity"] = (gameData.gameState == "start" || gameData.tab !== "De Noido" ? 0 : 1)
	if(new Decimal(currentTime/1000%gameData.autosave).add(1/60).gte(gameData.autosave) && !gameData.autosave.eq(0)){
		gameData.currentSave = localStorage.currentSave
		localStorage.setItem(localStorage.currentSave, btoa(JSON.stringify(gameData)))
	}
	currentTime = time
	if(gameData.fileNotifShow !== false){
		gameData.fileNotifTimer = gameData.fileNotifTimer.sub(timeThing)
	}
	if(gameData.fileNotifTimer.lte(0)) gameData.fileNotifShow = false
	if(gameData.achNotifShow !== false){
		gameData.achNotifTimer = gameData.achNotifTimer?gameData.achNotifTimer.sub(timeThing):new Decimal(5)
	}
	if(gameData.achNotifTimer.lte(0)){
		gameData.achNotifShow = false
		gameData.achNotifTimer = new Decimal(5)
	}
	document.getElementById("achievementPopUp").innerHTML = gameData.achNotifShow?`<img style="height:100px;width:100px;border: 2px solid; transform:translateX(-200px) translateY(-2px);" src="${achievements[gameData.achievements[gameData.achievements.length - 1]].thumbnail}.png"></img><p style="font-size: 20px; transform: translate(50px) translateY(-120px)">${achievements[gameData.achievements[gameData.achievements.length - 1]].descriptionPopUp?achievements[gameData.achievements[gameData.achievements.length - 1]].descriptionPopUp:achievements[gameData.achievements[gameData.achievements.length - 1]].description}</p><p style="overflow-wrap: break-word; inline-size: 400px; transform: translateX(100px) translateY(-140px)">${achievements[gameData.achievements[gameData.achievements.length - 1]].tooltip}</p>`:""
	document.getElementById("achievementPopUp").style["top"] = `${new Decimal(0.01).root(new Decimal(6).sub(gameData.achNotifTimer).pow(10)).mul(120).sub(100)}px`
	document.getElementById("achievementPopUp").style["opacity"] = gameData.achNotifTimer.lte(3)?gameData.achNotifTimer/3:1
	document.getElementById("achievementPopUp").style["background"] = gameData.achNotifShow?"white":""
	document.getElementById("achievementPopUp").style["left"] = window.innerWidth-540+"px"
	document.getElementById("achievementPopUp").style["border"] = "2px "+(gameData.achNotifShow?"solid":"hidden")
	if(!gameData) gameData = getGameData()
		if(gameData.timer.gt(0) && !document.getElementById("mainTheme").paused){
		document.getElementById("mainTheme").pause()
		document.getElementById("mainTheme").currentTime = 0 
	}
	if(gameData.timer.gt(0) && !document.getElementById("mainTheme").paused){
		document.getElementById("noiseScream").pause()
		document.getElementById("noiseScream").currentTime = 0 
	}
	if(gameData.timer.gt(0) && !document.getElementById("evilChase").paused){
		document.getElementById("evilChase").pause()
		document.getElementById("evilChase").currentTime = 0 
		document.getElementById("evilChase").volume = 1
	}
	gameData.despair = gameData.despair.add(metaGain()[1].mul(timeThing))
	if(gameData.gameState == "start") {
		gameData.points = gameData.points.add(pointGain().mul(timeThing))
		gameData.timer = gameData.timer.sub(timeThing)
		if(gameData.timer.lte(0)){
			if(document.getElementById("mainTheme").paused) document.getElementById("mainTheme").play()
			if(document.getElementById("mainTheme").currentTime == 0 && gameData.timer.lte(0)) document.getElementById("mainTheme").currentTime = gameData.timer.abs().toNumber()
			if(document.getElementById("evilChase").paused) document.getElementById("evilChase").play()
			document.getElementById("evilChase").volume = gameData.deNoidoPoints.add(gameData.points).div(gameData.points).sub(1).min(1).max(0).toNumber()
			if(gameData.deNoidoPoints.mul(gameData.deNoidoPower).gte(gameData.points)){
				document.getElementById("noiseScream").play()
			}
			else{
				document.getElementById("noiseScream").pause()
				document.getElementById("noiseScream").currentTime = 0 
			}
			if(document.getElementById("evilChase").currentTime == 0 && gameData.timer.lte(0)) document.getElementById("mainTheme").currentTime = gameData.timer.abs().toNumber()
			gameData.deNoidoPoints = gameData.deNoidoPoints.max(1).mul(gameData.deNoidoPower.pow(timeThing))
			gameData.deNoidoPower = gameData.deNoidoPower.max(1.1).add(Decimal.div(timeThing, noiseSpeed).mul(gameData.deNoidoPower.sub(1).mul(10)))
			if(gameData.deNoidoPoints.gte(gameData.points)){
				gameData.rage = gameData.rage.add(metaGain()[0])
				document.getElementById("lose").play()
				document.getElementById("mainTheme").pause()
				document.getElementById("mainTheme").currentTime = 0 
				document.getElementById("noiseScream").pause()
				document.getElementById("noiseScream").currentTime = 0 
				document.getElementById("evilChase").pause()
				document.getElementById("evilChase").currentTime = 0 
				document.getElementById("evilChase").volume = 1
				gameData.timeSurvival = gameData.timeSurvival.max(gameData.timer.abs())
				gameData.maxPoints = gameData.maxPoints.max(gameData.points)
				gameData.timer = new Decimal(10)
				gameData.points = new Decimal(0)
				gameData.upgrades = []
				gameData.buyables = []
				gameData.deNoidoPoints = new Decimal(1)
				gameData.deNoidoPower = new Decimal(1.1)
				gameData.gameState = "stop"
				gameData.firstTime = true
				nowDoItAgain()
			}
		}
	}
	let mfSaveFile = Object.getOwnPropertyNames(localStorage)
	let evilMFSaveFile = []
	for(i=0;i<Object.getOwnPropertyNames(localStorage).length;i++){
		if(Object.getOwnPropertyNames(localStorage)[i].includes("AOVJSIG")) evilMFSaveFile.push(Object.getOwnPropertyNames(localStorage)[i])
	}
	document.getElementById("infoStuff").innerHTML = gameData.tab == "Credits"?
		`<br><h3 style='margin-top:0px;margin-bottom:0px;'>My Very Good Idle Game created by me!! (XxXOLEGXxX)</h3><h5>(also known as fuckyousegabutdeezcord in Discord)</h5><h3>De Noido (or De Novo) "made" by @donpolloenthusiast6</h3><h3>Idea inspired by Pizza Tower: Cheesy Chasedown The First Slice</h3><h3>Special thanks to TMT for making idle game making experience such a breeze<br>and TMT community for helping me out with learning JS</h3>`: gameData.tab == "Update Notes"?
		`<h3>V0.1: The New Beginning</h3><span>Added Main and Meta content<br>Added VERY EVIL De Noido!11<br>There's not much else to say :p</span>`:""
	document.getElementById("points").innerHTML = gameData.tab=="Update Notes" || gameData.tab=="Credits"?"":"You have <span class='points'>"+numberFormat(gameData.points, 2)+"</span> points<br><span class='points'>("+numberFormat(pointGain(), 2)+"/sec)</span>"+
	(gameData.firstTime?`<h5>you also have <span style='color:darkred; font-size:20px; text-shadow: 0px 0px 10px darkred;'>${numberFormat(gameData.rage, 2)}</span> rages and <span style='color:purple; font-size:20px; text-shadow: 0px 0px 10px purple;'>${numberFormat(gameData.despair, 4)}</span> despairs, boosting your point gain by <span style='color:purple; font-size:20px; text-shadow: 0px 0px 10px purple;'>^${numberFormat(metaEffects()[1], 2)}</span></h5><span style='color:darkred; text-shadow: 0px 0px 10px darkred;'>(+${numberFormat(metaGain()[0],2)})</span>    <span style='color:purple; text-shadow: 0px 0px 10px purple;'>(${numberFormat(metaGain()[1], 2)}/sec)</span>`:``)+
	( hasAchievement(14)?`<h5>You currently have <span style='color:lime; font-size:20px; text-shadow: 0px 0px 10px lime;'>${numberFormat(gameData.treePoints,0)} [${numberFormat(gameData.totalTreePoints,0)}]</span> tree points`:``)
	let stuff = "An Ordinary Vanilla JS Idle Game"
	let titularTitle = ``
	for(let i=0;i<32;i++){
		titularTitle = titularTitle+`<p style="font-size: 42px; margin-top: 10px; margin-bottom: 10px; text-shadow: 0px 0px ${((Math.sin(Date.now()/420+(i/4)))*5+15)/(gameData.timer.lte(0)?gameData.timer.abs().add(1).root(2):1)}px rgb(${(Math.sin(Date.now()/420+(i/4))*51)/(gameData.timer.lte(0)?gameData.timer.abs().add(1).root(2):1)}, ${((Math.sin(Date.now()/420+(i/4))/2+0.5)*153+102)/(gameData.timer.lte(0)?gameData.timer.abs().add(1).root(2):1)}, ${(Math.sin(Date.now()/420+(i/4))*102)/(gameData.timer.lte(0)?gameData.timer.abs().add(1).root(2):1)}); color: rgb(${255/(gameData.timer.lte(0)?gameData.timer.abs().add(1).root(2):1)}, ${(Math.sin(Date.now()/420+(i/4))*20+235+Math.sin(Date.now()/2023+(i/4))**20*20)/(gameData.timer.lte(0)?gameData.timer.abs().add(1).root(2):1)}, ${Math.sin(Date.now()/2023+(i/4))**20*255/(gameData.timer.lte(0)?gameData.timer.abs().add(1).root(2):1)}); transform: translateX(${window.innerWidth/2-(window.innerWidth/3.7)+(gameData.timer.lte(0)?(Math.random()-0.5)*gameData.timer.abs().root(2):0)}px) translateY(${Math.sin(Date.now()/420+(i/4))*5/(gameData.timer.lte(0)?gameData.timer.abs().add(1).root(2):1)+(gameData.timer.lte(0)?(Math.random()-0.5)*gameData.timer.abs().root(2):0)}px); display: inline-block;">${stuff[0]==" "?"&nbsp":stuff[0]}</p>`
		stuff = stuff.replace(stuff[0], "")
	}
	document.getElementById("veryGoodTitle").innerHTML = titularTitle+`<p style="margin-bottom: 10px; margin-top: 10px; font-size: 14px; transform: translateX(${window.innerWidth/2-(window.innerWidth/3.7)+(gameData.timer.lte(0)?(Math.random()-0.5)*gameData.timer.abs().root(2):0)}px) translateY(${gameData.timer.lte(0)?(Math.random()-0.5)*gameData.timer.abs().root(2):0}px); display: inline-block;">&nbsp(v0.1)</p>`
	document.getElementById("record").innerHTML = gameData.tab=="Update Notes" || gameData.tab=="Credits"?"":gameData.tab!=="De Noido"?"":(gameData.maxPoints.gt(0)?"<br>You have reached "+numberFormat(gameData.maxPoints, 2)+" points and survived for "+numberFormat(gameData.timeSurvival)+" seconds":"")
	document.getElementById("noise").innerHTML = gameData.tab!=="De Noido"?"":gameData.gameState=="stop"?"":gameData.timer.lte(0)?"THE NOISE IS HERE.<br>YOU'VE SURVIVED "+numberFormat(gameData.timer.abs(), 1)+" SECONDS":"The Noise is coming in "+numberFormat(gameData.timer)+" seconds."
	document.getElementById("NOISEISHERE").innerHTML = gameData.tab=="Update Notes" || gameData.tab=="Credits"?"YOU CANNOT ESCAPE THE DE NOIDO":numberFormat(gameData.deNoidoPoints, 2)+"<br>(x"+numberFormat(gameData.deNoidoPower, 2)+"/sec)"
	document.getElementById("NOISEISHERE").style["font-size"] = gameData.deNoidoPoints.add(1).log(10).add(1).log(1.1).add(20)+"px"
	document.getElementById("NOISEISHERE").style["opacity"] = gameData.timer.lte(0)?gameData.timer.abs().div(50).add(0.1).min(1):0
	document.getElementById("centerNoise").style.top = Decimal.mul(Math.random()-0.5, gameData.timer.lte(0)?gameData.timer.abs().div(20):0).add(50)+"%"
	document.getElementById("centerNoise").style.right = Decimal.mul(Math.random()-0.5, gameData.timer.lte(0)?gameData.timer.abs().div(20):0).add(50)+"%"
	document.body.style["background-color"] = gameData.timer.lte(0)?`rgb(${gameData.timer.abs().add(195).mul(gameData.deNoidoPoints.add(gameData.points).div(gameData.points))},${gameData.timer.abs().add(195).mul(new Decimal(2).sub(gameData.deNoidoPoints.add(gameData.points).div(gameData.points)))},${Decimal.sub(195, gameData.timer.abs()).mul(new Decimal(2).sub(gameData.deNoidoPoints.add(gameData.points).div(gameData.points)))})`:"rgb(195,195,195)"
	document.getElementById("save").innerHTML = `<span style="opacity: ${gameData.fileNotifTimer.div(2).max(0).toNumber()}">`+
	(gameData.fileNotifShow=="save"?`SUCCESSFULLY SAVED ${gameData.currentSave}`:
	gameData.fileNotifShow=="load"?`SUCCESSFULLY LOADED ${gameData.currentSave}`:
	gameData.fileNotifShow=="quick save"?`SUCCESSFULLY QUICK SAVED TO ${gameData.currentSave}`:
	gameData.fileNotifShow=="export"?`SUCCESSFULLY EXPORTED ${gameData.currentSave}`:
	gameData.fileNotifShow=="import"?`SUCCESSFULLY IMPORTED TO ${gameData.currentSave}`:
	gameData.fileNotifShow=="exportFile"?`SUCCESSFULLY EXPORTED ${gameData.currentSave} AS A FILE`:
	gameData.fileNotifShow=="importFile"?`dude what the hell man... - X-iry`:"")+"</span><br><br><br><br><br>Available slots: "+evilMFSaveFile+"<br>Current slot: "+localStorage.currentSave.replace("AOVJSIG","")
	document.getElementById("autosave").innerHTML = gameData.autosave.eq(0)?"OFF":numberFormat(gameData.autosave, 1)+" sec"
	gameData.totalTreePoints = gameData.treePoints.add(gameData.wastedTreePoints)
	if(gameData.tab=="Upgrade Section"){
		for(let i=0;i<1;i++){
			for(let v=0;v<4;v++){
				id = i+"_"+v
				if(upgrades[id].displayUpgrade() && upgrades[id].effectDisplay!==undefined) document.getElementById("upg"+id).innerHTML = upgrades[id].effectDisplay()
			}
		}
	}
	if(gameData.tab=="Rage"){
		for(let i=0;i<1;i++){
			for(let v=0;v<4;v++){
				id = "R"+i+"_"+v
				if(upgrades[id].displayUpgrade() && upgrades[id].effectDisplay!==undefined) document.getElementById("upg"+id).innerHTML = upgrades[id].effectDisplay()
			}
		}
	}
	if(gameData.tab=="Domain"){
		document.getElementById("leftBar").style = `float:left; box-shadow: ${gameData.rage.gte(buyables["Prestige"].requirements()[0])?`inset 0px 0px ${(Math.sin(Date.now()/160)/2+1)*8}px 2px white, 0px 0px ${(Math.sin(Date.now()/160)/2+1)*8}px 2px crimson`:``}; height:274px;width:100px;border: 2px solid; background-image:linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0) ${buyables["Prestige"].requirements()[0].sub(gameData.rage.min(buyables["Prestige"].requirements()[0])).div(buyables["Prestige"].requirements()[0]).mul(100)}%, magenta ${buyables["Prestige"].requirements()[0].sub(gameData.rage.min(buyables["Prestige"].requirements()[0])).div(buyables["Prestige"].requirements()[0])}%, darkred);`
		document.getElementById("leftHandle").style = `float:left; object-align: center; margin-top: 14.5px;height: 228px; width: 20px; box-shadow: ${gameData.rage.gte(buyables["Prestige"].requirements()[0])?`inset 0px 0px 10px crimson, 0px 0px 10px crimson, inset 0px 0px 10px crimson, 0px 0px 10px crimson`:``}; border: 0px hidden; border-top: 10px double ${gameData.rage.gte(buyables["Prestige"].requirements()[0])?`darkred`:``}; border-bottom: 10px double ${gameData.rage.gte(buyables["Prestige"].requirements()[0])?`darkred`:``};`
		document.getElementById("prestige").style = `text-shadow: ${buyables["Prestige"].canBuy()?`${(Math.random()-0.5)*2}px ${(Math.random()-0.5)*2}px ${Math.random()*5+5}px black,${(Math.random()-0.5)*2}px ${(Math.random()-0.5)*2}px ${Math.random()*5+5}px black,${(Math.random()-0.5)*2}px ${(Math.random()-0.5)*2}px ${Math.random()*5+5}px black, ${(Math.random()-0.5)*2}px ${(Math.random()-0.5)*2}px ${Math.random()*5+5}px black`:""}; box-shadow: ${buyables["Prestige"].canBuy()?`${(Math.random()-0.5)*2}px ${(Math.random()-0.5)*2}px ${Math.random()*5+5}px black, inset 0px 0px 25px black, inset -100px 0px 100px -50px purple, inset -100px 0px 100px -50px purple, inset -100px 0px 100px -50px purple, inset -100px 0px 100px -50px purple, inset 100px 0px 100px -50px darkred, inset 100px 0px 100px -50px darkred, inset 100px 0px 100px -50px darkred, inset 100px 0px 100px -50px darkred;`:""}; color: ${buyables["Prestige"].canBuy()?"white":"black"}; background-color: ${buyables["Prestige"].canBuy()?"black":"gray"}`
		document.getElementById("rightBar").style = `float:right; box-shadow: ${gameData.despair.gte(buyables["Prestige"].requirements()[1])?`inset 0px 0px ${(Math.sin(Date.now()/160)/2+1)*8}px 2px white, 0px 0px ${(Math.sin(Date.now()/160)/2+1)*8}px 2px blueviolet`:``}; height:274px;width:100px;border: 2px solid; background-image:linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0) ${buyables["Prestige"].requirements()[1].sub(gameData.despair.min(buyables["Prestige"].requirements()[1])).div(buyables["Prestige"].requirements()[1]).mul(100)}%, magenta ${buyables["Prestige"].requirements()[1].sub(gameData.despair.min(buyables["Prestige"].requirements()[1])).div(buyables["Prestige"].requirements()[1])}%, purple);`
		document.getElementById("rightHandle").style = `float:right; object-align: center; margin-top: 14.5px;height: 228px; width: 20px; box-shadow: ${gameData.despair.gte(buyables["Prestige"].requirements()[1])?`inset 0px 0px 10px blueviolet, 0px 0px 10px blueviolet, inset 0px 0px 10px blueviolet, 0px 0px 10px blueviolet`:``}; border: 0px hidden; border-top: 10px double ${gameData.despair.gte(buyables["Prestige"].requirements()[1])?`purple`:``}; border-bottom: 10px double ${gameData.despair.gte(buyables["Prestige"].requirements()[1])?`purple`:``};`
	}
}

function nowDoItAgain(){
	document.getElementById("upgrades").innerHTML = upgradeDisplay()
	document.getElementById("buyables").innerHTML = buyableDisplay()
	document.getElementById("achievements").innerHTML = achievementDisplay()
	document.getElementById("tabMayhem").innerHTML = tabDisplay()
}



function saveGame(){
	let slot = prompt("Please name your save slot")+"AOVJSIG"
	if(slot=="" || slot==null){
		alert("n-no thanks")
		return
	}
	if(slot=="currentSave"){
		alert("NUH UH")
		return
	}
	gameData.currentSave = slot
	localStorage.currentSave = slot
	localStorage.setItem(localStorage.currentSave, slot)
	localStorage.setItem(slot, btoa(JSON.stringify(gameData)))
	gameData.fileNotifShow = "save"
	gameData.fileNotifTimer = new Decimal(3)
	nowDoItAgain()
}

function loadGame(){
	let slot = prompt("Please select your save slot")+"AOVJSIG"
	if(slot=="currentSave"){
		alert("NUH UH")
		return
	}
	if(!Object.getOwnPropertyNames(localStorage).includes(slot)) return
	gameData = JSON.parse(atob(localStorage.getItem(slot)));
	for(let i=0;i<Object.getOwnPropertyNames(gameData).length;i++){
		if(typeof gameData[Object.getOwnPropertyNames(gameData)[i]] == "number") gameData[Object.getOwnPropertyNames(gameData)[i]] = new Decimal(gameData[Object.getOwnPropertyNames(gameData)[i]])
		if(isNumeric(gameData[Object.getOwnPropertyNames(gameData)[i]])) gameData[Object.getOwnPropertyNames(gameData)[i]] = new Decimal(gameData[Object.getOwnPropertyNames(gameData)[i]])
	}
	localStorage.currentSave = slot
	currentSave = localStorage.currentSave
	gameData.fileNotifShow = "load"
	gameData.fileNotifTimer = new Decimal(3)
	nowDoItAgain()
}

function deleteGame(){
	let slot = prompt("Pick a slot to destroy")+"AOVJSIG"
	if(slot=="currentSave"){
		alert("NUH UH")
		return
	}
	if(slot==gameData.currentSave){
		alert("You can't do that.\n\nyou just can't")
		return
	}
	localStorage.removeItem(slot);
	nowDoItAgain()
}

function renameGame(){
	let slot = prompt("Please rename your save slot")+"AOVJSIG"
	if(slot=="currentSave"){
		alert("NUH UH")
		return
	}
	if(slot==""){
		alert("n-no thanks")
		return
	}
	localStorage.removeItem(currentSlot);
	currentSave = slot
	localStorage.setItem(slot, btoa(JSON.stringify(gameData)))
	nowDoItAgain()
}

function newGame(){
	let slot = prompt("Please name your new save slot")+"AOVJSIG"
	if(slot=="currentSaveAOVJSIG"){
		alert("NUH UH")
		return
	}
	if(Object.getOwnPropertyNames(localStorage).includes(slot)){
		alert("Try different name.")
		return
	}
	gameData = getGameData()
	currentSave = slot
	localStorage.setItem(slot, btoa(JSON.stringify(gameData)))
	nowDoItAgain()
}

function autoSaveGame(){
	let number = prompt("Please choose interval between saves (type 0 to disable it)")
	if(!Number(number) && number !== "0") return
	gameData.autosave = new Decimal(number)
	nowDoItAgain()
}

function quickSaveGame(){
	localStorage.currentSave = gameData.currentSave
	localStorage.setItem(gameData.currentSave, btoa(JSON.stringify(gameData)))
	gameData.fileNotifShow = "quick save"
	gameData.fileNotifTimer = new Decimal(3)
	nowDoItAgain()
}

function exportData(){
	navigator.clipboard.writeText(
       localStorage.getItem(gameData.currentSave)
    )
	gameData.fileNotifShow = "export"
	gameData.fileNotifTimer = new Decimal(3)
	nowDoItAgain()
}

function importData(){
	let data = Object.assign({}, JSON.parse(atob(prompt("Please insert your save file here"))))
	if(data == "" || data == undefined) return
	for(let i=0;i<Object.getOwnPropertyNames(getGameData()).length;i++){
		for(let v=0;v<Object.getOwnPropertyNames(getGameData()).length;v++){
			if(Object.getOwnPropertyNames(data)[i]==Object.getOwnPropertyNames(getGameData())[v]){
				if(data[Object.getOwnPropertyNames(getGameData())[v]]==undefined) data[Object.getOwnPropertyNames(data)[i]] = getGameData()[Object.getOwnPropertyNames(getGameData())[v]]
				if(typeof data[Object.getOwnPropertyNames(data)[i]] == "number") data[Object.getOwnPropertyNames(data)[i]] = new Decimal(data[Object.getOwnPropertyNames(getGameData())[v]])
				if(isNumeric(data[Object.getOwnPropertyNames(data)[i]])) data[Object.getOwnPropertyNames(data)[i]] = new Decimal(data[Object.getOwnPropertyNames(getGameData())[v]])
			}
		}
	}
	gameData = data
	gameData.fileNotifShow = "import"
	gameData.fileNotifTimer = new Decimal(3)
	nowDoItAgain()
}

function exportFile(){
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(localStorage.getItem(gameData.currentSave)+"\n\n\nDon't lose it, buddy."));
	element.setAttribute('download', 'save_file.txt');

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
	gameData.fileNotifShow = "exportFile"
	gameData.fileNotifTimer = new Decimal(3)
	nowDoItAgain()
}

function importFile(){
	gameData.fileNotifShow = "importFile"
	gameData.fileNotifTimer = new Decimal(3)
	nowDoItAgain()
}

function hardReset(){
	if(prompt("Are you sure?")=="yes"){
		let needToRemoveMore = 0;
		let workPLEASE = Object.getOwnPropertyNames(localStorage).length
		while(needToRemoveMore < 3){
			for(i=0;i<workPLEASE;i++){ 
				if(gameData.timer.gt(0) && !document.getElementById("mainTheme").paused){
					document.getElementById("mainTheme").pause()
					document.getElementById("mainTheme").currentTime = 0 
				}
				if(gameData.timer.gt(0) && !document.getElementById("mainTheme").paused){
					document.getElementById("noiseScream").pause()
					document.getElementById("noiseScream").currentTime = 0 
				}
				if(gameData.timer.gt(0) && !document.getElementById("evilChase").paused){
					document.getElementById("evilChase").pause()
					document.getElementById("evilChase").currentTime = 0 
					document.getElementById("evilChase").volume = 1
				}		
				if(Object.getOwnPropertyNames(localStorage)[i].includes("AOVJSIG")){
					localStorage.removeItem(Object.getOwnPropertyNames(localStorage)[i]);
					needToRemoveMore = 0
				}
				workPLEASE = Object.getOwnPropertyNames(localStorage).length
				needToRemoveMore = needToRemoveMore+1
			}
		}
		gameData = getGameData()
		localStorage.setItem("currentSave", "DefaultAOVJSIG")
		localStorage.setItem("DefaultAOVJSIG", btoa(JSON.stringify(gameData)))
		window.location.reload()
	}
}

let update = setInterval(gameTick, 0)
