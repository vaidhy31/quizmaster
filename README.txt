QuizTime v1.1 — multiple quiz support.

Structure:
- app.json: application settings, default teams, and the quiz catalog.
- quizzes/: individual quiz data files.
- js/: reusable application components and question types.

To add a quiz:
1. Add a new JSON file under quizzes/.
2. Add an entry to app.json under "quizzes" with id, name, description, file, rounds, and questions.
3. The new quiz will automatically appear in the home-screen selector.

Quiz files contain quiz content only; app-level settings and the quiz catalog remain in app.json.
