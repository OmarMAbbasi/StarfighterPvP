const Util = require("../utils/game_util");

class MovingObject {
	constructor(pos, vel, radius) {
		//* {x: 0, y:0}
		this.pos = pos;
		//*{x: 0, y: 0}
		this.vel = vel;
		this.radius = radius;
	}

	checkCollision(other) {
		const ctrPointDist = Util.dist(this.pos, other.pos);
		return ctrPointDist < this.radius + other.radius;
	}

	applyPowerups(powerups) {}

	move() {
		this.pos = {
			x: this.pos.x + this.vel.x,
			y: this.pos.y + this.vel.y
		};
		// this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
	}

	draw(ctx) {
		ctx.fillStyle = "#00FF00";

		ctx.beginPath();

		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, true);
		// ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
		ctx.fill();
	}
}

// module.exports = MovingObject;

export default MovingObject
