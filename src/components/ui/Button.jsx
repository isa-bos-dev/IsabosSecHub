import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    className = "",
    icon: Icon,
    disabled = false,
    type = 'button',
    ...props
}) => {

    const baseStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '0.5rem', // equivalencia a rounded-lg
        fontWeight: '600',
        transition: 'all 0.2s',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        border: '1px solid transparent',
        fontFamily: 'var(--font-primary)'
    };

    const variants = {
        primary: {
            backgroundColor: 'var(--color-primary-alpha-10)', // var(--color-primary) with opacity
            color: 'var(--color-primary)',
            borderColor: 'var(--color-primary)',
            hover: {
                backgroundColor: 'var(--color-primary)',
                color: 'var(--white-color)' // Texto blanco al hacer hover
            }
        },
        secondary: {
            backgroundColor: 'var(--color-secondary-alpha-10)', // var(--color-secondary) with opacity
            color: 'var(--color-secondary)',
            borderColor: 'var(--color-secondary)',
            hover: {
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--white-color)'
            }
        },
        outline: {
            backgroundColor: 'transparent',
            color: 'var(--text-secondary)',
            borderColor: 'var(--text-tertiary)',
            hover: {
                borderColor: 'var(--text-primary)',
                color: 'var(--text-primary)'
            }
        },
        ghost: {
            backgroundColor: 'transparent',
            color: 'var(--text-secondary)',
            borderColor: 'transparent',
            hover: {
                backgroundColor: 'var(--bg-hover)',
                color: 'var(--text-primary)'
            }
        },
        danger: {
            backgroundColor: 'var(--color-error-alpha-10)',
            color: 'var(--color-error)',
            borderColor: 'var(--color-error)',
            hover: {
                backgroundColor: 'var(--color-error)',
                color: 'var(--white-color)'
            }
        }
    };

    const sizes = {
        sm: { padding: '0.375rem 0.75rem', fontSize: '0.75rem' }, // py-1.5 px-3 text-xs
        md: { padding: '0.5rem 1rem', fontSize: '0.875rem' },     // py-2 px-4 text-sm
        lg: { padding: '0.75rem 1.5rem', fontSize: '1rem' }        // py-3 px-6 text-base
    };

    // Merge styles
    const appliedVariant = variants[variant] || variants.primary;
    const appliedSize = sizes[size] || sizes.md;

    const combinedStyles = {
        ...baseStyles,
        ...appliedSize,
        backgroundColor: appliedVariant.backgroundColor,
        color: appliedVariant.color,
        borderColor: appliedVariant.borderColor
    };

    return (
        <motion.button
            whileHover={!disabled ? { scale: 1.02, ...appliedVariant.hover } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={className}
            style={combinedStyles}
            {...props}
        >
            {Icon && <Icon className={`w-4 h-4 ${children ? 'mr-2' : ''}`} />}
            {children}
        </motion.button>
    );
};

export default Button;
