//see if class is necessary,or just functoins
//depends if we set attributes to buttons
class Bomb {
    constructor(coordX, coordY) {
        this._x = coordX;
        this.y = coordY;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }
}

let arrayOfBombs = [];

function generateBombs(array, numberOfBombs) {
    let arrayOfBombs= [];
    for (var i = 0; i < numberOfBombs; i++) {
        let index = Math.floor(Math.random() * array.length);
        let bomb = array[index];
        arrayOfBombs.push(bomb);
        array.splice(index, 1);


    }
    return arrayOfBombs;


}
export {generateBombs};