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

const getLocationPack = (thisPackId, includeAllSpy) => {
	const locationPack = LocationPacks.find(({ id }) => id === thisPackId);

	if (!includeAllSpy) return locationPack;

	return {
		...locationPack,
		locations: [...locationPack.locations, allSpiesLocation],
	};
};

const getLocationListFromPack = (thisPackId, includeAllSpy) =>
	getLocationPack(thisPackId, includeAllSpy).locations.map(({ name }) => name);

const AVAILABLE_LOCATION_PACKS = LocationPacks.map(({ id, name }) => ({
	id,
	name,
}));

const getRandomLocationFromPack = (thisPackId, includeAllSpy) =>
	getRandomLocation(getLocationPack(thisPackId, includeAllSpy));

const getRandomLocation = ({ locations }) =>
	locations[Math.floor(Math.random() * locations.length)];

const allSpiesLocation = {
	name: "All players are spies",
	isAllSpyLocation: true,
};

module.exports = {
	getLocationPack,
	getLocationListFromPack,
	AVAILABLE_LOCATION_PACKS,
	getRandomLocationFromPack,
};
