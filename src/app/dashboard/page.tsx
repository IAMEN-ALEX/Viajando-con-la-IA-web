'use client';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './dashboard.module.css';

// Hooks
// Hooks
import { useTrips } from '@/hooks/useTrips';
// import { useDashboardAuth } from '@/hooks/useDashboardAuth';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

// Components
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { AIQuerySection } from '@/components/dashboard/AIQuerySection';
import { AddTripForm } from '@/components/dashboard/AddTripForm';
import { TripList } from '@/components/dashboard/TripList';
import Onboarding from '@/components/Onboarding';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';

// Dynamic Import
// Dynamic Import with intentional delay
const GridScan = dynamic(() => import('@/components/GridScan').then(mod => mod.GridScan), {
    ssr: false,
});

export default function DashboardPage() {
    const { user, logout, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    // Local state for onboarding (could also be in context, but keeping local for now)
    const [showOnboarding, setShowOnboarding] = React.useState(true);

    // Effect to handle protection and onboarding check
    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.replace('/');
            } else if (user) {
                // Instant onboarding display using startTransition
                React.startTransition(() => {
                    setShowOnboarding(true);
                });
            }
        }
    }, [isLoading, isAuthenticated, user, router]);

    const handleOnboardingComplete = () => {
        setShowOnboarding(false);
        // if (user) localStorage.setItem(`onboarding_seen_${user.id}`, 'true'); 
    };

    // Derived values for compatibility
    const username = user?.name || '';
    const userId = user?.id || '';

    const {
        trips,
        fetchTrips,
        addTrip,
        deleteTrip,
        updateTrip
    } = useTrips();

    const [shouldLoadBg, setShouldLoadBg] = React.useState(false);

    useEffect(() => {
        // Delay background heavy load to prioritize interactivity
        const timer = setTimeout(() => setShouldLoadBg(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Fetch trips once user is identified
    useEffect(() => {
        if (userId) {
            fetchTrips(userId);
        }
    }, [userId, fetchTrips]);

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    return (
        <div className={styles.dashboardBg}>
            <AnimatePresence>
                {showOnboarding && (
                    <div style={{ position: 'relative', zIndex: 50 }}>
                        <Onboarding key="onboarding" onComplete={handleOnboardingComplete} />
                    </div>
                )}
            </AnimatePresence>

            {/* Dashboard Content - Always Rendered but non-interactive during onboarding */}
            <div style={{ pointerEvents: showOnboarding ? 'none' : 'auto' }}>
                {/* GridScan Background Effect */}
                {shouldLoadBg && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 0,
                        pointerEvents: 'none',
                        opacity: 0,
                        animation: 'fadeInGrid 1s ease-in-out forwards',
                        contentVisibility: 'auto',
                        willChange: 'opacity'
                    }}>
                        <style jsx>{`
                                @keyframes fadeInGrid {
                                    from { opacity: 0; }
                                    to { opacity: 1; }
                                }
                            `}</style>
                        <GridScan
                            sensitivity={0.6}
                            lineThickness={1.0}
                            linesColor="#2a1f3d"
                            gridScale={0.1}
                            scanColor="#00d9ff"
                            scanOpacity={0.65}
                            lineJitter={0.06}
                            scanGlow={0.5}
                            scanSoftness={3.0}
                            scanDuration={1.8}
                            scanDelay={-0.3}
                            enablePost={true}
                            bloomIntensity={1.0}
                            chromaticAberration={0.001}
                            noiseIntensity={0.005}
                            enableWebcam={false}
                            showPreview={false}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ position: 'relative', zIndex: 1 }}
                >
                    {/* Animated light streaks */}
                    <div className={styles.lightStreak1}></div>
                    <div className={styles.lightStreak2}></div>

                    <DashboardHeader username={username} onLogout={logout} />

                    <div className={styles.container}>
                        <AIQuerySection trips={trips} />

                        <AddTripForm userId={userId} onTripAdded={(newTrip) => addTrip({ ...newTrip } as any)} />

                        <TripList
                            trips={trips}
                            onDeleteTrip={deleteTrip}
                            onUpdateTrip={updateTrip}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
