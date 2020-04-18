const path = require("path");
const LOCATIONS_PATH = "../public/static/locations";

// imports every .json in LOCATIONS_PATH
const LocationPacks = require("fs")
	.readdirSync(path.resolve(__dirname, LOCATIONS_PATH))
	.map((file) => {
		const packName = file.substr(0, file.indexOf(".")); // removes .json
		const locations = require(LOCATIONS_PATH + "/" + packName);
		return { packName, locations };
	});

const getAvailableLocations = () =>
	LocationPacks.map(({ packName }) => packName);

const getRandomLocationFromPack = (thisPackName) =>
	getRandomLocation(
		LocationPacks.find(({ packName }) => packName === thisPackName)
	);

const getRandomLocation = ({ locations }) =>
	locations[Math.floor(Math.random() * locations.length)];

module.exports = { getAvailableLocations, getRandomLocationFromPack };
