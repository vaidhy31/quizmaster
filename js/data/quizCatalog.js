export async function loadQuizCatalog() {
  const response = await fetch("./quizzes/index.json", { cache: "no-store" });
  if (!response.ok) throw new Error(`Could not load quizzes/index.json (${response.status}).`);
  const data = await response.json();
  if (!data || !Array.isArray(data.quizzes)) throw new Error("Invalid quiz catalog: quizzes must be an array.");
  return { quizzes: data.quizzes };
}
