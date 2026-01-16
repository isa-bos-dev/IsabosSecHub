import React, { useState } from 'react';
import { Biohazard, AlertTriangle, Shield, FileText, Code } from 'lucide-react';
import Card from '../../components/ui/Card';
import Title from '../../components/ui/Title';
import PageHeader from '../../components/ui/PageHeader';
import QuoteBlock from '../../components/ui/QuoteBlock';
import DetailModal from '../../components/ui/DetailModal';
import data from './data/ransomware.json';

const Ransomware = () => {
    const [selectedCase, setSelectedCase] = useState(null);

    const phaseIcons = {
        1: Shield,
        2: AlertTriangle,
        3: Biohazard
    };

    const variantStyles = {
        secondary: {
            border: 'border-secondary',
            text: 'text-secondary',
            bg: 'bg-secondary/10'
        },
        primary: {
            border: 'border-primary',
            text: 'text-primary',
            bg: 'bg-primary/10'
        },
        error: {
            border: 'border-error',
            text: 'text-error',
            bg: 'bg-error/10'
        }
    };

    return (
        <div className="animate-fade-in space-y-8">
            <PageHeader
                title={data.header.title}
                description={data.header.description}
            />

            {/* Banner de advertencia */}
            <div className="relative overflow-hidden rounded-xl border-2 border-error bg-error/5 p-6">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-error">
                    <Biohazard size={120} />
                </div>
                <div className="relative z-10 flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-error/20 text-error">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2 text-error">Amenaza crítica en evolución</h3>
                        <p className="text-sm text-(--text-secondary) max-w-3xl">
                            El ransomware ha evolucionado de un simple cifrado de archivos a sofisticadas operaciones de extorsión multinivel.
                            Los atacantes modernos combinan técnicas de ingeniería social, explotación de vulnerabilidades y presión psicológica.
                        </p>
                    </div>
                </div>
            </div>

            {/* Línea de tiempo: Fases de evolución */}
            <div>
                <h3 className="text-xl font-bold mb-6 text-(--text-primary) flex items-center gap-2">
                    <span className="text-error">▸</span> Línea temporal de evolución
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.phases.map((phase) => {
                        const PhaseIcon = phaseIcons[phase.id];
                        const styles = variantStyles[phase.variant];

                        return (
                            <div
                                key={phase.id}
                                className={`p-6 rounded-xl border-2 ${styles.border} ${styles.bg} relative overflow-hidden group hover:scale-105 transition-transform duration-300`}
                            >
                                {/* Icono de fondo */}
                                <div className={`absolute -bottom-4 -right-4 opacity-5 ${styles.text}`}>
                                    <PhaseIcon size={100} />
                                </div>

                                {/* Contenido */}
                                <div className="relative z-10">
                                    <div className={`text-xs font-bold mb-3 ${styles.text} uppercase tracking-wider`}>
                                        Fase {phase.id} ({phase.period})
                                    </div>
                                    <h3 className={`font-bold text-xl mb-3 ${styles.text}`}>
                                        {phase.title}
                                    </h3>
                                    <p className="text-sm text-(--text-secondary) leading-relaxed">
                                        {phase.description.split(phase.highlight || '___NOHIGHLIGHT___')[0]}
                                        {phase.highlight && (
                                            <>
                                                <strong className={`${styles.text} font-bold`}>{phase.highlight}</strong>
                                                {phase.description.split(phase.highlight)[1]}
                                            </>
                                        )}
                                        {!phase.highlight && phase.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Estudios de casos reales */}
            <Card className="border-l-4 border-l-error">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-error/10 text-error">
                        <Biohazard size={24} />
                    </div>
                    <Title level={3} className="contents" color="var(--color-error)" style={{ marginBottom: 0 }}>
                        Casos de estudio reales
                    </Title>
                </div>

                <div className="space-y-6">
                    {data.cases.map((caseStudy, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedCase(caseStudy)}
                            className="flex items-start gap-4 p-4 rounded-lg bg-(--bg-secondary) border border-(--text-tertiary)/30 hover:border-error/50 hover:bg-(--bg-hover) transition-all cursor-pointer group"
                        >
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-error/20 text-error font-bold text-sm shrink-0 mt-1 group-hover:scale-110 transition-transform">
                                {idx + 1}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-(--text-primary) mb-2 group-hover:text-error transition-colors">
                                    {caseStudy.title}
                                </h4>
                                <p className="text-xs text-(--text-secondary) leading-relaxed">
                                    {caseStudy.description}
                                </p>
                            </div>
                            <div className="text-error opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <QuoteBlock
                quote={data.quote.text}
                author={data.quote.author}
            />

            {/* Modal de detalle */}
            <DetailModal
                isOpen={!!selectedCase}
                onClose={() => setSelectedCase(null)}
                headerContent={selectedCase && (
                    <div>
                        <h2 className="text-2xl font-bold text-(--text-primary) mb-1 flex items-center gap-2">
                            <Biohazard className="w-5 h-5 text-error" />
                            {selectedCase.title}
                        </h2>
                        <div className="flex gap-3 text-sm text-(--text-secondary) mt-2">
                            <span className="flex items-center gap-1">
                                <FileText className="w-3 h-3" /> {selectedCase.date}
                            </span>
                            {selectedCase.type && (
                                <span className="px-2 py-0.5 bg-(--bg-primary) rounded-full border border-error/30 text-xs text-error">
                                    {selectedCase.type}
                                </span>
                            )}
                        </div>
                    </div>
                )}
                footerContent={
                    <div className="text-center">
                        <span className="text-sm text-warning italic font-(--font-serif) tracking-wider">
                            "El ransomware es el recordatorio de que la seguridad no es un producto, es un proceso continuo."
                        </span>
                    </div>
                }
            >
                {selectedCase && (
                    <>
                        {/* Descripción */}
                        <div>
                            <h4 className="text-error font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                                <Biohazard className="w-4 h-4" /> Descripción
                            </h4>
                            <p className="text-(--text-primary) leading-relaxed">
                                {selectedCase.description}
                            </p>
                        </div>

                        {/* Autor */}
                        {selectedCase.author && (
                            <div className="bg-(--bg-tertiary) p-3 rounded-lg border border-(--text-tertiary)">
                                <span className="text-(--text-secondary) text-sm font-bold">Autor/Origen: </span>
                                <span className="text-(--text-primary) text-sm">{selectedCase.author}</span>
                            </div>
                        )}

                        {/* Grid de Impacto y Detalles Técnicos */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Impacto */}
                            <div className="bg-error/10 p-4 rounded-xl border border-error/30">
                                <h4 className="text-error font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" /> Impacto
                                </h4>
                                <p className="text-(--text-secondary) text-sm leading-relaxed">
                                    {selectedCase.impact || "Datos de impacto no disponibles."}
                                </p>
                            </div>

                            {/* Detalles Técnicos */}
                            <div className="bg-primary/10 p-4 rounded-xl border border-primary/30">
                                <h4 className="text-primary font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Code className="w-4 h-4" /> Detalles técnicos
                                </h4>
                                <p className="text-(--text-secondary) text-sm leading-relaxed font-(--font-mono)">
                                    {selectedCase.tech || "Detalles técnicos clasificados."}
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </DetailModal>
        </div>
    );
};

export default Ransomware;
