const path = require("path");
const LOCATIONS_PATH = "../public/static/locations";

// imports every .json in LOCATIONS_PATH
const LocationPacks = require("fs")
	.readdirSync(path.resolve(__dirname, LOCATIONS_PATH))
	.map((file) => {
		const packName = file.substr(0, file.indexOf(".")); // removes .json
		const locationPack = require(LOCATIONS_PATH + "/" + packName);
		return locationPack;
	});

const getLocationPack = (thisPackId) =>
	LocationPacks.find(({ id }) => id === thisPackId);

const getLocationListFromPack = (thisPackId) =>
	getLocationPack(thisPackId).locations.map(({ name }) => name);

const AVAILABLE_LOCATION_PACKS = LocationPacks.map(({ id, name }) => ({
	id,
	name,
}));

const getRandomLocationFromPack = (thisPackId) =>
	getRandomLocation(getLocationPack(thisPackId));

const getRandomLocation = ({ locations }) =>
	locations[Math.floor(Math.random() * locations.length)];

module.exports = {
	getLocationPack,
	getLocationListFromPack,
	AVAILABLE_LOCATION_PACKS,
	getRandomLocationFromPack,
};
