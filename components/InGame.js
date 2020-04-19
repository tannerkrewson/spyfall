import { withTranslation } from "../i18n";

import StrikeableBox from "./StrikeableBox";

const InGame = ({ t, gameState }) => {
	console.log(gameState);

	const { me, location, locationList, status, players } = gameState;
	const timeRemaining = "12:34";
	const gamePaused = true;
	const isSpy = me.role === "spy";
	const isFirstPlayer = true;
	return (
		<div name="gameView">
			<h4>
				<a className="game-countdown finished paused">{timeRemaining}</a>
			</h4>
			{gamePaused && <div className="red-text"></div>}

			<div className="status-container">
				<button className="btn-toggle-status">{t("ui.show hide")}</button>

				<div className="status-container-content">
					{isSpy && (
						<div className="player-status player-status-spy">
							{t("ui.you are the spy")}
						</div>
					)}
					{!isSpy && (
						<>
							<div className="player-status player-status-not-spy">
								{t("ui.you are not the spy")}
							</div>

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
			</div>

			<h5>{t("ui.players")}</h5>
			<ul className="ingame-player-list">
				{players.map((player) => (
					<StrikeableBox>
						{player.name}
						{isFirstPlayer && (
							<div className="first-player-indicator">{t("ui.first")}</div>
						)}
					</StrikeableBox>
				))}
			</ul>

			<div className="u-cf"></div>

			<h5>{t("ui.location reference")}</h5>
			<ul className="location-list">
				{locationList.map((name) => (
					<StrikeableBox>{t(name)}</StrikeableBox>
				))}
			</ul>

			<hr />

			<div className="button-container">
				<button className="btn-end">{t("ui.end game")}</button>
				<button className="btn-leave">{t("ui.leave game")}</button>
			</div>
		</div>
	);
};

export default withTranslation("common")(InGame);
