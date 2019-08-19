import boomImg from "../style/images/boom.png";
import hazard1 from "../style/images/asteroid1.png";
// import xplo from "../style/images/explosion3.png";

import redBlast from "../style/images/redblast.png";
import blueBlast from "../style/images/blueblast.png";
import greenBlast from "../style/images/greenblast.png";
import yellowBlast from "../style/images/yellowblast.png";

const redShip = require("../style/images/redshipfire.png");
const blueShip = require("../style/images/blueshipfire.png");
const greenShip = require("../style/images/greenshipfire.png");
const yellowShip = require("../style/images/yellowshipfire.png");

const redGod = require("../style/images/redgod.png");
const blueGod = require("../style/images/bluegod.png");
const greenGod = require("../style/images/greengod.png");
const yellowGod = require("../style/images/yellowgod.png");

export const drawPlayer = (ctx, player) => {
    if (player.health <= 0) {
        let boom = new Image();
        boom.src = boomImg;
        ctx.drawImage(boom, player.pos.x - 17, player.pos.y - 17, 25, 25);
    } else {
        _drawShip(ctx, player);
    }
}

function _drawShip(ctx, player) {
    let img = new Image();
    let rotateDir = Math.atan(player.dir.y / player.dir.x);
    if (player.dir.x < 0) {
        rotateDir = rotateDir + Math.PI;
    }
    if (player.color === "RED") {
        if (player.invuln > 0) {
            img.src = redGod;
        } else {
            img.src = redShip;
        }
    } else if (player.color === "BLUE") {
        if (player.invuln > 0) {
            img.src = blueGod;
        } else {
            img.src = blueShip;
        }
    } else if (player.color === "GREEN") {
        if (player.invuln > 0) {
            img.src = greenGod;
        } else {
            img.src = greenShip;
        }
    } else if (player.color === "YELLOW") {
        if (player.invuln > 0) {
            img.src = yellowGod;
        } else {
            img.src = yellowShip;
        }
    }
    console.log(player.color);
    ctx.save();
    ctx.translate(player.pos.x, player.pos.y);
    ctx.rotate(rotateDir);
    ctx.translate(-player.pos.x, -player.pos.y);
    ctx.drawImage(
        img,
        player.pos.x - player.radius - 1,
        player.pos.y - player.radius - 3,
        player.radius * 2 + 5,
        player.radius * 2 + 5
    );
    ctx.restore();
}

export const drawHazard = (ctx, hazard) => {
    if (hazard.health <= 0) {
        let boom = new Image();
        boom.src = boomImg;
        ctx.drawImage(boom, hazard.pos.x, hazard.pos.y, 5, 5);
    } else {
        _drawHazard(ctx, hazard);
    }
}

function _drawHazard(ctx, hazard) {
    let img = new Image();
    let rotateDir = Math.atan(hazard.dir.y / hazard.dir.x);
    if (hazard.dir.x < 0) {
        rotateDir = rotateDir + Math.PI;
    }
    img.src = hazard1;
    ctx.save();
    ctx.translate(hazard.pos.x, hazard.pos.y);
    ctx.rotate(rotateDir);
    ctx.translate(-hazard.pos.x, -hazard.pos.y);
    ctx.drawImage(img, hazard.pos.x - hazard.radius, hazard.pos.y - hazard.radius, hazard.radius * 2, hazard.radius * 2);
    ctx.restore();
}

export const drawBullet = (ctx, bullet) => {
    let img = new Image();
    let rotateDir = Math.atan(bullet.vel.y / bullet.vel.x);

    if (bullet.vel.x < 0) {
        rotateDir = rotateDir + Math.PI;
    }

    if (bullet.color === 'RED') {
        img.src = redBlast;
    } else if (bullet.color === 'BLUE') {
        img.src = blueBlast;
    } else if (bullet.color === 'GREEN') {
        img.src = greenBlast;
    } else if (bullet.color === 'YELLOW') {
        img.src = yellowBlast;
    }

    ctx.save();
    ctx.translate(bullet.pos.x, bullet.pos.y);
    ctx.rotate(rotateDir);
    ctx.translate(-bullet.pos.x, -bullet.pos.y);
    ctx.drawImage(img, bullet.pos.x - (bullet.radius * 1.5), bullet.pos.y - bullet.radius, bullet.radius * 2.5, bullet.radius * 2);
    ctx.restore();
}