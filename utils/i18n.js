const NextI18Next = require("next-i18next").default;
const path = require("path");

const allLanguages = require("../public/static/locales/_all_languages.json");
const allLangCodes = Object.keys(allLanguages);

module.exports = new NextI18Next({
	otherLanguages: allLangCodes,
	localeStructure: "{{lng}}.i18n",
	localePath: path.resolve("./public/static/locales"),
});
