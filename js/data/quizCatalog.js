const CATALOG_URL = "./quizzes/index.json";

export async function loadQuizCatalog() {
  const response = await fetch(CATALOG_URL, { cache: "no-store" });
  if (!response.ok) throw new Error("quizzes/index.json could not be loaded");
  const catalog = await response.json();
  if (!catalog || !Array.isArray(catalog.quizzes) || !catalog.quizzes.length) {
    throw new Error("The quiz catalog does not contain any quizzes.");
  }
  catalog.quizzes.forEach((item, index) => {
    if (!item || !item.id || !item.name || !item.path) {
      throw new Error(`Quiz catalog entry ${index + 1} is invalid.`);
    }
  });
  return catalog.quizzes;
}
