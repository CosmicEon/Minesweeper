import Handlebars from 'handlebars';
import { loadTemplate } from '../app/templates.js';
import { Utilities } from '../app/utilities.js';


function highScore() {
    let $mainContainer = $('#tbl-container');
    let $tableContainer = $('#table');
    let storage = new Utilities();

    let allScores = storage.getAllLocalStorage();
    console.log(JSON.parse(storage.getAllLocalStorage()));

    loadTemplate('high-score')
        .then(template => {
            const compiledTemplate = Handlebars.compile(template);
            $tableContainer.html(compiledTemplate(storage.getAllLocalStorage()));
            console.log(storage.getAllLocalStorage());
        })
        .then(template => {
            console.log(template);
            $mainContainer.addClass('col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2');
            $tableContainer
                .addClass('table-styles');

        });

    // when location is changed, removes css classes
    $(window).on('hashchange', function () {
        $mainContainer.removeClass('col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2');
    });

}

export { highScore };