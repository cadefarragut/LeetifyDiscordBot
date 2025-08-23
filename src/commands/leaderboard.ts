import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { ListSteamIds } from "../core/storage.ts";
import { fetchRecentMatches } from '../leetify/client.ts';
import { currentMonthWindow } from '../core/time.ts';
// import toMonthStatsFromRaw ../leetify/transforms.ts
// import buildLeaderboard
export const data = new SlashCommandBuilder()
	.setName("leaderboard")
	.setDescription("Diplay the Discord's Leetify Leaderboard");
	.setDMPermission(false)
);


export async function execute(guildId: string): {
	const ids = await ListSteamIds(guildId);
	if ( ids.length == 0 ) return [];
	const { start, end } = currentMonthWindow();
	for ( const )		
		try{

		} catch (err) {
			console.error('Fetch Error: ', err);
		}
	return;

}
