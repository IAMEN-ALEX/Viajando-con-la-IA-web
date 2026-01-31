'use client';
import { useSearchParams } from 'next/navigation';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { Suspense } from 'react';

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    if (!token) {
        return (
            <div className="glass-ultra" style={{ padding: '3rem', textAlign: 'center', maxWidth: '480px' }}>
                <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                    Token Inválido
                </h2>
                <p style={{ color: '#94a3b8' }}>
                    El enlace de recuperación no es válido o ha expirado.
                </p>
            </div>
        );
    }

    return <ResetPasswordForm token={token} />;
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="glass-ultra" style={{ padding: '3rem', textAlign: 'center', maxWidth: '480px' }}>
                <div className="animate-pulse" style={{ color: '#818cf8' }}>Cargando...</div>
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
    );
}
