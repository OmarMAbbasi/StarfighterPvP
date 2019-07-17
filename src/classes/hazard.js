const MovingObject = require("./movingObject");
const Bullet = require("./bullet");
const Ship = require("./player");

class Hazard extends MovingObject {
	constructor(pos, radius) {
		super(pos, null, radius);
		this.dir = this.randomRotation();
		this.rotateSpeed = Math.random() * 60 + 30;
		this.health = 100;
		this.respawning = 0;
		this.points = 100;
	}

	respawn() {
		this.health = 100;
		this.radius = this.randomRadius(20, 35);
		this.vel = this.randomVelocity(75, 150);
		this.pos = this.randomPosition(this.radius);
	}

	collideWith(obj) {
		if (this.respawning > 0) {
			return;
		}
		if (obj instanceof Hazard) {
			return;
		}
		if (this.isCollidedWith(obj)) {
			if (obj instanceof Bullet && obj.playerId !== this.id) {
				this.takeDamage(obj.damage);
			} else {
				this.takeDamage(100);
			}
		}
	}

	move(deltaTime) {
		if (this.respawning > 0) {
			this.respawning -= deltaTime;
			return;
		} else if (this.respawning < 0) {
			this.respawn();
			this.respawning = 0;
		}
		this.pos.x += this.vel.x * deltaTime;
		this.pos.y += this.vel.y * deltaTime;

		// check if offscreen
		this.rotate(deltaTime);
		this.screenWrap();
	}

	takeDamage(damage) {
		this.health -= damage;

		if (this.health <= 0) {
			this.respawning = .5;
		}
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
