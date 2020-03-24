const Team = require("./team");
const Player = require("./player");

class Game {
  constructor(type, teams) {
    if (!this instanceof Game) {
      return new Game(type, teams);
    }
    this.type = type;
    this.teams = [];
    this.createTeams(teams);
  }

  createPlayer = name => new Player(name);

  createTeams = teams => {
    teams.array.forEach(({ teamName, players }) => {
      const teammates = players.map(this.createPlayer);
      const team = new Team(teammates, teamName);
      this.teams.push(team);
    });
  };

  setMaxScore = () => {
    let maxScore = 0;
    switch (this.type.toLowerCase()) {
      case "rook":
      case "spades":
        maxScore = 500;
        break;
      case "hearts":
        maxScore = 100;
        break;
      default:
        maxScore = 1000;
        break;
    }
    this.maxScore = maxScore;
  };

  setDealer = player => {
    this.dealer = player;
  };
}

module.exports = Game;
