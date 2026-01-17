import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, Users, Server, Globe, Zap, AlertTriangle } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import BarChart from '../../components/charts/BarChart';
import DoughnutChart from '../../components/charts/DoughnutChart';
import InfoCard from '../../components/ui/InfoCard';
import QuoteBlock from '../../components/ui/QuoteBlock';
import data from './data/dos.json';
import { getCSSVariable, getCSSVariableAsRgba } from '../../utils/colors';

// Se registran escalas específicas (LogarithmicScale) necesarias para esta página, además de las que ya registran los componentes.
import { Chart as ChartJS, CategoryScale, LinearScale, LogarithmicScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, LogarithmicScale, BarElement, Title, Tooltip, Legend, ArcElement);

const DoS = () => {
    // Estado de colores del tema
    const [themeColors, setThemeColors] = React.useState(null);

    React.useEffect(() => {
        setThemeColors({
            primary: getCSSVariable('--color-primary'),
            primaryAlpha: getCSSVariableAsRgba('--color-primary', 0.7),
            secondary: getCSSVariable('--color-secondary'),
            secondaryAlpha: getCSSVariableAsRgba('--color-secondary', 0.7),
            success: getCSSVariable('--color-success'),
            successAlpha: getCSSVariableAsRgba('--color-success', 0.7),
            warning: getCSSVariable('--color-warning'),
            warningAlpha: getCSSVariableAsRgba('--color-warning', 0.7),
            error: getCSSVariable('--color-error'),
            errorAlpha: getCSSVariableAsRgba('--color-error', 0.7),
            textPrimary: getCSSVariable('--text-primary'),
            textSecondary: getCSSVariable('--text-secondary'),
            textTertiary: getCSSVariable('--text-tertiary'),
            bgSecondary: getCSSVariable('--bg-secondary'),
        });
    }, []);

    if (!themeColors) return <div className="animate-pulse h-screen w-full bg-(--bg-primary)"></div>;

    // 1. Gráfico de barras de factores de amplificación
    const barData = {
        labels: data.amplificationChart.labels,
        datasets: [{
            label: data.amplificationChart.datasetLabel,
            data: data.amplificationChart.data,
            backgroundColor: [
                themeColors.primaryAlpha,
                themeColors.warningAlpha,
                themeColors.successAlpha,
                themeColors.errorAlpha,
                themeColors.secondaryAlpha,
            ],
            borderColor: [
                themeColors.primary,
                themeColors.warning,
                themeColors.success,
                themeColors.error,
                themeColors.secondary,
            ],
            borderWidth: 1,
            barPercentage: 0.6,
            categoryPercentage: 0.8
        }]
    };

    const barOptions = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            title: { display: true, text: data.amplificationChart.title, color: themeColors.textPrimary }
        },
        scales: {
            x: {
                type: 'logarithmic',
                min: 10,
                grid: { color: getCSSVariableAsRgba('--text-tertiary', 0.2) },
                ticks: { color: themeColors.textSecondary }
            },
            y: {
                grid: { display: false },
                ticks: { color: themeColors.textPrimary }
            }
        }
    };

    const getColorVar = (colorName) => {
        switch (colorName) {
            case 'primary': return 'var(--color-primary)';
            case 'warning': return 'var(--color-warning)';
            case 'success': return 'var(--color-success)';
            case 'error': return 'var(--color-error)';
            default: return 'var(--text-primary)';
        }
    };

    return (
        <div className="space-y-12 pb-12">
            <PageHeader
                title={data.header.title}
                description={data.header.description}
                gradientFrom="primary"
                gradientTo="primary-alpha-10"
            />

            {/* Entendiendo los vectores */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-1 lg:col-span-2 bg-(--bg-secondary) rounded-xl p-6 border border-(--text-tertiary) shadow-lg">
                    <h3 className="text-xl font-bold text-(--text-primary) mb-6 flex items-center">
                        <Zap className="mr-2" style={{ color: 'var(--color-warning)' }} /> {data.amplificationInfo.title}
                    </h3>
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="flex-1 w-full">
                            <BarChart data={barData} options={barOptions} height={220} />
                        </div>
                        <div className="flex-1 text-(--text-secondary) text-sm space-y-4">
                            <p className="border-b border-(--text-tertiary) pb-2">
                                <strong style={{ color: 'var(--color-warning)' }}>{data.amplificationInfo.howItWorks.label}</strong> {data.amplificationInfo.howItWorks.text}
                            </p>
                            <p>
                                <strong style={{ color: 'var(--color-error)' }}>{data.amplificationInfo.result.label}</strong> {data.amplificationInfo.result.text}
                                <br /><em className="text-(--text-primary)">{data.amplificationInfo.result.stat}</em>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center h-full">
                    <DoughnutChart
                        title={data.vectorsChart.title}
                        labels={data.vectorsChart.labels}
                        dataValues={data.vectorsChart.data}
                        colorVars={['--color-primary', '--color-warning', '--color-success']}
                        centerText="100%"
                        centerSubtext="GLOBAL"
                        legendPosition="right"
                    />
                </div>
            </div>

            {/* Tarjetas: Tipos de DDoS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.attackTypes.map((type, index) => {
                    const Icon = type.icon === 'Activity' ? Activity : (type.icon === 'Server' ? Server : Globe);
                    const cardColor = getColorVar(type.color);

                    return (
                        <InfoCard
                            key={index}
                            title={type.title}
                            description={type.description}
                            icon={Icon}
                            color={cardColor}
                            borderPosition="top"
                            footer={
                                <div
                                    className="p-2 rounded text-xs"
                                    style={{
                                        backgroundColor: 'var(--bg-primary)',
                                        color: `color-mix(in srgb, ${cardColor}, white 20%)`
                                    }}
                                >
                                    <strong>{type.extra.label}:</strong> {type.extra.text}
                                </div>
                            }
                        />
                    );
                })}
            </div>

            {/* Mecánica de botnet */}
            <div className="bg-linear-to-r from-(--bg-primary) to-(--bg-secondary) rounded-xl p-8 border border-(--text-tertiary) relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-(--text-primary)">
                    <Users size={200} />
                </div>
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-(--text-primary) mb-4 flex items-center">
                        <Users className="mr-3" style={{ color: 'var(--color-secondary)' }} /> {data.botnet.title}
                    </h2>
                    <p className="text-(--text-secondary) mb-6 max-w-2xl">
                        {data.botnet.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 text-center items-center">
                        {/* Assuming fixed structure based on original, but using map where possible if strict structure allows */}
                        {/* Since the original had custom connectors, I'll reconstruct it manually mapping to data.botnet.stages */}

                        {/* Fase 1: Pastor de bots */}
                        <div className="md:col-span-1 bg-(--bg-secondary) p-4 rounded-lg border border-(--text-tertiary) z-10 relative">
                            <div className="text-3xl mb-2">{data.botnet.stages[0].emoji}</div>
                            <strong className="text-(--text-primary) block text-sm">{data.botnet.stages[0].name}</strong>
                        </div>

                        {/* Conector 1 */}
                        <div className="hidden md:flex flex-col items-center justify-center">
                            <span className="text-[10px] text-(--text-secondary) font-mono tracking-tighter mb-1">{data.botnet.stages[0].connector}</span>
                            <div className="relative w-full flex items-center justify-center">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-(--text-tertiary) overflow-hidden">
                                    <div className="absolute top-0 left-0 h-full w-1/3 bg-primary animate-[shimmer_2s_infinite]"></div>
                                </div>
                                <span className="text-primary text-xs relative z-10 bg-(--bg-primary) px-1 rounded-full">►</span>
                            </div>
                        </div>

                        {/* Fase 2: Servidor C&C */}
                        <div className="md:col-span-1 bg-(--bg-secondary) p-4 rounded-lg border border-(--text-tertiary) z-10 relative">
                            <div className="text-3xl mb-2">{data.botnet.stages[1].emoji}</div>
                            <strong className="text-(--text-primary) block text-sm">{data.botnet.stages[1].name}</strong>
                        </div>

                        {/* Conector 2 */}
                        <div className="hidden md:flex flex-col items-center justify-center">
                            <span className="text-[10px] text-(--text-secondary) font-mono tracking-tighter mb-1">{data.botnet.stages[1].connector}</span>
                            <div className="relative w-full flex items-center justify-center">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-(--text-tertiary) overflow-hidden">
                                    <div className="absolute top-0 left-0 h-full w-1/3 bg-primary animate-[shimmer_2s_infinite_0.5s]"></div>
                                </div>
                                <span className="text-primary text-xs relative z-10 bg-(--bg-primary) px-1 rounded-full">►</span>
                            </div>
                        </div>

                        {/* Fase 3: Zombies */}
                        <div className="md:col-span-1 bg-(--bg-secondary) p-4 rounded-lg border border-(--text-tertiary) z-10 relative">
                            <div className="text-3xl mb-2">{data.botnet.stages[2].emoji}</div>
                            <strong className="text-(--text-primary) block text-sm">{data.botnet.stages[2].name}</strong>
                        </div>

                        {/* Conector 3 */}
                        <div className="hidden md:flex flex-col items-center justify-center">
                            <span className="text-[10px] font-mono tracking-tighter text-error font-bold mb-1">{data.botnet.stages[2].connector}</span>
                            <div className="relative w-full flex items-center justify-center">
                                <div
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] overflow-hidden"
                                    style={{ backgroundColor: 'color-mix(in srgb, var(--color-error), black 70%)' }}
                                >
                                    <div className="absolute top-0 left-0 h-full w-1/3 bg-error animate-[shimmer_1s_infinite]"></div>
                                </div>
                                <span className="text-error text-xs relative z-10 bg-(--bg-primary) px-1 rounded-full">►►►</span>
                            </div>
                        </div>

                        {/* Fase 4: Objetivo */}
                        <div
                            className="md:col-span-1 p-4 rounded-lg border z-10 relative animate-pulse"
                            style={{
                                backgroundColor: 'color-mix(in srgb, var(--color-error), transparent 90%)',
                                borderColor: 'color-mix(in srgb, var(--color-error), transparent 50%)',
                                boxShadow: '0 0 15px color-mix(in srgb, var(--color-error), transparent 70%)'
                            }}
                        >
                            <div className="text-3xl mb-2">{data.botnet.stages[3].emoji}</div>
                            <strong className="text-error block text-sm">{data.botnet.stages[3].name}</strong>
                        </div>

                    </div>
                </div>
            </div>

            {data.quote && (
                <QuoteBlock quote={data.quote.text} author={data.quote.author} className="mt-12" />
            )}
        </div>
    );
};

export default DoS;
