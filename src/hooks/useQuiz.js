import { useState, useEffect, useCallback, useRef } from 'react';
import { shuffleArray, calculatePoints } from '../utils/quizUtils';

// Configuración por defecto
const DEFAULT_CONFIG = {
    questionsPerQuiz: 10,
    timePerQuestion: 30, // segundos
    pointsPerQuestion: 10
};

/**
 * Custom Hook para gestionar la lógica de un cuestionario (Quiz).
 * Maneja el estado del juego, temporizadores, puntuación y aleatorización.
 * 
 * @param {Object} quizData - Objeto con la estructura { levels: { easy: [], medium: [], hard: [] } }
 * @param {Object} config - Configuración opcional { questionsPerQuiz, timePerQuestion, pointsPerQuestion }
 */
const useQuiz = (quizData, config = {}) => {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };

    // --- Estados del Juego ---
    const [status, setStatus] = useState('idle'); // 'idle', 'active', 'finished'
    const [level, setLevel] = useState(null);
    const [questionsStack, setQuestionsStack] = useState([]); // Las 10 preguntas seleccionadas
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [history, setHistory] = useState([]); // Registro detallado de respuestas

    // --- Estados de la Pregunta Actual ---
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [timeLeft, setTimeLeft] = useState(finalConfig.timePerQuestion);
    const [hintUsed, setHintUsed] = useState(false);
    const [answerStatus, setAnswerStatus] = useState(null); // 'waiting', 'correct', 'incorrect', 'timeout'
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null); // Índice de la opción seleccionada por el usuario

    const timerRef = useRef(null);

    // --- Lógica del Temporizador ---
    useEffect(() => {
        if (status === 'active' && answerStatus === 'waiting' && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && answerStatus === 'waiting') {
            handleTimeout();
        }

        return () => clearInterval(timerRef.current);
    }, [status, answerStatus, timeLeft]);

    // --- Manejadores Internos ---

    const handleTimeout = () => {
        clearInterval(timerRef.current);
        setAnswerStatus('timeout');
        // Timeout cuenta como incorrecta (0 puntos)
        updateHistory(null, false, true);
    };

    const updateHistory = (selectedOption, isCorrect, isTimeout) => {
        setHistory(prev => [...prev, {
            questionId: currentQuestion.id,
            questionText: currentQuestion.question,
            selectedOption: selectedOption,
            isCorrect,
            isTimeout,
            hintUsed,
            points: isCorrect ? calculatePoints(true, hintUsed, finalConfig.pointsPerQuestion) : 0
        }]);

        if (isCorrect) {
            setScore(prev => prev + calculatePoints(true, hintUsed, finalConfig.pointsPerQuestion));
        }
    };

    // --- API Pública del Hook ---

    /**
     * Inicia un nuevo Quiz.
     * Selecciona preguntas aleatorias del nivel, baraja sus opciones y resetea contadores.
     * @param {string} selectedLevel - 'easy', 'medium', 'hard'
     */
    const startQuiz = useCallback((selectedLevel) => {
        if (!quizData?.levels?.[selectedLevel]) {
            console.error(`Invalid level: ${selectedLevel}`);
            return;
        }

        const levelQuestions = quizData.levels[selectedLevel];
        // Seleccionar N preguntas aleatorias (o todas si hay menos de N)
        const count = Math.min(levelQuestions.length, finalConfig.questionsPerQuiz);
        const rawQuestions = shuffleArray(levelQuestions).slice(0, count);

        // Preparar las preguntas: barajar sus opciones y guardar la referencia del índice correcto original
        // NOTA: Para no perder cuál es la correcta al barajar, transformamos las opciones.
        const processedQuestions = rawQuestions.map(q => {
            // q.options es un array de { text, isCorrect, feedback }
            // shuffleArray retorna una copia mezclada.
            const shuffledOptions = shuffleArray(q.options);
            return {
                ...q,
                options: shuffledOptions // Ahora el índice 0 no es necesariamente el a) original
            };
        });

        setQuestionsStack(processedQuestions);
        setCurrentQuestionIndex(0);
        setCurrentQuestion(processedQuestions[0]);
        setLevel(selectedLevel);
        setScore(0);
        setHistory([]);
        setStatus('active');

        // Reset estados de pregunta
        resetQuestionState();

    }, [quizData, finalConfig]);

    const resetQuestionState = () => {
        setTimeLeft(finalConfig.timePerQuestion);
        setHintUsed(false);
        setAnswerStatus('waiting');
        setSelectedOptionIndex(null);
    };

    /**
     * Procesa la respuesta del usuario.
     * @param {number} optionIndex - Índice de la opción seleccionada en el array barajado actual.
     */
    const submitAnswer = (optionIndex) => {
        if (answerStatus !== 'waiting') return; // Prevenir múltiples clicks

        clearInterval(timerRef.current);
        setSelectedOptionIndex(optionIndex);

        const selectedOption = currentQuestion.options[optionIndex];
        const isCorrect = selectedOption.isCorrect;

        setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
        updateHistory(selectedOption, isCorrect, false);
    };

    /**
     * Activa la pista para la pregunta actual.
     */
    const useHint = () => {
        if (answerStatus === 'waiting' && !hintUsed) {
            setHintUsed(true);
        }
    };

    /**
     * Avanza a la siguiente pregunta o finaliza el quiz.
     */
    const nextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;

        if (nextIndex < questionsStack.length) {
            setCurrentQuestionIndex(nextIndex);
            setCurrentQuestion(questionsStack[nextIndex]);
            resetQuestionState();
        } else {
            setStatus('finished');
        }
    };

    /**
     * Reinicia el quiz al estado inicial (selección de nivel).
     */
    const quitQuiz = () => {
        setStatus('idle');
        setQuestionsStack([]);
        setCurrentQuestion(null);
    };

    return {
        // Estado General
        status,
        level,
        score,
        history,
        currentQuestionIndex,
        totalQuestions: questionsStack.length,

        // Estado de Pregunta Actual
        currentQuestion,
        timeLeft,
        hintUsed,
        answerStatus, // 'waiting', 'correct', 'incorrect', 'timeout'
        selectedOptionIndex,

        // Acciones
        startQuiz,
        submitAnswer,
        useHint,
        nextQuestion,
        quitQuiz
    };
};

export default useQuiz;
