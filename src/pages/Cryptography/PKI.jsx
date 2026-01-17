import React, { useState } from 'react';
import {
    Fingerprint,
    Network,
    FileSignature,
    Table, // For TableProperties
    FileWarning,
    Settings,
    Code,
    GlobeLock,
    ShieldCheck,
    ChevronRight,
    CheckCircle2,
    Lock,
    Shield,
    Clock,
    FileText
} from 'lucide-react'; // Importing icons likely to be used
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import pkiData from './data/pkiData.json';

const PKI = () => {
    const [activeSection, setActiveSection] = useState('intro');
    const data = pkiData;

    const getIcon = (iconName) => {
        const icons = {
            Fingerprint,
            Sitemap: Network,
            FileBadge: FileSignature,
            TableProperties: Table,
            FileWarning,
            Settings,
            Code,
            GlobeLock,
            ShieldCheck
        };
        return icons[iconName] || Fingerprint;
    };

    const currentContent = data.content[activeSection];
    const IconComponent = getIcon(currentContent.icon);

    const renderContent = () => {
        switch (activeSection) {
            case 'intro':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-(--bg-primary) p-6 rounded-xl border-l-4 border-primary">
                            <h3 className="text-lg font-bold text-primary mb-2">{currentContent.subtitle}</h3>
                            <p className="text-(--text-secondary) whitespace-pre-line">{currentContent.description}</p>
                        </div>
                    </div>
                );

            case 'ecosystem':
                return (
                    <div className="space-y-6 animate-fade-in">
                        <h3 className="text-xl font-bold text-(--text-primary) mb-4">{currentContent.subtitle}</h3>
                        <p className="text-(--text-secondary) mb-6">{currentContent.description}</p>
                        <div className="grid grid-cols-1 gap-4">
                            {currentContent.entities.map((ent, idx) => (
                                <div key={idx} className="p-4 bg-(--bg-secondary) rounded-lg border-l-4 border-info hover:bg-(--bg-tertiary) transition-colors">
                                    <h4 className="font-bold text-(--text-primary) mb-1 flex items-center gap-2">
                                        {idx === 0 && <Shield size={16} className="text-info" />}
                                        {idx === 1 && <FileBadge size={16} className="text-info" />}
                                        {idx === 2 && <CheckCircle2 size={16} className="text-info" />}
                                        {idx === 3 && <Clock size={16} className="text-info" />}
                                        {idx === 4 && <FileText size={16} className="text-info" />}
                                        {ent.name}
                                    </h4>
                                    <p className="text-sm text-(--text-secondary)">{ent.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'certificates':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 text-center">
                            <h3 className="text-lg font-bold text-primary mb-2">Definición Formal</h3>
                            <p className="text-(--text-primary) italic text-lg">"{currentContent.definition}"</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold text-success mb-4 flex items-center gap-2">
                                    <Lock size={18} /> Generación de Claves
                                </h4>
                                <div className="space-y-3">
                                    {currentContent.generation.map((item, idx) => (
                                        <div key={idx} className="p-3 bg-(--bg-secondary) rounded border border-(--text-tertiary)/20">
                                            <div className="font-bold text-(--text-primary) text-sm">{item.method}</div>
                                            <div className="text-xs text-(--text-secondary) mt-1">{item.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-warning mb-4 flex items-center gap-2">
                                    <CheckCircle2 size={18} /> Protocolo de Validación
                                </h4>
                                <ul className="space-y-3">
                                    {currentContent.validation.map((item, idx) => (
                                        <li key={idx} className="flex gap-3 text-sm text-(--text-secondary) bg-(--bg-secondary) p-3 rounded border-l-2 border-warning">
                                            <span dangerouslySetInnerHTML={{ __html: item }} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                );

            case 'x509':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-(--bg-primary) p-6 rounded-xl border-l-4 border-indigo-500">
                            <h3 className="text-lg font-bold text-indigo-400 mb-2">{currentContent.subtitle}</h3>
                            <p className="text-(--text-secondary)">{currentContent.description}</p>
                        </div>

                        <div className="overflow-hidden rounded-xl border border-(--text-tertiary)">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-(--bg-tertiary) text-(--text-primary) text-xs uppercase">
                                    <tr>
                                        {currentContent.fields.headers.map((h, i) => (
                                            <th key={i} className="px-6 py-3">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-(--text-tertiary)/20 bg-(--bg-primary)">
                                    {currentContent.fields.rows.map((row, i) => (
                                        <tr key={i}>
                                            <td className="px-6 py-4 font-mono text-accent text-xs">{row[0]}</td>
                                            <td className="px-6 py-4 text-(--text-secondary)">{row[1]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-error/5 rounded-lg border border-error/20">
                                <h4 className="font-bold text-error text-sm mb-2">Extensiones Críticas</h4>
                                <p className="text-xs text-(--text-secondary)">{currentContent.extensions_note}</p>
                            </div>
                            <div className="p-4 bg-info/5 rounded-lg border border-info/20">
                                <h4 className="font-bold text-info text-sm mb-2">Tipología</h4>
                                <p className="text-xs text-(--text-secondary)">{currentContent.types_note}</p>
                            </div>
                        </div>
                    </div>
                );

            case 'revocation':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-(--bg-secondary) p-6 rounded-xl">
                            <h3 className="text-lg font-bold text-(--text-primary) mb-2">{currentContent.subtitle}</h3>
                            <p className="text-(--text-secondary) mb-6">{currentContent.description}</p>

                            <div className="space-y-4">
                                {currentContent.methods.map((method, idx) => (
                                    <div key={idx} className="p-4 bg-(--bg-primary) rounded border border-(--text-tertiary)/20">
                                        <h4 className="font-bold text-error mb-1">{method.name}</h4>
                                        <p className="text-sm text-(--text-secondary)">{method.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'pkcs':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <p className="text-(--text-secondary)">{currentContent.intro}</p>

                        <div className="bg-(--bg-code) p-6 rounded-xl border border-gray-700">
                            <h3 className="text-success font-mono font-bold mb-4 flex items-center gap-2">
                                <Settings size={20} /> {currentContent.oaep.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-4">{currentContent.oaep.desc}</p>

                            <div className="space-y-2 font-mono text-sm text-(--white-color)">
                                {currentContent.oaep.steps.map((step, i) => (
                                    <div key={i} className="pl-4 border-l-2 border-success/30 py-1">
                                        {step}
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 text-xs text-info italic border-t border-gray-700 pt-3">
                                {currentContent.oaep.analysis}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-(--bg-secondary) rounded-lg">
                                <h4 className="font-bold text-(--text-primary) mb-2">PKCS#5 (KDF)</h4>
                                <p className="text-sm text-(--text-secondary)">{currentContent.kdf.pkcs5}</p>
                            </div>
                            <div className="p-4 bg-(--bg-secondary) rounded-lg">
                                <h4 className="font-bold text-(--text-primary) mb-2">PKCS#12 (Transporte)</h4>
                                <p className="text-sm text-(--text-secondary)">{currentContent.kdf.pkcs12}</p>
                            </div>
                        </div>
                    </div>
                );

            case 'representation':
                return (
                    <div className="space-y-6 animate-fade-in">
                        <h3 className="text-xl font-bold text-(--text-primary) mb-4">{currentContent.subtitle}</h3>
                        <p className="text-(--text-secondary) mb-6">{currentContent.description}</p>

                        <div className="space-y-4">
                            {currentContent.formats.map((fmt, idx) => (
                                <div key={idx} className="flex gap-4 p-4 bg-(--bg-secondary) rounded-lg border-l-4 border-accent">
                                    <div className="shrink-0 pt-1">
                                        <Code size={20} className="text-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-(--text-primary) mb-1">{fmt.name}</h4>
                                        <p className="text-sm text-(--text-secondary)">{fmt.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'practice':
                return (
                    <div className="space-y-6 animate-fade-in">
                        <h3 className="text-xl font-bold text-(--text-primary) mb-4">{currentContent.subtitle}</h3>
                        <p className="text-(--text-secondary) mb-6">{currentContent.description}</p>

                        <div className="grid gap-6">
                            {currentContent.cases.map((cs, idx) => (
                                <div key={idx} className="bg-warning/5 p-5 rounded-xl border border-warning/20">
                                    <div className="flex items-center gap-3 mb-2">
                                        <GlobeLock className="text-warning" size={20} />
                                        <h4 className="font-bold text-warning">{cs.title}</h4>
                                    </div>
                                    <p className="text-(--text-secondary) text-sm">{cs.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'conclusion':
                return (
                    <div className="flex items-center justify-center py-4 animate-fade-in">
                        <div className="max-w-2xl text-center">
                            <ShieldCheck size={44} className="mx-auto text-primary mb-4" strokeWidth={1} />
                            <h3 className="text-2xl font-bold text-(--text-primary) mb-4">{currentContent.title}</h3>
                            <div
                                className="text-md text-(--text-secondary) leading-relaxed text-left"
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
                gradientTo="info"
            />

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Menu */}
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

                {/* Main Content */}
                <div className="grow min-w-0">
                    <Card className="h-full min-h-[600px] flex flex-col relative overflow-hidden">
                        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-(--text-tertiary)/20">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                <IconComponent size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-(--text-primary)">
                                    {currentContent.title}
                                </h2>
                            </div>
                        </div>

                        <div className="grow">
                            {renderContent()}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PKI;
