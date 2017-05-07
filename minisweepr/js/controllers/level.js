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
    let firstTriggered = true;

    //left click a square
    $('button').on('click', squareLeftClick);
    $('#new-game').on('click', start);

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
        else {}
            //('.dropdown-menu')[0].addClass('show');}
//TODO mush the dropdown menu appear
        }


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

                alert("Game Over");
                let timerValue = document.getElementById('game-time').childNodes[1].innerText;

                events.stopTimer(); // stop the timer
                events.openHighScoreMenu("#high-scores-btn", '#high-score-input');

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

                if(ev.target.classList.contains('flag')){return;}//can't click on a flag

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
                                if (selEl.innerHTML){
                                    continue;
                                }
                                //if there's already a flag should stop expanding
                                if(selEl.classList.contains('flag')){continue;}
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
            }  else {
                $target.addClass('flag');
                // $target.html('*');
                numberBombs--;
                $('#display-bomb-number').html('Number of Bombs ' + numberBombs);
            }

            //think to simplifie,duplicate on each controller
        }

        $(window).on('hashchange', function () {
            events.stopTimer(); // stop the timer when page is changed
        });
    }

    export {newGame}

