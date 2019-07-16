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

		// create players array with host POJO
		// this.players = [new Player(START_LOCS[0].pos, hostId, START_LOCS[0].dir)];
		this.players = {};

		// create hazards array
		this.hazards = [];

		// create empty bullets array
		this.bullets = [];

		this.playerSockets = {};
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

		Object.values(this.players).forEach(player => {
			if (player.shooting) {
				this.bullets.push(player.shoot());
				console.log(player.shoot());
			}
		});
		// move all objects
		allObjects.forEach(hazard => hazard.move(deltaTime));

		// update clients with new positions
		Object.values(this.playerSockets).forEach(socket => {
			// emit game state to client
			socket.emit("newPosition", { players: Object.values(this.players) });
		});
		// console.log(this.bullets);
	}

	selectPowerups() {}

	gameOver() {}

	addPlayer(playerId, socket, playerTag) {
		if (this.players.length === 4) {
			return null;
		};
		
		let playerParams = START_LOCS[Object.keys(this.players).length];
		let player = new Player(playerParams.pos, playerId, playerParams.dir);
		player.playerTag = playerTag;
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
