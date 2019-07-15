const MovingObject = require('./movingObject');
const Bullet = require('./bullet');
const Hazard1 = require('../style/images/asteroid1.png');
const Hazard2 = require('../style/images/asteroid2.png');
const HAZARDS = [Hazard1, Hazard2];

// const HAZARD1_RADIUS = 10;
// const HAZARD2_RADIUS = 12;

class Hazard extends MovingObject {
    constructor(pos, radius, points = 100) {
        super(pos, { x: 0, y: 0 }, radius)
        this.points = points;
        this.health = 100;
    }

    collideWith(obj) {
        if (this.isCollidedWith(obj)) {
            if (obj instanceof Bullet) {
                this.takeDamage(obj.damage);
            }
        }
    }

    draw(ctx) {
        // to see hitcircle
        // ctx.fillStyle = "#00FF00";
        // ctx.beginPath();
        // ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, true);
        // ctx.fill();
        // ctx.closePath();
        //
        
        let img = new Image();
        // let rotateDir;
        // if (this.dir.x === 0) {
        //     rotateDir = (this.dir.y * (-Math.PI / 2))
        // } else {
        //     rotateDir = Math.atan(this.dir.y / this.dir.x);
        // }
        img.onload = () => {
            // ctx.save();
            // ctx.translate(this.pos.x, this.pos.y);
            // ctx.rotate(rotateDir);
            // ctx.translate(-this.pos.x, -this.pos.y);
            ctx.drawImage(img, this.pos.x - this.radius, this.pos.y - this.radius, this.radius * 2, this.radius * 2);
            // ctx.restore();

        };
        img.src = Hazard1;
    }
}

module.exports = Hazard;