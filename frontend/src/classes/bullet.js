const MovingObject = require('./movingObject');
const redBlast = require('../style/images/redblast.png');

class Bullet extends MovingObject {
    constructor(pos, vel, size, playerId, damage) {
        super(pos, vel, size);
        this.playerId = playerId;
        this.damage = damage;
    }

    

    draw(ctx) {
        // to see hit circle
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
            ctx.drawImage(img, this.pos.x - 6, this.pos.y - 5, 12, 15);
            // ctx.restore();

        };
        img.src = redBlast;
    }
}

module.exports = Bullet;