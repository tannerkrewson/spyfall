const withCSS = require("@zeit/next-css");
const withLess = require("@zeit/next-less");
const withPWA = require("next-pwa");
module.exports = withCSS(
	withLess(
		withPWA({
			pwa: {
				dest: "public",
			},
		})
	)
);
