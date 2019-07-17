const MovingObject = require("./movingObject");
const Player = require("./player");
// const Hazard = require('./hazard');

class Bullet extends MovingObject {
    constructor(pos, vel, size, playerId, damage, playerObj) {
        super(pos, vel, size);
        this.playerId = playerId;
        this.damage = damage;
        this.player = playerObj;
        this.collided = false;
    }

    move(deltaTime) {
        // increment position by time-scaled velocity
        this.pos.x += this.vel.x * deltaTime;
        this.pos.y += this.vel.y * deltaTime;
        // console.log(this);
    }

    setType(type) {
        let dir = {};
        let player;
        let pos = this.pos;
        dir.x = this.vel.x;
        dir.y = this.vel.y;
        player = Player.new(pos, this.playerId, {
            x: dir.x * -1,
            y: dir.y * -1
        });
        player.bulletType("littleboypellet");
        player.shoot(1000000);
        player = Player.new(pos, this.playerId, {
            y: dir.y * -1,
            x: dir.x * -1
        });

        player.bulletType("littleboypellet");
        player.shoot(1000000);
        player = Player.new(pos, this.playerId, {
            y: dir.y,
            x: dir.x
        });
        player.bulletType("littleboypellet");
        player.shoot(1000000);
    }

    collideWith(obj) {
        if ((obj instanceof Bullet)) {
            return;
        }
        if (this.isCollidedWith(obj) && !(obj.id === this.playerId)) {
                this.collided = true;
            if ((obj.health - this.damage) <= 0) {
                console.log('add score');
                this.player.addScore(obj.points);
            }
        }
    }
}

module.exports = Bullet;