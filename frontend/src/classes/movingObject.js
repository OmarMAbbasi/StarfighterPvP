import Util from "../utils/game_util";

import { WIDTH, HEIGHT } from "./constants";

class MovingObject {
	constructor(pos, vel, radius) {
		this.radius = radius ? radius : this.randomRadius(20, 40);
		this.vel = vel ? vel : this.randomVelocity(10, 20);
		this.pos = pos ? pos : this.randomPosition(this.radius);
	}

	checkCollision(other) {
		const ctrPointDist = Util.dist(this.pos, other.pos);
		return ctrPointDist < this.radius + other.radius;
	}

	applyPowerups(powerups) {}

	move(deltaTime) {
		// increment position by time-scaled velocity
		this.pos.x += this.vel.x * deltaTime;
		this.pos.y += this.vel.y * deltaTime;

		// check if offscreen
		this.screenWrap();
	}

	screenWrap() {
		if (this.pos.x > WIDTH + this.radius) {
			this.pos.x = -this.radius;
		} else if (this.pos.x < -this.radius) {
			this.pos.x = WIDTH + this.radius;
		}

		if (this.pos.y > HEIGHT + this.radius) {
			this.pos.y = -this.radius;
			this.pos.y = HEIGHT + this.radius;
		}
	}

	draw(ctx) {
		ctx.fillStyle = "#00FF00";

		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, true);
		ctx.fill();
	}

	randomPosition(radius) {
		let x, y;

		if (this.randomDirection === 1) {
			if (this.vel.x > 0) {
				x = -radius;
			} else {
				x = WIDTH + radius;
			}
			y = Math.floor(Math.random() * HEIGHT);
		} else {
			if (this.vel.y > 0) {
				y = -radius;
			} else {
				y = HEIGHT + radius;
			}
			x = Math.floor(Math.random() * WIDTH);
		}

		return { x, y };
	}

	randomVelocity(min, max) {
		const x =
			Math.floor(Math.random() * (max - min) + min) * this.randomDirection();
		const y =
			Math.floor(Math.random() * (max - min) + min) * this.randomDirection();
		return { x, y };
	}

	randomDirection() {
		return Math.random() * 2 > 1 ? 1 : -1;
	}

	randomRadius(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	randomRotation() {
		let rads = Math.random() * Math.PI * 2;
		return { x: Math.cos(rads), y: Math.sin(rads) };
	}
}

export default MovingObject;
