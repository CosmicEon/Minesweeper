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
            $tableContainer.html(template);
        });
}

export { help };