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
		Check,
		Terminal,
		Globe,
		Monitor,
		Smartphone,
		ChevronRight,
		Palette,
		Library,
	} from "@lucide/svelte";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import BlurFade from "$lib/components/BlurFade.svelte";
	import SyncBeamVisual from "$lib/components/SyncBeamVisual.svelte";
	import {
		AnimatedBackground,
		AnimatedBackgroundItem,
	} from "$lib/components/animations/animated-background/index.js";
	import { AnimatedGradientText } from "$lib/components/animations/animated-gradient-text/index.js";
	import { InteractiveHoverButton } from "$lib/components/animations/interactive-hover-button/index.js";
	import { BorderBeam } from "$lib/components/animations/border-beam/index.js";
	import { DotPattern } from "$lib/components/animations/dot-pattern/index.js";
	import { WordsStagger } from "$lib/components/animations/words-stagger/index.js";
	import { TiltCard } from "$lib/components/animations/tilt-card/index.js";
	import { ShineBorder } from "$lib/components/animations/shine-border/index.js";
	import { locales, type Locale } from "../locales/data.js";
	import { LOCALE_LABELS, localeState, setLocale } from "$lib/i18n.svelte.js";
	import {
		DESKTOP_REPO,
		ANDROID_REPO,
		DESKTOP_VERSION,
		PLATFORM_ASSETS,
		detectPlatform,
		type PlatformId,
	} from "$lib/data/releases.js";

	let selectedPlatform = $state<PlatformId>("linux");
	let activePreview = $state<"desktop" | "lyrics" | "video" | "android">(
		"desktop",
	);
	let copiedCmd = $state(false);

	$effect(() => {
		selectedPlatform = detectPlatform();
	});

	const primaryDownload = $derived(
		PLATFORM_ASSETS[selectedPlatform].find((a) => a.primary) ??
			PLATFORM_ASSETS[selectedPlatform][0],
	);

	const platformLabels: Record<PlatformId, string> = {
		linux: "Linux",
		windows: "Windows",
		macos: "macOS",
		android: "Android",
	};

	const techStack = [
		"Rust",
		"Tauri 2",
		"libmpv",
		"Kotlin",
		"Media3",
		"WireGuard WARP",
		"Vulkan Karaoke",
		"DirectML",
		"CoreML",
		"Last.fm",
		"ListenBrainz",
		"Discord RPC",
		"Matugen",
		"pywal",
	];

	const cloneSnippet =
		"git clone https://github.com/2vil/vibratunes.git && cd vibratunes && pnpm build:install:run";

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

<div class="relative overflow-x-clip">
	<!-- Warm copper ambient radial wash -->
	<div
		aria-hidden="true"
		class="pointer-events-none absolute inset-x-0 -top-44 h-[560px] opacity-45"
		style="background: radial-gradient(ellipse 65% 50% at 50% 0%, rgba(224, 122, 75, 0.18), transparent 70%);"
	></div>

	<!-- Sticky Header with AnimatedBackground on Nav & Language Switcher -->
	<header
		class="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md"
	>
		<div
			class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
		>
			<a
				href="/"
				class="flex items-center gap-2.5 text-foreground transition-opacity hover:opacity-90"
			>
				<img
					src="/images/logo.png"
					alt="Logo Vibratunes"
					class="size-8 rounded-lg object-cover"
				/>
				<span class="font-display text-lg font-semibold tracking-tight"
					>Vibratunes</span
				>
			</a>

			<nav
				class="hidden items-center gap-1 md:flex"
				aria-label="Navigation principale"
			>
				<AnimatedBackground
					enableHover
					class="rounded-lg bg-accent"
					transition={{ type: "spring", stiffness: 420, damping: 34 }}
				>
					<AnimatedBackgroundItem
						data-id="features"
						class="rounded-lg"
					>
						<a
							href="#features"
							class="block px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							Fonctionnalités
						</a>
					</AnimatedBackgroundItem>
					<AnimatedBackgroundItem
						data-id="preview"
						class="rounded-lg"
					>
						<a
							href="#preview"
							class="block px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							Aperçu
						</a>
					</AnimatedBackgroundItem>
					<AnimatedBackgroundItem
						data-id="download"
						class="rounded-lg"
					>
						<a
							href="#download"
							class="block px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							Télécharger
						</a>
					</AnimatedBackgroundItem>
				</AnimatedBackground>
			</nav>

			<div class="flex items-center gap-2">
				<!-- Language Switcher powered by Wuchale + AnimatedBackground -->
				<div
					class="flex items-center rounded-lg border border-border bg-card/90 p-0.5"
					role="group"
					aria-label="Choisir la langue"
				>
					<Globe
						class="mx-1.5 hidden size-3.5 text-muted-foreground sm:block"
					/>
					<AnimatedBackground
						defaultValue={localeState.current}
						onValueChange={(id) => {
							if (id && locales.includes(id as Locale))
								handleLocaleChange(id as Locale);
						}}
						class="rounded-md bg-primary"
						transition={{
							type: "spring",
							stiffness: 400,
							damping: 32,
						}}
					>
						{#each locales as loc (loc)}
							<AnimatedBackgroundItem
								data-id={loc}
								class="cursor-pointer rounded-md px-2 py-1 text-xs font-medium transition-colors {localeState.current ===
								loc
									? 'text-primary-foreground'
									: 'text-muted-foreground hover:text-foreground'}"
								title={LOCALE_LABELS[loc].name}
							>
								{LOCALE_LABELS[loc].code}
							</AnimatedBackgroundItem>
						{/each}
					</AnimatedBackground>
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
		<!-- Hero Section with DotPattern, AnimatedGradientText, WordsStagger & InteractiveHoverButton -->
		<section
			class="relative mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-24"
		>
			<DotPattern
				width={22}
				height={22}
				cr={1}
				class="pointer-events-none absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(520px_circle_at_50%_22%,white,transparent)]"
			/>

			<div
				class="mx-auto flex max-w-3xl flex-col items-center text-center"
			>
				<a
					href="#download"
					class="group relative mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/85 px-4 py-1.5 text-xs font-medium shadow-sm backdrop-blur-sm transition-colors hover:border-primary/40"
				>
					<Sparkles class="size-3.5 text-primary" />
					<AnimatedGradientText
						colorFrom="#e07a4b"
						colorTo="#f59e0b"
						speed={1.2}
						class="text-xs font-semibold"
					>
						Version {DESKTOP_VERSION} disponible sur Desktop & Android
					</AnimatedGradientText>
					<ChevronRight
						class="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5"
					/>
				</a>

				<WordsStagger
					as="h1"
					stagger={0.055}
					speed={0.45}
					class="font-display text-4xl font-semibold tracking-tight text-balance sm:text-6xl sm:leading-[1.08]"
				>
					Votre musique YouTube, native, hors-ligne et sans pub.
				</WordsStagger>

				<BlurFade delay={140} offset={10}>
					<p
						class="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
					>
						Vibratunes se connecte directement à l'API interne de
						YouTube et lit l'audio via libmpv et Media3. Zéro
						Electron, zéro publicité, avec téléchargements
						hors-ligne, karaoké IA et VPN WireGuard intégré sur PC.
					</p>

					<div
						class="mt-9 flex flex-wrap items-center justify-center gap-3"
					>
						<InteractiveHoverButton href={primaryDownload.url}>
							Télécharger pour {platformLabels[selectedPlatform]}
						</InteractiveHoverButton>

						<Button
							href="#download"
							variant="secondary"
							size="lg"
							class="h-11 rounded-full px-5 text-sm"
						>
							Toutes les plateformes
						</Button>
					</div>

					<p class="mt-4 text-xs text-muted-foreground">
						Open-source GPL-3.0 • Linux, Windows, macOS Apple
						Silicon & Android 8.0+
					</p>
				</BlurFade>
			</div>

			<!-- Interactive App Showcase with AnimatedBackground tabs + TiltCard + BorderBeam -->
			<BlurFade delay={200} offset={18} class="mt-14 sm:mt-18">
				<div id="preview" class="scroll-mt-24">
					<div class="mb-6 flex justify-center">
						<div
							class="inline-flex flex-wrap items-center justify-center rounded-full border border-border bg-card/80 p-1"
						>
							<AnimatedBackground
								defaultValue={activePreview}
								onValueChange={(id) => {
									if (id)
										activePreview =
											id as typeof activePreview;
								}}
								class="rounded-full bg-primary/18 border border-primary/40"
								transition={{
									type: "spring",
									stiffness: 380,
									damping: 32,
								}}
							>
								<AnimatedBackgroundItem
									data-id="desktop"
									class="cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium {activePreview ===
									'desktop'
										? 'text-foreground'
										: 'text-muted-foreground hover:text-foreground'}"
								>
									Interface Desktop
								</AnimatedBackgroundItem>
								<AnimatedBackgroundItem
									data-id="lyrics"
									class="cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium {activePreview ===
									'lyrics'
										? 'text-foreground'
										: 'text-muted-foreground hover:text-foreground'}"
								>
									Paroles & Karaoké
								</AnimatedBackgroundItem>
								<AnimatedBackgroundItem
									data-id="video"
									class="cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium {activePreview ===
									'video'
										? 'text-foreground'
										: 'text-muted-foreground hover:text-foreground'}"
								>
									Mode Vidéo
								</AnimatedBackgroundItem>
								<AnimatedBackgroundItem
									data-id="android"
									class="cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium {activePreview ===
									'android'
										? 'text-foreground'
										: 'text-muted-foreground hover:text-foreground'}"
								>
									Application Android
								</AnimatedBackgroundItem>
							</AnimatedBackground>
						</div>
					</div>

					<TiltCard
						tiltLimit={3.5}
						scale={1.008}
						spotlight={true}
						class="mx-auto max-w-5xl rounded-2xl"
					>
						<div
							class="relative overflow-hidden rounded-2xl border border-border bg-card/85 p-2 shadow-2xl sm:p-3"
						>
							<BorderBeam
								size={180}
								duration={10}
								colorFrom="#e07a4b"
								colorTo="#f59e0b"
								borderWidth={1.5}
							/>
							{#if activePreview === "desktop"}
								<img
									src="/images/screen-playlist.webp"
									alt="Vue playlist dans Vibratunes Desktop"
									class="w-full rounded-xl border border-border/50 object-cover"
								/>
							{:else if activePreview === "lyrics"}
								<img
									src="/images/screen-lyrics.webp"
									alt="Paroles synchronisées mot-à-mot dans Vibratunes"
									class="w-full rounded-xl border border-border/50 object-cover"
								/>
							{:else if activePreview === "video"}
								<img
									src="/images/screen-video.webp"
									alt="Lecture de clip vidéo à côté des paroles"
									class="w-full rounded-xl border border-border/50 object-cover"
								/>
							{:else}
								<div
									class="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 sm:p-6"
								>
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
					</TiltCard>
				</div>
			</BlurFade>
		</section>

		<!-- Dedicated Sync & WARP Section (AnimatedBeam) -->
		<section class="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
			<div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
				<BlurFade offset={12} class="lg:col-span-5 text-pretty">
					<p
						class="text-xs font-semibold tracking-widest text-primary uppercase"
					>
						Écoute simultanée entre plusieurs appareils
					</p>
					<h2
						class="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
					>
						Un seul flux entre votre PC et votre téléphone.
					</h2>
					<p
						class="mt-4 text-base leading-relaxed text-muted-foreground"
					>
						Liez votre smartphone Android à votre ordinateur avec <b
							class="text-primary">Play Anywhere</b
						>
						pour controler votre musique depuis votre téléphone et inversement
						et partagez des salons d'écoute simultanée avec vos amis
						en temps réel avec
						<b class="text-primary">Listen Together</b>
					</p>
				</BlurFade>
				<BlurFade delay={100} offset={14} class="lg:col-span-7">
					<SyncBeamVisual />
				</BlurFade>
			</div>
		</section>

		<Separator class="mx-auto max-w-6xl opacity-60" />

		<!-- Clean Features Grid (zero overflow, natural height) -->
		<section
			id="features"
			class="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28"
		>
			<BlurFade offset={12}>
				<div class="max-w-2xl">
					<p
						class="text-xs font-semibold tracking-widest text-primary uppercase"
					>
						Accessibilité & Fonctions
					</p>
					<h2
						class="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
					>
						Pensé pour écouter partout, même avec une connexion difficile.
					</h2>
					<p class="mt-3 text-base text-muted-foreground">
						Vibratunes a été conçu pour celles et ceux qui subissent une
						connexion instable ou les restrictions géographiques de
						YouTube Music : téléchargez vos morceaux pour les écouter
						hors-ligne, et contournez les blocages sur PC grâce au VPN
						WireGuard intégré.
					</p>
				</div>
			</BlurFade>

			<div
				class="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
			>
				<BlurFade delay={40}>
					<Card.Root
						class="h-full border-border/80 bg-card/70 transition-colors hover:border-primary/35"
					>
						<Card.Header>
							<div
								class="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary"
							>
								<HardDriveDownload class="size-5" />
							</div>
							<Card.Title class="text-lg"
								>Téléchargements hors-ligne</Card.Title
							>
							<Card.Description>
								Enregistrez vos titres, albums et playlists avec
								leurs pochettes haute résolution et métadonnées
								complètes pour écouter sans connexion.
							</Card.Description>
						</Card.Header>
					</Card.Root>
				</BlurFade>

				<BlurFade delay={80}>
					<Card.Root
						class="h-full border-border/80 bg-card/70 transition-colors hover:border-primary/35"
					>
						<Card.Header>
							<div
								class="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary"
							>
								<MicVocal class="size-5" />
							</div>
							<Card.Title class="text-lg"
								>Paroles & Karaoké IA local</Card.Title
							>
							<Card.Description>
								Paroles synchronisées mot-à-mot multi-sources et
								séparation vocale en temps réel sur votre GPU
								(Vulkan, DirectML, CoreML) sans aucun serveur
								externe.
							</Card.Description>
						</Card.Header>
					</Card.Root>
				</BlurFade>

				<BlurFade delay={120}>
					<Card.Root
						class="h-full border-border/80 bg-card/70 transition-colors hover:border-primary/35"
					>
						<Card.Header>
							<div
								class="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary"
							>
								<ShieldCheck class="size-5" />
							</div>
							<Card.Title class="text-lg"
								>VPN WireGuard intégré (PC)</Card.Title
							>
							<Card.Description>
								Activez un tunnel WireGuard directement depuis
								les paramètres sur ordinateur pour contourner le
								bridage réseau ou les restrictions géographiques.
							</Card.Description>
						</Card.Header>
					</Card.Root>
				</BlurFade>

				<BlurFade delay={160}>
					<Card.Root
						class="h-full border-border/80 bg-card/70 transition-colors hover:border-primary/35"
					>
						<Card.Header>
							<div
								class="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary"
							>
								<Library class="size-5" />
							</div>
							<Card.Title class="text-lg"
								>Bibliothèque locale & Multi-comptes</Card.Title
							>
							<Card.Description>
								Gérez vos playlists et favoris même sans compte
								Google, importez vos fichiers audio locaux ou
								basculez entre plusieurs comptes en un clic.
							</Card.Description>
						</Card.Header>
					</Card.Root>
				</BlurFade>

				<BlurFade delay={200}>
					<Card.Root
						class="h-full border-border/80 bg-card/70 transition-colors hover:border-primary/35"
					>
						<Card.Header>
							<div
								class="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary"
							>
								<Cpu class="size-5" />
							</div>
							<Card.Title class="text-lg"
								>Moteur natif Rust & Kotlin</Card.Title
							>
							<Card.Description>
								Tauri 2 + libmpv sur Desktop, Kotlin + Media3
								sur Android. Transitions gapless, normalisation
								sonore, pitch, vitesse et égaliseur 10 bandes.
							</Card.Description>
						</Card.Header>
					</Card.Root>
				</BlurFade>

				<BlurFade delay={240}>
					<Card.Root
						class="h-full border-border/80 bg-card/70 transition-colors hover:border-primary/35"
					>
						<Card.Header>
							<div
								class="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary"
							>
								<Palette class="size-5" />
							</div>
							<Card.Title class="text-lg"
								>Thèmes adaptatifs & Scrobbling</Card.Title
							>
							<Card.Description>
								Couleurs extraites de la pochette en cours,
								support Matugen / pywal / wallust sous Linux,
								Discord Rich Presence, Last.fm et ListenBrainz.
							</Card.Description>
						</Card.Header>
					</Card.Root>
				</BlurFade>
			</div>
		</section>

		<Separator class="mx-auto max-w-6xl opacity-60" />

		<!-- Downloads Section -->
		<section
			id="download"
			class="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28"
		>
			<BlurFade offset={12}>
				<div class="mx-auto max-w-2xl text-center">
					<p
						class="text-xs font-semibold tracking-widest text-primary uppercase"
					>
						Téléchargements
					</p>
					<h2
						class="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
					>
						Choisissez votre plateforme
					</h2>
					<p class="mt-3 text-base text-muted-foreground">
						Binaires signés et mises à jour automatiques intégrées
						sur Desktop et Android.
					</p>
				</div>
			</BlurFade>

			<div class="mx-auto mt-10 max-w-3xl">
				<Tabs.Root bind:value={selectedPlatform} class="w-full">
					<Tabs.List class="grid w-full grid-cols-4 bg-card p-1">
						<Tabs.Trigger
							value="linux"
							class="cursor-pointer gap-1.5"
						>
							<Monitor class="hidden size-3.5 sm:block" />
							Linux
						</Tabs.Trigger>
						<Tabs.Trigger
							value="windows"
							class="cursor-pointer gap-1.5"
						>
							<Monitor class="hidden size-3.5 sm:block" />
							Windows
						</Tabs.Trigger>
						<Tabs.Trigger
							value="macos"
							class="cursor-pointer gap-1.5"
						>
							<Monitor class="hidden size-3.5 sm:block" />
							macOS
						</Tabs.Trigger>
						<Tabs.Trigger
							value="android"
							class="cursor-pointer gap-1.5"
						>
							<Smartphone class="hidden size-3.5 sm:block" />
							Android
						</Tabs.Trigger>
					</Tabs.List>

					{#each ["linux", "windows", "macos", "android"] as const as platform (platform)}
						<Tabs.Content value={platform} class="mt-6">
							<div class="flex flex-col gap-3">
								{#each PLATFORM_ASSETS[platform] as asset (asset.name)}
									<div
										class="group relative flex flex-col justify-between gap-4 overflow-hidden rounded-xl border border-border bg-card/85 p-4 transition-all hover:border-primary/40 sm:flex-row sm:items-center"
									>
										{#if asset.primary}
											<ShineBorder
												shineColor={[
													"#e07a4b",
													"#f59e0b",
													"#e07a4b",
												]}
												borderWidth={1}
												duration={10}
											/>
										{/if}
										<div class="min-w-0">
											<div
												class="flex items-center gap-2"
											>
												<span
													class="font-medium text-foreground"
													>{asset.name}</span
												>
												{#if asset.primary}
													<Badge
														variant="default"
														class="text-[11px]"
														>Recommandé</Badge
													>
												{/if}
											</div>
											<p
												class="mt-0.5 text-xs text-muted-foreground"
											>
												{asset.detail}
											</p>
										</div>

										{#if asset.primary}
											<InteractiveHoverButton
												href={asset.url}
												target="_blank"
												rel="noopener noreferrer"
												class="shrink-0 px-5 py-2 text-xs"
											>
												Télécharger
											</InteractiveHoverButton>
										{:else}
											<Button
												href={asset.url}
												target="_blank"
												rel="noopener noreferrer"
												variant="outline"
												size="sm"
												class="shrink-0"
											>
												<Download
													data-icon="inline-start"
												/>
												Télécharger
											</Button>
										{/if}
									</div>
								{/each}
							</div>
						</Tabs.Content>
					{/each}
				</Tabs.Root>

				<!-- Source / Arch Linux Quick Install -->
				<div
					class="mt-6 rounded-xl border border-border bg-card/50 p-4"
				>
					<div class="flex items-center justify-between gap-2">
						<div
							class="flex items-center gap-2 text-xs font-medium text-muted-foreground"
						>
							<Terminal class="size-3.5 text-primary" />
							<span
								>Compiler et installer depuis les sources (Arch,
								Fedora, Debian, macOS)</span
							>
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
					<pre
						class="mt-2.5 overflow-x-auto font-mono text-xs text-foreground/90"><code
							>{cloneSnippet}</code
						></pre>
				</div>
			</div>
		</section>
	</main>

	<!-- Footer -->
	<footer class="border-t border-border/80 bg-card/30">
		<div
			class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-xs text-muted-foreground sm:flex-row sm:px-6"
		>
			<div class="flex items-center gap-2">
				<img
					src="/images/logo.png"
					alt="Vibratunes"
					class="size-5 rounded object-cover"
				/>
				<span>Vibratunes • Licence GPL-3.0</span>
			</div>

			<div class="flex flex-wrap items-center justify-center gap-5">
				<a
					href={DESKTOP_REPO}
					target="_blank"
					rel="noopener noreferrer"
					class="transition-colors hover:text-foreground"
				>
					Dépôt Desktop
				</a>
				<a
					href={ANDROID_REPO}
					target="_blank"
					rel="noopener noreferrer"
					class="transition-colors hover:text-foreground"
				>
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
				Inspiré par Limusic, Metrolist & SimpMusic. Indépendant de
				YouTube et Google LLC.
			</p>
		</div>
	</footer>
</div>
