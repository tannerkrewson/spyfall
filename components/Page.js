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
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1"
				/>
				<meta name="description" content="By Tanner Krewson" />
				<meta name="keywords" content="crabhat, app, online, spyfall 2" />
				<meta
					name="google-site-verification"
					content="RjPwvAWbCuLI-PVrf0kdrN4cMCwTcy7nx85lTXTZsao"
				/>
				<meta name="apple-mobile-web-app-title" content="Spyfall" />
				<meta name="application-name" content="Spyfall" />
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta name="theme-color" content="#ffffff" />
				<title>Spyfall</title>

				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#555555" />
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
