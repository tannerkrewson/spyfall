const Player = require("./Player");

const Locations = require("./Locations");

class Game {
	constructor(code) {
		this.code = code;
		this.players = [];
		this.status = "lobby-waiting"; // lobby-waiting, lobby-ready, ingame
		this.location = null;
		this.locationList = [];
		this.timeLeft = null;
		this.timePaused = false;
		this.settings = {
			locationPack: "spyfall1",
			timeLimit: 8 * 60, // 8 minutes
		};
	}

	sendNewStateToAllPlayers = () => {
		const newState = this.getState();

		for (const player of this.players) {
			player.socket.emit("gameChange", { ...newState, me: player.getInfo() });
		}
	};

	addPlayer(socket) {
		const newPlayer = new Player(socket);
		this.players.push(newPlayer);

		this.attachListenersToPlayer(newPlayer);
		this.sendNewStateToAllPlayers();

		return newPlayer;
	}

	removePlayerByName = (name) =>
		this.removePlayer(this.players.find((player) => player.name === name))();

	removePlayer = (player) => () => {
		player.socket.disconnect(true);

		const index = this.players.indexOf(player);

		if (index > -1) {
			this.players.splice(index, 1);
		}

		this.sendNewStateToAllPlayers();
	};

	attachListenersToPlayer = (player) => {
		const { socket } = player;
		socket.on("name", this.setName(player));
		socket.on("startGame", this.startGame);
		socket.on("removePlayer", this.removePlayerByName);
		socket.on("disconnect", this.removePlayer(player));
		socket.on("togglePause", this.togglePauseTimer);
	};

	setName = (newPlayer) => (name) => {
		if (!this.isNameTaken(name)) {
			newPlayer.name = name;
			newPlayer.nameStatus = "named";
		} else {
			newPlayer.nameStatus = "bad-name";
		}

		this.checkIfReady();

		this.sendNewStateToAllPlayers();
	};

	isNameTaken = (nameToCheck) =>
		this.players.reduce(
			(answer, player) => player.name === nameToCheck || answer,
			false
		);

	checkIfReady = () => {
		const everyoneHasName = this.players.reduce(
			(answer, player) => player.hasName() && answer,
			true
		);

		const isReady = everyoneHasName;

		this.status = isReady ? "lobby-ready" : "lobby-waiting";

		return isReady;
	};

	startGame = () => {
		if (this.status !== "lobby-ready") return;

		this.pickLocation();
		this.pickSpy();
		this.assignRoles();
		this.startTimer();

		this.status = "ingame";

		this.sendNewStateToAllPlayers();
	};

	pickLocation = () => {
		this.location = Locations.getRandomLocationFromPack("spyfall1");
		this.locationList = Locations.getLocationListFromPack("spyfall1");
	};

	pickSpy = () => {
		this.players[Math.floor(Math.random() * this.players.length)].role = "spy";
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
		this.timeLeft = this.settings.timeLimit;
		const timer = setInterval(() => {
			if (!this.timePaused) return;

			this.timeLeft--;

			if (this.timeLeft > 0) return;

			clearInterval(timer);
		}, 1000);
	};

	togglePauseTimer = () => {
		this.timePaused = !this.timePaused;
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
