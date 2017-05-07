import {Board} from '../board.js';
import {Bombs} from '../bombs.js';
import {Events} from '../app/events.js';
import {Utilities} from '../app/utilities.js';


function newGame(numberOfBombs, numberOfRows, numberOfColumns) {
    //create board
    let $board = $('#table');
    $board.empty();
    //this class broke the css
    $board.addClass('table-styles'); // added this class here because if it's static broke visually the minefield
    var board = new Board(numberOfRows, numberOfColumns);

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

    //left click a square
    $('button').on('click', squareLeftClick);
    $('#new-game').on('click', start);

    function start() {

        if (location.hash === '#/beginner') {
            return newGame(10, 8, 8);
        }
<<<<<<< .mine
        else if (location.hash === '#/intermediate') {
            return newGame(40, 16, 16);
        }
        else if (location.hash==='#/expert') {
            return newGame(99, 16, 30);
        }
    }
=======

        if (ev.target.bomb) {
            for (let i = 0; i < arrayOfBombs.length; i++) {
                arrayOfBombs[i].className += ' bomb';//not jquery object to use addClass
            }


>>>>>>> .theirs

<<<<<<< .mine

=======
            alert("Game Over");
>>>>>>> .theirs

<<<<<<< .mine



=======
            let timerValue = timerContainer.innerText;
            events.stopTimer(timerContainer); // stop the timer
            events.switchElementsVisibility("#high-scores-btn", '#high-score-input');
>>>>>>> .theirs

<<<<<<< .mine





=======
            let saveScore = function (ev) {
                let enterKey = ev.which || ev.keyCode;
                let enterTriggered = false;
                if (enterKey === 13) { // 13 is enter
                    let storage = new Utilities();
>>>>>>> .theirs

<<<<<<< .mine



=======
                    let $name = $(this).val();
                    let score = timerValue;
                    // storage.localStorageSet(name, score);
>>>>>>> .theirs

<<<<<<< .mine
function squareLeftClick(ev) {
    if (ev.target.nodeName == 'BUTTON' && firstTriggered) {
        // this starts the timer when a click is made on the board
        // and checks if its the 1st click only
        firstTriggered = false;
        events.startTimer('game-time'); // starts the timer
    }
    if (ev.target.bomb) {
        for (let i = 0; i < arrayOfBombs.length; i++) {
            arrayOfBombs[i].className += ' bomb';//not jquery object to use addClass
        }
=======
                    console.log(this);
                    console.log($name);
                    console.log(score);
                    console.log('-------------------------------');







>>>>>>> .theirs

<<<<<<< .mine
        alert("Game Over");
        let timerValue = document.getElementById('game-time').childNodes[1].innerText;











=======

                    // $(this).val('');
                    document.removeEventListener('keypress', saveScore.bind(this));
                    enterTriggered = true;
                } else {
                    return;
                }

                if (enterTriggered){
                    events.switchElementsVisibility('#high-score-input', "#high-scores-btn");

                }
            };
>>>>>>> .theirs

<<<<<<< .mine
        events.stopTimer(); // stop the timer
        events.openHighScoreMenu("#high-scores-btn", '#high-score-input');







=======
            document.querySelector('#high-score-input')
                .addEventListener('keypress', saveScore);



        } else {
            let button = ev.target;
            let x = button.coordX;
            let y = button.coordY;
>>>>>>> .theirs

        var handleKeyDown = function (ev) {
            let enterKey = ev.which || ev.keyCode;
            if (enterKey === 13) { // 13 is enter
                let storage = new Utilities();

                var name = $(this).val();
                var score = timerValue;
                storage.localStorageSet(name, score);

                console.log('enter');
                console.log(name);
                console.log(score);
                document.removeEventListener('keypress', handleKeyDown);

                events.closeHighScoreMenu("#high-scores-btn", '#high-score-input');
            }
        };

        document.querySelector('#high-score-input')
            .addEventListener('keypress', handleKeyDown);
    } else {
        let button = ev.target;
        let x = button.coordX;
        let y = button.coordY;

        function FindByAttributeValue(coordX, coordY, value, value2) {
            let allElements = document.getElementsByTagName('button');
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
                let xMoving = x == 0 ? x : x - 1;
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
            ev.target.innerHTML = 0;
            let expand = function () {
                let yMoving = y === 0 ? y : y - 1;

                for (; yMoving <= y + 1 && yMoving < board.cols; yMoving++) {
                    let xMoving = x === 0 ? x : x - 1;
                    for (; xMoving <= x + 1 && xMoving < board.rows; xMoving++) {
                        let selEl = FindByAttributeValue('coordX', 'coordY', xMoving, yMoving);
                        if (selEl.innerHTML) {
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
        ev.target.innerHTML = number;
    }
}

//right click a square
$('button').on('contextmenu', squareRightClick);

function squareRightClick(ev) {
    let flag = $('<img>');
    flag.attr('src', '../img/flag.png');
    flag.addClass('img');

    let $target = $(ev.target);
    ev.preventDefault();//don't show context menu

    if ($target.hasClass('flag')) {
        $target.removeClass('flag')
        numberBombs++;
        $('#display-bomb-number').html('Number of Bombs ' + numberBombs);
    } else if ($target.text().length || $target.hasClass('bomb')) {
        // This checks if there is something in the way
        // that prevents placing the flag
        return;
    } else {
        $target.addClass('flag');
        // $target.html('*');
        numberBombs--;
        $('#display-bomb-number').html('Number of Bombs ' + numberBombs);
    }

<<<<<<< .mine
    //think to simplifie,duplicate on each controller


=======
    $(window).on('hashchange', function () {
        events.stopTimer(timerContainer); // stop the timer when page is changed
    });
>>>>>>> .theirs
}

$(window).on('hashchange', function () {
    events.stopTimer(); // stop the timer when page is changed
});
}

export {newGame}

