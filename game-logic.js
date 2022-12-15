// occasionally referring to: https://www.codebrainer.com/blog/tic-tac-toe-javascript-game

const PLAYER_X = 'x';
let player_x_boxes = [];
const PLAYER_O = 'o';
let player_o_boxes = [];
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let player_turn = 'x';
let turnCount = 1;
const cellElements = document.querySelectorAll(".cell");
const BOARD_OBJ = document.querySelector("#board");
const resetBtn = document.querySelector("#restartButton");
const winningBox = document.querySelector("#winningMessage");
const winningMessage = document.querySelector("#winningMessageText");
console.log(cellElements);



init();

function init(){


    for(let i = 0; i < cellElements.length; i++){
        cellElements[i].addEventListener("click", function(event){
            // console.log(event.target.getAttribute("value"));
            checkGrid(event.target);
        })
    }

    resetBtn.addEventListener("click", function(event){
        restartGame();
    })
}

function addSymbol(boxPickedObject){
    console.log(turnCount + ":" + player_turn);
    switch (player_turn){
        case 'x':
            boxPickedObject.classList.add("mark-x");
            boxPickedObject.classList.add("disabled-box");
            boxPickedObject.setAttribute("disabled", "disabled");
            player_x_boxes.push(parseInt(boxPickedObject.getAttribute("value")));
            break;
        case 'o':
            boxPickedObject.classList.add("mark-o");
            boxPickedObject.classList.add("disabled-box");
            boxPickedObject.setAttribute("disabled", "disabled");
            player_o_boxes.push(parseInt(boxPickedObject.getAttribute("value")));
            break;
    }
}

function checkGrid(boxPickedObject){
    if(boxPickedObject.classList.contains(".disabled-box")){
        console.log("box already has symbol");
        return;
    } else {
        //checks for winning combos
        addSymbol(boxPickedObject);
        turnCount++;

        if(checkWinner() && turnCount >= 3){
            console.log(player_turn);
            winGame();
        } 
        switchTurns();
    }

    if(turnCount >= 9){
        isDraw();
        return;
    }
}

function switchTurns(){
    if(player_turn === 'x'){
        player_turn = 'o';
    } else{
        player_turn = 'x';
    }
}

function checkWinner(){
    /* 
    refer to for .some and .every method: https://bobbyhadz.com/blog/javascript-check-if-array-contains-all-elements-another-array

    note to future self: .some and .every is like easier FOR loops of arrays
        -some comparisons are true
        -every comparison has to be true

        winning_combinations: [a,b,c], [d,e,f]
        combination: [a,b,c],
        comboNumber: a
        array1.includes(a)
    */
    if(player_turn === 'x'){
        return WINNING_COMBINATIONS.some(combination => {
            // console.log(combination);
            return combination.every(comboNumber => {
                // console.log(comboNumber);
                return player_x_boxes.includes(comboNumber);
            })
        })
    }
    else if(player_turn === 'o'){
        return WINNING_COMBINATIONS.some(combination => {
            // console.log(combination);
            return combination.every(comboNumber => {
                // console.log(comboNumber);
                return player_o_boxes.includes(comboNumber);
            })
        })
    }

}



function endGame(){
    for(let i = 0; i < cellElements.length; i++){
        cellElements[i].classList.add("disabled-box");
    }
    return;
}

function winGame(){
    winningMessage.textContent = "The Winner is: " + player_turn;
    winningBox.classList.add("winner");
    endGame();
}

function isDraw(){
    // cellElements.every(cellElements.contains(".disabled-box"));
    console.log("Game is a draw");
    endGame();
    return;
}

function restartGame(){
    player_o_boxes = [];
    player_x_boxes = [];
    player_turn = 'x';
    turnCount = 0;

    winningMessage.textContent = "";
    winningBox.classList.remove("winner");

    for(let i = 0; i < cellElements.length; i++){
        cellElements[i].classList.remove("mark-x");
        cellElements[i].classList.remove("mark-o");
        cellElements[i].classList.remove("disabled-box");
    }
    return; 
}