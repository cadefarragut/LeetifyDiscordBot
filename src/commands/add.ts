import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { addSteamId } from '../core/storage.ts';

export const data = new SlashCommandBuilder()
	.setName("add")
	.setDescription("add a SteamID to the Leetify leaderboard")
	.setDMPermission(false)
	.addStringOption(o => 
	o.setName("steamid64")
	.setDescription("SteamID64 (17 digits, starting with 7656)")
	.setRequired(true)
);


export async function execute(i : ChatInputCommandInteraction) {
	if (!i.guildId) {
		await i.reply({ content: "Server only.", ephmeral: true})
		return;
	}

	await i.deferReply();
	const steamId64 = i.options.getString("steamid64", true);

	try{
		if (!/^\d{17}$/.test(steamId64)){
			await i.editReply("Please provide a valid 17-digit Steam ID.");
			return;
		}	
		const ok = await addSteamId(i.guildId, steamId64);
		await i.editReply(ok 
			? `Added ${steamId64} to this server's leaderboard.`
			: `${steamId64} is already on this server's leaderboard.`);


	} catch (err) {
		console.error('Fetch Error: ', err);
	}
	return;

}
