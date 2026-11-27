// The pure half of `thumb.ts`: the URL-size maths, with no imports at all, so the self-check
// (`thumb.check.ts`, plain node) can import it without dragging in the app's module graph.
// Everything that needs Tauri or the download store stays in `thumb.ts`.

// Every InnerTube reply, /player included, tops a video's thumbs out at 426x240, which the big
// player crops square and stretches (#425). Ask for the 1280x720 file instead; not every video
// has one, so the caller steps down to the original on a miss (`isMissingThumb`).
export function thumbUrl(url: string, px: number): string {
	const video = /^https:\/\/i\.ytimg\.com\/vi\/([\w-]{11})\//.exec(url);
	if (video && px >= 720) return `https://i.ytimg.com/vi/${video[1]}/maxresdefault.jpg`;
	if (/=w\d+-h\d+/.test(url)) return url.replace(/=w\d+-h\d+/, `=w${px}-h${px}`);
	if (/=s\d+/.test(url)) return url.replace(/=s\d+/, `=s${px}`);
	return url;
}
