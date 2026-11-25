<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import { cn } from '$lib/utils.js';

	interface Props {
		children: Snippet;
		class?: ClassValue;
		delay?: number;
		duration?: number;
		offset?: number;
		blur?: string;
	}

	let {
		children,
		class: className,
		delay = 0,
		duration = 500,
		offset = 14,
		blur = '6px'
	}: Props = $props();

	let el: HTMLDivElement | null = $state(null);
	let visible = $state(false);

	$effect(() => {
		if (!el) return;
		if (typeof IntersectionObserver === 'undefined') {
			visible = true;
			return;
		}
		const obs = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					visible = true;
					obs.disconnect();
				}
			},
			{ rootMargin: '-40px 0px', threshold: 0.08 }
		);
		obs.observe(el);
		return () => obs.disconnect();
	});
</script>

<div
	bind:this={el}
	class={cn('transition-all ease-out will-change-[transform,opacity,filter]', className)}
	style:transition-duration="{duration}ms"
	style:transition-delay="{delay}ms"
	style:opacity={visible ? 1 : 0}
	style:transform={visible ? 'translate3d(0, 0, 0)' : `translate3d(0, ${offset}px, 0)`}
	style:filter={visible ? 'blur(0px)' : `blur(${blur})`}
>
	{@render children()}
</div>
