import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Network, Globe, Lock, Cpu, Server } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Title from '../../components/ui/Title';

const Home = () => {
    return (
        <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) font-sans flex flex-col items-center justify-center relative overflow-hidden">

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
            </div>

            <main className="z-10 text-center max-w-5xl px-4 w-full grow flex flex-col justify-center">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <Shield className="w-24 h-24 text-primary" strokeWidth={1} />
                            <Lock className="w-8 h-8 text-secondary absolute bottom-0 right-0" />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-linear-to-r from-primary via-blue-500 to-secondary leading-tight pb-2">
                        IsabosSecurity Hub
                    </h1>
                    <p className="text-xl text-(--text-secondary) font-light leading-relaxed max-w-2xl mx-auto">
                        Plataforma centralizada de investigación y demostración de ciberseguridad.
                        Explora amenazas avanzadas, arquitecturas de red y vectores de ataque.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto mb-20">

                    {/* Card 1: Network Research */}
                    <Link to="/network" className="block h-full">
                        <Card
                            className="h-full flex flex-col items-center text-center p-8 transition-all duration-300"
                            hoverShadow="0 20px 40px rgba(0, 176, 240, 0.2)"
                            hoverBorderColor="var(--color-primary)"
                        >
                            <div className="mb-6 p-4 bg-primary/20 rounded-full group-hover:bg-primary/20 transition-colors">
                                <Network className="w-12 h-12 text-primary" />
                            </div>
                            <Title level={3} className="text-(--text-primary) mb-3">Network & TCP/IP</Title>
                            <p className="text-sm text-(--text-secondary) leading-relaxed mb-6">
                                Análisis profundo de protocolos, modelo TCP/IP, ataques de red y defensa perimetral.
                            </p>
                            <div className="mt-auto flex items-center text-primary text-sm font-bold uppercase tracking-widest">
                                Acceder <Globe className="ml-2 w-4 h-4" />
                            </div>
                        </Card>
                    </Link>

                    {/* Card 2: Threat Intelligence */}
                    <Link to="/threats" className="block h-full">
                        <Card
                            className="h-full flex flex-col items-center text-center p-8 transition-all duration-300"
                            hoverShadow="0 20px 40px rgba(216, 110, 204, 0.2)"
                            hoverBorderColor="var(--color-secondary)"
                        >
                            <div className="mb-6 p-4 bg-secondary/20 rounded-full group-hover:bg-secondary/20 transition-colors">
                                <Server className="w-12 h-12 text-secondary" />
                            </div>
                            <Title level={3} className="text-(--text-primary) mb-3">Threat Intelligence</Title>
                            <p className="text-sm text-(--text-secondary) leading-relaxed mb-6">
                                Base de datos de vulnerabilidades, inyecciones SQL/NoSQL, Ransomware y vectores de ataque modernos.
                            </p>
                            <div className="mt-auto flex items-center text-secondary text-sm font-bold uppercase tracking-widest">
                                Acceder <Cpu className="ml-2 w-4 h-4" />
                            </div>
                        </Card>
                    </Link>

                </div>
            </main>

            <Footer className="w-full bg-transparent border-none mt-auto" />
        </div>
    );
};

export default Home;
