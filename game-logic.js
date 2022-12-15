console.log("first commit");

const PLAYER_X = 'x';
let player_x_boxes = [12,3,3];
const PLAYER_O = 'o';
let player_o_boxes = [2,3,5];
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

const cellElements = document.querySelectorAll(".cell");
const resetBtn = document.querySelector("#restartButton");

console.log(cellElements);





function init(){


    for(let i = 0; i < cellElements.length; i++){
        cellElements[i].addEventListener("click", function(event){
            // console.log(event.target.getAttribute("value"));
            checkGrid(event.target);
        })
    }


}

function addSymbol(boxPickedObject){
    switch (player_turn){
        case 'x':
            console.log('player x turn');
            boxPickedObject.classList.add("mark-x");
            boxPickedObject.setAttribute("disabled", "disabled");
            player_turn = 'o';
            break;
        case 'o':
            console.log('player o turn');
            boxPickedObject.classList.add("mark-o");
            boxPickedObject.setAttribute("disabled", "disabled");
            player_turn = 'x';
            break;
    }
}

function checkGrid(boxPickedObject){
    if(player_x_boxes.length <= 2 || player_o_boxes.length <= 2){
        console.log("not enough boxes to check");
    }
    else{
        addSymbol(boxPickedObject);
        console.log("enough marked");
    }
}

function restartGame(){

}



init();