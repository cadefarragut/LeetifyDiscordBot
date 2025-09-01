import { REST, Routes, SlashCommandBuilder } from "discord.js";
import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { listGuilds } from "./core/storage.ts";

const token = process.env.DISCORD_TOKEN;
const clientID = process.env.DISCORD_CLIENT_ID;
//const guildIDs = (process.env.DISCORD_GUILD_ID || "")
//		.split(",").map(s => s.trim()).filter(Boolean);

if ( !token || !clientID ){ //|| !guildIDs){
	console.error("Missing DISCORD_TOKEN/CLIENT_ID in .env");
	process.exit(1);
}

async function	loadCommandsFrom(dir: string){
	const entries = await fs.readdir(dir);
	const files = entries.filter(f => /\.(ts|js)$/.test(f) && f !=="index.ts");

	const commands: any[] = [];
	for ( const file of files) {
		const modURL= pathToFileURL(path.join(dir, file)).href;
		const mod = await import(modURL);
		//const data: SlashCommandBuilder | undefined = mod.data;
		const data = mod.data;
		if ( !data || typeof data.toJSON !== "function" ) {
			console.warn(`Skipping ${file} : no exported 'data' SlashCommandBuilder`)
			continue;
		}
		commands.push(data.toJSON());
		console.log(`Loaded ${data.name} from ${file}`);
	}
	return commands;
}

(async () => {
	const commandsDir = path.join (__dirname, "commands");
	const body = await loadCommandsFrom(commandsDir);

	const rest = new REST({version : "10"}).setToken(token);
	const guildIDs = await listGuilds();
	if (guildIDs.length === 0) {
		console.log("No guilds found in leaderboard storage. Commands will be registered when bot joins guilds.");
		return;
	  }

	console.log("Registering guild commands...");
	for ( const gid of guildIDs ) {
		await rest.put(Routes.applicationGuildCommands(clientID, gid), { body });
		console.log(`Registered ${body.length} command(s) to guild ${gid}`);
	}

//	await rest.put(Routes.applicationGuildCommands(clientID, guildID), { body });
//	console.log(`Registered ${body.length} command(s) to guild ${guildID}`);
})().catch(err => {
		console.error("Failed to Register Command(s): ", err);
		process.exit(1);
});
