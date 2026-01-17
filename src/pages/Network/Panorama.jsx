import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bug, Cpu, Brain, Network, Zap, ShieldAlert, Globe, FileText, Server, Code, AlertTriangle } from 'lucide-react';
import panoramaData from './data/panorama.json';
import PageHeader from '../../components/ui/PageHeader';
import DoughnutChart from '../../components/charts/DoughnutChart';
import Timeline from '../../components/ui/Timeline';
import QuoteBlock from '../../components/ui/QuoteBlock';
import DetailModal from '../../components/ui/DetailModal';


// Mapear nombres de iconos del JSON a componentes Lucide reales
const iconMap = {
    Cpu,
    Network,
    Bug,
    ShieldAlert,
    Brain
};

const Panorama = () => {
    const [selectedExample, setSelectedExample] = useState(null);

    // Obtener datos del JSON
    const { exampleDetails, timeline: timelineData } = panoramaData;

    // Mapear datos de timeline para incluir componentes de iconos reales
    const timeline = timelineData.map(item => ({
        ...item,
        icon: iconMap[item.iconName]
    }));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-12 pb-12"
        >
            {/* Sección de Encabezado */}
            <PageHeader
                title="Evolución de las ciberamenazas"
                description="Desde los primeros virus de disquete hasta la guerra cibernética moderna impulsada por IA. Comprender la historia es vital para predecir el futuro de la seguridad."
                gradientFrom="primary"
                gradientTo="primary-alpha-10"
            />

            {/* Grid de Contenido Principal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Sección de Gráfico - Sticky en Desktop */}
                <div className="lg:sticky lg:top-24">
                    <DoughnutChart
                        labels={['1ª Gen: Físicos', '2ª Gen: Sintácticos', '3ª Gen: Semánticos', '4ª Gen: Ciberguerra', '5ª Gen: Mega-Ataques']}
                        dataValues={[5, 15, 25, 25, 30]}
                        colorVars={['--color-success', '--color-primary', '--color-secondary', '--color-error', '--color-warning']}
                        centerText="5"
                        centerSubtext="Generaciones"
                        title="Distribución de impacto histórico"
                        icon={Zap}
                    />
                </div>

                {/* Contenido Masterclass del Timeline */}
                <Timeline
                    items={timeline}
                    onExampleClick={(example) => setSelectedExample(exampleDetails[example] || { title: example, desc: "Información detallada próximamente...", date: "N/A" })}
                />
            </div>

            {/* Bloque de Cita */}
            <QuoteBlock
                quote="La única forma de detener a un atacante de 5ª Generación es estar ya en la 6ª."
                author="Check Point Software Technologies"
            />

            {/* Modal de Detalle */}
            <DetailModal
                isOpen={!!selectedExample}
                onClose={() => setSelectedExample(null)}
                headerContent={selectedExample && (
                    <div>
                        <h2 className="text-2xl font-bold text-(--text-primary) mb-1 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-primary" />
                            {selectedExample.title}
                        </h2>
                        <div className="flex gap-3 text-sm text-(--text-secondary) mt-2">
                            <span className="flex items-center gap-1">
                                <FileText className="w-3 h-3" /> {selectedExample.date}
                            </span>
                            {selectedExample.type && (
                                <span className="px-2 py-0.5 bg-(--bg-primary) rounded-full border border-(--text-tertiary) text-xs">
                                    {selectedExample.type}
                                </span>
                            )}
                        </div>
                    </div>
                )}
                footerContent={
                    <div className="text-center">
                        <span className="text-sm text-warning italic font-(--font-serif) tracking-wider">
                            "Quien no conoce la historia del malware está condenado a reinfectarse."
                        </span>
                    </div>
                }
            >
                {selectedExample && (
                    <>
                        {/* Descripción */}
                        <div>
                            <h4 className="text-primary font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                                <Server className="w-4 h-4" /> Descripción
                            </h4>
                            <p className="text-(--text-primary) leading-relaxed">
                                {selectedExample.desc}
                            </p>
                        </div>

                        {/* Autor */}
                        {selectedExample.author && (
                            <div className="bg-(--bg-tertiary) p-3 rounded-lg border border-(--text-tertiary)">
                                <span className="text-(--text-secondary) text-sm font-bold">Autor/Origen: </span>
                                <span className="text-(--text-primary) text-sm">{selectedExample.author}</span>
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
                                    {selectedExample.impact || "Datos de impacto no disponibles."}
                                </p>
                            </div>

                            {/* Detalles Técnicos */}
                            <div className="bg-primary/10 p-4 rounded-xl border border-primary/30">
                                <h4 className="text-primary font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Code className="w-4 h-4" /> Detalles Técnicos
                                </h4>
                                <p className="text-(--text-secondary) text-sm leading-relaxed font-(--font-mono)">
                                    {selectedExample.tech || "Detalles técnicos clasificados."}
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </DetailModal>
        </motion.div>
    );
};

export default Panorama;
