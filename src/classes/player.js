const MovingObject = require("./movingObject");
const Bullet = require("./bullet");
const Hazard = require("./hazard");

const PLAYER_RADIUS = 18;
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
		this.invuln = 0;
		this.bulletType = "normal";
		this.powerUps = ["nothing"];
		this.shield = 0;
		this.shieldInterval = {};
		this.regenInterval = {};
        this.color = "";
        this.ready = false;
	}

	setHealth(hp) {
		this.health = hp;
	}

	createShield() {
		this.shieldInterval = setInterval(() => {
			this.shield = 50;
		}, 30 * 1000);
	}

	startRegen() {
		this.regenInterval = setInterval(() => {
			this.health += 5;
		}, 5 * 1000);
	}

	applyEffects() {
		this.powerUps.forEach(powerup => {
			switch (powerup) {
			case "miniShield":
				this.createShield();
				break;
			case "bigShield":
				this.shield = 100;
				break;
			case "regen":
				this.startRegen();
				break;
			default:
				break;
			}
		});
	}

	clearEffects() {
		clearInterval(this.regenInterval);
		clearInterval(this.shieldInterval);
	}

	collideWith(obj) {
		if (this.respawning > 0 || this.invuln > 0) {
			return;
		}
		if (this.isCollidedWith(obj)) {
			if (obj instanceof Player && obj.id !== this.id) {
				this.takeDamage(100);
				obj.takeDamage(100);
			} else if (obj instanceof Bullet && obj.playerId !== this.id) {
				this.takeDamage(obj.damage);
			} else if (obj instanceof Hazard) {
				this.takeDamage(100);
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
			this.addScore(-250);
		}
	}

	setBulletType(type) {
		this.bulletType = type;
	}

	respawn() {
		if (this.powerUps.includes("shields")) {
			this.health = 200;
		} else {
			this.health = 100;
		}
		this.invuln = 1.5;
		this.pos = { x: Math.random() * 1000 + 200, y: Math.random() * 400 + 200 };
	}

	shoot(deltaTime) {
		if (this.respawning > 0) {
			return;
		}
		let fireRate = FIRE_RATE;
		// if (this.bulletType === "uzi") {
		// 	fireRate = 1;
		// }
		if (this.lastShotDelta < 1 / fireRate || !this.inputs.space) {
			this.lastShotDelta += deltaTime;
			return;
		}
		//* Bullet: constructor(pos, vel, size, playerId, damage)
		let bullets = [];
		let bullet;
		let powerup = this.bulletType;
		this.lastShotDelta = 0;
		let vecScalar;
		let baseVec;
		// powerup = 'shotgun';
		switch (powerup) {
		case "littleBoy": //experimental
			bullet = new Bullet(
				Object.assign({}, this.pos),
				{ x: this.dir.x * BULLET_SPEED, y: this.dir.y * BULLET_SPEED },
				5,
				this.id,
				10,
				this,
				this.color
			);
			bullet.setType("littleBoy");
			bullets.push(bullet);
			break;
		case "littleboypellet":
			bullet = new Bullet(
				Object.assign({}, this.pos),
				{ x: this.dir.x * BULLET_SPEED, y: this.dir.y * BULLET_SPEED },
				4,
				this.id,
				4,
				this,
				this.color
			);
			bullet.setType("littleBoy");
			bullets.push(bullet);
			break;
		case "shotgun": // works
			vecScalar = 5;
			baseVec = 10;
			for (let step = 0; step < 5; step++) {
				let newVec = this.rotateVector([this.dir.x, this.dir.y], baseVec);
				bullet = new Bullet(
					Object.assign({}, this.pos),
					{ x: newVec.x * BULLET_SPEED, y: newVec.y * BULLET_SPEED },
					5,
					this.id,
					5,
					this,
					this.color
				);
				bullets.push(bullet);
				baseVec -= vecScalar;
			}
			break;
		case "speedybullets": //works
			bullet = new Bullet(
				Object.assign({}, this.pos),
				{
					x: this.dir.x * BULLET_SPEED * 3,
					y: this.dir.y * BULLET_SPEED * 3
				},
				5,
				this.id,
				10,
				this,
				this.color
			);
			bullets.push(bullet);
			break;
		case "fatman": //works but needs to be slower
			bullet = new Bullet(
				Object.assign({}, this.pos),
				{ x: this.dir.x * BULLET_SPEED, y: this.dir.y * BULLET_SPEED },
				15,
				this.id,
				10,
				this,
				this.color
			);
			bullets.push(bullet);
			break;
		case "doubleDamage": //works im sure
			bullet = new Bullet(
				Object.assign({}, this.pos),
				{ x: this.dir.x * BULLET_SPEED, y: this.dir.y * BULLET_SPEED },
				5,
				this.id,
				20,
				this,
				this.color
			);
			bullets.push(bullet);
			break;
		case "buttshot": //works
			bullet = new Bullet(
				Object.assign({}, this.pos),
				{ x: this.dir.x * BULLET_SPEED, y: this.dir.y * BULLET_SPEED },
				5,
				this.id,
				10,
				this,
				this.color
			);
			bullets.push(bullet);
			bullet = new Bullet(
				Object.assign({}, this.pos),
				{
					x: this.dir.x * BULLET_SPEED * -1,
					y: this.dir.y * -1 * BULLET_SPEED
				},
				5,
				this.id,
				10,
				this,
				this.color
			);
			bullets.push(bullet);
			break;
		case "buckshot": // working
			// scalar = Math.t(2) / 2;
			vecScalar = 6;
			baseVec = 30;
			for (let step = 0; step < 10; step++) {
				let newVec = this.rotateVector([this.dir.x, this.dir.y], baseVec);
				bullet = new Bullet(
					Object.assign({}, this.pos),
					{ x: newVec.x * BULLET_SPEED, y: newVec.y * BULLET_SPEED },
					3,
					this.id,
					2,
					this,
					this.color
				);
				bullets.push(bullet);
				baseVec -= vecScalar;
			}
			break;
		case "sideshot": // works
			let newVec = this.rotateVector([this.dir.x, this.dir.y], -70);
			bullet = new Bullet(
				Object.assign({}, this.pos),
				{ x: newVec.x * BULLET_SPEED, y: newVec.y * BULLET_SPEED },
				5,
				this.id,
				10,
				this,
				this.color
			);
			bullets.push(bullet);
			newVec = this.rotateVector([this.dir.x, this.dir.y], 70);
			bullet = new Bullet(
				Object.assign({}, this.pos),
				{ x: newVec.x * BULLET_SPEED, y: newVec.y * BULLET_SPEED },
				5,
				this.id,
				10,
				this,
				this.color
			);
			bullets.push(bullet);
			bullet = new Bullet(
				Object.assign({}, this.pos),
				{ x: this.dir.x * BULLET_SPEED, y: this.dir.y * BULLET_SPEED },
				5,
				this.id,
				10,
				this,
				this.color
			);
			bullets.push(bullet);
			break;
		case "uzi":
			this.lastShotDelta += 1 / FIRE_RATE / 2;
			break;
		default:
			bullet = new Bullet(
				Object.assign({}, this.pos),
				{ x: this.dir.x * BULLET_SPEED, y: this.dir.y * BULLET_SPEED },
				7,
				this.id,
				35,
				this,
				this.color
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
		if (this.invuln > 0) {
			this.invuln -= deltaTime;
		} else if (this.invuln < 0) {
			this.invuln = 0;
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
			dir = 1;
		} else if (this.inputs.d) {
			dir = -1;
		}

		this.dir = this.rotateVector(
			[this.dir.x, this.dir.y],
			dir * ROTATE_SPEED * deltaTime
		);
	}

	rotateVector(vec, ang) {
		ang = -ang * (Math.PI / 180);
		var cos = Math.cos(ang);
		var sin = Math.sin(ang);
		// this.dir.x = Math.round(10000 * (vec[0] * cos - vec[1] * sin)) / 10000;
		// this.dir.y = Math.round(10000 * (vec[0] * sin + vec[1] * cos)) / 10000;
		return {
			x: Math.round(10000 * (vec[0] * cos - vec[1] * sin)) / 10000,
			y: Math.round(10000 * (vec[0] * sin + vec[1] * cos)) / 10000
		};
	}
}

module.exports = Player;
