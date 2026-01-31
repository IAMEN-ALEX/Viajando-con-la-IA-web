'use client';
import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/app/dashboard/dashboard.module.css';
import { Trip } from '@/types';

interface AIQuerySectionProps {
    trips: Trip[];
}

export const AIQuerySection = memo(({ trips }: AIQuerySectionProps) => {
    const [question, setQuestion] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [showResponse, setShowResponse] = useState(false);

    const handleAskQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;

        setShowResponse(true);
        setAiResponse('Consultando a tu asistente de viajes...');

        try {
            const response = await fetch('/api/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question,
                    trips
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.response || `Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setAiResponse(data.response);
        } catch (error) {
            console.error('Error fetching AI response:', error);
            setAiResponse('Lo siento, no pude conectar con el asistente. Por favor intenta de nuevo.');
        }
    };

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Hazle una pregunta a la IA acerca de tus viajes!</h2>
            <form onSubmit={handleAskQuestion}>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        id="ai-question"
                        name="question"
                        autoComplete="off"
                        className={styles.input}
                        placeholder="que voy hacer en Alemania ?"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className={styles.btnPrimary}
                >
                    Pregunta
                </motion.button>
            </form>

            <AnimatePresence>
                {showResponse && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={styles.responseBox}
                    >
                        <div className={styles.responseHeader}>
                            <span className={styles.responseTitle}>Respuesta IA:</span>
                            <button
                                className={styles.closeBtn}
                                onClick={() => setShowResponse(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <p className={styles.responseText}>{aiResponse}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
});

AIQuerySection.displayName = 'AIQuerySection';
