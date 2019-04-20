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
