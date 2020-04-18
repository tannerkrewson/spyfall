import Link from "next/link";
import Page from "../components/Page";

import { withTranslation } from "../i18n";

const Join = ({ t }) => (
	<Page>
		<div className="main-menu">
			<h4>{t("ui.welcome to spyfall")}</h4>

			<hr />

			<form id="join-game">
				<div>
					<input
						autocorrect="off"
						autocapitalize="off"
						type="text"
						id="access-code"
						name="accessCode"
						placeholder={t("ui.enter an access code")}
					/>
					<input
						type="text"
						id="player-name"
						name="playerName"
						placeholder={t("ui.enter your name")}
					/>

					<div className="button-container">
						<input type="submit" value={t("ui.join")} />
						<Link href="/">
							<button className="btn-back">{t("ui.back")}</button>
						</Link>
					</div>
				</div>
			</form>
		</div>
	</Page>
);

export default withTranslation("common")(Join);
