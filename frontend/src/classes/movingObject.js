const Util = require('../utils/game_util');

class MovingObject {
    constructor(pos, vel, radius) {
        this.pos = pos;
        this.vel = vel;
        this.radius = radius;
    }

    checkCollision(other) {
        const ctrPointDist = Util.dist(this.pos, other.pos);
        return ctrPointDist < (this.radius + other.radius);
    }

    applyPowerups(powerups) {

    }

    move() {

    }
}

module.exports = MovingObject;