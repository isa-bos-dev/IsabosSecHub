import React from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { getCSSVariable, getCSSVariableAsRgba } from '../../utils/colors';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

/**
 * Componente Radar Chart para visualizar métricas de Protocolo vs Seguridad.
 * Se adapta automáticamente a las variables de tema CSS actuales.
 * 
 * @param {Object} data - Estructura de datos que coincide con los requisitos de Chart.js o la estructura simplificada
 *                        de ataques.json. Esperamos el objeto de datos crudo aquí.
 * @param {string} title - Título opcional para mostrar sobre el gráfico
 */
const RadarChart = ({ data, title }) => {
    // Estado de colores de tema dinámicos
    const [themeColors, setThemeColors] = React.useState(null);

    React.useEffect(() => {
        // Leer variables CSS una vez montado el componente usando utilidades compartidas
        setThemeColors({
            error: getCSSVariable('--color-error'),
            errorAlpha: getCSSVariableAsRgba('--color-error', 0.4),
            secondary: getCSSVariable('--color-secondary'),
            secondaryAlpha: getCSSVariableAsRgba('--color-secondary', 0.4),
            textPrimary: getCSSVariable('--text-primary'),
            textSecondary: getCSSVariable('--text-secondary'),
            textTertiary: getCSSVariable('--text-tertiary'),
            bgSecondary: getCSSVariable('--bg-secondary'),
            bgTertiary: getCSSVariableAsRgba('--text-tertiary', 0.4)
        });
    }, []);

    // Estado de carga
    if (!themeColors) return <div className="animate-pulse h-[350px] w-full bg-(--bg-secondary)/10 rounded-xl"></div>;

    // Preparar datos del gráfico usando colores del tema
    const radarData = {
        labels: data.labels,
        datasets: [
            {
                label: data.datasets[0].label,
                data: data.datasets[0].data,
                backgroundColor: themeColors.errorAlpha,
                borderColor: themeColors.error,
                borderWidth: 2,
                pointBackgroundColor: themeColors.error,
            },
            {
                label: data.datasets[1].label,
                data: data.datasets[1].data,
                backgroundColor: themeColors.secondaryAlpha,
                borderColor: themeColors.secondary,
                borderWidth: 2,
                pointBackgroundColor: themeColors.secondary,
            },
        ],
    };

    const radarOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: themeColors.textSecondary,
                    font: { family: 'var(--font-mono)' }
                }
            },
            tooltip: {
                backgroundColor: themeColors.bgSecondary,
                titleColor: themeColors.textPrimary,
                bodyColor: themeColors.textSecondary,
                borderColor: themeColors.textTertiary,
                borderWidth: 1
            }
        },
        scales: {
            r: {
                min: 0,
                max: 10,
                ticks: { display: false, stepSize: 2 },
                angleLines: { color: themeColors.textTertiary },
                grid: { color: themeColors.bgTertiary },
                pointLabels: { color: themeColors.textSecondary, font: { size: 12, family: 'var(--font-mono)' } }
            }
        }
    };

    return (
        <div className="bg-(--bg-primary) p-6 rounded-2xl shadow-2xl border border-(--text-tertiary) flex flex-col items-center justify-center">
            {title && (
                <h3 className="text-center text-(--text-tertiary) text-sm mb-4 uppercase tracking-widest font-bold">
                    {title}
                </h3>
            )}
            <div className="h-[350px] w-full flex justify-center items-center">
                <Radar data={radarData} options={radarOptions} />
            </div>
        </div>
    );
};

export default RadarChart;
