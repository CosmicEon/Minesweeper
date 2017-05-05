import { load } from '../templates.js';

function help() {
    // let mainContainer = document.getElementById('table');
    let $mainContainer = $('#table');

    load('help')
        .then(template => {
            $mainContainer.html(template);
        });
}

export { help };