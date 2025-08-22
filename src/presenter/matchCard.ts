import type { PreviousMatchStats, MonthStats } from "../types/domain.ts";

export function buildOutput(m: PreviousMatchStats): string{
	const kdrText = m.kdr == Infinity ? "∞ You are the Goat" : m.kdr;
	return [
		`Last Match Kills: ${m.kills}`,
		`Last Match Deaths: ${m.deaths}`,
		`Last Match K/D: ${kdrText}`,
	].join("\n");
}

export function buildMonthStats(m: MonthStats): string {
  if (m.matches === 0) return "No matches in the current UTC month.";
  return [
    "UTC month-to-date:",
    `Matches: ${m.matches}`,
    `Kills: ${m.kills}`,
    `Deaths: ${m.deaths}`,
    `K/D: ${m.kdr}`
  ].join("\n");
}
