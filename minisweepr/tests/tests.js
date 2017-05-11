const mocha = require('mocha');
const chai = require('chai');

// classes to tests
//const { generateBomb } = require('../js/bombs');
import { generateBomb } from '../js/bombs.js';
import {Board} from '../board.js';

describe('Bombs tests', () => {
	it('generateBomb should return an array', function() {
			var board = new Board(16, 16);
            var actual = board.rows;
            var expected = 16;

            expect(actual).to.be.equal(expected);
        });
});

describe('Board tests', () => {
	it('constructor should set correct number of rows', function() {
			var board = new Board(16, 16);
            var actual = board.rows;
            var expected = 16;

            expect(actual).to.be.equal(expected);
        });
	it('constructor should set correct number of columns', function() {
			var board = new Board(16, 16);
            var actual = board.cols;
            var expected = 16;

            expect(actual).to.be.equal(expected);
        });
});

describe('Timer tests', () => {
	it('constructor should set correct number of minutes', function() {
			var timer = new Timer();
            var actual = timer.minutes;
            var expected = 0;

            expect(actual).to.be.equal(expected);
        });
	it('constructor should set correct number of seconds', function() {
			var timer = new Timer();
            var actual = timer.seconds;
            var expected = 0;

            expect(actual).to.be.equal(expected);
        });
})