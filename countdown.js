const program = require("commander");
const Timer = require("./timer");

program.version(process.env.npm_package_version || "0.1.0");

const myParseInt = (value, dummyPrevious) => parseInt(value);

program
  .option("-s, --seconds [number]", "Seconds to CountDown", myParseInt)
  .option("-m, --minutes [number]", "Minutes to CountDown", myParseInt)
  .option("-h, --hours [number]", "Hours to CountDown", myParseInt);

const helpCB = () => {
  console.log("");
  console.log("Examples:");
  console.log("  $ node countdown");
  console.log(
    "      By default, the countdown program will create a countdown timer for 60 seconds."
  );
  console.log("");
  console.log("  $ node countdown -s 30");
  console.log("      The above command will countdown from 30 seconds");
  console.log("");
  console.log("  $ node countdown -m 5");
  console.log("      The above command will countdown from 5 minutes");
  console.log("");
  console.log("  $ node countdown -h 1");
  console.log("      The above command will countdown from 1 hours");
  console.log("  $ node countdown -h 1 -m 45 -s 30");
  console.log(
    "      The above command will countdown from 1 hour, 45 minutes, and 30 seconds"
  );
  console.log("");
};

program.on("--help", helpCB);
program.on("-e", helpCB);

program.helpOption("-e, --HELP", "output usage information");
program.parse(process.argv);

const __MAIN__ = () => {
  console.clear();
  const { seconds, minutes, hours } = program;

  let endTime = 0;
  if (seconds !== undefined) {
    endTime += seconds;
  }
  if (minutes !== undefined) {
    endTime += minutes * 60;
  }
  if (hours !== undefined) {
    endTime += hours * 3600;
  }
  const timer = new Timer(endTime);
  timer.run();
};

__MAIN__();
