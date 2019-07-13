const MovingObject = require('./movingObject');
class Hazard extends MovingObject {
    constructor(pos, vel, size, points) {
        super(pos, vel, size);
        this.points = points;
    }
}

module.exports = Hazard;