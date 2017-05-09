import Handlebars from 'handlebars';
import { loadTemplate } from '../app/templates.js';
import { Utilities } from '../app/utilities.js';


function highScore() {
    let $mainContainer = $('#tbl-container');
    let $tableContainer = $('#table');
<<<<<<< HEAD
    let storage = new Utilities();

    let allScores = storage.getAllLocalStorage();
  
    loadTemplate('high-score')
        .then(html => {
            const compiledTemplate = Handlebars.compile(html);
            $tableContainer.html(compiledTemplate(allScores));
=======




    load('high-score')
        .then(template => {
            console.log(template);
            $mainContainer.addClass('col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2');
            $tableContainer
                .addClass('table-styles')
                .html(template);
>>>>>>> da44c924d2fdb1988349d7b0e9f093e395ad0674
        });
}

export { highScore };