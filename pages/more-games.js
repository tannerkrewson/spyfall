import React from "react";
import Link from "next/link";

import Page from "../components/Page";

const MoreGames = () => {
	return (
		<>
			<div className="main-menu">
				<h3>Games Like Spyfall</h3>
				<hr />
				<div className="game">
					<a
						href="https://drawphone.tannerkrewson.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Drawphone
					</a>
					<div> by Tanner Krewson</div>
				</div>
				<div className="game">
					<a
						href="https://snakeout.tannerkrewson.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Snakeout
					</a>
					<div> by Tanner Krewson</div>
				</div>
				<div className="game">
					<a
						href="https://jackboxgames.com/games/"
						target="_blank"
						rel="noopener noreferrer"
					>
						The Jackbox Party Packs
					</a>
					<div> by Jackbox Games</div>
				</div>
				<div className="game">
					<a
						href="http://www.secrethitler.party/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Out of Context
					</a>
					<div> by Isaac Hirschfeld</div>
				</div>
				<div className="game">
					<a
						href="http://www.secrethitler.party/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Secret Hilter
					</a>
					<div> by Samuel Mak</div>
				</div>
			</div>
			<Link href="/">
				<button>Back to Spyfall</button>
			</Link>
			<style jsx>{`
				.game {
					margin-bottom: 1.2em;
					font-size: 0.9em;
				}
				a {
					font-size: 1.3em;
				}
			`}</style>
		</>
	);
};

export default MoreGames;
