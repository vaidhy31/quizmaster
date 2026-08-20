
import { esc } from "../utils/helpers.js";

export function renderLeaderboard({ quiz, game }) {
  const sorted = game.scores.map((score, index) => ({ score, index }))
    .sort((a, b) => b.score - a.score);

  return `
    <aside class="card side-board">
      <h3 class="leaderboard-title">🏆 Leaderboard</h3>
      <div class="side-current">
        Team ${game.currentTeam + 1} of ${quiz.teams.length}:
        <strong>${esc(quiz.teams[game.currentTeam])}</strong>
      </div>
      <div class="side-leaders">
        ${sorted.map((item, position) => `
          <div class="side-leader ${item.index === game.currentTeam ? "current" : ""}">
            <div class="side-rank">${["🥇","🥈","🥉"][position] || position + 1}</div>
            <div class="side-name">${esc(quiz.teams[item.index])}</div>
            <div class="side-points">${item.score}</div>
          </div>`).join("")}
      </div>
    </aside>`;
}
