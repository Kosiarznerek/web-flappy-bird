// Importy
import {ladujGrafike, ladujDzwiek} from './laduj.js';
import {Wektor} from './Wektor.js';
import {Prostokat} from './Prostokat.js';
import {Chmurka} from './Chmurka.js';
import {FlappyBird} from './FlappyBird.js';
import {losowaZmiennoprzecinkowa as losowa} from './losowa.js';
import {aktualizujRozmiar} from './dostosujRozmiar.js';

/**
 * Grafiki do gry
 * @type {{flappyBird: Image, chmurka: Image}}
 */
const grafiki = {
    flappyBird: null,
    chmurka: null,
};

/**
 * Dźwięki z gry
 * @type {{punkt: Audio, uderzenie: Audio, skrzydla: Audio}}
 */
const dzwieki = {
    punkt: null,
    skrzydla: null,
    uderzenie: null
};

// Laduje grafiki i czekam na załadwanie strony
(async () => await Promise.all([
    ladujGrafike('grafiki/chmurka.png'),
    ladujGrafike('grafiki/flappyBird.png'),
    new Promise(r => window.addEventListener('load', r)),
    ladujDzwiek('dźwieki/punkt.wav'),
    ladujDzwiek('dźwieki/skrzydla.wav'),
    ladujDzwiek('dźwieki/uderzenie.wav'),
]).then(([chmurka, flappyBird, load, punkt, skrzydla, uderzenie]) => {
    Object.assign(grafiki, {chmurka, flappyBird});
    Object.assign(dzwieki, {punkt, skrzydla, uderzenie});
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
    dzwieki.skrzydla.currentTime = 0;
    dzwieki.skrzydla.play();
});

// Zmiana rozmiaru
window.addEventListener('resize', () => {
    if (!canvas) return;
    aktualizujRozmiar(
        canvas,
        new Wektor(1366, 657),
        new Wektor(window.innerWidth, window.outerHeight)
    );
});

/**
 * Główna funkcja
 */
function setup() {

    // Tworze canvas na cały ekran
    canvas = document.createElement('canvas');
    canvas.width = 1366;
    canvas.height = 657;
    aktualizujRozmiar(
        canvas,
        new Wektor(1366, 657),
        new Wektor(window.innerWidth, window.outerHeight)
    );
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
