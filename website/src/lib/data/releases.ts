export type PlatformId = 'linux' | 'windows' | 'macos' | 'android';

export const DESKTOP_VERSION = '1.0.0';
export const ANDROID_VERSION = '1.0.0';

export const DESKTOP_REPO = 'https://github.com/2vil/vibratunes';
export const ANDROID_REPO = 'https://github.com/2vil/vibratunes-android';

export interface ReleaseAsset {
	name: string;
	detail: string;
	url: string;
	primary?: boolean;
}

export const PLATFORM_ASSETS: Record<PlatformId, ReleaseAsset[]> = {
	linux: [
		{
			name: 'AppImage (x86_64)',
			detail: 'Universel • Mises à jour automatiques intégrées',
			url: `${DESKTOP_REPO}/releases/download/v${DESKTOP_VERSION}/vibratunes_${DESKTOP_VERSION}_amd64.AppImage`,
			primary: true
		},
		{
			name: 'Paquet Debian / Ubuntu (.deb)',
			detail: 'Debian, Ubuntu, Linux Mint, Pop!_OS',
			url: `${DESKTOP_REPO}/releases/download/v${DESKTOP_VERSION}/vibratunes_${DESKTOP_VERSION}_amd64.deb`
		},
		{
			name: 'Arch Linux (.pkg.tar.zst)',
			detail: 'Installation native via pacman -U',
			url: `${DESKTOP_REPO}/releases/download/v${DESKTOP_VERSION}/vibratunes-${DESKTOP_VERSION}-1-x86_64.pkg.tar.zst`
		}
	],
	windows: [
		{
			name: 'Installateur Windows (.exe)',
			detail: 'NSIS x64 • Mises à jour automatiques',
			url: `${DESKTOP_REPO}/releases/download/v${DESKTOP_VERSION}/vibratunes_${DESKTOP_VERSION}_x64-setup.exe`,
			primary: true
		},
		{
			name: 'Paquet MSI (.msi)',
			detail: 'Déploiement Windows Installer x64',
			url: `${DESKTOP_REPO}/releases/download/v${DESKTOP_VERSION}/vibratunes_${DESKTOP_VERSION}_x64_en-US.msi`
		}
	],
	macos: [
		{
			name: 'Image disque Apple Silicon (.dmg)',
			detail: 'macOS arm64 (M1 / M2 / M3 / M4)',
			url: `${DESKTOP_REPO}/releases/download/v${DESKTOP_VERSION}/vibratunes_${DESKTOP_VERSION}_aarch64.dmg`,
			primary: true
		},
		{
			name: 'Archive Updater (.app.tar.gz)',
			detail: 'Bundle application signé',
			url: `${DESKTOP_REPO}/releases/download/v${DESKTOP_VERSION}/vibratunes_${DESKTOP_VERSION}_aarch64.app.tar.gz`
		}
	],
	android: [
		{
			name: 'APK arm64-v8a (Recommandé)',
			detail: 'Tous les smartphones Android récents (~25 Mo)',
			url: `${ANDROID_REPO}/releases/download/v${ANDROID_VERSION}/vibratunes-${ANDROID_VERSION}-arm64-v8a.apk`,
			primary: true
		},
		{
			name: 'APK Universal',
			detail: 'Compatible toutes architectures (~51 Mo)',
			url: `${ANDROID_REPO}/releases/download/v${ANDROID_VERSION}/vibratunes-${ANDROID_VERSION}-universal.apk`
		},
		{
			name: 'APK armeabi-v7a / x86_64',
			detail: 'Anciens appareils 32-bit ou émulateurs',
			url: `${ANDROID_REPO}/releases/tag/v${ANDROID_VERSION}`
		}
	]
};

export function detectPlatform(): PlatformId {
	if (typeof navigator === 'undefined') return 'linux';
	const ua = navigator.userAgent.toLowerCase();
	if (ua.includes('android')) return 'android';
	if (ua.includes('mac')) return 'macos';
	if (ua.includes('win')) return 'windows';
	return 'linux';
}
