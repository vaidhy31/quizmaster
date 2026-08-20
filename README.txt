QuizTime v1.2

Frozen baseline: QuizTime v1.0.

v1.2 adds:
- Multiple quizzes via quizzes/index.json.
- Each quiz lives in its own quizzes/<quiz-id>/ folder.
- Quiz JSON is stored beside its quiz-specific assets.
- App assets remain in the top-level assets/ folder.
- Image Identification question type with full and partial variants.
- Partial image questions use normalized crop coordinates against the original quiz asset.

Structure:
  assets/                 App-owned assets only
  quizzes/index.json      Quiz catalog
  quizzes/<id>/quiz.json Quiz content
  quizzes/<id>/assets/   Assets owned by that quiz
  js/                     App code
