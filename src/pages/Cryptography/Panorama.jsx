import React, { useState } from 'react';
import {
    Map, History, EyeOff, UserCheck, ShieldCheck, FileSignature, Key,
    Lock, Unlock, ShieldAlert, Zap, Layers, Binary, Fingerprint,
    Server, AlertTriangle, Cpu
} from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Title from '../../components/ui/Title';
import QuoteBlock from '../../components/ui/QuoteBlock';
import data from './data/panoramaData.json';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap = {
    Map, History, EyeOff, UserCheck, ShieldCheck, FileSignature, Key,
    Lock, Unlock, ShieldAlert, Zap, Layers, Binary, Fingerprint, Server, AlertTriangle
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 100 }
    }
};

const cardVariants = {
    hover: {
        y: -5,
        scale: 1.02,
        transition: { type: 'spring', stiffness: 300 }
    }
};

const Panorama = () => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-16 pb-12 text-left"
        >
            <PageHeader
                title={data.header.title}
                description={data.header.description}
                gradientFrom="primary"
                gradientTo="secondary"
            />

            {/* 1. INTRODUCCIÓN HISTÓRICA */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div variants={itemVariants} className="space-y-6">
                    <div className="flex items-center gap-3 text-primary mb-2">
                        <History size={24} />
                        <h2 className="text-2xl font-bold">{data.intro.title}</h2>
                    </div>
                    <p className="text-(--text-secondary) text-lg leading-relaxed text-justify">
                        {data.intro.content}
                    </p>
                    <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl">
                        <p className="text-(--text-secondary) italic font-medium">
                            "{data.intro.highlight}"
                        </p>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="relative group">
                    <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-secondary/20 rounded-2xl filter blur-3xl -z-10 opacity-50 group-hover:opacity-75 transition-opacity duration-700"></div>
                    <Card className="border-(--text-tertiary)/30 relative overflow-hidden backdrop-blur-sm bg-black/20 hover:border-primary/50 transition-colors duration-500">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <History size={120} />
                        </div>
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
                            {data.intro.timeline.year}
                        </span>
                        <h3 className="text-xl font-bold text-(--text-primary) mb-3">
                            {data.intro.timeline.event}
                        </h3>
                        <p className="text-(--text-secondary)">
                            {data.intro.timeline.desc}
                        </p>
                    </Card>
                </motion.div>
            </section>

            {/* 2. PILARES DE LA SEGURIDAD */}
            <section>
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <Title level={2} align="center">{data.pillars.title}</Title>
                    <p className="text-(--text-secondary) text-lg">{data.pillars.intro}</p>
                </div>

                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
                >
                    {data.pillars.items.map((item, idx) => {
                        const Icon = iconMap[item.icon] || ShieldCheck;
                        // Determine color for shadow effect
                        const colorVar = `var(--color-${item.color || 'primary'})`;

                        return (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                whileHover="hover"
                                initial="visible" // Ensure visibility
                                custom={idx}
                                style={{
                                    '--item-color': colorVar
                                }}
                            >
                                <motion.div
                                    variants={cardVariants}
                                    className="bg-(--bg-secondary) p-6 rounded-xl border border-(--text-tertiary)/30 shadow-lg text-center flex flex-col items-center h-full transition-all duration-300 hover:border-(--item-color)"
                                    style={{
                                        boxShadow: "0 0 0 rgba(0,0,0,0)" // Default
                                    }}
                                    whileHover={{
                                        boxShadow: `0 10px 30px -10px color-mix(in srgb, var(--item-color), transparent 70%)`
                                    }}
                                >
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-${item.color}/10 text-${item.color}`}>
                                        <Icon size={28} />
                                    </div>
                                    <h4 className="font-bold text-(--text-primary) mb-2">{item.name}</h4>
                                    <p className="text-sm text-(--text-secondary) leading-relaxed">{item.desc}</p>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </section>

            {/* 3. FUNDAMENTOS MATEMÁTICOS */}
            <section className="relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-(--bg-secondary) rounded-2xl p-8 border border-(--text-tertiary)/30 relative overflow-hidden group shadow-2xl"
                >
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
                    <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-(--text-primary) mb-6 flex items-center gap-3">
                                <Binary className="text-accent" /> {data.foundation.title}
                            </h3>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-(--bg-primary) p-6 rounded-xl border border-(--text-tertiary)/50 text-center mb-6 shadow-inner cursor-help"
                            >
                                <span
                                    className="font-mono text-2xl lg:text-3xl text-(--text-primary) tracking-wider font-bold"
                                    dangerouslySetInnerHTML={{ __html: data.foundation.math }}
                                />
                            </motion.div>
                            <div className="flex flex-wrap gap-3 justify-center">
                                {data.foundation.actors.map((actor, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full bg-(--bg-tertiary) text-xs font-mono text-(--text-secondary) border border-(--text-tertiary)/30 hover:bg-white/5 transition-colors">
                                        {actor}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-(--bg-primary) p-8 rounded-xl border-l-4 border-error relative shadow-lg">
                            <div className="absolute -top-3 -right-3 text-error bg-(--bg-primary) rounded-full p-2 border border-error animate-pulse">
                                <EyeOff size={20} />
                            </div>
                            <h4 className="font-bold text-error uppercase text-sm tracking-widest mb-2">{data.foundation.kerckhoffs.title}</h4>
                            <p className="text-2xl font-bold text-(--text-primary) mb-3 text-center italic">
                                "{data.foundation.kerckhoffs.quote}"
                            </p>
                            <p className="text-(--text-secondary) text-center text-sm">
                                {data.foundation.kerckhoffs.meaning}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* 4. ATAQUES CLÁSICOS */}
            <section>
                <Title level={2} align="center">{data.attacks.title}</Title>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {data.attacks.types.map((attack, idx) => {
                        const isBrute = idx === 0;
                        const color = isBrute ? 'error' : 'warning';
                        const colorVar = `var(--color-${color})`;

                        return (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                whileHover={{ y: -5, boxShadow: `0 10px 40px -10px color-mix(in srgb, ${colorVar}, transparent 80%)` }}
                                className={`h-full bg-(--bg-secondary) rounded-xl p-6 border border-${color}/20 transition-all duration-300`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className={`text-xl font-bold text-${color}`}>{attack.name}</h3>
                                        <span className="text-xs text-(--text-tertiary) uppercase tracking-wide">Conocido como: {attack.alias}</span>
                                    </div>
                                    <div className={`p-2 rounded bg-${color}/10 text-${color}`}>
                                        <ShieldAlert size={24} />
                                    </div>
                                </div>
                                <p className="text-(--text-secondary) mb-4">{attack.desc}</p>
                                <div className={`p-4 rounded bg-${color}/5 border border-${color}/10 text-sm`}>
                                    <strong className={`block text-${color} mb-1`}>Dato clave:</strong>
                                    <span className="text-(--text-primary)">{attack.stat}</span>
                                </div>
                                <div className="mt-4 text-xs font-bold text-(--text-tertiary) text-right uppercase">
                                    Estado: {attack.status}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* 5. STREAM VS BLOCK */}
            <section className="space-y-8">
                <Title align="center" level={2}>{data.stream_vs_block.title}</Title>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Stream */}
                    <motion.div
                        whileHover={{ y: -5, boxShadow: "0 10px 40px -10px rgba(250, 204, 21, 0.15)" }} // Warning glow
                        className="bg-(--bg-secondary) rounded-xl p-6 border border-warning/30 transition-all duration-300"
                    >
                        <div className="flex items-center gap-3 mb-6 border-b border-warning/10 pb-4">
                            <Zap className="text-warning" size={28} />
                            <h3 className="text-xl font-bold text-(--text-primary)">{data.stream_vs_block.stream.name}</h3>
                        </div>

                        <div className="bg-(--bg-code) p-4 rounded-lg text-center font-mono text-warning mb-6 shadow-inner">
                            {data.stream_vs_block.stream.math}
                        </div>

                        <div className="flex gap-2 mb-6 flex-wrap">
                            {data.stream_vs_block.stream.features.map((f, i) => (
                                <span key={i} className="px-2 py-1 bg-warning/10 text-warning text-xs rounded border border-warning/20">{f}</span>
                            ))}
                        </div>

                        <div className="bg-error/10 p-4 rounded-lg border border-error/20">
                            <h4 className="font-bold text-error text-sm uppercase mb-2 flex items-center gap-2">
                                <AlertTriangle size={16} /> Caso de estudio: {data.stream_vs_block.stream.case_study.title}
                            </h4>
                            <p className="text-xs text-(--text-secondary) leading-relaxed">
                                {data.stream_vs_block.stream.case_study.desc}
                            </p>
                        </div>
                    </motion.div>

                    {/* Block */}
                    <motion.div
                        whileHover={{ y: -5, boxShadow: "0 10px 40px -10px rgba(74, 222, 128, 0.15)" }} // Success glow
                        className="bg-(--bg-secondary) rounded-xl p-6 border border-success/30 transition-all duration-300"
                    >
                        <div className="flex items-center gap-3 mb-6 border-b border-success/10 pb-4">
                            <Layers className="text-success" size={28} />
                            <h3 className="text-xl font-bold text-(--text-primary)">{data.stream_vs_block.block.name}</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {data.stream_vs_block.block.concepts.map((c, i) => (
                                <div key={i} className="bg-(--bg-primary) p-3 rounded text-center border border-(--text-tertiary)/30 hover:bg-success/5 transition-colors">
                                    <span className="text-xs font-bold text-success block">{c.split('(')[0]}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 mb-6">
                            {data.stream_vs_block.block.modes.map((mode, i) => (
                                <div key={i} className={`flex justify-between items-center p-2 rounded text-sm ${mode.status === 'bad' ? 'bg-error/5 text-error' : 'bg-success/5 text-success'}`}>
                                    <span className="font-bold">{mode.name}</span>
                                    <span className="text-xs opacity-80">{mode.desc}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                            <h4 className="font-bold text-primary text-sm uppercase mb-1">Vulnerabilidad crítica</h4>
                            <p className="text-xs text-(--text-secondary)">{data.stream_vs_block.block.vulnerability}</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 6. HASH & PKI */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Hash */}
                <motion.div
                    whileInView={{ x: 0, opacity: 1 }}
                    initial={{ x: -20, opacity: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <Title level={3} className="flex items-center gap-2">
                        <Fingerprint className="text-secondary" /> {data.integrity_hash.title}
                    </Title>
                    <p className="text-(--text-secondary)">{data.integrity_hash.concept}</p>

                    <Card className="bg-secondary/5 border-secondary/20 hover:border-secondary/50 transition-colors">
                        <h4 className="font-bold text-secondary mb-2">{data.integrity_hash.paradox.name}</h4>
                        <p className="text-sm text-(--text-secondary) mb-4">{data.integrity_hash.paradox.desc}</p>
                        <p className="text-xs font-mono bg-(--bg-primary) p-2 rounded text-(--text-tertiary) border-l-2 border-secondary">
                            Implicación: {data.integrity_hash.implication}
                        </p>
                    </Card>
                </motion.div>

                {/* PKI */}
                <motion.div
                    whileInView={{ x: 0, opacity: 1 }}
                    initial={{ x: 20, opacity: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <Title level={3} className="flex items-center gap-2">
                        <UserCheck className="text-accent" /> {data.pki_trust.title}
                    </Title>
                    <div className="flex gap-4 items-center">
                        <span className="text-sm font-bold text-(--text-primary)">Evolución:</span>
                        <span className="text-xs text-(--text-tertiary) font-mono bg-(--bg-secondary) px-2 py-1 rounded border border-(--text-tertiary)/30">
                            {data.pki_trust.evolution}
                        </span>
                    </div>

                    <div className="bg-accent/5 p-6 rounded-xl border border-accent/20 hover:bg-accent/10 transition-colors">
                        <h4 className="font-bold text-accent mb-2">Caso real: {data.pki_trust.case_study.name}</h4>
                        <p className="text-sm text-(--text-secondary) mb-4">{data.pki_trust.case_study.desc}</p>
                        <div className="h-0.5 w-full bg-accent/20 my-4"></div>
                        <p className="text-sm italic text-(--text-primary)">
                            Tesis: "{data.pki_trust.thesis}"
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* 7. IMPLEMENTATION FAIL (PS3) */}
            <section className="bg-linear-to-br from-error/5 to-transparent rounded-2xl p-1 border border-error/20">
                <div className="bg-(--bg-secondary)/80 p-8 rounded-xl backdrop-blur-sm">
                    <div className="flex flex-col lg:flex-row gap-8 items-center">
                        <div className="lg:w-1/2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error/10 text-error text-xs font-bold mb-4 uppercase tracking-wider animate-pulse">
                                <AlertTriangle size={14} /> Fallo crítico de implementación
                            </div>
                            <h3 className="text-2xl font-bold text-(--text-primary) mb-4">{data.implementation_fail.title}</h3>
                            <p className="text-(--text-secondary) mb-6">{data.implementation_fail.desc}</p>
                            <p className="text-(--text-primary) italic font-medium border-l-4 border-error pl-4">
                                Lección: "{data.implementation_fail.lesson}"
                            </p>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <div className="bg-(--bg-code) p-6 rounded-xl font-mono text-sm relative overflow-hidden shadow-2xl border border-error/20">
                                <div className="absolute top-0 right-0 p-4 opacity-10 text-white">
                                    <Cpu size={80} />
                                </div>
                                <p className="text-gray-400 mb-2">// Ataque de reutilización de nonce ECDSA</p>
                                <p className="text-error mb-4">k = CONSTANT; // FATAL ERROR</p>

                                <p className="text-gray-300 mb-1">Recuperación de clave privada:</p>
                                <div className="bg-black/30 p-3 rounded text-center text-lg text-success font-bold mb-4">
                                    {data.implementation_fail.math.split('\\implies')[0]}
                                </div>
                                <p className="text-success text-center text-xs">
                                    ➜ {data.implementation_fail.math.split('\\implies')[1]}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* QUOTE */}
            <QuoteBlock
                quote={data.quote.text}
                author={data.quote.author}
                gradientFrom="secondary"
                gradientTo="primary"
                className="mt-16"
            />
        </motion.div>
    );
};

export default Panorama;
