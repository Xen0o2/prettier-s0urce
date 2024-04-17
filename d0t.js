const stats = {
	cpu: [
		{
			hack: [8, 17.5],
			trueDam: [0, 0],
			pen: [0, 0],
			chance: [0, 0],
			dam: [0, 0]
		},
		{
			hack: [15, 33.5],
			trueDam: [0, 10],
			pen: [0, 5],
			chance: [0, 0],
			dam: [0, 0]
		},
		{
			hack: [33.5, 54],
			trueDam: [0, 20],
			pen: [0, 15],
			chance: [0, 0],
			dam: [0, 0]
		},
		{
			hack: [55, 64.25],
			trueDam: [0, 30],
			pen: [0, 20],
			chance: [0, 6.25],
			dam: [0, 15]
		},
		{
			hack: [70, 84.75],
			trueDam: [0, 40],
			pen: [0, 25],
			chance: [0, 7.5],
			dam: [0, 25]
		},
		{
			hack: [100, 105],
			trueDam: [47.5, 50],
			pen: [25, 30],
			chance: [9, 10],
			dam: [25, 30]
		}
	],
	port: [
		{ hp: 1000+3*60, rd: 0 },
		{ hp: 1000+3*114, rd: 3*0.075 },
		{ hp: 1000+3*166, rd: 3*0.1 },
		{ hp: 1000+3*217, rd: 3*0.125 },
		{ hp: 1000+3*269, rd: 3*0.15 },
		{ hp: 1000+3*320, rd: 3*0.15 }
	]
}

const hackPower = (hack, trueDam, pen, chance, dam) => {
	pen /= 100;
	chance /= 100;
	dam /= 100;
	return [100+hack+(0.05+chance)*(100+hack)*(1.3+dam), pen, trueDam]
}

const rankIt = (raw, pen, trueDam, rarity) => {
	const item = stats.cpu[rarity]
	const port  = stats.port[rarity];
	const bestHackPower = hackPower(item.hack[1], item.trueDam[1], item.pen[1], item.chance[1], item.dam[1]);
	const worstHackPower = hackPower(item.hack[0], item.trueDam[0], item.pen[0], item.chance[0], item.dam[0]);
	const best = port.hp/(bestHackPower[0]*(1-(port.rd*(1-bestHackPower[1])))+bestHackPower[2]);
	const worst = port.hp/(worstHackPower[0]*(1-(port.rd*(1-worstHackPower[1])))+worstHackPower[2]);
	const actual = port.hp/(raw*(1-(port.rd*(1-pen)))+trueDam);
	const qualityRange = worst - best;
	const qualityActually = worst - actual;
	return 1+((qualityActually/qualityRange || 0)*9)
}


(() => {
	const rarities = [ "common", "uncommon", "rare", "epic", "legendary", "mythic"];

	const rarity = "mythic";
	const hack = 100;
	const trueDamV = 45;
	const penV = 29;
	const chance = 9;
	const dam = 25;

	const index = rarities.indexOf(rarity.toLowerCase());
	if (index < 0)
		return;
	const [raw, pen, trueDam] = hackPower(hack, trueDamV, penV, chance, dam);
	console.log(`${rankIt(raw, pen, trueDam, index).toFixed(5) * 10} ${rarity} CPU Rank`);
})()



(() => {
	
})()