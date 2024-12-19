let box0 = document.getElementById('box0')
let box1 = document.getElementById('box1')
let box2 = document.getElementById('box2')
let box3 = document.getElementById('box3')
let box4 = document.getElementById('box4') // selecting and creating variables for each box in the grid
let box5 = document.getElementById('box5')
let box6 = document.getElementById('box6')
let box7 = document.getElementById('box7')
let box8 = document.getElementById('box8')
let allBoxes = [box0, box1, box2, box3, box4, box5, box6, box7, box8] // combining all into a single variable

let player1 = "X"
let player2 = "O"
let player1Signifier = document.getElementById('p1') // grabbing the individual player ids and assigning a variable for later styling purposes
let player2Signifier = document.getElementById('p2')

let winner = false;
let turnCounter = 0;

// let endAlert = document.createElement('div')
// endAlert.style.background.color = "red"

const winningOutcomes = [
    [box0, box1, box2], [box3, box4, box5], [box6, box7, box8],
    [box0, box3, box6], [box1, box4, box7], [box2, box5, box8],
    [box0, box4, box8], [box2, box4, box6]
];


function endGame() { // function that gets called when 'winner' is true, does some styling stuff
    let endColorChange = document.getElementById('body')
    endColorChange.classList.remove('bg-secondary')
    endColorChange.style.backgroundColor = "rgba(2, 71, 71, 0.53)"
    player1Signifier.removeAttribute('style')
    player2Signifier.removeAttribute('style')
}

// function checkScore() {
//     if (box0.innerText === "X" && box1.innerText === "X" && box2.innerText === "X") {
//         console.log("Player 1 Wins!") 
//     } else if (box0.innerText === "O" && box1.innerText === "O" && box2.innerText === "O") {
//         console.log("Player 2 Wins")
//     }      
// }

// function checkScore() {
//     if (box0.innerText === box1.innerText && box1.innerText === box2.innerText && box0.innerText !== '') {
//         console.log("Player 1 Wins!") 
//     } else if (box0.innerText === "O" && box1.innerText === "O" && box2.innerText === "O") {
//         console.log("Player 2 Wins")
//     }      
// }



// const checkWinner() = (a, b, c) => {
//     if (a === b && b === c && a !== '') {
//         console.log(`${a} wins!`)
//     } 
// }

// for (let i = 0; i < winningOutcomes.length; ++i) {
//     const subarray = winningOutcomes[i]
//     for (let j = 0; j < subarray.length; ++j) {
//         console.log(subarray[j])
//     }
// }


const checkScore = () => {
    for (let [a, b, c] of winningOutcomes) {
        if (a.innerText === b.innerText && b.innerText === c.innerText && a.innerText !== '') {
            console.log(`${a.innerText} wins!`)
            winner = true;
            gameStartAlert.innerText = `${a.innerText} has won!`
            endGame()
        }
    };
}


function turnSwap() { // function that changes/removes color styling based on who the currentPlayer is, and keeps track of turns to see if they reach a certain point to determine if game is a draw.
    if (currentPlayer === player1) { // Dependent on the allBoxes loop for click functionality
        player2Signifier.style.color = 'rgb(255, 238, 0)'
        player1Signifier.removeAttribute('style')
        currentPlayer = player2
        console.log(turnCounter++)
    } else {
        player1Signifier.style.color = 'rgb(5, 228, 5)'
        player2Signifier.removeAttribute('style')
        currentPlayer = player1
        console.log(turnCounter++)
    }
    checkScore()

    if (turnCounter === 9 && winner === false) {
        console.log("It's a draw!")
        gameStartAlert.innerText = "DRAW!"
        player1Signifier.style.color = "white"
        player2Signifier.style.color = "white"
    }
}

const startGame = () => { // "starts" the game by assigning currentPlayer to player1, grabs gamestartalert div and changes its innerHTML, renders? in box clicking functionality 
    currentPlayer = player1
    player1Signifier.style.color = ('rgb(5, 228, 5)')
    let gameStartAlert = document.getElementById('gameStartAlert')
    gameStartAlert.innerHTML = "The game has started!"

    for (let i = 0; i < allBoxes.length; ++i) { // iterates over allBoxes array and assigns an eventlistener to each element in the array, and when the event runs, changes the innertext of the array element to currentPlayer's value.
        allBoxes[i].addEventListener('click', () => { //  calls turn swap function. line 103 prevents the eventlistner from happening more than once. (Initially had issue where each box was reassignable infinitely)
            allBoxes[i].innerText = currentPlayer
            turnSwap()
        }, {once : true});  
    }

}





document.getElementById('startBtn').addEventListener('click', () => startGame()) // button that runs startGame() on click
document.getElementById('resetBtn').addEventListener('click', () => document.location.reload(true)) // button that reloads page to play again