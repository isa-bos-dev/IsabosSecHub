import React from 'react';
import { HardDrive, Network, ShieldAlert, Key, Settings, Lock } from 'lucide-react';
import Card from '../../components/ui/Card';
import Title from '../../components/ui/Title';
import PageHeader from '../../components/ui/PageHeader';
import QuoteBlock from '../../components/ui/QuoteBlock';
import data from './data/infra.json';

const iconMap = {
    HardDrive,
    Network,
    Settings,
    Lock,
    Key,
    ShieldAlert
};

const colorMap = {
    primary: 'var(--color-primary)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    error: 'var(--color-error)',
    secondary: 'var(--color-secondary)'
};

// Configuración del efecto hover (fácil de personalizar)
const HOVER_CONFIG = {
    scale: 1.02,
    iconScale: 1.1,
    shadowOpacity: 0.25,
    borderWidth: '4px',
    transitionDuration: '300ms'
};

const Infra = () => {
    return (
        <div className="animate-fade-in space-y-8">
            <PageHeader
                title={data.header.title}
                description={data.header.description}
            />

            {/* Sección 1: Infraestructura física y de red */}
            <div className="space-y-4">
                {data.physicalThreats.map((threat) => {
                    const IconComponent = iconMap[threat.icon];
                    const color = colorMap[threat.variant];

                    return (
                        <Card
                            key={threat.id}
                            className="flex flex-col md:flex-row items-center md:items-start gap-4 group"
                            style={{
                                borderLeft: `${HOVER_CONFIG.borderWidth} solid transparent`,
                                transition: `all ${HOVER_CONFIG.transitionDuration} ease-in-out`,
                                '--threat-color': color,
                                '--hover-scale': HOVER_CONFIG.scale,
                                '--shadow-opacity': HOVER_CONFIG.shadowOpacity
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderLeftColor = color;
                                e.currentTarget.style.boxShadow = `0 0 20px color-mix(in srgb, ${color} ${HOVER_CONFIG.shadowOpacity * 100}%, transparent)`;
                                e.currentTarget.style.transform = `scale(${HOVER_CONFIG.scale})`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderLeftColor = 'transparent';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            <div
                                className="p-3 rounded-lg shrink-0"
                                style={{
                                    backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
                                    color: color,
                                    transition: `transform ${HOVER_CONFIG.transitionDuration} ease-in-out`
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = `scale(${HOVER_CONFIG.iconScale})`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                <IconComponent size={24} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-(--text-primary) mb-2">{threat.title}</h4>
                                <p className="text-sm text-(--text-secondary) mb-3">
                                    {threat.description}
                                </p>
                                {threat.mitigation && (
                                    <p className="text-sm font-semibold text-success">
                                        Mitigación: <span className="text-(--text-secondary) font-normal">{threat.mitigation}</span>
                                    </p>
                                )}
                                {threat.risk && (
                                    <p className="text-sm font-semibold text-error">
                                        Riesgo: <span className="text-(--text-secondary) font-normal">{threat.risk}</span>
                                    </p>
                                )}
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Sección 2: Directorio activo e identidad */}
            <div className="space-y-4">
                <div className="mb-4">
                    <Title level={2} className="text-(--text-primary)">Identidad y directorio activo</Title>
                    <div className="h-1 w-20 bg-primary rounded mt-1"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.identityThreats.map((threat) => {
                        const IconComponent = iconMap[threat.icon];
                        const color = colorMap[threat.variant];

                        return (
                            <Card
                                key={threat.id}
                                className="group"
                                style={{
                                    borderLeft: `${HOVER_CONFIG.borderWidth} solid ${color}`,
                                    transition: `all ${HOVER_CONFIG.transitionDuration} ease-in-out`,
                                    '--threat-color': color
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = `0 0 20px color-mix(in srgb, ${color} ${HOVER_CONFIG.shadowOpacity * 100}%, transparent)`;
                                    e.currentTarget.style.transform = `scale(${HOVER_CONFIG.scale + 0.03})`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                <Title level={3} className="mb-3" color={color}>
                                    <span className="flex items-center gap-2">
                                        <IconComponent className="w-6 h-6" style={{ color }} />
                                        {threat.title}
                                    </span>
                                </Title>
                                <p className="text-sm text-(--text-secondary) mb-3">
                                    {threat.description}
                                </p>
                                {threat.code && (
                                    <code
                                        className="block p-3 rounded text-sm font-mono border border-white/10 overflow-x-auto bg-(--bg-code) text-white"
                                    >
                                        {threat.code}
                                    </code>
                                )}
                            </Card>
                        );
                    })}

                    {/* Segmentación de red y defensa */}
                    <Card
                        className="group"
                        style={{
                            borderLeft: `${HOVER_CONFIG.borderWidth} solid var(--color-success)`,
                            transition: `all ${HOVER_CONFIG.transitionDuration} ease-in-out`
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = `0 0 20px color-mix(in srgb, var(--color-success) ${HOVER_CONFIG.shadowOpacity * 100}%, transparent)`;
                            e.currentTarget.style.transform = `scale(${HOVER_CONFIG.scale + 0.03})`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        <Title level={3} className="mb-3" color="var(--color-success)">
                            <span className="flex items-center gap-2">
                                <Lock className="w-6 h-6 text-success" />
                                Segmentación y defensa
                            </span>
                        </Title>
                        <ul className="text-sm space-y-3 text-(--text-secondary)">
                            {data.defenses.map((defense, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <span className="text-success text-base">✓</span>
                                    <span>
                                        <strong>{defense.title}:</strong> {defense.description}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>

            <QuoteBlock
                quote={data.quote.text}
                author={data.quote.author}
            />
        </div>
    );
};

export default Infra;
