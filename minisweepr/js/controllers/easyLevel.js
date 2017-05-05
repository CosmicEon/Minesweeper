import { Board } from '../board.js';
import { generateBombs } from '../bombs.js';


function beginnerGame() {
    let $board = $('#table');
    $board.empty();
    var smallBoard = new Board(9, 9);
    $board.append( smallBoard.createBoard());

    let numberBombs = 10;
    $('#display-bomb-number').html('Number of Bombs ' + numberBombs);
    let arrayOfBombs = generateBombs(smallBoard.numberElements, numberBombs);

    for (let bomb of arrayOfBombs) {
        bomb.bomb = true;
    }

    console.log(arrayOfBombs);

    $('button').on('click', function (ev) {
        console.log(ev.which);

    });
    $('button').on('contextmenu', function (ev) {
        let flag=$('<img>');
        flag.attr('src','../flag.png');
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

export { beginnerGame };

