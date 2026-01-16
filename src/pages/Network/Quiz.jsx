import React from 'react';
import { ClipboardList, Construction, Lightbulb, Trophy, CheckCircle, Network, Layers, ShieldAlert, Activity } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';

const Quiz = () => {
    return (
        <div className="animate-fade-in space-y-8">
            <PageHeader
                title="Cuestionario de Evaluación TCP/IP"
                description="Sección en construcción. Próximamente disponible."
            />

            {/* Tarjeta de Encabezado */}
            <Card className="border-b-4 border-warning text-center py-12">
                <div className="flex justify-center mb-6">
                    <div className="p-6 rounded-full bg-warning/10 animate-pulse">
                        <Construction className="w-20 h-20 text-warning" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-(--text-primary) mb-3">Zona en Construcción</h2>
                <p className="text-(--text-secondary) max-w-2xl mx-auto">
                    Estamos calibrando los servidores y configurando el firewall.
                    Pronto podrás poner a prueba tus conocimientos sobre el modelo TCP/IP, ataques de red y defensa.
                </p>
            </Card>

            {/* Vista Previa de Características */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-primary hover:bg-(--bg-secondary)/50 transition-colors">
                    <div className="flex flex-col items-center text-center gap-3">
                        <div className="p-3 rounded-full bg-primary/10">
                            <ClipboardList className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="font-bold text-(--text-primary)">Desafíos Prácticos</h4>
                        <p className="text-xs text-(--text-secondary)">
                            Preguntas basadas en escenarios reales de análisis de paquetes y topologías.
                        </p>
                    </div>
                </Card>

                <Card className="border-l-4 border-l-secondary hover:bg-(--bg-secondary)/50 transition-colors">
                    <div className="flex flex-col items-center text-center gap-3">
                        <div className="p-3 rounded-full bg-secondary/10">
                            <Lightbulb className="w-8 h-8 text-secondary" />
                        </div>
                        <h4 className="font-bold text-(--text-primary)">Análisis Profundo</h4>
                        <p className="text-xs text-(--text-secondary)">
                            Entiende el "por qué" detrás de cada protocolo y vulnerabilidad.
                        </p>
                    </div>
                </Card>

                <Card className="border-l-4 border-l-success hover:bg-(--bg-secondary)/50 transition-colors">
                    <div className="flex flex-col items-center text-center gap-3">
                        <div className="p-3 rounded-full bg-success/10">
                            <Trophy className="w-8 h-8 text-success" />
                        </div>
                        <h4 className="font-bold text-(--text-primary)">Certificación Virtual</h4>
                        <p className="text-xs text-(--text-secondary)">
                            Completa los módulos y obtén tu insignia de especialista en redes (simulada).
                        </p>
                    </div>
                </Card>
            </div>

            {/* Aviso de Próximamente */}
            <Card className="bg-(--bg-tertiary) border border-(--text-tertiary)">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="p-4 rounded-xl bg-(--bg-secondary) border border-(--text-tertiary)">
                        <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h4 className="font-bold text-(--text-primary) mb-4 text-lg">Temario en desarrollo:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <Layers className="w-5 h-5 text-secondary" />
                                <span className="text-sm text-(--text-secondary)">Modelo TCP/IP y OSI</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Network className="w-5 h-5 text-primary" />
                                <span className="text-sm text-(--text-secondary)">Protocolos de Reconocimiento</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldAlert className="w-5 h-5 text-warning" />
                                <span className="text-sm text-(--text-secondary)">Ataques MITM & Spoofing</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Activity className="w-5 h-5 text-error" />
                                <span className="text-sm text-(--text-secondary)">Denegación de Servicio (DoS)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Quiz;
