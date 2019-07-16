const MovingObject = require("./movingObject");
const Bullet = require("./bullet");
const Hazard = require("./hazard");

const PLAYER_RADIUS = 11;
let player_speed = 150;
const ROTATE_SPEED = 180;
const BULLET_SPEED = 450;
const FIRE_RATE = 3.5;

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
		this.shooting = false;
		this.lastShotDelta = 1 / FIRE_RATE;
		this.respawning = 0;
	}

	collideWith(obj) {
		if (this.respawning > 0) {
			return;
		}
		if (this.isCollidedWith(obj)) {
			if (obj instanceof Player || obj instanceof Hazard) {
					this.takeDamage(100);
					obj.takeDamage(100);
			} else if (obj instanceof Bullet && obj.playerId !== this.id) {
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
		if (this.health <= 0) {
			this.respawning = 3;	
		}
	}

	respawn() {
		this.health = 100;
		this.pos = { x: Math.random() * 1000 + 200, y: Math.random() * 400 + 200 };
	}

	shoot(deltaTime) {
		if (this.respawning > 0) {
			return;
		}
		if (this.lastShotDelta < 1 / FIRE_RATE || !this.inputs.space) {
			this.lastShotDelta += deltaTime;
			return;
		}

		let vel = { x: this.vel.x * 3, y: this.vel.y * 3 };
		let bullet = new Bullet(
			Object.assign({}, this.pos), { x: this.dir.x * BULLET_SPEED, y: this.dir.y * BULLET_SPEED},
			5,
			this.id,
			10
		);
		this.lastShotDelta = 0;
		return bullet; //console.log(input);
	}
	

	setInputs(inputs) {
		console.log(inputs);
		this.inputs = inputs;
		if (inputs.w) {
			this.speed = player_speed;
		} else {
			this.speed = 0;
		}
		this.shooting = inputs.space;
	}

	move(deltaTime) {
		if (this.respawning > 0) {
			this.respawning -= deltaTime;
			return;
		} else if (this.respawning < 0) {
			this.respawn();
			this.respawning = 0;
		}
		// rotate player
		this.rotate(deltaTime);
		this.pos.x += this.dir.x * this.speed * deltaTime;
		this.pos.y += this.dir.y * this.speed * deltaTime;
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
		ang = -ang * (Math.PI / 180);
		var cos = Math.cos(ang);
		var sin = Math.sin(ang);
		this.dir.x = Math.round(10000 * (vec[0] * cos - vec[1] * sin)) / 10000;
		this.dir.y = Math.round(10000 * (vec[0] * sin + vec[1] * cos)) / 10000;
	}
}

module.exports = Player;