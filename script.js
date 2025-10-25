const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const gameBoard = document.getElementById("gameBoard");
const movesEl = document.getElementById("moves");

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;

const icons = ["🍎","🍌","🍇","🍒","🍑","🍉","🍓","🍍"]; // 8種類のアイコン

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  gameBoard.innerHTML = "";
  const doubleIcons = shuffle([...icons, ...icons]);
  doubleIcons.forEach(icon => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.icon = icon;
    card.textContent = "";
    gameBoard.appendChild(card);
  });
  cards = document.querySelectorAll(".card");
}

function flipCard(card) {
  if (lockBoard || card === firstCard || card.classList.contains("flipped")) return;
  card.classList.add("flipped");
  card.textContent = card.dataset.icon;

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  moves++;
  movesEl.textContent = `手数: ${moves}`;
  checkMatch();
}

function checkMatch() {
  if (firstCard.dataset.icon === secondCard.dataset.icon) {
    firstCard = null;
    secondCard = null;
    checkWin();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      firstCard.textContent = "";
      secondCard.classList.remove("flipped");
      secondCard.textContent = "";
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }, 1000);
  }
}

function checkWin() {
  if ([...cards].every(card => card.classList.contains("flipped"))) {
    setTimeout(() => {
      alert(`クリア！手数: ${moves}`);
      startScreen.style.display = "flex";
    }, 300);
  }
}

// スタート
startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  moves = 0;
  movesEl.textContent = `手数: ${moves}`;
  createBoard();
});

// タッチ / クリック対応
gameBoard.addEventListener("click", e => {
  if (e.target.classList.contains("card")) flipCard(e.target);
});
gameBoard.addEventListener("touchstart", e => {
  if (e.target.classList.contains("card")) flipCard(e.target);
});
