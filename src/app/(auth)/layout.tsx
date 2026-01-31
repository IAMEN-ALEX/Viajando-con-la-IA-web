import { SplineBackground } from '@/components/ui/SplineBackground';
import { StarBackground } from '@/components/ui/StarBackground';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: '#000'
        }}>
            {/* 3D Background Layer - Persistent across auth routes */}
            <SplineBackground />

            {/* Star Layer - Persistent across auth routes */}
            <StarBackground />

            {/* Page Content */}
            <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {children}
            </div>
        </div>
    );
}
