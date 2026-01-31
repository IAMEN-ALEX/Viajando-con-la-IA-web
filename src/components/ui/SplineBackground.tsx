'use client';
import { useEffect, useRef, useState, memo } from 'react';
import dynamic from 'next/dynamic';

// Load Spline with SSR disabled and priority set to false for faster initial load
const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: () => <div className="spline-loading-placeholder" />
});

const SplineBackgroundComponent = () => {
    const [splineLoaded, setSplineLoaded] = useState(false);
    const [shouldLoadSpline, setShouldLoadSpline] = useState(false);
    const splineBgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Add loaded class to body for enhanced background after initial paint
        const timer = setTimeout(() => {
            document.body.classList.add('loaded');
            // Load Spline later to prioritize interactivity
            setShouldLoadSpline(true);
        }, 1500); // Increased delay for better perceived performance

        const handleMouseMove = (e: MouseEvent) => {
            // Set CSS variables for high-performance parallax
            const x = (e.clientX / window.innerWidth - 0.5) * 60;
            const y = (e.clientY / window.innerHeight - 0.5) * 60;
            document.documentElement.style.setProperty('--mouse-x', x.toString());
            document.documentElement.style.setProperty('--mouse-y', y.toString());

            // Add animating class for will-change optimization
            if (splineBgRef.current) {
                splineBgRef.current.classList.add('animating');
            }
        };

        const handleMouseStop = () => {
            // Remove animating class when mouse stops
            if (splineBgRef.current) {
                splineBgRef.current.classList.remove('animating');
            }
        };

        let mouseStopTimer: NodeJS.Timeout;
        const optimizedMouseMove = (e: MouseEvent) => {
            handleMouseMove(e);
            clearTimeout(mouseStopTimer);
            mouseStopTimer = setTimeout(handleMouseStop, 150);
        };

        window.addEventListener('mousemove', optimizedMouseMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', optimizedMouseMove);
            clearTimeout(timer);
            clearTimeout(mouseStopTimer);
        };
    }, []);

    return (
        <div
            ref={splineBgRef}
            className="spline-bg"
            style={{
                opacity: splineLoaded ? 1 : 0,
                transition: 'opacity 0.6s ease'
            }}
        >
            {shouldLoadSpline && (
                <Spline
                    scene="https://prod.spline.design/qwqHygUrUVT0VOKb/scene.splinecode"
                    onLoad={() => setSplineLoaded(true)}
                />
            )}
        </div>
    );
};

export const SplineBackground = memo(SplineBackgroundComponent);
