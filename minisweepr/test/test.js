const mocha = require('mocha');
const chai = require('chai');

// classes to test
const { generateBomb } = require('../js/bombs');
const { Board } = require('../board.js');


describe('Bombs tests', () => {
    it('generateBomb should return an array', function () {
        let board = new Board(16, 16);
        let actual = board.rows;
        let expected = 16;

        chai.expect(actual).to.be.equal(expected);
    });
});

describe('Board tests', () => {
    it('constructor should set correct number of rows', function () {
        let board = new Board(16, 16);
        let actual = board.rows;
        let expected = 16;

        chai.expect(actual).to.be.equal(expected);
    });
    it('constructor should set correct number of columns', function () {
        let board = new Board(16, 16);
        let actual = board.cols;
        let expected = 16;

        chai.expect(actual).to.be.equal(expected);
    });
});

describe('Timer tests', () => {
    it('constructor should set correct number of minutes', function () {
        let timer = new Timer();
        let actual = timer.minutes;
        let expected = 0;

        chai.expect(actual).to.be.equal(expected);
    });
    it('constructor should set correct number of seconds', function () {
        let timer = new Timer();
        let actual = timer.seconds;
        let expected = 0;

        chai.expect(actual).to.be.equal(expected);
    });
});

describe('Level tests', () => {
    it('newGame should not throw error when called with correct parameters', function () {
        let createGame = new newGame(10, 8, 8);

        chai.expect(createGame).to.not.throw(Error);
    });

});