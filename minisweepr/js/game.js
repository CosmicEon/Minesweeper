
function winner(arrayOfBombs) {


    if (checkCorrectFlag) {

        alert('winner winner chicken dinner');
        showBomb(arrayOfBombs);

    }
    else {
        return;
    }
}
function gameOver(arrayOfBombs) {
    showBomb(arrayOfBombs);
    checkCorrectFlag();
    alert("Game Over");
    $('.field').off();//stops the event handlers


}

function checkCorrectFlag() {
    let markedAsBombFiled = $('.field.flag');
    let isCorrect = true;
    for (var i = 0; i < markedAsBombFiled.length; i++) {
        if (!markedAsBombFiled[i].bomb) {

            $(markedAsBombFiled[i]).css('color','yellow');
            markedAsBombFiled[i].value = 'X';
            isCorrect = false;
        }
    }
    return isCorrect;
}
function showBomb(arrayOfBombs) {
    for (let i = 0; i < arrayOfBombs.length; i++) {
        $(arrayOfBombs[i]).addClass('bomb');//not jquery object to use addClass

    }
}

function checkAllFieldAreOpen() {
    let allFields = $('.field');
    let isCorrect = true;
    for (var i = 0; i < allFields.length; i++) {
        if (allFields[i].isClicked) {

            isCorrect = true;
        }
        else {
            isCorrect = false
        }
    }
    return isCorrect;

}

export {winner,gameOver,checkAllFieldAreOpen};