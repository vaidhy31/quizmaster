
export function validateQuiz(x) {
  if (!x || typeof x !== "object" || !Array.isArray(x.rounds) || !x.rounds.length) {
    throw new Error("The quiz must contain at least one round.");
  }
  x.rounds.forEach((round, i) => {
    if (!round.name || !Array.isArray(round.questions)) {
      throw new Error(`Round ${i + 1} is invalid.`);
    }
    round.questions.forEach((q, j) => {
      if (!q || !q.type || !q.question) {
        throw new Error(`Round ${i + 1}, question ${j + 1} is invalid.`);
      }
    });
  });
}

export async function loadQuiz() {
  const response = await fetch("./quiz.json", { cache: "no-store" });
  if (!response.ok) throw new Error("quiz.json could not be loaded");
  const quiz = await response.json();
  validateQuiz(quiz);
  return quiz;
}
