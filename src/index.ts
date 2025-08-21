import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';
import 'dotenv/config';

const token = process.env.DISCORD_TOKEN;
const client_id = process.env.DISCORD_CLIENT_ID;
const guild_id = process.env.DISCORD_GUILD_ID;


if (!token || !client_id || !guild_id){
	console.error('DISCORD_TOKEN/CLIENT_ID/GUILD_ID is missing from .env');
	process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });





client.once('clientReady', () => {
	console.log('Ready as ${c.user.tag}');
});

client.on('error', (err) => console.error('Client error', err));
client.on('shardError', (err) => console.error('Shared error:', err));
process.on('unhandledRejection', (reason) => console.error('Unhandled Rejection:', reason));
process.on('uncaughtException', (err) => console.error('Uncaught Exception:', err));

(async () => {
  try {
    console.log('Logging in…');
    await client.login(token);
  } catch (err) {
    console.error('Login failed:', err);
    process.exit(1);
  }
})



	();
