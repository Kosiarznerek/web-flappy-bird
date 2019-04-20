/**
 * Ładuje grafike
 * @param {string} src
 * @return {Promise<Image>}
 */
export async function ladujGrafike(src) {

    return new Promise((resolve, reject) => {

        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject();

    });

}

/**
 * Ładuje dźwiek
 * @param {string} src
 * @returns {Promise<Audio>}
 */
export async function ladujDzwiek(src) {

    return new Promise((resolve, reject) => {

        const dzwiek = new Audio(src);
        dzwiek.addEventListener('loadedmetadata', () => resolve(dzwiek));
        dzwiek.onerror = () => reject();

    })

}
