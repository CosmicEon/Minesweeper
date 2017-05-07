import { Board } from '../board.js';
import { Bombs } from '../bombs.js';
import { Events } from '../app/events.js';



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

    function squareLeftClick(ev) {
        if (ev.target.nodeName == 'BUTTON' && firstTriggered) {
            // this starts the timer when a click is made on the board
            // and checkс its the only 1st click
            firstTriggered = false;
            events.startTimer('game-time'); // starts the timer
        }
        if (ev.target.bomb) {
            for (let i = 0; i < arrayOfBombs.length; i++) {
                arrayOfBombs[i].className += ' bomb';//not jquery object to use addClass
            }

            alert("Game Over");
            events.stopTimer(); // stop the timer
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


            if (number == 0) {
                ev.target.innerHTML = 0;
                var expand=function(){
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
            ev.target.style.color = colors[number-1];
            ev.target.innerHTML = number;
        }
    }

    //right click a square
    $('button').on('contextmenu', squareRightClick);

    function squareRightClick(ev) {
        let flag = $('<img>');
        flag.attr('src', '../../img/flag.png');
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

        //think to simplifie,duplicate on each controller
    }

    $(window).on('hashchange', function () {
        events.stopTimer(); // stop the timer when page is changed
    });
}

export { newGame }

