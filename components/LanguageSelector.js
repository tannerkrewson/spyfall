import React, { useState } from "react";

import { i18n, withTranslation } from "../utils/i18n";
import allLanguages from "../public/static/locales/_all_languages.json";

const LanguageSelector = ({ t }) => {
	const [lang, setLang] = useState("en");

	const onLanguageChange = (langCode) => {
		setLang(langCode);
		i18n.changeLanguage(langCode);
	};

	return (
		<div dir="ltr" className="languages">
			<select
				className="language-select"
				value={lang}
				onChange={(e) => onLanguageChange(e.target.value)}
			>
				{Object.keys(allLanguages).map((code) => (
					<option key={code} value={code}>
						{allLanguages[code]}
					</option>
				))}
			</select>
			<ul className="language-list">
				{Object.keys(allLanguages).map((code) => (
					<li key={code}>
						<a
							className="btn-set-language"
							href="#"
							data-language="code"
							onClick={() => onLanguageChange(code)}
						>
							{allLanguages[code]}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default withTranslation("common")(LanguageSelector);
