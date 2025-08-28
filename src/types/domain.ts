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

	steamId64: string;
	username: string ;
}

export interface Leaderboard {
	guildId: string;
	monthISO: string;
	entries: MonthStats[];
}
