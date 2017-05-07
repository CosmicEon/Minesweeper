import { Board } from '../board.js';
import { Bombs } from '../bombs.js';
import { Events } from '../app/events.js';
import { Utilities } from '../app/utilities.js';



function newGame(numberOfBombs, numberOfRows, numberOfColumns) {
    //create board
    let $board = $('#table');
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

    //left click a square
    $('button').on('click', squareLeftClick);

    function squareLeftClick(ev) {
        if (ev.target.nodeName == 'BUTTON' && firstTriggered) {
            // this starts the timer when a click is made on the board
            // and checks if its the 1st click only
            firstTriggered = false;
            events.startTimer(timerContainer); // starts the timer
        }

        if (ev.target.bomb) {
            for (let i = 0; i < arrayOfBombs.length; i++) {
                arrayOfBombs[i].className += ' bomb';//not jquery object to use addClass
            }

            alert("Game Over");

            let timerValue = timerContainer.innerText;
            events.stopTimer(timerContainer); // stop the timer
            events.switchElementsVisibility("#high-scores-btn", '#high-score-input');

            let saveScore = function (ev) {
                let enterKey = ev.which || ev.keyCode;
                let enterTriggered = false;
                if (enterKey === 13) { // 13 is enter
                    let storage = new Utilities();

                    let $name = $(this).val();
                    let score = timerValue;
                    // storage.localStorageSet(name, score);

                    console.log(this);
                    console.log($name);
                    console.log(score);
                    console.log('-------------------------------');


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

            document.querySelector('#high-score-input')
                .addEventListener('keypress', saveScore);



        } else {
            let button = ev.target;
            let x = button.coordX;
            let y = button.coordY;

            function howManyBombsArroundClickedButton(x, y) {
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
                        if (allElements[i].coordX === value && allElements[i].coordY === value2) {

                            return allElements[i];
                        }
                    }
                }

                for (; yMoving <= y + 1 && yMoving < board.rows; yMoving++) {
                    let xMoving = x == 0 ? x : x - 1;
                    for (; xMoving <= x + 1 && xMoving < board.cols; xMoving++) {
                        let selEl = FindByAttributeValue('coordX', 'coordY', xMoving, yMoving);
                        if (selEl.bomb) {
                            counterBomb++;

                        }
                    }
                }

                return counterBomb;
            }

            let number = howManyBombsArroundClickedButton(x, y);
            let colors = ['red', 'teal', 'brown', 'rebeccapurple', 'purple', 'darkgreen', 'green', 'navy'];
            ev.target.style.color = colors[number];

            if (number == 0) {
                ev.target.innerHTML = number;

                function openNeihbours(x, y) {
                    let neighbourX = x;
                    let neighbourY = y;
                    let id = neighbourX.toString() + '_' + neighbourY.toString();
                    let neighbourButton = document.getElementById(id);

                    neighbourButton.click();
                }

                function coordsinRange(x, y) {
                    if (0 <= x && x < numberOfRows && 0 <= y && y < numberOfColumns) {
                        return true;
                    } else {
                        return false;
                    }
                }

                if (coordsinRange(x - 1, y - 1)) {
                    openNeihbours(x - 1, y - 1);
                }

                if (coordsinRange(x - 1, y)) {
                    openNeihbours(x - 1, y);
                }

                if (coordsinRange(x - 1, y + 1)) {
                    openNeihbours(x - 1, y + 1);
                }

                /*  if(coordsinRange(x, y - 1)){
                      openNeihbours(x, y - 1);
                  }
  
                  if(coordsinRange(x, y + 1)){
                      openNeihbours(x, y + 1);
                  }
  
                  if(coordsinRange(x + 1, y - 1)){
                      openNeihbours(x + 1, y - 1);
                  }
  
                  if(coordsinRange(x + 1, y)){
                      openNeihbours(x + 1, y);
                  }
  
                  if(coordsinRange(x + 1, y + 1)){
                      openNeihbours(x + 1, y + 1);
                  }
                  */
                return;
            }

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
        events.stopTimer(timerContainer); // stop the timer when page is changed
    });
}

export { newGame }

