import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, Events } from 'discord.js';
import 'dotenv/config';
import * as add from './commands/add.ts';
import * as leaderboard from './commands/leaderboard.ts';
import * as remove from './commands/remove.ts';
import { addGuild, removeGuild } from './core/storage.ts';
// Create bot processes and make sure they are not missing
const token = process.env.DISCORD_TOKEN;
const client_id = process.env.DISCORD_CLIENT_ID;
// const guild_id = process.env.DISCORD_GUILD_ID;

if (!token || !client_id ) { //|| !guild_id){
	console.error('DISCORD_TOKEN and CLIENT_ID is missing from .env');
	process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('clientReady', () => {
	console.log(`Ready as ${client.user.tag}`);
});

// Handle when bot joins a new guild
client.on(Events.GuildCreate, async (guild) => {
  console.log(`Bot joined guild: ${guild.name} (${guild.id})`);
  await addGuild(guild.id);
  
  // Register commands for this specific guild
  try {
    await registerCommandsForGuild(guild.id);
  } catch (error) {
    console.error(`Failed to register commands for guild ${guild.id}:`, error);
  }
});

// Handle when bot leaves a guild
client.on(Events.GuildDelete, async (guild) => {
  console.log(`Bot left guild: ${guild.name || 'Unknown'} (${guild.id})`);
  await removeGuild(guild.id);
});


client.on('interactionCreate', async (i) => {
	if (!i.isChatInputCommand()) return;
	if (i.commandName == add.data.name) return add.execute(i);
	if (i.commandName == remove.data.name) return remove.execute(i);
	if (i.commandName == leaderboard.data.name) return leaderboard.execute(i);
});

// Function to register commands for a specific guild
async function registerCommandsForGuild(guildId: string) {
  const { REST, Routes } = await import('discord.js');
  
  const commands = [
    add.data.toJSON(),
    remove.data.toJSON(),
    leaderboard.data.toJSON()
  ];

  const rest = new REST({ version: '10' }).setToken(token);
  
  await rest.put(
    Routes.applicationGuildCommands(client_id, guildId),
    { body: commands }
  );
  
  console.log(`Registered ${commands.length} command(s) for guild ${guildId}`);
}


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
