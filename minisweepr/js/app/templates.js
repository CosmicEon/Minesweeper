import 'jquery';


const cachedObj = {};

function loadTemplate(templateName) {
    const url = `templates/${templateName}.handlebars`;

    if (cachedObj.hasOwnProperty(templateName)) {
        return Promise.resolve(cachedObj[templateName]);
    }

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            success: function (html) {
                resolve(html);
            },
            error: function (err) {
                reject(err);
            }
        });
    });
}




export { loadTemplate };