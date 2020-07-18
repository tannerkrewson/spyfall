import React, { useEffect, useState, useContext } from "react";
import Router from "next/router";
import withDarkMode from "next-dark-mode";
import { NextDarkModeContext } from "next-dark-mode";

import Page from "../components/Page";

import { appWithTranslation } from "../utils/i18n";
import { initGA, logPageView } from "../utils/analytics";

function MyApp({ Component, pageProps }) {
	const {
		autoModeActive,
		autoModeSupported,
		darkModeActive,
		switchToAutoMode,
		switchToDarkMode,
		switchToLightMode,
	} = useContext(NextDarkModeContext);

	const [loading, setLoading] = useState(false);
	useEffect(() => {
		initGA();
		logPageView();

		const loadingStart = () => setLoading(true);
		const loadingStop = () => {
			logPageView();
			setLoading(false);
		};

		Router.events.on("routeChangeStart", loadingStart);
		Router.events.on("routeChangeComplete", loadingStop);

		return () => {
			Router.events.off("routeChangeStart", loadingStart);
			Router.events.off("routeChangeComplete", loadingStop);
		};
	}, []);

	const onThemeToggle = () =>
		darkModeActive ? switchToLightMode() : switchToDarkMode();

	return (
		<Page onThemeToggle={onThemeToggle} darkModeActive={darkModeActive}>
			<Component
				{...pageProps}
				loading={loading}
				onThemeToggle={onThemeToggle}
			/>
			{darkModeActive && (
				<style jsx global>{`
					body {
						background-color: #121212;
						color: white;
						transition: background-color 0.2s linear;
					}

					.footer,
					.language-list {
						color: #ddd;
					}
					button:hover,
					button:active,
					button:focus {
						color: white;
					}
					button:active {
						background-color: #555;
					}
					button {
						background-color: #222;
						color: white;
						border-color: #aaa;
						transition: background-color 0.2s linear;
					}

					input[type="text"],
					select,
					.box,
					.lobby-player-list > .player-box {
						border-color: #aaa !important;
						background-color: #333 !important;
						color: white !important;
					}
					.game-countdown {
						color: #ddd;
					}
					.spyfall-back {
						filter: invert(1);
					}
					.access-code,
					.access-code > span {
						color: #fff;
					}
					.box-striked {
						background-color: #333 !important;
						color: grey !important;
					}
				`}</style>
			)}
		</Page>
	);
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default withDarkMode(appWithTranslation(MyApp));
