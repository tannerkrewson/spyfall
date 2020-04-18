import Page from "../components/Page";

import { withTranslation } from "../i18n";

const Home = ({ t }) => (
	<Page>
		<div className="main-menu">
			<h4>{t("ui.welcome to spyfall")}</h4>

			<hr />

			<div className="button-container">
				<button id="btn-new-game">{t("ui.new game")}</button>
				<button id="btn-join-game">{t("ui.join game")}</button>
			</div>

			<hr />
		</div>
	</Page>
);

export default withTranslation("common")(Home);
