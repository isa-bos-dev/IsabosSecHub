import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Scroll, Ghost, Columns, RefreshCw, FileText, ShieldAlert, Binary, BarChart,
    Cpu, Key, User, Globe, Server, AlertTriangle, Code, Lock, Brain
} from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Timeline from '../../components/ui/Timeline';
import DetailModal from '../../components/ui/DetailModal';
import QuoteBlock from '../../components/ui/QuoteBlock';


import introHistoriaData from './data/introHistoria.json';


const iconMap = {
    Scroll,
    UserSecret: Ghost,
    Columns,
    Replace: RefreshCw,
    BarChart,
    RefreshCw,
    ShieldAlert,
    Cpu,
    Binary,
    Key,
    FileText
};



const IntroHistoria = () => {
    const [selectedExample, setSelectedExample] = useState(null);

    const { header, timeline, exampleDetails } = introHistoriaData;

    // Map string icon names to actual components
    const timelineItems = timeline.map(item => ({
        ...item,
        icon: iconMap[item.icon] || Lock
    }));

    const handleExampleClick = (exampleKey) => {
        const details = exampleDetails[exampleKey];
        if (details) {
            setSelectedExample(details);
        } else {
            // Fallback for missing details
            setSelectedExample({
                title: exampleKey,
                desc: "Información detallada aún no disponible.",
                date: "N/A"
            });
        }
    };

    return (
        <div className="space-y-12 animate-fade-in pb-12">
            <PageHeader
                title={header.title}
                description={header.description}
                gradientFrom="primary"
                gradientTo="success"
            />

            <div className="max-w-5xl mx-auto">
                <Timeline
                    items={timelineItems}
                    onExampleClick={handleExampleClick}
                />
            </div>

            {/* SECCIÓN DE EVALUACIÓN (QUIZ) */}
            <div className="max-w-4xl mx-auto mt-16 px-4">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-success/10 rounded-lg">
                        <Brain className="w-6 h-6 text-success" />
                    </div>
                    <h2 className="text-2xl font-bold text-(--text-success)">
                        Evaluación de Conocimientos
                    </h2>
                </div>

                <Link
                    to="/cryptography/cuestionario"
                    state={{ topic: 'intro' }}
                    className="block bg-(--bg-secondary) rounded-2xl border border-(--text-tertiary) p-8 text-center shadow-lg relative overflow-hidden group hover:border-success/50 transition-all cursor-pointer no-underline"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-success/10 transition-colors" />

                    <Brain className="w-16 h-16 mx-auto mb-4 text-(--text-tertiary) group-hover:text-success transition-colors" />
                    <h3 className="text-xl font-bold text-(--text-success) mb-2">¿Listo para probarte a ti mismo?</h3>
                    <p className="text-(--text-secondary) max-w-lg mx-auto mb-6">
                        Accede al módulo de evaluación para validar tu comprensión sobre la historia y fundamentos de la criptografía.
                    </p>
                    <span
                        className="inline-block px-6 py-2 bg-success text-black font-bold rounded-lg hover:scale-105 transition-transform"
                    >
                        Ir a la Evaluación
                    </span>
                </Link>
            </div>

            {introHistoriaData.quote && (
                <div className="max-w-4xl mx-auto mt-16 mb-8 px-4">
                    <QuoteBlock
                        quote={introHistoriaData.quote.text}
                        author={introHistoriaData.quote.author}
                    />
                </div>
            )}

            {/* Modal de Detalle */}
            <DetailModal
                isOpen={!!selectedExample}
                onClose={() => setSelectedExample(null)}
                headerContent={selectedExample && (
                    <div>
                        <h2 className="text-2xl font-bold text-(--text-success) mb-1 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-success" />
                            {selectedExample.title}
                        </h2>
                        <div className="flex gap-3 text-sm text-(--text-secondary) mt-2">
                            <span className="flex items-center gap-1">
                                <FileText className="w-3 h-3" /> {selectedExample.date}
                            </span>
                            {selectedExample.type && (
                                <span className="px-2 py-0.5 bg-(--bg-success) rounded-full border border-(--text-tertiary) text-xs">
                                    {selectedExample.type}
                                </span>
                            )}
                        </div>
                    </div>
                )}
                footerContent={
                    <div className="text-center">
                        <span className="text-sm text-warning italic font-(--font-serif) tracking-wider">
                            {selectedExample && selectedExample.footerQuote
                                ? selectedExample.footerQuote
                                : "IsabosCrypt Knowledge Base"
                            }
                        </span>
                    </div>
                }
            >
                {selectedExample && (
                    <>
                        {selectedExample.fullContent ? (
                            <div className="space-y-4 text-(--text-success)">
                                {(() => {
                                    // Helper para renderizar texto con negritas (**texto**) y saltos de línea (\n)
                                    const renderText = (text) => {
                                        return text.split('\n').map((line, lineIdx) => (
                                            <React.Fragment key={lineIdx}>
                                                {line.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, partIdx) => {
                                                    if (part.startsWith('**') && part.endsWith('**')) return <strong key={partIdx} className="text-success font-semibold">{part.slice(2, -2)}</strong>;
                                                    if (part.startsWith('*') && part.endsWith('*')) return <strong key={partIdx} className="text-success font-semibold">{part.slice(1, -1)}</strong>;
                                                    return part;
                                                })}
                                                {lineIdx < text.split('\n').length - 1 && <br />}
                                            </React.Fragment>
                                        ));
                                    };

                                    return selectedExample.fullContent.map((block, idx) => {
                                        if (typeof block === 'string') {
                                            return (
                                                <p key={idx} className="leading-relaxed text-justify">
                                                    {renderText(block)}
                                                </p>
                                            );
                                        }
                                        if (block.type === 'list') return (
                                            <ul key={idx} className="list-disc pl-6 space-y-2 text-(--text-secondary)">
                                                {block.items.map((item, i) => <li key={i}>{renderText(item)}</li>)}
                                            </ul>
                                        );
                                        if (block.type === 'ordered-list') return (
                                            <ol key={idx} className="list-decimal pl-6 space-y-2 text-(--text-secondary)">
                                                {block.items.map((item, i) => <li key={i}>{renderText(item)}</li>)}
                                            </ol>
                                        );
                                        if (block.type === 'quote') return (
                                            <div key={idx} className="border-l-4 border-secondary pl-4 py-2 my-4 italic text-(--text-secondary) bg-secondary/5 rounded-r">
                                                "{block.text}"
                                                {block.author && <div className="text-xs font-bold mt-2 not-italic text-success">— {block.author}</div>}
                                            </div>
                                        );
                                        if (block.type === 'scytale') return (
                                            <div key={idx} className="overflow-x-auto my-6 flex justify-center">
                                                <div className="grid gap-1 bg-amber-900/20 p-4 rounded-lg border border-amber-900/30 font-mono text-lg font-bold text-amber-500 shadow-sm" style={{ gridTemplateColumns: `repeat(${block.grid[0].length}, minmax(40px, 1fr))` }}>
                                                    {block.grid.map((row, rIdx) => row.map((char, cIdx) => (
                                                        <div key={`${rIdx}-${cIdx}`} className="flex items-center justify-center w-10 h-10 bg-(--bg-success) border border-(--text-tertiary) rounded">{char}</div>
                                                    )))}
                                                </div>
                                            </div>
                                        );
                                        if (block.type === 'code') return (
                                            <pre key={idx} className="bg-black/50 p-4 rounded-lg font-mono text-sm text-green-400 overflow-x-auto border border-white/10">{block.text}</pre>
                                        );
                                        return null;
                                    });
                                })()}
                            </div>
                        ) : (
                            <>
                                {/* Descripción Standard / Fallback */}
                                <div>
                                    <h4 className="text-success font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <Server className="w-4 h-4" /> Descripción
                                    </h4>
                                    <p className="text-(--text-success) leading-relaxed">
                                        {selectedExample.desc}
                                    </p>
                                </div>

                                {/* Autor */}
                                {selectedExample.author && (
                                    <div className="bg-(--bg-tertiary) p-3 rounded-lg border border-(--text-tertiary) mt-4">
                                        <span className="text-(--text-secondary) text-sm font-bold">Autor/Origen: </span>
                                        <span className="text-(--text-success) text-sm">{selectedExample.author}</span>
                                    </div>
                                )}

                                {/* Grid de Impacto y Detalles Técnicos */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    {/* Impacto */}
                                    <div className="bg-error/10 p-4 rounded-xl border border-error/30">
                                        <h4 className="text-error font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                                            <AlertTriangle className="w-4 h-4" /> Impacto Histórico
                                        </h4>
                                        <p className="text-(--text-secondary) text-sm leading-relaxed">
                                            {selectedExample.impact || "Información de impacto no disponible."}
                                        </p>
                                    </div>

                                    {/* Detalles Técnicos */}
                                    <div className="bg-success/10 p-4 rounded-xl border border-success/30">
                                        <h4 className="text-success font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                                            <Code className="w-4 h-4" /> Mecanismo Técnico
                                        </h4>
                                        <p className="text-(--text-secondary) text-sm leading-relaxed font-mono">
                                            {selectedExample.tech || "Detalles técnicos no especificados."}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </DetailModal>
        </div>
    );
};

export default IntroHistoria;
