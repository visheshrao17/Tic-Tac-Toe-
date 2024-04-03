const gameBoard = document.querySelector(".game-board");
gameBoard.style.width = '100wh';
gameBoard.style.justifyContent = 'center';

const cells = document.querySelectorAll(".cell");
cells.forEach( cell =>{
    cell.style.border = '2px solid';
});

const restartButton = document.querySelector("#restartButton");
restartButton.style.padding = '5px';
restartButton.style.marginTop = '20px'
let moveHistory = [];
let count = 0;
document.addEventListener('click', function(event){
    if (event.target.classList.contains('cell') && event.target.textContent === '') {
        if (count % 2 == 0){
            count += 1;
            event.target.textContent = 'X';
        }
        else{
            count += 1;
            event.target.textContent = 'O';
        }
        moveHistory.push(event.target);

    }
     // draw condition call winnining function and them
    winner();
    if(count == 9){
        alert("It's a draw!");
    }
})

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];



function winner() {
    let lst1 = [];
    let lst2 = [];

    cells.forEach((cell, index) => {
        if (cell.innerHTML === 'X') {
            lst1.push(index);
        } else if (cell.innerHTML === 'O') {
            lst2.push(index);
        }
    });

    for (const combination of winningCombinations) {
        if (combination.every(index => lst1.includes(index))) {
            alert("X wins!");
            return;
        } else if (combination.every(index => lst2.includes(index))) {
            alert("O wins!");
            return;
        }
    }
}
//  restart Game
function restartGame(){
    cells.forEach(cell => {
        cell.innerHTML = '';
    });
   count = 0;

}
restartButton.addEventListener('click', restartGame);

const undoButton = document.createElement('button');
undoButton.id = 'undoButton';
undoButton.innerText = 'Undo';
undoButton.style.margin = "10px 5px";
undoButton.style.padding = "5px"
document.body.insertBefore(undoButton, restartButton);

function undo(){
    if (moveHistory.length > 0) {
        let lastMove = moveHistory.pop();
        lastMove.textContent = '';
        count -= 1;
    }

}

undoButton.addEventListener('click', undo);