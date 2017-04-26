class Board {
    constructor(rows, cols) {
        this._rows = rows;
        this._cols = cols;
        this.numberElements = [];

    }


    get rows() {
        return this._rows;
    }

    set rows(value) {
        this._rows = value;
    }

    get cols() {
        return this._cols;
    }

    set cols(value) {
        this._cols = value;
    }

    createBoard() {
        let tableColumns = this._cols
        let tableRows = this._rows;
        let table = new Array(tableRows);
        let $board = $('#table');


        for (let i = 0; i < tableRows; i++) {
            let $rowDiv = $('<div>');
            table[i] = new Array(tableColumns);
            for (var j = 0; j < tableColumns; j++) {
                let $button =document.createElement('button');
                $button.className='field';




                //set coordinates to button to indentifie each of them

                $button.coordX = i;
                $button.coordY = j;
                $button.bomb = false;
                table[i][j] = $button;
                this.numberElements.push($button);
                $rowDiv.append($button);


            }
            $board.append($rowDiv);
        }

    }

    //TODO add methods, fields and properties
}

export {Board};