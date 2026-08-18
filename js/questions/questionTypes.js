import { renderRegularQuestion } from "./RegularQuestion.js";
import { renderMultipleChoiceQuestion } from "./MultipleChoiceQuestion.js";

export const questionTypes = {
  regular: renderRegularQuestion,
  multiple: renderMultipleChoiceQuestion
};

export function renderQuestionContent(question, game) {
  const renderer = questionTypes[question.type];
  if (!renderer) {
    return `
      <div class="question-type-layout">
        <div class="question">${question.question}</div>
        <div class="regular-answer-area">
          <div class="muted">UNSUPPORTED QUESTION TYPE</div>
          <div class="regular-answer">${question.type}</div>
        </div>
      </div>`;
  }
  return renderer(question, game);
}
