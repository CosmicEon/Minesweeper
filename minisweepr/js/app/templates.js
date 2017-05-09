import 'jquery';
import Handlebars from 'handlebars';

const cachedObj = {};

function load(templateName) {
    const url = `templates/${templateName}.handlebars`;

    if (cachedObj.hasOwnProperty(templateName)) {
        return Promise.resolve(cachedObj[templateName]);
    }

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            success: function (res) {

                resolve(res);
            },
            error: function (err) {
                reject(err);
            }
        });
    })
        .then(template => {
            const compiledTemplate = Handlebars.compile(template);
            cachedObj[templateName] = compiledTemplate;
            return Promise.resolve(compiledTemplate);
        });
}




export { load };