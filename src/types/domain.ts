export interface PreviousMatchStats {
	kills: number;
	deaths: number;
	kdr: number;
}

export interface MonthStats {
	kills: number;
	deaths: number;
	kdr: number;
	matches: number;
	rank: number;
}

export interface LeaderBoardEntry {
	steamId64: string;
	stats : MonthStats;
}

export interface Leaderboard {
	guildId: string;
	monthISO: string;
	entries: LeaderBoardEntry[];
}
