<script lang="ts">
	import { ArrowRight } from "@lucide/svelte";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { ClassValue, HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";

	type Props = {
		children: Snippet;
		class?: ClassValue;
		href?: string;
	} & Omit<HTMLButtonAttributes, "children" | "class"> &
		Omit<HTMLAnchorAttributes, "children" | "class">;

	let { children, class: className, href, ...props }: Props = $props();
</script>

{#if href}
	<a
		{href}
		class={cn(
			"group bg-card relative inline-flex w-auto cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border px-6 py-2.5 text-center text-sm font-semibold text-foreground transition-colors hover:border-primary/40",
			className
		)}
		{...props}
	>
		<div class="flex items-center gap-2.5">
			<div
				class="bg-primary h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]"
			></div>
			<span
				class="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0"
			>
				{@render children()}
			</span>
		</div>
		<div
			class="text-primary-foreground absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-4 group-hover:opacity-100"
		>
			<span>{@render children()}</span>
			<ArrowRight class="size-4" />
		</div>
	</a>
{:else}
	<button
		class={cn(
			"group bg-card relative inline-flex w-auto cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border px-6 py-2.5 text-center text-sm font-semibold text-foreground transition-colors hover:border-primary/40",
			className
		)}
		{...props}
	>
		<div class="flex items-center gap-2.5">
			<div
				class="bg-primary h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]"
			></div>
			<span
				class="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0"
			>
				{@render children()}
			</span>
		</div>
		<div
			class="text-primary-foreground absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-4 group-hover:opacity-100"
		>
			<span>{@render children()}</span>
			<ArrowRight class="size-4" />
		</div>
	</button>
{/if}
