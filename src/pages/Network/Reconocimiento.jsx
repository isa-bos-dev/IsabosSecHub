import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Search, Eye, Radio, Shield } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import data from './data/reconocimiento.json';
import TerminalWindow, { TerminalLine } from '../../components/ui/TerminalWindow';
import QuoteBlock from '../../components/ui/QuoteBlock';
import InfoCard from '../../components/ui/InfoCard';

const Reconocimiento = () => {
    const getEvasionIcon = (index) => {
        switch (index) {
            case 0: return <Shield className="w-4 h-4 mr-2" style={{ color: 'var(--color-secondary)' }} />;
            case 1: return <Eye className="w-4 h-4 mr-2" style={{ color: 'var(--color-secondary)' }} />;
            case 2: return <Terminal className="w-4 h-4 mr-2" style={{ color: 'var(--color-secondary)' }} />;
            default: return <Shield className="w-4 h-4 mr-2" style={{ color: 'var(--color-secondary)' }} />;
        }
    };

    return (
        <div className="space-y-12 pb-12">
            <PageHeader
                title="Reconocimiento y escaneo (Nmap)"
                description="La fase de reconocimiento es el cimiento de cualquier prueba de penetración exitosa. Antes de lanzar un solo exploit, es crucial mapear la superficie de ataque, identificar servicios activos y comprender la topología de la red objetivo. En esta sección, desglosamos las técnicas de escaneo de puertos, la interpretación de estados y las estrategias de evasión utilizando Nmap, la herramienta estándar de la industria."
                gradientFrom="primary"
                gradientTo="primary-alpha-10"
            />

            {/* Bloques de Contenido */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Bloque 1: Estados de Puerto */}
                <div className="bg-(--bg-secondary) rounded-xl p-6 border border-(--text-tertiary) shadow-lg">
                    <h3 className="text-xl font-bold text-(--text-primary) mb-4 flex items-center border-b border-(--text-tertiary) pb-2">
                        <Radio className="mr-2" style={{ color: 'var(--color-success)' }} /> {data.portStates.title}
                    </h3>
                    <p className="text-(--text-secondary) mb-4 text-sm">
                        {data.portStates.description}
                    </p>
                    <div className="space-y-3">
                        {data.portStates.states.map((state, index) => (
                            <div key={index} className="flex bg-(--bg-primary)/50 p-3 rounded items-start">
                                <span
                                    className="w-3 h-3 rounded-full mt-1.5 mr-3 shrink-0"
                                    style={{
                                        backgroundColor: `var(--color-${state.color})`,
                                        boxShadow: `0 0 10px color-mix(in srgb, var(--color-${state.color}), transparent 50%)`
                                    }}
                                ></span>
                                <div>
                                    <strong
                                        className="block text-sm"
                                        style={{ color: `var(--color-${state.color})` }}
                                    >
                                        {state.name}
                                    </strong>
                                    <p className="text-xs text-(--text-secondary)">{state.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bloque 2: Simulación de Escáner Interactivo */}
                <TerminalWindow title="Nmap Scan">
                    <TerminalLine type="command">
                        root@kali:~$ {data.terminal.command}
                    </TerminalLine>

                    {data.terminal.output.map((line, i) => (
                        <TerminalLine key={`out-${i}`}>{line}</TerminalLine>
                    ))}
                    <br />
                    <div className="grid grid-cols-[80px_1fr_1fr] gap-2 text-xs">
                        <span className="font-bold text-(--text-primary)">PORT</span>
                        <span className="font-bold text-(--text-primary)">STATE</span>
                        <span className="font-bold text-(--text-primary)">SERVICE</span>

                        {data.terminal.ports.map((port, i) => (
                            <React.Fragment key={i}>
                                <span>{port.port}</span>
                                <span style={{ color: `var(--color-${port.color})` }}>{port.state}</span>
                                <span>{port.service}</span>
                            </React.Fragment>
                        ))}
                    </div>

                    <div
                        className="p-2 rounded text-xs mt-4 border relative"
                        style={{
                            color: 'var(--color-primary)',
                            borderColor: 'color-mix(in srgb, var(--color-primary), transparent 50%)',
                            backgroundColor: 'color-mix(in srgb, var(--color-primary), transparent 80%)'
                        }}
                    >
                        <strong>Análisis:</strong> {data.terminal.analysis}
                    </div>
                </TerminalWindow>
            </div>

            {/* Profundización: Tipos de Escaneo */}
            <div>
                <h2 className="text-2xl font-bold text-(--text-primary) mb-6 flex items-center">
                    <Search className="mr-3" style={{ color: 'var(--color-success)' }} /> Anatomía de los escaneos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.scanTypes.map((scan, index) => (
                        <InfoCard
                            key={index}
                            title={scan.name}
                            description={scan.desc}
                            color={`var(--color-${scan.color})`}
                            borderPosition="left"
                            headerRight={
                                <p
                                    className="text-xs font-(--font-mono) p-1 rounded inline-block border transition-colors duration-300
                                    bg-(--bg-primary) border-(--text-tertiary)
                                    group-hover:border-(--theme-color) group-hover:bg-[color-mix(in_srgb,var(--theme-color),transparent_90%)]"
                                    style={{
                                        '--theme-color': `var(--color-${scan.color})`
                                    }}
                                >
                                    <span className="text-(--text-tertiary) group-hover:text-(--theme-color) transition-colors duration-300">
                                        {scan.badge}
                                    </span>
                                </p>
                            }
                            footer={
                                <div
                                    className="text-xs p-2 rounded relative overflow-hidden"
                                    style={{
                                        color: `var(--color-${scan.color})`,
                                        borderColor: `var(--color-${scan.color})`,
                                        borderWidth: '1px'
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 opacity-10"
                                        style={{ backgroundColor: `var(--color-${scan.color})` }}
                                    />
                                    <span className="relative z-10">{scan.warning || scan.note}</span>
                                </div>
                            }
                            className="group transition-all duration-300"
                        />
                    ))}
                </div>
            </div>

            {/* Sección Avanzada: Evasión */}
            <div className="bg-(--bg-secondary) rounded-xl p-8 border border-(--text-tertiary)">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-2xl font-bold text-(--text-primary) mb-4">{data.evasion.title}</h3>
                        <p className="text-(--text-secondary) mb-4">
                            {data.evasion.description}
                        </p>
                        <ul className="space-y-3 text-sm text-(--text-secondary)">
                            {data.evasion.techniques.map((tech, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="shrink-0 mt-0.5 mr-2">
                                        {getEvasionIcon(i)}
                                    </span>
                                    <span>
                                        <strong className="text-(--text-primary)">{tech.name}:</strong>
                                        <span className="ml-1">{tech.desc}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 min-w-0 md:self-center w-full">
                        <TerminalWindow title="Evasion Techniques">
                            {data.evasion.codeBlock.split('\n').map((line, index) => {
                                const isComment = line.trim().startsWith('#');
                                const isCommand = line.trim().startsWith('root@');

                                if (isCommand) {
                                    return <TerminalLine key={index} type="command">{line}</TerminalLine>;
                                }
                                if (isComment) {
                                    return <TerminalLine key={index} type="comment">{line}</TerminalLine>;
                                }
                                return <TerminalLine key={index} type="output">{line || ' '}</TerminalLine>;
                            })}
                        </TerminalWindow>
                    </div>
                </div>
            </div>

            <QuoteBlock
                quote="Si conoces al enemigo y te conoces a ti mismo, no debes temer el resultado de cien batallas."
                author="Sun Tzu - El Arte de la Guerra"
                gradientFrom="primary"
                gradientTo="secondary"
            />
        </div>
    );
};

export default Reconocimiento;
