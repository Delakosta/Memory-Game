import generate from "./cards.js";

const resultsBtns = document.getElementById('buttons');
const btnStart = document.getElementById('start');
const gameBoard = document.getElementById("gameBoard");
const timerBlock = document.getElementById('timer');
let user = document.getElementById('user');
let resultBoard = document.getElementById('resultBoard');

let deck = [];
let timer = null;
let difficulty = undefined;

btnStart.addEventListener("click", () => {
    difficulty = document.querySelector('input[name="diff"]:checked').value;
    deck = generate(difficulty);
    if (user.value.trim() != "") {
        gameBoard.style.display = "block";
        btnStart.style.display = "none";
        display();
        play();
        results(difficulty);
        timerBlock.style.display = "block";
        timer = setInterval(() => {
            timerBlock.textContent++;
        }, 1000);
    }
    else {
        alert("Enter username to start the game!");
    }
});

resultsBtns.addEventListener('click', (e) => {
    if (e.target.id === "btnEasy") {
        results("easy");
    }
    else if (e.target.id === "btnNormal") {
        results("normal");
    }
    else if (e.target.id === "btnHard") {
        results("hard");
    }
    else {
        results("expert");
    }
});

const display = () => {
    deck.forEach((card, index) => {
        let cardHolder = document.createElement("div");
        cardHolder.classList.add("holder", `ind${index}`);

        let cardFront = document.createElement("img");
        cardFront.src = card.cardFace;
        cardFront.classList.add("front");

        let cardBack = document.createElement("img");
        cardBack.src = card.cardBack;
        cardBack.classList.add("back");

        cardHolder.append(cardFront, cardBack);
        gameBoard.appendChild(cardHolder);
    });
};

const play = () => {
    let revealedCards = [];
    let matchedPairs = 0;
    let isFlipping = false;

    gameBoard.addEventListener("click", (e) => {
        // Check if the clicked element is a card and if flipping is currently in progress
        if (!e.target.classList.contains("back") || isFlipping) {
            return;
        }

        let clickedCard = e.target.parentElement;
        let clickedCardIndex = clickedCard.classList[1];

        // Check if the revealed cards array is not full and the clicked card is not already revealed
        if (
            revealedCards.length < 2 &&
            !revealedCards.includes(clickedCardIndex)
        ) {
            // Reveal the clicked card and add its index to the revealed cards array
            clickedCard.classList.add("revealed");
            revealedCards.push(clickedCardIndex);

            // Check if two cards are revealed
            if (revealedCards.length === 2) {
                isFlipping = true;

                // Extract numeric indices from the revealed cards array
                const [firstCardIndex, secondCardIndex] = revealedCards.map(indexString => parseInt(indexString.slice(3), 10));

                // Get references to the first and second cards
                const firstCard = document.querySelector(`.ind${firstCardIndex}`);
                const secondCard = document.querySelector(`.ind${secondCardIndex}`);

                // Check if the two revealed cards match
                if (
                    deck[firstCardIndex].cardFace === deck[secondCardIndex].cardFace
                ) {
                    // Update matched pairs count and check for a win
                    matchedPairs++;
                    if (matchedPairs === deck.length / 2) {
                        setTimeout(() => {
                            let previousResults = JSON.parse(localStorage.getItem(`mg${difficulty}`));
                            let result = {
                                name: user.value,
                                time: Number(timerBlock.textContent)
                            }
                            if (previousResults === null) {
                                localStorage.setItem(`mg${difficulty}`, JSON.stringify([result]));
                            }
                            else {
                                previousResults.push(result);
                                localStorage.setItem(`mg${difficulty}`, JSON.stringify(previousResults));
                            }
                            clearInterval(timer);
                            if (confirm("Congratulations! You won! Whould you like to start a new game?")) {
                                window.location.reload(); // Ovo treba bolje da uradim
                              }
                        }, 1000);

                    }
                } else {
                    // Flip the cards back after a delay if they don't match
                    setTimeout(() => {
                        firstCard.classList.remove("revealed");
                        secondCard.classList.remove("revealed");
                    }, 1000); // Adjust the duration as needed
                }

                // Reset the revealed cards array and flipping flag after processing the pair
                revealedCards = [];
                setTimeout(() => {
                    isFlipping = false;
                }, 1000);
            }
        }
    });
};


const results = diff => {
    let rawResults = JSON.parse(localStorage.getItem(`mg${diff}`));
    if (rawResults === null) {
        resultBoard.innerHTML = "<p>No results!</p>";
        return;
    }
    let sortedResults = rawResults.sort((a, b) => a.time - b.time);

    // Da se ne bi dodavali rezultati
    resultBoard.innerHTML = "";

    for (let i = 0; i < Math.min(sortedResults.length, 5); i++) {
        let tableRow = document.createElement('tr');
        let tableRowData1 = document.createElement('td');
        tableRowData1.textContent = i + 1;
        let tableRowData2 = document.createElement('td');
        tableRowData2.textContent = sortedResults[i].name;
        let tableRowData3 = document.createElement('td');
        tableRowData3.textContent = sortedResults[i].time;
        resultBoard.appendChild(tableRow);
        tableRow.append(tableRowData1, tableRowData2, tableRowData3);
    }
}