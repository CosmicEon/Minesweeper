import { Board } from '../board.js';
import { generateBombs } from '../bombs.js';


function intermediateGame() {
    let $board = $('#table');
    $board.empty();
    var mediumTable = new Board(16, 16);

    $board.append( mediumTable.createBoard());

    let numberBombs = 40;
    $('#display-bomb-number').html('Number of Bombs ' + numberBombs);
    let arrayOfBombs = generateBombs(mediumTable.numberElements, numberBombs);

    for (let bomb of arrayOfBombs) {
        bomb.bomb = true;
    }



    $('button').on('click', function (ev) {
        console.log(ev.which);
        //1=left click
        //3=right click
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

export { intermediateGame };