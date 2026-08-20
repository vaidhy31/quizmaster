QuizTime v1.6

This version keeps the QuizTime v1.0 layout, colours, navigation, and scoring UI frozen while adding modular question types and a multi-quiz catalog.

v1.6 updates:
- Quiz content is JSON only; there are no duplicate quiz.js files.
- quizzes/index.json is the quiz catalog.
- Each quiz lives in quizzes/<quiz-id>/quiz.json.
- Quiz-specific assets live in quizzes/<quiz-id>/assets/.
- Application assets remain under the top-level assets/ folder.
- The app always opens at the quiz catalog and requires the user to select a quiz.
- Quiz JSON and catalog data are loaded with fetch(), so QuizTime is intended to run from an HTTP server such as GitHub Pages or a local web server.
- Image Identification supports full and partial image questions with reveal behavior.

Local server example:
  python3 -m http.server 8000
Then open:
  http://localhost:8000/

To add a quiz:
1. Create quizzes/<quiz-id>/quiz.json.
2. Put quiz-specific images/audio/etc. in quizzes/<quiz-id>/assets/.
3. Add an entry to quizzes/index.json with id, name, description, and path.
