const MovingObject = require('./movingObject');

class Bullet extends MovingObject {
    constructor(pos, vel, size, playerId, damage) {
        super(pos, vel, size);
        this.playerId = playerId;
        this.damage = damage;
    }
}

module.export = Bullet;