const program = require("commander");
const Timer = require("./objects/timer");

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

const convertToSeconds = (hours, minutes, seconds) => {
  let convertedTime = 0;
  if (seconds !== undefined) {
    convertedTime += seconds;
  }
  if (minutes !== undefined) {
    convertedTime += minutes * 60;
  }
  if (hours !== undefined) {
    convertedTime += hours * 3600;
  }
  return convertedTime
}

const __MAIN__ = () => {
  console.clear();
  const { seconds, minutes, hours } = program;
  const timer = new Timer(convertToSeconds(hours, minutes, seconds));
  
  timer.run();
};

__MAIN__();
