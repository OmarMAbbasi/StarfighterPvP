const MovingObject = require("./movingObject");
const Bullet = require("./bullet");
const Hazard = require("./hazard");

const PLAYER_RADIUS = 11;
const PLAYER_SPEED = 100;
const ROTATE_SPEED = 90;

class Player extends MovingObject {
	constructor(pos, id, dir) {
		super(pos, { x: 0, y: 0 }, PLAYER_RADIUS);
		this.id = id;
		this.health = 100;
		this.totalScore = 0;
		this.score = 0;
		this.points = 1000;
		this.inputs = {};
		this.dir = dir;
		this.speed = 0;
	}

	collideWith(obj) {
		if (this.isCollidedWith(obj)) {
			if (obj instanceof Player || obj instanceof Hazard) {
				this.takeDamage(100);
				obj.takeDamage(100);
			} else if (obj instanceof Bullet) {
				this.takeDamage(obj.damage);
			}
		}
	}

	addScore(points) {
		this.score += points;
		this.totalScore += points;
	}

	takeDamage(damage) {
		this.health -= damage;
	}

	shoot() {}

	setInputs(inputs) {
        console.log(inputs);
		this.inputs = inputs;
		if (inputs.w) {
			this.speed = PLAYER_SPEED;
		} else {
			this.speed = 0;
		}
	}

	move(deltaTime) {
		// rotate player
		this.rotate(deltaTime);
		this.pos.x += this.dir.x * this.speed * deltaTime;
		this.pos.y += this.dir.y * this.speed * deltaTime;
        console.log(this.pos);
		// check if offscreen
		this.screenWrap();
	}

	rotate(deltaTime) {
		let dir = 0;

		// check inputs for rotate direction
		if (this.inputs.a && this.inputs.d) {
			dir = 0;
		} else if (this.inputs.a) {
			dir = -1;
		} else if (this.inputs.d) {
			dir = 1;
		}

		this.rotateVector([this.dir.x, this.dir.y], dir * ROTATE_SPEED * deltaTime);
	}

	rotateVector(vec, ang) {
        console.log(vec);
		ang = -ang * (Math.PI / 180);
		var cos = Math.cos(ang);
		var sin = Math.sin(ang);
		this.dir.x = Math.round(10000 * (vec[0] * cos - vec[1] * sin)) / 10000;
		this.dir.y = Math.round(10000 * (vec[0] * sin + vec[1] * cos)) / 10000;
	}
}

module.exports = Player;
