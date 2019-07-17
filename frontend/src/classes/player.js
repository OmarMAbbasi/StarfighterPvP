import MovingObject from "./movingObject";
import boomImg from "../style/images/boom.png";
import xplo from "../style/images/explosion3.png";
import Bullet from "./bullet";
import Hazard from "./hazard";

const redShip = require("../style/images/redshipfire.png");
const blueShip = require("../style/images/blueshipfire.png");
const greenShip = require("../style/images/greenshipfire.png");
const yellowShip = require("../style/images/yellowshipfire.png");

const redGod = require("../style/images/redgod.png");
const blueGod = require("../style/images/bluegod.png");
const greenGod = require("../style/images/greengod.png");
const yellowGod = require("../style/images/yellowgod.png");


const PLAYER_RADIUS = 15;
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
		this.drawDeath = this.drawDeath.bind(this);
	}
	

	drawDeath(ctx) {
		// debugger
		let boom = new Image();
		boom.src = boomImg;
		ctx.drawImage(boom, this.pos.x - 17, this.pos.y - 17, 25, 25);

	}

	drawShip(ctx, player) {
		// for hitbox
		// ctx.fillStyle = "#00FF00";
		// ctx.beginPath();
		// ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, true);
		// ctx.fill();
		// ctx.closePath();
		
		let img = new Image();
		let rotateDir = Math.atan(this.dir.y / this.dir.x);
		if (this.dir.x < 0) {
			rotateDir = rotateDir + Math.PI;
		}
		if (player.color === 'RED') {
			if (player.invuln > 0) {
				img.src = redGod;
			} else {
				img.src = redShip;
			}
		} else if (player.color === 'BLUE') {
			if (player.invuln > 0) {
				img.src = blueGod;
			} else {
				img.src = blueShip;
			}
		} else if (player.color === 'GREEN') {
			if (player.invuln > 0) {
				img.src = greenGod;
			} else {
				img.src = greenShip;
			}
		} else if (player.color === 'YELLOW') {
			if (player.invuln > 0) {
				img.src = yellowGod;
			} else {
				img.src = yellowShip;
			}
		}
		ctx.save();
		ctx.translate(this.pos.x, this.pos.y);
		ctx.rotate(rotateDir);
		ctx.translate(-this.pos.x, -this.pos.y);
		ctx.drawImage(img, this.pos.x - this.radius - 1, this.pos.y - this.radius - 3, this.radius * 2 + 5, this.radius * 2 + 5);
		ctx.restore();
	}

	draw(ctx, color) {
		if (this.health <= 0) {
			this.drawDeath(ctx);
		} else {
			this.drawShip(ctx, color);
		}
	}
}

export default Player;
