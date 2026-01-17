/**
 * Mezcla (baraja) un array utilizando el algoritmo Fisher-Yates.
 * Esta función es pura y retorna una NUEVA copia del array, no muta el original.
 * 
 * @param {Array} array - El array a mezclar.
 * @returns {Array} - Una copia mezclada del array original.
 */
export const shuffleArray = (array) => {
    if (!Array.isArray(array)) {
        console.error('shuffleArray received a non-array argument');
        return [];
    }
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

/**
 * Calcula la puntuación basada en reglas de negocio.
 * 
 * @param {boolean} isCorrect - Si la respuesta fue correcta.
 * @param {boolean} hintUsed - Si se usó una pista.
 * @param {number} timeLeft - Tiempo restante (para posibles bonificadores futuros).
 * @param {number} maxPoints - Puntos base por pregunta (default 10).
 * @returns {number} Puntos otorgados.
 */
export const calculatePoints = (isCorrect, hintUsed, maxPoints = 10) => {
    if (!isCorrect) return 0;

    let points = maxPoints;

    // Penalización por pista: 50%
    if (hintUsed) {
        points = points / 2;
    }

    return points;
};
