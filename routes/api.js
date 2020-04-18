module.exports = function (server) {
	const spyfall = server.spyfall;

	server.post("/new", function (req, res) {
		const theGame = spyfall.newGame();
		res.json({ gameCode: theGame.code });
	});
};
