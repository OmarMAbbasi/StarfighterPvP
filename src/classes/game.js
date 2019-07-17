const Player = require("./player");
const Hazard = require("./hazard");
const Constants = require("./constants");
const Bullet = require("./bullet");
const Chat = require("./chatroom");

const FPS = 60;
const HAZARD_COUNT = 15;
const NUM_ROUNDS = 5;
const ROUND_LENGTH = 30;
const START_LOCS = [
    { pos: { x: 200, y: 150 }, dir: { x: 1, y: 0 } },
    { pos: { x: 1150, y: 600 }, dir: { x: -1, y: 0 } },
    { pos: { x: 200, y: 600 }, dir: { x: 1, y: 0 } },
    { pos: { x: 1150, y: 150 }, dir: { x: -1, y: 0 } }
];
const COLORS = ["RED", "BLUE", "YELLOW", "GREEN"];

class Game {
    constructor(
        gameId,
        hostId,
        numRounds = NUM_ROUNDS,
        roundLength = ROUND_LENGTH
    ) {
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
        this.chat = new Chat();
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
        Object.values(this.players).forEach(player => {
            player.clearEffects();
        });
    }

    appyPowerups() {}

    update() {
        // calculate time since last update
        const deltaTime = (Date.now() - this.lastUpdate) / 1000;
        // decrease time remaining in round
        this.timer -= deltaTime;

        let allObjects = this.allObjects();
        // this.lastUpdate = Date.now();

        Object.values(this.players).forEach(player => {
            let bullets = player.shoot(deltaTime);
            if (bullets) {
                this.bullets = this.bullets.concat(bullets);
            }
        });
        // move all objects
        allObjects.forEach(obj => obj.move(deltaTime));

        // check collisions
        allObjects.forEach(obj1 => {
            allObjects.forEach(obj2 => {
                if (!obj1.respawning && !obj2.respawning) {
                    obj1.collideWith(obj2);
                }
            });
        });

        this.bullets.forEach(bullet => {
            if (bullet.collided) {
                this.removeObject(bullet);
            }
            if (bullet.pos.x < 0 - bullet.radius) {
                this.removeObject(bullet);
            } else if (bullet.pos.x > Constants.WIDTH + bullet.radius) {
                this.removeObject(bullet);
            }

            if (bullet.pos.y < 0 - bullet.radius) {
                this.removeObject(bullet);
            } else if (bullet.pos.y > Constants.HEIGHT + bullet.radius) {
                this.removeObject(bullet);
            }
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
        }

        let playerParams = START_LOCS[Object.keys(this.players).length];
        let player = new Player(playerParams.pos, playerId, playerParams.dir);
        player.color = COLORS.shift();
        player.playerTag = playerTag;
        player.gameId = gameId;
        this.players[playerId] = player;
        this.playerSockets[playerId] = socket;
        this.chat.joinChat(playerId, playerTag, socket);

        Object.values(this.playerSockets).forEach(socket => {
            socket.emit("playerJoin", { players: Object.values(this.players) });
        });

        return player;
    }

    updateReady() {
        Object.values(this.playerSockets).forEach(socket => {
            socket.emit("readyUpdate", { players: Object.values(this.players) });
        });
    }

    removePlayer(playerId) {
        COLORS.push(this.players[playerId].color);
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
        Object.values(this.players).forEach(player => {
            player.applyEffects();
        });

        this.timer = this.roundLength;
    }

    allObjects() {
        return [].concat(this.bullets, Object.values(this.players), this.hazards);
    }
}

module.exports = Game;