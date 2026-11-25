<script lang="ts">
	import { Smartphone, Monitor, ShieldCheck } from '@lucide/svelte';
	import { AnimatedBeam } from '$lib/components/animations/animated-beam/index.js';

	let containerRef = $state<HTMLDivElement | null>(null);
	let androidRef = $state<HTMLDivElement | null>(null);
	let relayRef = $state<HTMLDivElement | null>(null);
	let desktopRef = $state<HTMLDivElement | null>(null);
</script>

<div
	bind:this={containerRef}
	class="relative flex h-44 w-full items-center justify-between overflow-hidden rounded-2xl border border-border/80 bg-card/70 px-6 py-8 sm:px-14"
>
	<div bind:this={androidRef} class="z-10 flex flex-col items-center gap-2">
		<div class="flex size-14 items-center justify-center rounded-2xl border border-border bg-background shadow-md">
			<Smartphone class="size-6 text-foreground" />
		</div>
		<span class="text-xs font-medium text-muted-foreground">Android</span>
	</div>

	<div bind:this={relayRef} class="z-10 flex flex-col items-center gap-2">
		<div class="flex size-16 items-center justify-center rounded-2xl border border-primary/40 bg-primary/15 shadow-[0_0_28px_rgba(224,122,75,0.2)]">
			<ShieldCheck class="size-7 text-primary" />
		</div>
		<span class="text-xs font-medium text-primary">WARP / Relais</span>
	</div>

	<div bind:this={desktopRef} class="z-10 flex flex-col items-center gap-2">
		<div class="flex size-14 items-center justify-center rounded-2xl border border-border bg-background shadow-md">
			<Monitor class="size-6 text-foreground" />
		</div>
		<span class="text-xs font-medium text-muted-foreground">Desktop</span>
	</div>

	<AnimatedBeam
		{containerRef}
		fromRef={androidRef}
		toRef={relayRef}
		curvature={0}
		duration={3.2}
		gradientStartColor="#e07a4b"
		gradientStopColor="#f59e0b"
	/>
	<AnimatedBeam
		{containerRef}
		fromRef={relayRef}
		toRef={desktopRef}
		curvature={0}
		duration={3.2}
		delay={0.5}
		gradientStartColor="#f59e0b"
		gradientStopColor="#e07a4b"
	/>
</div>
