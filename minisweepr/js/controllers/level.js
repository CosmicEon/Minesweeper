import {Board} from '../board.js';
import {Bombs} from '../bombs.js';
import {Events} from '../app/events.js';
import {Utilities} from '../app/utilities.js';


function newGame(numberOfBombs, numberOfRows, numberOfColumns) {
    //create board

    let $board = $('#table');
    $('.dropdown-menu').hide()
    $board.empty();

    $board.addClass('table-styles'); // added this class here because if it's static broke visually the minefield
    let board = new Board(numberOfRows, numberOfColumns);

    $board.append(board.createBoard());

    //add bombs
    let numberBombs = numberOfBombs;
    $('#display-bomb-number').html('Number of Bombs ' + numberBombs);
    let newBombs = new Bombs();
    let arrayOfBombs = newBombs.generateBombs(board.numberElements, numberBombs);
    for (let bomb of arrayOfBombs) {
        bomb.bomb = true;
    }

    let events = new Events(); // created for events
    let timerContainer = document.getElementById('game-time').childNodes[1];
    let firstTriggered = true;
    let timerValue = null;

    //left click a square
    $('.field').on('click', squareLeftClick);
    $('#new-game').on('click', start);
    $('#chooseOption').on('click', function (ev) {
        $('.dropdown-menu').show();
    });


    function start() {

        if (location.hash === '#/beginner') {
            return newGame(10, 8, 8);
        }
        else if (location.hash === '#/intermediate') {
            return newGame(40, 16, 16);
        }
        else if (location.hash === '#/expert') {
            return newGame(99, 16, 30);
        }
        else {
            $('.dropdown-menu').show()
        }

    }

//da se dobavq v putq //beginner/zoom
    //2 opcii 30i 40px
    //2 opcii za zoom out
    //div s opciite da izliza=>eventlistener
    //i pri izbrana opciq da te redirektva
    //da se fokusira table v sredata da screena a ne da se scrolva
    $('#display').on('click', ZoomIn);
    function ZoomIn() {

        $('.field').width(
            40
        ).height(
            40
        );
    }


    function ZoomOut(event) {

        $('#table').width(
            $('#table').width() * 0.5
        );

        $('#table').height(
            $('#table').height() * 0.5
        );
    }

    function showBomb() {
        for (let i = 0; i < arrayOfBombs.length; i++) {
            arrayOfBombs[i].className += ' bomb';//not jquery object to use addClass

        }
    }

    function checkCorrectFlag() {
        let markedAsBombFiled = $('.field.flag');
        let isCorrect = true;
        for (var i = 0; i < markedAsBombFiled.length; i++) {
            if (!markedAsBombFiled[i].bomb) {
                markedAsBombFiled[i].style.color = 'yellow';
                markedAsBombFiled[i].value = 'X';
                isCorrect = false;
            }
        }
        return isCorrect;
    }

    function checkAllFieldAreOpen() {
        let allFields = $('.field');
        let isCorrect = true;
        for (var i = 0; i < allFields.length; i++) {
            if (allFields[i].isClicked) {

                isCorrect = true;
            }
            else {
                isCorrect = false
            }
        }
        return isCorrect;

    }

    function gameOver() {
        showBomb();
        checkCorrectFlag();
        alert("Game Over");
        $('.field').off();//stops the event handlers

        timerValue = timerContainer.innerText; // save current time to use it for score
        events.stopTimer(timerContainer); // stop the timer
        events.switchElementsVisibility("#high-scores-btn", '#high-score-input');
    }

    function winner() {


        if (checkCorrectFlag) {
            alert('winner winner chichken dinner');
            timerValue = timerContainer.innerText; // save current time to use it for score
            events.stopTimer(timerContainer); // stop the timer
            events.switchElementsVisibility("#high-scores-btn", '#high-score-input');

        }
        else {
            return
        }
    }

    function squareLeftClick(ev) {
        ev.target.isClicked = true;//the button is clicked
        if (ev.target.classList.contains('flag')) {
            return
        }

        if (ev.target.className === 'field' && firstTriggered) {
            // this starts the timer when a click is made on the board
            // and checks if its the 1st click only
            firstTriggered = false;
            events.startTimer('game-time'); // starts the timer
        }
        if (ev.target.bomb) {
            gameOver();


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
        if (ev.keyCode === 13) { // 13 is enter
            storage.localStorageSet(name, timerValue);

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
            if (numberBombs === 0 && checkAllFieldAreOpen) {
                if (winner) {
                    alert('winer');
                    showBomb('win')
                }
            }
            ;
        }

        //think to simplifie,duplicate on each controller
    }


    $(window).on('hashchange', function () {
        events.stopTimer(timerContainer); // stop the timer when page is changed
        document.removeEventListener('keypress', saveScore);
        inputHighScore.innerHTML = '';
    });
}

export {newGame};

