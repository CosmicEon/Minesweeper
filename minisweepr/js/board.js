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
        let tableColumns = this._cols;
        let tableRows = this._rows;
        let table = new Array(tableRows);

        let $createdBoard = $('<div>');


        for (let y = 0; y < tableRows; y++) {
            let $rowDiv = $('<div>');
            table[y] = new Array(tableColumns);
            for (let x = 0; x < tableColumns; x++) {
                let $button = document.createElement('button');
                $button.className = 'field';


                //set coordinates to button to indentifie each of them

                $button.coordX = y;
                $button.coordY = x;
                $button.bomb = false;
                table[y][x] = $button;
                this.numberElements.push($button);
                $rowDiv.append($button);


            }
            $createdBoard.append($rowDiv);
        }
        return $createdBoard;

    }

    //TODO add methods, fields and properties
}

export { Board };