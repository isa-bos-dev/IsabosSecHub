import React, { useState } from 'react';
import { Layers, Fingerprint, Calculator, FileWarning, Skull, ShieldAlert, ChevronRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import Title from '../../components/ui/Title';
import PageHeader from '../../components/ui/PageHeader';
import QuoteBlock from '../../components/ui/QuoteBlock';
import data from './data/sqli.json';

const iconMap = {
    Layers,
    Fingerprint,
    Calculator,
    FileWarning,
    Skull,
    ShieldAlert
};

const SQLiMaster = () => {
    const [activeSubTab, setActiveSubTab] = useState('sqli-types');
    const currentData = data.content[activeSubTab];
    const IconComponent = iconMap[currentData.icon] || Layers;

    const renderContent = () => {
        switch (activeSubTab) {
            case 'sqli-types':
                return (
                    <div className="space-y-6">
                        {currentData.sections.map((section, idx) => (
                            <div key={idx} className={`p-5 rounded-xl bg-(--bg-secondary) border-l-4 border-${section.variant || 'primary'} shadow-sm`}>
                                <h4 className={`text-lg font-bold text-${section.variant || 'primary'}`}>{section.title}</h4>
                                <p className="text-sm mb-2 text-(--text-secondary)">{section.description}</p>
                                {section.code && (
                                    <div className="bg-(--bg-code) p-3 rounded text-xs font-mono overflow-x-auto text-white border border-white/10 shadow-inner">
                                        {section.code}
                                        {section.errorMsg && (
                                            <>
                                                <br /><span className="text-error">{section.errorMsg}</span>
                                            </>
                                        )}
                                    </div>
                                )}
                                {section.subTypes && (
                                    <ul className="space-y-3 mt-3">
                                        {section.subTypes.map((sub, sIdx) => (
                                            <li key={sIdx} className="text-xs p-3 rounded bg-(--bg-tertiary) border border-(--text-tertiary)/30">
                                                <div className="mb-2">
                                                    <strong className="text-(--text-primary)">{sub.label}:</strong> <span className="text-(--text-secondary)">{sub.text}</span>
                                                </div>
                                                {sub.code && (
                                                    <div className="bg-(--bg-code) p-2 rounded font-mono text-white overflow-x-auto border border-white/10 shadow-inner">
                                                        {sub.code}
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                );

            case 'sqli-fingerprint':
                return (
                    <div className="space-y-6">
                        <p className="text-sm text-(--text-primary)">{currentData.description}</p>
                        <div className="overflow-hidden rounded-xl border border-(--text-tertiary)">
                            <table className="w-full text-sm text-left text-(--text-secondary)">
                                <thead className="text-xs uppercase bg-(--bg-tertiary) text-(--text-primary)">
                                    <tr>
                                        {currentData.columns.map((col, idx) => (
                                            <th key={idx} className={`px-6 py-3 ${idx > 0 ? (idx === 1 ? 'text-primary' : idx === 2 ? 'text-secondary' : 'text-success') : ''}`}>
                                                {col}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-(--text-tertiary)/20 bg-(--bg-primary)/50">
                                    {currentData.rows.map((row, idx) => (
                                        <tr key={idx}>
                                            <td className="px-6 py-4 font-medium text-(--text-primary)">{row.test}</td>
                                            <td className="px-6 py-4 font-mono text-xs">{row.oracle}</td>
                                            <td className="px-6 py-4 font-mono text-xs">{row.mssql}</td>
                                            <td className="px-6 py-4 font-mono text-xs">{row.mysql}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'sqli-arithmetic':
                return (
                    <div className="space-y-6">
                        <p className="text-sm mb-4 text-(--text-primary)">{currentData.description}</p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {currentData.cards.map((card, idx) => (
                                <div key={idx} className="p-5 rounded-xl border bg-(--bg-secondary) border-(--text-tertiary)">
                                    <h4 className="font-bold mb-2 text-(--text-primary)">{card.title}</h4>
                                    <p className="text-xs mb-3 text-(--text-secondary)">{card.description}</p>
                                    <div className="bg-(--bg-code) p-3 rounded text-xs mb-3 font-mono text-white overflow-x-auto border border-white/10 shadow-inner">{card.code}</div>
                                    {card.list && (
                                        <ul className="space-y-1 text-xs text-(--text-secondary)">
                                            {card.list.map((item, lIdx) => {
                                                // Analizador simple para colorear OK/ERROR
                                                const parts = item.split("→");
                                                return (
                                                    <li key={lIdx}>
                                                        {parts.map((part, pIdx) => (
                                                            <span key={pIdx}>
                                                                {pIdx > 0 && " → "}
                                                                {part.includes("ERROR") ? <span className="text-error font-bold">{part}</span> :
                                                                    part.includes("OK") ? <span className="text-success font-bold">{part}</span> : part}
                                                            </span>
                                                        ))}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>

                        {currentData.functions && (
                            <div className="mt-6 p-4 rounded border border-dashed border-(--text-tertiary) bg-(--bg-tertiary)/30">
                                <h4 className="text-sm font-bold text-(--text-primary) mb-2">{currentData.functions.title}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {currentData.functions.items.map(func => (
                                        <span key={func} className="px-2 py-1 rounded bg-(--bg-code) text-xs font-mono text-warning">
                                            {func}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 'sqli-files':
            case 'sqli-waf': // Reutilizar estructura de diseño de tarjeta similar
                return (
                    <div className="space-y-6">
                        {currentData.description && <p className="text-sm mb-6 text-(--text-primary)">{currentData.description}</p>}
                        <div className={`grid grid-cols-1 ${activeSubTab === 'sqli-waf' ? 'md:grid-cols-2' : ''} gap-6`}>
                            {currentData.cards.map((card, idx) => (
                                <div key={idx} className={`p-5 rounded-xl bg-(--bg-secondary) border-l-4 border-l-${card.borderColor || 'primary'} shadow-sm flex flex-col h-full ${card.title.includes('Whitespace') ? 'md:col-span-2' : ''}`}>
                                    <h4 className={`font-bold text-${card.borderColor || 'primary'} mb-2`}>{card.title}</h4>
                                    {card.description && <p className="text-sm text-(--text-secondary) mb-3">{card.description}</p>}
                                    {card.code && (
                                        <div className="bg-(--bg-code) p-3 rounded text-xs font-mono mb-2 overflow-x-auto text-white border border-white/10 shadow-inner tracking-wider">
                                            {card.code}
                                        </div>
                                    )}
                                    {card.footer && <p className="text-xs text-(--text-secondary) font-mono">{card.footer}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'sqli-advanced':
                return (
                    <div className="space-y-6">
                        {currentData.sections.map((section, idx) => (
                            <div key={idx} className={`p-6 rounded-xl bg-(--bg-secondary) border border-(--text-tertiary) ${section.type === 'oob' ? 'relative overflow-hidden' : ''}`}>
                                {section.badge && (
                                    <span className="absolute top-0 right-0 bg-primary text-(--bg-primary) text-xs font-bold px-3 py-1 rounded-bl-xl">{section.badge}</span>
                                )}
                                <h4 className="font-bold text-lg mb-2 text-(--text-primary)">{section.title}</h4>
                                <p className="text-sm text-(--text-secondary) mb-6">{section.description || section.text}</p>

                                {section.examples && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {section.examples.map((ex, eIdx) => (
                                            <div key={eIdx} className="bg-(--bg-code) p-3 rounded border border-white/10 shadow-inner">
                                                <p className="text-xs text-(--text-tertiary) mb-2 font-mono border-b border-white/10 pb-1">{ex.label}</p>
                                                <div className="text-xs font-mono text-white whitespace-pre-wrap">{ex.code}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                );

            default:
                return <div>Sección en construcción</div>;
        }
    };

    return (
        <div className="animate-fade-in space-y-8">
            <PageHeader
                title={data.header.title}
                description={data.header.description}
            />

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Navegación de barra lateral */}
                <div className="lg:w-64 shrink-0 space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider mb-3 px-2 text-(--text-secondary)">Técnicas de Inyección</div>
                    {data.tabs.map(sub => (
                        <button
                            key={sub.id}
                            onClick={() => setActiveSubTab(sub.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors cursor-pointer flex items-center justify-between group ${activeSubTab === sub.id
                                ? 'bg-(--bg-tertiary) text-primary border-l-2 border-l-primary'
                                : 'hover:bg-(--bg-hover) text-(--text-secondary)'
                                }`}
                        >
                            <span>{sub.label}</span>
                            {activeSubTab === sub.id && <ChevronRight size={14} />}
                        </button>
                    ))}
                </div>

                {/* Área de contenido */}
                <Card className="grow">
                    <div className="animate-fade-in">
                        <div className="flex items-center mb-6">
                            <div className="p-2 rounded mr-3 text-primary bg-primary/20">
                                <IconComponent size={24} />
                            </div>
                            <Title level={3} className="contents" style={{ marginBottom: 0, marginTop: 0 }}>
                                {currentData.title}
                            </Title>
                        </div>

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

export default SQLiMaster;
