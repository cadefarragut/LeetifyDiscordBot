import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { fetchRecentMatches } from '../leetify/client.ts';

export const data = new SlashCommandBuilder()
	.setName("profile")
	.setDescription("Displays Leetify Profile")
	.addStringOption(o => 
	o.setName("steamid64")
	.setDescription("SteamID64 (17 digits, starting with 7656)")
	.setRequired(true)
);


export async function execute(i : ChatInputCommandInteraction) {

	await i.deferReply();
	const steamId64 = i.options.getString("steamid64", true);

	try{
		const matches = await fetchRecentMatches(steamId64, 1);
		if (!matches.length) {await i.editReply("No recent matches found"); return; }
		console.dir(matches)
	} catch (err) {
		console.error('Profile Fetch Error: ', err);
	}
	return;

}
