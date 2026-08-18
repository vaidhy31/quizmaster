
export function createInitialGame(teamCount = 0, roundCount = 0) {
  return {
    screen: "home",
    round: 0,
    q: null,
    scores: Array(teamCount).fill(0),
    selected: null,
    revealed: false,
    currentAwards: new Set(),
    currentTeam: 0,
    usedQuestions: Array.from({ length: roundCount }, () => new Set()),
    leaderMode: "view"
  };
}

export function createGameForQuiz(quiz) {
  return createInitialGame(quiz.teams?.length ?? 0, quiz.rounds.length);
}
