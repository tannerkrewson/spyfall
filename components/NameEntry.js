import React, { useState, useEffect } from "react";
import Router from "next/router";
import { withTranslation } from "../utils/i18n";

const NameEntry = ({ t, onNameEntry, gameCode, socket }) => {
	const [name, setName] = useState("");

	// if dev game, pick random name and submit
	useEffect(() => {
		if (gameCode === "ffff") {
			const randFourDig = Math.floor(1000 + Math.random() * 9000);
			onNameEntry(String(randFourDig));
		}
	}, []);

	const handleNameChange = ({ target: { value } }) => setName(value);
	const handleJoin = (e) => {
		if (e) e.preventDefault();
		onNameEntry(name);
	};

	const handleBack = (e) => {
		e.preventDefault();

		//prevents a redirect back to /[gameCode]
		socket.off("disconnect");

		Router.push("/");
	};

	const onEnter = (e) => {
		if (e.key !== "Enter") return;

		handleJoin();
	};

	return (
		<div className="main-menu">
			<h3>{t("ui.waiting for players")}</h3>

			<hr />

			<div>
				<label htmlFor="player-name">{t("ui.enter your name")}</label>
				<input
					type="text"
					id="player-name"
					placeholder="Use your real name!"
					value={name}
					onChange={handleNameChange}
					autoFocus
					onKeyDown={onEnter}
					maxLength={24}
				/>

				<div className="button-container">
					<button className="btn-leave" onClick={handleBack}>
						{t("ui.back")}
					</button>
					<button type="submit" onClick={handleJoin}>
						{t("ui.join")}
					</button>
				</div>
			</div>
		</div>
	);
};

export default withTranslation("common")(NameEntry);
