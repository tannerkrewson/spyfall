import React from "react";
import Head from "next/head";

import "../styles/sanitize.css";
import "skeleton-css/css/skeleton.css";

import "../styles/styles.less";
import LanguageSelector from "./LanguageSelector";
import Footer from "./Footer";

const Page = ({ children }) => (
	<>
		<Head>
			<title>Spyfall</title>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, maximum-scale=1"
			/>
		</Head>
		<div dir="ltr" className="container dir-ltr lang-en">
			<div className="main-content">
				{children}
				<hr />
				<LanguageSelector />
				<Footer />
			</div>
		</div>
	</>
);

export default Page;
