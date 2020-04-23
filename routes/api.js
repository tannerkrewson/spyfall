module.exports = function (server) {
	const spyfall = server.spyfall;

	server.post("/new", function (req, res) {
		if (spyfall.locked) {
			// 423 Locked
			return res.status(423).send({ minutes: spyfall.minutesUntilRestart });
		}
		const theGame = spyfall.newGame();
		res.json({ gameCode: theGame.code });
	});

	server.post("/lock", function (req, res) {
		if (!process.env.ADMIN_PASSWORD) {
			res.status(501).end();
		}

		if (req.body.password === process.env.ADMIN_PASSWORD) {
			spyfall.lock();
			res.status(200).end();
		} else {
			res.status(401).end();
		}
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
