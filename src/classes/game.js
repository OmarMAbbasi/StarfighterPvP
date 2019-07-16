const Player = require("./player");
const Hazard = require("./hazard");
const Constants = require("./constants");

const FPS = 60;
const HAZARD_COUNT = 15;
const NUM_ROUNDS = 5;
const ROUND_LENGTH = 30;
const START_LOCS = [
	{ pos: { x: 200, y: 150 }, dir: { x: 1, y: 0 } },
	{ pos: { x: 1400, y: 600 }, dir: { x: -1, y: 0 } },
	{ pos: { x: 200, y: 600 }, dir: { x: 1, y: 0 } },
	{ pos: { x: 1400, y: 150 }, dir: { x: -1, y: 0 } }
];

class Game {
    constructor(gameId, hostId, numRounds = NUM_ROUNDS, roundLength = ROUND_LENGTH) {
        // set game parameters
        this.rounds = numRounds;
        this.roundLength = roundLength;

        // set game host
        this.hostId = hostId;

        // create players array with host POJO
        // this.players = [new Player(START_LOCS[0].pos, hostId, START_LOCS[0].dir)];
        this.players = {};

        // create hazards array
        this.hazards = [];

        // create empty bullets array
        this.bullets = [];

        this.playerSockets = {};

        this.timer = 0;
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

	appyPowerups() { }

    update() {
        // calculate time since last update
        const deltaTime = (Date.now() - this.lastUpdate) / 1000;
        // decrease time remaining in round
        this.timer -= deltaTime;

        let allObjects = this.allObjects();

        Object.values(this.players).forEach(player => {
            let bullets = player.shoot(deltaTime);
            if (bullets) {
                console.log(bullets);
                this.bullets = this.bullets.concat(bullets);
            }
        });
        // move all objects
        allObjects.forEach(obj => obj.move(deltaTime));

        // check collisions
		Object.values(this.players).forEach(player => {
			this.hazards.concat(this.bullets).forEach(obj2 => {
				player.collideWith(obj2);
			});
		});

        // update clients with new positions
        Object.values(this.playerSockets).forEach(socket => {
            // emit game state to client
            socket.emit("newPosition", {
                players: Object.values(this.players),
                hazards: this.hazards,
                bullets: this.bullets,
                score: this.players[socket.id].score,
                timer: this.timer,
                rounds: this.rounds
            });
        });
        // console.log(this.bullets);
    }

    removeObject(obj) {
        if (obj instanceof Bullet) {
            this.bullets.splice(this.bullets.indexOf(obj), 1);
        } else if (obj instanceof Hazard) {
            this.hazards.splice(this.hazards.indexOf(obj), 1);
        }
    }

    selectPowerups() {}

    gameOver() {}

    addPlayer(playerId, socket, playerTag, gameId) {
        if (this.players.length === 4) {
            return null;
        };

        let playerParams = START_LOCS[Object.keys(this.players).length];
        let player = new Player(playerParams.pos, playerId, playerParams.dir);
        player.playerTag = playerTag;
        player.gameId = gameId;
        this.players[playerId] = player;
        this.playerSockets[playerId] = socket;
        return player;
    }

    removePlayer(playerId) {
        delete this.players[playerId];
        delete this.playerSockets[playerId];
    }

    populateHazards() {
        this.hazards = [];
        for (let i = 0; i < HAZARD_COUNT; i++) {
            const hazard = new Hazard();
            this.hazards.push(hazard);
        }
        console.log(this.hazards.length);
    }

    initRound() {
        this.populateHazards();
        this.bullets = [];
        this.timer = this.roundLength;
    }

    allObjects() {
        return [].concat(Object.values(this.players), this.hazards, this.bullets);
    }
}

module.exports = Game;