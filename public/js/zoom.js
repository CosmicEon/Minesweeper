function zoomIn() {
    let currentHREf = location.hash;

    $('.field').css("width", 33);

    $('.field').css("height", 33);
    if (currentHREf.indexOf('zoom') > 0) {
        return
    }

    location.hash = currentHREf + '+zoom';
}

function zoomOut() {
    let currentHREf = location.hash;

    $('.field').css("width", 23);

    $('.field').css("height", 23);

    if (currentHREf.indexOf('zoom') < 0) {
        return
    }
    location.hash = currentHREf.slice(0, -5);
}

export{zoomIn, zoomOut}