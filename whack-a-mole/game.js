document.addEventListener("DOMContentLoaded", () => {
  const holesContainer = document.getElementById("holes");
  const scoreDisplay = document.getElementById("score");
  const timeDisplay = document.getElementById("time");
  const startButton = document.getElementById("startButton");

  let score = 0;
  let time = 30;
  let gameStarted = false;

  function startGame() {
    if (!gameStarted) {
      gameStarted = true;
      score = 0;
      time = 30;
      updateScore();
      updateTime();
      startButton.disabled = true;
      playRound();
      const countdownInterval = setInterval(() => {
        time--;
        updateTime();
        if (time <= 0) {
          clearInterval(countdownInterval);
          endGame();
        }
      }, 1000);
    }
  }

  function playRound() {
    const moleIndex = Math.floor(Math.random() * 6);
    const moleHole = holesContainer.children[moleIndex];
    const mole = moleHole.querySelector(".mole");
    mole.style.display = "block";
    mole.addEventListener("click", whackMole);
    setTimeout(() => {
      mole.style.display = "none";
      mole.removeEventListener("click", whackMole);
      if (gameStarted) {
        playRound();
      }
    }, Math.random() * 2000 + 1000);
  }

  function whackMole() {
    score += 10;
    updateScore();
    this.style.display = "none";
    this.removeEventListener("click", whackMole);
  }

  function endGame() {
    gameStarted = false;
    startButton.disabled = false;
    alert("Game Over! Your score: " + score);
  }

  function updateScore() {
    scoreDisplay.textContent = "Score: " + score;
  }

  function updateTime() {
    timeDisplay.textContent = "Time: " + time;
  }

  // Create holes and moles
  for (let i = 0; i < 6; i++) {
    const hole = document.createElement("div");
    hole.className = "hole";
    const mole = document.createElement("div");
    mole.className = "mole";
    hole.appendChild(mole);
    holesContainer.appendChild(hole);
  }

  startButton.addEventListener("click", startGame);
});