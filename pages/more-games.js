import React from "react";
import Link from "next/link";

import Page from "../components/Page";

const MoreGames = () => {
	return (
		<>
			<div className="main-menu">
				<h3>Games Like Spyfall</h3>
				<hr />
				<GameLink
					title="Drawphone"
					subtitle="by Tanner Krewson"
					link="https://drawphone.tannerkrewson.com/"
				/>

				<GameLink
					title="Codewords"
					subtitle="by Joshua Porter"
					featuring="Based on Codenames"
					link="https://codewords.tv/"
				/>

				<GameLink
					title="Fake Artist Online"
					subtitle="by Gideon Wong"
					featuring="Based on A Fake Artist Goes to New York"
					link="https://kc-fakeartistonline.herokuapp.com/"
				/>

				<GameLink
					title="The Jackbox Party Packs"
					subtitle="by Jackbox Games"
					link="https://jackboxgames.com/games/"
				/>

				<GameLink
					title="netgames.io"
					subtitle="by Luke Tsekouras"
					featuring="ft. Werewolf, Love Letter, Avalon & more"
					link="https://netgames.io/"
				/>

				<GameLink
					title="Out of Context"
					subtitle="by Isaac Hirschfeld"
					link="https://www.outofcontext.party/"
				/>

				<GameLink
					title="Secret Hilter"
					subtitle="by Samuel Mak"
					link="http://www.secrethitler.party/"
				/>

				<GameLink
					title="QwiqWit"
					featuring="Based on Quiplash"
					link="https://www.qwiqwit.com/"
				/>

				<GameLink
					title="Snakeout"
					subtitle="by Tanner Krewson"
					featuring="Based on The Resistance"
					link="https://snakeout.tannerkrewson.com/"
				/>
			</div>
			<Link href="/">
				<button>Back to Spyfall</button>
			</Link>
		</>
	);
};

const GameLink = ({ title, link, subtitle, featuring }) => (
	<div className="game">
		<a href={link} target="_blank" rel="noopener noreferrer">
			{title}
		</a>
		{featuring && <div>{featuring}</div>}
		<div>
			<i>{subtitle}</i>
		</div>

		<style jsx>{`
			.game {
				margin-bottom: 1.2em;
				font-size: 0.9em;
			}
			a {
				font-size: 1.3em;
			}
		`}</style>
	</div>
);

export default MoreGames;
