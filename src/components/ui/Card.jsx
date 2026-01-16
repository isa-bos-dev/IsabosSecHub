import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
    children,
    className = "",
    hoverEffect = false,
    noPadding = false,
    style = {},
    hoverShadow,       // Desestructurar para evitar filtrado al DOM
    hoverBorderColor,  // Desestructurar para evitar filtrado al DOM
    hoverColor,        // Desestructurar para evitar filtrado al DOM
    ...props
}) => {

    // Estilos base heredando de variables
    const baseStyles = {
        backgroundColor: 'var(--bg-glass)',
        borderColor: 'var(--text-tertiary)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '0.75rem', // rounded-xl
        backdropFilter: 'blur(12px)',
        boxShadow: 'var(--shadow-card)',
        padding: noPadding ? '0' : '2rem', // p-8 default
        ...style
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    // Auto-habilitar efecto hover si se proveen props de hover específicos
    const shouldEnableHover = hoverEffect || !!hoverShadow || !!hoverBorderColor || !!hoverColor;

    // Determinar valores para estado hover
    const targetShadow = hoverShadow || (hoverColor
        ? `0 20px 40px ${hoverColor.replace('1)', '0.2)').replace(')', ', 0.2)')}`
        : 'var(--shadow-hover)');

    const targetBorder = hoverBorderColor || (hoverColor || undefined);

    if (shouldEnableHover) {
        return (
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                whileHover={{
                    y: -5,
                    boxShadow: targetShadow,
                    borderColor: targetBorder
                }}
                transition={{ duration: 0.3 }}
                className={`glass-card ${className}`}
                style={baseStyles}
                {...props}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <div
            className={`glass-card ${className}`}
            style={baseStyles}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
