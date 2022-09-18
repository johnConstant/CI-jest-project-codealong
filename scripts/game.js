/**
 * @jest-environment jsdom
 */

let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ['button1', 'button2', 'button3', 'button4'],
    turnNumber: 0
}

const newGame = () => {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    const circles = document.getElementsByClassName('circle');
    for (let circle of circles){
        if(circle.getAttribute('data-listener') !== true){
            circle.addEventListener('click', (e) => {
                let move = e.target.getAttribute('id');
                lightsOn(move);
                game.playerMoves.push(move);
                playerTurn();
                circle
            })
        }
        circle.setAttribute('data-listener', 'true')
    }
    showScore();
    addTurn();
}

const showScore = () => {
    document.getElementById('score').innerText = game.score;
}

const addTurn = () => {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurn();
}

const lightsOn = (circle) => {
    document.getElementById(circle).classList.add('light');
    setTimeout(() => {
        document.getElementById(circle).classList.remove('light');
    }, 400)
}

const showTurn = () => {
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if(game.turnNumber >= game.currentGame.length){
            clearInterval(turns)
        }
    }, 800)
}

const playerTurn = () => {
    let i = game.playerMoves.length - 1;
    if(game.playerMoves[i] === game.currentGame[i]){
        if(game.currentGame.length === game.playerMoves.length){
            game.score++;
            showScore();
            addTurn();
        }
    }else {
        window.alert('Wrong move!');
        newGame();
    }
}

module.exports = { game, newGame, showScore, addTurn, showTurn, lightsOn, playerTurn }

