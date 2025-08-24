import type { PreviousMatchStats, MonthStats, Leaderboard } from "../types/domain.ts";
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


export function buildLeaderboardText(board: Leaderboard): string {
  if (!board.entries.length) return "No players added for this server.";
  const lines = board.entries.map((e, i) =>
    `**${i+1}.** \`${e.steamId64}\` — Matches: ${e.stats.matches} • Kills: ${e.stats.kills} • ` +
    `Deaths: ${e.stats.deaths} • K/D: ${e.stats.kdr}`
  );
  return `UTC Month Leaderboard (${board.monthISO})\n` + lines.join("\n");
}
