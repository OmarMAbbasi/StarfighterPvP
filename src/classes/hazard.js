const MovingObject = require("./movingObject");
const Bullet = require("./bullet");

class Hazard extends MovingObject {
	constructor(pos, radius) {
		super(pos, null, radius);
		this.dir = this.randomRotation();
		this.rotateSpeed = Math.random() * 60 + 30;
		this.health = 100;
	}

	move(deltaTime) {
		this.pos.x += this.vel.x * deltaTime;
		this.pos.y += this.vel.y * deltaTime;

		// check if offscreen
		this.rotate(deltaTime);
		this.screenWrap();
	}

	takeDamage(damage) {
		this.health -= damage;
	}

	rotate(deltaTime) {
		let ang = -this.rotateSpeed * (Math.PI / 180) * deltaTime;
		let vec = [this.dir.x, this.dir.y];

		var cos = Math.cos(ang);
		var sin = Math.sin(ang);

		this.dir.x = Math.round(10000 * (vec[0] * cos - vec[1] * sin)) / 10000;
		this.dir.y = Math.round(10000 * (vec[0] * sin + vec[1] * cos)) / 10000;
	}
}

module.exports = Hazard;
