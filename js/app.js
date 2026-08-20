
import { createGameForQuiz } from "./state/gameState.js";
import { loadQuiz } from "./data/quizLoader.js";
import { loadQuizCatalog } from "./data/quizCatalog.js";
import { esc } from "./utils/helpers.js";
import { renderLeaderboard } from "./components/Leaderboard.js";
import { renderScoringPanel } from "./components/ScoringPanel.js";
import { renderNumberBoard } from "./components/NumberBoard.js";
import { renderQuestionContent } from "./questions/questionTypes.js";
import { renderBrand } from "./components/Brand.js";
import { startFireworks, stopFireworks } from "./effects/fireworks.js";

const app = document.getElementById("app");
let quiz = null;
let quizCatalog = [];
let selectedQuizId = null;
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
  const cards = quizCatalog.map(item => `
    <button class="quiz-choice" data-action="select-quiz" data-quiz-id="${esc(item.id)}">
      <strong>${esc(item.name)}</strong>
      <span>${quiz && selectedQuizId === item.id ? "Loaded" : "Select quiz"}</span>
    </button>`).join("");

  app.innerHTML = `<div class="card center">
    ${renderBrand("hero")}
    ${quiz
      ? `<h2>${esc(quiz.name)}</h2>
         <p>${quiz.rounds.length} rounds · ${quiz.rounds.reduce((n,r) => n + r.questions.length, 0)} questions</p>
         <div class="actions">
           <button class="btn primary big" data-action="open-setup">▶ Start Quiz</button>
         </div>`
      : `<p class="muted">Choose a quiz to begin.</p>`}
    <div class="quiz-catalog">${cards || `<p class="muted">No quizzes are available.</p>`}</div>
    <p class="landscape-hint">For the best experience, use the iPad in landscape.</p>
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

  // The final round goes directly to the animated celebration.
  if (advancing && isFinal) {
    game.leaderMode = "finalSequence";
    return renderFinalSequence(sorted);
  }

  app.innerHTML = `<div class="card">
    <div class="center">
      <div style="font-size:58px">🏆</div>
      <h1>${advancing ? `Round ${game.round + 1} Complete` : "Leaderboard"}</h1>
      <p>${advancing ? "Here are the scores before the next round." : "Current standings"}</p>
    </div>
    ${sorted.map((item, position) => `
      <div class="leader">
        <div class="rank">${["🥇","🥈","🥉"][position] || position + 1}</div>
        <div class="name">${esc(quiz.teams[item.index])}</div>
        <div class="points">${item.score}</div>
      </div>`).join("")}
    <div class="actions">
      ${advancing
        ? `<button class="btn primary big" data-action="advance-round">Next Round →</button>`
        : `<button class="btn" data-action="back-to-round">← Back to Round</button>`}
      <button class="btn danger" data-action="reset-game">Reset Game</button>
      <button class="btn" data-action="go-home">Home</button>
    </div>
  </div>`;
}

function renderFinalSequence(sorted) {
  app.innerHTML = `<div class="final-screen">
    <div class="final-card">
      ${renderBrand("final")}
      <div class="final-trophy">🏆</div>
      <div class="final-kicker">QUIZ COMPLETE</div>
      <h1>Final Scores</h1>
      <div class="final-leaderboard">
        ${sorted.map((item, position) => `
          <div class="final-row final-row-${position + 1}">
            <div class="final-rank">${["🥇","🥈","🥉"][position] || position + 1}</div>
            <div class="final-name">${esc(quiz.teams[item.index])}</div>
            <div class="final-points"><span class="count-score" data-score="${item.score}">0</span></div>
          </div>`).join("")}
      </div>
    </div>
  </div>`;

  requestAnimationFrame(() => startFinalSequence(sorted));
}


function startFinalSequence(sorted) {
  // Start browser-generated fireworks/audio from the same user gesture chain.
  startFireworks(10000);
  startCelebrationSound();

  const rows = [...document.querySelectorAll(".final-row")];
  rows.forEach((row, index) => {
    row.style.animationDelay = `${index * 500}ms`;
  });

  document.querySelectorAll(".count-score").forEach((el, index) => {
    const target = Number(el.dataset.score) || 0;
    const delay = index * 500 + 400;
    setTimeout(() => animateScore(el, target, 1000), delay);
  });
}

function animateScore(el, target, duration) {
  const start = performance.now();
  function tick(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function startCelebrationSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const audio = new AudioContextClass();
    const now = audio.currentTime;

    const notes = [
      [523.25, 0.00, 0.16],
      [659.25, 0.14, 0.16],
      [783.99, 0.28, 0.20],
      [1046.50, 0.46, 0.35],
      [783.99, 0.82, 0.16],
      [1046.50, 0.96, 0.45]
    ];

    notes.forEach(([frequency, offset, length]) => {
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(frequency, now + offset);
      gain.gain.setValueAtTime(0.0001, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.10, now + offset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + length);
      osc.connect(gain).connect(audio.destination);
      osc.start(now + offset);
      osc.stop(now + offset + length + 0.03);
    });

    setTimeout(() => audio.close().catch(() => {}), 2200);
  } catch (_) {
    // Audio is optional; the visual celebration still runs.
  }
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
  game.currentAwards = new Map();
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

function setScore(teamIndex, multiplier) {
  const points = currentQuestion().points || 10;
  const previous = game.currentAwards.get(teamIndex) || 0;

  if (previous === multiplier) {
    game.currentAwards.delete(teamIndex);
    game.scores[teamIndex] -= points * previous;
  } else {
    game.currentAwards.set(teamIndex, multiplier);
    game.scores[teamIndex] += points * multiplier - points * previous;
  }
  render();
}

function finishQuestion() {
  game.q = null;
  game.selected = null;
  game.revealed = false;
  game.currentAwards = new Map();
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
  game.currentAwards = new Map();
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
    quizCatalog = await loadQuizCatalog();
    if (selectedQuizId) {
      const item = quizCatalog.find(q => q.id === selectedQuizId);
      if (item) quiz = await loadQuiz(new URL(item.path, new URL("./quizzes/index.json", window.location.href)).href);
    }
    render();
  } catch (error) {
    app.innerHTML = `<div class="card center">
      <div style="font-size:54px">⚠️</div>
      <h2>Could not load the quiz catalog</h2>
      <p>${esc(error.message)}</p>
      <p class="muted">Make sure quizzes/index.json and the quiz folders are present.</p>
      <div class="actions"><button class="btn primary" data-action="reload-quiz">Try Again</button></div>
    </div>`;
  }
}

async function selectQuiz(id) {
  const item = quizCatalog.find(q => q.id === id);
  if (!item) return;
  try {
    const quizUrl = new URL(item.path, new URL("./quizzes/index.json", window.location.href)).href;
    quiz = await loadQuiz(quizUrl);
    selectedQuizId = id;
    game = createGameForQuiz(quiz);
    render();
  } catch (error) {
    app.innerHTML = `<div class="card center">
      <div style="font-size:54px">⚠️</div>
      <h2>Could not load this quiz</h2>
      <p>${esc(error.message)}</p>
      <div class="actions"><button class="btn" data-action="go-home">Back</button></div>
    </div>`;
  }
}

app.addEventListener("click", event => {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  switch (target.dataset.action) {
    case "open-setup": game.screen = "setup"; render(); break;
    case "select-quiz": selectQuiz(target.dataset.quizId); break;
    case "reload-quiz": reloadQuiz(); break;
    case "add-team": addTeam(); break;
    case "remove-team": removeTeam(); break;
    case "start-game": startGame(); break;
    case "go-home": goHome(); break;
    case "choose-question": chooseQuestion(Number(target.dataset.question)); break;
    case "select-answer": selectAnswer(Number(target.dataset.answer)); break;
    case "reveal": reveal(); break;
    case "set-score":
      setScore(Number(target.dataset.team), Number(target.dataset.multiplier));
      break;
    case "finish-question": finishQuestion(); break;
    case "next-round":
      game.screen = "leader";
      game.leaderMode = "roundEnd";
      render();
      break;
    case "advance-round": advanceRound(); break;
    case "show-final": {
      const sorted = game.scores.map((score, index) => ({ score, index })).sort((a,b) => b.score - a.score);
      game.leaderMode = "finalSequence";
      renderFinalSequence(sorted);
      break;
    }
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
