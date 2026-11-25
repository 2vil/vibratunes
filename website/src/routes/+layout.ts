import { loadLocale } from 'wuchale/load-utils';
import '../locales/main.loader.svelte.js';
import { detectInitialLocale, localeState } from '$lib/i18n.svelte.js';

export const prerender = true;

export const load = async () => {
	const browser = typeof window !== 'undefined';
	const locale = browser ? detectInitialLocale() : 'fr';
	await loadLocale(locale);
	localeState.current = locale;
	if (browser) {
		document.documentElement.lang = locale;
	}
	return { locale };
};
