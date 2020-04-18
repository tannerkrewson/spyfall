import Link from "next/link";
import Page from "../components/Page";

import { withTranslation } from "../i18n";

const New = ({ t }) => (
	<Page>
		<div className="main-menu">
			<h4>{t("ui.welcome to spyfall")}</h4>
			<hr />
			<form id="create-game">
				<div>
					<input
						type="text"
						id="player-name"
						name="playerName"
						placeholder={t("ui.enter your name")}
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

export default withTranslation("common")(New);
