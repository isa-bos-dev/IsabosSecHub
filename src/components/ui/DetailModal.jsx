import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * Componente Modal de Detalle reutilizable - totalmente personalizable
 * @param {boolean} isOpen - Si el modal está abierto
 * @param {function} onClose - Callback para cerrar el modal
 * @param {string} title - Título del modal (opcional)
 * @param {node} headerContent - Contenido personalizado para el encabezado (opcional, reemplaza título)
 * @param {node} children - Contenido principal del modal
 * @param {node} footerContent - Contenido personalizado para el pie (opcional)
 * @param {string} maxWidth - Clase de ancho máximo (por defecto: 'max-w-2xl')
 */
const DetailModal = ({
    isOpen,
    onClose,
    title,
    headerContent,
    children,
    footerContent,
    maxWidth = 'max-w-2xl'
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className={`bg-(--bg-secondary) border border-(--text-tertiary) rounded-2xl ${maxWidth} w-full shadow-2xl overflow-hidden relative`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                {(title || headerContent) && (
                    <div className="bg-(--bg-tertiary) p-6 border-b border-(--text-tertiary) flex justify-between items-start">
                        {headerContent || (
                            <h2 className="text-2xl font-bold text-(--text-primary)">
                                {title}
                            </h2>
                        )}
                        <button
                            onClick={onClose}
                            className="p-2 bg-(--bg-primary) rounded-full text-(--text-secondary) hover:text-(--text-primary) hover:bg-error/20 hover:border-error border border-transparent transition-all cursor-pointer shrink-0 ml-4"
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}

                {/* Body */}
                <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
                    {children}
                </div>

                {/* Footer (optional) */}
                {footerContent && (
                    <div className="bg-(--bg-primary) p-4 border-t border-(--text-tertiary)">
                        {footerContent}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default DetailModal;
