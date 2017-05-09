import {load} from '../app/templates.js';

function highScore() {
    let $mainContainer = $('#tbl-container');
    let $tableContainer = $('#table');

    let context = [];
    let i = 0,
        sKey;
    for (; sKey = window.localStorage.key(i); i++) {
        let valu = window.localStorage.getItem(sKey);
        context.push({sKey,valu});
    }
    console.log(context)

    function compare(a,b) {
        if (a.valu < b.valu)
            return -1;
        if (a.valu > b.valu)
            return 1;
        return 0;
    }

context.sort(compare);


    load('high-score')
        .then(template => {
            console.log(template);
            $mainContainer.addClass('col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2');
            $tableContainer
                .addClass('table-styles')
                .html(template(context));
        });

    // when location is changed, removes css classes
    $(window).on('hashchange', function () {
        $mainContainer.removeClass('col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2');
    });

}

export {highScore};
