/**
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function losowaZmiennoprzecinkowa(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function losowaCalkowita(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
