let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGame = document.querySelector("#new-Game");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");

let turnO = true;
let count = 0;

let winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

let resettBtn = () => {
  turnO = true;
  enabledBoxes();
  msgContainer.classList.add("hide");
};

let disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

let enabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

let showWinner = (winner) => {
  msg.innerHTML = `Congartulation, winner is <span style= "color: black;">${winner}</span>`;
  msgContainer.classList.remove("hide");
  disabledBoxes();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "gray";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "black";
      turnO = true;
    }
    box.disabled = true;
    count++;
    // checkWineer();

    let isWinner = checkWineer();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disabledBoxes();
};

let checkWineer = () => {
  for (let pattern of winPatterns) {
    let val1 = boxes[pattern[0]].innerText;
    let val2 = boxes[pattern[1]].innerText;
    let val3 = boxes[pattern[2]].innerText;

    if (val1 != "" && val2 != "" && val3 != "") {
      if (val1 === val2 && val2 === val3) {
        console.log("winner", val1);
        showWinner(val1);
        return true;
      }
    }
  }
};

resetBtn.addEventListener("click", resettBtn);
newGame.addEventListener("click", resettBtn);
