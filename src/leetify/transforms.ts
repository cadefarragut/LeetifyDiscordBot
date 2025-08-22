import type { PreviousMatchStats } from "../types/domain.ts";

export function toPreviousMatchStats(m: any): PreviousMatchStats {
	const kills = Number(m.stats[0].total_kills);
	const deaths = Number(m.stats[0].total_deaths);
	const kdr = deaths == 0 ? Infinity : (kills/deaths).toFixed(2);
	return { kills, deaths, kdr };
}
