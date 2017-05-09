import {load} from '../app/templates.js';

function highScore() {
    let $mainContainer = $('#tbl-container');
    let $tableContainer = $('#table');
    let numbers = [];

    let i = 0,
        sKey;
    for (; sKey = window.localStorage.key(i); i++) {
        let valu = window.localStorage.getItem(sKey);


        let level = valu.slice(valu.length - 2);
        let time = valu.slice(0, level.length);

        if (level == 10) {
            level = 'beginner'
        }
        else if (level == 40) {
            level = 'intermediate'
        }
        else if(level == 99) {
            level = 'expert'
        }


        let obg = {sKey, time, level};

        numbers.push(obg);


    }


    function compare(a, b) {

        if (a.level < b.level)
            return -1;
        if (a.level > b.level)
            return 1;
        return 0;
    }
    function comparebyTime(a, b) {

        if (a.level = b.level){
                   if (a.time > b.time){return -1}
            if (a.time < b.time){return 1}

        return 0;}
    }

    numbers.sort(compare);
    numbers.sort(comparebyTime);

    load('high-score')
        .then(template => {
            console.log(template);
            $mainContainer.addClass('col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2');
            $tableContainer
                .addClass('table-styles')
                .html(template(numbers));
        });

    // when location is changed, removes css classes
    $(window).on('hashchange', function () {
        $mainContainer.removeClass('col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2');
    });

}

export {highScore};
