import React, { useState, useEffect } from "react";
import Router from "next/router";
import { withTranslation } from "../utils/i18n";
import Swal from "sweetalert2";

import StrikeableBox from "./StrikeableBox";
import { logEvent } from "../utils/analytics";
import AccessCode from "./AccessCode";
import HideableContainer from "./HideableContainer";

const InGame = ({ t, i18n, gameState, socket }) => {
	const {
		me,
		location,
		locationList,
		players,
		timeLeft: latestServerTimeLeft,
		timePaused,
		settings,
	} = gameState;

	const [timeLeft, setTimeLeft] = useState(latestServerTimeLeft);

	useEffect(() => {
		logEvent("player-roundCount", gameState.currentRoundNum + 1);
		logEvent("player-language", i18n.language);
	}, []);

	useEffect(() => {
		let interval = null;
		if (!timePaused) {
			interval = setInterval(() => {
				if (timeLeft <= 0) {
					clearInterval(interval);
					setTimeLeft(0);
					if (gameState.players[0].name === me.name) {
						logEvent("timerExpired", true);
					}
					return;
				}
				setTimeLeft((timeLeft) => timeLeft - 1);
			}, 1000);
		} else if (timePaused && timeLeft !== 0) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [timePaused, timeLeft]);

	useEffect(() => setTimeLeft(latestServerTimeLeft), [latestServerTimeLeft]);

	const isSpy = me.role === "spy";
	const firstPlayer = players.find((player) => player.isFirst);

	const timeExpired = timeLeft <= 0;
	const minutesLeft = Math.floor(timeLeft / 60);
	const secondsLeft = ((timeLeft % 60) + "").padStart(2, "0");
	const showTapToPause = !timePaused && timeLeft > 0;

	const handleTogglePause = () => {
		if (timeExpired) return;

		socket.emit("togglePause");
		logEvent("togglePause", true);
	};

	return (
		<div name="gameView" style={{ userSelect: "none" }}>
			{settings.timeLimit !== 0 && (
				<div style={{ marginBottom: "1em" }} onClick={handleTogglePause}>
					<h4
						className={
							"game-countdown " +
							(timeExpired ? "finished " : " ") +
							(timePaused ? "paused" : "")
						}
						style={{ marginBottom: "0.25em" }}
					>
						{minutesLeft}:{secondsLeft}
					</h4>
					<div>
						{timePaused && <div className="red-text">Game paused</div>}
						{showTapToPause && <div className="subtitle">Tap to pause</div>}
					</div>
				</div>
			)}

			<AccessCode code={gameState.code} />

			<HideableContainer title={"Your Role"} initialHidden={false}>
				<div className="status-container-content">
					{isSpy && (
						<div className="player-status player-status-spy">
							{t("ui.you are the spy")}
						</div>
					)}
					{!isSpy && (
						<>
							<div
								className="player-status player-status-not-spy"
								dangerouslySetInnerHTML={{
									__html: t("ui.you are not the spy"),
								}}
							></div>

							<div className="current-location">
								<div className="current-location-header">
									{t("ui.the location")}:{" "}
								</div>
								<div className="current-location-name">{t(location.name)}</div>
							</div>

							<div className="current-role">
								<div className="current-role-header">{t("ui.your role")}: </div>
								<div className="current-role-name">{t(me.role)}</div>
							</div>
						</>
					)}
				</div>
			</HideableContainer>

			{me.isFirst && (
				<div className="red-text">You will ask the first question.</div>
			)}
			{!me.isFirst && (
				<div>The first question will be asked by {firstPlayer.name}.</div>
			)}

			<h5>{t("ui.players")}</h5>
			<ul className="ingame-player-list">
				{players.map((player, i) => (
					<StrikeableBox key={i}>
						{player.name && player.name}
						{!player.name && <i>Joining...</i>}
						{player.isFirst && (
							<div
								className="first-player-indicator"
								dangerouslySetInnerHTML={{ __html: t("ui.first") }}
							></div>
						)}
						{!player.connected && <i> (Disconnected)</i>}
					</StrikeableBox>
				))}
			</ul>

			<div className="u-cf"></div>

			<h5>{t("ui.location reference")}</h5>
			<ul className="location-list">
				{locationList.map((name, i) => (
					<StrikeableBox key={i}>{t(name)}</StrikeableBox>
				))}
			</ul>

			<div className="button-container">
				<button
					className="btn-end"
					onClick={() =>
						popup(t("ui.end game"), t("ui.back"), () => socket.emit("endGame"))
					}
				>
					{t("ui.end game")}
				</button>
				<button
					className="btn-leave"
					onClick={() =>
						popup(t("ui.leave game"), t("ui.back"), () => {
							//prevents a redirect back to /[gameCode]
							socket.off("disconnect");

							Router.push("/");
						})
					}
				>
					{t("ui.leave game")}
				</button>
			</div>
		</div>
	);
};

const popup = (yesText, noText, onYes) =>
	Swal.fire({
		title: "Are you sure?",
		icon: "warning",
		showCancelButton: true,
		confirmButtonText: yesText,
		cancelButtonText: noText,
	}).then((result) => {
		if (result.value) {
			onYes();
		}
	});

export default withTranslation("common")(InGame);
