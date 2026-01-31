'use client';
import { useState } from 'react';
import { Mail, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
    const showEmailError = touched && !isValidEmail(email);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched(true);

        if (!isValidEmail(email)) {
            setError('Por favor ingresa un correo válido.');
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Error al procesar la solicitud');
                setIsLoading(false);
                return;
            }

            setSuccess(true);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setError('Ocurrió un error inesperado');
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-ultra"
                style={{
                    padding: '3.5rem',
                    width: '100%',
                    maxWidth: '480px',
                    zIndex: 10,
                    textAlign: 'center'
                }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    style={{ marginBottom: '1.5rem' }}
                >
                    <CheckCircle size={64} style={{ color: '#10b981', margin: '0 auto' }} />
                </motion.div>
                <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                    ¡Correo Enviado!
                </h2>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: '1.6' }}>
                    Hemos enviado un enlace de recuperación a <strong style={{ color: '#818cf8' }}>{email}</strong>.
                    <br />
                    Por favor revisa tu bandeja de entrada y sigue las instrucciones.
                </p>
                <Link
                    href="/"
                    className="btn-glass-premium"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        textDecoration: 'none'
                    }}
                >
                    Volver al Login
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-ultra"
            style={{
                padding: '3.5rem',
                width: '100%',
                maxWidth: '480px',
                zIndex: 10
            }}
        >
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>
                    Recuperar Cuenta
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                    Ingresa tu correo y te enviaremos un enlace de recuperación
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '2rem' }}>
                    <label
                        htmlFor="email"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.5rem',
                            color: '#94a3b8',
                            fontSize: '0.9rem',
                            fontWeight: 500
                        }}
                    >
                        <Mail size={16} /> Correo Electrónico
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            className="input-glass"
                            style={{
                                borderColor: showEmailError ? 'rgba(239, 68, 68, 0.5)' : undefined
                            }}
                            placeholder="usuario@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setTouched(true)}
                            required
                            autoFocus
                            disabled={isLoading}
                        />
                        <AnimatePresence>
                            {showEmailError && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    style={{ position: 'absolute', right: '10px', top: '12px', color: '#f87171' }}
                                >
                                    <AlertCircle size={18} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    {showEmailError && (
                        <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.25rem', marginLeft: '0.2rem' }}>
                            Correo inválido
                        </p>
                    )}
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{
                                marginBottom: '1.5rem',
                                padding: '0.75rem 1rem',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: '0.75rem',
                                color: '#fca5a5',
                                fontSize: '0.9rem',
                                textAlign: 'center',
                                overflow: 'hidden'
                            }}
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    type="submit"
                    className="btn-glass-premium"
                    disabled={isLoading}
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: isLoading ? 'progress' : 'pointer'
                    }}
                >
                    {isLoading ? (
                        <span className="animate-pulse">Enviando...</span>
                    ) : (
                        <>
                            Enviar Enlace <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </form>

            <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.95rem', color: 'var(--secondary)' }}>
                ¿Recordaste tu contraseña?{' '}
                <Link
                    href="/"
                    style={{
                        color: '#818cf8',
                        textDecoration: 'none',
                        fontWeight: 600,
                        marginLeft: '0.5rem'
                    }}
                >
                    Iniciar Sesión
                </Link>
            </div>
        </motion.div>
    );
};
