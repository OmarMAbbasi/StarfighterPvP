// const Util = require('../utils/')

class MovingObject {
    constructor(pos, vel, size) {
        this.pos = pos;
        this.vel = vel;
        this.size = size;
    }

    checkCollision(other) {
        const ctrPointDist = Util.dist(this.pos, other.pos);
    }

    applyPowerups(powerups) {

    }

    move() {

    }
}

module.exports = MovingObject;