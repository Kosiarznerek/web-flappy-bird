// Importy
import {Wektor} from './Wektor.js';

// Prostokat
export class Prostokat {


    /**
     * Tworzy prostokat
     * @param {Wektor} pozycja Lewy gorny róg
     * @param {number} szerkosc
     * @param {number} wysokosc
     */
    constructor(pozycja, szerkosc, wysokosc) {

        /**
         * Pozycja (lewy górny róg)
         * @type {Wektor}
         */
        this.pozycja = pozycja;

        /**
         * Szerokość prostokąta
         * @type {number}
         */
        this.szerokosc = szerkosc;

        /**
         * Wysokość prostokąta
         * @type {number}
         */
        this.wysokosc = wysokosc;

        /**
         * Kolor prostokata
         * @type {string | null}
         * @private
         */
        this._kolor = 'black';

        /**
         * Grafika prostokata
         * @type {Image | null}
         * @private
         */
        this._grafika = null;

        /**
         * Kąt obrotu prostokąta
         * @type {number}
         * @private
         */
        this._katObrotu = 0;

    }

    /**
     * Ustawia kolor prostokata
     * @param {string | null} kolor
     * @return {Prostokat}
     */
    setKolor(kolor) {
        this._grafika = null;
        this._kolor = kolor;
        return this;
    }

    /**
     * Zwraca kolor
     * @return {string}
     */
    get kolor() {
        return this._kolor;
    }

    /**
     * Ustawia grafike prostokata
     * @param {Image | null} grafika
     * @return {Prostokat}
     */
    setGrafika(grafika) {
        this._kolor = null;
        this._grafika = grafika;
        return this;
    }

    /**
     * Zwraca grafike
     * @return {Image}
     */
    get grafika() {
        return this._grafika;
    }

    /**
     * Ustawia kąt obrozu
     * @param {number} v
     * @return {Prostokat}
     */
    setKatObrotu(v) {
        if (Math.abs(Math.abs(v) - Math.PI) < 0.0001) {
            v = 0;
        }
        this._katObrotu = v;
        return this;
    }

    /**
     * Zwraca kąt obrotu
     * @return {number}
     */
    get katObrotu() {
        return this._katObrotu;
    }

    /**
     * Rysuje prostokat na kanwasie
     * @param {CanvasRenderingContext2D} ctx
     */
    rysuj(ctx) {

        // Ustawienia
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.pozycja.x + this.szerokosc / 2, this.pozycja.y + this.wysokosc / 2);
        ctx.rotate(this._katObrotu);

        if (typeof this._kolor === 'string') { // Rysowanie kolorem
            ctx.rect(-this.szerokosc / 2, -this.wysokosc / 2, this.szerokosc, this.wysokosc);
            ctx.fillStyle = this._kolor;
            ctx.fill();
        } else if (this._grafika instanceof Image) { // Rysowanie grafika
            ctx.drawImage(this._grafika, -this.szerokosc / 2, -this.wysokosc / 2, this.szerokosc, this.wysokosc);
        } else { // Bląd
            console.warn('Próba namalowania prostokątu bez grafiki i koloru');
        }

        // Przywrócenie
        ctx.restore();

    }

}
