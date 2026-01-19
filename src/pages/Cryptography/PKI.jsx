import React, { useState, useEffect } from 'react';
import {
    Fingerprint,
    Network,
    FileSignature,
    Table, // For TableProperties
    FileWarning,
    CheckCircle2,
    Clock,
    FileText,
    Shield,
    Lock,
    Key,
    User,
    Building,
    Info,
    AlertTriangle,
    ShieldCheck,
    Settings,
    ChevronRight,
    BookOpen,
    Briefcase,
    Cpu,
    ShieldAlert,
    Code,
    GlobeLock,
    Terminal,
    ArrowRight
} from 'lucide-react'; // Importing icons likely to be used
import { useNavigate } from 'react-router-dom'; // Importing useNavigate
import DetailModal from '../../components/ui/DetailModal';
import PageHeader from '../../components/ui/PageHeader';
import QuoteBlock from '../../components/ui/QuoteBlock';
import Card from '../../components/ui/Card';
import Timeline from '../../components/ui/Timeline';
import ComparisonCard from '../../components/ui/ComparisonCard';
import InfoCard from '../../components/ui/InfoCard';
import pkiData from './data/pkiData.json';
import SEO from '../../components/SEO';
import infographicImg from '../../assets/infografias/INFRAESTRUCTURA_PKI.png'; // Import infographic image
import StickyNote from '../../components/ui/StickyNote';

const PKI = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [activeSection, setActiveSection] = useState('intro');
    const [checkedValidations, setCheckedValidations] = useState(new Set());
    const [selectedCase, setSelectedCase] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const data = pkiData;

    useEffect(() => {
        setCheckedValidations(new Set());
    }, [activeSection]);

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
            ShieldCheck,
            Terminal,
            risks: ShieldCheck,
            'lab-mtls': User
        };
        return icons[iconName] || Fingerprint;
    };

    const currentContent = data.content[activeSection];

    if (!currentContent) {
        return <div className="p-8 text-center text-(--text-secondary)">Sección no encontrada: {activeSection}</div>;
    }

    const IconComponent = getIcon(currentContent.icon);

    const renderContent = () => {
        switch (activeSection) {
            case 'intro':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-(--bg-primary) p-6 rounded-xl border-l-4 border-success">
                            <h3 className="text-lg font-bold text-success mb-2">{currentContent.subtitle}</h3>
                            <div className="text-(--text-secondary) whitespace-pre-line" dangerouslySetInnerHTML={{ __html: currentContent.description }} />
                        </div>
                    </div>
                );

            case 'ecosystem':
                return (
                    <div className="space-y-6 animate-fade-in">
                        <h3 className="text-xl font-bold text-(--text-primary) mb-4">{currentContent.subtitle}</h3>
                        <div className="text-(--text-secondary) mb-6" dangerouslySetInnerHTML={{ __html: currentContent.description }} />
                        <div className="grid grid-cols-1 gap-4">
                            {currentContent.entities.map((ent, idx) => (
                                <div key={idx} className="p-4 bg-(--bg-secondary) rounded-lg border-l-4 border-info hover:bg-(--bg-tertiary) transition-colors hover:shadow-success/50 hover:shadow-lg">
                                    <h4 className="font-bold text-(--text-primary) mb-1 flex items-center gap-2">
                                        {idx === 0 && <Shield size={16} className="text-info" />}
                                        {idx === 1 && <FileSignature size={16} className="text-info" />}
                                        {idx === 2 && <CheckCircle2 size={16} className="text-info" />}
                                        {idx === 3 && <Clock size={16} className="text-info" />}
                                        {idx === 4 && <FileText size={16} className="text-info" />}
                                        {ent.name}
                                    </h4>
                                    <div className="text-sm text-(--text-secondary)" dangerouslySetInnerHTML={{ __html: ent.desc }} />
                                </div>
                            ))}
                        </div>
                    </div>
                );



            case 'lifecycle':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-success/5 p-6 rounded-xl border border-success/20 text-center">
                            <h3 className="text-lg font-bold text-success mb-2">Definición Formal</h3>
                            <p className="text-(--text-primary) italic text-lg">"{currentContent.definition}"</p>
                        </div>

                        {/* CSR Block */}
                        <div className="p-6 bg-(--bg-secondary) rounded-xl border-l-4 border-accent hover:border-l-8 transition-all">
                            <h3 className="text-lg font-bold text-accent mb-2">{currentContent.csr_title}</h3>
                            <div className="text-(--text-secondary) whitespace-pre-line" dangerouslySetInnerHTML={{ __html: currentContent.csr_desc }} />
                        </div>

                        <div className="flex flex-col gap-12">
                            {/* Generation Timeline */}
                            <div>
                                <h4 className="font-bold text-success mb-6 flex items-center gap-2 text-xl">
                                    <Lock size={20} /> Secuencia de generación
                                </h4>
                                <Timeline
                                    items={currentContent.generation.map((item, idx) => {
                                        const config = [
                                            { icon: Fingerprint, color: 'text-success', bg: 'bg-success/10', border: 'border-success', gen: 'Nivel 1', era: 'Control Total' },
                                            { icon: Network, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning', gen: 'Nivel 2', era: 'Delegado (Riesgo)' },
                                            { icon: Shield, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary', gen: 'Nivel 3', era: 'Tercerizado' },
                                            { icon: Lock, color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent', gen: 'Nivel 4', era: 'Hardware Seguro' }
                                        ][idx] || { icon: Fingerprint, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary', gen: 'Nivel X', era: 'General' };

                                        return {
                                            gen: config.gen,
                                            eras: config.era,
                                            title: item.method || item.name,
                                            desc: item.desc,
                                            icon: config.icon,
                                            color: config.color,
                                            bg: config.bg,
                                            border: config.border,
                                            examples: []
                                        };
                                    })}
                                />
                            </div>

                            {/* Validation Checklist */}
                            <div>
                                <h4 className="font-bold text-warning mb-6 flex items-center gap-2 text-xl">
                                    <CheckCircle2 size={20} /> Protocolo de validación
                                </h4>
                                <p className="text-(--text-secondary) mb-6">{currentContent.validation_intro}</p>
                                <div className="space-y-4">
                                    {currentContent.validation.map((item, idx) => {
                                        const isChecked = checkedValidations.has(idx);
                                        return (
                                            <div
                                                key={idx}
                                                onMouseEnter={() => setCheckedValidations(prev => new Set(prev).add(idx))}
                                                className={`group flex gap-4 p-5 rounded-xl border transition-all duration-300 cursor-default ${isChecked
                                                    ? 'bg-(--bg-primary) border-warning shadow-warning/20 shadow-lg'
                                                    : 'bg-(--bg-secondary) border-(--text-tertiary)/20 hover:border-warning hover:bg-(--bg-primary) hover:shadow-warning/20 hover:shadow-lg'
                                                    }`}
                                            >
                                                {/* Checkbox Animation Container */}
                                                <div className="shrink-0 pt-1">
                                                    <div className="relative w-6 h-6">
                                                        {/* Unchecked State (Base) */}
                                                        <div className={`absolute inset-0 border-2 border-(--text-tertiary) rounded transition-opacity duration-300 ${isChecked ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}`} />

                                                        {/* Checked State (Appears on Hover/View/Checked) */}
                                                        <CheckCircle2
                                                            className={`absolute inset-0 text-warning transition-all duration-300 ${isChecked ? 'opacity-100 scale-110' : 'opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-110'}`}
                                                            size={24}
                                                            strokeWidth={3}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Text Content */}
                                                <div className="grow">
                                                    <span
                                                        className={`leading-relaxed transition-colors duration-300 text-base block ${isChecked ? 'text-(--text-primary)' : 'text-(--text-secondary) group-hover:text-(--text-primary)'}`}
                                                        dangerouslySetInnerHTML={{ __html: item }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'x509':
                return (
                    <div className="space-y-10 animate-fade-in">
                        {/* Header & Description */}
                        <div className="bg-(--bg-primary) p-6 rounded-xl border-l-4 border-success">
                            <h3 className="text-xl font-bold text-success mb-3">{currentContent.subtitle}</h3>
                            <div className="text-(--text-primary) leading-relaxed" dangerouslySetInnerHTML={{ __html: currentContent.description }} />
                        </div>

                        {/* Critical Fields Table */}
                        <div>
                            <h4 className="font-bold text-primary mb-4 flex items-center gap-2 text-xl">
                                <FileText size={20} /> Campos críticos (v3)
                            </h4>
                            <div className="overflow-hidden rounded-xl border border-(--text-tertiary)/20">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-primary/30 text-sm uppercase">
                                        <tr>
                                            <th className="px-6 py-3 font-bold tracking-wider">Campo Técnico</th>
                                            <th className="px-6 py-3 font-bold tracking-wider">Descripción Funcional</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-(--text-tertiary)/20 bg-(--bg-primary)">
                                        {currentContent.critical_fields.map((field, i) => (
                                            <tr key={i} className="hover:bg-(--bg-secondary) transition-colors">
                                                <td className="px-6 py-4 font-mono text-primary font-bold align-top">{field.field}</td>
                                                <td className="px-6 py-4 text-(--text-primary) leading-relaxed align-top">
                                                    <div dangerouslySetInnerHTML={{ __html: field.desc }} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Extensions & Criticality */}
                        <div>
                            <h4 className="font-bold text-warning mb-4 flex items-center gap-2 text-xl">
                                <AlertTriangle size={20} /> Extensiones y criticidad
                            </h4>
                            <p className="text-(--text-secondary) mb-6" dangerouslySetInnerHTML={{ __html: currentContent.extensions_intro }} />
                            <div className="grid md:grid-cols-2 gap-6">
                                {currentContent.extensions_logic.map((item, idx) => {
                                    const isCritical = item.status.includes('TRUE');
                                    return (
                                        <div
                                            key={idx}
                                            className={`p-5 rounded-xl border-l-4 ${isCritical ? 'border-error bg-error/5 hover:shadow-error/20' : 'border-success bg-success/5 hover:shadow-success/20'} hover:shadow-lg transition-all`}
                                        >
                                            <h5 className={`font-bold text-lg mb-2 ${isCritical ? 'text-error' : 'text-success'}`}>{item.status}</h5>
                                            <div className="text-(--text-secondary) text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.behavior }} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Certificate Typology */}
                        <div>
                            <h4 className="font-bold text-success mb-6 flex items-center gap-2 text-xl">
                                <Network size={20} /> Tipología de certificados
                            </h4>
                            <div className="grid gap-6">
                                {currentContent.typology.map((type, idx) => (
                                    <div key={idx} className="bg-(--bg-primary) p-6 rounded-xl border border-(--text-tertiary)/20 hover:border-info hover:shadow-lg hover:shadow-info/10 transition-all">
                                        <div className="flex items-start gap-4">
                                            <div className={`p-3 rounded-lg ${idx === 0 ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                                                {idx === 0 ? <User size={24} /> : <Building size={24} />}
                                            </div>
                                            <div>
                                                <h5 className="text-lg font-bold text-(--text-primary) mb-2">{type.name}</h5>
                                                <div className="text-(--text-secondary) mb-4" dangerouslySetInnerHTML={{ __html: type.desc }} />

                                                {type.subtypes && (
                                                    <ul className="space-y-2 mt-4 bg-secondary/10 p-4 rounded-lg border border-(--text-tertiary)/10">
                                                        {type.subtypes.map((sub, sIdx) => (
                                                            <li key={sIdx} className="text-sm text-(--text-primary) flex items-start gap-2">
                                                                <span className="text-info mt-1">•</span>
                                                                <span dangerouslySetInnerHTML={{ __html: sub }} />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'revocation':
                return (
                    <div className="space-y-10 animate-fade-in">
                        {/* Header & Description */}
                        <div className="bg-error/5 p-6 rounded-xl border-l-4 border-error">
                            <h3 className="text-xl font-bold text-error mb-3">{currentContent.subtitle}</h3>
                            <div className="text-(--text-secondary) leading-relaxed" dangerouslySetInnerHTML={{ __html: currentContent.description }} />
                        </div>

                        {/* Methods Comparison: CRL vs OCSP */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {currentContent.methods.map((method, idx) => (
                                <ComparisonCard
                                    key={idx}
                                    icon={idx === 0 ? FileWarning : GlobeLock}
                                    title={method.name}
                                    subtitle={method.type}
                                    description={method.desc}
                                    pros={method.pros}
                                    cons={method.cons}
                                    color={idx === 0 ? 'warning' : 'accent'}
                                />
                            ))}
                        </div>

                        {/* OCSP Stapling - The Solution */}
                        <div className="bg-(--bg-primary) p-8 rounded-xl border border-success/30 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <ShieldCheck size={120} />
                            </div>
                            <h4 className="font-bold text-success text-xl mb-3 flex items-center gap-2 relative z-10">
                                <ShieldCheck size={24} /> {currentContent.stapling.title}
                            </h4>
                            <div className="text-(--text-secondary) leading-relaxed relative z-10 max-w-3xl" dangerouslySetInnerHTML={{ __html: currentContent.stapling.desc }} />
                        </div>

                        {/* Revocation Reasons */}
                        <div>
                            <h4 className="font-bold text-(--text-primary) mb-4 flex items-center gap-2 text-xl">
                                <FileWarning size={20} className="text-error" /> {currentContent.reasons_title}
                            </h4>
                            <p className="text-(--text-secondary) mb-6" dangerouslySetInnerHTML={{ __html: currentContent.reasons_desc }} />
                            <div className="grid md:grid-cols-2 gap-4">
                                {currentContent.reasons.map((reason, idx) => {
                                    const isCritical = reason.name === 'keyCompromise';
                                    return (
                                        <div
                                            key={idx}
                                            className={`p-4 rounded-lg border transition-all hover:scale-[1.01] ${isCritical
                                                ? 'bg-error/5 border-error/50 hover:bg-error/10 hover:shadow-error/20 hover:shadow-lg'
                                                : 'bg-(--bg-primary)/5 border-accent/30 hover:bg-accent/10 hover:shadow-accent/20 hover:shadow-lg'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h5 className={`font-mono text-sm font-bold ${isCritical ? 'text-error' : 'text-accent'}`}>{reason.name}</h5>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isCritical ? 'bg-error/20 text-error' : 'bg-info/20 text-info'}`}>
                                                    RFC ID: {reason.id}
                                                </span>
                                            </div>

                                            <div className="text-sm text-(--text-primary)" dangerouslySetInnerHTML={{ __html: reason.desc }} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );

            case 'pkcs':
                const getStandardIcon = (iconName) => {
                    const icons = { Key, Briefcase, FileText, Cpu };
                    return icons[iconName] || BookOpen;
                };

                return (
                    <div className="space-y-12 animate-fade-in">
                        {/* 1. The Problem: Textbook RSA */}
                        <div className="bg-(--bg-primary) p-8 rounded-xl border-l-4 border-error relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 text-error">
                                <ShieldAlert size={120} />
                            </div>
                            <h3 className="text-xl font-bold text-error mb-4 flex items-center gap-2">
                                <ShieldAlert size={24} /> {currentContent.intro_problem.title}
                            </h3>
                            <div className="text-(--text-secondary) leading-relaxed mb-6 max-w-4xl relative z-10" dangerouslySetInnerHTML={{ __html: currentContent.intro_problem.desc }} />

                            <div className="flex flex-wrap gap-2 relative z-10">
                                {currentContent.intro_problem.vulnerabilities.map((vuln, i) => (
                                    <span key={i} className="px-3 py-1 bg-error/10 text-error text-xs font-bold rounded-full shadow-sm border border-error/20">
                                        {vuln}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* 2. The Solution: OAEP */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-lg bg-success/10 text-success">
                                    <Settings size={32} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-(--text-primary)">{currentContent.oaep.title}</h3>
                                    <p className="text-success font-medium">{currentContent.oaep.subtitle}</p>
                                </div>
                            </div>

                            <p className="text-(--text-primary) mb-8 max-w-3xl" dangerouslySetInnerHTML={{ __html: currentContent.oaep.desc }} />

                            <div className="bg-(--bg-code) rounded-xl border border-(--text-tertiary)/10 p-8 relative">
                                <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-linear-to-b from-success/50 to-transparent"></div>
                                <div className="space-y-8 relative">
                                    {currentContent.oaep.mechanism_steps.map((step, i) => (
                                        <div key={i} className="pl-12 relative group">
                                            {/* Step Indicator */}
                                            <div className="absolute left-[-23px] top-0 w-12 h-12 rounded-full bg-(--bg-primary) border-4 border-(--bg-code) flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10">
                                                <span className="font-bold text-success text-lg">{i + 1}</span>
                                            </div>

                                            <h4 className="text-lg font-bold text-(--text-primary) mb-2 group-hover:text-success transition-colors">
                                                {step.step.split(':')[1] || step.step}
                                            </h4>
                                            <div className="text-(--text-primary) leading-relaxed bg-(--bg-primary)/50 p-4 rounded-lg border border-(--text-tertiary)/10 group-hover:border-success/30 transition-colors" dangerouslySetInnerHTML={{ __html: step.detail }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 3. The Ecosystem: Other Standards */}
                        <div>
                            <h3 className="text-xl font-bold text-(--text-primary) mb-6 flex items-center gap-2">
                                <BookOpen size={24} className="text-info" /> {currentContent.title} <span className="text-(--text-tertiary)">Ecosistema</span>
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {currentContent.standards.map((std, idx) => {
                                    const IconInfo = getStandardIcon(std.icon);
                                    // Assign colors specifically for consistency
                                    const colorMap = {
                                        'PKCS#5': 'var(--color-warning)',
                                        'PKCS#12': 'var(--color-primary)',
                                        'PKCS#10': 'var(--color-success)',
                                        'PKCS#11': 'var(--color-error)'
                                    };
                                    const cardColor = colorMap[std.id] || 'var(--color-primary)';

                                    return (
                                        <InfoCard
                                            key={idx}
                                            title={std.id}
                                            description={std.desc}
                                            icon={IconInfo}
                                            color={cardColor}
                                            borderPosition="top"
                                            bgColor="var(--bg-primary)"
                                            headerRight={
                                                <span className="text-xs font-bold tracking-wider opacity-80  px-2 py-1 rounded" style={{ color: cardColor }}>
                                                    {std.name}
                                                </span>
                                            }
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );

            case 'representation':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-(--bg-primary) p-6 rounded-xl border-l-4 border-accent">
                            <h3 className="text-xl font-bold text-(--text-primary) mb-4">{currentContent.subtitle}</h3>
                            <p className="text-(--text-primary) leading-relaxed">{currentContent.description}</p>
                        </div>

                        <div className="space-y-6">
                            {currentContent.formats.map((fmt, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row gap-6 p-6 bg-(--bg-secondary) rounded-xl border border-(--text-tertiary)/20 hover:border-accent shadow-lg hover:shadow-accent/20 transition-all relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8 opacity-5 text-accent group-hover:opacity-10 transition-opacity">
                                        <Code size={120} />
                                    </div>

                                    <div className="md:w-1/2 relative z-10">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 rounded bg-accent/10 text-accent">
                                                <Code size={20} />
                                            </div>
                                            <span className="text-xs font-bold px-2 py-1 bg-accent/20 text-accent rounded tracking-wider">
                                                {fmt.role}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-bold text-(--text-primary) mb-3">{fmt.name}</h4>
                                        <div className="text-(--text-secondary) text-sm leading-relaxed [&_strong]:text-accent"
                                            dangerouslySetInnerHTML={{ __html: fmt.desc }} />
                                    </div>

                                    <div className="md:w-1/2 relative z-10 flex flex-col justify-center">
                                        <p className="text-xs font-bold text-(--text-accent) mb-2 tracking-wide">
                                            {fmt.example_title}
                                        </p>
                                        <div className="bg-(--bg-code) p-4 rounded-lg border border-(--text-primary)/10 shadow-inner font-(--font-mono) text-sm text-(--text-primary) overflow-x-auto whitespace-pre">
                                            {fmt.example_code}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'lab-mtls':
            case 'lab-pki-complete':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-success/10 p-6 rounded-xl border-l-4 border-success shadow-sm">
                            <h3 className="text-xl font-bold text-success mb-2">{currentContent.subtitle}</h3>
                            <div
                                className="text-(--text-secondary) leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: currentContent.description }}
                            />
                        </div>

                        <div className="space-y-6">
                            {currentContent.steps.map((step, idx) => (
                                <div key={idx} className="bg-(--bg-primary) border border-(--text-tertiary) rounded-xl p-6 shadow-md hover:border-success/50 transition-colors">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-full bg-success text-(--bg-primary) flex items-center justify-center text-sm font-bold">
                                            {idx + 1}
                                        </div>
                                        <h4 className="text-lg font-bold text-(--text-primary)">
                                            {step.title}
                                        </h4>
                                    </div>

                                    {step.desc && (
                                        <p className="text-sm text-(--text-secondary) mb-4 pl-11">
                                            {step.desc}
                                        </p>
                                    )}

                                    {step.content && (
                                        <div className="pl-11">
                                            <div className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-gray-700 shadow-inner">
                                                <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-gray-700">
                                                    <div className="flex gap-2">
                                                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                                    </div>
                                                    <span className="text-xs text-gray-400 font-mono">Terminal - OpenSSL Lab</span>
                                                </div>
                                                <div className="p-4 font-mono text-sm overflow-x-auto">
                                                    {step.content.split('\n').map((line, i) => (
                                                        <div key={i} className={`${line.trim().startsWith('#') ? 'text-gray-500 italic' : line.trim().startsWith('>') ? 'text-green-400 font-bold' : 'text-gray-300'}`}>
                                                            {line}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {step.note && (
                                        <div className="pl-11 mt-6">
                                            <StickyNote title="NOTA DE IMPORTACIÓN">
                                                {step.note}
                                            </StickyNote>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'practice':
                return (
                    <div className="space-y-8 animate-fade-in">
                        {/* 1. Introduction Concept */}
                        <div className="bg-(--bg-primary) p-6 rounded-xl border border-(--text-tertiary)/30">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-(--bg-primary) rounded-full text-(--text-primary)">
                                    <BookOpen size={24} />
                                </div>
                                <div className="text-(--text-secondary) leading-relaxed [&_strong]:text-(--text-primary)"
                                    dangerouslySetInnerHTML={{ __html: currentContent.intro_concept }} />
                            </div>
                        </div>

                        {/* 2. Context Box  */}
                        <InfoCard
                            title={currentContent.intro_title}
                            description={currentContent.intro_text}
                            icon={Info}
                            color="var(--color-primary)"
                            borderPosition="left"
                            className="bg-primary/5 border-primary/20"
                        />

                        {/* 3. Cases Grid - Recognition Style */}
                        <h3 className="text-xl font-bold text-(--text-primary) mt-8 mb-4">Casos de estudio y defensas</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {currentContent.cases.map((item, idx) => {
                                const Icon = getIcon(item.icon);
                                const cardColor = `var(--color-${item.color})`; // e.g. var(--color-error)

                                return (
                                    <InfoCard
                                        key={idx}
                                        title={item.title}
                                        description={item.summary}
                                        icon={Icon}
                                        color={cardColor}
                                        borderPosition="left"
                                        headerRight={
                                            <span
                                                className="text-xs font-bold px-2 py-1 rounded border"
                                                style={{
                                                    color: cardColor,
                                                    borderColor: cardColor,
                                                    backgroundColor: `color-mix(in srgb, ${cardColor}, transparent 90%)`
                                                }}
                                            >
                                                {item.badgeText}
                                            </span>
                                        }
                                        footer={
                                            <div className="flex items-center text-xs font-bold uppercase tracking-wider transition-colors mt-2"
                                                style={{ color: cardColor }}>
                                                Ver Análisis <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        }
                                        className="cursor-pointer group hover:-translate-y-1 transition-transform duration-300"
                                        onClick={() => {
                                            setSelectedCase(item);
                                            setIsModalOpen(true);
                                        }}
                                    />
                                );
                            })}
                        </div>

                        {/* Detail Modal */}
                        <DetailModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            title={selectedCase?.title}
                            headerContent={
                                selectedCase && (
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="p-3 rounded-lg"
                                            style={{
                                                backgroundColor: `color-mix(in srgb, var(--color-${selectedCase.color}), transparent 90%)`,
                                                color: `var(--color-${selectedCase.color})`
                                            }}
                                        >
                                            {getIcon(selectedCase.icon) && React.createElement(getIcon(selectedCase.icon), { size: 24 })}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-(--text-primary)">{selectedCase.title}</h2>
                                            <p
                                                className="text-sm font-bold"
                                                style={{ color: `var(--color-${selectedCase.color})` }}
                                            >
                                                {selectedCase.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                        >
                            {selectedCase && (
                                <div className="space-y-6">
                                    <div className="bg-(--bg-primary) p-4 rounded-lg border border-(--text-tertiary)/20">
                                        <h4 className="text-sm font-bold text-(--text-secondary) uppercase mb-2">Resumen Ejecutivo</h4>
                                        <p className="text-(--text-primary) italic border-l-4 pl-4"
                                            style={{ borderColor: `var(--color-${selectedCase.color})` }}>
                                            "{selectedCase.summary}"
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold text-(--text-primary) mb-3">Análisis Detallado</h4>
                                        <div
                                            className="text-(--text-secondary) leading-relaxed text-justify space-y-4 [&_strong]:text-(--case-accent) [&_strong]:font-bold"
                                            style={{ '--case-accent': `var(--color-${selectedCase.color})` }}
                                            dangerouslySetInnerHTML={{ __html: selectedCase.description }}
                                        />
                                    </div>
                                </div>
                            )}
                        </DetailModal>
                    </div>
                );

            case 'risks':
                return (
                    <div className="flex items-center justify-center py-4 animate-fade-in">
                        <div className="max-w-2xl text-center">
                            <ShieldCheck size={44} className="mx-auto text-success mb-4" strokeWidth={1} />
                            <h3 className="text-2xl font-bold text-(--text-primary)">{currentContent.title.split(':')[1]}</h3>
                            <div
                                className="text-md text-(--text-secondary) leading-relaxed [&_strong]:text-success"
                                dangerouslySetInnerHTML={{ __html: currentContent.content }}
                            />
                        </div>
                    </div>
                );
            default:
                return <div className="text-(--text-secondary)">Seleccione un tema del menú lateral.</div>;
        }
    };

    const openInfographic = () => {
        navigate('/cryptography/infografia', {
            state: {
                imageSrc: infographicImg,
                title: 'Infraestructura de Clave Pública (PKI)',
                description: 'El Ecosistema de la Confianza Digital: CA, RA, Certificados y Ciclo de Vida.'
            }
        });
    };

    return (
        <div className="animate-fade-in space-y-8">
            <SEO
                title={data.header.title}
                description={data.header.description}
                keywords="PKI, Infraestructura de Clave Pública, certificados digitales, X.509, CA, RA, validación"
            />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <PageHeader
                    title={data.header.title}
                    description={data.header.description}
                    gradientFrom="success"
                    gradientTo="primary"
                    className="mb-0"
                />
                <button
                    onClick={openInfographic}
                    className="flex items-center gap-2 px-6 py-3 bg-(--bg-secondary) border border-success/30 text-success rounded-xl font-bold hover:bg-success/10 transition-all shadow-lg hover:shadow-success/20 shrink-0 cursor-pointer"
                >
                    <Building size={20} />
                    Ver Infografía
                </button>
            </div>

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
                                ? 'bg-(--bg-tertiary) text-success border-l-4 border-success font-bold shadow-md'
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
                            <div className="p-3 bg-success/10 rounded-xl text-success">
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

            {data.quote && (
                <QuoteBlock
                    quote={data.quote.text}
                    author={data.quote.author}
                />
            )}
        </div >
    );
};

export default PKI;
