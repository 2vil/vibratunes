<script lang="ts">
	// One crisp QR for the pairing/invite strings (`CODE` or `CODE@host`): the modules as a single
	// path on a white ground, so any camera reads it in either theme. Shared by the Devices tab
	// and the Listen Together room card.
	import { encode } from 'uqr';

	let { text, size = 128 }: { text: string; size?: number } = $props();

	const qr = $derived(text ? encode(text) : null);
	const path = $derived(
		qr
			? qr.data
					.flatMap((row, y) => row.map((on, x) => (on ? `M${x},${y}h1v1h-1z` : '')))
					.join('')
			: ''
	);
</script>

{#if qr}
	<div class="rounded-lg bg-white p-2 leading-none" title={text}>
		<svg
			viewBox="0 0 {qr.size} {qr.size}"
			style="width:{size}px;height:{size}px"
			shape-rendering="crispEdges"
			role="img"
			aria-label={text}
		>
			<path d={path} fill="black" />
		</svg>
	</div>
{/if}
