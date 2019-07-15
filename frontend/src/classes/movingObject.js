const Util = require("../utils/game_util");
const redShip = require('../style/images/redshipfire.png')

class MovingObject {
	constructor(pos, vel, size) {
		//* {x: 0, y:0}
		this.pos = pos;
		//*{x: 0, y: 0}
		this.vel = vel;
		this.size = size;
	}

	checkCollision(other) {
		const ctrPointDist = Util.dist(this.pos, other.pos);
		return ctrPointDist < this.size + other.size;
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

		ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI, true);
		// ctx.arc(this.pos[0], this.pos[1], this.size, 0, 2 * Math.PI, true);
		ctx.fill();
		let img = new Image();
		img.onload = () => (
			ctx.drawImage(img, this.pos.x-17, this.pos.y-17, 35, 35)
		);
		img.src = redShip;
	}
}

module.exports = MovingObject;
