'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export function OnboardingPreloader() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }}>
            <Image
                src="/dashboard-viajes.png"
                alt="preload"
                width={1100}
                height={800}
                priority
            />
            <Image
                src="/dashboard-viajes-2.png"
                alt="preload"
                width={1100}
                height={800}
                priority
            />
        </div>
    );
}
