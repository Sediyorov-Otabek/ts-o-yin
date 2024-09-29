"use strict";
// Player infos
let firstPlayer = document.querySelector("#player-1");
let firstPlayerScore = document.querySelector("#first-player-score");
let firstPlayerRandomNum = document.querySelector("#first-player-randomN");
let secondPlayer = document.querySelector("#player-2");
let secondPlayerScore = document.querySelector("#second-player-score");
let secondPlayerRandomNum = document.querySelector("#second-player-randomN");
// Players score
let playersScore = {
    first: 0,
    second: 0,
};
let endOfGame = 100;
// Current player
let currentPlayer = "first";
// Welcome modal
let greeting = document.querySelector(".greeting");
let greetingForm = document.querySelector(".greeting__form");
// Game info
let gameInfo = {};
// Welcome model functioning
greetingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = formData.entries();
    for (let [key, value] of data) {
        gameInfo[key] = value.toString();
    }
    greeting === null || greeting === void 0 ? void 0 : greeting.classList.add("fade-out");
    setTimeout(() => {
        greeting.style.display = "none";
        firstPlayer.textContent = gameInfo["p1"];
        secondPlayer.textContent = gameInfo["p2"];
        endOfGame = Number(gameInfo["limit"]);
    }, 1000);
});
// Player turn txt and btns
let firstPlayerTurn = document.querySelector("#player-1-turn");
let firstPlayerBtn = document.querySelector("#first-player-btn");
let secondPlayerTurn = document.querySelector("#player-2-turn");
let secondPlayerBtn = document.querySelector("#second-player-btn");
// Change player
function changePlayer(n) {
    if (n == 0) {
        currentPlayer = "first";
        firstPlayerTurn === null || firstPlayerTurn === void 0 ? void 0 : firstPlayerTurn.classList.remove("hidden");
        firstPlayerBtn.disabled = false;
        firstPlayerBtn.classList.remove("cursor-not-allowed");
        secondPlayerTurn === null || secondPlayerTurn === void 0 ? void 0 : secondPlayerTurn.classList.add("hidden");
        secondPlayerBtn.disabled = true;
        secondPlayerBtn === null || secondPlayerBtn === void 0 ? void 0 : secondPlayerBtn.classList.add("cursor-not-allowed");
    }
    else if (n == 1) {
        currentPlayer = "second";
        firstPlayerTurn === null || firstPlayerTurn === void 0 ? void 0 : firstPlayerTurn.classList.add("hidden");
        firstPlayerBtn.disabled = true;
        firstPlayerBtn.classList.add("cursor-not-allowed");
        secondPlayerTurn === null || secondPlayerTurn === void 0 ? void 0 : secondPlayerTurn.classList.remove("hidden");
        secondPlayerBtn.disabled = false;
        secondPlayerBtn === null || secondPlayerBtn === void 0 ? void 0 : secondPlayerBtn.classList.remove("cursor-not-allowed");
        secondPlayerScore.textContent = String(playersScore["second"]);
    }
}
// declare whose turn
(function () {
    changePlayer(0);
})();
// let result
let result = document.querySelector(".result");
let winner = document.querySelector(".winner");
let winnerSound = document.querySelector(".music");
let playAgainBtn = document.querySelector(".playAgain");
// Generate random runmber
function generateRnum(e) {
    let randomN;
    let span = e.target;
    span.disabled = true;
    let button = span.parentElement;
    button.disabled = true;
    let randomNumberGenerator = setInterval(() => {
        if (currentPlayer == "first") {
            randomN = Math.round(Math.random() * 9);
            firstPlayerRandomNum.textContent = String(randomN);
        }
        else {
            randomN = Math.round(Math.random() * 9);
            secondPlayerRandomNum.textContent = String(randomN);
        }
    }, 90);
    setTimeout(() => {
        clearInterval(randomNumberGenerator);
        if (currentPlayer == "first") {
            playersScore["first"] += randomN;
            if (playersScore["first"] >= endOfGame) {
                result === null || result === void 0 ? void 0 : result.classList.remove("hidden");
                result === null || result === void 0 ? void 0 : result.classList.add("fade-in");
                result.style.display = "flex";
                winner.textContent = gameInfo["p1"];
                winnerSound === null || winnerSound === void 0 ? void 0 : winnerSound.play();
            }
            firstPlayerScore.textContent = String(playersScore["first"]);
            changePlayer(1);
            currentPlayer = "second";
        }
        else {
            playersScore["second"] += randomN;
            if (playersScore["second"] >= endOfGame) {
                result === null || result === void 0 ? void 0 : result.classList.remove("hidden");
                result === null || result === void 0 ? void 0 : result.classList.add("fade-in");
                result.style.display = "flex";
                winner.textContent = gameInfo["p2"];
                winnerSound === null || winnerSound === void 0 ? void 0 : winnerSound.play();
            }
            secondPlayerScore.textContent = String(playersScore["second"]);
            changePlayer(0);
            currentPlayer == "first";
        }
    }, 700);
}
secondPlayerBtn.addEventListener("click", (e) => generateRnum(e));
firstPlayerBtn.addEventListener("click", (e) => generateRnum(e));
// Play again
playAgainBtn === null || playAgainBtn === void 0 ? void 0 : playAgainBtn.addEventListener("click", () => {
    firstPlayerRandomNum.textContent = "0";
    secondPlayerRandomNum.textContent = "0";
    firstPlayerScore.textContent = "0";
    secondPlayerScore.textContent = "0";
    greeting === null || greeting === void 0 ? void 0 : greeting.classList.remove("fade-out");
    greeting.style.display = "flex";
    changePlayer(0);
    result === null || result === void 0 ? void 0 : result.classList.remove("fade-in");
    result === null || result === void 0 ? void 0 : result.classList.add("fade-out");
    setTimeout(() => {
        result.style.display = "none";
    }, 1000);
    playersScore = {
        first: 0,
        second: 0,
    };
    greetingForm.reset();
});
