import { Board } from '../board.js';
import { generateBombs } from '../bombs.js';
import { Events } from '../events.js';


function expertGame() {
    let $board = $('#table');
    $board.empty();
    $board.addClass('table-styles'); // added this class here because if it's static broke visually the minefield
    var bigBoard = new Board(16, 30);

    $board.append(bigBoard.createBoard());
    let numberBombs = 99;
    $('#display-bomb-number').html('Number of Bombs ' + numberBombs);
    let arrayOfBombs = generateBombs(bigBoard.numberElements, numberBombs);

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
            events.stopTimer(); // stop the timer
        }

        console.log(ev.which);

    });

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
}


export { expertGame };