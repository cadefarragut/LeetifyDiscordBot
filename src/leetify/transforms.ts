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

export function toMonthStatsFor(m: any[], steamId64: string): MonthStats {
  let matches = 0, kills = 0, deaths = 0;

  for (const x of m) {
    if (!x || !x.stats) continue;

    // pick the correct player's stats object
    let idx = -1;

    if (Array.isArray(x.stats)) {
      for (let j = 0; j < x.stats.length; j++) {
        const pj = x.stats[j];
        if (pj && String(pj.steam64_id) === String(steamId64)) { idx = j; break; }
      }
      if (idx === -1) {
        if (x.stats.length === 0) continue;   // nothing to read
        idx = 0;                               // fallback if not found
      }

      const ps = x.stats[idx];
      const k = ps && ps.total_kills  != null ? ps.total_kills  : (ps && ps.kills  != null ? ps.kills  : 0);
      const d = ps && ps.total_deaths != null ? ps.total_deaths : (ps && ps.deaths != null ? ps.deaths : 0);

      kills  += Number(k);
      deaths += Number(d);
      matches++;
    } else if (typeof x.stats === "object") {
      const ps = x.stats;
      const k = ps.total_kills  != null ? ps.total_kills  : (ps.kills  != null ? ps.kills  : 0);
      const d = ps.total_deaths != null ? ps.total_deaths : (ps.deaths != null ? ps.deaths : 0);

      kills  += Number(k);
      deaths += Number(d);
      matches++;
    }
  }

  const kdr = deaths === 0 ? Infinity : (kills / deaths).toFixed(2);
  return { matches, kills, deaths, kdr };
}
