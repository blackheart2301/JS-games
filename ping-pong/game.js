const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10;
const paddleHeight = 70;
const paddleSpeed = 5;
let paddle1Y = canvas.height / 2 - paddleHeight / 2;
let paddle2Y = canvas.height / 2 - paddleHeight / 2;
const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
let player1Score = 0;
let player2Score = 0;

function draw() {
  // Clear canvas
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw paddles
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

  // Draw ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();

  // Draw scores
  ctx.font = "30px Arial";
  ctx.fillText(player1Score, 100, 50);
  ctx.fillText(player2Score, canvas.width - 100, 50);
}

function movePaddles() {
  // Move player 1 paddle
  if (keys["ArrowUp"] && paddle1Y > 0) {
    paddle1Y -= paddleSpeed;
  } else if (keys["ArrowDown"] && paddle1Y < canvas.height - paddleHeight) {
    paddle1Y += paddleSpeed;
  }

  // Simple AI for player 2 paddle
  const paddle2Center = paddle2Y + paddleHeight / 2;
  if (paddle2Center < ballY - paddleHeight / 3 && paddle2Y < canvas.height - paddleHeight) {
    paddle2Y += paddleSpeed;
  } else if (paddle2Center > ballY + paddleHeight / 3 && paddle2Y > 0) {
    paddle2Y -= paddleSpeed;
  }
}

function moveBall() {
  // Move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with top and bottom walls
  if (ballY - ballSize <= 0 || ballY + ballSize >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Ball collision with paddles
  if ((ballX - ballSize <= paddleWidth && ballY >= paddle1Y && ballY <= paddle1Y + paddleHeight) ||
      (ballX + ballSize >= canvas.width - paddleWidth && ballY >= paddle2Y && ballY <= paddle2Y + paddleHeight)) {
    ballSpeedX = -ballSpeedX;
  }

  // Ball out of bounds
  if (ballX - ballSize <= 0) {
    player2Score++;
    resetBall();
  } else if (ballX + ballSize >= canvas.width) {
    player1Score++;
    resetBall();
  }
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = Math.random() * 6 - 3; // Randomize vertical direction
}

// Keyboard controls
const keys = {};
document.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});
document.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

// Game loop
function gameLoop() {
  draw();
  movePaddles();
  moveBall();
  requestAnimationFrame(gameLoop);
}

gameLoop();