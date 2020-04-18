import Link from "next/link";
import { useRouter } from "next/router";
import Page from "../components/Page";

import { withTranslation } from "../i18n";

const Game = ({ t }) => {
	const router = useRouter();
	const { gameCode } = router.query;

	return (
		<Page>
			<div>game code is {gameCode}</div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</Page>
	);
};

export default withTranslation("common")(Game);
