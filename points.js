function pointGain(){
	let gain = new Decimal(1)
	if(hasUpgrade("0_0")) gain = gain.mul(upgradeEffect("0_0"))
	if(hasUpgrade("0_1")) gain = gain.mul(1.2)
	if(hasUpgrade("R0_0")) gain = gain.mul(upgradeEffect("R0_0"))
	if(hasUpgrade("R0_2")) gain = gain.mul(upgradeEffect("R0_2"))
	return gain.pow(metaEffects()[1]).add(buyables["Prestige"].effect()[0])
}

function metaGain(){
	let rageGain = gameData.points.max(1).log(10).sub(1).max(0)
	if(hasUpgrade("0_1")) rageGain = rageGain.mul(1.2)
	rageGain = rageGain.mul(buyables["D0_0"].effect())
	rageGain = rageGain.mul(buyables["Prestige"].effect()[1])
	
	let despairGain = gameData.timeSurvival.div(100)
	despairGain = despairGain.add(buyables["R0_0"].effect())
	despairGain = despairGain.mul(buyables["Prestige"].effect()[1])
	
	return [rageGain, despairGain]
}