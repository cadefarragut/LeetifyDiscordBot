import { SlashCommandBuilder, ChatInputCommandInteraction, AttachmentBuilder } from "discord.js";
import { listSteamIds } from "../core/storage.ts";
import { fetchRecentMatches, fetchProfile } from '../leetify/client.ts';
import { currentMonthWindow } from '../core/time.ts';
import { toMonthStatsFor } from '../leetify/transforms.ts';
import { buildLeaderboardText, testEmbed, renderLeaderboard} from '../presenter/matchCard.ts';


export const data = new SlashCommandBuilder()
	.setName("leaderboard")
	.setDescription("Diplay the Discord's Leetify Leaderboard")
	.setDMPermission(false);


export async function execute(i: ChatInputCommandInteraction) {
	if (!i.guildId ) {
		await i.reply({ content : "This command can only be used n a server.", ephemeral: true });
		return ;
	}

	await i.deferReply();
	const ids = await listSteamIds(i.guildId);

	if ( ids.length == 0 ) {
		await i.editReply("No players added. Use /add <steamID> to add new players.");
		return;
	}

	const { start, end } = currentMonthWindow();

	const monthISO = `${start.getUTCFullYear()}-${String(start.getUTCMonth()+1).padStart(2,"0")}`;

	const entries: MonthStats[] = [];

	for ( const sid of ids ){
		try{	
			const raw = await fetchRecentMatches(sid, 200);
			const profile = await fetchProfile(sid, 1);
			const name = profile.name;
			const filtered: any[] = [];
			for (const x of raw ){ // for each match 
				const t = Date.parse(x && x.finished_at); // t ==  time of which match ended (If value is present)
				//if t is a valid time in between the start and end of the current month, push onto filtered stack.
				if(Number.isFinite(t) && t >= start.getTime() && t <= end.getTime()) filtered.push(x);
			}
			const stats = toMonthStatsFor(filtered); // for all the matches in the month, get their stats
			entries.push({ name, steamId64: sid, stats });

		} catch (err) {
			console.error('Leaderboard Fetch Error for: ', sid, err);
			entries.push({ steamId64: sid, stats: { matches: 0, kills: 0, deaths: 0, kdr: 0 } });
		}
	}
	entries.sort((a, b) => b.stats.kills - a.stats.kills); // sort by kills
	const board: Leaderboard = { guildId: i.guildId, monthISO, entries};
	console.log(board.entries);
//	await i.editReply(buildLeaderboardText(board));
	await i.editReply({ embeds: [testEmbed(board)] });
	
//	const buf = await renderLeaderboard(board, 10);
//	const file = new AttachmentBuilder(buf, { name: "leaderboard.png" });
//	await i.editReply({ files: [file] });

	return;
}
