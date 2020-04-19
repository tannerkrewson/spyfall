import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

import { useRouter } from "next/router";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import Page from "../components/Page";

import { withTranslation } from "../i18n";
import NameEntry from "../components/NameEntry";
import Lobby from "../components/Lobby";
import InGame from "../components/InGame";

const socket = socketIOClient();

const Game = ({ t }) => {
	const router = useRouter();
	const { gameCode } = router.query;

	const [gameState, setGameState] = useState({
		status: "loading",
	});

	useEffect(() => {
		const { previousGameCode, previousName } = parseCookies();

		if (previousGameCode === gameCode && previousName) {
			socket.emit("joinGame", { gameCode, previousName });
		} else {
			socket.emit("joinGame", { gameCode });
		}

		socket.on("gameChange", (newGameState) => {
			setGameState(newGameState);

			// setting disconnect handler after game has been joined,
			// or else it will cause an infinite loop with the invalid handler
			socket.on("disconnect", () => router.push("/" + gameCode));
		});
		socket.on("invalid", () => router.push("/join?invalid=" + gameCode));

		return function cleanup() {
			socket.close();
			setGameState({ status: "disconnected?" });
		};
	}, []);

	const onNameEntry = (name) => {
		socket.emit("name", name);
		setCookie(null, "previousGameCode", gameCode);
		setCookie(null, "previousName", name);
	};

	const { status, me } = gameState;

	const showLoading = status === "loading";
	const showNameEntry = !showLoading && !me.name;
	const showLobby = !showNameEntry && status.startsWith("lobby");
	const showGame = status === "ingame";

	return (
		<Page>
			{showLoading && <div>Loading...</div>}
			{showNameEntry && (
				<NameEntry
					onNameEntry={onNameEntry}
					gameCode={gameState.code}
					socket={socket}
				/>
			)}
			{showLobby && <Lobby gameState={gameState} socket={socket} />}
			{showGame && <InGame gameState={gameState} socket={socket} />}
		</Page>
	);
};

export default withTranslation("common")(Game);
