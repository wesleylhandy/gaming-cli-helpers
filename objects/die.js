const chalk = require('chalk');

class Die {
  constructor(sides) {
    if (!this instanceof Die) {
      return new Die(sides);
    }
    this.sides = sides;
    this.weight = 4.1;
    this.initCounter();
    this.initInterval()
  }

  initCounter = () => {
    this.counter = this.randomize(8, 12);
  }

  initInterval = () => {
    this.interval = this.randomize(48, 96);
  }

  getDisplay = (roll) => {
    const empty = '     ';
    let row1, row2, row3;
    if (this.sides === 6) {
      row1 = roll > 3 ? '\u2022   \u2022' : roll > 1 ? '\u2022    ' : '     ';
      row2 = roll == 6 ? '\u2022   \u2022' : roll % 2 == 1 ? '  \u2022  ' : '     ';
      row3 = roll > 3 ? '\u2022   \u2022' : roll > 1 ? '    \u2022' : '     ';
    } else {
      row1 = empty;
      row2 = `  ${roll}  `;
      row3 = empty;
    }
    return chalk.black.bold.bgWhiteBright(`  ${empty}  \n  ${[row1 , row2, row3].join('  \n  ')}  \n  ${empty}  \n`);
  }

  randomize = (min = 1, max) =>
    Math.floor(Math.random() * (max + 1 - min) + min);

  rollDie = i =>
    new Promise(resolve => {
      const getRollSnapshot = () => {
        const rollValue = this.randomize(1, this.sides);
        const display = this.getDisplay(rollValue);
        process.stdout.cursorTo(0, i * 7);
        process.stdout.write(display);

        if (this.counter == 0) {
          process.stdout.cursorTo(0, (i * 7) + 5);
          console.log(`${this.sides}-sided Die: ${rollValue}`);
          console.log("");
          this.initCounter();
          this.initInterval();
          return resolve(rollValue);
        }
        this.counter--;
        setTimeout(getRollSnapshot, this.interval);
      };
      getRollSnapshot();
    });
}

module.exports = Die;
