import React from 'react';
import { ClipboardList, Construction, Lightbulb, Trophy, CheckCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Title from '../../components/ui/Title';

const Quiz = () => {
    return (
        <div className="animate-fade-in space-y-8">
            {/* Header Card */}
            <Card className="border-b-4 border-accent text-center">
                <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-accent/10">
                        <Construction className="w-16 h-16 text-accent" />
                    </div>
                </div>
                <Title level={2} className="mb-2">Cuestionario de Evaluación</Title>
                <p className="text-sm text-(--text-secondary) max-w-2xl mx-auto">
                    Esta sección está en desarrollo. Próximamente podrás evaluar tus conocimientos sobre las amenazas de seguridad cubiertas en este módulo.
                </p>
            </Card>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-primary hover:bg-(--bg-secondary)/50 transition-colors">
                    <div className="flex flex-col items-center text-center gap-3">
                        <div className="p-3 rounded-full bg-primary/10">
                            <ClipboardList className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="font-bold text-(--text-primary)">Preguntas Interactivas</h4>
                        <p className="text-xs text-(--text-secondary)">
                            Evalúa tu comprensión de SQLi, NoSQL, Ransomware, Cloud/API y más.
                        </p>
                    </div>
                </Card>

                <Card className="border-l-4 border-l-secondary hover:bg-(--bg-secondary)/50 transition-colors">
                    <div className="flex flex-col items-center text-center gap-3">
                        <div className="p-3 rounded-full bg-secondary/10">
                            <Lightbulb className="w-8 h-8 text-secondary" />
                        </div>
                        <h4 className="font-bold text-(--text-primary)">Explicaciones Detalladas</h4>
                        <p className="text-xs text-(--text-secondary)">
                            Cada respuesta incluirá una explicación técnica para reforzar el aprendizaje.
                        </p>
                    </div>
                </Card>

                <Card className="border-l-4 border-l-success hover:bg-(--bg-secondary)/50 transition-colors">
                    <div className="flex flex-col items-center text-center gap-3">
                        <div className="p-3 rounded-full bg-success/10">
                            <Trophy className="w-8 h-8 text-success" />
                        </div>
                        <h4 className="font-bold text-(--text-primary)">Sistema de Puntuación</h4>
                        <p className="text-xs text-(--text-secondary)">
                            Obtén una calificación final y compara tu nivel de conocimiento.
                        </p>
                    </div>
                </Card>
            </div>

            {/* Coming Soon Notice */}
            <Card className="bg-(--bg-tertiary) border border-accent/30">
                <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-accent/20">
                        <CheckCircle className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                        <h4 className="font-bold text-(--text-primary) mb-2">Próximamente Disponible</h4>
                        <p className="text-sm text-(--text-secondary) mb-3">
                            Estamos preparando un cuestionario completo que cubrirá todos los temas del módulo de Amenazas:
                        </p>
                        <ul className="text-xs text-(--text-secondary) space-y-1 ml-4">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                Inyección SQL (In-Band, Blind, OOB)
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                                NoSQL y Bases de Datos Modernas
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                                Ransomware y Extorsión
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-warning"></span>
                                Seguridad en Cloud y APIs
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                                Infraestructura y Active Directory
                            </li>
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Quiz;
