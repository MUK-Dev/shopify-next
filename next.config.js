const { withFrameworkConfig } = require("./framework/common/config");

module.exports = withFrameworkConfig({
	reactStrictMode: true,
	i18n: {
		locales: ["en-US", "es"],
		defaultLocale: "en-US",
	},
	framework: {
		name: process.env.NEXT_PUBLIC_FRAMEWORK,
	},
});
