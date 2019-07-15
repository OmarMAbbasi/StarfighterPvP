const MovingObject = require('./movingObject');

const PLAYER_RADIUS = 25;
const PLAYER_SPEED = 30;
const ROTATE_SPEED = 90;

class Player extends MovingObject {
  constructor(pos, id, dir) {
    super(pos, { x: 0, y: 0 }, PLAYER_RADIUS);
    this.id = id;
    this.health = 100;
    this.totalScore = 0;
    this.score = 0;

    this.inputs = {};
    this.dir = dir;
    this.speed = 0;

    // testing
    this.inputs.A = true;
  }

  addScore(points) {
    this.score += points;
    this.totalScore += points;
  }

  takeDamage(damage) {
    this.health -= damage;
  }

  shoot() {

  }

  setInputs(inputs) {
    this.inputs = inputs;
    if (inputs.W) {
      this.speed = PLAYER_SPEED;
    } else {
      this.speed = 0;
    }
  }

  move(deltaTime) {
    // rotate player
    this.rotate(deltaTime);

    // update position
    this.pos.x += this.dir.x * this.speed * deltaTime;
    this.pos.y += this.dir.y * this.speed * deltaTime;

    // check if offscreen
    this.screenWrap();
  }

  rotate(deltaTime) {
    let dir = 0;

    // check inputs for rotate direction
    if (this.inputs.A && this.inputs.D) {
      dir = 0;
    } else if (this.inputs.A) {
      dir = -1;
    } else if (this.inputs.D) {
      dir = 1;
    }

    this.rotateVector([this.dir.x, this.dir.y], ROTATE_SPEED * deltaTime);
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