import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { fetchRecentMatches } from '../leetify/client.ts';
import { currentMonthWindow } from '../core/time.ts';
import { toMonthStats } from '../leetify/transforms.ts';
import { buildMonthStats } from '../presenter/matchCard.ts';

export const data = new SlashCommandBuilder()
	.setName("monthstats")
	.setDescription("Displays Leetify's Current Month Stats")
	.addStringOption(o => 
	o.setName("steamid64")
	.setDescription("SteamID64 (17 digits, starting with 7656)")
	.setRequired(true)
);


export async function execute(i : ChatInputCommandInteraction) {

	await i.deferReply();
	const steamId64 = i.options.getString("steamid64", true);
	const { start, end } = currentMonthWindow();

	try{
		const matches = await fetchRecentMatches(steamId64, 1);
		const monthMatches = matches.filter((m: any) => {
			const t = Date.parse(m.finished_at);
			return t >= start.getTime() && t <= end.getTime();
		})
		const stats = toMonthStats(monthMatches);
		await i.editReply(buildMonthStats(stats));

	} catch (err) {
		console.error('Profile Fetch Error: ', err);
	}
	return;

}
