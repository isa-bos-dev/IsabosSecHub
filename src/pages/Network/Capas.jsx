import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Box, Globe, AlertTriangle, Monitor, Server, Wifi } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import QuoteBlock from '../../components/ui/QuoteBlock';
import capasData from './data/capas.json';

const Capas = () => {
    const [selectedLayer, setSelectedLayer] = useState(null);

    // Mapear nombres de iconos del JSON a componentes Lucide reales
    const iconMap = {
        Monitor,
        Box,
        Globe,
        Wifi
    };

    // Mapear datos de capas para incluir componentes de iconos reales
    const layers = capasData.layers.map(layer => ({
        ...layer,
        icon: iconMap[layer.iconName]
    }));

    return (
        <div className="space-y-8">
            <PageHeader
                title="Modelo TCP/IP: Anatomía de la vulnerabilidad"
                description="Cada capa del modelo TCP/IP ofrece servicios esenciales, pero también expone vectores de ataque únicos. Haz clic en una capa para descubrir sus secretos."
                gradientFrom="primary"
                gradientTo="primary-alpha-10"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
                {/* Visualización Interactiva de la Pila */}
                <div className="flex flex-col justify-center space-y-4 px-8 relative h-full">
                    <div className="absolute inset-y-0 left-1/2 w-1 bg-(--text-tertiary) -z-10 hidden lg:block" />

                    {layers.map((layer) => {
                        const isSelected = selectedLayer?.id === layer.id;
                        const layerColor = `var(--color-${layer.colorClass})`;

                        return (
                            <motion.button
                                key={layer.id}
                                onClick={() => setSelectedLayer(layer)}
                                whileHover={{ scale: 1.05, x: 20 }}
                                whileTap={{ scale: 0.98 }}
                                className={`relative p-6 rounded-xl text-left transition-all duration-300 border shadow-xl w-full max-w-lg mx-auto cursor-pointer
                                    ${isSelected
                                        ? 'z-20 bg-(--bg-primary)'
                                        : 'border-(--text-tertiary) hover:border-(--text-secondary) bg-(--bg-secondary)'
                                    }
                                `}
                                style={isSelected ? {
                                    borderColor: layerColor,
                                    boxShadow: `0 0 0 2px color-mix(in srgb, ${layerColor}, transparent 80%)`
                                } : {}}
                            >
                                {/* Barra de color izquierda */}
                                <div
                                    className="absolute left-0 top-0 bottom-0 w-3 rounded-l-lg"
                                    style={{ backgroundColor: layerColor }}
                                />

                                <div className="flex items-center pl-4">
                                    <div className={`p-3 rounded-full bg-(--bg-primary) border border-(--text-tertiary) mr-4 ${isSelected ? 'text-(--text-primary)' : 'text-(--text-secondary)'}`}>
                                        <layer.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className={`text-xl font-bold ${isSelected ? 'text-(--text-primary)' : 'text-(--text-secondary)'}`}>
                                            {layer.name}
                                        </h3>
                                        <p className="text-sm text-(--text-secondary)">{layer.desc}</p>
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Panel de Detalle */}
                <div className="bg-(--bg-secondary) rounded-2xl border border-(--text-tertiary) shadow-2xl p-8 relative overflow-hidden h-full flex flex-col">
                    <AnimatePresence mode="wait">
                        {selectedLayer ? (
                            <motion.div
                                key={selectedLayer.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="h-full flex flex-col"
                            >
                                {/* Barra de color superior */}
                                <div
                                    className="absolute top-0 left-0 w-full h-2"
                                    style={{ backgroundColor: `var(--color-${selectedLayer.colorClass})` }}
                                />

                                <div className="flex items-center mb-6">
                                    <div
                                        className="p-3 rounded-lg mr-4"
                                        style={{
                                            backgroundColor: `var(--color-${selectedLayer.colorClass})33`,
                                            color: `var(--color-${selectedLayer.colorClass})`
                                        }}
                                    >
                                        <selectedLayer.icon className="w-8 h-8" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-(--text-primary)">{selectedLayer.name}</h2>
                                </div>

                                <div
                                    className="space-y-6 flex-1 overflow-y-auto pr-2"
                                    style={{
                                        '--scrollbar-color': `var(--color-${selectedLayer.colorClass})`
                                    }}
                                >
                                    <div className="bg-(--bg-primary)/50 p-4 rounded-lg border border-(--text-tertiary)">
                                        <h4 className="text-primary font-bold mb-2 uppercase tracking-wider text-xs">Descripción técnica</h4>
                                        <p className="text-(--text-secondary) leading-relaxed">
                                            {selectedLayer.details}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-(--text-secondary) font-bold mb-3 uppercase tracking-wider text-xs flex items-center">
                                            <Server className="w-4 h-4 mr-2" /> Protocolos comunes
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedLayer.protocols.map((p) => (
                                                <span key={p} className="px-3 py-1 bg-(--bg-tertiary) text-(--text-secondary) rounded text-sm font-(--font-mono) border border-(--text-tertiary)">
                                                    {p}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-error font-bold mb-3 uppercase tracking-wider text-xs flex items-center">
                                            <AlertTriangle className="w-4 h-4 mr-2" /> Vectores de ataque principales
                                        </h4>
                                        <ul className="space-y-3">
                                            {selectedLayer.attacks.map((attack) => (
                                                <li key={attack.name} className="flex flex-col bg-error/10 p-3 rounded border border-error/30 hover:border-error/50 transition-colors">
                                                    <span className="font-bold text-error text-sm mb-1">{attack.name}</span>
                                                    <span className="text-xs text-(--text-secondary)">{attack.desc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-(--text-tertiary) opacity-50">
                                <Layers className="w-24 h-24 mb-4" />
                                <p className="text-xl">Selecciona una capa para ver su ficha técnica.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {capasData.quote && (
                <QuoteBlock quote={capasData.quote.text} author={capasData.quote.author} className="mt-8" />
            )}
        </div>
    );
};

export default Capas;
