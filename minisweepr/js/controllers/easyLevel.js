import { Board } from '../board.js';
import { generateBombs } from '../bombs.js';
import { Events } from '../events.js';


function beginnerGame() {
    let $board = $('#table');
    let $timerContainer = $('.game-time span').empty();

    $board.empty();
    $board.addClass('table-styles'); // added this class here because if it's static broke visually the minefield
    var smallBoard = new Board(9, 9);
    $board.append(smallBoard.createBoard());

    let numberBombs = 10;
    $('#display-bomb-number').html('Number of Bombs ' + numberBombs);
    let arrayOfBombs = generateBombs(smallBoard.numberElements, numberBombs);

    for (let bomb of arrayOfBombs) {
        bomb.bomb = true;
    }

    let events = new Events(); // created for events
    events.startTimer('game-time'); // starts the timer

    console.log(arrayOfBombs);

    $('button').on('click', function (ev) {

        if (ev.target.bomb) {
            var show = function showBombs() {
                for (var i = 0; i < arrayOfBombs.length; i++) {
                    arrayOfBombs[i].className += ' bomb';//not jquery object to use addClass

                    }
                };
                show();
                alert("Game Over");
            } else {
                let button = ev.target;
                let x = button.coordX;
                let y = button.coordY;

                function howManyBombsArroundClickedButton(x, y, smallBoard) {
                    let counterBomb = 0;

                    let yMoving;
                    if (y === 0) {
                        yMoving = y;
                    } else {
                        yMoving = y - 1;
                    }
                    function FindByAttributeValue(coordX, coordY, value, value2) {
                        let allElements = document.getElementsByTagName('button');
                        for (let i = 0; i < allElements.length; i++) {
                            if (allElements[i].coordX === value&&allElements[i].coordY===value2) {
                                return allElements[i];

                            }

                        }
                    }

                    for (; yMoving <= y + 1 && yMoving < smallBoard.rows; yMoving++) {
                        let xMoving = x == 0 ? x : x - 1;
                        for (; xMoving <= x + 1 && xMoving < smallBoard.cols; xMoving++) {
                            let selEl = FindByAttributeValue('coordX', 'coordY', xMoving, yMoving);
                            if (selEl.bomb) {
                                counterBomb++;

                            }
                        }
                    }
                    return counterBomb;


                }

                let number = howManyBombsArroundClickedButton(x, y, smallBoard);
                ev.target.innerHTML=number;
            }
        }
    )
    ;


    $('button').on('contextmenu', function (ev) {
        let flag = $('<img>');
        flag.attr('src', '../flag.png');
        flag.addClass('img');

        let $target = $(ev.target);
        ev.preventDefault();//don't show context menu

        if ($target.hasClass('flag')) {
            $target.removeClass('flag')
            numberBombs++;
            $('#display-bomb-number').html('Number of Bombs ' + numberBombs);
        } else {

            $target.addClass('flag');
            // $target.html('*');
            numberBombs--;
            $('#display-bomb-number').html('Number of Bombs ' + numberBombs);
        }

        //think to simplifie,duplicate on each controller
    });

    $(window).on('hashchange', function () {
        events.stopTimer(); // stop the timer when page is changed
    });
}

export { beginnerGame }

