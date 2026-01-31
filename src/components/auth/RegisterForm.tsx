'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export const RegisterForm = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [touched, setTouched] = useState({ name: false, email: false, password: false, confirm: false });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Validation Logic
    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
    const hasName = name.trim().length > 0;
    const hasPassword = password.length >= 6;
    const matchPassword = password === confirmPassword;

    useEffect(() => {
        router.prefetch('/dashboard');
    }, [router]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ name: true, email: true, password: true, confirm: true });

        if (!hasName || !isValidEmail(email) || !hasPassword || !matchPassword) {
            setError('Por favor corrige los campos marcados');
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Error al registrar usuario');
                setIsLoading(false);
                return;
            }

            // Show success message and redirect to login
            setSuccess(true);
            setIsLoading(false);

            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push('/');
            }, 2000);

        } catch (err) {
            setError('Ocurrió un error inesperado');
            console.error(err);
            setIsLoading(false);
        }
    };

    // Success screen
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
                    ¡Cuenta Creada!
                </h2>
                <p style={{ color: '#94a3b8', marginBottom: '1rem', lineHeight: '1.6' }}>
                    Tu cuenta ha sido creada exitosamente.
                </p>
                <p style={{ color: '#818cf8', marginBottom: '2rem', fontSize: '0.95rem' }}>
                    Serás redirigido al login en unos segundos...
                </p>
                <div className="animate-pulse" style={{ color: '#818cf8', fontSize: '0.9rem' }}>
                    Redirigiendo...
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
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
                <h1 className="gradient-text" style={{ fontSize: '2.8rem', margin: '0 0 0.5rem 0' }}>Crear Cuenta</h1>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Únete a Viajando con la IA</p>
            </div>

            <form onSubmit={handleRegister} style={{
                opacity: isLoading ? 0.7 : 1,
                transform: isLoading ? 'scale(0.98)' : 'scale(1)',
                transition: 'all 0.3s ease',
                pointerEvents: isLoading ? 'none' : 'auto'
            }}>
                {/* Name */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="name" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500 }}>
                        <User size={16} /> Nombre Completo
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            autoComplete="name"
                            className="input-glass"
                            style={{ borderColor: touched.name && !hasName ? 'rgba(239, 68, 68, 0.5)' : undefined }}
                            placeholder="Juan Pérez"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                            required
                        />
                        {touched.name && !hasName && (
                            <div style={{ position: 'absolute', right: '10px', top: '12px', color: '#f87171' }}>
                                <AlertCircle size={18} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Email */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="email" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500 }}>
                        <Mail size={16} /> Correo Electrónico
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            className="input-glass"
                            style={{ borderColor: touched.email && !isValidEmail(email) ? 'rgba(239, 68, 68, 0.5)' : undefined }}
                            placeholder="usuario@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                            required
                        />
                        {touched.email && !isValidEmail(email) && (
                            <div style={{ position: 'absolute', right: '10px', top: '12px', color: '#f87171' }}>
                                <AlertCircle size={18} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Password */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="password" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500 }}>
                        <Lock size={16} /> Contraseña
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            autoComplete="new-password"
                            className="input-glass"
                            style={{
                                borderColor: touched.password && !hasPassword ? 'rgba(239, 68, 68, 0.5)' : undefined,
                                paddingRight: '45px'
                            }}
                            placeholder="Mínimo 6 caracteres"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#94a3b8',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'color 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#818cf8'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="confirmPassword" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500 }}>
                        <Lock size={16} /> Confirmar Contraseña
                    </label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            autoComplete="new-password"
                            className="input-glass"
                            style={{
                                borderColor: touched.confirm && !matchPassword ? 'rgba(239, 68, 68, 0.5)' : undefined,
                                paddingRight: '45px'
                            }}
                            placeholder="Repite tu contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={() => setTouched(prev => ({ ...prev, confirm: true }))}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#94a3b8',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'color 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#818cf8'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {touched.confirm && !matchPassword && <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.25rem' }}>No coinciden</p>}
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
                        opacity: isLoading ? 0.8 : 1
                    }}
                >
                    {isLoading ? 'Registrando...' : (
                        <>
                            Crear Cuenta <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </form>

            <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.95rem', color: 'var(--secondary)' }}>
                ¿Ya tienes cuenta? <Link href="/" style={{ color: '#818cf8', textDecoration: 'none', fontWeight: 600, marginLeft: '0.5rem' }}>Iniciar Sesión</Link>
            </div>
        </motion.div >
    );
};
