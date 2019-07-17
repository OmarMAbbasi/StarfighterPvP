import MovingObject from "./movingObject";
import redBlast from "../style/images/redblast.png";
import blueBlast from "../style/images/blueblast.png";
import greenBlast from "../style/images/greenblast.png";
import yellowBlast from "../style/images/yellowblast.png";
import Player from "./player";
// import Player from "./player";//! user but not defined
// const Hazard = require('./hazard');

class Bullet extends MovingObject {
	constructor(pos, vel, size, playerId, damage) {
		super(pos, vel, size);
		this.playerId = playerId;
		this.damage = damage;
		this.powerUps = [];
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
		let dir = {};
		let player;
		let pos = this.pos;
		dir.x = this.vel.x;
		dir.y = this.vel.y;
		player = Player.new(pos, this.playerId, {
			x: dir.x * -1,
			y: dir.y * -1
		});
		player.bulletType("littleboypellet");
		player.shoot(1000000);
		player = Player.new(pos, this.playerId, {
			y: dir.y * -1,
			x: dir.x * -1
		});

		player.bulletType("littleboypellet");
		player.shoot(1000000);
		player = Player.new(pos, this.playerId, {
			y: dir.y,
			x: dir.x
		});
		player.bulletType("littleboypellet");
		player.shoot(1000000);
	}

	draw(ctx, color) {
		// to see hit circle
		// ctx.fillStyle = "#00FF00";
		// ctx.beginPath();
		// ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, true);
		// ctx.fill();
		// ctx.closePath();
		//

		let img = new Image();
		let rotateDir = Math.atan(this.vel.y / this.vel.x);
		if (this.vel.x < 0) {
			rotateDir = rotateDir + Math.PI;
		}
		if (color === 'RED') {
			img.src = redBlast;
		} else if (color === 'BLUE') {
			img.src = blueBlast;
		} else if (color === 'GREEN') {
			img.src = greenBlast;
		} else if (color === 'YELLOW') {
			img.src = yellowBlast;
		}
		ctx.save();
		ctx.translate(this.pos.x, this.pos.y);
		ctx.rotate(rotateDir);
		ctx.translate(-this.pos.x, -this.pos.y);
		ctx.drawImage(img, this.pos.x - (this.radius * 1.5), this.pos.y - this.radius, this.radius * 2.5, this.radius * 2);
		ctx.restore();
	}
}

export default Bullet;
