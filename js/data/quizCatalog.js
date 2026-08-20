import { getQuizCatalog } from "../../quizzes/index.js";

export function loadQuizCatalog() {
  return {
    quizzes: getQuizCatalog()
  };
}
