/**
 * Obtiene un valor de variable CSS de la raíz del documento
 * @param {string} varName - Nombre de la variable CSS (e.g., '--color-primary')
 * @param {string} fallbackVar - Variable CSS de respaldo si no se encuentra la primera
 * @returns {string} El valor de la variable CSS
 */
export const getCSSVariable = (varName, fallbackVar = '--bg-code') => {
    if (typeof window !== 'undefined') {
        const color = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
        return color || getComputedStyle(document.documentElement).getPropertyValue(fallbackVar).trim();
    }
    return getComputedStyle(document.documentElement).getPropertyValue(fallbackVar).trim();
};

/**
 * Convierte un color hexadecimal a formato rgba
 * @param {string} hex - Color hexadecimal (e.g., '#00B0F0')
 * @param {number} alpha - Valor alfa/opacidad (0-1)
 * @returns {string} Cadena de color rgba
 */
export const hexToRgba = (hex, alpha = 1) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
        return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`;
    }
    // Respaldo a la variable bg-code
    return hexToRgba(getCSSVariable('--bg-code'), alpha);
};

/**
 * Obtiene una variable CSS y la convierte a formato rgba
 * Útil para Chart.js y otras librerías que necesitan colores rgba
 * @param {string} varName - Nombre de la variable CSS
 * @param {number} alpha - Valor alfa/opacidad (0-1)
 * @returns {string} Cadena de color rgba
 */
export const getCSSVariableAsRgba = (varName, alpha = 1) => {
    const hexColor = getCSSVariable(varName);
    return hexToRgba(hexColor, alpha);
};
