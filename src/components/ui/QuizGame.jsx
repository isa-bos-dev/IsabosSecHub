import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, HelpCircle, CheckCircle, XCircle, Award, ArrowRight, RefreshCcw, LogOut, Brain } from 'lucide-react';
import useQuiz from '../../hooks/useQuiz';

const QuizGame = ({ quizData, title, onClose }) => {
    const {
        status,
        level,
        score,
        history,
        currentQuestionIndex,
        totalQuestions,
        currentQuestion,
        timeLeft,
        hintUsed,
        answerStatus,
        selectedOptionIndex,
        startQuiz,
        submitAnswer,
        useHint,
        nextQuestion,
        quitQuiz
    } = useQuiz(quizData);

    // Variantes de animación
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 0.95 }
    };

    const optionVariants = {
        hover: { scale: 1.02, x: 5 },
        tap: { scale: 0.98 }
    };

    // --- PANTALLA DE INICIO: SELECCIÓN DE NIVEL ---
    if (status === 'idle') {
        return (
            <motion.div
                className="max-w-2xl mx-auto bg-(--bg-secondary) rounded-2xl border border-(--text-tertiary) p-8 shadow-2xl relative overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {/* Decoración de fondo */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="text-center space-y-6 relative z-10">
                    <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 mb-4">
                        <Brain className="w-10 h-10 text-primary" />
                    </div>

                    <h2 className="text-3xl font-bold text-(--text-primary)">
                        {title || "Desafío de Conocimiento"}
                    </h2>
                    <p className="text-(--text-secondary) max-w-md mx-auto">
                        Pon a prueba lo que has aprendido. Selecciona un nivel de dificultad para comenzar la simulación.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        {['easy', 'medium', 'hard'].map((lvl) => {
                            const labels = { easy: 'Iniciado', medium: 'Profesional', hard: 'Hacker' };
                            const colors = { easy: 'border-green-500/50 hover:bg-green-500/10', medium: 'border-yellow-500/50 hover:bg-yellow-500/10', hard: 'border-red-500/50 hover:bg-red-500/10' };
                            const hasQuestions = quizData.levels[lvl]?.length > 0;

                            return (
                                <button
                                    key={lvl}
                                    onClick={() => hasQuestions && startQuiz(lvl)}
                                    disabled={!hasQuestions}
                                    className={`
                                        p-6 rounded-xl border-2 transition-all duration-300 text-left relative group
                                        ${hasQuestions ? colors[lvl] : 'border-gray-700 opacity-50 cursor-not-allowed'}
                                        ${hasQuestions ? 'text-(--text-primary)' : 'text-(--text-tertiary)'}
                                    `}
                                >
                                    <div className="text-lg font-bold mb-1 capitalize">{labels[lvl]}</div>
                                    <div className="text-xs opacity-70">
                                        {hasQuestions ? `${quizData.levels[lvl].length} Preguntas` : 'No disponible'}
                                    </div>
                                    {hasQuestions && (
                                        <ArrowRight className="absolute bottom-4 right-4 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={onClose}
                        className="mt-8 text-sm text-(--text-tertiary) hover:text-(--text-primary) flex items-center justify-center gap-2 mx-auto transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> Cancelar y volver
                    </button>
                </div>
            </motion.div>
        );
    }

    // --- PANTALLA FINAL: RESULTADOS ---
    if (status === 'finished') {
        const percentage = Math.round((score / (totalQuestions * 10)) * 100);

        return (
            <motion.div
                className="max-w-4xl mx-auto space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Tarjeta de Puntuación */}
                <div className="bg-(--bg-secondary) rounded-2xl border border-(--text-tertiary) p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />

                    <Award className={`w-16 h-16 mx-auto mb-4 ${percentage >= 70 ? 'text-yellow-400' : 'text-gray-400'}`} />

                    <h2 className="text-3xl font-bold text-(--text-primary) mb-2">Simulación Completada</h2>
                    <div className="text-5xl font-black text-primary mb-4 tracking-tight">
                        {score} <span className="text-2xl text-(--text-secondary) font-normal">pts</span>
                    </div>
                    <p className={`text-lg font-medium ${percentage >= 70 ? 'text-green-400' : 'text-red-400'}`}>
                        {percentage >= 70 ? '¡Excelente trabajo!' : 'Necesitas repasar algunos conceptos.'}
                    </p>

                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={() => quitQuiz()}
                            className="px-6 py-2 rounded-lg bg-(--bg-tertiary) border border-(--text-tertiary) text-(--text-primary) hover:bg-(--bg-primary) transition-colors flex items-center gap-2"
                        >
                            <RefreshCcw className="w-4 h-4" /> Intentar otro nivel
                        </button>
                        <button
                            onClick={onClose}
                            className="px-6 py-2 rounded-lg bg-primary text-black font-bold hover:bg-primary/90 transition-colors"
                        >
                            Finalizar
                        </button>
                    </div>
                </div>

                {/* Desglose de Respuestas */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-(--text-primary) px-2">Análisis de Respuestas</h3>
                    {history.map((record, idx) => (
                        <div key={idx} className={`p-4 rounded-xl border ${record.isCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                            <div className="flex gap-4">
                                <div className="mt-1">
                                    {record.isCorrect ? (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-red-500" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-(--text-primary) text-lg mb-2">{record.questionText}</p>

                                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="block text-xs uppercase tracking-wider text-(--text-tertiary)">Tu respuesta:</span>
                                            <span className={record.isCorrect ? 'text-green-400' : 'text-red-400'}>
                                                {record.selectedOption?.text || (record.isTimeout ? "Tiempo agotado" : "N/A")}
                                            </span>
                                            {record.hintUsed && <span className="ml-2 text-xs text-yellow-500">(Pista usada)</span>}
                                        </div>
                                        {/* Solo mostrar Feedback si hay */}
                                        {record.selectedOption?.feedback && (
                                            <div>
                                                <span className="block text-xs uppercase tracking-wider text-(--text-tertiary)">Análisis:</span>
                                                <span className="text-(--text-secondary) italic">"{record.selectedOption.feedback}"</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`font-bold text-lg ${record.isCorrect ? 'text-primary' : 'text-(--text-tertiary)'}`}>
                                        +{record.points}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        );
    }

    // --- PANTALLA JUEGO ACTIVO ---
    if (!currentQuestion) return null;

    return (
        <motion.div
            className="max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={currentQuestion.id} // Re-animar al cambiar de pregunta
        >
            {/* Header del Juego */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-(--bg-secondary) rounded-full text-sm font-mono border border-(--text-tertiary) text-(--text-secondary)">
                        {currentQuestionIndex + 1} / {totalQuestions}
                    </span>
                    <span className="text-primary font-bold text-xl drop-shadow-lg">
                        {score} pts
                    </span>
                </div>

                {/* Timer */}
                <div className={`flex items-center gap-2 font-mono text-xl font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-(--text-primary)'}`}>
                    <Clock className="w-5 h-5" />
                    00:{timeLeft.toString().padStart(2, '0')}
                </div>
            </div>

            {/* Tarjeta de Pregunta */}
            <div className="bg-(--bg-secondary) rounded-2xl border border-(--text-tertiary) p-6 md:p-8 shadow-xl mb-6 relative">
                {/* Barra de progreso superior */}
                <motion.div
                    className="absolute top-0 left-0 h-1 bg-primary"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                />

                <h3 className="text-xl md:text-2xl font-bold text-(--text-primary) leading-relaxed mb-8">
                    {currentQuestion.question}
                </h3>

                {/* Grid de Opciones */}
                <div className="grid gap-3">
                    <AnimatePresence>
                        {currentQuestion.options.map((option, idx) => {
                            let optionStateStyle = 'border-(--text-tertiary) hover:border-primary/50 hover:bg-primary/5'; // estado normal
                            let textStyle = 'text-(--text-secondary)';

                            if (answerStatus !== 'waiting') {
                                // Revelar respuestas
                                if (option.isCorrect) {
                                    optionStateStyle = 'border-green-500 bg-green-500/10';
                                    textStyle = 'text-green-400';
                                } else if (selectedOptionIndex === idx) {
                                    optionStateStyle = 'border-red-500 bg-red-500/10';
                                    textStyle = 'text-red-400';
                                } else {
                                    optionStateStyle = 'opacity-50 border-(--text-tertiary)';
                                }
                            }

                            return (
                                <motion.button
                                    key={idx}
                                    variants={optionVariants}
                                    whileHover={answerStatus === 'waiting' ? "hover" : {}}
                                    whileTap={answerStatus === 'waiting' ? "tap" : {}}
                                    onClick={() => submitAnswer(idx)}
                                    disabled={answerStatus !== 'waiting'}
                                    className={`
                                        w-full p-4 rounded-xl border-2 text-left transition-colors relative
                                        ${optionStateStyle}
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`
                                            w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border
                                            ${answerStatus === 'waiting' ? 'bg-(--bg-tertiary) border-(--text-tertiary)' :
                                                option.isCorrect ? 'bg-green-500 text-black border-green-500' :
                                                    selectedOptionIndex === idx ? 'bg-red-500 text-white border-red-500' : 'border-transparent opacity-0'}
                                        `}>
                                            {String.fromCharCode(65 + idx)}
                                        </div>
                                        <span className={`font-medium ${textStyle}`}>{option.text}</span>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer de Acciones */}
            <div className="flex justify-between items-center">
                {/* Botón de Pista */}
                <button
                    onClick={useHint}
                    disabled={hintUsed || answerStatus !== 'waiting'}
                    className={`
                        flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg transition-all
                        ${hintUsed
                            ? 'text-yellow-500 bg-yellow-500/10 cursor-default'
                            : 'text-(--text-secondary) hover:text-yellow-400 hover:bg-yellow-400/5'}
                        ${answerStatus !== 'waiting' ? 'opacity-0' : 'opacity-100'}
                    `}
                >
                    <HelpCircle className="w-4 h-4" />
                    {hintUsed ? 'Pista Activa (-50%)' : 'Solicitar Pista'}
                </button>

                {/* Mensaje de Pista */}
                <AnimatePresence>
                    {hintUsed && answerStatus === 'waiting' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-24 left-0 right-0 max-w-2xl mx-auto bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl text-yellow-200 text-sm flex items-start gap-3 backdrop-blur-md z-20"
                        >
                            <HelpCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <p>{currentQuestion.hint}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Botón Siguiente (Solo aparece tras responder) */}
                {answerStatus !== 'waiting' && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={nextQuestion}
                        className="px-8 py-3 bg-primary text-black font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all flex items-center gap-2"
                    >
                        {currentQuestionIndex < totalQuestions - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                )}
            </div>

        </motion.div>
    );
};

export default QuizGame;
