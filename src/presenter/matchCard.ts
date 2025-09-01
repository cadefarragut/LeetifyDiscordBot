import type { PreviousMatchStats, MonthStats, Leaderboard } from "../types/domain.ts";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, EmbedBuilder } from 'discord.js';
import { createCanvas, loadImage } from "canvas";


const MEDALS = ["🥇", "🥈", "🥉"];

/*export function buildLeaderboardText(board: Leaderboard): string {
  if (!board.entries.length) return "No players added for this server.";
  const lines = board.entries.map((e, i) =>
    `**${i+1}.** \`${e.name}\` — Matches: ${e.stats.matches} • Kills: ${e.stats.kills} • ` +
    `Deaths: ${e.stats.deaths} • K/D: ${e.stats.kdr}`
  );
  return `UTC Month Leaderboard (${board.monthISO})\n` + lines.join("\n");
}*/

 export function testEmbed(board: Leaderboard): EmbedBuilder {
	

	const embed = new EmbedBuilder()
		.setColor(0x00c853)
		.setTitle(`🔥 Monthly Leaderboard — ${board.monthISO}`);

	const prof = board.entries.map((e, i) => {

		const rank = i + 1;
		const emoji = MEDALS[i] ?? `${rank}`;
		const isTop3 = i < 3;
	

		embed.addFields({
			name: `${emoji} **${e.name}**`,
			value : `Matches: **${e.stats.matches}** Kills: **${e.stats.kills}**, Deaths: **${e.stats.deaths}**, K/D: **${e.stats.kdr}**`,
			inline: !isTop3,
		});
	});

	return embed;
}
/*export async function renderLeaderboard(board: Leaderboard, rows = 10): Promise<Buffer> {
  const width = 900;
  const rowHeight = 56;
  const headerH = 100;
  const footerH = 40;

  const rowsShown = Math.min(rows, board.entries.length);
  const height = headerH + rowsShown * rowHeight + footerH;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.textBaseline = "alphabetic";

  // Background
  ctx.fillStyle = "#0B1117";
  ctx.fillRect(0, 0, width, height);

  // Title
  ctx.fillStyle = "#EAF2F8";
  ctx.font = "bold 28px sans-serif";
  ctx.fillText("🏆 Monthly Leaderboard", 24, 50);

  // Month
  ctx.fillStyle = "#AEB6BF";
  ctx.font = "16px sans-serif";
  ctx.fillText(`Month: ${board.monthISO}`, 24, 76);

  // Render each entry in order
  for (let i = 0; i < rowsShown; i++) {
    const e = board.entries[i];
    const y = headerH + i * rowHeight;

    // Row background stripe
    ctx.fillStyle = i % 2 === 0 ? "#0F1820" : "#121C26";
    ctx.fillRect(20, y - 24, width - 40, rowHeight - 8);

    // Highlight top 3
    if (e.rank <= 3) {
      ctx.fillStyle = e.rank === 1 ? "#FFD54A22" : e.rank === 2 ? "#D3D3D322" : "#C8912B22";
      ctx.fillRect(20, y - 24, width - 40, rowHeight - 8);
    }

    // Medal or numeric rank
    const rankLabel = e.rank <= 3 ? MEDALS[e.rank - 1] : `${e.rank}.`;
    ctx.fillStyle = "#FFD54A";
    ctx.font = e.rank <= 3 ? "bold 22px sans-serif" : "20px sans-serif";
    ctx.fillText(rankLabel, 40, y);

    // Username
    ctx.fillStyle = "#F8F9F9";
    ctx.font = e.rank <= 3 ? "bold 20px sans-serif" : "20px sans-serif";
    ctx.fillText(e.username, 100, y);

    // Stats (you can position them however you like)
    ctx.fillStyle = "#E5E8E8";
    ctx.font = "18px monospace";
    ctx.fillText(`Kills: ${e.kills}`, 400, y);
    ctx.fillText(`Deaths: ${e.deaths}`, 550, y);
    ctx.fillText(`K/D: ${e.kdr}`, 700, y);
  }

  // Footer
  ctx.fillStyle = "#99A3A4";
  ctx.font = "14px sans-serif";
  ctx.fillText(`Updated ${new Date().toISOString().slice(0, 10)}`, 24, height - 14);

  return canvas.toBuffer("image/png");
} */
