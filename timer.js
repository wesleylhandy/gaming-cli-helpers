class Timer {
  constructor(endTime) {
    if (!this instanceof Timer) {
      return new Timer(endTime);
    }
    this.endTime = endTime || 60;
    this.counter = 0;
    this.displayTime();
  }
  tick = () => {
    if (this.counter == this.endTime) {
      return;
    }

    this.counter++;
    this.displayTime();

    setTimeout(this.tick, 1000);
  };
  run = () => {
    setTimeout(this.tick, 1000);
  };
  convertTime = () => {
    const timeRemaining = this.endTime - this.counter;
    const seconds = timeRemaining % 60;
    const minutes =
      timeRemaining >= 60 ? Math.floor((timeRemaining - seconds) / 60) : 0;
    const hours =
      timeRemaining >= 3600 ? Math.floor((timeRemaining - seconds) / 3600) : 0;
    return `${hours}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
  };

  displayTime = () => {
    console.clear();
    console.log("");
    console.log("---------");
    console.log("Time: ", this.convertTime());
    console.log("---------");
    console.log("");
  };
}

module.exports = Timer;
