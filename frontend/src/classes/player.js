const MovingObject = require('./movingObject');

const PLAYER_RADIUS = 25;

class Player extends MovingObject {
    constructor(pos, id) {
        super(pos, {x: 0, y: 0}, PLAYER_RADIUS);
        this.id = id;
        this.health = 100;
        this.totalScore = 0;
        this.score = 0;
    }

    addScore(points) {
        this.score += points;
        this.totalScore += points;
    }

    takeDamage(damage) {
        this.health -= damage;
    }

    shoot() {

    }
}

module.exports = Player;