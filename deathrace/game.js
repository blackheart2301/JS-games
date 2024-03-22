document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('gameArea');
    const playerCar = document.getElementById('playerCar');
    let gameWidth = gameArea.offsetWidth;
    const carSpeed = 5;
    let currentPosition = gameWidth / 2 - 25; // Initial position centered

    function moveCar(event) {
        if (event.key === "ArrowLeft") {
            currentPosition -= carSpeed;
            if (currentPosition < 0) {
                currentPosition = 0;
            }
        } else if (event.key === "ArrowRight") {
            currentPosition += carSpeed;
            if (currentPosition > gameWidth - 50) { // 50 is the car's width
                currentPosition = gameWidth - 50;
            }
        }
        playerCar.style.left = `${currentPosition}px`;
    }

    window.addEventListener('keydown', moveCar);
});