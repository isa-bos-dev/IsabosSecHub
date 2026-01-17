import React from 'react';
import { motion } from 'framer-motion';
import { Network, Unlock, GitCommit, ArrowRight, ShieldAlert, FileWarning, Monitor, Shield } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import data from './data/ataques.json';
import RadarChart from '../../components/charts/RadarChart';
import QuoteBlock from '../../components/ui/QuoteBlock';
import InfoCard from '../../components/ui/InfoCard';

const Ataques = () => {
    return (
        <div className="space-y-16 pb-12">
            <PageHeader
                title="Ataques de red: Interceptación y manipulación"
                description="La red es un entorno hostil. Descubre cómo los atacantes usan la física de los protocolos para robar información (Sniffing) y redirigir tráfico (Spoofing)."
                gradientFrom="primary"
                gradientTo="primary-alpha-10"
            />

            {/* Sección 1: Sniffing y Radar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="space-y-6"
                >
                    <h2 className="text-3xl font-bold text-(--text-primary) mb-2 flex items-center">
                        <Network className="mr-3" style={{ color: 'var(--color-error)' }} /> {data.sniffing.title}
                    </h2>
                    <div className="prose prose-invert max-w-none text-(--text-secondary)">
                        <p dangerouslySetInnerHTML={{ __html: data.sniffing.description }} />
                        <h4 className="text-(--text-primary) font-bold mt-4">{data.sniffing.dangerTitle}</h4>
                        <p>{data.sniffing.dangerDesc}</p>
                    </div>
                </motion.div>

                <RadarChart
                    data={data.radarChart}
                    title={data.radarChart.title}
                />
            </div>

            {/* Sección 2: Clase Magistral de ARP Spoofing */}
            <div className="bg-(--bg-secondary) rounded-2xl p-8 border border-(--text-tertiary) relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -z-10"></div>

                <h2 className="text-3xl font-bold text-(--text-primary) mb-8 text-center flex justify-center items-center">
                    <GitCommit className="mr-3" style={{ color: 'var(--color-warning)' }} /> {data.arpSpoofing.title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.arpSpoofing.steps.map((step, index) => {
                        const borderColor = step.borderColor === 'text-tertiary' ? 'var(--text-tertiary)' : `var(--color-${step.borderColor})`;

                        const content = (
                            <>
                                <p className="text-sm text-(--text-secondary) mb-2">{step.desc}</p>
                                {step.code && (
                                    <div
                                        className="bg-(--bg-code) p-2 rounded font-(--font-mono) text-xs mt-2 overflow-x-auto"
                                        style={{ color: `var(--color-${step.codeColor})` }}
                                    >
                                        {step.code}
                                    </div>
                                )}
                                {step.codeLines && (
                                    <div className="bg-(--bg-code) p-2 rounded font-(--font-mono) text-xs mt-2 space-y-1 overflow-x-auto">
                                        {step.codeLines.map((line, i) => (
                                            <p key={i} style={{ color: `var(--color-${step.codeColor})` }}>{line}</p>
                                        ))}
                                    </div>
                                )}
                                {step.diagram && (
                                    <div className="flex items-center justify-center mt-4 space-x-2">
                                        <div className="text-center">
                                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-white">V</div>
                                            <span className="text-[10px] text-(--text-secondary)">Víctima</span>
                                        </div>
                                        <ArrowRight className="text-error animate-pulse" />
                                        <div className="text-center">
                                            <div className="w-8 h-8 rounded-full bg-error flex items-center justify-center text-xs font-bold text-white">A</div>
                                            <span className="text-[10px] text-error font-bold">Atacante</span>
                                        </div>
                                        <ArrowRight className="text-error animate-pulse" />
                                        <div className="text-center">
                                            <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center text-xs font-bold text-white">R</div>
                                            <span className="text-[10px] text-(--text-secondary)">Router</span>
                                        </div>
                                    </div>
                                )}
                            </>
                        );

                        return (
                            <InfoCard
                                key={index}
                                title={step.title}
                                description={content}
                                color={borderColor}
                                borderPosition="left"
                                className="bg-black/40"
                                fullHeight={false}
                                cornerBadge={step.badge && (
                                    <span className="bg-error text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse shadow-md">
                                        {step.badge}
                                    </span>
                                )}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Sección 3: Fragmentación */}
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 bg-(--bg-secondary) p-8 rounded-2xl border border-(--text-tertiary)">
                    <h3 className="text-2xl font-bold text-(--text-primary) mb-4 flex items-center">
                        <FileWarning className="mr-3" style={{ color: 'var(--color-warning)' }} /> {data.fragmentation.title}
                    </h3>
                    <p className="text-(--text-secondary) mb-4 leading-relaxed">
                        {data.fragmentation.description}
                    </p>
                    <ul className="space-y-4">
                        {data.fragmentation.attacks.map((attack, index) => (
                            <li key={index} className="bg-(--bg-primary) p-4 rounded-lg">
                                <strong
                                    className="block mb-1"
                                    style={{ color: index === 0 ? 'var(--color-info)' : 'var(--color-accent)' }}
                                >
                                    {attack.name}
                                </strong>
                                <p className="text-sm text-(--text-secondary)">{attack.desc}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center p-8 bg-(--bg-primary) rounded-2xl border border-(--text-tertiary) w-full">
                        <ShieldAlert size={64} className="mx-auto mb-4" style={{ color: 'var(--color-success)' }} />
                        <h3 className="text-xl font-bold text-(--text-primary) mb-2">{data.protection.title}</h3>
                        <p className="text-(--text-secondary) mb-6">{data.protection.subtitle}</p>
                        <div className="grid grid-cols-1 gap-3 text-left">
                            {data.protection.tips.map((tip, index) => {
                                const Icon = index === 0 ? Unlock : (index === 1 ? Shield : Monitor);
                                return (
                                    <div key={index} className="flex items-center p-2 bg-(--bg-secondary) rounded border border-(--text-tertiary)">
                                        <Icon className="w-4 h-4 mr-3" style={{ color: 'var(--color-success)' }} />
                                        <span className="text-sm text-(--text-secondary)">{tip.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {data.quote && (
                <QuoteBlock
                    quote={data.quote.text}
                    author={data.quote.author}
                />
            )}
        </div>
    );
};

export default Ataques;
