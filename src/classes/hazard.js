const MovingObject = require("./movingObject");
const Bullet = require("./bullet");

class Hazard extends MovingObject {
	constructor(pos, radius) {
		super(pos, { x: 0, y: 0 }, radius);
		this.dir = this.randomRotation();
		this.rotateSpeed = Math.random() * 60 + 30;
	}

	move(deltaTime) {
		super.move(deltaTime);
		this.rotate(deltaTime);
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
