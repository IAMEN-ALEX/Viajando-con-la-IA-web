'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export const LoginForm = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState({ email: false, password: false });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Validation States
    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
    const showEmailError = touched.email && !isValidEmail(email);
    const showPasswordError = touched.password && password.length < 6;

    useEffect(() => {
        // Aggressive prefetching for critical paths
        router.prefetch('/dashboard');
        router.prefetch('/register');

        // Preload Onboarding Images in background
        const preloadImages = [
            '/dashboard-viajes.png',
            '/dashboard-viajes-2.png',
            '/globe.svg'
        ];
        preloadImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        // Preload Onboarding components eagerly
        import('@/components/Onboarding');
        import('@/components/Iridescence');
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Trigger validation on all fields
        setTouched({ email: true, password: true });

        if (!isValidEmail(email) || password.length < 6) {
            setError('Por favor revisa los campos marcados.');
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Error al iniciar sesión');
                setIsLoading(false);
                return;
            }

            // Use Context for proper state update and redirection
            login(data.user);

        } catch (err) {
            console.error(err);
            setError('Ocurrió un error inesperado');
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
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
                <h1 className="gradient-text" style={{ fontSize: '2.8rem', margin: '0 0 0.5rem 0' }}>Viajando con la IA</h1>
            </div>

            <form onSubmit={handleLogin} style={{
                opacity: isLoading ? 0.9 : 1,
                transform: isLoading ? 'scale(0.99)' : 'scale(1)',
                transition: 'all 0.2s ease',
                pointerEvents: isLoading ? 'none' : 'auto'
            }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="email" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500 }}>
                        <Mail size={16} /> Correo Electrónico
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            className={`input-glass ${showEmailError ? 'border-red-500/50 bg-red-500/10' : ''}`}
                            style={{
                                borderColor: showEmailError ? 'rgba(239, 68, 68, 0.5)' : undefined
                            }}
                            placeholder="usuario@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
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
                    {showEmailError && <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.25rem', marginLeft: '0.2rem' }}>Correo inválido</p>}
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                    <label htmlFor="password" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500 }}>
                        <Lock size={16} /> Contraseña
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            className="input-glass"
                            style={{
                                borderColor: showPasswordError ? 'rgba(239, 68, 68, 0.5)' : undefined,
                                paddingRight: '45px'
                            }}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                            required
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
                    {showPasswordError && <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.25rem', marginLeft: '0.2rem' }}>Mínimo 6 caracteres</p>}
                    <div style={{ marginTop: '0.5rem', textAlign: 'right' }}>
                        <Link
                            href="/forgot-password"
                            style={{
                                color: '#818cf8',
                                textDecoration: 'none',
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                transition: 'color 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#a5b4fc'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#818cf8'}
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
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
                        opacity: isLoading ? 1 : 1, // Keep fully visible
                        cursor: isLoading ? 'progress' : 'pointer'
                    }}
                >
                    {isLoading ? (
                        <>
                            <span className="animate-pulse">Iniciando...</span>
                        </>
                    ) : (
                        <>
                            Iniciar Sesión <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </form>

            <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.95rem', color: 'var(--secondary)' }}>
                ¿No tienes cuenta?{' '}
                <Link
                    href="/register"
                    prefetch={true}
                    style={{
                        color: '#818cf8',
                        textDecoration: 'none',
                        fontWeight: 600,
                        marginLeft: '0.5rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        background: 'rgba(129, 140, 248, 0.1)',
                        border: '1px solid rgba(129, 140, 248, 0.2)',
                        display: 'inline-block',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(129, 140, 248, 0.2)';
                        e.currentTarget.style.borderColor = 'rgba(129, 140, 248, 0.4)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(129, 140, 248, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(129, 140, 248, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(129, 140, 248, 0.2)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    Regístrate
                </Link>
            </div>
        </motion.div>
    );
};
