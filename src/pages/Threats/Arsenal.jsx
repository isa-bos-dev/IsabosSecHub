import React from 'react';
import { Terminal, Database, Code, ShieldAlert, Cpu, Hash } from 'lucide-react';
import Card from '../../components/ui/Card';
import Title from '../../components/ui/Title';
import PageHeader from '../../components/ui/PageHeader';
import QuoteBlock from '../../components/ui/QuoteBlock';
import data from './data/arsenal.json';

const iconMap = {
    Terminal,
    Database,
    Hash,
    Code,
    Cpu,
    ShieldAlert
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
    scale: 1.05,
    shadowOpacity: 0.3,
    borderWidth: '4px',
    transitionDuration: '300ms'
};

const Arsenal = () => {
    return (
        <div className="animate-fade-in space-y-8">
            <PageHeader
                title={data.header.title}
                description={data.header.description}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.tools.map((tool) => {
                    const IconComponent = iconMap[tool.icon];
                    const color = colorMap[tool.variant];

                    return (
                        <Card
                            key={tool.id}
                            className="flex flex-col group"
                            style={{
                                borderLeft: `${HOVER_CONFIG.borderWidth} solid ${color}`,
                                transition: `all ${HOVER_CONFIG.transitionDuration} ease-in-out`
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = `0 0 20px color-mix(in srgb, ${color} ${HOVER_CONFIG.shadowOpacity * 100}%, transparent)`;
                                e.currentTarget.style.transform = `scale(${HOVER_CONFIG.scale})`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            <Title level={4} className="mb-3 contents" color={color}>
                                <span className="flex items-center gap-2">
                                    <IconComponent className="w-6 h-6" style={{ color }} />
                                    {tool.name}
                                </span>
                            </Title>
                            <p className="text-sm text-(--text-secondary) mb-4 grow">
                                {tool.description}
                            </p>
                            <div className="flex gap-2 mt-auto flex-wrap">
                                {tool.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 py-1 rounded text-xs font-mono"
                                        style={{
                                            backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
                                            color: color
                                        }}
                                    >
                                        {tag.label}
                                    </span>
                                ))}
                            </div>
                        </Card>
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

export default Arsenal;
