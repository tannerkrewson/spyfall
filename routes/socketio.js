module.exports = function (server) {
	const io = server.io;
	const spyfall = server.spyfall;

	io.on("connection", (socket) => {
		socket.on("joinGame", ({ gameCode }) => {
			const theGame = spyfall.findGame(gameCode);
			if (theGame) {
				theGame.addPlayer(socket);
			} else {
				socket.emit("invalid", { gameCode });
			}
		});
	});
};
