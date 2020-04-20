import React, { useEffect, useState } from "react";
import Router from "next/router";

import { appWithTranslation } from "../i18n";

function MyApp({ Component, pageProps }) {
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const loadingStart = () => setLoading(true);
		const loadingStop = () => setLoading(false);

		Router.events.on("routeChangeStart", loadingStart);
		Router.events.on("routeChangeComplete", loadingStop);

		return () => {
			Router.events.off("routeChangeStart", loadingStart);
			Router.events.off("routeChangeComplete", loadingStop);
		};
	}, []);
	return <Component {...pageProps} loading={loading} />;
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

export default appWithTranslation(MyApp);
