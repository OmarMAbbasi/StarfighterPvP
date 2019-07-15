const Player = require('./player');
const Hazard = require('./hazard');
const Constants = require('./constants');

const FPS = 5;
const HAZARD_COUNT = 1;
const NUM_ROUNDS = 5;
const ROUND_LENGTH = 30;

class Game {
    constructor(hostId, numRounds = NUM_ROUNDS, roundLength = ROUND_LENGTH) {
        // set game parameters
        this.rounds = numRounds;
        this.roundLength = roundLength;

        // set game host
        this.hostId = hostId;

        // create players array with host player
        this.players = [new Player({ x: 0, y: 0 }, hostId, { x: 1, y: 1 })];

        // create hazards array
        this.hazards = [];

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

        this.initRound();

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
        let allObjects = this.allObjects();
        allObjects.forEach(hazard => hazard.move(deltaTime));
    }

    selectPowerups() {

    }

    gameOver() {

    }

    populateHazards() {
        this.hazards = [];
        for (let i = 0; i < HAZARD_COUNT; i++) {
        const hazard = new Hazard(100)
        this.hazards.push(hazard);
        }
    }

    initRound() {
        this.populateHazards();
        this.bullets = [];
        this.timer = this.roundLength
    }

    allObjects() {
        return [].concat(this.players, this.hazards, this.bullets);
    }
}

module.exports = Game;

new Game(5).startGame();