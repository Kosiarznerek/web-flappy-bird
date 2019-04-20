// Importy
import {Wektor} from './Wektor.js';
import {Prostokat} from './Prostokat.js';

// Po załadowaniu strony
window.addEventListener('load', setup);

/**
 * Kontekst kanwasu
 * @type {CanvasRenderingContext2D}
 */
let ctx;


/**
 * Główna funkcja
 */
function setup() {

    // Tworze canvas na cały ekran
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    // Uruchonienie animacji
    animate();

}

/**
 * Funkcja animacji
 */
function animate() {

    // Ponowne załadowanie animacji
    requestAnimationFrame(animate);
}
