import { useState } from 'react';

export const useThemeColors = () => {
    const [colors] = useState(() => {
        if (typeof window === 'undefined') return null;
        const style = getComputedStyle(document.documentElement);
        return {
            primary: style.getPropertyValue('--color-primary').trim(),
            primaryAlpha: style.getPropertyValue('--color-primary-alpha-10').trim(),
            secondary: style.getPropertyValue('--color-secondary').trim(),
            secondaryAlpha: style.getPropertyValue('--color-secondary-alpha-10').trim(),
            accent: style.getPropertyValue('--color-accent').trim(),

            success: style.getPropertyValue('--color-success').trim(),
            warning: style.getPropertyValue('--color-warning').trim(),
            error: style.getPropertyValue('--color-error').trim(),

            bgPrimary: style.getPropertyValue('--bg-primary').trim(),
            bgSecondary: style.getPropertyValue('--bg-secondary').trim(),
            bgTertiary: style.getPropertyValue('--bg-tertiary').trim(),

            textPrimary: style.getPropertyValue('--text-primary').trim(),
            textSecondary: style.getPropertyValue('--text-secondary').trim(),
            textTertiary: style.getPropertyValue('--text-tertiary').trim(),
        };
    });

    return colors;
};
