import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useThemeColors } from '../../hooks/useThemeColors';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, options, height = 250 }) => {
    const colors = useThemeColors();

    if (!colors) return <div className="flex items-center justify-center h-full text-sm text-(--text-secondary)">Cargando gráfico...</div>;

    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                titleColor: colors.textPrimary,
                bodyColor: colors.textPrimary,
                backgroundColor: colors.bgPrimary,
                borderColor: colors.textTertiary,
                borderWidth: 1
            }
        },
        scales: {
            x: {
                grid: { color: colors.textTertiary },
                ticks: { color: colors.textSecondary }
            },
            y: {
                grid: { display: false },
                ticks: { color: colors.textSecondary }
            }
        }
    };

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
            <Bar data={data} options={finalOptions} />
        </div>
    );
};

export default BarChart;
