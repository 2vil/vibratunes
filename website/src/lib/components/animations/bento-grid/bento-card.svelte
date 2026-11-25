<script lang="ts">
	import type { Snippet } from "svelte";
	import type { ClassValue, HTMLAttributes } from "svelte/elements";
	import type { Component } from "svelte";

	import { cn } from "$lib/utils.js";
	import Button from "$lib/components/ui/button/button.svelte";
	import { ArrowRightIcon } from "@lucide/svelte";

	interface BentoCardProps extends HTMLAttributes<HTMLDivElement> {
		name: string;
		class?: ClassValue;
		background: Snippet;
		Icon: Component<any>;
		iconClass?: string;
		description: string;
		href: string;
		cta: string;
	}

	let {
		name,
		class: className,
		background,
		Icon,
		iconClass = "",
		description,
		href,
		cta,
		...props
	}: BentoCardProps = $props();
</script>

<div
	class={cn(
		"group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card/75 shadow-[0_-20px_80px_-20px_rgba(224,122,75,0.06)_inset] transition-colors hover:border-primary/35",
		className
	)}
	{...props}
>
	<div>{@render background()}</div>
	<div class="p-5">
		<div
			class="pointer-events-none z-10 flex transform-gpu flex-col gap-1.5 transition-all duration-300 lg:group-hover:-translate-y-10"
		>
			<Icon
				class={cn(
					"h-10 w-10 origin-left transform-gpu text-primary transition-all duration-300 ease-in-out group-hover:scale-75",
					iconClass
				)}
			/>
			<h3 class="font-display text-xl font-semibold text-foreground">
				{name}
			</h3>
			<p class="max-w-lg text-sm leading-relaxed text-muted-foreground">{description}</p>
		</div>
		<div
			class={cn(
				"pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden"
			)}
		>
			<Button variant="link" size="sm" class="pointer-events-auto p-0">
				<a {href}>
					{cta}
					<ArrowRightIcon class="ms-2 h-4 w-4 rtl:rotate-180" />
				</a>
			</Button>
		</div>
	</div>
	<div
		class={cn(
			"pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
		)}
	>
		<Button {href} variant="link" size="sm" class="pointer-events-auto p-0">
			{cta}
			<ArrowRightIcon class="ms-2 h-4 w-4 rtl:rotate-180" />
		</Button>
	</div>
	<div
		class="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/3 group-hover:dark:bg-neutral-800/10"
	></div>
</div>
