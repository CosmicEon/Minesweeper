import { load } from '../app/templates.js';
import { Utilities } from '../app/utilities.js';

function highScore() {
    let $mainContainer = $('#tbl-container');
    let $tableContainer = $('#table');
    let storage = new Utilities();
    let allData = storage.allStorage();

    load('high-score')
        .then(allData => {
            $mainContainer.addClass('col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2');
            $tableContainer
                .addClass('table-styles')
                .html(allData);
        });

    // when location is changed, removes css classes
    $(window).on('hashchange', function () {
        $mainContainer.removeClass('col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2');
    });

}

export { highScore };