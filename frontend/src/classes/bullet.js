import MovingObject from "./movingObject";
import redBlast from "../style/images/redblast.png";
import Player from "./player";
// import Player from "./player";//! user but not defined
// const Hazard = require('./hazard');

class Bullet extends MovingObject {
	constructor(pos, vel, size, playerId, damage) {
		super(pos, vel, size);
		this.playerId = playerId;
		this.damage = damage;
	}

	rewardPoints(players, obj) {
		if (this.isCollidedWith(obj) && obj.health <= 0) {
			players.forEach(player => {
				if (player.id === this.playerId) {
					player.addScore(obj.points);
				}
			});
		}
	}

	setType(type) {
		let dir = this.dir;
		let dir = {};
		dir.x = Math.random;
		dir.y = 1 - Math.random;
		for (let i = 0; i < 4; i++) {
			let player = Player.new(pos, this.playerId, dir);
			player.bulletType("littleboypellet");
			player.shoot(1000000);
		}
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

export default Bullet;
