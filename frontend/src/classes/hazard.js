const MovingObject = require('./movingObject');

class Hazard extends MovingObject {
    constructor(points = 100) {
        super();
        this.points = points;
    }
}

module.exports = Hazard;