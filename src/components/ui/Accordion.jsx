import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Componente de acordeón reutilizable con ítems codificados por color
 * @param {Array} items - Array de ítems del acordeón con { id, title, icon, variant, content }
 * @param {Object} colorMap - Mapa de nombres de variantes a variables de color CSS
 * @param {Object} iconMap - Mapa de nombres de iconos a componentes de icono
 * @param {number} defaultOpen - Índice del ítem abierto por defecto (opcional)
 * @param {Object} hoverConfig - Configuración para efectos de hover (opcional)
 */
const Accordion = ({
    items = [],
    colorMap = {},
    iconMap = {},
    defaultOpen = null,
    hoverConfig = {
        shadowOpacity: 0.25,
        transitionDuration: '300ms'
    }
}) => {
    const [openItem, setOpenItem] = useState(defaultOpen);

    const toggleItem = (index) => {
        setOpenItem(openItem === index ? null : index);
    };

    return (
        <div className="space-y-4">
            {items.map((item, index) => {
                const IconComponent = iconMap[item.icon];
                const color = colorMap[item.variant] || 'var(--color-primary)';
                const isOpen = openItem === index;

                return (
                    <div
                        key={item.id || index}
                        className="rounded-xl overflow-hidden border transition-all duration-300"
                        style={{
                            borderColor: isOpen ? color : 'var(--text-tertiary)',
                            backgroundColor: 'var(--bg-tertiary)',
                            boxShadow: isOpen ? `0 0 20px color-mix(in srgb, ${color} ${hoverConfig.shadowOpacity * 100}%, transparent)` : 'none',
                            transition: `all ${hoverConfig.transitionDuration} ease-in-out`
                        }}
                    >
                        {/* Encabezado del acordeón */}
                        <button
                            onClick={() => toggleItem(index)}
                            className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-(--bg-secondary)/50 focus:outline-none cursor-pointer transition-colors"
                            aria-expanded={isOpen}
                            aria-controls={`accordion-content-${item.id || index}`}
                        >
                            <span className="flex items-center gap-3 font-bold text-(--text-primary)">
                                {IconComponent && (
                                    <IconComponent className="w-5 h-5" style={{ color }} />
                                )}
                                {item.title}
                            </span>
                            <span
                                className="transition-transform duration-300"
                                style={{
                                    color,
                                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                                }}
                            >
                                {isOpen ? <ChevronUp /> : <ChevronDown />}
                            </span>
                        </button>

                        {/* Contenido del acordeón */}
                        <div
                            id={`accordion-content-${item.id || index}`}
                            className="px-6 overflow-hidden transition-all duration-300 ease-in-out"
                            style={{
                                maxHeight: isOpen ? '200px' : '0',
                                paddingTop: isOpen ? '1rem' : '0',
                                paddingBottom: isOpen ? '1rem' : '0',
                                borderTop: isOpen ? `1px solid var(--text-tertiary)` : 'none',
                                backgroundColor: 'var(--bg-primary)'
                            }}
                        >
                            <div className="text-sm text-(--text-secondary) leading-relaxed">
                                {item.content}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Accordion;
