// Importy
import {Wektor} from './Wektor.js';

/**
 * Dostosowuje wymiar do potrzeb
 * @param {Wektor} oryginalny
 * @param {Wektor} oczekiwany
 * @return {Wektor}
 */
function dostasujWymiar(oryginalny, oczekiwany) {

    const nowyWymiar = oczekiwany.klonuj();
    const oryginalneRatio = oryginalny.x / oryginalny.y;
    const oczekiwaneRatio = nowyWymiar.x / nowyWymiar.y;
    if (oryginalneRatio > oczekiwaneRatio) nowyWymiar.y = nowyWymiar.x / oryginalneRatio;
    else nowyWymiar.x = nowyWymiar.y * oryginalneRatio;
    return nowyWymiar;

}

/**
 * Aktualizuje rozmiar canvasu
 * @param {HTMLElement} canvas
 * @param {Wektor} oryginalny
 * @param {Wektor} oczekiwany
 */
export function aktualizujRozmiar(canvas, oryginalny, oczekiwany) {

    const nowy = dostasujWymiar(oryginalny, oczekiwany);
    canvas.style.width = `${nowy.x}px`;
    canvas.style.height = `${nowy.y}px`;

}
