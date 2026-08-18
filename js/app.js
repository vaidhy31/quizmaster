
import { createGameForQuiz } from "./state/gameState.js";
import { loadQuiz as fetchQuiz } from "./data/quizLoader.js";
import { esc } from "./utils/helpers.js";
import { renderLeaderboard } from "./components/Leaderboard.js";
import { renderScoringPanel } from "./components/ScoringPanel.js";
import { renderNumberBoard } from "./components/NumberBoard.js";
import { renderQuestionContent } from "./questions/questionTypes.js";

const app = document.getElementById("app");
let quiz = null;
let game = createGameForQuiz({ teams: [], rounds: [] });

function render() {
  if (!quiz) return renderHome();
  if (game.screen === "setup") return renderSetup();
  if (game.screen === "board") return renderRoundBoard();
  if (game.screen === "play") return renderPlay();
  if (game.screen === "leader") return renderFullLeaderboard();
  renderHome();
}

function renderHome() {
  app.innerHTML = `<div class="card center">
    <div style="font-size:64px">🎯</div>
    <h1>Quizmaster</h1>
    ${quiz
      ? `<h2>${esc(quiz.name)}</h2>
         <p>${quiz.rounds.length} rounds · ${quiz.rounds.reduce((n,r) => n + r.questions.length, 0)} questions</p>
         <div class="actions">
           <button class="btn primary big" data-action="open-setup">▶ Start Quiz</button>
           <button class="btn" data-action="reload-quiz">Reload Quiz</button>
         </div>`
      : `<p>Loading quiz…</p>
         <p class="muted">Quiz content is loaded from <strong>quiz.json</strong>.</p>
         <p class="landscape-hint">For the best experience, use the iPad in landscape.</p>`}
  </div>`;
}

function renderSetup() {
  const teams = quiz.teams || ["Team A", "Team B", "Team C", "Team D"];
  app.innerHTML = `<div class="card">
    <h2>Quiz Setup</h2>
    <h3>${esc(quiz.name)}</h3>
    <p>${quiz.rounds.length} rounds · ${quiz.rounds.reduce((n,r) => n + r.questions.length, 0)} questions</p>
    <h3>Teams</h3>
    <div id="teamInputs">
      ${teams.map((team, index) => `
        <div style="margin:10px 0">
          <input class="teamInput" value="${esc(team)}" placeholder="Team ${index + 1}">
        </div>`).join("")}
    </div>
    <div class="actions">
      <button class="btn" data-action="add-team">+ Add Team</button>
      <button class="btn danger" data-action="remove-team">Remove Last Team</button>
    </div>
    <div class="actions">
      <button class="btn primary big" data-action="start-game">Start Game →</button>
      <button class="btn" data-action="go-home">Cancel</button>
    </div>
  </div>`;
}

function renderRoundBoard() {
  const round = quiz.rounds[game.round];
  const used = game.usedQuestions[game.round];

  app.innerHTML = `<div class="quiz-layout">
    <section class="card quiz-main">
      <div class="board-header">
        <div>
          <div class="round">ROUND ${game.round + 1}</div>
          <h1>${esc(round.name)}</h1>
        </div>
      </div>
      ${renderNumberBoard(round, used)}
      <div class="actions">
        <button class="btn primary big" data-action="next-round">
          🏁 ${game.round + 1 < quiz.rounds.length ? "End Round" : "Finish Quiz"}
        </button>
      </div>
      <div class="board-footer-hint">Click a number to reveal the question</div>
    </section>
    ${renderLeaderboard({ quiz, game })}
  </div>`;
}

function currentQuestion() {
  return quiz.rounds[game.round]?.questions[game.q];
}

function renderPlay() {
  const round = quiz.rounds[game.round];
  const question = currentQuestion();
  if (!question) {
    game.screen = "board";
    return render();
  }

  const points = question.points || 10;

  app.innerHTML = `<div class="quiz-layout">
    <section class="card quiz-main">
      <div class="quiz-head">
        <div>
          <div class="round">ROUND ${game.round + 1} · ${esc(round.name)}</div>
          <div class="muted">Question ${game.q + 1} of ${round.questions.length}</div>
        </div>
      </div>

      ${renderQuestionContent(question, game)}

      <div class="actions question-controls">
        ${!game.revealed
          ? `<button class="btn primary big" data-action="reveal">Reveal Answer</button>`
          : `<button class="btn primary big" data-action="finish-question">Next Turn&nbsp; →</button>`}
      </div>

      ${renderScoringPanel(quiz, game, points)}
    </section>
    ${renderLeaderboard({ quiz, game })}
  </div>`;
}

function renderFullLeaderboard() {
  const sorted = game.scores.map((score, index) => ({ score, index }))
    .sort((a,b) => b.score - a.score);
  const advancing = game.leaderMode === "roundEnd";
  const isFinal = game.round + 1 >= quiz.rounds.length;

  app.innerHTML = `<div class="card">
    <div class="center">
      <div style="font-size:58px">🏆</div>
      <h1>${advancing ? (isFinal ? "Final Scores" : `Round ${game.round + 1} Complete`) : "Leaderboard"}</h1>
      <p>${advancing ? (isFinal ? "The quiz is complete." : "Here are the scores before the next round.") : "Current standings"}</p>
    </div>
    ${sorted.map((item, position) => `
      <div class="leader">
        <div class="rank">${["🥇","🥈","🥉"][position] || position + 1}</div>
        <div class="name">${esc(quiz.teams[item.index])}</div>
        <div class="points">${item.score}</div>
      </div>`).join("")}
    <div class="actions">
      ${advancing
        ? (isFinal
          ? `<button class="btn primary big" data-action="show-final">Final Scores</button>`
          : `<button class="btn primary big" data-action="advance-round">Next Round →</button>`)
        : `<button class="btn" data-action="back-to-round">← Back to Round</button>`}
      <button class="btn danger" data-action="reset-game">Reset Game</button>
      <button class="btn" data-action="go-home">Home</button>
    </div>
  </div>`;
}

function addTeam() {
  const count = document.querySelectorAll(".teamInput").length;
  if (count >= 8) return;
  document.getElementById("teamInputs").insertAdjacentHTML(
    "beforeend",
    `<div style="margin:10px 0"><input class="teamInput" value="Team ${String.fromCharCode(65 + count)}"></div>`
  );
}

function removeTeam() {
  const inputs = document.querySelectorAll(".teamInput");
  if (inputs.length > 2) inputs[inputs.length - 1].parentElement.remove();
}

function startGame() {
  quiz.teams = [...document.querySelectorAll(".teamInput")]
    .map((input, index) => input.value.trim() || `Team ${index + 1}`);
  game = createGameForQuiz(quiz);
  game.screen = "board";
  render();
}

function chooseQuestion(index) {
  const used = game.usedQuestions[game.round];
  if (used.has(index)) return;
  used.add(index);
  game.q = index;
  game.selected = null;
  game.revealed = false;
  game.currentAwards = new Set();
  game.screen = "play";
  render();
}

function selectAnswer(index) {
  if (!game.revealed) {
    game.selected = index;
    render();
  }
}

function reveal() {
  game.revealed = true;
  render();
}

function toggleScore(teamIndex) {
  const points = currentQuestion().points || 10;
  if (game.currentAwards.has(teamIndex)) {
    game.currentAwards.delete(teamIndex);
    game.scores[teamIndex] -= points;
  } else {
    game.currentAwards.add(teamIndex);
    game.scores[teamIndex] += points;
  }
  render();
}

function finishQuestion() {
  game.q = null;
  game.selected = null;
  game.revealed = false;
  game.currentAwards = new Set();
  game.currentTeam = (game.currentTeam + 1) % quiz.teams.length;
  game.screen = "board";
  game.leaderMode = "view";
  render();
}

function advanceRound() {
  if (game.round + 1 >= quiz.rounds.length) {
    game.screen = "leader";
    game.leaderMode = "view";
    return render();
  }
  game.round++;
  game.q = null;
  game.currentTeam = game.round % quiz.teams.length;
  game.selected = null;
  game.revealed = false;
  game.currentAwards = new Set();
  game.screen = "board";
  game.leaderMode = "view";
  render();
}

function resetGame() {
  game = createGameForQuiz(quiz);
  game.screen = "board";
  render();
}

function goHome() {
  game.screen = "home";
  render();
}

async function reloadQuiz() {
  try {
    quiz = await fetchQuiz();
    render();
  } catch (error) {
    app.innerHTML = `<div class="card center">
      <div style="font-size:54px">⚠️</div>
      <h2>Could not load the quiz</h2>
      <p>${esc(error.message)}</p>
      <p class="muted">Make sure quiz.json is in the same folder as the app.</p>
      <div class="actions"><button class="btn primary" data-action="reload-quiz">Try Again</button></div>
    </div>`;
  }
}

app.addEventListener("click", event => {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  switch (target.dataset.action) {
    case "open-setup": game.screen = "setup"; render(); break;
    case "reload-quiz": reloadQuiz(); break;
    case "add-team": addTeam(); break;
    case "remove-team": removeTeam(); break;
    case "start-game": startGame(); break;
    case "go-home": goHome(); break;
    case "choose-question": chooseQuestion(Number(target.dataset.question)); break;
    case "select-answer": selectAnswer(Number(target.dataset.answer)); break;
    case "reveal": reveal(); break;
    case "toggle-score": toggleScore(Number(target.dataset.team)); break;
    case "finish-question": finishQuestion(); break;
    case "next-round":
      game.screen = "leader";
      game.leaderMode = "roundEnd";
      render();
      break;
    case "advance-round": advanceRound(); break;
    case "show-final": game.leaderMode = "view"; render(); break;
    case "back-to-round": game.screen = "board"; render(); break;
    case "reset-game":
      if (confirm("Reset scores and start again?")) resetGame();
      break;
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

reloadQuiz();
