import React, { useState, useEffect } from "react";
import Router from "next/router";
import { withTranslation } from "../i18n";

const NameEntry = ({ t, onNameEntry, gameCode, socket }) => {
	const [name, setName] = useState("");

	// if dev game, pick random name and submit
	useEffect(() => {
		if (gameCode === "ffff") {
			const randFourDig = Math.floor(1000 + Math.random() * 9000);
			onNameEntry(randFourDig);
		}
	}, []);

	const handleNameChange = ({ target: { value } }) => setName(value);
	const handleJoin = (e) => {
		e.preventDefault();
		onNameEntry(name);
	};

	const handleBack = (e) => {
		e.preventDefault();

		//prevents a redirect back to /[gameCode]
		socket.off("disconnect");

		Router.push("/");
	};

	return (
		<div className="main-menu">
			<h4>{t("ui.welcome to spyfall")}</h4>

			<hr />
			<form id="join-game">
				<div>
					<input
						type="text"
						id="player-name"
						placeholder={t("ui.enter your name")}
						value={name}
						onChange={handleNameChange}
					/>

					<div className="button-container">
						<input type="submit" value={t("ui.join")} onClick={handleJoin} />
						<button className="btn-leave" onClick={handleBack}>
							{t("ui.back")}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default withTranslation("common")(NameEntry);
