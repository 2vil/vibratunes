<script lang="ts">
	import {
		Download,
		ArrowUpRight,
		Sparkles,
		HardDriveDownload,
		MicVocal,
		ShieldCheck,
		Radio,
		Cpu,
		Palette,
		Smartphone,
		Monitor,
		Check,
		Terminal,
		Globe
	} from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import BlurFade from '$lib/components/BlurFade.svelte';
	import { locales, type Locale } from '../locales/data.js';
	import { LOCALE_LABELS, localeState, setLocale } from '$lib/i18n.svelte.js';
	import {
		DESKTOP_REPO,
		ANDROID_REPO,
		DESKTOP_VERSION,
		PLATFORM_ASSETS,
		detectPlatform,
		type PlatformId
	} from '$lib/data/releases.js';

	let selectedPlatform = $state<PlatformId>('linux');
	let activePreview = $state<'desktop' | 'lyrics' | 'video' | 'android'>('desktop');
	let copiedCmd = $state(false);

	$effect(() => {
		selectedPlatform = detectPlatform();
	});

	const primaryDownload = $derived(
		PLATFORM_ASSETS[selectedPlatform].find((a) => a.primary) ?? PLATFORM_ASSETS[selectedPlatform][0]
	);

	const platformLabels: Record<PlatformId, string> = {
		linux: 'Linux',
		windows: 'Windows',
		macos: 'macOS',
		android: 'Android'
	};

	const cloneSnippet = 'git clone https://github.com/2vil/vibratunes.git && cd vibratunes && pnpm build:install:run';

	async function copyInstallCmd() {
		try {
			await navigator.clipboard.writeText(cloneSnippet);
			copiedCmd = true;
			setTimeout(() => (copiedCmd = false), 2000);
		} catch {
			// clipboard unavailable
		}
	}

	async function handleLocaleChange(loc: Locale) {
		await setLocale(loc);
	}
</script>

<!-- Subtle warm ambient wash at top, restrained and non-cliche -->
<div class="relative overflow-x-clip">
	<div
		aria-hidden="true"
		class="pointer-events-none absolute inset-x-0 -top-40 h-[520px] opacity-40"
		style="background: radial-gradient(ellipse 65% 50% at 50% 0%, rgba(224, 122, 75, 0.16), transparent 70%);"
	></div>

	<!-- Sticky Header -->
	<header class="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
		<div class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
			<a href="/" class="flex items-center gap-2.5 text-foreground transition-opacity hover:opacity-90">
				<img src="/images/logo.png" alt="Logo Vibratunes" class="size-8 rounded-lg object-cover" />
				<span class="font-display text-lg font-semibold tracking-tight">Vibratunes</span>
			</a>

			<nav class="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
				<a href="#features" class="transition-colors hover:text-foreground">Fonctionnalités</a>
				<a href="#preview" class="transition-colors hover:text-foreground">Aperçu</a>
				<a href="#download" class="transition-colors hover:text-foreground">Télécharger</a>
			</nav>

			<div class="flex items-center gap-2">
				<!-- Language Switcher (Wuchale: FR / EN / ES / LN) -->
				<div
					class="flex items-center rounded-lg border border-border bg-card/90 p-0.5"
					role="group"
					aria-label="Choisir la langue"
				>
					<Globe class="mx-1.5 hidden size-3.5 text-muted-foreground sm:block" />
					{#each locales as loc (loc)}
						<button
							type="button"
							onclick={() => handleLocaleChange(loc)}
							class="cursor-pointer rounded-md px-2 py-1 text-xs font-medium transition-colors {localeState.current ===
							loc
								? 'bg-primary text-primary-foreground'
								: 'text-muted-foreground hover:text-foreground'}"
							title={LOCALE_LABELS[loc].name}
						>
							{LOCALE_LABELS[loc].code}
						</button>
					{/each}
				</div>

				<Button
					href={DESKTOP_REPO}
					target="_blank"
					rel="noopener noreferrer"
					variant="outline"
					size="sm"
					class="hidden sm:inline-flex"
				>
					GitHub
					<ArrowUpRight data-icon="inline-end" />
				</Button>
			</div>
		</div>
	</header>

	<main>
		<!-- Hero Section -->
		<section class="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28">
			<BlurFade delay={0} offset={10}>
				<div class="mx-auto flex max-w-3xl flex-col items-center text-center">
					<Badge variant="outline" class="mb-6 border-primary/30 bg-primary/10 px-3 py-1 text-primary">
						<Sparkles class="size-3.5" />
						<span>Version {DESKTOP_VERSION} disponible sur Desktop & Android</span>
					</Badge>

					<h1 class="text-4xl font-semibold tracking-tight text-balance sm:text-6xl sm:leading-[1.08]">
						Votre musique YouTube, native, hors-ligne et sans pub.
					</h1>

					<p class="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
						Vibratunes se connecte directement à l'API interne de YouTube et lit l'audio via
						libmpv et Media3. Zéro Electron, zéro publicité, avec téléchargements hors-ligne,
						karaoké IA et tunnel WARP intégré.
					</p>

					<div class="mt-9 flex flex-wrap items-center justify-center gap-3">
						<Button href={primaryDownload.url} size="lg" class="h-11 px-6 text-sm font-medium">
							<Download data-icon="inline-start" />
							Télécharger pour {platformLabels[selectedPlatform]}
						</Button>

						<Button href="#download" variant="secondary" size="lg" class="h-11 px-5 text-sm">
							Toutes les plateformes
						</Button>
					</div>

					<p class="mt-4 text-xs text-muted-foreground">
						Open-source GPL-3.0 • Linux, Windows, macOS Apple Silicon & Android 8.0+
					</p>
				</div>
			</BlurFade>

			<!-- Interactive App Showcase -->
			<BlurFade delay={120} offset={18} class="mt-14 sm:mt-18">
				<div id="preview" class="scroll-mt-24">
					<div class="mb-5 flex flex-wrap items-center justify-center gap-2">
						<button
							type="button"
							onclick={() => (activePreview = 'desktop')}
							class="cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors {activePreview ===
							'desktop'
								? 'border-primary/50 bg-primary/15 text-foreground'
								: 'border-border bg-card/60 text-muted-foreground hover:text-foreground'}"
						>
							Interface Desktop
						</button>
						<button
							type="button"
							onclick={() => (activePreview = 'lyrics')}
							class="cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors {activePreview ===
							'lyrics'
								? 'border-primary/50 bg-primary/15 text-foreground'
								: 'border-border bg-card/60 text-muted-foreground hover:text-foreground'}"
						>
							Paroles & Karaoké
						</button>
						<button
							type="button"
							onclick={() => (activePreview = 'video')}
							class="cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors {activePreview ===
							'video'
								? 'border-primary/50 bg-primary/15 text-foreground'
								: 'border-border bg-card/60 text-muted-foreground hover:text-foreground'}"
						>
							Mode Vidéo
						</button>
						<button
							type="button"
							onclick={() => (activePreview = 'android')}
							class="cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors {activePreview ===
							'android'
								? 'border-primary/50 bg-primary/15 text-foreground'
								: 'border-border bg-card/60 text-muted-foreground hover:text-foreground'}"
						>
							Application Android
						</button>
					</div>

					<div class="relative mx-auto max-w-5xl rounded-2xl border border-border bg-card/80 p-2 shadow-2xl sm:p-3">
						{#if activePreview === 'desktop'}
							<img
								src="/images/screen-playlist.webp"
								alt="Vue playlist dans Vibratunes Desktop"
								class="w-full rounded-xl border border-border/50 object-cover"
							/>
						{:else if activePreview === 'lyrics'}
							<img
								src="/images/screen-lyrics.webp"
								alt="Paroles synchronisées mot-à-mot dans Vibratunes"
								class="w-full rounded-xl border border-border/50 object-cover"
							/>
						{:else if activePreview === 'video'}
							<img
								src="/images/screen-video.webp"
								alt="Lecture de clip vidéo à côté des paroles"
								class="w-full rounded-xl border border-border/50 object-cover"
							/>
						{:else}
							<div class="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 sm:p-6">
								<img
									src="/images/android-home.webp"
									alt="Accueil Vibratunes Android"
									class="mx-auto max-h-[460px] rounded-2xl border border-border/60 object-contain shadow-lg"
								/>
								<img
									src="/images/android-player.webp"
									alt="Lecteur Vibratunes Android"
									class="mx-auto max-h-[460px] rounded-2xl border border-border/60 object-contain shadow-lg"
								/>
								<img
									src="/images/android-lyrics.webp"
									alt="Paroles synchronisées sur Android"
									class="mx-auto max-h-[460px] rounded-2xl border border-border/60 object-contain shadow-lg"
								/>
							</div>
						{/if}
					</div>
				</div>
			</BlurFade>
		</section>

		<Separator class="mx-auto max-w-6xl opacity-60" />

		<!-- Features Bento Grid -->
		<section id="features" class="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
			<BlurFade offset={12}>
				<div class="max-w-2xl">
					<p class="text-xs font-semibold tracking-widest text-primary uppercase">Architecture & Fonctions</p>
					<h2 class="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
						Conçu pour l'écoute, pas pour alourdir votre machine.
					</h2>
					<p class="mt-3 text-base text-muted-foreground">
						Chaque composant privilégie la réactivité, la fidélité audio et le contrôle local de votre bibliothèque.
					</p>
				</div>
			</BlurFade>

			<div class="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<BlurFade delay={40}>
					<Card.Root class="h-full border-border/80 bg-card/70 transition-colors hover:border-primary/30">
						<Card.Header>
							<div class="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary">
								<HardDriveDownload class="size-5" />
							</div>
							<Card.Title class="text-lg">Téléchargements hors-ligne</Card.Title>
							<Card.Description>
								Enregistrez vos titres, albums et playlists avec leurs pochettes haute résolution et métadonnées complètes pour écouter sans connexion.
							</Card.Description>
						</Card.Header>
					</Card.Root>
				</BlurFade>

				<BlurFade delay={80}>
					<Card.Root class="h-full border-border/80 bg-card/70 transition-colors hover:border-primary/30">
						<Card.Header>
							<div class="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary">
								<MicVocal class="size-5" />
							</div>
							<Card.Title class="text-lg">Paroles & Karaoké IA local</Card.Title>
							<Card.Description>
								Paroles synchronisées mot-à-mot multi-sources et séparation vocale en temps réel sur votre GPU (Vulkan, DirectML, CoreML) sans aucun serveur externe.
							</Card.Description>
						</Card.Header>
					</Card.Root>
				</BlurFade>

				<BlurFade delay={120}>
					<Card.Root class="h-full border-border/80 bg-card/70 transition-colors hover:border-primary/30">
						<Card.Header>
							<div class="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary">
								<ShieldCheck class="size-5" />
							</div>
							<Card.Title class="text-lg">Tunnel WARP intégré</Card.Title>
							<Card.Description>
								Activez un tunnel WireGuard Cloudflare directement depuis les paramètres pour contourner le bridage réseau ou les restrictions géographiques.
							</Card.Description>
						</Card.Header>
					</Card.Root>
				</BlurFade>

				<BlurFade delay={160}>
					<Card.Root class="h-full border-border/80 bg-card/70 transition-colors hover:border-primary/30">
						<Card.Header>
							<div class="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary">
								<Radio class="size-5" />
							</div>
							<Card.Title class="text-lg">Listen Together & Play Anywhere</Card.Title>
							<Card.Description>
								Écoutez en synchronisation avec vos amis ou liez votre téléphone Android à votre ordinateur pour contrôler la lecture à distance.
							</Card.Description>
						</Card.Header>
					</Card.Root>
				</BlurFade>

				<BlurFade delay={200}>
					<Card.Root class="h-full border-border/80 bg-card/70 transition-colors hover:border-primary/30">
						<Card.Header>
							<div class="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary">
								<Cpu class="size-5" />
							</div>
							<Card.Title class="text-lg">Moteur natif Rust & Kotlin</Card.Title>
							<Card.Description>
								Tauri 2 + libmpv sur Desktop, Kotlin + Media3 sur Android. Transitions gapless, normalisation sonore, pitch, vitesse et égaliseur 10 bandes.
							</Card.Description>
						</Card.Header>
					</Card.Root>
				</BlurFade>

				<BlurFade delay={240}>
					<Card.Root class="h-full border-border/80 bg-card/70 transition-colors hover:border-primary/30">
						<Card.Header>
							<div class="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary">
								<Palette class="size-5" />
							</div>
							<Card.Title class="text-lg">Thèmes adaptatifs & Scrobbling</Card.Title>
							<Card.Description>
								Couleurs extraites de la pochette en cours, support Matugen / pywal / wallust sous Linux, Discord Rich Presence, Last.fm et ListenBrainz.
							</Card.Description>
						</Card.Header>
					</Card.Root>
				</BlurFade>
			</div>
		</section>

		<Separator class="mx-auto max-w-6xl opacity-60" />

		<!-- Downloads Section -->
		<section id="download" class="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
			<BlurFade offset={12}>
				<div class="mx-auto max-w-2xl text-center">
					<p class="text-xs font-semibold tracking-widest text-primary uppercase">Téléchargements</p>
					<h2 class="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
						Choisissez votre plateforme
					</h2>
					<p class="mt-3 text-base text-muted-foreground">
						Binaires signés et mises à jour automatiques intégrées sur Desktop et Android.
					</p>
				</div>
			</BlurFade>

			<div class="mx-auto mt-10 max-w-3xl">
				<Tabs.Root bind:value={selectedPlatform} class="w-full">
					<Tabs.List class="grid w-full grid-cols-4 bg-card p-1">
						<Tabs.Trigger value="linux" class="cursor-pointer gap-1.5">
							<Monitor class="hidden size-3.5 sm:block" />
							Linux
						</Tabs.Trigger>
						<Tabs.Trigger value="windows" class="cursor-pointer gap-1.5">
							<Monitor class="hidden size-3.5 sm:block" />
							Windows
						</Tabs.Trigger>
						<Tabs.Trigger value="macos" class="cursor-pointer gap-1.5">
							<Monitor class="hidden size-3.5 sm:block" />
							macOS
						</Tabs.Trigger>
						<Tabs.Trigger value="android" class="cursor-pointer gap-1.5">
							<Smartphone class="hidden size-3.5 sm:block" />
							Android
						</Tabs.Trigger>
					</Tabs.List>

					{#each (['linux', 'windows', 'macos', 'android'] as const) as platform (platform)}
						<Tabs.Content value={platform} class="mt-6">
							<div class="flex flex-col gap-3">
								{#each PLATFORM_ASSETS[platform] as asset (asset.name)}
									<a
										href={asset.url}
										target="_blank"
										rel="noopener noreferrer"
										class="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card/80 p-4 transition-all hover:border-primary/40 hover:bg-card"
									>
										<div class="min-w-0">
											<div class="flex items-center gap-2">
												<span class="font-medium text-foreground">{asset.name}</span>
												{#if asset.primary}
													<Badge variant="default" class="text-[11px]">Recommandé</Badge>
												{/if}
											</div>
											<p class="mt-0.5 text-xs text-muted-foreground">{asset.detail}</p>
										</div>
										<div
											class="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary"
										>
											<Download class="size-4" />
										</div>
									</a>
								{/each}
							</div>
						</Tabs.Content>
					{/each}
				</Tabs.Root>

				<!-- Source / Arch Linux Quick Install -->
				<div class="mt-6 rounded-xl border border-border bg-card/50 p-4">
					<div class="flex items-center justify-between gap-2">
						<div class="flex items-center gap-2 text-xs font-medium text-muted-foreground">
							<Terminal class="size-3.5 text-primary" />
							<span>Compiler et installer depuis les sources (Arch, Fedora, Debian, macOS)</span>
						</div>
						<button
							type="button"
							onclick={copyInstallCmd}
							class="inline-flex cursor-pointer items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
						>
							{#if copiedCmd}
								<Check class="size-3 text-primary" />
								<span>Copié</span>
							{:else}
								<span>Copier</span>
							{/if}
						</button>
					</div>
					<pre class="mt-2.5 overflow-x-auto font-mono text-xs text-foreground/90"><code>{cloneSnippet}</code></pre>
				</div>
			</div>
		</section>
	</main>

	<!-- Footer -->
	<footer class="border-t border-border/80 bg-card/30">
		<div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-xs text-muted-foreground sm:flex-row sm:px-6">
			<div class="flex items-center gap-2">
				<img src="/images/logo.png" alt="Vibratunes" class="size-5 rounded object-cover" />
				<span>Vibratunes • Licence GPL-3.0</span>
			</div>

			<div class="flex flex-wrap items-center justify-center gap-5">
				<a href={DESKTOP_REPO} target="_blank" rel="noopener noreferrer" class="transition-colors hover:text-foreground">
					Dépôt Desktop
				</a>
				<a href={ANDROID_REPO} target="_blank" rel="noopener noreferrer" class="transition-colors hover:text-foreground">
					Dépôt Android
				</a>
				<a
					href={`${DESKTOP_REPO}/releases`}
					target="_blank"
					rel="noopener noreferrer"
					class="transition-colors hover:text-foreground"
				>
					Releases
				</a>
			</div>

			<p class="text-center sm:text-right">
				Inspiré par Limusic, Metrolist & SimpMusic. Indépendant de YouTube et Google LLC.
			</p>
		</div>
	</footer>
</div>
