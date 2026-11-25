import { loadLocales, runWithLocale } from 'wuchale/load-utils/server';
import { key, loadCatalog, loadCount } from './locales/main.loader.server.svelte.js';
import { locales } from './locales/data.js';

await loadLocales(key, loadCount, loadCatalog, locales);

export const handle = async ({
	event,
	resolve
}: {
	event: unknown;
	resolve: (e: unknown) => Promise<Response>;
}) => {
	return runWithLocale('fr', () => resolve(event));
};
