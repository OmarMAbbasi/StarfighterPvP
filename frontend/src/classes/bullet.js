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
		let pos = this.pos;
		dir.x = vel.x;
		dir.y = vel.y;
		let player = Player.new(pos, this.playerId, {
			x: dir.x * -1,
			y: dir.y * -1
		});
		player.bulletType("littleboypellet");
		player.shoot(1000000);
		let player = Player.new(pos, this.playerId, {
			y: dir.y * -1,
			x: dir.x * -1
		});

		player.bulletType("littleboypellet");
		player.shoot(1000000);
		let player = Player.new(pos, this.playerId, {
			y: dir.y,
			x: dir.x
		});
		player.bulletType("littleboypellet");
		player.shoot(1000000);
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
		let rotateDir = Math.atan(this.vel.y / this.vel.x);
		if (this.vel.x < 0) {
			rotateDir = rotateDir + Math.PI;
		}
		img.src = redBlast;
		ctx.save();
		ctx.translate(this.pos.x, this.pos.y);
		ctx.rotate(rotateDir);
		ctx.translate(-this.pos.x, -this.pos.y);
		ctx.drawImage(img, this.pos.x - 6, this.pos.y - 5, 12, 15);
		ctx.restore();
	}
}

export default Bullet;
