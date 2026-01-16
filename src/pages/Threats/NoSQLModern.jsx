import React, { useState } from 'react';
import { Database, Server, FolderOpen, FlaskConical } from 'lucide-react';
import Card from '../../components/ui/Card';
import Title from '../../components/ui/Title';
import PageHeader from '../../components/ui/PageHeader';
import QuoteBlock from '../../components/ui/QuoteBlock';
import data from './data/nosql.json';

const iconMap = {
    Database,
    Server,
    FolderOpen,
    FlaskConical
};

// Mapear nombres de variantes a clases específicas de Tailwind para las pestañas
const tabVariants = {
    success: 'bg-success/10 text-success border-success shadow-[0_0_15px_rgba(74,222,128,0.2)]',
    error: 'bg-error/10 text-error border-error shadow-[0_0_15px_rgba(252,49,49,0.2)]',
    warning: 'bg-warning/10 text-warning border-warning shadow-[0_0_15px_rgba(250,204,21,0.2)]',
    primary: 'bg-primary/10 text-primary border-primary shadow-[0_0_15px_rgba(0,176,240,0.2)]'
};

// Mapear nombres de variantes a colores de texto para el icono/encabezado
const colorVars = {
    success: 'var(--color-success)',
    error: 'var(--color-error)',
    warning: 'var(--color-warning)',
    primary: 'var(--color-primary)'
};

const NoSQLModern = () => {
    const [activeTab, setActiveTab] = useState('nosql-mongo');
    // Encontrar el objeto de pestaña activa para obtener su variante
    const activeTabObj = data.tabs.find(t => t.id === activeTab);
    const variant = activeTabObj?.variant || 'primary';

    const currentData = data.content[activeTab];
    const IconComponent = iconMap[currentData.icon] || Database;

    const renderContent = () => {
        switch (activeTab) {
            case 'nosql-mongo':
            case 'nosql-redis-graphql':
                return (
                    <div className="space-y-6">
                        {currentData.description && <p className="text-sm text-(--text-primary)">{currentData.description}</p>}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {currentData.cards.map((card, idx) => (
                                <div key={idx} className={`p-5 rounded-xl bg-(--bg-secondary) border-l-4 border-l-${card.borderColor || 'primary'} shadow-sm relative flex flex-col h-full hover:bg-(--bg-hover) transition-colors duration-300`}>
                                    {card.badge && (
                                        <span className={`absolute top-0 right-0 bg-${variant} text-(--bg-primary) text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg`}>
                                            {card.badge}
                                        </span>
                                    )}
                                    <h4 className={`font-bold text-${card.borderColor || 'primary'} mb-2`}>{card.title}</h4>
                                    {card.description && <p className="text-sm text-(--text-secondary) mb-3 grow">{card.description}</p>}

                                    {card.code && (
                                        <div className="bg-(--bg-code) p-3 rounded text-xs font-mono mb-2 overflow-x-auto text-white border border-white/10 shadow-inner tracking-wider">
                                            {card.code}
                                        </div>
                                    )}

                                    {card.list && (
                                        <ul className="text-xs space-y-2 text-(--text-secondary)">
                                            {card.list.map((item, lIdx) => (
                                                <li key={lIdx}>
                                                    <strong className="text-(--text-primary) block mb-1">{item.label}</strong>
                                                    {item.text}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {card.footer && <p className="text-xs text-(--text-secondary) mt-3 font-mono border-t border-white/5 pt-2">{card.footer}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'nosql-traversal':
                return (
                    <div className="space-y-6">
                        <p className="text-sm text-(--text-primary)">{currentData.description}</p>
                        {currentData.examples.map((ex, idx) => (
                            <div key={idx} className="p-6 rounded-xl bg-(--bg-secondary) border border-(--text-tertiary) shadow-sm hover:border-warning/50 transition-colors">
                                <h4 className="font-bold text-warning mb-4">{ex.label}</h4>
                                <div className="flex flex-col md:flex-row items-center gap-4 bg-(--bg-primary)/50 p-4 rounded-lg border border-white/5">
                                    <div className="flex-1 w-full">
                                        <div className="text-[10px] text-(--text-tertiary) mb-1 uppercase tracking-wide">Input</div>
                                        <div className="font-mono text-xs text-white bg-(--bg-code) p-2 rounded border border-white/10 shadow-inner tracking-wider">{ex.input}</div>
                                    </div>
                                    <div className="text-(--text-tertiary)">➜</div>
                                    <div className="flex-1 w-full">
                                        <div className="text-[10px] text-(--text-tertiary) mb-1 uppercase tracking-wide">Output (Attack)</div>
                                        <div className="font-mono text-xs text-error bg-error/10 border border-error/20 p-2 rounded">{ex.output}</div>
                                    </div>
                                </div>
                                <p className="text-xs text-(--text-secondary) mt-4 italic">{ex.description}</p>
                            </div>
                        ))}
                    </div>
                );

            case 'nosql-lab':
                return (
                    <div className="space-y-6">
                        <p className="text-sm text-(--text-primary)">{currentData.description}</p>
                        <div className="grid grid-cols-1 gap-6">
                            {currentData.scenarios.map((scenario, idx) => (
                                <div key={idx} className="p-5 rounded-xl bg-(--bg-secondary) border-l-4 border-l-primary shadow-sm">
                                    <h4 className="font-bold text-primary mb-3">{scenario.title}</h4>
                                    {scenario.description && <p className="text-sm text-(--text-secondary) mb-3">{scenario.description}</p>}
                                    {scenario.code && (
                                        <pre className="bg-(--bg-code) p-4 rounded text-xs font-mono text-white border border-white/10 shadow-inner overflow-x-auto whitespace-pre-wrap">
                                            {scenario.code}
                                        </pre>
                                    )}
                                    {scenario.conclusion && (
                                        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded text-xs text-success-content flex items-start gap-2">
                                            <span className="text-success text-lg">✓</span>
                                            <p>{scenario.conclusion}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return <div>Sección no encontrada</div>;
        }
    };

    return (
        <div className="animate-fade-in space-y-8">
            <PageHeader
                title={data.header.title}
                description={data.header.description}
            />

            <div className="space-y-6">
                {/* Pestañas de navegación horizontal */}
                <div className="flex flex-wrap justify-center gap-3 pb-2">
                    {data.tabs.map(tab => {
                        const isActive = activeTab === tab.id;
                        const activeClass = tabVariants[tab.variant] || tabVariants.primary;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300 cursor-pointer border ${isActive
                                    ? activeClass
                                    : 'bg-(--bg-secondary) text-(--text-secondary) border-transparent hover:text-(--text-primary) hover:border-(--text-tertiary) hover:bg-(--bg-hover)'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Área de contenido */}
                <Card className="grow animate-fade-in relative overflow-hidden min-h-[500px]">
                    {/* Brillo de fondo coincidiendo con la variante activa */}
                    <div className={`absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 bg-${variant}`}></div>

                    <div className="flex items-center mb-8 pb-4 border-b border-white/5 relative z-10">
                        <div className={`p-3 rounded-xl mr-4 ${variant === 'primary' ? 'text-primary' : `text-${variant}`} bg-${variant}/10 ring-1 ring-${variant}/20 shadow-lg`}>
                            <IconComponent size={28} />
                        </div>
                        <div>
                            <Title level={3} className="contents mb-0 text-xl md:text-2xl transition-colors duration-300" color={colorVars[variant]}>
                                {currentData.title}
                            </Title>
                        </div>
                    </div>

                    <div className="relative z-10 transition-colors duration-300">
                        {renderContent()}
                    </div>
                </Card>
            </div>

            <QuoteBlock
                quote={data.quote.text}
                author={data.quote.author}
            />
        </div>
    );
};

export default NoSQLModern;
