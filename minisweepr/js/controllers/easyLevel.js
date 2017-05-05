import { Board } from '../board.js';
import { generateBombs } from '../bombs.js';


function beginnerGame() {
    let $board = $('#table');
    $board.empty();
    var smallBoard = new Board(9, 9);
    $board.append( smallBoard.createBoard());

    let numberBombs = 10;
    let arrayOfBombs = generateBombs(smallBoard.numberElements, numberBombs);

    for (let bomb of arrayOfBombs) {
        bomb.bomb = true;
    }

    console.log(arrayOfBombs);



    $('button').on('click', function (ev) {

        if (ev.target.bomb === true) {
            console.log('GAME OVER');
            //to implement function end game
        } else {
            //show number - function
        }

    });
    $('button').on('contextmenu', function (ev) {
        let $target = $(ev.target);
        ev.preventDefault();//don't show context menu
        console.log(ev.which);
        if ($target.html() === '*') {
            $target.html('');
            numberBombs++;
            $('#display-bomb-number').html('Number of Bombs ' + numberBombs);
        } else {
            $target.html('*');
            numberBombs--;
            $('#display-bomb-number').html('Number of Bombs ' + numberBombs);
        }
        //add Image Flag to button
        //think to simplifie,duplicate on each controller
    });


}

export { beginnerGame };

