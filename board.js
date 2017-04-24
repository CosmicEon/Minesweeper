class Board{
	constructor(rows, cols){
		this.rows = rows;
		this.cols = cols;
	}

	get rows(){
		return this._rows;
	}

	set rows(value){
		this._rows = value;
	}

	get cols(){
		return this._cols;
	}

	set cols(value){
		this._cols = value;
	}

	createBoard(){
		var table = document.getElementById('board');

		var fragment = document.createDocumentFragment();

		var tr = document.createElement('TR');
		tr.className = 'row';

        var td = document.createElement('TD');
        td.className = 'col';

        var button = document.createElement('button');
        button.className = 'field';

        var id = 0;

        for (var i = 0; i < this._cols; i += 1) {
            var col = td.cloneNode(true);
            button.id = id;
            id += 1;
        	tr.appendChild(col);
        }

        for (var i = 0; i < this._rows; i += 1) {
             var row = tr.cloneNode(true);
             fragment.appendChild(row);
        }

        table.appendChild(fragment);
	}

	//TODO add methods, fields and properties
}

var board = new Board(16, 30);
board.createBoard();