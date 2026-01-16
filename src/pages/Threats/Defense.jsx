import React from 'react';
import { Shield, Lock, Cloud, Database, Check } from 'lucide-react';
import Card from '../../components/ui/Card';
import Title from '../../components/ui/Title';
import PageHeader from '../../components/ui/PageHeader';
import QuoteBlock from '../../components/ui/QuoteBlock';
import Accordion from '../../components/ui/Accordion';
import data from './data/defense.json';

const iconMap = {
    Shield,
    Lock,
    Cloud,
    Database
};

const colorMap = {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    error: 'var(--color-error)',
    accent: 'var(--color-accent)'
};

// Configuración del efecto hover
const HOVER_CONFIG = {
    scale: 1.02,
    shadowOpacity: 0.25,
    transitionDuration: '300ms'
};

const Defense = () => {
    return (
        <div className="animate-fade-in space-y-8">
            <PageHeader
                title={data.header.title}
                description={data.header.description}
            />

            {/* Fortalecimiento (hardening) contra ataques ciegos */}
            <Card
                className="group"
                style={{
                    borderLeft: `4px solid var(--color-error)`,
                    transition: `all ${HOVER_CONFIG.transitionDuration} ease-in-out`
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 20px color-mix(in srgb, var(--color-error) ${HOVER_CONFIG.shadowOpacity * 100}%, transparent)`;
                    e.currentTarget.style.transform = `scale(${HOVER_CONFIG.scale})`;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                }}
            >
                <Title level={3} className="mb-4" color="var(--color-error)">
                    <span className="flex items-center gap-2">
                        <Shield className="text-error w-6 h-6" />
                        {data.hardening.title}
                    </span>
                </Title>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.hardening.measures.map((measure, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className="mt-1 p-1 rounded-full bg-success/20 text-success shrink-0">
                                <Check size={14} strokeWidth={3} />
                            </div>
                            <div>
                                <h5 className="font-bold text-(--text-primary) text-sm mb-1">{measure.title}</h5>
                                <p className="text-sm text-(--text-secondary)">
                                    {measure.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Medidas estratégicas - Acordeón interactivo */}
            <div className="space-y-4">
                <Title level={3} className="text-(--text-primary)">Medidas estratégicas</Title>

                <Accordion
                    items={data.strategies}
                    colorMap={colorMap}
                    iconMap={iconMap}
                    hoverConfig={{
                        shadowOpacity: HOVER_CONFIG.shadowOpacity,
                        transitionDuration: HOVER_CONFIG.transitionDuration
                    }}
                />
            </div>

            <QuoteBlock
                quote={data.quote.text}
                author={data.quote.author}
            />
        </div>
    );
};

export default Defense;
