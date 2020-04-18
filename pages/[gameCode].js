import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

import Link from "next/link";
import { useRouter } from "next/router";
import Page from "../components/Page";

import { withTranslation } from "../i18n";
import NameEntry from "../components/NameEntry";
import Lobby from "../components/Lobby";

const socket = socketIOClient();

const Game = ({ t }) => {
	const router = useRouter();
	const { gameCode } = router.query;

	const [gameState, setGameState] = useState({
		status: "loading",
	});

	useEffect(() => {
		socket.emit("joinGame", { gameCode });
		socket.on("gameChange", (newGameState) => setGameState(newGameState));
		socket.on("disconnect", () => router.push("/" + gameCode));

		return function cleanup() {
			socket.close();
			setGameState({ status: "disconnected?" });
		};
	}, []);

	const onNameEntry = (name) => socket.emit("name", name);

	const { status, me: { nameStatus: myNameStatus = "" } = {} } = gameState;

	const showLoading = status === "loading";
	const showNameEntry = !showLoading && myNameStatus !== "named";
	const showLobby = !showNameEntry && status.startsWith("lobby");
	const showGame = status === "ingame";

	return (
		<Page>
			{showLoading && <div>Loading...</div>}
			{showNameEntry && (
				<NameEntry
					onNameEntry={onNameEntry}
					nameStatus={myNameStatus}
					gameCode={gameState.code}
				/>
			)}
			{showLobby && <Lobby gameState={gameState} socket={socket} />}
			{showGame && (
				<div>
					in game!
					<br />
					{JSON.stringify(gameState)}
				</div>
			)}
		</Page>
	);
};

export default withTranslation("common")(Game);
