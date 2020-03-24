const program = require("commander");
const inquirer = require('inquirer')
const Dice = require("./objects/dice");

program.version(process.env.npm_package_version || "0.1.0");

const myParseInt = (value, dummyPrevious) => parseInt(value);

const commaSeparatedList = (value, dummyPrevious) => value.split(",");

program
  .option("-d, --num-dice [number]", "Number of Dice", myParseInt)
  .option("-s, --sides [number]", "Sides for Each Dice", myParseInt)
  .option(
    "-v, --varying-sides [dice]",
    "Comma-Separated List of Dice by Number of Sides, ie. 12,20,40",
    commaSeparatedList
  );

program.on("--help", () => {
  console.log("");
  console.log("Examples:");
  console.log("  $ node roll");
  console.log(
    "      By default, the roll program will simulate rolling a pair of six-sided dice."
  );
  console.log("");
  console.log("  $ node roll -d 1");
  console.log("      The above command will roll only one 6-sided die");
  console.log("");
  console.log("  $ node roll -d 3 -s 12");
  console.log("      The above command will roll three 12-sided die");
  console.log("");
  console.log("  $ node roll -v 12,20,40");
  console.log(
    "      The above command will roll three different dice, one with 12 sides, one with 20 sides, and one with 40 sides"
  );
  console.log(
    "      You can include a list of any length to roll as many dice as you like."
  );
  console.log("");
});

program.parse(process.argv);

const __MAIN__ = () => {
  console.clear();
  const { numDice, sides, varyingSides } = program;
  const dice = new Dice(numDice, sides, varyingSides);

  const rollDice = async () => {
    try {
      const done = await dice.rollDice();
      try {
        const answers = await inquirer.prompt([{
          type: "confirm",
          name: "again",
          message: "Roll again?",
          default: true
        }]);
        if (answers.again === true) {
          rollDice();
        }
      } catch(err) { }
    } catch(err) { }
  }

  rollDice();
  
};

__MAIN__();
