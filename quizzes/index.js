import funIndia from "./fun-india/quiz.js";

export const quizCatalog = [
  {
    id: "fun-india",
    name: funIndia.name,
    quiz: funIndia,
    assetBase: new URL("./fun-india/", import.meta.url).href
  }
];

export function getQuizCatalog() {
  return quizCatalog;
}

