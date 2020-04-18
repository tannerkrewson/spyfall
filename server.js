const express = require("express");
const next = require("next");
const nextI18NextMiddleware = require("next-i18next/middleware").default;
const Spyfall = require("./server/spyfall");

const nextI18next = require("./i18n");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
	await app.prepare();
	const server = express();

	var http = require("http").createServer(server);
	const io = require("socket.io")(http);
	server.io = io;

	server.spyfall = new Spyfall();

	require("./routes")(server);

	io.on("connection", (socket) => {
		console.log("a user connected");
	});

	await nextI18next.initPromise;
	server.use(nextI18NextMiddleware(nextI18next));

	server.get("*", (req, res) => handle(req, res));

	await server.listen(port);
	console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
