const { game } = require('../game')

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
    test('currentGame contains score key', () => {
        expect('currentGame' in game).toBe(true)
    });
    test('playerMoves contains score key', () => {
        expect('playerMoves' in game).toBe(true)
    });
    test('choices contains score key', () => {
        expect('choices' in game).toBe(true)
    });
    test('choices contains correct ids', () => {
        expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4'])
    });
})

