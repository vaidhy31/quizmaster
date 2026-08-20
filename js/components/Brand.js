import { APP_VERSION } from "../config.js";

export function renderBrand(size = "header") {
  return `
    <div class="quiztime-brand quiztime-brand-${size}" aria-label="QuizTime ${APP_VERSION}">
      <span class="quiztime-word quiztime-quiz">QUIZ</span>
      <img class="quiztime-clock" src="./assets/quiztime-clock.gif" alt="" aria-hidden="true">
      <span class="quiztime-word quiztime-time">TIME</span>
      <span class="quiztime-version">${APP_VERSION}</span>
    </div>
  `;
}
