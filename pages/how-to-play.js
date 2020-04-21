import React from "react";
import Link from "next/link";

import Page from "../components/Page";

const HowToPlay = () => {
	return (
		<>
			<div className="main-menu">
				<h3>How to Play Spyfall</h3>
				<hr />
				<div>
					<p>
						Spyfall is based off the board game of the same name, so if you've
						played that before, you'll understand Spyfall.
					</p>
					<p>
						In my opinion, the easiest way to learn how to play Spyfall would be
						to watch someone else play, as it will help you get a feel for the
						dynamic of the game. Here's a video on YouTube of some people
						playing:
					</p>
					<div style={{ textAlign: "center" }}>
						<iframe
							src="https://www.youtube.com/embed/O7W0rH6YpeI"
							className="embed-responsive-item"
						/>
					</div>
					<br />
					<p>
						If you want a little more detail, you can read the full official
						rulebook of the board game version of Spyfall{" "}
						<a
							href="https://www.cryptozoic.com/sites/default/files/icme/u30695/spy_rules_eng_0.pdf"
							target="_blank"
							rel="noopener noreferrer"
						>
							here
						</a>
						.
					</p>

					<style jsx>{`
						text-align: left;
					`}</style>
				</div>
			</div>
			<Link href="/">
				<button>Back to Spyfall</button>
			</Link>
		</>
	);
};

export default HowToPlay;
