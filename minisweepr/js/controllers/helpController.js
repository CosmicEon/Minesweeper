import { loadTemplate } from '../app/templates.js';
import Handlebars from 'handlebars';


function help() {
    // let mainContainer = document.getElementById('table');
    let $mainContainer = $('#tbl-container');
    let $tableContainer = $('#table');

    loadTemplate('help')
        .then(template => {
            const compiledTemplate = Handlebars.compile(template);
            return Promise.resolve(compiledTemplate);
        })
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