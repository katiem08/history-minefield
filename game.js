const figures = [
  { name: "Marco Polo", birthYear: 1254 },
  { name: "Julius Caesar", birthYear: -100 },
  { name: "Ludwig van Beethoven", birthYear: 1770 },
  { name: "Albert Einstein", birthYear: 1879 },
  { name: "Moses", birthYear: -1391 },
  { name: "Michelangelo", birthYear: 1475 },
  { name: "Aristotle", birthYear: -384 },
  { name: "Buddha", birthYear: -563 },
  { name: "Anne Frank", birthYear: 1929 },
  { name: "Nelson Mandela", birthYear: 1918 },
  { name: "Genghis Khan", birthYear: 1162 },
  { name: "George Washington", birthYear: 1732 },
  { name: "Galileo Galilei", birthYear: 1564 },
  { name: "Henry VIII", birthYear: 1491 },
  { name: "Queen Victoria", birthYear: 1819 },
  { name: "Augustus", birthYear: -63 },
  { name: "Charles Darwin", birthYear: 1809 },
  { name: "Leonardo da Vinci", birthYear: 1452 },
  { name: "Isaac Newton", birthYear: 1643 },
  { name: "William the Conqueror", birthYear: 1028 },
];

const orderedFigures = [...figures].sort((a, b) => b.birthYear - a.birthYear);
const grid = document.querySelector("#figure-grid");
const message = document.querySelector("#message");
const correctCount = document.querySelector("#correct-count");
const nextTarget = document.querySelector("#next-target");
const restartButton = document.querySelector("#restart-button");

let currentIndex = 0;
let gameOver = false;

function formatBirthYear(year) {
  return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
}

function shuffle(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function updateScore() {
  correctCount.textContent = currentIndex.toString();
  nextTarget.textContent = gameOver
    ? "Game over"
    : orderedFigures[currentIndex]?.name ?? "All figures cleared";
}

function revealBirthYears() {
  document.querySelectorAll(".figure-card").forEach((card) => {
    const figure = figures.find((item) => item.name === card.dataset.name);
    const year = document.createElement("span");
    year.className = "birth-year";
    year.textContent = formatBirthYear(figure.birthYear);
    card.append(year);
    card.classList.add("revealed");
    card.disabled = true;
  });
}

function endGame(card) {
  const percentage = Math.round((currentIndex / figures.length) * 100);
  const expected = orderedFigures[currentIndex];
  gameOver = true;
  card.classList.add("wrong");
  message.textContent = `Mine hit! You scored ${percentage}% (${currentIndex}/${figures.length}). Next correct answer was ${expected.name}, born ${formatBirthYear(expected.birthYear)}.`;
  revealBirthYears();
  updateScore();
}

function handlePick(event) {
  if (gameOver) {
    return;
  }

  const card = event.currentTarget;
  const pickedName = card.dataset.name;
  const expected = orderedFigures[currentIndex];

  if (pickedName !== expected.name) {
    endGame(card);
    return;
  }

  card.classList.add("correct");
  card.disabled = true;
  currentIndex += 1;

  if (currentIndex === figures.length) {
    gameOver = true;
    message.textContent = "Perfect! You cleared the whole history minefield for 100%.";
  } else {
    const next = orderedFigures[currentIndex];
    message.textContent = `Correct! Next, choose the figure born before ${expected.name}.`;
    nextTarget.textContent = next.name;
  }

  updateScore();
}

function renderGame() {
  currentIndex = 0;
  gameOver = false;
  grid.innerHTML = "";
  message.textContent = "Start with the person born most recently.";

  shuffle(figures).forEach((figure) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "figure-card";
    card.dataset.name = figure.name;
    card.textContent = figure.name;
    card.addEventListener("click", handlePick);
    grid.append(card);
  });

  updateScore();
}

restartButton.addEventListener("click", renderGame);
renderGame();
