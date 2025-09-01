import fs from "node:fs/promises";
import path from "node:path";

type Store = Record<string, string[]>;

const FILE = path.resolve ("data", "leaderboard.store.json");

async function ensureFile() {
	await fs.mkdir(path.dirname(FILE), { recursive : true }).catch(() => {});
	try { await fs.access(FILE); }
	catch { await fs.writeFile(FILE, "{}", "utf8"); }
}

async function readStore(): Promise<Store> {
	await ensureFile();
	const raw = await fs.readFile(FILE, "utf8");
	return JSON.parse(raw || "{}");
}

async function writeStore(store: Store){
	await fs.writeFile(FILE, JSON.stringify(store, null, 2), "utf8");
}

export async function addSteamId(guildId: string, steamId64: string): Promise<boolean> {
	const store = await readStore();
	store[guildId] ??= [];
	const list = store[guildId];
	if (list.includes(steamId64)) return false;
	list.push(steamId64);
	await writeStore(store);
	return true;
}

export async function listSteamIds(guildId: string): Promise<string[]> {
	const store = await readStore();
	return store[guildId] ?? [];
}

export async function removeSteamId(guildId: string, steamId64: string): Promise<boolean> {
	const store = await readStore();
	const list = store[guildId];
	if (!list) return false;
	const i = list.indexOf(steamId64);
	if (i == -1) return false;
	list.splice(i, 1);
	await writeStore(store);
	return true;
}


export async function addGuild(guildId: string): Promise<boolean> {
	const store = await readStore();
	if (store[guildId]) return false; 
	store[guildId] = []; 
	await writeStore(store);
	console.log(`Added guild ${guildId} to leaderboard storage`);
	return true;
}

export async function removeGuild(guildId: string): Promise<boolean> {
	const store = await readStore();
	if (!store[guildId]) return false; 
	delete store[guildId];
	await writeStore(store);
	console.log(`Removed guild ${guildId} from leaderboard storage`);
	return true;
}

export async function listGuilds(): Promise<string[]> {
	const store = await readStore();
	return Object.keys(store);
}

export async function isGuildAuthorized(guildId: string): Promise<boolean> {
	const store = await readStore();
	return guildId in store;
}
