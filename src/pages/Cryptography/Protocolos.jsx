import React from 'react';
import {
    Network,
    Shuffle,
    Users,
    EyeOff,
    Ghost,
    ArrowLeftRight,
    Cpu,
    Globe,
    Lock,
    Key,
    ShieldCheck,
    FileCode,
    MessageSquare,
    Eye
} from 'lucide-react';
import QuoteBlock from '../../components/ui/QuoteBlock';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import protocolsData from './data/protocolsData.json';
import SEO from '../../components/SEO';

const Protocolos = () => {
    const data = protocolsData;
    const { content } = data;

    return (
        <div className="space-y-24 pb-12 animate-fade-in">
            <SEO
                title={data.header.title}
                description={data.header.description}
                keywords="criptografía, protocolos, zkp, mpc, shamir, seguridad"
            />
            <PageHeader
                title={data.header.title}
                description={data.header.description}
                gradientFrom="primary"
                gradientTo="accent"
            />

            {/* 1. INTRODUCCIÓN */}
            <section className="space-y-8">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="space-y-6 lg:w-1/2">
                        <h2 className="text-3xl font-bold text-(--text-primary) flex items-center mb-6">
                            <Network className="mr-4 w-10 h-10 text-primary" />
                            {content.intro.subtitle}
                        </h2>
                        <div className="text-(--text-secondary) leading-relaxed text-lg space-y-4"
                            dangerouslySetInnerHTML={{ __html: content.intro.description }} />
                    </div>

                    <div className="lg:w-1/2">
                        <div className="bg-accent/5 p-8 rounded-2xl border border-accent/20 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Network size={200} />
                            </div>
                            <p className="text-(--text-primary) italic relative z-10 border-l-4 border-accent pl-6 text-xl leading-relaxed">
                                "{content.intro.analysis}"
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. SHAMIR THREE PASS */}
            <section className="space-y-8">
                <div className="border-t border-(--text-tertiary)/10 pt-16">
                    <h2 className="text-3xl font-bold text-(--text-primary) mb-8 flex items-center">
                        <Shuffle className="mr-4 text-success" size={32} />
                        {content['shamir-pass'].title}
                    </h2>

                    <div className="grid lg:grid-cols-2 gap-12 mb-12">
                        <div>
                            <h3 className="text-xl font-bold text-success mb-4">{content['shamir-pass'].subtitle}</h3>
                            <div className="text-(--text-secondary) text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: content['shamir-pass'].description }} />
                        </div>
                        {/* Steps visualization */}
                        <div className="space-y-4">
                            {content['shamir-pass'].steps.map((step, idx) => (
                                <div key={idx} className="flex gap-4 p-4 bg-(--bg-secondary) rounded-xl border border-(--text-tertiary)/10 hover:border-success/30 transition-all group">
                                    <div className="shrink-0 w-12 h-12 rounded-full bg-success/10 flex items-center justify-center text-success font-bold text-lg group-hover:scale-110 transition-transform">
                                        {idx + 1}
                                    </div>
                                    <div className="grow">
                                        <h4 className="font-bold text-(--text-primary) mb-1">{step.step.split('. ')[1]}</h4>
                                        <p className="text-sm text-(--text-secondary) mb-2">{step.action}</p>
                                        <div className="bg-(--bg-code) p-2 rounded text-success font-mono text-sm inline-block px-3" dangerouslySetInnerHTML={{ __html: step.math }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-error/5 p-6 rounded-xl border border-error/20">
                            <h4 className="font-bold text-error mb-2 flex items-center gap-2 text-lg">
                                <Lock size={20} /> {content['shamir-pass'].analysis_vernam.title}
                            </h4>
                            <div className="text-md text-(--text-secondary) mb-4" dangerouslySetInnerHTML={{ __html: content['shamir-pass'].analysis_vernam.desc }} />
                            <div className="bg-(--bg-code) p-4 rounded text-error font-mono text-sm overflow-x-auto mb-3">
                                {content['shamir-pass'].analysis_vernam.math}
                            </div>
                            <p className="text-sm font-bold text-error/80">{content['shamir-pass'].analysis_vernam.conclusion}</p>
                        </div>

                        <div className="bg-success/5 p-6 rounded-xl border border-success/20">
                            <h4 className="font-bold text-success mb-2 flex items-center gap-2 text-lg">
                                <ShieldCheck size={20} /> {content['shamir-pass'].solution_exp.title}
                            </h4>
                            <p className="text-md text-(--text-secondary) mb-4" dangerouslySetInnerHTML={{ __html: content['shamir-pass'].solution_exp.desc }} />
                            <div className="text-center py-4 bg-(--bg-primary) rounded-lg mb-3">
                                <span className="text-success font-mono text-2xl font-bold">{content['shamir-pass'].solution_exp.formula}</span>
                            </div>
                            <p className="text-sm italic text-(--text-tertiary)">{content['shamir-pass'].solution_exp.note}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SECRET SHARING */}
            <section className="space-y-8">
                <div className="border-t border-(--text-tertiary)/10 pt-16">
                    <h2 className="text-3xl font-bold text-(--text-primary) mb-8 flex items-center">
                        <Users className="mr-4 text-info" size={32} />
                        {content['secret-sharing'].title}
                    </h2>

                    <div className="bg-(--bg-primary) p-8 rounded-2xl border-l-4 border-info shadow-sm mb-8">
                        <h3 className="text-2xl font-bold text-info mb-4">{content['secret-sharing'].subtitle}</h3>
                        <div className="text-(--text-secondary) text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: content['secret-sharing'].description }} />
                    </div>

                    <div className="bg-(--bg-secondary) rounded-2xl overflow-hidden border border-(--text-tertiary)/20">
                        <div className="p-8 border-b border-(--text-tertiary)/10 bg-info/5">
                            <h4 className="text-xl font-bold text-info flex items-center gap-2">
                                <Cpu size={24} /> {content['secret-sharing'].shamir_scheme.title}
                            </h4>
                            <p className="text-md text-(--text-primary) mt-2" dangerouslySetInnerHTML={{ __html: content['secret-sharing'].shamir_scheme.concept }} />
                        </div>

                        <div className="p-8 grid lg:grid-cols-2 gap-12">
                            <div>
                                <h5 className="font-bold text-(--text-primary) mb-4 text-sm uppercase tracking-wider">Ejemplo práctico</h5>
                                <div className="space-y-4 text-md">
                                    <p className="text-(--text-secondary)">{content['secret-sharing'].shamir_scheme.example.setup}</p>
                                    <div className="bg-(--bg-code) p-4 rounded-lg font-mono text-sm" dangerouslySetInnerHTML={{ __html: content['secret-sharing'].shamir_scheme.example.math_poly }} />
                                    <p className="text-sm font-mono text-info">{content['secret-sharing'].shamir_scheme.example.values}</p>
                                    <div className="bg-(--bg-primary) p-4 rounded-lg border border-info/20 text-info font-mono font-bold text-center">
                                        {content['secret-sharing'].shamir_scheme.example.function}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h5 className="font-bold text-(--text-primary) mb-4 text-sm uppercase tracking-wider">Fragmentos (Shares)</h5>
                                <ul className="space-y-3 mb-6">
                                    {content['secret-sharing'].shamir_scheme.example.shares.map((share, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-mono text-(--text-secondary)">
                                            <span className="w-2.5 h-2.5 rounded-full bg-info shrink-0"></span>
                                            {share}
                                        </li>
                                    ))}
                                </ul>
                                <div className="bg-info/10 p-4 rounded-xl text-sm text-(--text-primary) italic border-l-4 border-info">
                                    <span dangerouslySetInnerHTML={{ __html: content['secret-sharing'].shamir_scheme.recovery }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. BLIND SIGNATURES */}
            <section className="space-y-8">
                <div className="border-t border-(--text-tertiary)/10 pt-16">
                    <h2 className="text-3xl font-bold text-(--text-primary) mb-8 flex items-center">
                        <EyeOff className="mr-4 text-accent" size={32} />
                        {content['blind-signatures'].title}
                    </h2>

                    <div className="mb-10">
                        <h3 className="text-xl font-bold text-(--text-primary) mb-4">{content['blind-signatures'].subtitle}</h3>
                        <div className="text-(--text-secondary) text-lg leading-relaxed max-w-4xl" dangerouslySetInnerHTML={{ __html: content['blind-signatures'].description }} />
                    </div>

                    <div className="relative mb-12">
                        <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-accent/50 to-transparent z-0"></div>
                        <div className="space-y-6 relative z-10">
                            {content['blind-signatures'].steps.map((step, idx) => (
                                <div key={idx} className="flex flex-col lg:flex-row gap-6 items-start">
                                    <div className="shrink-0 w-16 h-16 rounded-xl bg-(--bg-secondary) border-2 border-accent/20 flex flex-col items-center justify-center z-10 shadow-lg mx-auto lg:mx-0">
                                        <span className="text-[10px] text-(--text-tertiary) uppercase font-bold">{step.actor.split(' ')[0]}</span>
                                        {step.actor.includes('Alice') && <Users size={20} className="text-accent" />}
                                        {step.actor.includes('Bob') && <FileCode size={20} className="text-success" />}
                                        {step.actor.includes('Público') && <Globe size={20} className="text-info" />}
                                    </div>
                                    <div className="grow w-full bg-(--bg-secondary) p-6 rounded-xl border border-(--text-tertiary)/10 hover:border-accent/40 transition-colors">
                                        <h4 className="font-bold text-(--text-primary) mb-2 text-lg">{step.phase}</h4>
                                        <p className="text-md text-(--text-secondary) mb-4" dangerouslySetInnerHTML={{ __html: step.desc }} />
                                        {step.math && (
                                            <div className="bg-(--bg-code) p-3 rounded-lg text-accent font-mono text-sm inline-block">
                                                {step.math}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="border-l-4 border-l-primary bg-primary/5">
                            <h4 className="font-bold text-primary mb-3 text-sm uppercase">Aplicaciones reales</h4>
                            <div className="text-md text-(--text-primary)" dangerouslySetInnerHTML={{ __html: content['blind-signatures'].applications }} />
                        </Card>
                        <Card className="border-l-4 border-l-warning bg-warning/5">
                            <h4 className="font-bold text-warning mb-3 text-sm uppercase">Seguridad (Cut & Choose)</h4>
                            <div className="text-md text-(--text-primary)" dangerouslySetInnerHTML={{ __html: content['blind-signatures'].security_note }} />
                        </Card>
                    </div>
                </div>
            </section>

            {/* 5. ZKP */}
            <section className="space-y-8">
                <div className="border-t border-(--text-tertiary)/10 pt-16">
                    <h2 className="text-3xl font-bold text-(--text-primary) mb-8 flex items-center">
                        <Ghost className="mr-4 text-success" size={32} />
                        {content.zkp.title}
                    </h2>

                    <div className="bg-(--bg-secondary) p-8 rounded-2xl border-t-4 border-success shadow-lg mb-10">
                        <h3 className="text-2xl font-bold text-success mb-4">{content.zkp.subtitle}</h3>
                        <div className="text-(--text-secondary) text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: content.zkp.description }} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {content.zkp.properties.map((prop, idx) => (
                            <div key={idx} className="p-6 bg-(--bg-primary) rounded-xl border border-(--text-tertiary)/20 text-center hover:-translate-y-1 transition-transform shadow-sm">
                                <div className="w-12 h-12 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-4">
                                    <ShieldCheck size={24} />
                                </div>
                                <h4 className="font-bold text-(--text-primary) mb-2 text-lg">{prop.name}</h4>
                                <p className="text-sm text-(--text-secondary) leading-relaxed">{prop.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10">
                        <div className="bg-(--bg-secondary) p-8 rounded-2xl border border-(--text-tertiary)/20">
                            <h4 className="font-bold text-(--text-primary) mb-6 flex items-center gap-3 text-xl">
                                <Ghost size={24} className="text-primary" /> {content.zkp.cave_analogy.title}
                            </h4>
                            <div className="text-md text-(--text-secondary) leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: content.zkp.cave_analogy.desc }} />
                        </div>

                        <div className="bg-(--bg-code) p-8 rounded-2xl border border-(--text-primary)/10 relative overflow-hidden">
                            <h4 className="font-bold text-white mb-6 flex items-center gap-3 text-xl">
                                <Key size={24} className="text-success" /> {content.zkp.math_protocol.title}
                            </h4>
                            <div className="space-y-4 relative z-10">
                                {content.zkp.math_protocol.steps.map((step, i) => (
                                    <div key={i} className="text-sm text-gray-300 font-mono" dangerouslySetInnerHTML={{ __html: step }} />
                                ))}
                            </div>
                            <div className="mt-6 pt-6 border-t border-white/10 text-sm text-success italic">
                                "{content.zkp.math_protocol.reasoning}"
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. OBLIVIOUS TRANSFER */}
            <section className="space-y-8">
                <div className="border-t border-(--text-tertiary)/10 pt-16">
                    <h2 className="text-3xl font-bold text-(--text-primary) mb-8 flex items-center">
                        <ArrowLeftRight className="mr-4 text-warning" size={32} />
                        {content['oblivious-transfer'].title}
                    </h2>

                    <div className="mb-10">
                        <h3 className="text-xl font-bold text-(--text-secondary) mb-4">{content['oblivious-transfer'].subtitle}</h3>
                        <div className="text-(--text-secondary) text-lg leading-relaxed max-w-4xl" dangerouslySetInnerHTML={{ __html: content['oblivious-transfer'].description }} />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="bg-(--bg-primary) p-8 rounded-2xl border border-accent/20 h-full">
                            <h4 className="font-bold text-accent mb-4 text-xl">{content['oblivious-transfer'].egl_protocol.title}</h4>
                            <p className="text-md text-(--text-secondary) mb-6 leading-relaxed">{content['oblivious-transfer'].egl_protocol.desc}</p>
                            <div className="p-4 bg-accent/5 rounded-xl border-l-4 border-accent">
                                <p className="text-sm text-(--text-primary) font-semibold">{content['oblivious-transfer'].egl_protocol.importance}</p>
                            </div>
                        </div>

                        <div className="bg-(--bg-secondary) p-8 rounded-2xl border-l-4 border-warning shadow-lg h-full">
                            <div className="flex items-center gap-3 mb-4">
                                <ArrowLeftRight className="text-warning h-6 w-6" />
                                <h4 className="font-bold text-(--text-primary) text-xl">{content['oblivious-transfer'].use_case.title}</h4>
                            </div>
                            <div className="text-md text-(--text-secondary) leading-relaxed" dangerouslySetInnerHTML={{ __html: content['oblivious-transfer'].use_case.desc }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. MPC */}
            <section className="space-y-8">
                <div className="border-t border-(--text-tertiary)/10 pt-16">
                    <h2 className="text-3xl font-bold text-(--text-primary) mb-8 flex items-center">
                        <Cpu className="mr-4 text-primary" size={32} />
                        {content.mpc.title}
                    </h2>

                    <div className="text-center max-w-4xl mx-auto mb-12">
                        <h3 className="text-2xl font-bold text-(--text-primary) mb-6">{content.mpc.subtitle}</h3>
                        <div className="text-xl text-(--text-secondary) leading-relaxed" dangerouslySetInnerHTML={{ __html: content.mpc.description }} />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <Card className="hover:border-success/50 transition-colors h-full flex flex-col">
                            <h4 className="text-xl font-bold text-success mb-4 flex items-center gap-3">
                                <Lock size={24} /> {content.mpc.yao_millionaire.title}
                            </h4>
                            <p className="text-(--text-primary) font-bold italic mb-4 text-lg">"{content.mpc.yao_millionaire.problem}"</p>
                            <div className="text-(--text-secondary) text-md leading-relaxed grow" dangerouslySetInnerHTML={{ __html: content.mpc.yao_millionaire.solution }} />
                        </Card>

                        <Card className="hover:border-info/50 transition-colors bg-(--bg-secondary) h-full flex flex-col">
                            <h4 className="text-xl font-bold text-info mb-4 flex items-center gap-3">
                                <Users size={24} /> {content.mpc.socialist_millionaire.title}
                            </h4>
                            <div className="text-(--text-secondary) text-md leading-relaxed grow" dangerouslySetInnerHTML={{ __html: content.mpc.socialist_millionaire.desc }} />
                        </Card>
                    </div>
                </div>
            </section>

            {/* 8. FUTURO - FINAL */}
            <div className="py-20 border-t border-(--text-tertiary)/20 mt-12 bg-linear-to-b from-transparent to-(--bg-secondary)/50 rounded-3xl">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <div className="inline-block p-6 rounded-full bg-success/10 text-success mb-8 shadow-lg shadow-success/20">
                        <Globe size={64} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-4xl font-bold text-(--text-primary) mb-8">{content.future.title.split(':')[1]}</h3>
                    <div
                        className="text-2xl text-(--text-secondary) leading-relaxed [&_strong]:text-success [&_strong]:font-bold"
                        dangerouslySetInnerHTML={{ __html: content.future.content }}
                    />
                </div>
            </div>

            {/* Quote */}
            <QuoteBlock
                quote="El conocimiento es un proceso de acumular datos; la sabiduría reside en su simplificación. En criptografía, nuestro mayor logro no es ocultar la verdad, sino demostrarla sin revelarla."
                author="Adi Shamir"
                gradientFrom="accent"
                gradientTo="success"
            />
        </div>
    );
};

export default Protocolos;
