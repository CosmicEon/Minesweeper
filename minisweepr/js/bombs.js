//see if class is necessary,or just functoins
//depends if we set attributes to buttons

class Bombs {
    constructor() {
        this.arrayOfBombs = [];
    }

    generateBombs(array, numberOfBombs) {
        for (var i = 0; i < numberOfBombs; i++) {
            let index = Math.floor(Math.random() * array.length);
            let bomb = array[index];


            if (array[index].bomb) {
                i--;
              
            } else{

                bomb.bomb=true;
                this.arrayOfBombs.push(bomb);
            }
        }

        return this.arrayOfBombs;
    }
}

export {Bombs};