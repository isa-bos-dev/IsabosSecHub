import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Cpu, Box, Layers, Hash, ShieldAlert, Key, Grid, Lock, ArrowRight, Table, Radio, X } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Title from '../../components/ui/Title';
import QuoteBlock from '../../components/ui/QuoteBlock';
import TerminalWindow, { TerminalLine } from '../../components/ui/TerminalWindow';
import DetailModal from '../../components/ui/DetailModal';
import simetricaData from './data/simetricaData.json';

const tabVariants = {
    primary: 'bg-primary/10 text-primary border-primary shadow-[0_0_15px_rgba(74,222,128,0.2)]',
    error: 'bg-error/10 text-error border-error shadow-[0_0_15px_rgba(252,49,49,0.2)]',
    warning: 'bg-warning/10 text-warning border-warning shadow-[0_0_15px_rgba(250,204,21,0.2)]',
    success: 'bg-success/10 text-success border-success shadow-[0_0_15px_rgba(0,176,240,0.2)]',
    secondary: 'bg-secondary/10 text-secondary border-secondary shadow-[0_0_15px_rgba(168,85,247,0.2)]',
    accent: 'bg-accent/10 text-accent border-accent shadow-[0_0_15px_rgba(236,72,153,0.2)]'
};

const colorVars = {
    primary: 'var(--color-primary)',
    error: 'var(--color-error)',
    warning: 'var(--color-warning)',
    success: 'var(--color-success)',
    secondary: 'var(--color-secondary)',
    accent: 'var(--color-accent)'
};

const iconMap = {
    Zap,
    Cpu,
    Box,
    Radio
};

const Simetrica = () => {
    const [activeTabId, setActiveTabId] = useState(simetricaData.tabs[0].id);
    const [selectedCase, setSelectedCase] = useState(null);

    const activeTabObj = simetricaData.tabs.find(t => t.id === activeTabId);
    const variant = activeTabObj?.variant || 'success';
    const IconComponent = iconMap[activeTabObj.icon] || Zap;

    const renderContent = (content, idx) => {
        // Reuse color for internal components
        const activeColorVar = `var(--color-${variant})`;

        switch (content.type) {
            case 'section-header':
                return (
                    <div key={idx} className="mt-12 mb-6 border-b border-(--text-tertiary)/30 pb-2">
                        <h3 className="text-2xl font-bold text-(--text-success) flex items-center gap-3">
                            <Layers className="w-6 h-6" style={{ color: activeColorVar }} />
                            {content.title}
                        </h3>
                    </div>
                );

            case 'text':
                return <p key={idx} className="text-(--text-secondary) leading-relaxed mb-6 text-lg">{content.value}</p>;

            case 'highlight':
                return (
                    <div key={idx} className={`my-8 p-6 bg-${variant}/10 border-l-4 rounded-r-xl shadow-lg border-${variant}`}>
                        <p className="text-(--text-success) italic font-medium">
                            {content.value}
                        </p>
                    </div>
                );

            case 'definition':
                return (
                    <div key={idx} className="my-8 bg-(--bg-secondary) p-6 rounded-xl border border-(--text-tertiary)">
                        <h4 className={`text-lg font-bold mb-2 flex items-center gap-2 text-${variant}`}>
                            <Key className="w-5 h-5" />
                            {content.term}
                        </h4>
                        <p className="text-(--text-secondary) leading-relaxed">
                            {content.meaning}
                        </p>
                    </div>
                );

            case 'terminal-example':
            case 'math-block':
                return (
                    <div key={idx} className="my-8">
                        <TerminalWindow title={content.title}>
                            {content.content.split('\n').map((line, i) => (
                                <TerminalLine key={i} type={line.trim().startsWith('#') || line.trim().startsWith('>') || line.trim().startsWith('//') ? 'comment' : 'output'}>
                                    {line}
                                </TerminalLine>
                            ))}
                        </TerminalWindow>
                    </div>
                );
            case 'comparison-table':
                return (
                    <div key={idx} className="my-8 overflow-hidden rounded-xl border border-(--text-tertiary) shadow-xl">
                        <div className="bg-(--bg-tertiary) p-4 border-b border-(--text-tertiary) flex items-center gap-2">
                            <Table className="w-5 h-5 text-(--text-secondary)" />
                            <span className="font-bold text-(--text-success)">{content.title}</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-(--text-secondary)">
                                <thead className="bg-(--bg-success) text-(--text-tertiary) uppercase text-xs tracking-wider">
                                    <tr>
                                        {content.headers.map((h, hIdx) => (
                                            <th key={hIdx} className="px-6 py-3 font-medium">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-(--text-tertiary)/20 bg-(--bg-secondary)">
                                    {content.rows.map((row, rIdx) => (
                                        <tr key={rIdx} className="hover:bg-(--bg-tertiary)/50 transition-colors">
                                            {row.map((cell, cIdx) => (
                                                <td key={cIdx} className={`px-6 py-4 ${cIdx === 0 ? 'font-bold text-(--text-success)' : 'font-mono'}`}>
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'card-group':
                return (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                        {content.items.map((item, iIdx) => {
                            const itemVariant = item.variant || variant;
                            const itemColor = `var(--color-${itemVariant})`;
                            return (
                                <div key={iIdx} className="bg-(--bg-secondary) rounded-xl p-6 border border-(--text-tertiary) flex flex-col shadow-md hover:shadow-xl transition-shadow relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: itemColor }} />
                                    <h5 className="font-bold text-lg mb-3 flex items-center gap-2" style={{ color: itemColor }}>
                                        {item.variant === 'error' && <ShieldAlert size={18} />}
                                        {item.variant === 'warning' && <Lock size={18} />}
                                        {item.variant === 'primary' && <Zap size={18} />}
                                        {item.title}
                                    </h5>
                                    <p className="text-sm text-(--text-secondary) leading-relaxed">
                                        {content.value || item.content}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                );

            case 'list':
                return (
                    <div key={idx} className="my-8 pl-4 border-l-2 border-(--text-tertiary)">
                        <ul className="space-y-3">
                            {content.items.map((item, iIdx) => (
                                <li key={iIdx} className="text-(--text-secondary) text-sm flex items-start gap-2">
                                    <ArrowRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: activeColorVar }} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case 'case-study-trigger':
                return (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                        {content.items.map((item, iIdx) => {
                            const CaseIcon = iconMap[item.icon] || Cpu;
                            const itemColor = `var(--color-${item.color})`;
                            return (
                                <div
                                    key={iIdx}
                                    className="bg-(--bg-secondary) rounded-xl p-6 border border-(--text-tertiary) hover:bg-(--bg-hover) transition-all cursor-pointer group flex flex-col items-center text-center relative overflow-hidden"
                                    onClick={() => setSelectedCase(simetricaData.caseStudies[item.id])}
                                >
                                    <div className="absolute inset-0 bg-linear-to-br from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className={`p-4 rounded-full bg-${item.color}/10 text-${item.color} mb-4 group-hover:scale-110 transition-transform`}>
                                        <CaseIcon size={32} />
                                    </div>
                                    <h4 className="text-xl font-bold text-(--text-success) mb-2">{item.title}</h4>
                                    <p className="text-(--text-secondary) text-sm mb-4">{item.description}</p>
                                    <span className={`text-${item.color} text-sm font-bold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all`}>
                                        Ver Análisis Completo <ArrowRight size={16} />
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="animate-fade-in space-y-8 pb-12">
            <PageHeader
                title={simetricaData.header.title}
                description={simetricaData.header.description}
                gradientFrom="primary"
                gradientTo="success"
            />

            <div className="max-w-4xl mx-auto text-center mb-8">
                <p className="text-xl text-(--text-secondary) leading-relaxed font-light">
                    {simetricaData.intro}
                </p>
            </div>

            <div className="space-y-6">
                {/* Tabs Header - Centered Pills */}
                <div className="flex flex-wrap justify-center gap-3 pb-2">
                    {simetricaData.tabs.map((tab) => {
                        const isActive = activeTabId === tab.id;
                        const activeClass = tabVariants[tab.variant] || tabVariants.success;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTabId(tab.id)}
                                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300 cursor-pointer border ${isActive
                                    ? activeClass
                                    : 'bg-(--bg-secondary) text-(--text-secondary) border-transparent hover:text-(--text-success) hover:border-(--text-tertiary) hover:bg-(--bg-hover)'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content Container */}
                <Card className="grow animate-fade-in relative overflow-hidden min-h-[500px]">
                    {/* Background Glow Effect */}
                    <div className={`absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 bg-${variant}`}></div>

                    {/* Header inside Card */}
                    <div className="flex items-center mb-8 pb-4 border-b border-white/5 relative z-10">
                        <div className={`p-3 rounded-xl mr-4 text-${variant} bg-${variant}/10 ring-1 ring-${variant}/20 shadow-lg`}>
                            <IconComponent size={28} />
                        </div>
                        <div>
                            <Title level={3} className="contents mb-0 text-xl md:text-2xl transition-colors duration-300" color={colorVars[variant]}>
                                {activeTabObj.label}
                            </Title>
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="relative z-10 transition-colors duration-300">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTabId}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTabObj.content.map((block, idx) => renderContent(block, idx))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </Card>
            </div>

            {/* Footer Quote */}
            {simetricaData.quote && (
                <div className="max-w-4xl mx-auto mt-16">
                    <QuoteBlock
                        quote={simetricaData.quote.text}
                        author={simetricaData.quote.author}
                    />
                </div>
            )}

            {/* Case Study Detail Modal */}
            <AnimatePresence>
                {selectedCase && (
                    <DetailModal
                        isOpen={!!selectedCase}
                        onClose={() => setSelectedCase(null)}
                        title={selectedCase.title}
                        maxWidth="max-w-4xl"
                    >
                        <div className="space-y-8">
                            {/* Tags & Desc */}
                            <div className="border-b border-(--text-tertiary)/30 pb-6">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {selectedCase.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-full text-xs font-mono bg-(--bg-tertiary) text-(--text-secondary) border border-(--text-tertiary)">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-lg text-(--text-success) leading-relaxed">
                                    {selectedCase.description}
                                </p>
                            </div>

                            {/* Technical Specs Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-(--bg-tertiary)/30 p-6 rounded-xl border border-(--text-tertiary)/50">
                                <div>
                                    <h4 className="text-sm font-bold text-(--text-secondary) uppercase mb-4 flex items-center gap-2">
                                        <Cpu size={16} /> Especificaciones
                                    </h4>
                                    <ul className="space-y-4">
                                        {Object.entries(selectedCase.specs).map(([key, val]) => (
                                            <li key={key} className="text-sm">
                                                <span className="block text-(--text-tertiary) text-xs mb-1">{key}</span>
                                                {Array.isArray(val) ? (
                                                    <ul className="list-disc pl-4 space-y-1">
                                                        {val.map((v, i) => <li key={i} className="text-(--text-success) font-mono">{v}</li>)}
                                                    </ul>
                                                ) : (
                                                    <span className="text-(--text-success) font-mono font-medium">{val}</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-(--text-secondary) uppercase mb-4 flex items-center gap-2">
                                        <Zap size={16} /> Mecanismo
                                    </h4>
                                    <p className="text-sm text-(--text-secondary) leading-relaxed">
                                        {selectedCase.mechanism}
                                    </p>
                                </div>
                            </div>

                            {/* Attacks Section */}
                            <div>
                                <h4 className="text-lg font-bold text-error mb-4 flex items-center gap-2">
                                    <ShieldAlert size={20} /> Vectores de Ataque
                                </h4>
                                <div className="space-y-3">
                                    {selectedCase.attacks.map((attack, i) => (
                                        <div key={i} className="p-4 bg-error/5 border-l-4 border-error rounded-r-lg">
                                            <p className="text-sm text-(--text-secondary)">{attack}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Conclusion */}
                            <div className="bg-(--bg-success) p-6 rounded-xl border border-(--text-tertiary) text-center italic text-(--text-secondary)">
                                "{selectedCase.conclusion}"
                            </div>
                        </div>
                    </DetailModal>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Simetrica;
