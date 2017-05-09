import Handlebars from 'handlebars';
import { loadTemplate } from '../app/templates.js';
import { Utilities } from '../app/utilities.js';


function highScore() {
    let $mainContainer = $('#tbl-container');
    let $tableContainer = $('#table');
    let storage = new Utilities();

    let allScores = storage.getAllLocalStorage();
  
    loadTemplate('high-score')
        .then(html => {
            const compiledTemplate = Handlebars.compile(html);
            $tableContainer.html(compiledTemplate(allScores));
        });
}

export { highScore };