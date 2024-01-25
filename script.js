let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    msg.innerText = "";
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turnO) {
                box.innerText = "O";
                box.style.color = "red";
                box.style.textShadow = "rgba(255, 162, 0, 0.79) 0px 0px 20px";
                box.style.transform = "rotate(360deg)";
                box.style.transition = "transform 0.5s ease";
                turnO = false;
            } else {
                box.innerText = "X";
                box.style.color = "blue";
                box.style.textShadow = "rgba(0, 0, 150, 0.50) 0px 0px 20px";
                box.style.transform = "rotate(360deg)";
                box.style.transition = "transform 0.5s ease";
                turnO = true;
            }

            box.disabled = true;
            count++;

            let isWinner = checkWinner();

            if (count === 9 && !isWinner) {
                gameDraw();
            }
        }
    });
});

const gameDraw = () => {
    msg.innerText = "It's a Draw Game.";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style = "";
    }
};

const showWinner = (winner) => {
    const winningBoxes = getWinningBoxes();
    winningBoxes.forEach(box => box.classList.add('highlight'));


    setTimeout(() => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgContainer.classList.remove("hide");
        winningBoxes.forEach(box => box.classList.remove('highlight'));

        disableBoxes();
    }, 1000); 
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

const getWinningBoxes = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                return [boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]];
            }
        }
    }
    return [];
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);