document.addEventListener("DOMContentLoaded", () => {
    const gameArea = document.getElementById("gameArea");
    const player = document.getElementById("player");
    const bulletsContainer = document.getElementById("bullets");
    const targetsContainer = document.getElementById("targets");
  
    let playerPosition = 0;
    let bullets = [];
    let targets = [];
    let score = 0;
  
    function movePlayer(event) {
      if (event.key === "ArrowLeft" && playerPosition > 0) {
        playerPosition -= 10;
      } else if (event.key === "ArrowRight" && playerPosition < gameArea.offsetWidth - player.offsetWidth) {
        playerPosition += 10;
      }
      player.style.left = `${playerPosition}px`;
    }
  
    function shoot() {
      const bullet = document.createElement("div");
      bullet.className = "bullet";
      bullet.style.bottom = `${player.offsetHeight}px`;
      bullet.style.left = `${playerPosition + player.offsetWidth / 2}px`;
      bulletsContainer.appendChild(bullet);
      bullets.push(bullet);
    }
  
    function moveBullets() {
      bullets.forEach((bullet, index) => {
        const bulletBottom = parseInt(bullet.style.bottom);
        if (bulletBottom < gameArea.offsetHeight) {
          bullet.style.bottom = `${bulletBottom + 10}px`;
        } else {
          bulletsContainer.removeChild(bullet);
          bullets.splice(index, 1);
        }
      });
    }
  
    function createTarget() {
      const target = document.createElement("div");
      target.className = "target";
      target.style.left = `${Math.random() * (gameArea.offsetWidth - 20)}px`;
      targetsContainer.appendChild(target);
      targets.push(target);
    }
  
    function moveTargets() {
      targets.forEach((target, index) => {
        const targetTop = parseInt(target.style.top);
        if (targetTop < gameArea.offsetHeight) {
          target.style.top = `${targetTop + 3}px`;
        } else {
          targetsContainer.removeChild(target);
          targets.splice(index, 1);
        }
      });
    }
  
    function checkCollisions() {
      bullets.forEach((bullet, bulletIndex) => {
        const bulletRect = bullet.getBoundingClientRect();
        targets.forEach((target, targetIndex) => {
          const targetRect = target.getBoundingClientRect();
          if (bulletRect.bottom >= targetRect.top && bulletRect.top <= targetRect.bottom &&
              bulletRect.right >= targetRect.left && bulletRect.left <= targetRect.right) {
            score += 10;
            document.getElementById("score").textContent = `Score: ${score}`;
            bulletsContainer.removeChild(bullet);
            bullets.splice(bulletIndex, 1);
            targetsContainer.removeChild(target);
            targets.splice(targetIndex, 1);
          }
        });
      });
    }
  
    function gameLoop() {
      if (Math.random() < 0.02) {
        createTarget();
      }
      moveBullets();
      moveTargets();
      checkCollisions();
      requestAnimationFrame(gameLoop);
    }
  
    window.addEventListener("keydown", movePlayer);
    window.addEventListener("keydown", (event) => {
      if (event.key === " ") {
        shoot();
      }
    });
  
    gameLoop();
  });