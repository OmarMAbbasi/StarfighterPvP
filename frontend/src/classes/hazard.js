const MovingObject = require('./movingObject');

const HAZARD_RADIUS = 30;
class Hazard extends MovingObject {
    constructor(pos, radius = 30, points = 100) {
        super(pos, radius);
        this.points = points;
    }
}

module.exports = Hazard;