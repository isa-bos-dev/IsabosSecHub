import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { useThemeColors } from '../../hooks/useThemeColors';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const LineChart = ({ data, options, height = 250 }) => {
    const colors = useThemeColors();

    if (!colors) return <div className="flex items-center justify-center h-full text-sm text-(--text-secondary)">Cargando gráfico...</div>;

    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { color: colors.textSecondary }
            },
            tooltip: {
                titleColor: colors.textPrimary,
                bodyColor: colors.textPrimary,
                backgroundColor: colors.bgPrimary,
                borderColor: colors.textTertiary,
                borderWidth: 1
            }
        },
        scales: {
            y: {
                display: false,
                grid: { color: colors.textTertiary },
                ticks: { color: colors.textSecondary }
            },
            x: {
                grid: { color: colors.textTertiary },
                ticks: { color: colors.textSecondary }
            }
        }
    };

    // Mezcla profunda o sobrescritura simple de opciones.
    // Asumimos que las opciones pasadas sobrescriben claves especíicas o usan valores por defecto.

    const finalOptions = {
        ...defaultOptions,
        ...options,
        plugins: {
            ...defaultOptions.plugins,
            ...(options?.plugins || {})
        },
        scales: {
            ...defaultOptions.scales,
            ...(options?.scales || {})
        }
    };

    return (
        <div style={{ height: height, width: '100%', position: 'relative' }}>
            <Line data={data} options={finalOptions} />
        </div>
    );
};

export default LineChart;
