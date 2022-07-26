const cellElements = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const winningText = document.querySelector(".winning-text");
const winning = document.querySelector(".winning");
const restartButton = document.querySelector(".winning-button");

let isCircleTurn;

const winningCombinatios = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const startGame = () => {
    isCircleTurn = false;

    for(const cell of cellElements){
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.removeEventListener("click",handleclick)
        cell.addEventListener('click', handleclick,{once:true});
    }

    setBoardHoverClass();
    winning.classList.remove('show-winning');
};

const endGame = (isDraw) => {
    if(isDraw){
        winningText.innerText = 'Empate !';
    } else {
        winningText.innerText = isCircleTurn ? 'O Venceu !' : 'X Venceu !'
    }

    winning.classList.add("show-winning");
}


const checkForWin = (currentPlayer) => {
    return winningCombinatios.some(combination => {
        return combination.every((index)=>{
            return cellElements[index].classList.contains(currentPlayer);
        })
    })
}

const checkForDraw = () => {
    return [...cellElements].every((cell )=> {
       return cell.classList.contains('x') || cell.classList.contains("circle");
    })
}


const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
    board.classList.remove('circle');
    board.classList.remove('x');

    if(isCircleTurn){
        board.classList.add('circle');
    } else {
        board.classList.add('x');
    }
}


const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass();
};


const handleclick = (e) => {
    //colocar a marca (x ou circulo)
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);
    //Verificar por vitoria
    const isWin = checkForWin(classToAdd);
    
    //Verificar por empate
    const isDraw = checkForDraw();

    if (isWin){
        endGame(false)
    } else if (isDraw){
        endGame(true)
    } else {
        //mudar simbolo
        swapTurns();
    }
};
for(const cell of cellElements){
    cell.addEventListener('click', handleclick,{once:true});
}
startGame();

restartButton.addEventListener("click",startGame);


