export async function fetchRecentMatches(steamId64: string, limit=1){
	const base = process.env.LEETIFY_BASE_URL;
	const url = new URL(`https://api-public.cs-prod.leetify.com/v3/profile/matches?id=${steamId64}`, base);
	url.searchParams.set("limit", String(limit));

	const headers: Record<string, string> = {};
	if (process.env.LEETIFY_API_TOKEN) headers.Authorization = `Bearer ${process.env.LEETIFY_API_TOKEN}`;
	
	const res = await fetch(url, { headers, signal: AbortSignal.timeout(10_000) });
	if( !res.ok ) throw now Error(`Leetify ${res.status}`);
	return res.json();
}
