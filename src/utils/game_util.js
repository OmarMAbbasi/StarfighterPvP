const Util = {

    // distance equation
    dist(pos1, pos2) {
        return Math.sqrt(
            Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)
        );
    },

    vectorLength(vector) {
        return Util.dist([0, 0], vector);
    }
};

module.exports = Util;