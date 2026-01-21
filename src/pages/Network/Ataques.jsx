import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Network, Unlock, GitCommit, ArrowRight, ShieldAlert,
    FileWarning, Monitor, Shield, Terminal, Globe, ChevronRight
} from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import data from './data/ataques.json';
import RadarChart from '../../components/charts/RadarChart';
import QuoteBlock from '../../components/ui/QuoteBlock';
import InfoCard from '../../components/ui/InfoCard';

const iconMap = {
    Network,
    GitCommit,
    FileWarning,
    Terminal,
    Globe,
    Shield
};

const Ataques = () => {
    const [activeSection, setActiveSection] = useState('intro');
    const currentContent = data.content[activeSection];

    const renderContent = () => {
        switch (activeSection) {
            case 'intro':
                return (
                    <div className="space-y-12 animate-fade-in">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-(--text-primary) mb-2 flex items-center">
                                    <Network className="mr-3" style={{ color: 'var(--color-error)' }} /> {currentContent.sniffing.title}
                                </h3>
                                <div className="prose prose-invert max-w-none text-(--text-secondary)">
                                    <p dangerouslySetInnerHTML={{ __html: currentContent.sniffing.description }} />
                                    <h4 className="text-(--text-primary) font-bold mt-4">{currentContent.sniffing.dangerTitle}</h4>
                                    <p>{currentContent.sniffing.dangerDesc}</p>
                                </div>
                            </div>
                            <RadarChart
                                data={currentContent.radarChart}
                                title={currentContent.radarChart.title}
                            />
                        </div>
                    </div>
                );

            case 'arp':
                return (
                    <div className="space-y-12 animate-fade-in">
                        {/* ARP Spoofing Section */}
                        <div className="bg-(--bg-secondary) rounded-2xl p-8 border border-(--text-tertiary) relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -z-10"></div>
                            <h2 className="text-3xl font-bold text-(--text-primary) mb-8 text-center flex justify-center items-center">
                                <GitCommit className="mr-3" style={{ color: 'var(--color-warning)' }} /> {currentContent.title_content}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {currentContent.steps.map((step, index) => {
                                    const borderColor = step.borderColor === 'text-tertiary' ? 'var(--text-tertiary)' : `var(--color-${step.borderColor})`;
                                    return (
                                        <InfoCard
                                            key={index}
                                            title={step.title}
                                            description={
                                                <>
                                                    <p className="text-sm text-(--text-secondary) mb-2">{step.desc}</p>
                                                    {step.code && <div className="bg-(--bg-code) p-2 rounded font-(--font-mono) text-xs mt-2 overflow-x-auto" style={{ color: `var(--color-${step.codeColor})` }}>{step.code}</div>}
                                                    {step.codeLines && <div className="bg-(--bg-code) p-2 rounded font-(--font-mono) text-xs mt-2 space-y-1 overflow-x-auto">{step.codeLines.map((line, i) => <p key={i} style={{ color: `var(--color-${step.codeColor})` }}>{line}</p>)}</div>}
                                                    {step.diagram && (
                                                        <div className="flex items-center justify-center mt-4 space-x-2">
                                                            <div className="text-center"><div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-white">V</div><span className="text-[10px] text-(--text-secondary)">Víctima</span></div>
                                                            <ArrowRight className="text-error animate-pulse" />
                                                            <div className="text-center"><div className="w-8 h-8 rounded-full bg-error flex items-center justify-center text-xs font-bold text-white">A</div><span className="text-[10px] text-error font-bold">Atacante</span></div>
                                                            <ArrowRight className="text-error animate-pulse" />
                                                            <div className="text-center"><div className="w-8 h-8 rounded-full bg-success flex items-center justify-center text-xs font-bold text-white">R</div><span className="text-[10px] text-(--text-secondary)">Router</span></div>
                                                        </div>
                                                    )}
                                                </>
                                            }
                                            color={borderColor}
                                            borderPosition="left"
                                            className="bg-black/40"
                                            fullHeight={false}
                                            cornerBadge={step.badge && <span className="bg-error text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse shadow-md">{step.badge}</span>}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        {/* DNS Spoofing Section (Now included here) */}
                        {currentContent.dnsData && (
                            <div className="bg-(--bg-secondary) rounded-2xl p-8 border border-(--text-tertiary)">
                                <h2 className="text-3xl font-bold text-(--text-primary) mb-6 flex items-center">
                                    <Globe className="mr-3" style={{ color: 'var(--color-error)' }} /> {currentContent.dnsData.title}
                                </h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div className="text-(--text-primary) px-6 py-4 bg-error/10 rounded-xl border-l-4 border-error transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-error/20">
                                            <h4 className="font-bold text-error uppercase text-xs mb-2">{currentContent.dnsData.scenario.title}</h4>
                                            <p className="mb-4" dangerouslySetInnerHTML={{ __html: currentContent.dnsData.scenario.text }} />
                                            <div className="bg-(--bg-primary) p-4 rounded-lg font-mono text-sm text-center border border-(--text-tertiary)/30 shadow-inner text-warning">
                                                {currentContent.dnsData.scenario.diagram}
                                            </div>
                                        </div>
                                        <div className="p-6 bg-warning/5 rounded-xl border-l-4 border-warning/50 hover:bg-warning/10 transition-colors duration-300">
                                            <h4 className="font-bold text-warning mb-2 flex items-center gap-2">
                                                <ShieldAlert size={18} />
                                                {currentContent.dnsData.solution.title}
                                            </h4>
                                            <p className="text-sm text-(--text-primary) leading-relaxed" dangerouslySetInnerHTML={{ __html: currentContent.dnsData.solution.explanation }} />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        {currentContent.dnsData.solution.steps.map((step) => (
                                            <div key={step.id} className="group p-4 bg-(--bg-primary) rounded-xl border border-(--text-tertiary) hover:border-warning hover:shadow-lg hover:shadow-warning/10 hover:-translate-y-1 transition-all duration-300">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="w-6 h-6 rounded-full bg-warning/20 text-warning flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">{step.id}</span>
                                                    <h5 className="font-bold text-(--text-primary) text-sm group-hover:text-warning transition-colors">{step.action}</h5>
                                                </div>
                                                <div className="bg-black/40 p-3 rounded-lg mb-2 font-mono text-xs text-warning border-l-4 border-warning shadow-inner group-hover:bg-black/50 transition-colors">
                                                    {'>'} {step.command}
                                                </div>
                                                <p className="text-xs text-(--text-primary) pl-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: step.desc }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 'frag':
                return (
                    <div className="bg-(--bg-secondary) p-8 rounded-2xl border border-(--text-tertiary) animate-fade-in">
                        <h3 className="text-2xl font-bold text-(--text-primary) mb-4 flex items-center">
                            <FileWarning className="mr-3" style={{ color: 'var(--color-warning)' }} /> {currentContent.data.title}
                        </h3>
                        <p className="text-(--text-secondary) mb-4 leading-relaxed">{currentContent.data.description}</p>
                        <ul className="space-y-4">
                            {currentContent.data.attacks.map((attack, index) => (
                                <li key={index} className="bg-(--bg-primary) p-4 rounded-lg">
                                    <strong className="block mb-1" style={{ color: index === 0 ? 'var(--color-info)' : 'var(--color-accent)' }}>{attack.name}</strong>
                                    <p className="text-sm text-(--text-secondary)">{attack.desc}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case 'pivoting':
                const exerciseData = currentContent.data;
                // Specific styling for Pivoting
                const themeColor = 'info';
                const successColor = 'success';
                const accentColor = 'accent';

                return (
                    <div className="bg-(--bg-secondary) rounded-2xl p-8 border border-(--text-tertiary) animate-fade-in">
                        <h2 className="text-3xl font-bold text-(--text-primary) mb-6 flex items-center">
                            <Terminal className="mr-3" style={{ color: 'var(--color-accent)' }} />
                            {exerciseData.title}
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className={`text-(--text-primary) px-6 py-4 bg-${themeColor}/10 rounded-xl border-l-4 border-${themeColor} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-${themeColor}/20`}>
                                    <h4 className={`font-bold text-${themeColor} uppercase text-xs mb-2`}>{exerciseData.scenario.title}</h4>
                                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: exerciseData.scenario.text }} />
                                    <div className="bg-(--bg-primary) p-4 rounded-lg font-mono text-sm text-center border border-(--text-tertiary)/30 shadow-inner text-accent">
                                        {exerciseData.scenario.diagram}
                                    </div>
                                </div>
                                <div className={`p-6 bg-${successColor}/5 rounded-xl border-l-4 border-${successColor}/50 hover:bg-${successColor}/10 transition-colors duration-300`}>
                                    <h4 className={`font-bold text-${successColor} mb-2 flex items-center gap-2`}>
                                        <Unlock size={18} />
                                        {exerciseData.solution.title}
                                    </h4>
                                    <p className="text-sm text-(--text-primary) leading-relaxed" dangerouslySetInnerHTML={{ __html: exerciseData.solution.explanation }} />
                                </div>
                            </div>
                            <div className="space-y-3">
                                {exerciseData.solution.steps.map((step) => (
                                    <div key={step.id} className={`group p-4 bg-(--bg-primary) rounded-xl border border-(--text-tertiary) hover:border-${accentColor} hover:shadow-lg hover:shadow-${accentColor}/10 hover:-translate-y-1 transition-all duration-300`}>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className={`w-6 h-6 rounded-full bg-${accentColor}/20 text-${accentColor} flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform`}>{step.id}</span>
                                            <h5 className="font-bold text-(--text-primary) text-sm group-hover:text-accent transition-colors">{step.action}</h5>
                                        </div>
                                        <div className={`bg-black/40 p-3 rounded-lg mb-2 font-mono text-xs text-${successColor} border-l-4 border-${successColor} shadow-inner group-hover:bg-black/50 transition-colors`}>
                                            {'>'} {step.command}
                                        </div>
                                        <p className="text-xs text-(--text-primary) pl-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: step.desc }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'defenses':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center p-8 bg-(--bg-primary) rounded-2xl border border-(--text-tertiary) w-full max-w-2xl">
                                <Shield size={64} className="mx-auto mb-4" style={{ color: 'var(--color-success)' }} />
                                <h3 className="text-xl font-bold text-(--text-primary) mb-2">{currentContent.data.title}</h3>
                                <p className="text-(--text-secondary) mb-6">{currentContent.data.subtitle}</p>
                                <div className="grid grid-cols-1 gap-3 text-left">
                                    {currentContent.data.tips.map((tip, index) => {
                                        const Icon = index === 0 ? Unlock : (index === 1 ? Shield : Monitor);
                                        return (
                                            <div key={index} className="flex items-center p-4 bg-(--bg-secondary) rounded border border-(--text-tertiary) hover:border-success/50 transition-colors">
                                                <Icon className="w-5 h-5 mr-3" style={{ color: 'var(--color-success)' }} />
                                                <span className="text-(--text-secondary)">{tip.text}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <QuoteBlock
                            quote={currentContent.quote.text}
                            author={currentContent.quote.author}
                        />
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
                                    ? 'bg-primary text-black font-bold shadow-lg shadow-primary/20 scale-[1.02]'
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

export default Ataques;
