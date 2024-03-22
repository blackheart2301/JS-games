document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("gridContainer");
    const newGameButton = document.getElementById("newGameButton");
  
    let grid = [];
    let score = 0;
  
    function init() {
      grid = Array.from({ length: 4 }, () => Array(4).fill(0));
      score = 0;
      addNewTile();
      addNewTile();
      updateGrid();
    }
  
    function updateGrid() {
      gridContainer.innerHTML = "";
      grid.forEach(row => {
        row.forEach(cellValue => {
          const cell = document.createElement("div");
          cell.className = "cell";
          cell.textContent = cellValue ? cellValue : "";
          cell.style.backgroundColor = getTileColor(cellValue);
          gridContainer.appendChild(cell);
        });
      });
    }
  
    function addNewTile() {
      const availableCells = [];
      grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell === 0) {
            availableCells.push({ row: rowIndex, col: colIndex });
          }
        });
      });
      if (availableCells.length > 0) {
        const { row, col } = availableCells[Math.floor(Math.random() * availableCells.length)];
        grid[row][col] = Math.random() < 0.9 ? 2 : 4;
      }
    }
  
    function getTileColor(value) {
      const colors = {
        0: "#cdc1b4",
        2: "#eee4da",
        4: "#ede0c8",
        8: "#f2b179",
        16: "#f59563",
        32: "#f67c5f",
        64: "#f65e3b",
        128: "#edcf72",
        256: "#edcc61",
        512: "#edc850",
        1024: "#edc53f",
        2048: "#edc22e"
      };
      return colors[value] || "#ff0000";
    }
  
    function move(direction) {
      const rotatedGrid = rotateGrid(direction);
      let moved = false;
  
      rotatedGrid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          let i = colIndex;
          while (i > 0 && row[i - 1] === 0) {
            row[i - 1] = row[i];
            row[i] = 0;
            moved = true;
            i--;
          }
          if (i > 0 && row[i - 1] === row[i]) {
            row[i - 1] *= 2;
            score += row[i - 1];
            row[i] = 0;
            moved = true;
          }
        });
      });
  
      if (moved) {
        rotateGrid(direction, rotatedGrid);
        addNewTile();
        updateGrid();
      }
    }
  
    function rotateGrid(direction, inputGrid = grid) {
      const rotatedGrid = [];
      if (direction === "right" || direction === "left") {
        inputGrid.forEach((row, rowIndex) => {
          rotatedGrid.push([]);
          row.forEach((cell, colIndex) => {
            rotatedGrid[rowIndex][colIndex] = direction === "right" ? inputGrid[rowIndex][3 - colIndex] : inputGrid[rowIndex][colIndex];
          });
        });
      } else if (direction === "up" || direction === "down") {
        for (let col = 0; col < 4; col++) {
          rotatedGrid.push([]);
          for (let row = 0; row < 4; row++) {
            rotatedGrid[col][row] = direction === "down" ? inputGrid[3 - row][col] : inputGrid[row][3 - col];
          }
        }
      }
      return rotatedGrid;
    }
  
    function checkGameOver() {
      const moves = ["up", "down", "left", "right"];
      for (let i = 0; i < moves.length; i++) {
        const movedGrid = rotateGrid(moves[i]);
        for (let row = 0; row < 4; row++) {
          for (let col = 0; col < 4; col++) {
            if (row < 3 && movedGrid[row][col] === movedGrid[row + 1][col]) {
              return false;
            }
            if (col < 3 && movedGrid[row][col] === movedGrid[row][col + 1]) {
              return false;
            }
            if (movedGrid[row][col] === 0) {
              return false;
            }
          }
        }
      }
      return true;
    }
  
    function checkGameWin() {
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          if (grid[row][col] === 2048) {
            return true;
          }
        }
      }
      return false;
    }
  
    newGameButton.addEventListener("click", init);
  
    document.addEventListener("keydown", (event) => {
      if (!checkGameOver()) {
        switch (event.key) {
          case "ArrowUp":
            move("up");
            break;
          case "ArrowDown":
            move("down");
            break;
          case "ArrowLeft":
            move("left");
            break;
          case "ArrowRight":
            move("right");
            break;
        }
      }
      if (checkGameWin()) {
        alert("Congratulations! You reached 2048!");
      }
      if (checkGameOver()) {
        alert("Game Over! Your final score: " + score);
      }
    });
  
    init();
  });