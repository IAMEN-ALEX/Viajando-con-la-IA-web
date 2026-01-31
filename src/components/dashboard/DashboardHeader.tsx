import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from '@/app/dashboard/dashboard.module.css';

interface DashboardHeaderProps {
    username: string;
    onLogout: () => void;
}

export const DashboardHeader = ({ username, onLogout }: DashboardHeaderProps) => {
    // const [isLoggingOut, setIsLoggingOut] = useState(false); // Removed for instant feel

    const router = useRouter();

    const handleLogoutClick = () => {
        // Force immediate logout without extra states
        onLogout();
    };

    // Prefetch login/home page as soon as header mounts
    // useEffect(() => {
    //    router.prefetch('/');
    // }, [router]);

    return (
        <div className={styles.header}>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={styles.usernameDisplay}
            >
                Usuario: {username}
            </motion.div>
            <button
                onClick={onLogout}
                className={styles.logoutBtn}
                style={{ cursor: 'pointer', zIndex: 9999, position: 'relative' }}
            >
                Cerrar Sesión
            </button>
        </div>
    );
};
