// Importy
import {ladujGrafike} from './ladujGrafike.js';
import {Wektor} from './Wektor.js';
import {Prostokat} from './Prostokat.js';

/**
 * Grafiki do gry
 * @type {{flappyBird: Image, chmurka: Image}}
 */
const GRAFIKI = {
    flappyBird: null,
    chmurka: null,
};

// Laduje grafiki i czekam na załadwanie strony
(async () => await Promise.all([
    ladujGrafike('grafiki/chmurka.png'),
    ladujGrafike('grafiki/flappyBird.png'),
    new Promise(r => window.addEventListener('load', r))
]).then(([chmurka, flappyBird, ...reszta]) => {
    Object.assign(GRAFIKI, {chmurka, flappyBird});
    setup();
}))();

/**
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * @type {CanvasRenderingContext2D}
 */
let ctx;

/**
 * @type {Prostokat}
 */
let tloGry;

/**
 * Główna funkcja
 */
function setup() {

    // Tworze canvas na cały ekran
    canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    // Tworze tło
    tloGry = new Prostokat(new Wektor, canvas.width, canvas.height);
    tloGry.kolor = '#87ceeb';

    // Uruchonienie animacji
    animate();

}

/**
 * Funkcja animacji
 */
function animate() {

    // Rysuje tło
    tloGry.rysuj(ctx);

    // Ponowne załadowanie animacji
    requestAnimationFrame(animate);

}
