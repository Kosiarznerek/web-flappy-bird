// Importy
import {Prostokat} from './Prostokat.js';
import {Wektor} from "./Wektor.js";

export class Chmurka extends Prostokat {

    /**
     * Tworzy chmurke
     * @param {Wektor} pozycja Lewy gorny róg
     * @param {number} szerkosc
     * @param {number} wysokosc
     * @param {number} predkosc
     */
    constructor(pozycja, szerkosc, wysokosc, predkosc) {
        super(pozycja, szerkosc, wysokosc);

        /**
         * Prędkość poruszania się
         * @type {number}
         * @private
         */
        this._predkosc = predkosc;
    }

    /**
     * Zwraca predkosc chmurki
     * @returns {number}
     */
    get predkosc() {
        return this._predkosc;
    }

    /**
     * Aktualizuje pozycje chmurki
     */
    aktualizuj() {
        this.pozycja.dodaj(new Wektor(this._predkosc));
    }


}
