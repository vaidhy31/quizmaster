
import { esc } from "../utils/helpers.js";

export function renderRegularQuestion(question, game) {
  const answer = question.answer;
  return `
    <div class="regular-answer-area">
      <div class="muted">ANSWER</div>
      <div class="regular-answer">${game.revealed ? esc(answer) : "&nbsp;"}</div>
    </div>`;
}
