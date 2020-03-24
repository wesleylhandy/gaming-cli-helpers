const chalk = require('chalk');

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

  getDisplay = (roll) => {
    const yMargin = '         ';
    const row1 = roll > 3 ? '\u2022   \u2022' : roll > 1 ? '\u2022    ' : '     ';
    const row2 = roll == 6 ? '\u2022   \u2022' : roll % 2 == 1 ? '  \u2022  ' : '     ';
    const row3 = roll > 3 ? '\u2022   \u2022' : roll > 1 ? '    \u2022' : '     ';
    return chalk.black.bold.bgWhiteBright(`${yMargin}\n  ${[row1 , row2, row3].join('  \n  ')}  \n${yMargin}\n`);
  }

  randomize = (min = 1, max) =>
    Math.floor(Math.random() * (max + 1 - min) + min);

  rollDie = i =>
    new Promise(resolve => {
      const getRollSnapshot = () => {
        const rollValue = this.randomize(1, this.sides);
        if (this.sides === 6) {
          const display = this.getDisplay(rollValue);
          process.stdout.cursorTo(0, i * 6);
          process.stdout.write(display);
        }
        if (this.counter == 0) {
          process.stdout.cursorTo(0, (i * 6) + 5);
          console.log(`${i + 1} - ${this.sides}-sided Die: ${rollValue}`);
          return resolve(rollValue);
        }
        this.counter--;
        setTimeout(getRollSnapshot, this.interval);
      };
      getRollSnapshot();
    });
}

module.exports = Die;
