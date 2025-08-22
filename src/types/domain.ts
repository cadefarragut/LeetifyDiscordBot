export interface PreviousMatchStats {
	version: "match.v1";
	source: "leetify";
	matchId: string;
	player: {steamId64: string};
	stats: { kills: number, deaths: number };
}
