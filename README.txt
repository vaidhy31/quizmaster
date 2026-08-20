QuizTime v1.6 — multiple quiz support.

Structure:
- quizzes/index.json: quiz catalog.
- quizzes/<quiz-id>/quiz.json: individual quiz data.
- quizzes/<quiz-id>/assets/: assets belonging to that quiz, such as images/audio.
- js/: reusable application components and question types.

To add a quiz:
1. Create a folder under quizzes using the quiz id.
2. Put its quiz.json in that folder.
3. Put quiz-specific assets in that folder's assets directory.
4. Add the quiz entry to quizzes/index.json with file set to ./<quiz-id>/quiz.json.

Application-wide settings remain in the application code/configuration; quiz content and quiz-specific assets live together under the quiz folder.
