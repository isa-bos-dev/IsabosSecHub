import React from 'react';

const Title = ({
    children,
    level = 1,
    align = 'left',
    color = 'primary', // primary (var), secondary (var), text (var--text-primary)
    className = "",
    subtitle = null,
    style = {}
}) => {

    const Tag = `h${level}`;

    const sizes = {
        1: '2.25rem', // 4xl
        2: '1.875rem', // 3xl
        3: '1.5rem',   // 2xl
        4: '1.25rem',  // xl
        5: '1.125rem', // lg
        6: '1rem'      // base
    };

    const colors = {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        text: 'var(--text-primary)',
        white: 'var(--white-color)',
        muted: 'var(--text-secondary)'
    };

    const computedStyle = {
        fontSize: sizes[level] || sizes[1],
        // Si la clave de color existe en el mapa de colores, usarla. Sino, asumir que es un valor directo (var CSS o hex).
        color: colors[color] || color,
        textAlign: align,
        fontWeight: level <= 2 ? '800' : '700',
        lineHeight: 1.2,
        marginBottom: subtitle ? '0.5rem' : '1.5rem',
        fontFamily: 'var(--font-primary)',
        ...style
    };

    return (
        <div className={`mb-6 ${className}`}>
            <Tag style={computedStyle}>
                {children}
            </Tag>
            {subtitle && (
                <p style={{
                    color: 'var(--text-secondary)',
                    textAlign: align,
                    fontSize: '0.875rem',
                    maxWidth: align === 'center' ? '42rem' : '100%',
                    margin: align === 'center' ? '0 auto' : '0'
                }}>
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default Title;
