import React, { useState } from 'react';
import {
    Network, History, Shuffle, Key, Dices, PenTool,
    ShieldAlert, Zap, Cpu, Globe, ChevronRight,
    Lock, Unlock, ArrowRight
} from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Title from '../../components/ui/Title';
import QuoteBlock from '../../components/ui/QuoteBlock';
import TerminalWindow, { TerminalLine } from '../../components/ui/TerminalWindow';
import data from './data/asimetricaData.json';

const iconMap = {
    Network,
    History,
    Shuffle,
    Key,
    Dices,
    PenTool,
    ShieldAlert,
    Zap,
    Cpu,
    Globe
};

const Asimetrica = () => {
    const [activeSection, setActiveSection] = useState('intro');
    const currentContent = data.content[activeSection];

    if (!currentContent) {
        return <div className="p-8 text-center text-(--text-secondary)">Sección no encontrada: {activeSection}</div>;
    }

    const IconComponent = iconMap[currentContent.icon] || Network;

    const renderContent = () => {
        switch (activeSection) {
            case 'intro':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-(--bg-secondary) p-6 rounded-xl border-l-4 border-primary shadow-sm">
                            <h3 className="text-xl font-bold text-primary mb-2">{currentContent.subtitle}</h3>
                            <p className="text-(--text-secondary) leading-relaxed text-lg whitespace-pre-line">
                                {currentContent.description}
                            </p>
                        </div>

                        <div className="bg-success/5 p-6 rounded-xl border border-(--text-tertiary)/30 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Network size={120} />
                            </div>

                            <p className="text-(--text-primary) italic relative z-10 border-l-2 border-success pl-4">
                                "{currentContent.analysis}"
                            </p>
                        </div>
                    </div>
                );

            case 'origins':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <p className="text-(--text-secondary) text-lg">{currentContent.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {currentContent.problems.map((prob, idx) => (
                                <div key={idx} className="bg-(--bg-primary) p-5 rounded-xl border border-(--text-tertiary)/20 hover:border-error/50 transition-colors group">
                                    <h4 className="font-bold text-error mb-3 flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                        <ShieldAlert size={18} />
                                        {prob.title}
                                    </h4>
                                    <p className="text-sm text-(--text-secondary) mb-3">{prob.desc}</p>
                                    {prob.math && (
                                        <div className="bg-(--bg-code) p-2 rounded text-center text-(--white-color) font-mono text-xs">
                                            {prob.math}
                                        </div>
                                    )}
                                    <p className="text-sm text-primary my-3">{prob.analysis}</p>
                                </div>
                            ))}
                        </div>

                        <p className="text-(--text-secondary) text-lg">{currentContent.description2}</p>

                        <div className="bg-(--bg-primary) p-6 rounded-xl border border-(--text-tertiary)/20">
                            <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                                <History size={20} />
                                Contexto Histórico
                            </h4>
                            <p className="text-(--text-secondary) mb-4">{currentContent.history.text}</p>

                        </div>

                        <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                            <p className=" text-primary  italic">
                                {currentContent.history.analysis}
                            </p>
                        </div>

                    </div>
                );

            case 'dhke':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-success mb-2">{currentContent.subtitle}</h3>
                                <p className="text-(--text-secondary) mb-6">{currentContent.description}</p>
                                <div className="space-y-3">
                                    {currentContent.steps.map((step, idx) => (
                                        <div key={idx} className="flex gap-3 items-start p-3 bg-(--bg-secondary) rounded-lg border border-(--text-tertiary)/10">
                                            <span className="shrink-0 w-6 h-6 rounded-full bg-success/10 text-success flex items-center justify-center text-xs font-bold">
                                                {idx + 1}
                                            </span>
                                            <span
                                                className="text-sm text-(--text-primary) font-mono whitespace-pre-wrap"
                                                dangerouslySetInnerHTML={{ __html: step.replace(/^\d\.\s/, '') }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full md:w-1/2">
                                <TerminalWindow title="Intercambio DHKE (Script Demo)">
                                    <TerminalLine type="comment">// Configuración: Primos públicos compartidos</TerminalLine>
                                    <TerminalLine>{currentContent.example.params}</TerminalLine>
                                    <div className="my-2 border-t border-white/10"></div>
                                    <TerminalLine type="comment">// Alice: Deriva pública (A) de su secreto (a)</TerminalLine>
                                    <TerminalLine>{currentContent.example.alice}</TerminalLine>
                                    <div className="my-2 border-t border-white/10"></div>
                                    <TerminalLine type="comment">// Bob: Deriva pública (B) de su secreto (b)</TerminalLine>
                                    <TerminalLine>{currentContent.example.bob}</TerminalLine>
                                    <div className="my-4 border-t border-success/30"></div>
                                    <TerminalLine type="comment">// Resultado: El secreto calculado es idéntico</TerminalLine>
                                    <TerminalLine type="output">
                                        <span className="text-success font-bold">✓ {currentContent.example.result}</span>
                                    </TerminalLine>
                                </TerminalWindow>
                            </div>
                        </div>

                        <div className="bg-warning/10 p-4 rounded-xl border border-warning/30 flex gap-4 items-start">
                            <ShieldAlert className="text-warning shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-warning text-sm uppercase mb-1">Advertencia Técnica: Man-in-the-Middle</h4>
                                <p className="text-sm text-(--text-primary)">{currentContent.warning}</p>
                            </div>
                        </div>

                        {currentContent.analysis && (
                            <div className="bg-success/5 p-4 rounded-xl border-l-4 border-success">
                                <p className=" text-success italic">"{currentContent.analysis}"</p>
                            </div>
                        )}
                    </div>
                );

            case 'rsa':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-(--bg-primary) p-6 rounded-xl border-l-4 border-primary">
                            <h3 className="text-lg font-bold text-primary mb-2">{currentContent.subtitle}</h3>
                            <p className="text-(--text-secondary)">{currentContent.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="font-bold text-(--text-primary) border-b border-(--text-tertiary)/30 pb-2">Generación de Claves</h4>
                                <ul className="space-y-3">
                                    {currentContent.steps.map((step, idx) => (
                                        <li key={idx} className="text-sm text-(--text-secondary) flex gap-2">
                                            <span className="text-primary">•</span>
                                            <span className="font-mono">{step}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-6 p-4 bg-(--bg-primary) rounded-lg border border-(--text-tertiary)/30">
                                    <div className="flex justify-around text-center mb-4">
                                        <div>
                                            <div className="text-xs text-(--text-primary) uppercase mb-1">Cifrado</div>
                                            <div className="font-mono text-error ">{currentContent.math.cifrado}</div>
                                        </div>
                                        <div className="w-px bg-(--text-tertiary)/30"></div>
                                        <div>
                                            <div className="text-xs text-(--text-primary) uppercase mb-1">Descifrado</div>
                                            <div className="font-mono text-success ">{currentContent.math.descifrado}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <TerminalWindow title="Ejemplo RSA Práctico">
                                <TerminalLine type="comment">// Inicialización</TerminalLine>
                                <TerminalLine>{currentContent.example.params}</TerminalLine>
                                <TerminalLine>{currentContent.example.calc.split('.')[0]}</TerminalLine>
                                <div className="my-2"></div>
                                <TerminalLine type="comment">// Resultado de Claves</TerminalLine>
                                <TerminalLine>{currentContent.example.calc.split('Si ')[1]}</TerminalLine>
                            </TerminalWindow>
                        </div>

                        <p className="p-4 bg-primary/5 rounded-lg  text-primary border-l-2 border-primary italic">
                            {currentContent.analysis}
                        </p>

                        {currentContent.warning && (
                            <div className="bg-error/10 p-4 rounded-xl border border-error/30 flex gap-4 items-start">
                                <ShieldAlert className="text-error shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-error text-sm uppercase mb-1">Advertencia de Seguridad</h4>
                                    <p className="text-sm text-(--text-primary)">{currentContent.warning}</p>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 'elgamal':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-(--bg-secondary) p-6 rounded-xl border-t-4 border-accent shadow-sm">
                            <h3 className="text-xl font-bold text-accent mb-2">{currentContent.subtitle}</h3>
                            <p className="text-(--text-secondary)">{currentContent.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {currentContent.features.map((feat, idx) => (
                                <div key={idx} className="p-5 bg-(--bg-primary) rounded-xl border border-(--text-tertiary)/20">
                                    <h4 className="font-bold text-(--text-primary) mb-2 flex items-center gap-2">
                                        <Dices size={18} className="text-accent" />
                                        {feat.title}
                                    </h4>
                                    <p className="text-sm text-(--text-secondary)">{feat.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 bg-(--bg-code) rounded-xl flex flex-col items-center justify-center text-center">
                            <span className="text-xs text-(--text-secondary) uppercase tracking-wider mb-4">Ecuación de Cifrado (Expansión)</span>
                            <code className="text-xl md:text-2xl text-(--white-color) font-mono font-bold">
                                {currentContent.math}
                            </code>
                        </div>

                        <p className="p-4 bg-accent/5 rounded-lg  text-accent border-l-2 border-accent italic">
                            {currentContent.analysis}
                        </p>
                    </div>
                );

            case 'digital-signature':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="flex items-center gap-4 mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-(--text-primary)">{currentContent.subtitle}</h3>
                                <p className="text-(--text-secondary)">{currentContent.description}</p>
                            </div>
                        </div>

                        {currentContent.note && (
                            <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                                <p className="text-primary italic">
                                    "{currentContent.note}"
                                </p>
                            </div>
                        )}

                        <div className="bg-(--bg-secondary) rounded-xl overflow-hidden border border-(--text-tertiary)/20">
                            <div className="bg-primary/10 p-4 border-b border-primary/20">
                                <h4 className="font-bold text-primary">{currentContent.dsa.title}</h4>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-4">
                                    {currentContent.dsa.steps.map((step, idx) => (
                                        <li key={idx} className="flex items-center gap-4">
                                            <span className="w-8 h-8 rounded-full bg-(--bg-primary) border border-(--text-tertiary) flex items-center justify-center text-xs font-bold text-(--text-secondary)">
                                                {idx + 1}
                                            </span>
                                            <code className="flex-1 bg-(--bg-code) p-3 rounded text-sm text-(--white-color) font-mono">
                                                {step}
                                            </code>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="p-6 border-2 border-dashed border-primary/30 rounded-xl bg-primary/5 text-center">
                            <p className="text-primary font-bold text-lg">"{currentContent.quote}"</p>
                        </div>
                    </div>
                );

            case 'vulnerabilities':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-error/5 p-6 rounded-xl border border-error/20">
                            <h3 className="text-xl font-bold text-error mb-2">{currentContent.subtitle}</h3>
                            <p className="text-(--text-primary)">{currentContent.description}</p>
                        </div>

                        <div className="space-y-4">
                            {currentContent.types.map((type, idx) => (
                                <div key={idx} className="p-5 bg-(--bg-primary) rounded-lg border-l-4 border-error hover:bg-(--bg-tertiary) transition-colors">
                                    <div className="flex gap-3 mb-2 ">
                                        <ShieldAlert className="text-error shrink-0 mt-1" size={20} />
                                        <h4 className="font-bold text-(--text-primary) text-lg">{type.name}</h4>
                                    </div>

                                    {type.desc && <p className="text-sm text-(--text-secondary) mb-3 pl-8">{type.desc}</p>}

                                    {type.subitems && (
                                        <ul className="list-disc list-inside space-y-1 pl-8 text-sm text-(--text-secondary)">
                                            {type.subitems.map((item, i) => (
                                                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                                            ))}
                                        </ul>
                                    )}

                                    {type.math && (
                                        <div className="my-3 ml-8 p-3 bg-(--bg-code) rounded text-(--white-color) font-mono text-sm border border-(--text-tertiary)/20 overflow-x-auto">
                                            {type.math}
                                        </div>
                                    )}

                                    {type.note && (
                                        <p className="text-sm text-error/80 italic mt-2 border-l-2 border-error/50 pl-3 ml-8">
                                            {type.note}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-primary/5 rounded-lg border-l-2 border-primary">
                            <p className=" text-primary italic">
                                {currentContent.analysis}
                            </p>
                        </div>
                    </div>
                );

            case 'optimization':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <h3 className="text-xl font-bold text-(--text-primary) mb-2">{currentContent.subtitle}</h3>
                        <p className="text-(--text-secondary) mb-6">{currentContent.description}</p>

                        <div className="grid grid-cols-1 gap-4 mb-8">
                            {currentContent.techniques.map((tech, idx) => (
                                <div key={idx} className="p-5 bg-(--bg-secondary) rounded-xl border-t-4 border-success shadow-sm">
                                    <h4 className="font-bold text-success text-sm mb-2">{tech.name}</h4>
                                    <p className="text-sm text-(--text-secondary)" dangerouslySetInnerHTML={{ __html: tech.desc }} />
                                </div>
                            ))}
                        </div>

                        <div className="overflow-hidden rounded-xl border border-(--text-tertiary) mb-8">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-(--bg-tertiary) text-(--text-primary) text-xs uppercase">
                                    <tr>
                                        {currentContent.securityTable.headers.map((h, i) => (
                                            <th key={i} className="px-6 py-3">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-(--text-tertiary)/20 bg-(--bg-primary)">
                                    {currentContent.securityTable.rows.map((row, i) => (
                                        <tr key={i}>
                                            <td className="px-6 py-4 font-bold text-(--text-primary)">{row[0]}</td>
                                            <td className="px-6 py-4 font-mono text-warning text-xs">{row[1]}</td>
                                            <td className="px-6 py-4 font-mono text-success text-xs">{row[2]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 bg-primary/5 rounded-lg border-l-2 border-primary">
                            <p className=" text-primary italic">
                                {currentContent.analysis}
                            </p>
                        </div>
                    </div>
                );

            case 'post-quantum':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="relative p-8 bg-black rounded-2xl overflow-hidden border border-(--text-tertiary)/30">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-purple-900/40 via-black to-black"></div>
                            <div className="relative z-10 text-center">
                                <Cpu size={48} className="mx-auto text-purple-500 mb-4 animate-pulse" />
                                <h3 className="text-2xl font-bold text-white mb-4">{currentContent.subtitle}</h3>
                                <p className="text-gray-300 max-w-2xl mx-auto mb-8 whitespace-pre-wrap">{currentContent.description}</p>

                                <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                                    {currentContent.solutions.map((sol, idx) => (
                                        <div key={idx} className="bg-white/5 p-3 rounded border border-white/10 text-purple-300 text-sm font-mono">
                                            {sol}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-warning/5 rounded-xl border-l-4 border-warning">
                            <h4 className="font-bold text-warning mb-2 uppercase text-xs tracking-wider">Análisis del Profesor</h4>
                            <p className="text-(--text-primary)">{currentContent.analysis}</p>
                        </div>
                    </div>
                );

            case 'future':
                return (
                    <div className="flex items-center justify-center py-4 animate-fade-in">
                        <div className="max-w-2xl text-center">
                            <Globe size={44} className="mx-auto text-primary" strokeWidth={1} />
                            <h3 className="text-2xl font-bold text-(--text-primary)">{currentContent.title.split(':')[1]}</h3>
                            <div
                                className="text-md text-(--text-secondary) leading-relaxed bold"
                                dangerouslySetInnerHTML={{ __html: currentContent.content }}
                            />
                        </div>
                    </div>
                );

            default:
                return <div className="text-(--text-secondary)">Seleccione un tema del menú lateral.</div>;
        }
    };

    return (
        <div className="animate-fade-in space-y-8">
            <PageHeader
                title={data.header.title}
                description={data.header.description}
                gradientFrom="primary"
                gradientTo="success"
            />

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Menú Lateral */}
                <div className="lg:w-72 shrink-0 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider mb-4 px-2 text-(--text-tertiary)">
                        Temario
                    </div>
                    {data.menu.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 cursor-pointer flex items-center justify-between group ${activeSection === item.id
                                ? 'bg-(--bg-tertiary) text-primary border-l-4 border-primary font-bold shadow-md'
                                : 'hover:bg-(--bg-hover) text-(--text-secondary) hover:text-(--text-primary) border-l-4 border-transparent'
                                }`}
                        >
                            <span className="truncate">{item.label}</span>
                            {activeSection === item.id && <ChevronRight size={16} />}
                        </button>
                    ))}
                </div>

                {/* Contenido Principal */}
                <div className="grow min-w-0">
                    <Card className="h-full min-h-[600px] flex flex-col relative overflow-hidden">
                        {/* Header del contenido */}
                        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-(--text-tertiary)/20">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                <IconComponent size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-(--text-primary)">
                                    {currentContent.title}
                                </h2>
                                {/* Breadcrumb simple */}
                                <div className="flex items-center gap-2 text-xs text-(--text-tertiary) mt-1">
                                </div>
                            </div>
                        </div>

                        {renderContent()}

                    </Card>
                </div>
            </div>

            <QuoteBlock
                quote={data.quote.text}
                author={data.quote.author}
                gradientFrom="primary"
                gradientTo="accent"
            />
        </div>
    );
};

export default Asimetrica;
