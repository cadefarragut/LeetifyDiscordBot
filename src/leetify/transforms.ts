import type { PreviousMatchStats, MonthStats } from "../types/domain.ts";

export function toPreviousMatchStats(m: any): PreviousMatchStats {
	const kills = Number(m.stats[0].total_kills);
	const deaths = Number(m.stats[0].total_deaths);
	const kdr = deaths == 0 ? Infinity : (kills/deaths).toFixed(2);
	return { kills, deaths, kdr };
}

export function toMonthStats(m: any[]): MonthStats {
	let matches = 0, kills = 0, deaths = 0;
	for (const x of m){
		kills += Number(x.stats[0].total_kills);
		deaths += Number(x.stats[0].total_deaths);
		matches++;
	}
	const kdr = (kills/deaths).toFixed(2);
	return {m: matches, kills, deaths, kdr };
}


