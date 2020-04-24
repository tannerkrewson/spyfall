const Game = require("./Game");

class Spyfall {
	constructor(isDevMode) {
		this.games = [];
		this.locked = false;
		this.minutesUntilRestart;
		if (isDevMode) {
			this.newGame("ffff");
		}
	}

	newGame(code) {
		if (this.locked) return false;

		const theCode = code || this.generateCode();
		const theGame = new Game(
			theCode,
			() => this.removeGame(theCode),
			() => this.minutesUntilRestart
		);
		this.games.push(theGame);

		console.log(theCode, "created");

		return theGame;
	}

	findGame = (gameCode) => this.games.find(({ code }) => code === gameCode);

	removeGame = (gameCode) => {
		this.games.splice(
			this.games.findIndex(({ code }) => code === gameCode),
			1
		);
		console.log(gameCode, "removed");
	};

	generateCode() {
		const possible = "abcdefghijklmnopqrstuvwxyz";

		let code;
		do {
			//generate 4 letter code
			code = "";
			for (var i = 0; i < 4; i++) {
				code += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			//make sure the code is not already in use
		} while (this.findGame(code) && code !== "join" && code !== "ffff");
		return code;
	}

	lock = () => {
		this.locked = true;
		this.games.forEach((game) => (game.locked = true));

		this.minutesUntilRestart = 12;

		const interval = setInterval(() => {
			this.minutesUntilRestart--;
			if (this.minutesUntilRestart <= 0) {
				clearInterval(interval);
			}
		}, 1000 * 60); // every minute
	};
}

module.exports = Spyfall;
