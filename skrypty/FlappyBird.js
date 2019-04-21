import {Prostokat} from "./Prostokat.js";
import {Wektor} from "./Wektor.js";
import {map} from './map.js';

export class FlappyBird extends Prostokat {

    constructor(...args) {
        super(...args);

        /**
         * Siła działająca na ptaka
         * @type {Wektor}
         * @private
         */
        this._sila = new Wektor;

        /**
         * Siła z jaką działa grawitacja
         * @type {number}
         * @readonly
         * @private
         */
        this._grawitacja = 1;

        /**
         * Makszymalna predkosc spadania
         * @type {number}
         * @readonly
         * @private
         */
        this._maxGrawitacja = 6;

        /**
         * Siła z jaką wzbija się ptak w góre
         * @type {number}
         * @readonly
         * @private
         */
        this._silaWzbicia = -30;

        /**
         * Makszymalna predkosc z jaką może się wzbić ptak
         * @type {number}
         * @readonly
         * @private
         */
        this._maxSilaWzbicia = -15;

        /**
         * Punkty gracza
         * @type {number}
         */
        this.punkty = 0;

    }

    /**
     * Ptaszek podskakuje
     */
    podskocz() {
        const nowa = this._sila.klonuj().dodaj(new Wektor(0, this._silaWzbicia)).y;
        this._sila.y = Math.max(this._maxSilaWzbicia, nowa);
    }

    /**
     * Aktualizuje pozycje
     */
    aktualizuj() {

        // Grawitacja ściaga na doł
        const nowa = this._sila.klonuj().dodaj(new Wektor(0, this._grawitacja));

        // Ograniczenie szybkości spadania
        nowa.y = Math.min(this._maxGrawitacja, nowa.y);

        // Przypisanie
        this._sila = nowa;

        // Aktulizuje
        this.pozycja.dodaj(this._sila);

        // Rotacja
        this.setKatObrotu(map(
            this._sila.y,
            this._maxSilaWzbicia,
            this._maxGrawitacja,
            -Math.PI / 8,
            Math.PI / 8
        ));

    }

}
