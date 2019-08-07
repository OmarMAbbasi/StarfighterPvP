const Vector2 = require("../utils/vector2");
const Bullet = require("./bullet");

class Weapon {
    constructor(player) {
        this.player = player;
        this.fireRate = 3.5;
        this.damage = 35;
        this.bulletSpeed = 600;
        this.type = 'shotgun';
        this.lastShotDelta = 1 / this.fireRate;
    }

    setType(type) {
        this.type = type;
    }

    shoot(deltaTime, firing) {
        this.lastShotDelta += deltaTime;

        if (this.lastShotDelta < 1 / this.fireRate || !firing) return;
        this.lastShotDelta = 0;

        // TODO: remove when done with powerups
        let speedMulti = 1;
        // END TODO

        let bullet;
        switch (this.type) {
            case 'shotgun':
                return this._shotgun();
            case 'speedybullets':
                speedMulti = 2;
                bullet = new Bullet(
                    Object.assign({}, this.player.pos),
                    new Vector2(this.player.dir.x * this.bulletSpeed * speedMulti, this.player.dir.y * this.bulletSpeed * speedMulti),
                    7, this.player.id, this.damage, this.player, this.player.color
                );
                return [bullet];
            case 'fatman':
                speedMulti = 0.75;
                bullet = new Bullet(
                    Object.assign({}, this.player.pos),
                    new Vector2(this.player.dir.x * this.bulletSpeed, this.player.dir.y * this.bulletSpeed),
                    15, this.player.id, 70, this.player, this.player.color
                );
                return [bullet];
            case 'doubleDamage':
                bullet = new Bullet(
                    Object.assign({}, this.player.pos),
                    new Vector2(this.player.dir.x * this.bulletSpeed, this.player.dir.y * this.bulletSpeed),
                    7, this.player.id, this.damage, this.player, this.player.color
                );
                return [bullet];
            case 'backshot':
                return this._backshot();
            case 'sideshot':
                return this._sideshot();
            default:
                bullet = new Bullet(
                    Object.assign({}, this.player.pos),
                    new Vector2(this.player.dir.x * this.bulletSpeed, this.player.dir.y * this.bulletSpeed),
                    7, this.player.id, this.damage, this.player, this.player.color
                );
                return [bullet];
        }
    }

    _shotgun() {
        let bullets = [];
        let vecScalar = 3;
        let baseVec = 6;
        
        for (let step = 0; step < 5; step++) {
            let newVec = new Vector2(this.player.dir.x, this.player.dir.y).rotate(baseVec);
            let bullet = new Bullet(
                Object.assign({}, this.player.pos), 
                new Vector2(newVec.x * this.bulletSpeed, newVec.y * this.bulletSpeed),
                5, this.player.id, 10, this.player, this.player.color
            );
            bullets.push(bullet);
            baseVec -= vecScalar;
        }

        return bullets;
    }

    _backshot() {
        let bullets = [];

        let bullet = new Bullet(
            Object.assign({}, this.player.pos),
            new Vector2(this.player.dir.x * this.bulletSpeed, this.player.dir.y * this.bulletSpeed),
            7, this.player.id, this.damage, this.player, this.player.color
        );
        bullets.push(bullet);

        bullet = new Bullet(
            Object.assign({}, this.player.pos),
            new Vector2(this.player.dir.x * this.bulletSpeed, this.player.dir.y * this.bulletSpeed).rotate(180),
            7, this.player.id, this.damage, this.player, this.player.color
        );
        bullets.push(bullet);

        return bullets;
    }

    _sideshot() {
        let bullets = [];

        let bullet = new Bullet(
            Object.assign({}, this.player.pos),
            new Vector2(this.player.dir.x * this.bulletSpeed, this.player.dir.y * this.bulletSpeed),
            7, this.player.id, this.damage, this.player, this.player.color
        );
        bullets.push(bullet);

        bullet = new Bullet(
            Object.assign({}, this.player.pos),
            new Vector2(this.player.dir.x * this.bulletSpeed, this.player.dir.y * this.bulletSpeed).rotate(90),
            7, this.player.id, this.damage, this.player, this.player.color
        );
        bullets.push(bullet);

        bullet = new Bullet(
            Object.assign({}, this.player.pos),
            new Vector2(this.player.dir.x * this.bulletSpeed, this.player.dir.y * this.bulletSpeed).rotate(-90),
            7, this.player.id, this.damage, this.player, this.player.color
        );
        bullets.push(bullet);

        return bullets;
    }
}

module.exports = Weapon;