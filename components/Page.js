import React from "react";

import "../styles/normalize.css";
import "../styles/skeleton.css";
import "../styles/styles.less";

const Page = ({ children }) => (
	<div dir="ltr" className="container dir-ltr lang-en">
		<div className="main-content">{children}</div>
	</div>
);

export default Page;
