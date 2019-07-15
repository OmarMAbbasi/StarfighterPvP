const Player = require('./player');
const Hazard = require('./hazard');
const Constants = require('./constants');

const FPS = 30;
const HAZARD_COUNT = 10;
const NUM_ROUNDS = 5;
const ROUND_LENGTH = 10;

class Game {
  constructor(hostId, numRounds = NUM_ROUNDS, roundLength = ROUND_LENGTH) {
    // set game parameters
    this.rounds = numRounds;
    this.roundLength = roundLength;

    // set game host
    this.hostId = hostId;

    // create players array with host player
    this.players = [new Player({x: 0, y: 0}, hostId)];

    // create hazards array and populate with initial hazards
    this.hazards = [];
    for (let i = 0; i < HAZARD_COUNT; i++) {
      const hazard = new Hazard(100)
      this.hazards.push(hazard);
      console.log(hazard)
    }

    // create empty bullets array
    this.bullets = [];
  }

  async startGame() {
    console.log("Starting game");
    while (this.rounds > 0) {
      await this.playRound();
      this.rounds--;
    }
    this.gameOver();
  }

  async playRound() {
    console.log(`Round ${this.rounds}`);
    const sleep = ms => new Promise(res => setTimeout(res, ms));

    this.timer = this.roundLength

    this.lastUpdate = Date.now();
    while (this.timer > 0) {
      this.update();
      this.lastUpdate = Date.now();
      await sleep(1000 / FPS);
    }
  }

  update() {
    const deltaTime = (Date.now() - this.lastUpdate) / 1000;
    this.timer -= deltaTime;


  }

  selectPowerups() {

  }

  gameOver() {

  }
}

module.exports = Game;

new Game(5).startGame();