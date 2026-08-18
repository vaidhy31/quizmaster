
import { esc, gridColumns, gridRows } from "../utils/helpers.js";

export function renderNumberBoard(round, used) {
  const columns = gridColumns(round.questions.length);
  const rows = gridRows(round.questions.length);
  return `
    <div class="number-grid"
         style="--grid-cols:${columns};--grid-rows:${rows}">
      ${round.questions.map((question, index) => `
        <button
          class="number-tile ${used.has(index) ? "taken" : ""}"
          ${used.has(index) ? "disabled" : ""}
          data-action="choose-question"
          data-question="${index}">
          ${index + 1}
        </button>`).join("")}
    </div>`;
}
