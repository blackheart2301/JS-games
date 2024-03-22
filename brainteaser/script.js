document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("gridContainer");
    const restartButton = document.getElementById("restartButton");
  
    const symbols = ["😀", "😎", "🚀", "🍕", "🎉", "🌈", "🦄", "🍩"];
    let shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    let openedCards = [];
    let matchedCards = [];
  
    function createCard(symbol, index) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.index = index;
      card.textContent = symbol;
      card.addEventListener("click", () => {
        if (openedCards.length < 2 && !openedCards.includes(card) && !matchedCards.includes(card)) {
          card.classList.add("hidden");
          openedCards.push(card);
          if (openedCards.length === 2) {
            setTimeout(checkMatch, 1000);
          }
        }
      });
      return card;
    }
  
    function checkMatch() {
      const [card1, card2] = openedCards;
      if (card1.textContent === card2.textContent) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards.push(card1, card2);
        if (matchedCards.length === symbols.length * 2) {
          alert("Congratulations! You've won!");
        }
      } else {
        card1.classList.remove("hidden");
        card2.classList.remove("hidden");
      }
      openedCards = [];
    }
  
    function init() {
      gridContainer.innerHTML = "";
      shuffledSymbols = shuffledSymbols.sort(() => Math.random() - 0.5);
      matchedCards = [];
      openedCards = [];
      for (let i = 0; i < shuffledSymbols.length; i++) {
        const symbol = shuffledSymbols[i];
        const card = createCard(symbol, i);
        gridContainer.appendChild(card);
      }
    }
  
    restartButton.addEventListener("click", init);
  
    init();
  });