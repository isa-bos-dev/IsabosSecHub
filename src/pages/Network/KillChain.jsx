import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Crosshair, Eye, Hammer, Zap, Anchor, Flag, Shield,
    Terminal, Lock, Globe, Server, AlertTriangle, ChevronRight, Activity, Trash, Download
} from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import data from './data/killchainData.json';
import InfoCard from '../../components/ui/InfoCard';

const KillChain = () => {
    const [activeSection, setActiveSection] = useState('concept');
    const currentContent = data.content[activeSection];

    const renderContent = () => {
        switch (activeSection) {
            case 'concept':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-(--bg-secondary) p-8 rounded-2xl border border-(--text-tertiary)">
                            <h2 className="text-3xl font-bold text-(--text-primary) mb-4 flex items-center">
                                <Crosshair className="mr-3 text-error" /> {currentContent.title}
                            </h2>
                            <p className="text-(--text-secondary) text-lg mb-8 leading-relaxed">
                                {currentContent.description}
                            </p>
                            <div className="relative border-l-4 border-(--text-tertiary) ml-4 space-y-8 py-2">
                                {currentContent.phases.map((phase) => (
                                    <div key={phase.step} className="relative pl-8 group">
                                        <span className="absolute -left-[21px] top-0 flex items-center justify-center w-10 h-10 bg-(--bg-primary) border-2 border-error rounded-full text-error font-bold z-10 group-hover:scale-110 transition-transform">
                                            {phase.step}
                                        </span>
                                        <h4 className="text-xl font-bold text-(--text-primary) group-hover:text-error transition-colors">{phase.name}</h4>
                                        <p className="text-(--text-secondary)">{phase.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'phase1':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-(--bg-secondary) p-8 rounded-2xl border border-(--text-tertiary)">
                            <h2 className="text-3xl font-bold text-(--text-primary) mb-2 flex items-center">
                                <Eye className="mr-3 text-info" /> {currentContent.title}
                            </h2>
                            <p className="text-(--text-secondary) mb-6 italic">{currentContent.subtitle}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {currentContent.techniques.map((tech, idx) => (
                                    <div key={idx} className={`p-6 rounded-xl border border-${tech.color} bg-${tech.color}/5 hover:bg-${tech.color}/10 transition-colors`}>
                                        <h4 className={`text-xl font-bold text-${tech.color} mb-2`}>{tech.name}</h4>
                                        <p className="text-(--text-primary) text-sm">{tech.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <h3 className="text-2xl font-bold text-(--text-primary) mb-4 border-b border-(--text-tertiary) pb-2">Vectores de Reconocimiento</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentContent.types.map((type, idx) => (
                                    <InfoCard
                                        key={idx}
                                        title={type.name}
                                        description={type.desc}
                                        color="var(--color-info)"
                                        className="bg-(--bg-primary)"
                                        icon={<Globe size={18} className="text-info" />}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'phase2':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-(--bg-secondary) p-8 rounded-2xl border border-(--text-tertiary)">
                            <h2 className="text-3xl font-bold text-(--text-primary) mb-2 flex items-center">
                                <Hammer className="mr-3 text-warning" /> {currentContent.title}
                            </h2>
                            <p className="text-(--text-secondary) mb-8">{currentContent.subtitle}</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                {currentContent.concepts.map((item, idx) => (
                                    <div key={idx} className="bg-(--bg-primary) p-6 rounded-xl border border-(--text-tertiary) text-center hover:-translate-y-1 transition-transform">
                                        <h4 className="text-warning font-bold mb-2">{item.term}</h4>
                                        <p className="text-(--text-secondary) text-sm">{item.def}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-(--text-primary) flex items-center gap-2">
                                    <AlertTriangle className="text-error" /> Arsenal de Malware
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-error/5 border border-error/30 p-4 rounded-lg">
                                        <strong className="block text-error mb-2">Troyanos</strong>
                                        <ul className="list-disc list-inside text-sm text-(--text-secondary)">
                                            {currentContent.malwareTypes.trojans.map((m, i) => <li key={i}>{m}</li>)}
                                        </ul>
                                    </div>
                                    <div className="bg-error/5 border border-error/30 p-4 rounded-lg">
                                        <strong className="block text-error mb-2">Virus</strong>
                                        <ul className="list-disc list-inside text-sm text-(--text-secondary)">
                                            {currentContent.malwareTypes.virus.map((m, i) => <li key={i}>{m}</li>)}
                                        </ul>
                                    </div>
                                    <div className="bg-error/5 border border-error/30 p-4 rounded-lg">
                                        <strong className="block text-error mb-2">Gusanos</strong>
                                        <ul className="list-disc list-inside text-sm text-(--text-secondary)">
                                            {currentContent.malwareTypes.worms.map((m, i) => <li key={i}>{m}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'phase3':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-(--bg-secondary) p-8 rounded-2xl border border-(--text-tertiary)">
                            <h2 className="text-3xl font-bold text-(--text-primary) mb-2 flex items-center">
                                <Zap className="mr-3 text-accent" /> {currentContent.title}
                            </h2>
                            <p className="text-(--text-secondary) mb-8">{currentContent.subtitle}</p>

                            <div className="space-y-6">
                                {currentContent.vectors.map((vector, idx) => (
                                    <div key={idx} className="bg-(--bg-primary) rounded-xl overflow-hidden border border-(--text-tertiary)">
                                        <div className="bg-accent/10 px-6 py-3 border-b border-accent/20">
                                            <h4 className="font-bold text-accent">{vector.category}</h4>
                                        </div>
                                        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {vector.items.map((item, i) => (
                                                <span key={i} className="bg-(--bg-secondary) px-3 py-2 rounded text-sm text-(--text-secondary) text-center border border-(--text-tertiary)/50">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'phase456':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-(--bg-secondary) p-8 rounded-2xl border border-(--text-tertiary)">
                            <h2 className="text-3xl font-bold text-(--text-primary) mb-2 flex items-center">
                                <Anchor className="mr-3 text-success" /> {currentContent.title}
                            </h2>
                            <p className="text-(--text-secondary) mb-8">{currentContent.subtitle}</p>

                            <div className="space-y-6">
                                {currentContent.steps.map((step, idx) => (
                                    <div key={idx} className="flex gap-6 items-start p-6 bg-(--bg-primary) rounded-xl border-l-4 border-success shadow-lg">
                                        <div className="mt-1">
                                            {idx === 0 ? <Lock className="text-success" /> : (idx === 1 ? <Terminal className="text-success" /> : <Shield className="text-success" />)}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-(--text-primary) mb-2">{step.name}</h4>
                                            <p className="text-(--text-secondary) mb-2">{step.desc}</p>
                                            {step.tools && (
                                                <div className="flex gap-2 mt-2">
                                                    {step.tools.map((t, i) => <span key={i} className="text-xs bg-black/30 px-2 py-1 rounded text-success font-mono">{t}</span>)}
                                                </div>
                                            )}
                                            {step.details && <p className="text-sm text-(--text-secondary) mt-2 bg-black/20 p-2 rounded" dangerouslySetInnerHTML={{ __html: step.details }} />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'phase7':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-(--bg-secondary) p-8 rounded-2xl border border-(--text-tertiary)">
                            <h2 className="text-3xl font-bold text-(--text-primary) mb-2 flex items-center">
                                <Flag className="mr-3 text-error" /> {currentContent.title}
                            </h2>
                            <p className="text-(--text-secondary) mb-8">{currentContent.subtitle}</p>

                            <div className="grid grid-cols-1 gap-6">
                                {currentContent.actions.map((action, idx) => {
                                    const Icon = action.icon === 'Download' ? Download : (action.icon === 'Trash' ? Trash : Activity);
                                    return (
                                        <div key={idx} className="flex items-center gap-6 p-6 rounded-xl border border-error/30 bg-error/5 hover:bg-error/10 transition-all">
                                            <div className="p-4 bg-error text-white rounded-full">
                                                <Icon size={24} />
                                            </div>
                                            <div>
                                                <h4 className="text-2xl font-bold text-error mb-1">{action.name}</h4>
                                                <p className="text-(--text-primary) text-lg">{action.desc}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-8 pb-12">
            <PageHeader
                title={data.header.title}
                description={data.header.description}
                gradientFrom={data.header.gradientFrom}
                gradientTo={data.header.gradientTo}
            />

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full lg:w-64 shrink-0 space-y-2">
                    {data.menu.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${isActive
                                    ? 'bg-error/20 text-error font-bold border border-error/50 shadow-lg'
                                    : 'bg-(--bg-primary) text-(--text-secondary) hover:bg-(--bg-secondary) hover:text-(--text-primary)'
                                    }`}
                            >
                                <span className="flex items-center gap-3">
                                    {isActive && <ChevronRight size={16} className="animate-pulse" />}
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 min-w-0">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default KillChain;
