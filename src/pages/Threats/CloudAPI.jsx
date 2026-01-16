import React from 'react';
import { ServerCog, Box, Globe } from 'lucide-react';
import InfoCard from '../../components/ui/InfoCard';
import PageHeader from '../../components/ui/PageHeader';
import QuoteBlock from '../../components/ui/QuoteBlock';
import data from './data/cloudapi.json';

const iconMap = {
    ServerCog,
    Box,
    Globe
};

const getColorVar = (colorName) => {
    const colorMap = {
        secondary: 'var(--color-secondary)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        success: 'var(--color-success)',
        primary: 'var(--color-primary)'
    };
    return colorMap[colorName] || 'var(--color-primary)';
};

const CloudAPI = () => {
    return (
        <div className="animate-fade-in space-y-8">
            <PageHeader
                title={data.header.title}
                description={data.header.description}
            />

            {/* Tarjetas de amenazas cloud & API */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.threats.map((threat) => {
                    const IconComponent = iconMap[threat.icon];
                    const cardColor = getColorVar(threat.variant);

                    return (
                        <InfoCard
                            key={threat.id}
                            title={threat.title}
                            description={threat.description}
                            icon={IconComponent}
                            color={cardColor}
                            borderPosition="top"
                            footer={
                                <>
                                    {/* Ejemplo de código */}
                                    {threat.code && (
                                        <div className="mb-3">
                                            <code className="block p-3 rounded text-xs font-mono bg-(--bg-code) text-white border border-white/10 shadow-inner tracking-wider overflow-x-auto">
                                                {threat.code}
                                            </code>
                                        </div>
                                    )}

                                    {/* Múltiples ejemplos */}
                                    {threat.examples && (
                                        <div className="flex flex-col space-y-2 mb-3">
                                            {threat.examples.map((example, idx) => {
                                                const exampleColor = getColorVar(example.variant);
                                                return (
                                                    <code
                                                        key={idx}
                                                        className="block p-2 rounded text-xs font-mono bg-(--bg-code) border border-white/10"
                                                        style={{ color: exampleColor }}
                                                    >
                                                        {example.code}
                                                    </code>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Impacto */}
                                    {threat.impact && (
                                        <div
                                            className="p-3 rounded text-xs leading-relaxed"
                                            style={{
                                                backgroundColor: 'var(--bg-primary)',
                                                color: `color-mix(in srgb, ${cardColor}, white 20%)`
                                            }}
                                        >
                                            <strong>Impacto:</strong> {threat.impact}
                                        </div>
                                    )}
                                </>
                            }
                        />
                    );
                })}
            </div>

            <QuoteBlock
                quote={data.quote.text}
                author={data.quote.author}
            />
        </div>
    );
};

export default CloudAPI;
