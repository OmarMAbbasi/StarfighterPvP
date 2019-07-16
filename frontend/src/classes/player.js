import MovingObject from "./movingObject";

import Bullet from "./bullet";
import Hazard from "./hazard";

const redShip = require("../style/images/redshipfire.png");

const PLAYER_RADIUS = 11;
const PLAYER_SPEED = 30;
const ROTATE_SPEED = 90;

//merge onto mattDev
//npm run dev before commit
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
	}

	draw(ctx, canvas) {
		// ctx.fillStyle = "#00FF00";
		// ctx.beginPath();
		// ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, true);
		// ctx.fill();
		// ctx.closePath();
		let img = new Image();
		let rotateDir;
		if (this.dir.x === 0) {
			rotateDir = this.dir.y * (-Math.PI / 2);
		} else {
			rotateDir = Math.atan(this.dir.y / this.dir.x);
		}
		img.src = redShip;
		// img.onload = () => {
		// ctx.rect(0, 0, canvas.width, canvas.height);
		// ctx.fillStyle = "black";
		// ctx.fill();
		// ctx.lineWidth = 5;
		// ctx.strokeStyle = "#00FF00";
		// ctx.stroke();
		ctx.save();
		ctx.translate(this.pos.x, this.pos.y);
		ctx.rotate(rotateDir);
		ctx.translate(-this.pos.x, -this.pos.y);
		ctx.drawImage(img, this.pos.x - 17, this.pos.y - 17, 35, 35);
		ctx.restore();
		// };
	}
}

export default Player;
