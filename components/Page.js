import React from "react";
import Head from "next/head";

import "../styles/sanitize.css";
import "skeleton-css/css/skeleton.css";

import "../styles/styles.less";
import LanguageSelector from "./LanguageSelector";
import Footer from "./Footer";

const Page = ({ children, onThemeToggle, darkModeActive }) => {
	return (
		<>
			<Head>
				<title>Spyfall</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1"
				/>
				<meta
					name="google-site-verification"
					content="RjPwvAWbCuLI-PVrf0kdrN4cMCwTcy7nx85lTXTZsao"
				/>
			</Head>
			<div dir="ltr" className="container dir-ltr lang-en">
				<div className="main-content">
					{children}
					<hr />
					<button
						className="btn-small"
						onClick={onThemeToggle}
						style={{ marginBottom: "1.5em" }}
					>
						Switch to {darkModeActive ? "Light" : "Dark"} Mode
					</button>
					<LanguageSelector />
					<Footer />
				</div>
			</div>
		</>
	);
};

export default Page;
