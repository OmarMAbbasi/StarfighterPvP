const Util = require('../utils/game_util');
const { WIDTH, HEIGHT } = require('./constants');

class MovingObject {
  constructor(pos, vel, radius) {
    this.radius = (radius) ? radius : this.randomRadius(20, 40);
    this.vel = (vel) ? vel : this.randomVelocity(5, 10);
    this.pos = (pos) ? pos : this.randomPosition(this.radius);
  }

  checkCollision(other) {
    const ctrPointDist = Util.dist(this.pos, other.pos);
    return ctrPointDist < (this.radius + other.radius);
  }

  applyPowerups(powerups) {

  }

  move() {
    this.pos = [(this.pos[0] + this.vel[0]), (this.pos[1] + this.vel[1])]
  }

  draw(ctx) {
    ctx.fillStyle = '#00FF00';

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }



  randomPosition(radius) {
    let x, y;

    if (this.randomDirection == 1) {
      if (this.vel.x > 0) {
        x = -radius;
      } else {
        x = WIDTH + radius;
      }
      y = Math.floor(Math.random() * HEIGHT);
    } else {
      if (this.vel.y > 0) {
        y = -radius;
      } else {
        y = HEIGHT + radius;
      }
      x = Math.floor(Math.random() * WIDTH);
    }

    return {x, y};
  }

  randomVelocity(min, max) {
    const x = Math.floor(Math.random() * (max - min) + min) * this.randomDirection();
    const y = Math.floor(Math.random() * (max - min) + min) * this.randomDirection();
    return {x, y};
  }

  randomDirection() {
    return (Math.random() * 2 > 1) ? 1 : -1;
  }

  randomRadius(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

module.exports = MovingObject;