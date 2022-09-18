const { game, newGame, showScore, addTurn, lightsOn, showTurn, playerTurn } = require('../game')

jest.spyOn(window, 'alert').mockImplementation(() => { });

beforeAll(() => {
    let fs = require('fs')
    let fileContents = fs.readFileSync('index.html', 'utf-8');
    document.open();
    document.write(fileContents);
    document.close();
})

describe('Game object contains correct keys', () => {
    test('Game object contains score key', () => {
        expect('score' in game).toBe(true)
    });
    test('game contains currentGame key', () => {
        expect('currentGame' in game).toBe(true)
    });
    test('game contains playerMoves key', () => {
        expect('playerMoves' in game).toBe(true)
    });
    test('game contains choices key', () => {
        expect('choices' in game).toBe(true)
    });
    test('choices contains correct ids', () => {
        expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4'])
    });
    test('game contains turnNumber key', () => {
        expect('turnNumber' in game).toBe(true)
    });
});

describe('Game object contains correct keys', () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ['button1', 'button2'];
        game.currentGame = ['button1', 'button2'];
        document.getElementById('score').innerText = '42';
        newGame();
    });
    test('game.score should be set to 0', () => {
        expect(game.score).toEqual(0);
    });
    test('game.playerMoves should be an empty array', () => {
        expect(game.playerMoves.length).toEqual(0);
    });
    test('computer moves should contain 1 element', () => {
        expect(game.currentGame.length).toEqual(1);
    });
    test('game should display a score of 0', () => {
        expect(document.getElementById('score').innerText).toEqual(0);
    });
    test('data-listener attribute equals true', () => {
        const elements = document.getElementsByClassName('circle');
        for (let element of elements){
            expect(element.getAttribute('data-listener')).toEqual('true');
        }
    });
});

describe('Game play works correctly', () => {
    beforeEach(() => {
        game.score = 0;
        game.playerMoves = [];
        game.currentGame = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.playerMoves = [];
        game.currentGame = [];
    });
    test('currentGame contains 2 elements', () => {
        addTurn();
        expect(game.currentGame.length).toEqual(2);
    });
    test('should add correct class to light up the button', () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain('light');
    });
    test('showTurns should update game.turnNumber', () => {
        game.turnNumber = 42;
        showTurn();
        expect(game.turnNumber).toBe(0);
    });
    test('Should increment the score if guess is correct', () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    })
    test('should call an alert if the move is wrong', () => {
        game.playerMoves.push('wrong');
        playerTurn();
        expect(window.alert).toBeCalledWith('Wrong move!')
    })
});