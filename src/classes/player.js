const MovingObject = require("./movingObject");
const Bullet = require("./bullet");
const Hazard = require("./hazard");
const Weapon = require("./weapon");
const Vector2 = require("../utils/vector2");

const PLAYER_RADIUS = 18;
const PLAYER_SPEED = 200;
const ROTATE_SPEED = 180;

class Player extends MovingObject {
	constructor(pos, id, dir) {
		super(pos, new Vector2(0, 0), PLAYER_RADIUS);
		
		// player weapon ref
		this.weapon = new Weapon(this);

		// player info
		this.id = id;
		this.color = "";

		// player score attributes
		this.points = 1000;
		this.totalScore = 0;

		// player state attributes
		this.ready = false;

		// input attributes
		this.inputs = {};
		this.speed = 0;
		this.dir = dir;
		this.shooting = false;

		// gameplay attributes
		this.setDefaults();
		this.shield = 0;
		this.shieldInterval = {};
		this.regenInterval = {};
	}

	setDefaults() {
		this.respawning = 0;
		this.invuln = 0;

		// round score
		this.score = 0;

		// modifiable attributes
		this.maxHealth = 100;
		this.health = this.maxHealth;
		this.radius = 18;
		this.shipSpeed = 200;
		this.rotateSpeed = 180;
		this.weapon.setDefaults();
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

	applyPowerUp(powerUp) {
		switch (powerUp.type) {
			case 'WEAPON':
				this.weapon = Object.assign(this.weapon, powerUp.options);
				return;
		}
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
		// if (this.powerUps.includes("shields")) {
		// 	this.health = 200;
		// } else {
		// 	this.health = 100;
		// }
		this.health = this.maxHealth;
		this.invuln = 1.5;
		this.pos.x = Math.random() * 1000 + 200;
		this.pos.y = Math.random() * 400 + 200;
	}

	shoot(deltaTime) {
		if (this.respawning > 0) {
			return;
		}

		return this.weapon.shoot(deltaTime, this.inputs.space);

		let fireRate = FIRE_RATE;
		// if (this.bulletType === "uzi") {
		// 	fireRate = 1;
		// }
		if (this.lastShotDelta < 1 / fireRate || !this.inputs.space) {
			this.lastShotDelta += deltaTime;
			return;
		}
		//* Bullet: constructor(pos, vel, size, playerId, damage)
		// let bullets = [];
		// let bullet;
		// let powerup = this.bulletType;
		// this.lastShotDelta = 0;
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

		return bullets;
	}

	setInputs(inputs) {
		this.inputs = inputs;
		if (inputs.w) {
			this.speed = PLAYER_SPEED;
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

		this.dir.rotate(dir * ROTATE_SPEED * deltaTime);
	}
}

module.exports = Player;
