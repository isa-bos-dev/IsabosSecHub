
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ShieldCheck, Lock, Key, Hammer, Database, Hash, AlertTriangle, Fingerprint, FileCheck,
    Component, Layers, Cpu, Box, History, Search, Code, Terminal
} from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import QuoteBlock from '../../components/ui/QuoteBlock';
import TerminalWindow, { TerminalLine } from '../../components/ui/TerminalWindow';
import DetailModal from '../../components/ui/DetailModal';
import hashData from './data/hashData.json';


const iconMap = {
    ShieldCheck,
    Lock,
    Key,
    Cpu,
    Hammer,
    Component,
    Layers,
    Box,
    Database,
    Hash,
    AlertTriangle,
    Fingerprint,
    FileCheck,
    History,
    Search,
    Code,
    Terminal
};

const colorMap = {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    error: 'var(--color-error)',
    accent: 'var(--color-accent)'
};

const HOVER_CONFIG = {
    scale: 1.05,
    shadowOpacity: 0.3,
    borderWidth: '4px',
    transitionDuration: '300ms'
};

const HashFunctions = () => {
    const navigate = useNavigate();
    const [selectedApp, setSelectedApp] = useState(null);



    return (
        <>
            <div className="space-y-16 pb-12 animate-fade-in">
                <PageHeader
                    title={hashData.header.title}
                    description={hashData.header.description}
                    gradientFrom="primary"
                    gradientTo="success"
                    className="mb-0"
                />

                {/* INTRODUCCIÓN */}
                <div className="space-y-8">
                    {/* 1. Título ancho completo */}
                    <h2 className="text-4xl font-bold text-(--text-primary) flex items-center mb-6">
                        <Box className="mr-4 w-12 h-12" style={{ color: 'var(--color-primary)' }} />
                        El oráculo determinista en un mundo de datos
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* 2. Columna Izquierda: Texto */}
                        <div className="space-y-6">
                            <p className="text-(--text-secondary) text-lg leading-relaxed text-justify">
                                {hashData.intro.content}
                            </p>
                        </div>

                        {/* 2. Columna Derecha: Animación */}
                        <div className="flex justify-center">
                            {/* Visual Representation of Hashing */}
                            <div className="relative p-8 rounded-full border-4 border-dashed animate-[spin_60s_linear_infinite]"
                                style={{ borderColor: 'var(--color-primary-alpha-10)' }}>
                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                    <Hash size={200} style={{ color: 'var(--color-primary)' }} />
                                </div>
                                <div className="relative z-10 bg-(--bg-secondary) p-6 rounded-2xl border border-(--text-tertiary) shadow-2xl max-w-xs text-center">
                                    <Database className="mx-auto mb-4 text-(--text-secondary)" size={32} />
                                    <div className="h-1 w-full bg-(--text-tertiary) my-4 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 h-full w-1/2 bg-success animate-[shimmer_2s_infinite]"></div>
                                    </div>
                                    <FileCheck className="mx-auto mt-4 text-success" size={32} />
                                    <p className="mt-2 text-xs text-success" style={{ fontFamily: 'var(--font-mono)' }}>e3b0c442...</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Columna Abajo: Nota completa */}
                    <div className="w-full">
                        <p className="text-(--text-secondary) text-lg leading-relaxed border-l-4 border-primary pl-6 py-2 bg-primary/5 rounded-r-lg">
                            {hashData.intro.subcontent}
                        </p>
                    </div>
                </div>

                {/* DEFINICIÓN Y ANATOMÍA */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-(--text-primary) flex items-center">
                        <Hash className="mr-3" style={{ color: 'var(--color-secondary)' }} />
                        {hashData.definition.title}
                    </h2>
                    <p className="text-(--text-secondary) text-lg">
                        {hashData.definition.content.split(/%(.+?)%/).map((part, index) =>
                            index % 2 === 1 ? (
                                <span key={index} className="font-bold" style={{ color: 'var(--color-secondary)' }}>
                                    {part}
                                </span>
                            ) : part
                        )}
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Bad Example */}
                        <Card className="border-error/30 bg-error/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <AlertTriangle size={80} className="text-error" />
                            </div>
                            <h3 className="text-xl font-bold text-error mb-4 flex items-center gap-2">
                                <AlertTriangle size={20} />
                                {hashData.definition.comparison.badExample.title}
                            </h3>
                            <p className="text-(--text-primary) mb-4 text-sm">{hashData.definition.comparison.badExample.desc}</p>

                            <div className="bg-(--bg-code) p-4 rounded-lg text-sm mb-4 border border-error/20" style={{ fontFamily: 'var(--font-mono)' }}>
                                <p className="text-(--text-tertiary)">// Definición insegura</p>
                                <p className="text-(--white-color) mb-2">{hashData.definition.comparison.badExample.formula}</p>
                                <p className="text-(--text-tertiary) mt-4">// Colisión trivial</p>
                                <p className="text-(--white-color)">➜ {hashData.definition.comparison.badExample.example1}</p>
                                <p className="text-(--white-color)">➜ {hashData.definition.comparison.badExample.example2}</p>
                            </div>
                            <p className="text-(--text-primary) text-sm italic border-t border-error/20 pt-2">
                                Analysis: {hashData.definition.comparison.badExample.analysis}
                            </p>
                        </Card>

                        {/* Requirements */}
                        <Card className="border-success/30 bg-success/5 h-full">
                            <h3 className="text-xl font-bold text-success mb-6 flex items-center gap-2">
                                <ShieldCheck size={20} />
                                El estándar criptográfico
                            </h3>
                            <ul className="space-y-6">
                                {hashData.definition.comparison.requirements.map((req, i) => (
                                    <li key={i} className="flex items-start group">
                                        <div className="mt-1 mr-4 p-2 rounded-lg bg-success/10 text-success group-hover:bg-success group-hover:text-(--bg-primary) transition-colors">
                                            <ShieldCheck size={18} />
                                        </div>
                                        <div>
                                            <strong className="block text-(--text-primary) text-base mb-1">{req.name}</strong>
                                            <p className="text-(--text-secondary) text-sm leading-relaxed">
                                                {req.desc.split(/\*\*(.+?)\*\*/).map((part, index) =>
                                                    index % 2 === 1 ? (
                                                        <span key={index} className="font-bold text-success">
                                                            {part}
                                                        </span>
                                                    ) : part
                                                )}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>

                    {/* Nota de la sección */}
                    <div className="mt-8 p-4 bg-secondary/5 border-l-4 border-secondary rounded-r-lg">
                        <p className="text-(--text-primary) italic">
                            "{hashData.definition.note}"
                        </p>
                    </div>
                </div>

                {/* PARADOJA DEL CUMPLEAÑOS */}
                <div className="bg-(--bg-secondary) rounded-2xl p-8 border border-(--text-tertiary)">
                    <h2 className="text-3xl font-bold text-(--text-primary) mb-6 flex items-center">
                        <Fingerprint className="mr-3" style={{ color: 'var(--color-warning)' }} />
                        {hashData.birthdayParadox.title}
                    </h2>

                    <div className="flex flex-col xl:flex-row gap-12">
                        <div className="flex-1 space-y-6">
                            <p className="text-(--text-secondary) leading-relaxed text-lg">
                                {hashData.birthdayParadox.content.split(/\*\*(.+?)\*\*/).map((part, index) =>
                                    index % 2 === 1 ? (
                                        <span key={index} className="font-bold text-warning">
                                            {part}
                                        </span>
                                    ) : part
                                )}
                            </p>
                            <div className="bg-warning/10 p-4 rounded-lg border-l-4 border-warning">
                                <h4 className="font-bold text-warning mb-2 text-sm uppercase">Paradoja del Cumpleaños</h4>
                                <p className="text-(--text-primary) text-sm italic">"{hashData.birthdayParadox.analogy}"</p>
                            </div>

                            <div className="bg-(--bg-primary) p-6 rounded-xl border border-(--text-tertiary) mt-4">
                                <p className="text-xs text-(--text-tertiary) mb-2 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>Resistencia a colisiones</p>
                                <div className="flex items-center gap-4 overflow-x-auto pb-2">
                                    <code className="text-xl text-(--text-primary) whitespace-nowrap" style={{ fontFamily: 'var(--font-mono)' }}>
                                        {hashData.birthdayParadox.formula}
                                    </code>
                                </div>
                                <p className="text-xs text-(--text-secondary) mt-2" style={{ fontFamily: 'var(--font-mono)' }}>
                                    {hashData.birthdayParadox.formulaDesc.split(/\*\*(.+?)\*\*/).map((part, index) =>
                                        index % 2 === 1 ? (
                                            <span key={index} className="font-bold text-warning">
                                                {part}
                                            </span>
                                        ) : part
                                    )}
                                </p>
                            </div>
                            <p className="text-(--text-primary) font-semibold">
                                {hashData.birthdayParadox.implication.split(/\*\*(.+?)\*\*/).map((part, index) =>
                                    index % 2 === 1 ? (
                                        <span key={index} className="font-bold text-warning">
                                            {part}
                                        </span>
                                    ) : part
                                )}
                            </p>
                        </div>

                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-(--text-secondary) uppercase tracking-wider mb-4">Tabla de Complejidad Computacional</h4>
                            <div className="overflow-hidden rounded-xl border border-(--text-tertiary)">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-(--bg-primary) text-(--text-primary)">
                                        <tr>
                                            {hashData.birthdayParadox.complexityTable.headers.map((h, i) => (
                                                <th key={i} className="p-4 font-semibold border-b border-(--text-tertiary) bg-(--bg-tertiary)">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-(--text-tertiary) bg-(--bg-secondary)">
                                        {hashData.birthdayParadox.complexityTable.rows.map((row, i) => (
                                            <tr key={i} className="hover:bg-(--bg-primary) transition-colors">
                                                <td className="p-4 text-warning font-bold" style={{ fontFamily: 'var(--font-mono)' }}>{row[0]}</td>
                                                <td className="p-4 text-(--text-secondary)" style={{ fontFamily: 'var(--font-mono)' }}>{row[1]}</td>
                                                <td className="p-4 text-(--text-secondary)" style={{ fontFamily: 'var(--font-mono)' }}>{row[2]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ARQUITECTURA (Matyas-Meyer-Oseas) */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-(--text-primary) flex items-center">
                        <Layers className="mr-3" style={{ color: 'var(--color-primary)' }} />
                        {hashData.architecture.title}
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <p className="text-(--text-secondary) text-lg leading-relaxed">
                                {hashData.architecture.content.split(/\*\*(.+?)\*\*/).map((part, index) =>
                                    index % 2 === 1 ? (
                                        <span key={index} className="font-bold text-primary">
                                            {part}
                                        </span>
                                    ) : part
                                )}
                            </p>

                            {/* MacOS Window: Especificación */}
                            <div className="bg-(--bg-tertiary) rounded-xl border border-(--text-tertiary) overflow-hidden shadow-xl">
                                <div className="bg-(--bg-code)/20 px-4 py-3 border-b border-(--text-tertiary) flex items-center gap-2">
                                    <div className="flex space-x-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-error/20"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-warning/20"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-success/20"></div>
                                    </div>
                                    <span className="text-xs font-bold text-(--text-secondary) uppercase tracking-wider ml-2" style={{ fontFamily: 'var(--font-mono)' }}>
                                        Especificación Técnica
                                    </span>
                                </div>
                                <div className="p-8 flex flex-col items-center justify-center space-y-8 bg-(--bg-code)">
                                    <code className="text-2xl sm:text-3xl text-(--white-color) font-bold tracking-wide block text-center" style={{ fontFamily: 'var(--font-mono)' }}>
                                        {hashData.architecture.formula}
                                    </code>
                                    <div className="w-full grid grid-cols-1 gap-2 border-t border-(--text-tertiary)/30 pt-6">
                                        {hashData.architecture.variables.map((v, i) => (
                                            <div key={i} className="flex gap-4 text-sm px-2 py-1">
                                                <span className="font-bold text-(--white-color)  w-12 text-right" style={{ fontFamily: 'var(--font-mono)' }}>{v.symbol}</span>
                                                <span className="text-(--text-tertiary)">-</span>
                                                <span className="text-(--text-secondary)">{v.desc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 flex flex-col justify-center">
                            {/* Análisis Block */}
                            <div className="p-6 border-l-4 border-accent rounded rounded-r-xl shadow-lg bg-accent/5">
                                <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-accent">
                                    <Search className="w-5 h-5" />
                                    Análisis del Esquema
                                </h4>
                                <p className="text-(--text-secondary) leading-relaxed">
                                    {hashData.architecture.explanation}
                                </p>
                            </div>

                            {/* Historia Block */}
                            <div className="p-6 border-l-4 border-success rounded rounded-r-xl shadow-lg bg-success/5">
                                <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-success">
                                    <History className="w-5 h-5" />
                                    Evolución Histórica
                                </h4>
                                <p className="text-(--text-secondary) leading-relaxed">
                                    {hashData.architecture.history}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* INMERSIÓN TÉCNICA SHA-256 */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-(--text-primary) mb-2 flex items-center">
                        <Cpu className="mr-3" style={{ color: 'var(--color-success)' }} />
                        {hashData.sha256.title}
                    </h2>
                    <p className="text-(--text-secondary) max-w-3xl text-lg">
                        {hashData.sha256.intro}
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {hashData.sha256.steps.map((step, index) => (
                            <div key={index} className="flex flex-col h-full group">
                                <div className="bg-(--bg-secondary) border border-(--text-tertiary) rounded-xl p-6 flex-1 flex flex-col hover:border-success transition-all duration-300 hover:shadow-lg hover:shadow-success/5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-success/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500"></div>

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-bold text-(--text-primary)">{step.title}</h3>
                                        </div>
                                        <p className="text-sm text-(--text-primary) font-semibold mb-2">
                                            {step.desc}
                                        </p>
                                        {step.details.includes('1. ') ? (
                                            <ul className="space-y-2 mb-6">
                                                {step.details.split(/(?=\d\. )/).map((item, i) => (
                                                    <li key={i} className="text-xs text-(--text-secondary) leading-relaxed flex items-start gap-2">
                                                        <span className="text-success font-bold mt-0.5">•</span>
                                                        <span>{item.replace(/^\d\. /, '')}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-xs text-(--text-secondary) mb-6 leading-relaxed">
                                                {step.details}
                                            </p>
                                        )}
                                    </div>

                                    <TerminalWindow className="w-full mt-auto relative z-10">
                                        {step.code.split('\n').map((line, i) => {
                                            const isComment = line.trim().startsWith('//');
                                            return (
                                                <TerminalLine key={i} type="code">
                                                    <span
                                                        className={`text - xs ${isComment ? 'text-(--text-tertiary)' : 'text-(--white-color)'} `}
                                                        style={{ fontFamily: 'var(--font-mono)' }}
                                                    >
                                                        {line}
                                                    </span>
                                                </TerminalLine>
                                            );
                                        })}
                                    </TerminalWindow>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* APLICACIONES */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-(--text-primary) flex items-center">
                        <Component className="mr-3" style={{ color: 'var(--color-accent)' }} />
                        {hashData.applications.title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {hashData.applications.items.map((app, index) => {
                            const IconComponent = iconMap[app.icon] || Hammer;
                            const color = colorMap[app.variant || 'primary'];

                            return (
                                <Card
                                    key={index}
                                    className="flex flex-col group h-full"
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
                                    <div className="mb-4 text-xl font-bold flex items-center gap-2" style={{ color }}>
                                        <IconComponent className="w-6 h-6" />
                                        {app.title.split('(')[0]} {/* Simplificar título si es muy largo */}
                                    </div>
                                    <p className="text-sm text-(--text-secondary) leading-relaxed mb-6 grow">
                                        {app.desc}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {app.tags && app.tags.map((tag, idx) => (
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

                                    <button
                                        onClick={() => setSelectedApp(app)}
                                        className="mt-auto w-full py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer"
                                        style={{ color }}
                                    >
                                        Ver Caso de Uso
                                    </button>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* OpenSSL Lab Section */}
                {hashData.openSslLab && (
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-(--text-primary) flex items-center">
                            <Terminal className="mr-3" style={{ color: 'var(--color-primary)' }} />
                            {hashData.openSslLab.title}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {hashData.openSslLab.steps.map((step, idx) => (
                                <div key={idx} className="bg-(--bg-secondary) border border-(--text-tertiary) rounded-xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold text-(--text-success) mb-2">{step.title}</h3>
                                    <p className="text-(--text-secondary) mb-4">{step.desc}</p>
                                    <TerminalWindow>
                                        {step.command.split('\n').map((line, i) => (
                                            <TerminalLine key={i} type={line.trim().startsWith('#') || line.trim().startsWith('>') ? 'comment' : 'output'}>
                                                {line}
                                            </TerminalLine>
                                        ))}
                                    </TerminalWindow>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quote */}
                <div className="py-8">
                    <QuoteBlock
                        quote={hashData.conclusion.content}
                        author={hashData.conclusion.author}
                        gradientFrom="secondary"
                        gradientTo="primary"
                    />
                </div>
            </div>

            {/* Modal de Detalle */}
            <DetailModal
                isOpen={!!selectedApp}
                onClose={() => setSelectedApp(null)}
                title={selectedApp?.title}
                maxWidth="max-w-3xl"
            >
                {selectedApp && (
                    <div className="space-y-6">


                        {selectedApp.details && (
                            <>
                                <div>
                                    <p className="p-4 rounded-lg bg-(--bg-primary) border-l-4 text-(--text-secondary)"
                                        style={{ borderLeftColor: colorMap[selectedApp.variant] }}>
                                        {selectedApp.details.useCase}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-(--text-secondary) uppercase tracking-wider mb-3">
                                        Implementación Conceptual
                                    </h4>
                                    <div className="bg-(--bg-code) p-4 rounded-lg border border-(--text-tertiary)/30 font-mono text-sm text-(--white-color) overflow-x-auto">
                                        {selectedApp.details.codeExample}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </DetailModal>
        </>
    );
};

export default HashFunctions;
