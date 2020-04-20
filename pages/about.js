import React from "react";
import Link from "next/link";

import Page from "../components/Page";

const About = () => {
	return (
		<Page>
			<div className="main-menu">
				<h3>About Spyfall</h3>
				<hr />
				Testing 123
			</div>
			<Link href="/">
				<button>Back to Spyfall</button>
			</Link>
		</Page>
	);
};

export default About;
