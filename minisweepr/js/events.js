class Events {
	constructor() {
		this.timer = null;

	}

	startTimer() {
		time = 0;
		const elTimer = document.getElementById('game-time');

		this.timer = setInterval(function () {
			++time;
			elTimer.innerHTML = time;
		}, 1000);
	}

	stopTimer() {
		clearInterval(timer);
	}

	listen() {
		this.elements.restartButton.addEventListener('click', this.restartClickHandler.bind(this));
		this.elements.level.addEventListener('change', this.levelChangeHandler.bind(this));
		this.board.element.addEventListener('click', this.leftClickHandler.bind(this));
		this.board.element.addEventListener('contextmenu', this.rightClickHandler.bind(this));
	}

	restartClickHandler() {
		this.init();
	}

	levelChangeHandler(event) {
		this.setLevel(event.target.value);
		this.init();
	}

	leftClickHandler(event) {
		if (this.isGameOver || !event.target.classList.contains('zone')) {
			return;
		}

		let zone = this.findZoneByEvent(event);

		if (this.time == 0) {
			this.startTimer();
		}

		if (zone.isFlagged) {
			return;
		}

		if (zone.isMine) {
			zone.element.classList.add('is-clicked');
			return this.gameover();
		}

		zone.reveal();

		if (zone.isEmpty) {
			this.board.revealZoneNeighbors(zone);
		}

		if (this.isWin()) {
			return this.gameover(true);
		}
	}

	rightClickHandler(event) {
		event.preventDefault();

		if (this.isGameOver || !event.target.classList.contains('zone')) {
			return;
		}

		let zone = this.findZoneByEvent(event);

		if (zone.isFlagged) {
			this.increaseLeftMineCount();
			zone.setUnflagged();
		} else {
			this.decreaseLeftMineCount();
			zone.setFlagged();
		}
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