import { convertFileSrc } from '@tauri-apps/api/core';
import { getDownloadedCover } from './download.svelte.ts';
import { thumbUrl } from './thumb-url.ts';

// Rewrite a Google image URL to (about) the pixel size a slot actually renders, so WebKitGTK
// doesn't decode a 544px (or 1080p) image for a 40px row. Only lh3/yt3 googleusercontent-style
// URLs carry the size in the URL (`=w544-h544` / `=s576` suffixes). A video's i.ytimg thumb has its
// sizes as separate files that can 404, so only the big player swaps one (see below); anything else
// is returned unchanged.
export function thumb(url: string | undefined | null, px: number, videoId?: string | null): string | undefined {
	if (!url && !videoId) return undefined;
	// For downloaded tracks, prefer the local offline cover (high-res, works offline)
	if (videoId) {
		const offlineCover = getDownloadedCover(videoId);
		if (offlineCover) return convertFileSrc(offlineCover);
	}
	if (!url) return undefined;
	// Local library artwork is a path on this machine, not a URL. The webview can't open a bare
	// path, so hand it through Tauri's asset protocol. Kept here rather than at the command
	// boundary so what gets stored (queue, Shortcuts) stays the real path - which is also what
	// MPRIS needs.
	if (url.startsWith('/') || /^[A-Za-z]:[\\/]/.test(url)) return convertFileSrc(url);
	// The size maths lives in `thumb-url.ts`, import-free: `thumb.check.ts` runs in plain node,
	// which cannot follow this file's app imports (`download.svelte.ts` and friends).
	return thumbUrl(url, px);
}

// i.ytimg answers a size it doesn't have with a 404 *and* a 120x90 grey picture, which a webview
// may load without firing `error`. Read that picture as the miss it is.
export function isMissingThumb(e: Event): boolean {
	const img = e.currentTarget as HTMLImageElement;
	return img.naturalWidth === 120 && img.naturalHeight === 90;
}
