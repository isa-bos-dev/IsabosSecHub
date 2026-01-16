import React from 'react';

/**
 * Bloque de Cita reutilizable con fondo degradado
 * @param {string} quote - El texto de la cita
 * @param {string} author - El autor o fuente de la cita
 * @param {string} gradientFrom - Variable CSS para el inicio del degradado (por defecto: 'primary')
 * @param {string} gradientTo - Variable CSS para el final del degradado (por defecto: 'secondary')
 * @param {string} authorColor - Variable CSS para el texto del autor (por defecto: 'primary')
 */
const QuoteBlock = ({
    quote,
    author,
    gradientFrom = 'primary',
    gradientTo = 'secondary',
    authorColor = 'primary'
}) => {
    return (
        <div className={`mt-16 bg-linear-to-r from-${gradientFrom}/10 to-${gradientTo}/10 border border-${gradientFrom}/30 p-8 rounded-2xl text-center relative overflow-hidden`}>
            <div className="relative z-10">
                {/* Quote text - uses serif font from CSS variables */}
                <p className="text-2xl font-(--font-serif) italic text-(--text-primary) mb-4">
                    "{quote}"
                </p>
                {/* Author - uses the specified color from CSS variables */}
                <p className={`text-${authorColor} font-bold tracking-wide uppercase text-sm`}>
                    — {author}
                </p>
            </div>
        </div>
    );
};

export default QuoteBlock;
