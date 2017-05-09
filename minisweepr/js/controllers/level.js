import {Board} from '../board.js';
import {Bombs} from '../bombs.js';
import {Events} from '../app/events.js';
import {Utilities} from '../app/utilities.js';
import {Timer} from '../timer.js';
import {winner, gameOver, checkAllFieldAreOpen} from '../game.js';
import {zoomIn, zoomOut} from '../zoom.js';

let timeSpan = document.getElementById('timer');
let timer = new Timer();
let time;

function newGame(numberOfBombs, numberOfRows, numberOfColumns) {
    //create board
    timer.stopTimer();
    clearInterval(time);
    let events = new Events(); // created for events
    let $board = $('#table');
    $board.empty();
    $board.addClass('table-styles'); // added this class here because if it's static broke visually the minefield
    let board = new Board(numberOfRows, numberOfColumns);


    $board.append(board.createBoard());
    if (!$('#high-score-input').hasClass('hidden')) {
        events.switchElementsVisibility('#high-score-input', "#high-scores-btn");
    }

    $('.dropdown-menu').hide();
    $('#display').on('click', zoomIn);
    $('#zoomOut').on('click', zoomOut);
    function start() {
        //TODO replace the if statements
        if (location.hash === '#/beginner+zoom') {

            return (function () {
                newGame(10, 8, 8);
                zoomIn();
            }());
        } else if (location.hash === '#/intermediate+zoom') {
            return (function () {
                newGame(40, 16, 16);
                zoomIn();
            }());
        } else if (location.hash === '#/expert+zoom') {
            return (function () {
                newGame(99, 16, 30);
                zoomIn();
            }());
        }
        else if (location.hash === '#/beginner') {
            return newGame(10, 8, 8);
        }
        else if (location.hash === '#/intermediate') {
            return newGame(40, 16, 16);
        }
        else if (location.hash === '#/expert') {
            return newGame(99, 16, 30);
        }
        else {
            $('#options').show()
        }

    }

    //add bombs
    let numberBombs = numberOfBombs;
    $('#display-bomb-number').html('Number of Bombs ' + numberBombs);
    let newBombs = new Bombs();
    let arrayOfBombs = newBombs.generateBombs(board.numberElements, numberBombs);

    let timerContainer = document.getElementById('game-time').childNodes[1];
    let firstTriggered = true;
    let timerValue = null;

    //left click a square
    $('.field').on('click', squareLeftClick);
    $('#new-game').on('click', start);
    $('#chooseOption').on('click', function () {
        $('.dropdown-menu').show();
    });


    function squareLeftClick(ev) {
        if (firstTriggered) {
            // this starts the timer when a click is made on the board
            // and checks if its the 1st click only
            firstTriggered = false;
            // starts the timer
            timer.startTimer();
            time = setInterval(function () {
                timer.startTimer()
            }, 1000);
        }
        ev.target.isClicked = true;//the button is clicked
        if (ev.target.classList.contains('flag')) {
            return
        }


        if (ev.target.bomb) {
            gameOver(arrayOfBombs);

            timer.stopTimer();
            clearInterval(time);

        } else {
            let button = ev.target;
            let x = button.coordX;
            let y = button.coordY;

            if (ev.target.classList.contains('flag')) {
                return;
            }//can't click on a flag

            function FindByAttributeValue(coordX, coordY, value, value2) {
                let allElements = document.getElementsByClassName('field');
                for (let i = 0; i < allElements.length; i++) {
                    if (allElements[i].coordX === value && allElements[i].coordY === value2) {

                        return allElements[i];
                    }
                }
            }

            function howManyBombsArroundClickedButton(x, y) {
                let counterBomb = 0;

                let yMoving = y === 0 ? y : y - 1;


                for (; yMoving <= y + 1 && yMoving < board.cols; yMoving++) {
                    let xMoving = x === 0 ? x : x - 1;
                    for (; xMoving <= x + 1 && xMoving < board.rows; xMoving++) {
                        let selEl = FindByAttributeValue('coordX', 'coordY', xMoving, yMoving);
                        if (selEl.bomb) {
                            counterBomb++;

                        }
                    }
                }

                return counterBomb;
            }

            let number = howManyBombsArroundClickedButton(x, y);


            if (number === 0) {
                ev.target.value = 0;
                let expand = function () {
                    let yMoving = y === 0 ? y : y - 1;

                    for (; yMoving <= y + 1 && yMoving < board.cols; yMoving++) {
                        let xMoving = x === 0 ? x : x - 1;
                        for (; xMoving <= x + 1 && xMoving < board.rows; xMoving++) {
                            let selEl = FindByAttributeValue('coordX', 'coordY', xMoving, yMoving);
                            if (selEl.value) {
                                continue;
                            }
                            //if there's already a flag should stop expanding
                            if (selEl.classList.contains('flag')) {
                                continue;
                            }
                            selEl.click();
                        }
                    }

                };
                expand();

            }
            let colors = ['red', 'teal', 'brown', 'rebeccapurple', 'purple', 'darkgreen', 'green', 'navy'];
            ev.target.style.color = colors[number - 1];
            ev.target.value = number;
        }
    }

    // event for input field
    let inputHighScore = document.querySelector('#high-score-input');
    inputHighScore.addEventListener('keypress', saveScore);
    let storage = new Utilities();

    function saveScore(ev) {
        let enterTriggered = false;
        let name = inputHighScore.value;
        clearInterval(time);
        if (ev.keyCode === 13) { // 13 is enter
            storage.setLocalStorage(name, timeSpan.innerText+numberOfBombs);

            //console.log(storage.allStorage()); // for testing

            document.removeEventListener('keypress', saveScore);
            enterTriggered = true;
        }
        if (enterTriggered) {
            events.switchElementsVisibility('#high-score-input', "#high-scores-btn");
            inputHighScore.innerHTML = '';
        }
    }

    document.removeEventListener('keypress', saveScore);

    //right click a square
    $('.field').on('contextmenu', squareRightClick);


    function squareRightClick(ev) {
        ev.preventDefault();
        if (ev.target.value) {
            return
        }

        let flag = $('<img>');
        flag.attr('src', '../img/flag.png');
        flag.addClass('img');

        let $target = $(ev.target);
        //don't show context menu


        if ($target.hasClass('flag')) {

            $target.isClicked = false;//unclicked the button
            $target.removeClass('flag')
            numberBombs++;
            $('#display-bomb-number').html('Number of Bombs ' + numberBombs);
        } else {
            if (numberBombs === 0) {
                return
            }
            $target.isClicked = true;//button is clicked
            $target.addClass('flag');
            // $target.html('*');
            numberBombs--;
            $('#display-bomb-number').html('Number of Bombs ' + numberBombs);
            if (numberBombs === 0 && checkAllFieldAreOpen()) {
                if (winner(arrayOfBombs)) {
                    alert('winner');
                    timerValue = timerContainer.innerText; // save current time to use it for score
                    clearInterval(time);
                    events.switchElementsVisibility("#high-scores-btn", '#high-score-input');
                }
            }
            ;
        }

        //think to simplifie,duplicate on each controller
    }


    $(window).on('hashchange', function () {
        clearInterval(time);
        //events.stopTimer(timerContainer); // stop the timer when page is changed
        document.removeEventListener('keypress', saveScore);
        inputHighScore.innerHTML = '';
    });
}

export {newGame};

