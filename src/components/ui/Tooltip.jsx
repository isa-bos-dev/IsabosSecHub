import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Tooltip = ({
    children,
    content,
    borderColor
}) => {
    const [isVisible, setIsVisible] = useState(false);

    // Calcular el color del borde si se proporciona, o usar variable css
    const effectiveBorderColor = borderColor || 'var(--text-tertiary)';

    return (
        <div
            className="relative flex items-center justify-center"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full right-0 mt-3 px-3 py-2 rounded-lg z-50 whitespace-nowrap shadow-xl backdrop-blur-md border border-solid"
                        style={{
                            backgroundColor: 'rgba(15, 23, 42, 0.9)', // Valor oscuro por defecto tipo Slate-900 con transparencia
                            borderWidth: '1px',
                            borderColor: effectiveBorderColor,
                            color: '#ffffff'
                        }}
                    >
                        {/* Pequeño triángulo/flecha apuntando arriba si se quisiera, 
                            pero por simplicidad y estética minimalista a veces se omite. 
                            Dejaremos el diseño limpio tipo 'floating' que pidió el usuario.
                        */}

                        {/* Contenido del tooltip, puede ser nodo o texto */}
                        <div className="text-xs font-semibold">
                            {content}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tooltip;
