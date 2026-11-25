<script lang="ts">
	import "./layout.css";

	let { children } = $props();
</script>

<svelte:head>
	<title
		>Vibratunes - Client YouTube Music natif, hors-ligne et sans pub</title
	>
	<meta
		name="description"
		content="Client YouTube Music open-source pour Linux, Windows, macOS et Android. Téléchargements hors-ligne, karaoké IA, paroles mot-à-mot et tunnel WARP intégré."
	/>
</svelte:head>

<div class="min-h-screen bg-background text-foreground">
	{@render children()}
</div>
