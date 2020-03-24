const chalk = require('chalk');

class Die {
  constructor(sides) {
    if (!this instanceof Die) {
      return new Die(sides);
    }
    this.sides = sides;
    this.weight = 4.1;
    this.initCounter();
    this.initInterval();
    this.dot = '\u2022';
  }

  initCounter = () => {
    this.counter = this.randomize(8, 12);
  }

  initInterval = () => {
    this.interval = this.randomize(48, 96);
  }

  resetDie = () => {
    this.initCounter();
    this.initInterval();
  }

  updateRollDisplay = (roll, idx) => {
    const empty = '     ';
    const dot = this.dot;

    let row1, row2, row3;
    
    if (this.sides === 6) {
      row1 = roll > 3 ? `${dot}   ${dot}` : roll > 1 ? `${dot}    ` : '     ';
      row2 = roll == 6 ? `${dot}   ${dot}` : roll % 2 == 1 ? `  ${dot}  ` : '     ';
      row3 = roll > 3 ? `${dot}   ${dot}` : roll > 1 ? `    ${dot}` : '     ';
    } else {
      row1 = empty;
      row2 = `  ${roll}  `;
      row3 = empty;
    }
    
    process.stdout.cursorTo(0, idx * DICE_DISPLAY_ROW_HEIGHT);
    process.stdout.write(
      chalk.black.bold.bgWhiteBright(
        `  ${empty}  \n  ${[row1 , row2, row3].join('  \n  ')}  \n  ${empty}  \n`
      )
    );
  }

  displayFinalValue = (roll, idx) => {
    process.stdout.cursorTo(0, (idx * DICE_DISPLAY_ROW_HEIGHT) + DICE_ROW_HEIGHT);
    console.log(`${this.sides}-sided Die: ${roll}`);
    console.log("");
  }

  randomize = (min = 1, max) =>
    Math.floor(Math.random() * (max + 1 - min) + min);

  rollDie = i =>
    new Promise(resolve => {
      const getRollSnapshot = () => {
        const roll = this.randomize(1, this.sides);
        this.updateRollDisplay(roll, i);

        if (this.counter == 0) {
          this.displayFinalValue(roll, i)
          this.resetDie();

          return resolve(roll);
        }

        this.counter--;
        setTimeout(getRollSnapshot, this.interval);
      };
      getRollSnapshot();
    });
}

module.exports = Die;
