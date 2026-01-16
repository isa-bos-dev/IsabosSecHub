import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getCSSVariable, getCSSVariableAsRgba } from '../../utils/colors';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Componente de Gráfico de Donut reutilizable con texto central y leyenda personalizada
 * @param {Array} labels - Etiquetas del gráfico
 * @param {Array} dataValues - Valores de datos del gráfico
 * @param {Array} colorVars - Nombres de variables CSS para colores (ej: ['--color-primary', '--color-secondary'])
 * @param {string} centerText - Texto principal en el centro del gráfico
 * @param {string} centerSubtext - Subtexto debajo del texto central
 * @param {string} title - Título del gráfico (opcional)
 * @param {object} icon - Componente de icono Lucide (opcional)
 */
const DoughnutChart = ({
    labels,
    dataValues,
    colorVars,
    centerText,
    centerSubtext,
    title,
    icon: Icon,
    legendPosition = 'right' // 'right' | 'bottom'
}) => {
    // Generate colors from CSS variables
    const backgroundColors = colorVars.map(varName => getCSSVariableAsRgba(varName, 0.6));
    const borderColors = colorVars.map(varName => getCSSVariableAsRgba(varName, 1));

    const data = {
        labels,
        datasets: [
            {
                label: '# de Incidentes (Relativo)',
                data: dataValues,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 2,
                hoverOffset: 10
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: getCSSVariable('--bg-primary'),
                titleColor: getCSSVariable('--text-primary'),
                bodyColor: getCSSVariable('--text-secondary'),
                padding: 12,
                cornerRadius: 8,
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 13 }
            }
        },
        cutout: '60%',
        elements: { arc: { borderWidth: 0 } }
    };

    // Determine layout classes based on legend position
    const containerClasses = legendPosition === 'bottom'
        ? "flex flex-col items-center justify-center gap-6"
        : "flex flex-col md:flex-row items-center justify-center gap-8";

    return (
        <div className="bg-(--bg-secondary) rounded-2xl p-6 shadow-2xl border border-(--text-tertiary) backdrop-blur-sm bg-opacity-80 h-full flex flex-col justify-center">
            {title && (
                <h3 className="text-xl font-bold text-(--text-primary) mb-6 flex items-center justify-center text-center">
                    {Icon && <Icon className="mr-2 text-warning" />}
                    {title}
                </h3>
            )}
            <div className={containerClasses}>
                {/* Chart with Center Text */}
                <div className="relative h-48 w-48 shrink-0">
                    <Doughnut data={data} options={options} />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center mt-2">
                            <span className="block text-3xl font-bold text-(--text-primary) leading-none">
                                {centerText}
                            </span>
                            <span className="text-[10px] text-(--text-tertiary) uppercase tracking-widest font-bold block mt-1">
                                {centerSubtext}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Custom Legend */}
                <div className={`flex flex-col space-y-2 ${legendPosition === 'bottom' ? 'w-full px-4' : ''}`}>
                    {labels.map((label, index) => (
                        <div key={index} className="flex items-center group cursor-default justify-center md:justify-start">
                            <span
                                className="w-3 h-3 rounded-full mr-2 shrink-0 ring-2 ring-transparent group-hover:ring-white/20 transition-all"
                                style={{
                                    backgroundColor: backgroundColors[index],
                                    borderColor: borderColors[index],
                                    borderWidth: 1
                                }}
                            ></span>
                            <span className="text-(--text-secondary) text-xs font-medium group-hover:text-(--text-primary) transition-colors text-left">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoughnutChart;
