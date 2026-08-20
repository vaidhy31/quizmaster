QuizTime v1.5

Frozen baseline: QuizTime v1.0.

v1.5 updates:
- The application version is centrally defined in js/config.js and displayed in the QuizTime header.
- The ZIP/package folder and README use the same version number.
- The quiz catalog is defined in quizzes/index.js.
- QuizTime now opens at the quiz catalog and requires the user to select a quiz.
- Each quiz lives in its own quizzes/<quiz-id>/ folder.
- Runtime quiz content is loaded from quiz.js modules so QuizTime works when opened directly from the iPad Files app.
- Quiz-specific assets remain under quizzes/<quiz-id>/assets/.
- App assets remain in the top-level assets/ folder.
- Image Identification supports full and partial variants.

QuizTime opens at the quiz catalog. The user must select a quiz before the quiz can start. There is no default startup quiz.

To add a quiz:
1. Create quizzes/<quiz-id>/quiz.js.
2. Put its assets in quizzes/<quiz-id>/assets/.
3. Add the quiz import and catalog entry in quizzes/index.js.
4. Set defaultQuizId to that quiz id if it should start automatically.
