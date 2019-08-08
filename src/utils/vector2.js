class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    rotate(angle) {
        angle = -angle * (Math.PI / 180);
        
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);

        let x = Math.round(10000 * (this.x * cos - this.y * sin)) / 10000;
        let y = Math.round(10000 * (this.x * sin + this.y * cos)) / 10000;

        this.x = x;
        this.y = y;

        return this;
    }

    dup() {
        return new Vector2(this.x, this.y);
    }
}

module.exports = Vector2;