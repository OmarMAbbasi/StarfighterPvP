class Weapon {
    constructor(player) {
        this.player = player;
        this.type = 'DEFAULT';
        this.fireRate = 3.5;
        this.lastShotDelta = 1 / this.fireRate;
    }

    setType(type) {
        this.type = type;
    }

    shoot(deltaTime) {
        if (this.lastShotDelta < 1 / this.fireRate) {
            this.lastShotDelta += deltaTime;
            return;
        }

        this.lastShotDelta = 0;

        let bullets = [];
    }
}

module.exports = Weapon;