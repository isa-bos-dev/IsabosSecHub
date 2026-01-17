import React from 'react';

/**
 * Componente de encabezado de página reutilizable con título degradado y descripción
 * @param {string} title - Texto del título principal
 * @param {string} description - Texto del párrafo de descripción
 * @param {string} gradientFrom - Color inicial del degradado (por defecto: 'primary')
 * @param {string} gradientTo - Color final del degradado (por defecto: 'secondary')
 */
const PageHeader = ({
    title,
    description,
    gradientFrom = 'primary',
    gradientTo = 'secondary'
}) => {
    return (
        <div className="text-center space-y-4">
            <h1
                className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text pb-2"
                style={{
                    backgroundImage: `linear-gradient(to right, var(--color-${gradientFrom}), var(--color-${gradientTo}))`
                }}
            >
                {title}
            </h1>
            <p className="text-lg text-(--text-secondary) max-w-3xl mx-auto leading-relaxed">
                {description}
            </p>
        </div>
    );
};

export default PageHeader;
