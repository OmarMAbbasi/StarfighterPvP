const MovingObject = require("./movingObject");
const Bullet = require("./bullet");
const Hazard = require("./hazard");

const PLAYER_RADIUS = 11;
const PLAYER_SPEED = 100;
const ROTATE_SPEED = 90;
const BULLET_SPEED = 300;

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
		this.bulletType = "normal";
	}

	setHealth(hp) {
		this.health = hp
	}

	collideWith(obj) {
		if (this.isCollidedWith(obj)) {
			console.log("im hit");
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

		if (this.health <= 0) {
			this.respawn();
		}
	}

	respawn() {
		if this.powerUps.includes('shields'){
			this.health = 200
		} else if this.powerUps
		this.health = 100;
		this.pos = { x: Math.random() * 1200 + 200, y: Math.random() * 500 + 200 };
	}

	shoot(deltaTime) {
		//* Bullet: constructor(pos, vel, size, playerId, damage)
		let bullets = [];
		let bullet;
		let powerup = this.bulletType;
		if (!"delta" && !this.bulletType === "littleBoy") {
			powerup = "noshoot";
		}
		if (this.bulletType == "uzi" && !"delta" / 2) {
			powerup = "none";
		}
		switch (powerup) {
		case "littleBoy":
			bullet = new Bullet(
				this.pos,
				[this.dir.x * BULLET_SPEED, this.dir.y * BULLET_SPEED],
				5,
				this.id,
				10
			);
			bullet.setType("littleBoy");
			bullets.push(bullet);
			break;
		case "shotgun":
			scalar = Math.sqrt(2) / 4;
			cone = Math.sqrt(2) / 2;
			for (let step = 0; step < 5; step++) {
				bullet = new Bullet(
					this.pos,
					[
						this.dir.x * BULLET_SPEED * cone,
						this.dir.y * BULLET_SPEED * cone
					],
					5,
					this.id,
					5
				);
				scalar = cone - scalar;
				bullets.push(bullet);
			}
			break;
		case "speedybullets":
			bullet = new Bullet(
				this.pos,
				[this.dir.x * BULLET_SPEED * 3, this.dir.y * BULLET_SPEED * 3],
				5,
				this.id,
				10
			);
			bullets.push(bullet);
			break;
		case "fatman":
			bullet = new Bullet(
				this.pos,
				[this.dir.x * BULLET_SPEED, this.dir.y * BULLET_SPEED],
				15,
				this.id,
				10
			);
			bullets.push(bullet);
			break;
		case "doubleDamage":
			bullet = new Bullet(
				this.pos,
				[this.dir.x * BULLET_SPEED, this.dir.y * BULLET_SPEED],
				5,
				this.id,
				20
			);
			bullets.push(bullet);
			break;
		case "buttshot":
			bullet = new Bullet(
				this.pos,
				[this.dir.x * BULLET_SPEED, this.dir.y * BULLET_SPEED],
				5,
				this.id,
				10
			);
			bullets.push(bullet);
			bullet = new Bullet(
				this.pos,
				[this.dir.x * BULLET_SPEED * -1, this.dir.y * -1 * BULLET_SPEED],
				5,
				this.id,
				10
			);
			bullets.push(bullet);
			break;
		case "buckshot":
			scalar = Math.sqrt(2) / 10;
			cone = Math.sqrt(2) / 2;
			for (let step = 0; step < 10; step++) {
				bullet = new Bullet(
					this.pos,
					[this.dir.x * BULLET_SPEED, this.dir.y * BULLET_SPEED],
					3,
					this.id,
					2
				);
				bullets.push(bullet);
			}
			break;
		case "sideshot":
			bullet = new Bullet(
				this.pos,
				[this.dir.x * BULLET_SPEED, this.dir.y * BULLET_SPEED],
				5,
				this.id,
				10
			);
			bullets.push(bullet);
			bullet = new Bullet(
				this.pos,
				[this.dir.y * BULLET_SPEED, this.dir.x * BULLET_SPEED],
				5,
				this.id,
				10
			);
			bullets.push(bullet);
			bullet = new Bullet(
				this.pos,
				[this.dir.y * BULLET_SPEED * -1, this.dir.x * BULLET_SPEED * -1],
				5,
				this.id,
				10
			);
			bullets.push(bullet);
			break;
		default:
			bullet = new Bullet(
				this.pos,
				[this.dir.x * BULLET_SPEED, this.dir.y * BULLET_SPEED],
				5,
				this.id,
				10
			);
			bullets.push(bullet);
			break;
		}

		return bullets; //console.log(input);
	}

	setInputs(inputs) {
		console.log(inputs);
		this.inputs = inputs;
		if (inputs.w) {
			this.speed = PLAYER_SPEED;
		} else {
			this.speed = 0;
		}
		if (inputs.space) {
			this.shooting = true;
		} else {
			this.shooting = false;
		}
	}

	move(deltaTime) {
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
