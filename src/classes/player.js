const MovingObject = require("./movingObject");
const Bullet = require("./bullet");
const Hazard = require("./hazard");

const PLAYER_RADIUS = 11;
const PLAYER_SPEED = 100;
const ROTATE_SPEED = 90;
const BULLET_SPEED = 300;
const FIRE_RATE = 2;

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
    }

    collideWith(obj) {
        if (this.isCollidedWith(obj)) {
            console.log("im hit");
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
            this.respawn();
        }
    }

    respawn() {
        this.health = 100;
        this.pos = { x: Math.random() * 1200 + 200, y: Math.random() * 500 + 200 };
    }

    shoot(deltaTime) {
        if (this.lastShotDelta < 1 / FIRE_RATE || !this.inputs.space) {
            this.lastShotDelta += deltaTime;
            return;
        }

        let vel = { x: this.vel.x * 3, y: this.vel.y * 3 };
        let bullet = new Bullet(
            Object.assign({}, this.pos), [this.dir.x * BULLET_SPEED, this.dir.y * BULLET_SPEED],
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
            this.speed = PLAYER_SPEED;
        } else {
            this.speed = 0;
        }
        this.shooting = inputs.space;
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