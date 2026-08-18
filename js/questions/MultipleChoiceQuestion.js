
import { esc } from "../utils/helpers.js";

export function renderMultipleChoiceQuestion(question, game) {
  return `
    <div class="answer-grid">
      ${question.options.map((option, index) => `
        <button
          class="answer ${game.revealed && index === question.answer ? "correct" : ""}
          ${game.revealed && game.selected === index && index !== question.answer ? "wrong" : ""}
          ${!game.revealed && game.selected === index ? "selected" : ""}"
          ${game.revealed ? "disabled" : ""}
          data-action="select-answer"
          data-answer="${index}">
          ${String.fromCharCode(65 + index)}. ${esc(option)}
        </button>`).join("")}
    </div>`;
}
