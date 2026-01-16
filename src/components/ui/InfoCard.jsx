import React from 'react';
import { motion } from 'framer-motion';

/**
 * Componente tarjeta reutilizable para mostrar información con estilo temático.
 * Soporta diferentes posiciones de borde (izquierda/arriba), iconos y contenido de pie.
 * 
 * @param {string} title - Título de la tarjeta
 * @param {string|React.ReactNode} description - Contenido principal. Si es string, se aplica como innerHTML.
 * @param {React.ComponentType} icon - Componente de icono Lucide opcional
 * @param {string} color - Valor de color CSS (ej: 'var(--color-warning)')
 * @param {string} borderPosition - Posición del borde coloreado: 'left' | 'top'
 * @param {React.ReactNode} footer - Contenido opcional del pie
 * @param {React.ReactNode} headerRight - Contenido opcional para mostrar a la derecha del título (ej: etiquetas)
 * @param {string} className - Clases extra opcionales
 */
const InfoCard = ({
    title,
    description,
    icon: Icon,
    color = 'var(--text-primary)',
    borderPosition = 'top',
    footer,
    headerRight,
    cornerBadge,
    fullHeight = true,
    className = ''
}) => {
    // Determine border classes based on position
    const borderClass = borderPosition === 'left'
        ? 'border-l-4'
        : 'border-t-4';

    return (
        <motion.div
            whileHover={{
                y: -5,
                boxShadow: `0 10px 30px -10px ${color}`
            }}
            className={`bg-(--bg-secondary) p-6 rounded-xl shadow-lg flex flex-col relative ${fullHeight ? 'h-full' : ''} ${borderClass} ${className}`}
            style={{ borderColor: color }}
        >
            {cornerBadge && (
                <div className="absolute -top-3 -right-3 z-10">
                    {cornerBadge}
                </div>
            )}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                    {Icon && (
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0"
                            style={{ backgroundColor: `color-mix(in srgb, ${color}, transparent 80%)` }}
                        >
                            <Icon style={{ color: color }} />
                        </div>
                    )}
                    <h3 className="text-lg font-bold text-(--text-primary)">{title}</h3>
                </div>
                {headerRight && (
                    <div className="ml-2">
                        {headerRight}
                    </div>
                )}
            </div>

            <div className={`text-(--text-secondary) text-sm ${footer ? 'mb-4' : ''} grow`}>
                {typeof description === 'string' ? (
                    <p dangerouslySetInnerHTML={{ __html: description }} />
                ) : (
                    description
                )}
            </div>

            {footer && (
                <div className="mt-auto">
                    {footer}
                </div>
            )}
        </motion.div>
    );
};

export default InfoCard;
