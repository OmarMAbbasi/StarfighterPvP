const Vector2 = require("../utils/vector2");
const Bullet = require("./bullet");

class Weapon {
    constructor(player) {
        this.player = player;

        this.lastShotDelta = 1 / this.fireRate;

        this.setDefaults();
    }

    setDefaults() {
        // modifiable attributes
        this.type = '';
        this.fireRate = 3.5;
        this.damage = 35;
        this.bulletSize = 7;
        this.bulletSpeed = 600;
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
            case 'SHOTGUN':
                return this._shotgun();
            case 'BACKSHOT':
                return this._backshot();
            case 'SIDESHOT':
                return this._sideshot();
            default:
                bullet = new Bullet(
                    Object.assign({}, this.player.pos),
                    new Vector2(this.player.dir.x * this.bulletSpeed, this.player.dir.y * this.bulletSpeed),
                    this.bulletSize, this.player.id, this.damage, this.player, this.player.color
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
                this.bulletSize, this.player.id, this.damage, this.player, this.player.color
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
            this.bulletSize, this.player.id, this.damage, this.player, this.player.color
        );
        bullets.push(bullet);

        bullet = new Bullet(
            Object.assign({}, this.player.pos),
            new Vector2(this.player.dir.x * this.bulletSpeed, this.player.dir.y * this.bulletSpeed).rotate(180),
            this.bulletSize, this.player.id, this.damage, this.player, this.player.color
        );
        bullets.push(bullet);

        return bullets;
    }

    _sideshot() {
        let bullets = [];

        let bullet = new Bullet(
            Object.assign({}, this.player.pos),
            new Vector2(this.player.dir.x * this.bulletSpeed, this.player.dir.y * this.bulletSpeed),
            this.bulletSize, this.player.id, this.damage, this.player, this.player.color
        );
        bullets.push(bullet);

        bullet = new Bullet(
            Object.assign({}, this.player.pos),
            new Vector2(this.player.dir.x * this.bulletSpeed, this.player.dir.y * this.bulletSpeed).rotate(90),
            this.bulletSize, this.player.id, this.damage, this.player, this.player.color
        );
        bullets.push(bullet);

        bullet = new Bullet(
            Object.assign({}, this.player.pos),
            new Vector2(this.player.dir.x * this.bulletSpeed, this.player.dir.y * this.bulletSpeed).rotate(-90),
            this.bulletSize, this.player.id, this.damage, this.player, this.player.color
        );
        bullets.push(bullet);

        return bullets;
    }
}

module.exports = Weapon;