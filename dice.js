const Die = require("./die");

class Dice {
  constructor(numDice = 2, sides = 6, varyingSides = []) {
    if (!this instanceof Dice) {
      return new Dice(numDice, sides, varyingSides);
    }
    this.numDice = varyingSides.length ? varyingSides.length : numDice;
    this.sides = sides;
    this.dice = [];
    this.addDice(varyingSides.map(side => parseInt(side)));
  }

  addDice = varyingSides => {
    for (let i = 0; i < this.numDice; i++) {
      this.addDie(varyingSides[i]);
    }
  };

  addDie = sides => {
    const die = new Die(sides ? sides : this.sides);
    this.dice.push(die);
  };

  rollDice = async () => {
    let promises = [];
    console.clear();
    // const newLines = this.dice.length * 6 + 5
    // for (let lines = 0; lines < newLines; lines ++) {
    //   console.log("");
    // }
    // process.stdout.moveCursor(0, newLines * -1);
    for (let i = 0; i < this.dice.length; i++) {
      promises.push(this.dice[i].rollDie(i));
    }
    try {
      const results = await Promise.all(promises);
      process.stdout.cursorTo(0, this.dice.length * 6);
      console.log("----------");
      console.log(
        "Total Roll: ",
        results.reduce((roll, die) => (roll += die), 0)
      );
      console.log("----------");
      console.log("");
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = Dice;
