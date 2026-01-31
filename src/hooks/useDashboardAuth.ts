import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';

export const useDashboardAuth = () => {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');

    // Use useLayoutEffect to prevent flash of skeleton if data is already present
    // Using simple useEffect on server, useLayoutEffect on client
    const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

    useIsomorphicLayoutEffect(() => {
        const checkUser = () => {
            const storedUser = localStorage.getItem('user');

            if (!storedUser) {
                router.replace('/');
                return;
            }

            try {
                const user = JSON.parse(storedUser);
                // Batch updates for fewer renders
                React.startTransition(() => {
                    setUsername(user.name);
                    setUserId(user.id);
                    setShowOnboarding(true);
                    setIsChecking(false);
                });
            } catch (e) {
                console.error("Session corrupted", e);
                localStorage.removeItem('user');
                router.replace('/');
            }
        };

        checkUser();
    }, [router]);

    const handleLogout = useCallback(() => {
        // Clear session immediately
        localStorage.removeItem('user');
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('cached_trips_') || key.startsWith('onboarding_seen_')) {
                localStorage.removeItem(key);
            }
        });

        // FORCE reload/navigation. This kills the current React tree instantly
        // and avoids any "hanging" during unmount of heavy components.
        window.location.href = '/';
    }, []);

    const handleOnboardingComplete = useCallback(() => {
        setShowOnboarding(false);
        if (userId) {
            localStorage.setItem(`onboarding_seen_${userId}`, 'true');
        }
    }, [userId]);

    return {
        isChecking,
        showOnboarding,
        username,
        userId,
        handleLogout,
        handleOnboardingComplete
    };
};
