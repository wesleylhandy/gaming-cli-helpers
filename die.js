class Die {
  constructor(sides) {
    if (!this instanceof Die) {
      return new Die(sides);
    }
    this.sides = sides;
    this.counter = this.randomize(1, 20);
    this.interval = this.randomize(16, 75);
    this.weight = 4.1;
  }

  randomize = (min = 1, max) =>
    Math.floor(Math.random() * (max + 1 - min) + min);

  rollDie = i =>
    new Promise(resolve => {
      const getRollSnapshot = () => {
        if (this.counter == 0) {
          const returnVal = this.randomize(1, this.sides);
          console.log(`${i + 1} - ${this.sides}-sided Die: `, returnVal);
          return resolve(returnVal);
        }
        this.counter--;
        setTimeout(getRollSnapshot, this.interval);
      };
      getRollSnapshot();
    });
}

module.exports = Die;
