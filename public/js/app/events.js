class Events {
    constructor() {
        let timer = null;
    }


    startTimer(element) {
        let time = 0;

        this.timer = setInterval(function () {
            ++time;
            element.innerHTML = time;
        }, 1000);
    }

    stopTimer(element) {
        clearInterval(this.timer);
        element.innerHTML = 0;
    }

    switchElementsVisibility(hideElementId, unhideElementId) {
        let $hide = $(hideElementId);
        let $unhide = $(unhideElementId);

        $hide.addClass('hidden');
        $unhide.removeClass('hidden');
    }
}

export { Events };