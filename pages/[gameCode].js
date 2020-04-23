import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import socketIOClient from "socket.io-client";
import Swal from "sweetalert2";
import { parseCookies, setCookie } from "nookies";

import { withTranslation } from "../utils/i18n";
import NameEntry from "../components/NameEntry";
import Lobby from "../components/Lobby";
import InGame from "../components/InGame";
import Loading from "../components/Loading";
import { lockedMessage } from "../utils/misc";

const socket = socketIOClient();

const Game = ({ t, loading }) => {
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
			if (gameCode !== "ffff") {
				socket.on("disconnect", () => router.push("/" + gameCode));
			}
		});
		socket.on("invalid", () => router.push("/join?invalid=" + gameCode));
		socket.on("badName", () => Swal.fire("Name already in use"));
		socket.on("lockedWarning", (minutes) =>
			Swal.fire(lockedMessage(minutes)).then(() => router.push("/"))
		);

		return function cleanup() {
			socket.close();
			setGameState({ status: "loading" });
		};
	}, []);

	const onNameEntry = (name) => {
		socket.emit("name", name);
		setCookie(null, "previousGameCode", gameCode);
		setCookie(null, "previousName", name);
	};

	const { status, me } = gameState;

	const showLoading = status === "loading" || loading;
	const showNameEntry = !showLoading && !me.name;
	const showLobby = !showNameEntry && status.startsWith("lobby");
	const showGame = !showNameEntry && status === "ingame";

	return (
		<>
			{showLoading && (
				<>
					<h3>{t("ui.waiting for players")}</h3>
					<Loading />
				</>
			)}
			{!showLoading && (
				<>
					{showNameEntry && (
						<NameEntry
							onNameEntry={onNameEntry}
							gameCode={gameState.code}
							socket={socket}
						/>
					)}
					{showLobby && <Lobby gameState={gameState} socket={socket} />}
					{showGame && <InGame gameState={gameState} socket={socket} />}
				</>
			)}
		</>
	);
};

export default withTranslation("common")(Game);
