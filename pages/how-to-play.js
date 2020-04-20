import React from "react";
import Link from "next/link";

import Page from "../components/Page";

const HowToPlay = () => {
	return (
		<Page>
			<div className="main-menu">
				<h3>How to Play Spyfall</h3>
				<hr />
				Testing 123
			</div>
			<Link href="/">
				<button>Back to Spyfall</button>
			</Link>
		</Page>
	);
};

export default HowToPlay;
