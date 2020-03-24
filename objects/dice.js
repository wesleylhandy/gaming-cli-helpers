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

  displayRollResults = rolls => {
    process.stdout.cursorTo(0, this.dice.length * DICE_DISPLAY_ROW_HEIGHT);
    console.log("----------");
    console.log(
      "Total Roll: ",
      rolls.reduce((roll, die) => (roll += die), 0)
    );
    console.log("----------");
    console.log("");
  }

  rollDice = async () => {
    let promises = [];
    console.clear();
    for (let i = 0; i < this.dice.length; i++) {
      promises.push(this.dice[i].rollDie(i));
    }
    try {
      const results = await Promise.all(promises);
      this.displayRollResults(results);
      return true

    } catch (err) {
      throw new Error(err)
    }
  };
}

module.exports = Dice;
