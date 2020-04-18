const Game = require("./Game");

class Spyfall {
	constructor() {
		this.games = [];
	}

	newGame() {
		const theCode = this.generateCode();
		const theGame = new Game(theCode);
		this.games.push(theGame);
		return theGame;
	}

	findGame = (gameCode) => this.games.find(({ code }) => code === gameCode);

	removeGame = (gameCode) =>
		this.games.splice(
			this.games.findIndex(({ code }) => code === gameCode),
			1
		);

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
		} while (this.findGame(code) && code !== "join");
		return code;
	}
}

module.exports = Spyfall;
