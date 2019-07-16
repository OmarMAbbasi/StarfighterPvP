import MovingObject from "./movingObject";
import Bullet from "./bullet";
// import Hazard1 from "../style/images/asteroid1.png";
// import Hazard2 from "../style/images/asteroid2.png";
// const HAZARDS = [Hazard1, Hazard2];

import asteroid from "../style/images/asteroid1.png";

// const HAZARD1_RADIUS = 10;
// const HAZARD2_RADIUS = 12;

class Hazard extends MovingObject {
	constructor(pos, radius, points = 100) {
		super(pos, { x: 0, y: 0 }, radius);
		this.points = points;
		this.dir = this.randomRotation();
		this.health = 100;
		this.rotateSpeed = Math.random() * 60 + 30;
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

	draw(ctx) {
		let img = new Image();

		img.onload = () => {
			ctx.fillStyle = "#000000";
			ctx.rect(0, 0, 1600, 900);
			ctx.fill();
			ctx.lineWidth = 5;
			ctx.strokeStyle = "#00FF00";
			ctx.stroke();
			ctx.save();
			ctx.clearRect(0, 0, 1600, 900);
			ctx.fillRect(0, 0, 1600, 900);


			ctx.translate(this.pos.x, this.pos.y);
			ctx.rotate(this.dir);
			ctx.translate(-this.pos.x, -this.pos.y);
			ctx.drawImage(img, this.pos.x, this.pos.y, this.radius, this.radius);
			ctx.restore();
		}	
		img.src = asteroid;
	}
}

export default Hazard;
