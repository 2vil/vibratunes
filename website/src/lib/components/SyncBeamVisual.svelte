<script lang="ts">
	import { Smartphone, Monitor, Globe } from '@lucide/svelte';
	import { AnimatedBeam } from '$lib/components/animations/animated-beam/index.js';

	let containerRef = $state<HTMLDivElement | null>(null);
	let userPhoneRef = $state<HTMLDivElement | null>(null);
	let globeRef = $state<HTMLDivElement | null>(null);
	let pcRef = $state<HTMLDivElement | null>(null);
	let mamaleRef = $state<HTMLDivElement | null>(null);
	let apitabodoRef = $state<HTMLDivElement | null>(null);
	let denzuRef = $state<HTMLDivElement | null>(null);
</script>

<div
	bind:this={containerRef}
	class="relative flex h-90 w-full items-center justify-center overflow-hidden rounded-2xl border border-border/80 bg-card/70 px-5 py-8 sm:px-10"
>
	<div class="flex size-full max-w-xl flex-row items-stretch justify-between gap-4 sm:gap-8">
		<!-- Left: User's phone -->
		<div class="flex flex-col justify-center">
			<div class="z-10 flex flex-col items-center gap-2">
				<div
					bind:this={userPhoneRef}
					class="flex size-12 items-center justify-center rounded-full border border-border bg-background shadow-md"
				>
					<Smartphone class="size-5 text-foreground" />
				</div>
				<span class="text-center text-sm font-medium text-muted-foreground">Mon téléphone</span>
			</div>
		</div>

		<!-- Center: Globe (Internet) -->
		<div class="flex flex-col justify-center">
			<div class="z-10 flex flex-col items-center gap-2">
				<div
					bind:this={globeRef}
					class="flex size-16 items-center justify-center rounded-full border border-primary/45 bg-primary/15 shadow-[0_0_28px_rgba(224,122,75,0.22)]"
				>
					<Globe class="size-7 text-primary" />
				</div>
				<span class="text-sm font-medium text-primary">Internet</span>
			</div>
		</div>

		<!-- Right: PC (Play Anywhere) + Friends' phones (Listen Together) -->
		<div class="flex flex-col justify-center gap-3.5">
			<div class="z-10 flex items-center gap-2.5">
				<div
					bind:this={pcRef}
					class="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-background shadow-md"
				>
					<Monitor class="size-4 text-primary" />
				</div>
				<span class="text-sm font-medium text-foreground">Mon PC</span>
			</div>

			<div class="z-10 flex items-center gap-2.5">
				<div
					bind:this={mamaleRef}
					class="flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-background shadow-md"
				>
					<Smartphone class="size-4 text-foreground" />
				</div>
				<span class="text-sm font-medium text-muted-foreground">Téléphone de Mamale</span>
			</div>

			<div class="z-10 flex items-center gap-2.5">
				<div
					bind:this={apitabodoRef}
					class="flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-background shadow-md"
				>
					<Smartphone class="size-4 text-foreground" />
				</div>
				<span class="text-sm font-medium text-muted-foreground">Téléphone de Apitabodo</span>
			</div>

			<div class="z-10 flex items-center gap-2.5">
				<div
					bind:this={denzuRef}
					class="flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-background shadow-md"
				>
					<Smartphone class="size-4 text-foreground" />
				</div>
				<span class="text-sm font-medium text-muted-foreground">Téléphone de Denzu</span>
			</div>
		</div>
	</div>

	<AnimatedBeam
		{containerRef}
		fromRef={userPhoneRef}
		toRef={globeRef}
		duration={3}
		gradientStartColor="#e07a4b"
		gradientStopColor="#f59e0b"
	/>
	<AnimatedBeam
		{containerRef}
		fromRef={globeRef}
		toRef={pcRef}
		curvature={-45}
		duration={3}
		gradientStartColor="#f59e0b"
		gradientStopColor="#e07a4b"
	/>
	<AnimatedBeam
		{containerRef}
		fromRef={globeRef}
		toRef={mamaleRef}
		curvature={-15}
		duration={3}
		delay={0.2}
		gradientStartColor="#f59e0b"
		gradientStopColor="#e07a4b"
	/>
	<AnimatedBeam
		{containerRef}
		fromRef={globeRef}
		toRef={apitabodoRef}
		curvature={15}
		duration={3}
		delay={0.4}
		gradientStartColor="#f59e0b"
		gradientStopColor="#e07a4b"
	/>
	<AnimatedBeam
		{containerRef}
		fromRef={globeRef}
		toRef={denzuRef}
		curvature={45}
		duration={3}
		delay={0.6}
		gradientStartColor="#f59e0b"
		gradientStopColor="#e07a4b"
	/>
</div>
