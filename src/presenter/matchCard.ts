import type { PreviousMatchStats } from "../types/domain";
export interface Presentation { content : string }
export function build (m : PreviousMatchStats): Presentation {
	const kdr = m.stats.deaths == 0 ? "Goat" : (m.stats.kills / m.stats.deaths).toFixed(2);
	return { content: `Last Match Stats were ${m.stats.kills} kills and ${m.stats.deaths} for a ${kdr} K/D` }
}	
