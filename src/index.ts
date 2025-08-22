import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';
import 'dotenv/config';
import * as lastmatch from './commands/lastmatch.ts';

// Create bot processes and make sure they are not missing
const token = process.env.DISCORD_TOKEN;
const client_id = process.env.DISCORD_CLIENT_ID;
const guild_id = process.env.DISCORD_GUILD_ID;

if (!token || !client_id || !guild_id){
	console.error('DISCORD_TOKEN/CLIENT_ID/GUILD_ID is missing from .env');
	process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('clientReady', () => {
	console.log(`Ready as ${client.user.tag}`);
});

client.on('interactionCreate', async (i) => {
	if (!i.isChatInputCommand()) return;
	if (i.commandName == lastmatch.data.name) return lastmatch.execute(i);
});

(async () => {
  try {
    console.log('Logging in…');
    await client.login(token); // Logging in and Booting Bot
  } catch (err) {
    console.error('Login failed:', err);
    process.exit(1);
  }
})
();
