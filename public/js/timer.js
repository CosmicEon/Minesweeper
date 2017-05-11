class Timer{
	constructor() {
		this._minutes = 0;
		this._seconds = 0;
		this._timeOut = null;
		this.element = document.getElementById('timer');
	}

	get minutes(){
		return this._minutes;
	}

	get seconds(){
		return this._seconds;
	}

	get timeOut(){
		return this._timeOut;
	}

	set minutes(value){
		if(value < 0){
			throw "Invalid minutes!";
		}
			
		this._minutes=value;
	}

	set seconds(value){
		if(value < 0){
			throw "Invalid seconds!";
		}
			
		this._seconds=value;
	}

	set timeOut(value){
		this._timeOut = value;
	}

	startTimer(){
		if(this.seconds < 10 && this.minutes < 10){
			this.element.innerHTML = '0' + this.minutes.toString() + ':0' + this.seconds.toString();
		}else if(this.seconds < 10 && this.minutes >= 10){
			this.element.innerHTML = this.minutes.toString() + ':0' + this.seconds.toString();
		}else if(this.seconds >= 10 && this.minutes < 10){
			this.element.innerHTML = '0' + this.minutes.toString() + ':' + this.seconds.toString();
		}else{
			this.element.innerHTML = this.minutes.toString() + ':' + this.seconds.toString();
		}

		this.seconds++;
		if(this.seconds == 60){
			this.minutes++;
			this.seconds = 0;
		}
	}

	stopTimer(){
		this.minutes = 0;
		this.seconds = 0;
		this.element.innerHTML = '00:00';
	}

}

export {Timer};