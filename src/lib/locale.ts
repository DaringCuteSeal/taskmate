import i18next from "i18next";
import { createI18nStore } from "svelte-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18next
	.use(LanguageDetector)
	.use(HttpBackend)
	.init({
		lng: 'en',
		interpolation: {
			escapeValue: false,
		},
		backend: {
			loadPath: "/locales/{{lng}}.json",
		},

	});

export default () => createI18nStore(i18next);
