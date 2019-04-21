// Importy
import {Prostokat} from './Prostokat.js';
import {Wektor} from "./Wektor.js";
import {losowaZmiennoprzecinkowa as losowa} from './losowa.js';

// Pipe
export class Pipe {

    /**
     * Tworzy pipe
     * @param {Wektor} pozycja Pozycja pipa
     * @param {number} luka Luka pomiędzy pipami
     * @param {number} szerokosc Szerokosc
     * @param {number} wysokosc Wysokosc
     * @param {number} minimalnaWysokosc
     * @param {number} predkosc Prędkosc poruszania się
     * @param {Image} grafika Grafika pipe górnego
     */
    constructor(pozycja, luka, szerokosc, wysokosc, minimalnaWysokosc, predkosc, grafika) {

        /**
         * Minimalna wysokosc pipa
         * @type {number}
         * @readonly
         * @private
         */
        this._minimalnaWysokosc = minimalnaWysokosc;

        /**
         * Pipe górny
         * @type {Prostokat}
         * @readonly
         * @private
         */
        this._gorny = new Prostokat(
            pozycja.klonuj(),
            szerokosc,
            wysokosc - luka - losowa(this._minimalnaWysokosc, wysokosc - luka - this._minimalnaWysokosc)
        ).setGrafika(grafika);

        /**
         * Pipe dolny
         * @type {Prostokat}
         * @readonly
         * @private
         */
        this._dolny = new Prostokat(
            new Wektor(
                this._gorny.pozycja.x,
                this._gorny.pozycja.y + this._gorny.wysokosc + luka
            ),
            szerokosc,
            wysokosc - luka - this._gorny.wysokosc
        ).setGrafika(grafika).setKatObrotu(Math.PI);

        /**
         * @type {number}
         */
        this.predkosc = predkosc;

        /**
         * Czy punkt za pipa został już przyznany
         * @type {boolean}
         */
        this.zaliczony = false;

    }

    /**
     * Pobiera oba pipy
     * @returns {[Prostokat, Prostokat]} Górny i dolny
     * @private
     */
    get _pipy() {
        return [this._gorny, this._dolny];
    }

    /**
     * Zwraca pozycje
     * @return {Wektor}
     */
    get pozycja() {
        return this._gorny.pozycja.klonuj();
    }

    /**
     * Zwraca szerokosc
     * @return {number}
     */
    get szerokosc() {
        return this._gorny.szerokosc;
    }

    /**
     * Pobiera kolor obramowania
     * @return {string | null}
     */
    get obramowanieKolor() {
        return this._gorny.obramowanieKolor;
    }

    /**
     * Pobiera obramowanie
     * @return {number | null}
     */
    get obramowanieSzerokosc() {
        return this._gorny.obramowanieSzerokosc;
    }

    /**
     * Ustawia obramowanie
     * @param {number} szerkosc
     * @param {string} kolor
     * @return {Pipe}
     */
    setObramowanie(szerkosc, kolor) {
        this._pipy.forEach(v => v.setObramowanie(szerkosc, kolor));
        return this;
    }

    /**
     * Czyści obramwanie
     * @return {Pipe}
     */
    czyscObramowanie() {
        this._pipy.forEach(v => v.czyscObramowanie());
        return this;
    }

    /**
     * Rysuje pipe na canvasie
     * @param {CanvasRenderingContext2D} ctx
     */
    rysuj(ctx) {
        this._pipy.forEach(v => v.rysuj(ctx));
    }

    /**
     * Aktualizuje pozycje
     */
    aktualizuj() {
        this._pipy.forEach(v => v.pozycja.dodaj(new Wektor(this.predkosc)));
    }

    /**
     * Sprawdza czy pipe znajduje się za elementem
     * @param {Prostokat} p
     * @return {boolean}
     */
    jestZa(p) {
        return this._gorny.pozycja.x + this.szerokosc + this.obramowanieSzerokosc < p.pozycja.x;
    }

    /**
     * Sprawdza czy pipe został oderzony
     * @param {Prostokat} p
     * @return {boolean}
     */
    uderzony(p) {
        return this._pipy.filter(v => v.nachodziNa(p)).length > 0;
    }

}
