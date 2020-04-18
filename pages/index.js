import Link from "next/link";
import Router, { useRouter } from "next/router";
import Page from "../components/Page";

import { withTranslation } from "../i18n";

const Home = ({ t }) => {
	const router = useRouter();
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
				<h4>{t("ui.welcome to spyfall")}</h4>

				<hr />

				<div className="button-container">
					<button id="btn-new-game" onClick={onNewGame}>
						{t("ui.new game")}
					</button>

					<Link href="/join">
						<button id="btn-join-game">{t("ui.join game")}</button>
					</Link>
				</div>

				<hr />
			</div>
		</Page>
	);
};

export default withTranslation("common")(Home);
