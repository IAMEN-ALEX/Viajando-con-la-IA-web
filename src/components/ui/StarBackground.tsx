'use client';
import { useEffect, useState } from 'react';

export const StarBackground = () => {
    const [stars, setStars] = useState<{ id: number; style: React.CSSProperties }[]>([]);
    const [shootingStars, setShootingStars] = useState<{ id: number; style: React.CSSProperties }[]>([]);

    useEffect(() => {
        // Generate static twinkling stars
        const starCount = 100;
        const newStars = Array.from({ length: starCount }).map((_, i) => ({
            id: i,
            style: {
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`, // 1px to 3px
                height: `${Math.random() * 2 + 1}px`,
                opacity: Math.random() * 0.7 + 0.3,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: i % 10 === 0 ? '#a5f3fc' : '#ffffff', // 10% cyan stars
                borderRadius: '50%',
                position: 'absolute' as 'absolute',
            },
        }));
        setStars(newStars);

        // Generate shooting stars
        const shootingStarCount = 6;
        const newShootingStars = Array.from({ length: shootingStarCount }).map((_, i) => ({
            id: i,
            style: {
                top: `${Math.random() * 60 - 20}%`, // Start higher up, mostly top half
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`, // Varied delays for natural feel
                animationDuration: `${Math.random() * 1 + 0.6}s`, // Fast: 0.6s to 1.6s
            },
        }));
        setShootingStars(newShootingStars);

    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="animate-twinkle"
                    style={star.style}
                />
            ))}
            {shootingStars.map((star) => (
                <div
                    key={star.id}
                    className="shooting-star"
                    style={star.style}
                />
            ))}
        </div>
    );
};
