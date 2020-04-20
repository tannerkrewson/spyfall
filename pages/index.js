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
				<div style={{ position: "relative" }}>
					<h3>{t("ui.welcome to spyfall")}</h3>
					<span className="spyfall-back">back</span>
				</div>
				<hr />

				<div className="button-container">
					<Link href="/join">
						<button id="btn-join-game" className="btn-large">
							{t("ui.join game")}
						</button>
					</Link>
					<button id="btn-new-game" onClick={onNewGame} className="btn-large">
						{t("ui.new game")}
					</button>
				</div>
				<div className="button-container-vertical">
					<button className="btn-small btn-vertical">How to Play</button>
					<button className="btn-small btn-vertical">Games Like Spyfall</button>
					<button className="btn-small btn-vertical">Crabhat?</button>
				</div>
			</div>
		</Page>
	);
};

export default withTranslation("common")(Home);
