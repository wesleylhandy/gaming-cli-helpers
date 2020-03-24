const Player = require("./player");

class Team {
  constructor(teammates, teamName) {
    if (!this instanceof Team) {
      return new Team(teammates, teamName);
    }
    this.teammates = teammates;
    this.teamName = teamName;
    this.totalScore = 0;
    this.roundBid = 0;
    this.roundActual = 0;
    this.sandbags = 0;
  }

  setRoundBid = bid => (this.roundBid = bid);

  setRoundActual = score => (this.roundActual = score);

  sandbagged = bags => {
    this.sandbags += bags;
    if (this.sandbags < 10) {
      return false;
    } else {
      this.sandbags %= 10;
      return true;
    }
  };

  getTotalScore = () => this.totalScore;

  increaseTotalScore = addend => (this.totalScore += addend);

  decreaseTotalScore = subtrahend => (this.totalScore -= subtrahend);

  isSet = () => this.roundActual < this.roundBid;
}

module.export = Team;
