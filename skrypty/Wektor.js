export class Wektor {

    /**
     * Tworrzy obiekt wektor
     * @param {number} x
     * @param {number} y
     */
    constructor(x = 0, y = 0) {
        this.x = x;
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
     * @param {Wektor} wektor
     * @return {Wektor}
     */
    dodaj(wektor) {
        return new Wektor(
            this.x + wektor.x,
            this.y + wektor.y
        )
    }

    /**
     * Odejmuje wektory
     * @param {Wektor} wektor
     * @return {Wektor}
     */
    odejmij(wektor) {
        return new Wektor(
            this.x - wektor.x,
            this.y - wektor.y
        )
    }

}
