import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("lastmatch")
	.setDescription("Displays most recent match stats")
	.addStringOption(o => 
	o.setName("steamid64")
	.setDescription("SteamID64 (17 digits, starting with 7656)")
	.setRequired(true)
);
