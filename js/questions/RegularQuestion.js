import { esc } from "../utils/helpers.js";

export function renderRegularQuestion(question, game) {
  return `
    <div class="question-type-layout">
      <div class="question">${esc(question.question)}</div>
      <div class="regular-answer-area">
        <div class="muted">ANSWER</div>
        <div class="regular-answer">${game.revealed ? esc(question.answer) : "&nbsp;"}</div>
      </div>
    </div>`;
}
