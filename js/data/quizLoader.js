export async function loadAppData() {
  const response = await fetch("./quizzes/index.json", { cache: "no-store" });
  if (!response.ok) throw new Error("index.json could not be loaded");
  const appData = await response.json();

  if (!appData || !Array.isArray(appData.quizzes) || !appData.quizzes.length) {
    throw new Error("index.json does not contain any quizzes.");
  }

  return appData;
}

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

export async function loadQuiz(quizEntry) {
  if (!quizEntry?.file) {
    throw new Error("The selected quiz does not have a data file.");
  }

  const response = await fetch(quizEntry.file, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Could not load quiz "${quizEntry.name || quizEntry.id}".`);
  }

  const quiz = await response.json();
  validateQuiz(quiz);
  quiz.__basePath = new URL(".", response.url).href;
  return quiz;
}
