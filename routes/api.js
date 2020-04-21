module.exports = function (server) {
	const spyfall = server.spyfall;

	server.post("/new", function (req, res) {
		const theGame = spyfall.newGame();
		res.json({ gameCode: theGame.code });
	});

	server.get("/stats", (req, res) => {
		res.json({
			numberOfConnectedUsers: server.io.engine.clientsCount,
			games: spyfall.games.map((game) => ({
				numberOfPlayers: game.players.length,
				inProgress: game.status === "ingame",
				roundsPlayed: game.currentRoundNum,
			})),
		});
	});
};
