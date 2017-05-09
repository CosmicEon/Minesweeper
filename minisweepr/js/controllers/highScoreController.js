import {load} from '../app/templates.js';

function highScore() {
    let $mainContainer = $('#tbl-container');
    let $tableContainer = $('#table');

    let context = {};
    let i = 0,
        sKey;
    for (; sKey = window.localStorage.key(i); i++) {
        context[sKey] = window.localStorage.getItem(sKey);
    }
   

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
