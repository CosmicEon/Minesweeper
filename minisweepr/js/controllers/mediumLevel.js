import { Board } from '../board.js';
import { generateBombs } from '../bombs.js';


function intermediateGame() {
    let $board = $('#table');
    $board.empty();
    $board.addClass('table-styles');
    var mediumTable = new Board(16, 16);

    $board.append( mediumTable.createBoard());

    let numberBombs = 40;
    $('#display-bomb-number').html('Number of Bombs ' + numberBombs);
    let arrayOfBombs = generateBombs(mediumTable.numberElements, numberBombs);

    for (let bomb of arrayOfBombs) {
        bomb.bomb = true;
    }
    console.log(arrayOfBombs);

    $('button').on('click', function (ev) {

        if (ev.target.bomb) {
            var show= function showBombs(){
                for (var i = 0; i < arrayOfBombs.length; i++) {
                    arrayOfBombs[i].className+=' bomb';//not jquery object to use addClass

                }};
            show();
            alert("Game Over");
        }

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

export { intermediateGame };