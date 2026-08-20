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
      if (q.type === "imageIdentification") {
        if (!q.image || !["full", "partial"].includes(q.variant)) {
          throw new Error(`Round ${i + 1}, question ${j + 1}: invalid image identification configuration.`);
        }
        if (q.variant === "partial") {
          const c = q.crop;
          if (!c || [c.x, c.y, c.width, c.height].some(v => typeof v !== "number")) {
            throw new Error(`Round ${i + 1}, question ${j + 1}: partial image questions require crop coordinates.`);
          }
          if (c.x < 0 || c.y < 0 || c.width <= 0 || c.height <= 0 || c.x + c.width > 1 || c.y + c.height > 1) {
            throw new Error(`Round ${i + 1}, question ${j + 1}: crop coordinates must be normalized to 0–1 and remain within the image.`);
          }
        }
      }
    });
  });
}

export async function loadQuiz(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`${path} could not be loaded`);
  const quiz = await response.json();
  validateQuiz(quiz);

  // Keep quiz asset paths relative to the quiz.json file.
  const base = new URL(".", new URL(path, window.location.href)).href;
  quiz.assetBase = base;
  return quiz;
}
