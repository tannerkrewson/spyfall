module.exports = function (server) {
	const io = server.io;
	const spyfall = server.spyfall;

	io.on("connection", (socket) => {
		socket.on("joinGame", ({ gameCode, previousName }) => {
			const theGame = spyfall.findGame(gameCode);
			if (theGame) {
				theGame.initPlayer(socket, previousName);
			} else {
				socket.emit("invalid", { gameCode });
			}
		});
	});
};
