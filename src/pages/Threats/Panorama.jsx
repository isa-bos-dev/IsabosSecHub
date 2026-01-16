import React from 'react';
import { Database, Shield, Cpu } from 'lucide-react';
import InfoCard from '../../components/ui/InfoCard';
import Card from '../../components/ui/Card';
import Title from '../../components/ui/Title';
import PageHeader from '../../components/ui/PageHeader';
import QuoteBlock from '../../components/ui/QuoteBlock';
import { useThemeColors } from '../../hooks/useThemeColors';
import LineChart from '../../components/charts/LineChart';
import BarChart from '../../components/charts/BarChart';
import data from './data/panorama.json';

const Panorama = () => {
    const colors = useThemeColors();

    if (!colors) return <div className="p-8 text-center text-(--text-secondary)">Cargando visualizaciones...</div>;

    // Construcción de Datos del Gráfico
    const evolutionChartData = {
        labels: data.evolutionChart.labels,
        datasets: [{
            label: data.evolutionChart.datasets[0].label,
            data: data.evolutionChart.datasets[0].data,
            borderColor: colors.primary,
            backgroundColor: colors.primaryAlpha,
            tension: 0.4,
            fill: true
        },
        {
            label: data.evolutionChart.datasets[1].label,
            data: data.evolutionChart.datasets[1].data,
            borderColor: colors.secondary,
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            tension: 0.4
        }]
    };

    const auditSpeedChartData = {
        labels: data.auditChart.labels,
        datasets: [{
            label: 'Esfuerzo Temporal (Relativo)',
            data: data.auditChart.data,
            backgroundColor: [
                colors.warning + '80', // Hack Hex + alpha suele funcionar si hex tiene 6 dígitos. Si el tema proporciona cadenas rgba podría fallar. Warning es #facc15 así que funciona.
                colors.success + '80',
                colors.error + '80',
                colors.primary + '80'
            ],
            borderColor: [colors.warning, colors.success, colors.error, colors.primary],
            borderWidth: 1
        }]
    };

    return (
        <div className="animate-fade-in space-y-8">
            <PageHeader
                title={data.header.title}
                description={data.header.description}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.stats.map((stat, index) => {
                    const icons = [Database, Shield, Cpu];
                    const colorVar =
                        stat.colorVariant === 'primary' ? 'var(--color-primary)' :
                            stat.colorVariant === 'secondary' ? 'var(--color-secondary)' :
                                stat.colorVariant === 'success' ? 'var(--color-success)' : 'var(--color-primary)';

                    return (
                        <InfoCard
                            key={index}
                            title={stat.title}
                            description={stat.description}
                            icon={icons[index]}
                            color={colorVar}
                            borderPosition="top"
                            className="bg-black/20 h-full"
                        />
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="flex flex-col items-center text-center">
                    <Title level={3} align="center" subtitle={data.evolutionChart.subtitle}>{data.evolutionChart.title}</Title>
                    <div className="w-full relative">
                        <LineChart data={evolutionChartData} height={256} />
                    </div>
                </Card>
                <Card>
                    <Title level={3} subtitle={data.concepts.subtitle}>{data.concepts.title}</Title>
                    <div className="flex flex-col gap-4 mt-2">
                        {data.concepts.items.map((item, idx) => (
                            <div key={idx} className="grid grid-cols-[1fr] sm:grid-cols-[160px_1fr] items-start gap-x-4 gap-y-1">
                                <div className="font-bold text-(--text-primary) flex items-center shrink-0">
                                    <span className="text-primary mr-2 opacity-80">▸</span>
                                    {item.label}
                                </div>
                                <div className="text-sm text-(--text-secondary) leading-relaxed">
                                    {item.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <Card className="flex flex-col items-center text-center mt-6">
                <Title level={3} align="center">{data.auditChart.title}</Title>
                <div className="w-full relative">
                    <BarChart
                        data={auditSpeedChartData}
                        height={256}
                        options={{
                            indexAxis: 'y',
                            scales: {
                                x: {
                                    title: { display: true, text: 'Tiempo/Peticiones', color: colors.textSecondary },
                                }
                            }
                        }}
                    />
                </div>
                <p className="text-[10px] mt-2 text-(--text-secondary)">
                    {data.auditChart.footer}
                </p>
            </Card>

            <QuoteBlock
                quote={data.quote.text}
                author={data.quote.author}
            />
        </div>
    );
};

export default Panorama;
