class Events {
	constructor() {
		let timer = null;
	}


	startTimer(element) {
		let time = 0;
		let timerContainer = document.getElementById(element).childNodes[1];

		this.timer = setInterval(function () {
			++time;
			timerContainer.innerHTML = time;
		}, 1000);
	}

	stopTimer() {
		clearInterval(this.timer);
	}

	openHighScoreMenu(buttonId, inputId) {
		let $button = $(buttonId);
		let $input = $(inputId);

		$button.addClass('hidden');
		$input.removeClass('hidden');
	}

	closeHighScoreMenu(buttonId, inputId) {
		let $button = $(buttonId);
		let $input = $(inputId);

		$input.addClass('hidden');
		$button.removeClass('hidden');
	}
}

export { Events };