const MovingObject = require("./movingObject");
const Player = require("./player");
// const Hazard = require('./hazard');

class Bullet extends MovingObject {
    constructor(pos, vel, size, playerId, damage) {
        super(pos, vel, size);
        this.playerId = playerId;
        this.damage = damage;
    }

    move(deltaTime) {
        // increment position by time-scaled velocity
        this.pos.x += this.vel.x * deltaTime;
        this.pos.y += this.vel.y * deltaTime;
    }

    rewardPoints(players, obj) {
        if (this.isCollidedWith(obj) && obj.health <= 0) {
            players.forEach(player => {
                if (player.id === this.playerId) {
                    player.addScore(obj.points);
                }
            });
        }
    }
}

module.exports = Bullet;