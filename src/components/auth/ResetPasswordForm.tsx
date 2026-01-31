'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResetPasswordFormProps {
    token: string;
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [touched, setTouched] = useState({ password: false, confirm: false });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const hasPassword = password.length >= 6;
    const matchPassword = password === confirmPassword;
    const showPasswordError = touched.password && !hasPassword;
    const showConfirmError = touched.confirm && !matchPassword;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ password: true, confirm: true });

        if (!hasPassword || !matchPassword) {
            setError('Por favor corrige los campos marcados');
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Error al restablecer la contraseña');
                setIsLoading(false);
                return;
            }

            setSuccess(true);
            setTimeout(() => {
                router.push('/');
            }, 3000);
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
                    ¡Contraseña Actualizada!
                </h2>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: '1.6' }}>
                    Tu contraseña ha sido restablecida exitosamente.
                    <br />
                    Serás redirigido al login en unos segundos...
                </p>
                <div className="animate-pulse" style={{ color: '#818cf8' }}>
                    Redirigiendo...
                </div>
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
                    Nueva Contraseña
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                    Ingresa tu nueva contraseña
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Password */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label
                        htmlFor="password"
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
                        <Lock size={16} /> Nueva Contraseña
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            autoComplete="new-password"
                            className="input-glass"
                            style={{
                                borderColor: showPasswordError ? 'rgba(239, 68, 68, 0.5)' : undefined,
                                paddingRight: '45px'
                            }}
                            placeholder="Mínimo 6 caracteres"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                            required
                            autoFocus
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                color: '#94a3b8',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'color 0.2s ease',
                                opacity: isLoading ? 0.5 : 1
                            }}
                            onMouseEnter={(e) => !isLoading && (e.currentTarget.style.color = '#818cf8')}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        <AnimatePresence>
                            {showPasswordError && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    style={{ position: 'absolute', right: '45px', top: '12px', color: '#f87171' }}
                                >
                                    <AlertCircle size={18} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    {showPasswordError && (
                        <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.25rem', marginLeft: '0.2rem' }}>
                            Mínimo 6 caracteres
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div style={{ marginBottom: '2rem' }}>
                    <label
                        htmlFor="confirmPassword"
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
                        <Lock size={16} /> Confirmar Contraseña
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            autoComplete="new-password"
                            className="input-glass"
                            style={{
                                borderColor: showConfirmError ? 'rgba(239, 68, 68, 0.5)' : undefined,
                                paddingRight: '45px'
                            }}
                            placeholder="Repite tu contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={() => setTouched(prev => ({ ...prev, confirm: true }))}
                            required
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={isLoading}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                color: '#94a3b8',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'color 0.2s ease',
                                opacity: isLoading ? 0.5 : 1
                            }}
                            onMouseEnter={(e) => !isLoading && (e.currentTarget.style.color = '#818cf8')}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        <AnimatePresence>
                            {showConfirmError && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    style={{ position: 'absolute', right: '45px', top: '12px', color: '#f87171' }}
                                >
                                    <AlertCircle size={18} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    {showConfirmError && (
                        <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.25rem', marginLeft: '0.2rem' }}>
                            Las contraseñas no coinciden
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
                        <span className="animate-pulse">Actualizando...</span>
                    ) : (
                        <>
                            Restablecer Contraseña <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    );
};
