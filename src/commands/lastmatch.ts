import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { fetchRecentMatches } from '../leetify/client.ts';
import { toPreviousMatchStats } from "../leetify/transforms.ts";
import { buildOutput } from "../presenter/matchCard.ts";

export const data = new SlashCommandBuilder()
	.setName("lastmatch")
	.setDescription("Displays most recent match stats")
	.addStringOption(o => 
	o.setName("steamid64")
	.setDescription("SteamID64 (17 digits, starting with 7656)")
	.setRequired(true)
);


export async function execute(i : ChatInputCommandInteraction) {

	await i.deferReply();
	const steamId64 = i.options.getString("steamid64", true);
	await i.editReply(`Got it. SteamID64: ${steamId64} Fetching previous match...`);

	try{
		const matches = await fetchRecentMatches(steamId64, 1);
		if (!matches.length) {await i.editReply("No recent matches found"); return; }
		const m = matches[0];
		
		const stats = toPreviousMatchStats(m);
		await i.editReply(buildOutput(stats));
	} catch (err) {
		console.error('Last Match Error: ', err);
	}
	return;

}
