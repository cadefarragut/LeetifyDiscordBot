import type { PreviousMatchStats } from "../types/domain.ts";

export function buildOutput(m: PreviousMatchStats): string{
	const kdrText = m.kdr == Infinity ? "∞ You are the Goat" : m.kdr;
	return [
		`Last Match Kills: ${m.kills}`,
		`Last Match Deaths: ${m.deaths}`,
		`Last Match K/D: ${m.kdr}`,
	].join("\n");
}
