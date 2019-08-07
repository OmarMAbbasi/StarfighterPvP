const Vector2 = require("../utils/vector2");
const Bullet = require("./bullet");

class Weapon {
    constructor(player) {
        this.player = player;
        this.type = 'DEFAULT';
        this.fireRate = 3.5;
        this.bulletSpeed = 450;
        this.lastShotDelta = 1 / this.fireRate;
    }

    setType(type) {
        this.type = type;
    }

    shoot(deltaTime, firing) {
        this.lastShotDelta += deltaTime;
        
        if (this.lastShotDelta < 1 / this.fireRate || !firing) return;

        this.lastShotDelta = 0;

        let bullets = [];
        let bullet;

        switch (this.type) {
            default:
                bullet = new Bullet(
                    Object.assign({}, this.player.pos),
                    new Vector2(this.player.dir.x * this.bulletSpeed, this.player.dir.y * this.bulletSpeed),
                    7, this.player.id, 35, this.player, this.player.color
                );
                bullets.push(bullet);
        }

        return bullets;
    }
}

module.exports = Weapon;