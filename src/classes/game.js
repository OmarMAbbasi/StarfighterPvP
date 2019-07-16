const Player = require("./player");
const Hazard = require("./hazard");
const Constants = require("./constants");

const FPS = 60;
const HAZARD_COUNT = 1;
const NUM_ROUNDS = 5;
const ROUND_LENGTH = 30;
const START_LOCS = [
    { pos: { x: 200, y: 200 }, dir: { x: 1, y: 0 } },
    { pos: { x: 1400, y: 700 }, dir: { x: -1, y: 0 } },
    { pos: { x: 200, y: 700 }, dir: { x: 1, y: 0 } },
    { pos: { x: 1400, y: 200 }, dir: { x: -1, y: 0 } }
];

class Game {
    constructor(hostId, numRounds = NUM_ROUNDS, roundLength = ROUND_LENGTH) {
        // set game parameters
        this.rounds = numRounds;
        this.roundLength = roundLength;

        // set game host
        this.hostId = hostId;

        // create players array with host player
        // this.players = [new Player(START_LOCS[0].pos, hostId, START_LOCS[0].dir)];
        this.players = [];

        // create hazards array
        this.hazards = [];

        // create empty bullets array
        this.bullets = [];

        this.playerSockets = [];
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
        // calculate time since last update
        const deltaTime = (Date.now() - this.lastUpdate) / 1000;
        // decrease time remaining in round
        // this.timer -= deltaTime;

        let allObjects = this.allObjects();

        // move all objects
        allObjects.forEach(hazard => hazard.move(deltaTime));

        // update clients with new positions
        this.playerSockets.forEach(socket => {
            // emit game state to client
            socket.emit('newPosition', {players: this.players});
        });
    }

    selectPowerups() {}

    gameOver() {}

    addPlayer(playerId, socket) {
        let playerParams = START_LOCS[this.players.length];
        let player = new Player(playerParams.pos, playerId, playerParams.dir);
        this.players.push(player);
        this.playerSockets.push(socket);
        return player;
    }

    populateHazards() {
        this.hazards = [];
        for (let i = 0; i < HAZARD_COUNT; i++) {
            // const hazard = new Hazard({ x: 300, y: 300 }, 40);
            const hazard = new Hazard();
            this.hazards.push(hazard);
        }
    }

    initRound() {
        this.populateHazards();
        this.bullets = [];
        this.timer = this.roundLength;
    }

    allObjects() {
        return [].concat(this.players, this.hazards, this.bullets);
    }
}

module.exports = Game;