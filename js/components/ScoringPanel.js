import { esc } from "../utils/helpers.js";

export function renderScoringPanel(quiz, game, points) {
  return `
    <div class="score-panel">
      <div class="score-panel-title">Award points for this question</div>
      <div class="score-actions">
        ${quiz.teams.map((team, index) => {
          const multiplier = game.currentAwards.get(index) || 0;
          const selected = multiplier > 0;
          const child = multiplier === 2;
          return `
            <div class="btn score-btn ${selected ? "good" : ""}">
              <span>${esc(team)}</span>
              <span class="score-mode">
                <button type="button"
                  class="score-mode-btn ${selected && !child ? "selected" : ""}"
                  data-action="set-score"
                  data-team="${index}"
                  data-multiplier="1">Adult</button>
                <button type="button"
                  class="score-mode-btn ${child ? "selected" : ""}"
                  data-action="set-score"
                  data-team="${index}"
                  data-multiplier="2">Child 2×</button>
              </span>
              ${selected ? `<span class="score-points">+${points * multiplier}</span>` : ""}
            </button>`;
        }).join("")}
      </div>
      <div class="muted" style="text-align:center;font-size:12px;margin-top:5px">
        Choose Adult or Child for each team that answered correctly
      </div>
    </div>`;
}
