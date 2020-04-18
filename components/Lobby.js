import { withTranslation } from "../i18n";

const Lobby = ({ t, gameState }) => {
	return (
		<>
			<h4>{t("ui.waiting for players")}</h4>

			<div className="access-code">
				{t("ui.access code")}
				<span>{gameState.code}</span>
			</div>

			<hr />

			<ol className="lobby-player-list">
				{gameState.players.map((player) => (
					<li>
						{player.name}

						{gameState.me.name === player.name && (
							<a
								href="#"
								className="btn-edit-player"
								data-player-id="{{ _id }}"
							>
								<i className="fa fa-pencil"></i>
							</a>
						)}
						{gameState.me.name !== player.name && (
							<a
								href="#"
								className="btn-remove-player"
								data-player-id="{{ _id }}"
							>
								<i className="fa fa-close"></i>
							</a>
						)}
					</li>
				))}
			</ol>

			<hr />

			<div className="button-container">
				<button className="btn-start">{t("ui.start game")}</button>
				<button className="btn-leave">{t("ui.leave game")}</button>
			</div>
		</>
	);
};

export default withTranslation("common")(Lobby);
