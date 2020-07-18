const Player = require("./Player");

const Locations = require("./Locations");

class Game {
	constructor(code, onEmpty, getMinutesUntilRestart) {
		this.code = code;
		this.onEmpty = onEmpty;

		this.locked = false;
		this.getMinutesUntilRestart = getMinutesUntilRestart;

		this.players = [];
		this.status = "lobby-waiting"; // lobby-waiting, lobby-ready, ingame
		this.location = null;
		this.locationList = [];
		this.timeLeft = null;
		this.timePaused = false;
		this.currentRoundNum = 0;
		this.settings = {
			locationPack: "spyfall1",
			timeLimit: 8, // 8 minutes
			includeAllSpy: false,
		};

		// delete this game if it does not have players after 60 seconds
		setTimeout(() => this.deleteGameIfEmpty(), 60 * 1000);
	}

	sendNewStateToAllPlayers = () => {
		const newState = this.getState();

		for (const player of this.players) {
			player.socket.emit("gameChange", { ...newState, me: player.getInfo() });
		}
	};

	initPlayer(socket, previousName) {
		const player = this.addPlayer(socket, previousName);
		this.attachListenersToPlayer(player);

		this.checkIfReady();
		this.sendNewStateToAllPlayers();
	}

	addPlayer(socket, previousName) {
		const playerToReplace = this.findPlayerByName(previousName);
		if (playerToReplace && !playerToReplace.connected) {
			// this will never run in the lobby because all players
			// that leave the lobby are deleted, not set as disconnected
			return Game.replacePlayer(playerToReplace, socket);
		} else {
			return this.createPlayer(socket);
		}
	}

	createPlayer(socket) {
		const newPlayer = new Player(socket);
		this.players.push(newPlayer);

		if (this.status === "ingame") {
			this.createPlayerWhileInGame(newPlayer);
		}

		return newPlayer;
	}

	static replacePlayer(player, socket) {
		player.socket = socket;
		player.connected = true;
		return player;
	}

	createPlayerWhileInGame(player) {
		const { location } = this;

		if (location.isAllSpyLocation) {
			player.role = "spy";
		} else {
			// the last role in the array is the default role
			player.role = location.roles[location.roles.length - 1];
		}
	}

	removePlayerByName = (theName) =>
		this.removePlayer(this.findPlayerByName(theName))();

	findPlayerByName = (theName) =>
		this.players.find(({ name }) => name === theName);

	removePlayer = (player) => () => {
		if (!player) return false;

		if (player.socket && player.socket.disconnect) {
			player.socket.disconnect(true);
		}

		player.connected = false;

		if (this.status !== "ingame" || !player.name) {
			this.deletePlayer(player);
		}

		this.deleteGameIfEmpty();

		this.checkIfReady();
		this.sendNewStateToAllPlayers();
	};

	deleteGameIfEmpty = () => {
		if (this.noPlayersLeft() && this.code !== "ffff") {
			// the only players that could possibly
			// be left are unnamed players
			this.disconnectAllPlayers();

			this.onEmpty();
			return;
		}
	};

	deletePlayer = (player) => {
		const index = this.players.indexOf(player);

		if (index > -1) {
			this.players.splice(index, 1);
		}
	};

	noPlayersLeft = () => {
		const allPlayersGone = this.players.length === 0;
		const allPlayersDisconnected = this.players.reduce(
			(answer, player) => (!player.connected || !player.name) && answer,
			true
		);

		return allPlayersGone || allPlayersDisconnected;
	};

	disconnectAllPlayers = () =>
		this.players.forEach(({ socket }) => {
			if (socket) socket.disconnect(true);
		});

	removeDisconnectedPlayers = () => {
		this.players = this.players.filter((player) => player.connected);
	};

	attachListenersToPlayer = (player) => {
		const { socket } = player;
		socket.on("name", this.setName(player));
		socket.on("startGame", this.startGame(player));
		socket.on("removePlayer", this.removePlayerByName);
		socket.on("disconnect", this.removePlayer(player));
		socket.on("togglePause", this.togglePauseTimer);
		socket.on("endGame", this.endGame);
		socket.on("setTimeLimit", this.setTimeLimit);
		socket.on("setLocationPack", this.setLocationPack);
		socket.on("setIncludeAllSpy", this.setIncludeAllSpy);
		socket.on("clearName", () => this.clearName(player)());
	};

	setName = (newPlayer) => (name) => {
		const validLength = name.length > 1 && name.length <= 24;

		if (!this.isNameTaken(name) && validLength) {
			newPlayer.name = name;
		} else {
			newPlayer.name = "";
			newPlayer.socket.emit("badName");
		}

		this.checkIfReady();
		this.sendNewStateToAllPlayers();
	};

	clearName = (player) => () => {
		player.name = "";

		this.checkIfReady();
		this.sendNewStateToAllPlayers();
	};

	isNameTaken = (nameToCheck) =>
		this.players.reduce(
			(answer, player) => player.name === nameToCheck || answer,
			false
		);

	checkIfReady = () => {
		if (this.status === "ingame") return false;

		const everyoneHasName = this.players.reduce(
			(answer, player) => player.name && answer,
			true
		);

		const isReady = everyoneHasName;

		this.status = isReady ? "lobby-ready" : "lobby-waiting";

		return isReady;
	};

	startGame = (player) => () => {
		if (this.status !== "lobby-ready") return;
		if (this.locked) {
			player.socket.emit("lockedWarning", this.getMinutesUntilRestart());
			return;
		}

		this.pickLocation();
		this.pickFirst();

		if (this.location.isAllSpyLocation) {
			this.setAllAsSpy();
		} else {
			this.pickSpy();
			this.assignRoles();
		}

		this.startTimer();

		this.status = "ingame";
		this.currentRoundNum++;

		this.sendNewStateToAllPlayers();
	};

	endGame = () => {
		this.status = "lobby-waiting";
		this.location = null;
		this.timeLeft = null;
		this.timePaused = false;

		this.removeDisconnectedPlayers();
		this.players.forEach((player) => player.reset());

		this.checkIfReady();
		this.sendNewStateToAllPlayers();
	};

	pickLocation = () => {
		const { locationPack, includeAllSpy } = this.settings;

		this.location = Locations.getRandomLocationFromPack(
			locationPack,
			includeAllSpy
		);
		this.locationList = Locations.getLocationListFromPack(
			locationPack,
			includeAllSpy
		);
	};

	pickSpy = () => {
		this.players[Math.floor(Math.random() * this.players.length)].role = "spy";
	};

	setAllAsSpy = () => this.players.forEach((player) => (player.role = "spy"));

	pickFirst = () => {
		this.players[
			Math.floor(Math.random() * this.players.length)
		].isFirst = true;
	};

	assignRoles = () => {
		const location = this.location;
		const default_role = location.roles[location.roles.length - 1];
		const roles = location.roles.slice(); // shallow copy, not sure if necessary
		const shuffled_roles = shuffleArray(roles);

		this.players.forEach((player) => {
			if (player.role === "spy") return;

			const role = shuffled_roles.pop() || default_role;
			player.role = role;
		});
	};

	startTimer = () => {
		this.timeLeft = this.settings.timeLimit * 60;
		const timer = setInterval(() => {
			if (this.timePaused) return;

			this.timeLeft--;

			if (this.timeLeft > 0) return;

			clearInterval(timer);
		}, 1000);
	};

	togglePauseTimer = () => {
		this.timePaused = !this.timePaused;
		this.sendNewStateToAllPlayers();
	};

	setTimeLimit = (timeLimit) => {
		this.settings.timeLimit = timeLimit;
		this.sendNewStateToAllPlayers();
	};
	setLocationPack = (locationPack) => {
		this.settings.locationPack = locationPack;
		this.sendNewStateToAllPlayers();
	};
	setIncludeAllSpy = (includeAllSpy) => {
		this.settings.includeAllSpy = includeAllSpy;
		this.sendNewStateToAllPlayers();
	};

	getState = () => ({
		code: this.code,
		players: this.getPlayers(),
		status: this.status,
		location: this.location,
		locationList: this.locationList,
		timeLeft: this.timeLeft,
		timePaused: this.timePaused,
		settings: this.settings,
		AVAILABLE_LOCATION_PACKS: Locations.AVAILABLE_LOCATION_PACKS,
		currentRoundNum: this.currentRoundNum,
	});

	getPlayers = () => this.players.map((player) => player.getInfo());
}

// https://stackoverflow.com/a/6274381
const shuffleArray = (a) => {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
};

module.exports = Game;
