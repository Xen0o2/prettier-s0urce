//https://www.svgrepo.com/show/2287/sort.svg
const inventory = [ "rare", "epic", "legendary", "legendary", "legendary", "ethereal", "ethereal", "mythic", "legendary", "legendary" ];
// const inventory = [ "rare", "epic"];
const storage = [];

const list = ["common", "uncommon", "rare", "epic", "legendary", "mythic", "ethereal"]

const isSorted = () => {
	let lastScore = 0;
	for (let item of inventory) {
		let score = list.indexOf(item);
		if (score < lastScore)
			return false;
		lastScore = score;
	}
	return true
}

const sortAnItem = (withScore) => {
	const itemToMove = inventory.slice(0, -1).find((item, index) => {
		let score = list.indexOf(item);
		let nextScore = list.indexOf(inventory[Number(index) + 1]);
		return score != nextScore && score == withScore;
	})
	return itemToMove;
}

const moveItem = (item) => {
	inventory.splice(inventory.indexOf(item), 1);
	inventory.push(item)
}

console.log(inventory)

let score = 0;
while (score < 8) {
	let nextItem = sortAnItem(score);
	console.log(nextItem)
	if (nextItem) moveItem(nextItem);
	else score++;
}
console.log(inventory)

