import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Shield, Lock, Hash, Key, FileText, Brain } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import QuizGame from '../../components/ui/QuizGame';

// Importar datos de los Quiz (por ahora solo Intro)
import introHistoriaData from './data/quiz/introHistoria.json';

const AVAILABLE_QUIZZES = [
    {
        id: 'intro',
        title: 'Historia y Fundamentos',
        description: 'Evalúa tu comprensión sobre la evolución histórica, desde la escítala hasta la máquina Enigma, y los principios básicos como Kerckhoffs.',
        icon: Brain,
        data: introHistoriaData,
        difficulty: 'Easy / Medium',
        questionsCount: 10 // Aproximado
    },
    {
        id: 'simetrica',
        title: 'Cifrado Simétrico',
        description: 'Próximamente: DES, AES y modos de operación.',
        icon: Lock,
        data: null, // Aún no disponible
        difficulty: 'Medium',
        disabled: true
    },
    {
        id: 'asimetrica',
        title: 'Cifrado Asimétrico',
        description: 'Próximamente: RSA, Diffie-Hellman y Curvas Elípticas.',
        icon: Key,
        data: null, // Aún no disponible
        difficulty: 'Hard',
        disabled: true
    }
];

const Quiz = () => {
    const location = useLocation();
    const [activeQuizId, setActiveQuizId] = useState(null);

    // Efecto para detectar si venimos redirigidos con un topic específico
    useEffect(() => {
        if (location.state?.topic) {
            const topic = location.state.topic;
            // Validar si es un quiz válido
            if (AVAILABLE_QUIZZES.some(q => q.id === topic)) {
                setActiveQuizId(topic);
            }
        }
    }, [location.state]);

    const handleStartQuiz = (quizId) => {
        setActiveQuizId(quizId);
    };

    const handleCloseQuiz = () => {
        setActiveQuizId(null);
        // Limpiar el estado de location para no re-abrirlo al refrescar podría requerir navegación, 
        // pero por ahora dejarlo así está bien para UX simple.
    };

    const activeQuizConfig = AVAILABLE_QUIZZES.find(q => q.id === activeQuizId);

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <PageHeader
                title="Evaluaciones de Criptografía"
                description="Selecciona un módulo para poner a prueba tus conocimientos teóricos y prácticos."
                gradientFrom="primary"
                gradientTo="success"
            />

            {activeQuizId && activeQuizConfig ? (
                // --- MODO JUEGO ---
                <div className="max-w-4xl mx-auto">
                    <QuizGame
                        quizData={activeQuizConfig.data}
                        title={`Evaluación: ${activeQuizConfig.title}`}
                        onClose={handleCloseQuiz}
                    />
                </div>
            ) : (
                // --- MODO SELECCIÓN ---
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {AVAILABLE_QUIZZES.map((quiz) => {
                        const Icon = quiz.icon;
                        return (
                            <div
                                key={quiz.id}
                                className={`
                                    relative p-6 rounded-2xl border transition-all duration-300 group
                                    ${quiz.disabled
                                        ? 'bg-(--bg-secondary)/50 border-(--text-tertiary)/30 opacity-60 cursor-not-allowed'
                                        : 'bg-(--bg-secondary) border-(--text-tertiary) hover:border-success/50 hover:shadow-xl hover:-translate-y-1 cursor-pointer'}
                                `}
                                onClick={() => !quiz.disabled && handleStartQuiz(quiz.id)}
                            >
                                <div className={`
                                    w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors
                                    ${quiz.disabled ? 'bg-gray-800 text-gray-600' : 'bg-success/10 text-success group-hover:bg-success group-hover:text-black'}
                                `}>
                                    <Icon className="w-6 h-6" />
                                </div>

                                <h3 className="text-xl font-bold text-(--text-success) mb-2">
                                    {quiz.title}
                                </h3>

                                <p className="text-(--text-secondary) text-sm mb-6 min-h-[60px]">
                                    {quiz.description}
                                </p>

                                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-(--text-tertiary)">
                                    <span>{quiz.difficulty}</span>
                                    {!quiz.disabled && (
                                        <span className="flex items-center gap-1">
                                            {quiz.data?.levels?.easy?.length + quiz.data?.levels?.medium?.length + quiz.data?.levels?.hard?.length || 0} Preguntas
                                        </span>
                                    )}
                                </div>

                                {quiz.disabled && (
                                    <div className="absolute top-4 right-4 px-2 py-1 bg-gray-800 rounded text-[10px] text-gray-400 font-bold border border-gray-700">
                                        PRÓXIMAMENTE
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Quiz;
