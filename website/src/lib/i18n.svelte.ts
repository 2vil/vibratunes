import { loadLocale } from 'wuchale/load-utils';
import { locales, type Locale } from '../locales/data.js';

// @wc-ignore
export const LOCALE_LABELS: Record<Locale, { code: string; label: string }> = {
	fr: { code: 'FR', label: 'Français' },
	en: { code: 'EN', label: 'English' },
	es: { code: 'ES', label: 'Español' },
	ln: { code: 'LN', label: 'Lingála' }
};

const STORAGE_KEY = 'vibratunes-locale';

class LocaleState {
	current = $state<Locale>('fr');
}

export const localeState = new LocaleState();

export function detectInitialLocale(): Locale {
	if (typeof window === 'undefined') return 'fr';
	const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
	if (saved && locales.includes(saved)) return saved;
	const nav = navigator.language.toLowerCase().split('-')[0] as Locale;
	if (locales.includes(nav)) return nav;
	return 'fr';
}

export async function setLocale(locale: Locale): Promise<void> {
	await loadLocale(locale);
	localeState.current = locale;
	if (typeof window !== 'undefined') {
		localStorage.setItem(STORAGE_KEY, locale);
		document.documentElement.lang = locale;
	}
}
