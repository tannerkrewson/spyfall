import React, { useState, useEffect } from "react";
import Router from "next/router";
import { withTranslation } from "../i18n";
import Swal from "sweetalert2";

import StrikeableBox from "./StrikeableBox";

const InGame = ({ t, gameState, socket }) => {
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
	const [showRole, setShowRole] = useState(true);

	useEffect(() => {
		let interval = null;
		if (!timePaused) {
			interval = setInterval(() => {
				if (timeLeft <= 0) {
					clearInterval(interval);
					setTimeLeft(0);
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

	const timeExpired = timeLeft <= 0;
	const minutesLeft = Math.floor(timeLeft / 60);
	const secondsLeft = ((timeLeft % 60) + "").padStart(2, "0");

	return (
		<div name="gameView">
			{settings.timeLimit !== 0 && (
				<>
					<h4>
						<a
							className={
								"game-countdown " +
								(timeExpired ? "finished " : " ") +
								(timePaused ? "paused" : "")
							}
							onClick={() => socket.emit("togglePause")}
						>
							{minutesLeft}:{secondsLeft}
						</a>
					</h4>
					{timePaused && <div className="red-text">Game paused</div>}
				</>
			)}

			<div className="status-container">
				<button
					className="btn-toggle-status"
					onClick={() => setShowRole(!showRole)}
				>
					{t("ui.show hide")}
				</button>

				{showRole && (
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
									<div className="current-location-name">
										{t(location.name)}
									</div>
								</div>

								<div className="current-role">
									<div className="current-role-header">
										{t("ui.your role")}:{" "}
									</div>
									<div className="current-role-name">{t(me.role)}</div>
								</div>
							</>
						)}
						{me.isFirst && (
							<div className="red-text">You will ask the first question.</div>
						)}
					</div>
				)}
			</div>

			<h5>{t("ui.players")}</h5>
			<ul className="ingame-player-list">
				{players.map((player) => (
					<StrikeableBox key={player.name}>
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
				{locationList.map((name) => (
					<StrikeableBox key={name}>{t(name)}</StrikeableBox>
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
