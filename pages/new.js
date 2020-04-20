import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import Page from "../components/Page";

import { withTranslation } from "../i18n";

const New = ({ t }) => {
	const router = useRouter();
	const [name, setName] = useState("");

	const onNewGame = async (e) => {
		e.preventDefault();

		try {
			const rawResponse = await fetch(window.location.origin + "/new", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name }),
			});
			const content = await rawResponse.json();
			router.push("/" + content.gameCode);
		} catch (error) {
			console.error(error);
			alert(error);
		}
	};

	return (
		<Page>
			<div className="main-menu">
				<h3>{t("ui.welcome to spyfall")}</h3>
				<hr />
				<form id="create-game" onSubmit={onNewGame}>
					<div>
						<input
							type="text"
							id="player-name"
							name="playerName"
							placeholder={t("ui.enter your name")}
							value={name}
							onChange={({ target: { value } }) => setName(value)}
						/>
						<br />
						<label for="location1">
							<input
								type="radio"
								id="location1"
								name="locationRadio"
								value="location1"
								checked="checked"
							/>
							Use Spyfall 1 Locations
						</label>
						<label for="location2">
							<input
								type="radio"
								id="location2"
								name="locationRadio"
								value="location2"
							/>
							Use Spyfall 2 Locations
						</label>
						<label for="locationBoth">
							<input
								type="radio"
								id="locationBoth"
								name="locationRadio"
								value="locationBoth"
							/>
							Use Both Locations
						</label>
						<label for="round-minutes">
							Round Length (in minutes):{" "}
							<input
								className="round-length"
								type="text"
								id="round-minutes"
								name="roundMinutes"
								value="8"
								size="2"
								maxlength="2"
							/>
						</label>
						<div className="button-container">
							<input type="submit" value={t("ui.create game")} />
							<Link href="/">
								<button className="btn-back">{t("ui.back")}</button>
							</Link>
						</div>
					</div>
				</form>
			</div>
		</Page>
	);
};

export default withTranslation("common")(New);
