import { load } from '../app/templates.js';

function help() {
    // let mainContainer = document.getElementById('table');
    let $mainContainer = $('#tbl-container');
    let $tableContainer = $('#table');

    load('help')
        .then(template => {
            $mainContainer.addClass('col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2');
            $tableContainer
                .addClass('table-styles')
                .html(template);
        });

    // when location is changed, removes css classes
    $(window).on('hashchange', function () {
        $mainContainer.removeClass('col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2');
    });
}

export { help };