
import { esc } from "../utils/helpers.js";

export function renderScoringPanel(quiz, game, points) {
  return `
    <div class="score-panel">
      <div class="score-panel-title">Award ${points} points for this question</div>
      <div class="score-actions">
        ${quiz.teams.map((team, index) => `
          <button
            class="btn score-btn ${game.currentAwards.has(index) ? "good" : ""}"
            data-action="toggle-score"
            data-team="${index}">
            ${esc(team)}<br>
            <strong>${game.currentAwards.has(index) ? "+" : ""}${points}</strong>
          </button>`).join("")}
      </div>
      <div class="muted" style="text-align:center;font-size:12px;margin-top:5px">
        Tap a team to award points · tap again to remove
      </div>
    </div>`;
}
