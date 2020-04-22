import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Page from "../components/Page";

import { withTranslation } from "../utils/i18n";

const Join = ({ t }) => {
	const router = useRouter();
	const invalidCode = router.query.invalid;

	const [gameCode, setGameCode] = useState("");
	return (
		<div className="main-menu">
			<h3>{t("ui.welcome to spyfall")}</h3>

			<hr />

			<form id="join-game">
				{invalidCode && (
					<div
						className="alert alert-error alert-danger alert-dismissable"
						role="alert"
					>
						{invalidCode}: {t("ui.invalid access code")}
					</div>
				)}
				<div>
					<label htmlFor="access-code">{t("ui.enter an access code")}</label>
					<input
						autoCorrect="off"
						autoCapitalize="off"
						type="text"
						id="access-code"
						name="accessCode"
						placeholder="abcd"
						onChange={({ target: { value } }) => setGameCode(value)}
						autoFocus
					/>

					<div className="button-container">
						<Link href="/">
							<button>{t("ui.back")}</button>
						</Link>
						<Link href={"/" + gameCode}>
							<button>{t("ui.join")}</button>
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default withTranslation("common")(Join);
