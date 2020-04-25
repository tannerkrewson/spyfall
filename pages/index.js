import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import BuyMe from "../components/BuyMe";

import { withTranslation } from "../utils/i18n";
import Loading from "../components/Loading";
import Swal from "sweetalert2";
import { lockedMessage } from "../utils/misc";
import AddAppButton from "../components/AddAppButton";

const Home = ({ t, i18n, loading }) => {
	const router = useRouter();
	const [newGameLoading, setNewGameLoading] = useState(false);
	const onNewGame = async (e) => {
		e.preventDefault();
		setNewGameLoading(true);

		try {
			const res = await fetch(window.location.origin + "/new", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name }),
			});

			if (res.status === 200) {
				const { gameCode } = await res.json();
				router.push("/" + gameCode);
			} else if (res.status === 423) {
				const { minutes } = await res.json();
				setNewGameLoading(false);

				Swal.fire(lockedMessage(minutes));
			} else {
				throw res.status + " " + res.statusText;
			}
		} catch (error) {
			console.error(error);
			Swal.fire(error);
			setNewGameLoading(false);
		}
	};

	const showSpyfallBack = i18n.language === "en";

	return (
		<div className="main-menu">
			<div
				style={{
					position: "relative",
					margin: "1em auto 0",
					width: "fit-content",
				}}
			>
				<h3>{t("ui.welcome to spyfall")}</h3>
				{showSpyfallBack && (
					<img className="spyfall-back" src="/back.svg" alt="back" />
				)}
				<div className="subtitle formerly">(formerly Meteor/Crabhat)</div>
			</div>
			<hr />

			{(loading || newGameLoading) && <Loading />}
			{!loading && (
				<>
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
						<AddAppButton />
						<Link href="/how-to-play">
							<button className="btn-small btn-vertical">How to Play</button>
						</Link>
						<Link href="/more-games">
							<button className="btn-small btn-vertical">
								Games Like Spyfall
							</button>
						</Link>
						<a
							href="https://github.com/tannerkrewson/spyfall/blob/dev/README.md#history"
							target="_blank"
							rel="noopener noreferrer"
							style={{ width: "100%" }}
						>
							<button className="btn-small btn-vertical">Crabhat?</button>
						</a>
						<a
							href="https://docs.google.com/forms/d/e/1FAIpQLSe0lIL4ZYxyKDNHqv25VkLqOg7tk2VhOcOA-yDAuYxKFx6kyw/viewform?usp=sf_link"
							target="_blank"
							rel="noopener noreferrer"
							style={{ width: "100%" }}
						>
							<button className="btn-small btn-vertical">
								Submit Feedback
							</button>
						</a>
						<div style={{ marginTop: "1em" }}>
							<BuyMe />
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default withTranslation("common")(Home);
