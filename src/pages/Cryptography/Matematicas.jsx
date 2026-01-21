import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Sigma, Divide, Layers, Key, AlertTriangle, Database, Hash, Server, ChevronRight, Calculator
} from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import QuoteBlock from '../../components/ui/QuoteBlock';
import TerminalWindow, { TerminalLine } from '../../components/ui/TerminalWindow';
import matematicasData from './data/matematicasData.json';


const Matematicas = () => {
    const navigate = useNavigate();
    const { header, intro, question, sections, conclusion } = matematicasData;
    const [selectedSection, setSelectedSection] = useState(null);

    // Mapear nombres de iconos del JSON a componentes Lucide reales
    const iconMap = {
        Layers,
        Divide,
        Hash,
        Sigma,
        Key,
        AlertTriangle,
        Database,
        Server
    };



    // Mapear colores por ID de sección (simulando lo que hace Capas.jsx con colorClass)
    // Usamos las variables CSS disponibles: success, secondary, accent, primary, warning, error
    const colorMap = {
        estructuras: 'success',
        divisibilidad: 'secondary',
        modular: 'accent',
        euler: 'warning',
        primos: 'primary',
        problemas: 'error',
        polinomios: 'success'
    };

    const renderContent = (content, idx) => {
        switch (content.type) {
            case 'text':
                return <p key={idx} className="text-(--text-secondary) leading-relaxed mb-6">{content.value}</p>;

            case 'definition':
                return (
                    <div key={idx} className="my-8">
                        <div className="p-6 border-l-4 rounded-r-xl shadow-lg bg-(--bg-success)/30" style={{ borderColor: `var(--color-${colorMap[selectedSection.id]})` }}>
                            <h4 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: `var(--color-${colorMap[selectedSection.id]})` }}>
                                <Layers className="w-5 h-5" />
                                {content.term}
                            </h4>
                            <p className="text-(--text-success) italic mb-4">{content.meaning}</p>

                            {content.example && (
                                <div className="mt-4 bg-[#1e1e1e] p-4 rounded-lg border border-white/10 font-mono text-sm text-gray-300 shadow-inner">
                                    <div className="whitespace-pre-wrap leading-relaxed">
                                        {content.example}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'highlight':
                return (
                    <div key={idx} className="my-8 p-5 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                        <p className="text-yellow-200 font-medium flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 shrink-0 mt-1" />
                            {content.value.replace('El análisis del experto:', '').trim()}
                        </p>
                    </div>
                );

            case 'note':
                return (
                    <div key={idx} className="my-6 pl-4 border-l-4" style={{ borderColor: `var(--color-${colorMap[selectedSection.id]})` }}>
                        <span className="block text-xs font-bold uppercase mb-1" style={{ color: `var(--color-${colorMap[selectedSection.id]})` }}>Nota</span>
                        <p className="text-sm text-(--text-secondary) italic">
                            {content.value}
                        </p>
                    </div>
                );

            case 'quote': // Legacy or specific quotes
                return (
                    <div key={idx} className="my-8">
                        <QuoteBlock quote={content.value} author={content.author || "Nota"} />
                    </div>
                );

            case 'example':
                // Fallback for standard list examples (used in some sections)
                return (
                    <div key={idx} className="my-8 bg-(--bg-tertiary) rounded-xl border border-(--text-tertiary) overflow-hidden shadow-xl">
                        <div className="bg-black/20 px-4 py-3 border-b border-(--text-tertiary) flex items-center gap-2">
                            <div className="flex space-x-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                            </div>
                            <span className="font-mono text-xs font-bold text-(--text-secondary) uppercase tracking-wider ml-2">{content.title}</span>
                        </div>
                        <div className="p-6 font-mono text-sm space-y-3 text-(--text-secondary)">
                            {content.steps.map((step, sIdx) => (
                                <div key={sIdx} className="flex gap-4">
                                    <span className="text-(--text-tertiary) select-none opacity-50">$</span>
                                    <span>{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'math-block':
                // Convert simple math blocks to terminal style
                return (
                    <div key={idx} className="my-8">
                        <TerminalWindow title={content.title}>
                            {content.content.split('\n').map((line, i) => (
                                <TerminalLine key={i} type={line.trim().startsWith('//') || line.trim().startsWith('#') ? 'comment' : 'output'}>
                                    {line}
                                </TerminalLine>
                            ))}
                        </TerminalWindow>
                    </div>
                );

            case 'terminal-example':
                return (
                    <div key={idx} className="my-8">
                        <TerminalWindow title={content.title}>
                            {content.content.split('\n').map((line, i) => (
                                <TerminalLine key={i} type={line.trim().startsWith('//') || line.trim().startsWith('#') ? 'comment' : 'output'}>
                                    {line}
                                </TerminalLine>
                            ))}
                        </TerminalWindow>
                    </div>
                );

            case 'code':
                return (
                    <div key={idx} className="my-8">
                        <TerminalWindow title={content.title || 'Code Snippet'}>
                            {content.code.split('\n').map((line, i) => (
                                <TerminalLine key={i} type={line.trim().startsWith('//') || line.trim().startsWith('#') ? 'comment' : 'output'}>
                                    {line}
                                </TerminalLine>
                            ))}
                        </TerminalWindow>
                    </div>
                );

            case 'list':
                return (
                    <div key={idx} className="my-8">
                        {content.title && <h4 className="font-bold text-(--text-success) mb-4">{content.title}</h4>}
                        <ul className="space-y-3">
                            {content.items.map((item, iIdx) => (
                                <li key={iIdx} className="flex items-start gap-3 text-(--text-secondary)">
                                    <ChevronRight className="w-5 h-5 mt-0.5 shrink-0" style={{ color: `var(--color-${colorMap[selectedSection.id]})` }} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case 'table':
                return (
                    <div key={idx} className="my-8 overflow-hidden rounded-xl border border-(--text-tertiary)">
                        <div className="overflow-x-auto bg-(--bg-secondary)">
                            <h4 className="font-bold text-(--text-success) m-4 text-center">{content.title}</h4>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-(--bg-tertiary) border-b border-(--text-tertiary)">
                                        {content.headers.map((h, hIdx) => (
                                            <th key={hIdx} className="p-4 text-xs font-bold uppercase tracking-wider" style={{ color: `var(--color-${colorMap[selectedSection.id]})` }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-(--text-tertiary)">
                                    {content.rows.map((row, rIdx) => (
                                        <tr key={rIdx} className="hover:bg-(--bg-tertiary)/50 transition-colors">
                                            {row.map((cell, cIdx) => (
                                                <td key={cIdx} className="p-4 text-sm text-(--text-secondary) font-mono">{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <PageHeader
                title={header.title}
                description={header.description}
                gradientFrom="primary"
                gradientTo="success"
                className="mb-0"
            />

            <div className="max-w-4xl mx-auto mb-12 text-center text-(--text-secondary)">
                <p className="text-lg mb-4">{intro}</p>
                <p className="text-success italic font-medium">"{question}"</p>
            </div>

            {/* Layout idéntico a Capas.jsx: Grid con altura fija */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
                {/* Lateral Izquierdo: Lista de Secciones */}
                <div className="flex flex-col justify-start space-y-4 pr-4 relative h-full overflow-y-auto"
                    style={{
                        '--scrollbar-color': 'var(--text-tertiary)'
                    }}
                >
                    {/* Línea decorativa similar a Capas (oculta en móvil) */}
                    <div className="absolute inset-y-0 left-8 w-1 bg-(--text-tertiary) -z-10 hidden lg:block" />

                    {sections.map((section) => {
                        const Icon = iconMap[section.iconName] || Layers;
                        const isSelected = selectedSection?.id === section.id;
                        const sectionColorVar = colorMap[section.id] || 'success';
                        const sectionColor = `var(--color-${sectionColorVar})`;

                        return (
                            <motion.button
                                key={section.id}
                                onClick={() => setSelectedSection(section)}
                                whileHover={{ scale: 1.02, x: 10 }}
                                whileTap={{ scale: 0.98 }}
                                className={`relative p-6 rounded-xl text-left transition-all duration-300 border shadow-xl w-full mx-auto cursor-pointer
                                    ${isSelected
                                        ? 'z-20 bg-(--bg-success)'
                                        : 'border-(--text-tertiary) hover:border-(--text-secondary) bg-(--bg-secondary)'
                                    }
                                `}
                                style={isSelected ? {
                                    borderColor: sectionColor,
                                    boxShadow: `0 0 0 2px color-mix(in srgb, ${sectionColor}, transparent 90%)`
                                } : {}}
                            >
                                {/* Barra de color izquierda */}
                                <div
                                    className="absolute left-0 top-0 bottom-0 w-3 rounded-l-lg"
                                    style={{ backgroundColor: sectionColor }}
                                />

                                <div className="flex items-center pl-4">
                                    <div className={`p-3 rounded-full bg-(--bg-success) border border-(--text-tertiary) mr-4 ${isSelected ? 'text-(--text-success)' : 'text-(--text-secondary)'}`}>
                                        <Icon size={24} style={isSelected ? { color: sectionColor } : {}} />
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-bold ${isSelected ? 'text-(--text-success)' : 'text-(--text-secondary)'}`}>
                                            {section.title}
                                        </h3>
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Panel Derecho: Contenido */}
                <div className="bg-(--bg-secondary) rounded-2xl border border-(--text-tertiary) shadow-2xl p-8 relative overflow-hidden h-full flex flex-col">
                    <AnimatePresence mode="wait">
                        {selectedSection ? (
                            <motion.div
                                key={selectedSection.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="h-full flex flex-col"
                            >
                                {/* Barra de color superior */}
                                <div
                                    className="absolute top-0 left-0 w-full h-2"
                                    style={{ backgroundColor: `var(--color-${colorMap[selectedSection.id]})` }}
                                />

                                <div className="flex items-center mb-6">
                                    <div
                                        className="p-3 rounded-lg mr-4"
                                        style={{
                                            backgroundColor: `var(--color-${colorMap[selectedSection.id]}-alpha-10)`,
                                            color: `var(--color-${colorMap[selectedSection.id]})`
                                        }}
                                    >
                                        {(() => {
                                            const Icon = iconMap[selectedSection.iconName] || Layers;
                                            return <Icon className="w-8 h-8" />;
                                        })()}
                                    </div>
                                    <h2 className="text-3xl font-bold text-(--text-success)">{selectedSection.title}</h2>
                                </div>

                                <div
                                    className="space-y-6 flex-1 overflow-y-auto pr-2"
                                    style={{
                                        '--scrollbar-color': `var(--color-${colorMap[selectedSection.id]})`
                                    }}
                                >
                                    {selectedSection.content.map((block, idx) => renderContent(block, idx))}
                                </div>

                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-(--text-tertiary) opacity-50">
                                <Layers className="w-24 h-24 mb-4" />
                                <p className="text-xl">Selecciona un tema para comenzar la clase.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {matematicasData.quote && (
                <QuoteBlock
                    quote={matematicasData.quote.text}
                    author={matematicasData.quote.author}
                    className="mt-8"
                />
            )}
        </div>
    );
};

export default Matematicas;
