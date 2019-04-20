// Importy
import {ladujGrafike} from './ladujGrafike.js';
import {Wektor} from './Wektor.js';
import {Prostokat} from './Prostokat.js';
import {Chmurka} from './Chmurka.js';
import {FlappyBird} from './FlappyBird.js';
import {losowaZmiennoprzecinkowa as losowa} from './losowa.js';

/**
 * Grafiki do gry
 * @type {{flappyBird: Image, chmurka: Image}}
 */
const grafiki = {
    flappyBird: null,
    chmurka: null,
};

// Laduje grafiki i czekam na załadwanie strony
(async () => await Promise.all([
    ladujGrafike('grafiki/chmurka.png'),
    ladujGrafike('grafiki/flappyBird.png'),
    new Promise(r => window.addEventListener('load', r))
]).then(([chmurka, flappyBird, ...reszta]) => {
    Object.assign(grafiki, {chmurka, flappyBird});
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
 * Tablica chmurek
 * @type {Chmurka[]}
 */
const chmurki = [];

/**
 * @type {FlappyBird}
 */
let flappyBird;

// Po wciśnieciu spacji
window.addEventListener('keydown', e => {
    if (!flappyBird || e.key !== ' ') return;
    flappyBird.podskocz();
});

/**
 * Główna funkcja
 */
function setup() {

    // Tworze canvas na cały ekran
    canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    document.body.appendChild(canvas);

    // Tworze tło
    tloGry = new Prostokat(new Wektor, canvas.width, canvas.height)
        .setKolor('#87ceeb');

    // Tworze gracza
    flappyBird = new FlappyBird(
        new Wektor(
            canvas.width / 2 - grafiki.flappyBird.width / 2,
            canvas.height / 2 - grafiki.flappyBird.height / 2
        ),
        grafiki.flappyBird.width,
        grafiki.flappyBird.height
    ).setGrafika(grafiki.flappyBird);

    // Uruchonienie animacji
    animate();

}

/**
 * Funkcja animacji
 */
function animate() {

    // Rysuje tło
    tloGry.rysuj(ctx);

    // Jeżeli mniej niż 4 chmurki to losuje
    while (chmurki.length < 5) chmurki.push(new Chmurka(
        new Wektor(
            losowa(canvas.width, canvas.width * 2),
            losowa(-grafiki.chmurka.height / 2, canvas.height / 5)
        ),
        grafiki.chmurka.width,
        grafiki.chmurka.height,
        losowa(-3, -0.5)
    ).setGrafika(grafiki.chmurka));

    // Aktualizuje pozycje chmurek
    chmurki.forEach(v => v.aktualizuj());

    // Rysuje chmurki
    chmurki.forEach(v => v.rysuj(ctx));

    // Chmurki po a ekranem są wywalane
    for (let i = 0; i < chmurki.length; i++) if (chmurki[i].pozycja.x + chmurki[i].szerokosc < 0) {
        chmurki.splice(i, 1);
        i--;
    }

    // Rysuje gracza
    flappyBird.rysuj(ctx);

    // Aktualizuje pozycje gracza
    flappyBird.aktualizuj();

    // Ponowne załadowanie animacji
    requestAnimationFrame(animate);

}
