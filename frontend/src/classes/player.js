import MovingObject from "./movingObject";
import redShip from "../style/images/redshipfire.png";
import boomImg from "../style/images/boom.png";
import xplo from "../style/images/explosion3.png";
import Bullet from "./bullet";
import Hazard from "./hazard";

const PLAYER_RADIUS = 11;
const PLAYER_SPEED = 30;
const ROTATE_SPEED = 90;

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

		// testing
		this.inputs.A = true;
		this.drawDeath = this.drawDeath.bind(this);
	}

	drawDeath(ctx) {
		// debugger
		let boom = new Image();
		boom.src = boomImg;
		
		// // ctx.save();
		// setTimeout(() => ctx.drawImage(img, this.pos.x - 17, this.pos.y - 17, 15, 15), 1000)
		// // ctx.clearRect(0,0,1600,900);
		// setTimeout(() => ctx.drawImage(img, this.pos.x - 17, this.pos.y - 17, 20, 20), 1000)
		// // ctx.clearRect(0, 0, 1600, 900);
		// setTimeout(() => ctx.drawImage(img, this.pos.x - 17, this.pos.y - 17, 25, 25), 1000)
		ctx.drawImage(boom, this.pos.x - 17, this.pos.y - 17, 25, 25);
		// // ctx.clearRect(0, 0, 1600, 900);
		// setTimeout(() => ctx.drawImage(img, this.pos.x - 17, this.pos.y - 17, 30, 30), 1000)
		// // ctx.drawImage(img, this.pos.x - 17, this.pos.y - 17, 30, 30);
	}

	drawShip(ctx) {
		let img = new Image();
		let rotateDir = Math.atan(this.dir.y / this.dir.x);
		if (this.dir.x < 0) {
			rotateDir = rotateDir + Math.PI;
		}
		img.src = redShip;
		ctx.save();
		ctx.translate(this.pos.x, this.pos.y);
		ctx.rotate(rotateDir);
		ctx.translate(-this.pos.x, -this.pos.y);
		ctx.drawImage(img, this.pos.x - 17, this.pos.y - 17, 35, 35);
		ctx.restore();
	}

	draw(ctx, canvas) {
		if (this.health <= 0) {
			this.drawDeath(ctx); 
		} else {
			this.drawShip(ctx);
		}
	}
}

export default Player;
