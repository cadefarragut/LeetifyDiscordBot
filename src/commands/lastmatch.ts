import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("lastmatch")
	.setDescription("Displays most recent match stats");

