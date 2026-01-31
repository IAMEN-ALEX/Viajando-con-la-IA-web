'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (userData: User) => void;
    register: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (e) {
                    console.error("Auth context error", e);
                    localStorage.removeItem('user');
                }
            }
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    const login = (userData: User) => {
        // Use startTransition for instant, non-blocking state update
        React.startTransition(() => {
            setUser(userData);
        });
        localStorage.setItem('user', JSON.stringify(userData));
        // Use push instead of replace for faster navigation
        router.push('/dashboard');
    };

    const register = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        router.replace('/dashboard');
    };

    const logout = async () => {
        try {
            // Call server to delete the HttpOnly cookie
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (error) {
            console.error('Logout API error:', error);
        }

        // Clear client-side state
        setUser(null);
        localStorage.removeItem('user');

        // Clean up other keys
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('cached_trips_') || key.startsWith('onboarding_seen_')) {
                localStorage.removeItem(key);
            }
        });

        // Hard redirect to ensure clean state (after cookie is deleted)
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isAuthenticated: !!user,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
