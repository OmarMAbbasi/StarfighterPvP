import MovingObject from "./movingObject";
import hazard1 from "../style/images/asteroid1.png";
import boomImg from "../style/images/boom.png";

// const HAZARD1_RADIUS = 10;
// const HAZARD2_RADIUS = 12;

class Hazard extends MovingObject {
	constructor(pos, radius, points = 100) {
		super(pos, { x: 0, y: 0 }, radius);
		this.points = points;
		this.dir = this.randomRotation();
		this.health = 100;
		this.rotateSpeed = Math.random() * 60 + 30;
		this.powerUps = [];
	}

	move(deltaTime) {
		super.move(deltaTime);
		this.rotate(deltaTime);
	}

	

	rotate(deltaTime) {
		let ang = -this.rotateSpeed * (Math.PI / 180) * deltaTime;
		let vec = [this.dir.x, this.dir.y];

		var cos = Math.cos(ang);
		var sin = Math.sin(ang);

		this.dir.x = Math.round(10000 * (vec[0] * cos - vec[1] * sin)) / 10000;
		this.dir.y = Math.round(10000 * (vec[0] * sin + vec[1] * cos)) / 10000;
	}

	drawHazard(ctx) {
		let img = new Image();
		let rotateDir = Math.atan(this.dir.y / this.dir.x);
		if (this.dir.x < 0) {
			rotateDir = rotateDir + Math.PI;
		}
		img.src = hazard1;
		ctx.save();
		ctx.translate(this.pos.x, this.pos.y);
		ctx.rotate(rotateDir);
		ctx.translate(-this.pos.x, -this.pos.y);
		ctx.drawImage(img, this.pos.x - this.radius, this.pos.y - this.radius, this.radius * 2, this.radius * 2);
		ctx.restore();
	}

	drawBlownup(ctx) {
		let boom = new Image();
		boom.src = boomImg;
		ctx.drawImage(boom, this.pos.x, this.pos.y, 5, 5);
	}

	draw(ctx) {
		if (this.health <= 0) {
			this.drawBlownup(ctx);
		} else {
			this.drawHazard(ctx);
		}
	}
}

export default Hazard;
