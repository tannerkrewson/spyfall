import React from "react";

import "../styles/normalize.css";
import "../styles/skeleton.css";
import "../styles/styles.less";
import LanguageSelector from "./LanguageSelector";
import Footer from "./Footer";

const Page = ({ children }) => (
	<div dir="ltr" className="container dir-ltr lang-en">
		<div className="main-content">
			{children}
			<LanguageSelector />
			<Footer />
		</div>
	</div>
);

export default Page;
