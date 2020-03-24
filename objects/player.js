class Player {
  constructor(name) {
    if (!this instanceof Player) {
      return new Player(name);
    }
    this.name = name;
    this.teammate = {};
  }

  addTeammate = teammate => (this.teammate = teammate);
}

module.exports = Player;
