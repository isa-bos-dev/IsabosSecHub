import React from 'react';
import { motion } from 'framer-motion';
import { getCSSVariable } from '../../utils/colors';


/**
 * Componente Timeline reutilizable con tarjetas animadas y marcadores de icono
 * @param {Array} items - Ítems del timeline con estructura:
 *   {
 *     gen: string,           // Texto del badge (ej: "1ª Generación")
 *     eras: string,          // Periodo de tiempo (ej: "1980s-1990s")
 *     title: string,         // Título de la tarjeta
 *     desc: string,          // Descripción de la tarjeta
 *     icon: Component,       // Componente de icono Lucide
 *     color: string,         // Nombre de variable CSS (ej: "text-primary" -> usa --color-primary)
 *     bg: string,            // Nombre de variable CSS (ej: "bg-primary/10")
 *     border: string,        // Nombre de variable CSS (ej: "border-primary")
 *     examples: Array        // Array de strings de ejemplos
 *   }
 * @param {function} onExampleClick - Callback al hacer clic en un ejemplo, recibe el string del ejemplo
 */
const Timeline = ({ items, onExampleClick }) => {
    // Extraer el nombre de la variable CSS de la clase (ej: "text-primary" -> "--color-primary")
    const getCSSVarName = (className) => {
        // Extraer nombre del color de clase como "text-primary", "bg-success/10", "border-error"
        const match = className.match(/(?:text|bg|border)-(\w+)/);
        if (!match) return '--color-primary';

        const colorName = match[1];
        return `--color-${colorName}`;
    };

    return (
        <div className="space-y-8 relative">
            {/* Línea vertical del Timeline */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-(--text-tertiary) hidden md:block"></div>

            {items.map((item, index) => {
                const cssVarName = getCSSVarName(item.color);
                const hoverColor = getCSSVariable(cssVarName);

                return (
                    <motion.div
                        key={index}
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative md:ml-20 bg-(--bg-secondary) p-6 rounded-xl border ${item.border} shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group`}
                        style={{
                            '--card-color': hoverColor,
                            '--shadow-color': `${hoverColor}40` // 25% opacidad para sombra
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = `0 20px 50px -12px var(--shadow-color), 0 0 30px -5px var(--shadow-color)`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '';
                        }}
                    >
                        {/* Marcador de Icono */}
                        <div className={`hidden md:flex absolute -left-20 top-6 w-12 h-12 rounded-full border-4 border-(--bg-primary) ${item.bg} ${item.color} items-center justify-center shadow-lg z-10 group-hover:scale-110 transition-transform`}>
                            <item.icon size={24} />
                        </div>

                        {/* Encabezado de Tarjeta */}
                        <div className="flex justify-between items-start mb-2">
                            <span className={`text-sm font-bold px-3 py-1 rounded-full ${item.bg} ${item.color} border ${item.border} bg-opacity-30`}>
                                {item.gen}
                            </span>
                            <span className="text-(--text-secondary) text-sm font-mono">{item.eras}</span>
                        </div>

                        {/* Título de Tarjeta - usa color específico en hover del grupo */}
                        <h3 className="text-xl font-bold text-(--text-primary) mb-3 transition-colors group-hover:text-(--card-color)">
                            {item.title}
                        </h3>




                        {/* Descripción de Tarjeta */}
                        <div className="mb-4">
                            {Array.isArray(item.desc) ? (
                                item.desc.map((block, i) => {
                                    if (typeof block === 'string') {
                                        return (
                                            <p key={i} className="text-(--text-secondary) leading-relaxed mb-2 text-justify">
                                                {block.split(/(\*\*.*?\*\*)/g).map((part, j) =>
                                                    part.startsWith('**') && part.endsWith('**')
                                                        ? <strong key={j} className="text-primary font-semibold">{part.slice(2, -2)}</strong>
                                                        : part
                                                )}
                                            </p>
                                        );
                                    }
                                    if (block.type === 'etymology') {
                                        return (
                                            <div key={i} className="bg-primary/5 border-l-4 border-primary p-4 my-4 rounded-r">
                                                <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">Etimología</span>
                                                <p className="text-sm text-(--text-secondary) italic">
                                                    {block.text}
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                })
                            ) : (
                                <p className="text-(--text-secondary) leading-relaxed mb-4">
                                    {item.desc}
                                </p>
                            )}
                        </div>

                        {/* Sección de Ejemplos */}
                        {item.examples && item.examples.length > 0 && (
                            <div className="border-t border-(--text-tertiary)/50 pt-3">
                                <span className="text-xs text-(--text-secondary) uppercase font-bold tracking-wider mr-2">
                                    Ejemplos clave:
                                </span>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {item.examples.map((example, i) => (
                                        <button
                                            key={i}
                                            onClick={() => onExampleClick && onExampleClick(example)}
                                            className="text-xs bg-(--bg-primary) text-(--text-secondary) px-2 py-1 rounded border border-(--text-tertiary) transition-all cursor-pointer text-left hover:bg-[color-mix(in_srgb,var(--card-color)_20%,transparent)] hover:text-(--card-color) hover:border-(--card-color)"
                                        >
                                            {example}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
};

export default Timeline;
