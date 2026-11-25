// @ts-check
import { defineConfig } from 'wuchale';
import { adapter as svelte } from '@wuchale/svelte';

export default defineConfig({
	locales: ['fr', 'en', 'es', 'ln'],
	localesDir: './src/locales',
	ai: null,
	adapters: {
		main: svelte({
			loader: 'sveltekit'
		})
	}
});
