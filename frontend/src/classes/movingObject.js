const Util = require('../utils/game_util');

class MovingObject {
    constructor(pos, radius) {
        this.pos = pos;
        this.radius = radius;
    }

    checkCollision(other) {
        const ctrPointDist = Util.dist(this.pos, other.pos);
        return ctrPointDist < (this.radius + other.radius);
    }

    applyPowerups(powerups) {

    }

    move() {
        this.pos = [(this.pos[0] + this.vel[0]), (this.pos[1] + this.vel[1])]
    }

    draw(ctx) {
        ctx.fillStyle = '#00FF00';

        ctx.beginPath();
        ctx.arc(
            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
        );
        ctx.fill();
    }
}

module.exports = MovingObject;