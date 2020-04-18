const Player = require("./Player");

class Game {
	constructor(code) {
		this.code = code;
		this.players = [];
		this.status = "lobby-waiting";
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

		this.sendNewStateToAllPlayers();

		newPlayer.socket.on("name", this.setName(newPlayer));

		return newPlayer;
	}

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

	getState = () => ({
		code: this.code,
		players: this.getPlayers(),
		status: this.status,
	});

	getPlayers = () => this.players.map((player) => player.getInfo());
}

module.exports = Game;
