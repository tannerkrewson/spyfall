import { withTranslation } from "../i18n";
import Router from "next/router";
import Settings from "./Settings";

const Lobby = ({ t, gameState, socket }) => {
	const playerList = gameState.players.map((player) => ({
		...player,
		isMe: player.name === gameState.me.name,
	}));
	return (
		<>
			<h4>{t("ui.waiting for players")}</h4>

			<div className="access-code">
				{t("ui.access code")}: <span>{gameState.code}</span>
			</div>

			<hr />

			<ol className="lobby-player-list">
				{playerList.map((player, i) => (
					<li key={i} className="player-box">
						{player.name}
						{!player.name && <i>Joining...</i>}

						{player.isMe && (
							<a
								href="#"
								className="btn-edit-player"
								data-player-id="{{ _id }}"
								onClick={() => socket.emit("clearName")}
							>
								Edit name
							</a>
						)}
						{!player.isMe && (
							<a
								href="#"
								className="btn-remove-player"
								data-player-id="{{ _id }}"
								onClick={() => socket.emit("removePlayer", player.name)}
							>
								Remove player
							</a>
						)}
					</li>
				))}
			</ol>
			<br />
			<Settings gameState={gameState} socket={socket} />

			<div className="button-container">
				<button
					className="btn-start"
					onClick={() => socket.emit("startGame")}
					disabled={gameState.status !== "lobby-ready"}
				>
					{t("ui.start game")}
				</button>
				<button
					className="btn-leave"
					onClick={() => {
						//prevents a redirect back to /[gameCode]
						socket.off("disconnect");

						Router.push("/");
					}}
				>
					{t("ui.leave game")}
				</button>
			</div>
		</>
	);
};

export default withTranslation("common")(Lobby);
