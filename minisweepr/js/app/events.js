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

	findZoneByEvent(event) {
		let x = event.target.getAttribute('x');
		let y = event.target.getAttribute('y');
		return this.board.zones[y][x];
	}

	decreaseLeftMineCount() {
		this.leftMineCount--;
		this.elements.mine.textContent = this.leftMineCount;
	}

	increaseLeftMineCount() {
		this.leftMineCount++;
		this.elements.mine.textContent = this.leftMineCount;
	}

	//TODO add methods, fields and properties
}

export { Events };