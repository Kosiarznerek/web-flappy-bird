export class Wektor {

    /**
     * Tworrzy obiekt wektor
     * @param {number} x
     * @param {number} y
     */
    constructor(x = 0, y = 0) {

        /**
         * @type {number}
         */
        this.x = x;

        /**
         * @type {number}
         */
        this.y = y;

    }

    /**
     * Klonuje wektor
     * @returns {Wektor}
     */
    klonuj() {
        return new Wektor(this.x, this.y);
    }

    /**
     * Dodaje wektory
     * @param {Wektor | number} v
     * @return {Wektor}
     */
    dodaj(v) {
        if (!(v instanceof Wektor)) v = new Wektor(v, v);
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    /**
     * Odejmuje wektory
     * @param {Wektor} wektor
     * @return {Wektor}
     */
    odejmij(wektor) {
        this.x -= wektor.x;
        this.y -= wektor.y;
        return this;
    }

}
