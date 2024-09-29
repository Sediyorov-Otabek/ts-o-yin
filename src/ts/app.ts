// Player infos
let firstPlayer: HTMLHeadingElement | null =
  document.querySelector("#player-1");
let firstPlayerScore: HTMLSpanElement | null = document.querySelector(
  "#first-player-score"
);
let firstPlayerRandomNum: HTMLSpanElement | null = document.querySelector(
  "#first-player-randomN"
);
let secondPlayer: HTMLHeadingElement | null =
  document.querySelector("#player-2");
let secondPlayerScore: HTMLHeadingElement | null = document.querySelector(
  "#second-player-score"
);
let secondPlayerRandomNum: HTMLSpanElement | null = document.querySelector(
  "#second-player-randomN"
);

let playersScore = {
  first: 0,
  second: 0,
};
let endOfGame = 100;

let currentPlayer: string = "first";

let greeting: HTMLDivElement | null = document.querySelector(
  ".greeting"
) as HTMLDivElement;
let greetingForm: HTMLFormElement | null = document.querySelector(
  ".greeting__form"
) as HTMLFormElement;

interface FormValues {
  [key: string]: string;
}

let gameInfo: FormValues = {};

greetingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData(e.target as HTMLFormElement);
  let data = formData.entries();
  for (let [key, value] of data) {
    gameInfo[key] = value.toString();
  }

  greeting?.classList.add("fade-out");
  setTimeout(() => {
    greeting!.style.display = "none";

    firstPlayer!.textContent = gameInfo["p1"];
    secondPlayer!.textContent = gameInfo["p2"];

    endOfGame = Number(gameInfo["limit"]);
  }, 1000);
});

let firstPlayerTurn: HTMLHeadingElement | null = document.querySelector(
  "#player-1-turn"
) as HTMLHeadingElement;
let firstPlayerBtn: HTMLButtonElement | null = document.querySelector(
  "#first-player-btn"
) as HTMLButtonElement;
let secondPlayerTurn: HTMLHeadingElement | null = document.querySelector(
  "#player-2-turn"
) as HTMLHeadingElement;
let secondPlayerBtn: HTMLButtonElement | null = document.querySelector(
  "#second-player-btn"
) as HTMLButtonElement;

function changePlayer(n: number): void {
  if (n == 0) {
    currentPlayer = "first";
    firstPlayerTurn?.classList.remove("hidden");
    firstPlayerBtn!.disabled = false;
    firstPlayerBtn!.classList.remove("cursor-not-allowed");
    secondPlayerTurn?.classList.add("hidden");
    secondPlayerBtn!.disabled = true;
    secondPlayerBtn?.classList.add("cursor-not-allowed");
  } else if (n == 1) {
    currentPlayer = "second";
    firstPlayerTurn?.classList.add("hidden");
    firstPlayerBtn!.disabled = true;
    firstPlayerBtn!.classList.add("cursor-not-allowed");
    secondPlayerTurn?.classList.remove("hidden");
    secondPlayerBtn!.disabled = false;
    secondPlayerBtn?.classList.remove("cursor-not-allowed");
    secondPlayerScore!.textContent = String(playersScore["second"]);
  }
}

(function () {
  changePlayer(0);
})();

let result: HTMLDivElement | null = document.querySelector(
  ".result"
) as HTMLDivElement;
let winner: HTMLSpanElement | null = document.querySelector(
  ".winner"
) as HTMLSpanElement;
let winnerSound: HTMLAudioElement | null = document.querySelector(
  ".music"
) as HTMLAudioElement;
let playAgainBtn: HTMLButtonElement | null =
  document.querySelector(".playAgain");

function generateRnum(e: Event) {
  let randomN: number;

  let span = e.target as HTMLButtonElement;
  span.disabled = true;
  let button = span.parentElement as HTMLButtonElement;
  button.disabled = true;

  let randomNumberGenerator = setInterval(() => {
    if (currentPlayer == "first") {
      randomN = Math.round(Math.random() * 9);
      firstPlayerRandomNum!.textContent = String(randomN);
    } else {
      randomN = Math.round(Math.random() * 9);
      secondPlayerRandomNum!.textContent = String(randomN);
    }
  }, 90);

  setTimeout(() => {
    clearInterval(randomNumberGenerator);
    if (currentPlayer == "first") {
      playersScore["first"] += randomN;
      if (playersScore["first"] >= endOfGame) {
        result?.classList.remove("hidden");
        result?.classList.add("fade-in");
        result!.style.display = "flex";
        winner!.textContent = gameInfo["p1"];
        winnerSound?.play();
      }
      firstPlayerScore!.textContent = String(playersScore["first"]);
      changePlayer(1);
      currentPlayer = "second";
    } else {
      playersScore["second"] += randomN;
      if (playersScore["second"] >= endOfGame) {
        result?.classList.remove("hidden");
        result?.classList.add("fade-in");
        result!.style.display = "flex";

        winner!.textContent = gameInfo["p2"];
        winnerSound?.play();
      }
      secondPlayerScore!.textContent = String(playersScore["second"]);
      changePlayer(0);
      currentPlayer == "first";
    }
  }, 700);
}

secondPlayerBtn.addEventListener("click", (e) => generateRnum(e));
firstPlayerBtn.addEventListener("click", (e) => generateRnum(e));

// Play again
playAgainBtn?.addEventListener("click", () => {
  firstPlayerRandomNum!.textContent = "0";
  secondPlayerRandomNum!.textContent = "0";
  firstPlayerScore!.textContent = "0";
  secondPlayerScore!.textContent = "0";
  greeting?.classList.remove("fade-out");
  greeting!.style.display = "flex";

  changePlayer(0);
  result?.classList.remove("fade-in");
  result?.classList.add("fade-out");
  setTimeout(() => {
    result!.style.display = "none";
  }, 1000);
  playersScore = {
    first: 0,
    second: 0,
  };
  greetingForm!.reset();
});
