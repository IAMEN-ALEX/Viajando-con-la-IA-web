import { Skeleton } from "@/components/ui/Skeleton"
import styles from '@/app/dashboard/dashboard.module.css';
import { motion } from 'framer-motion';

export function DashboardSkeleton() {
    return (
        <div className={styles.dashboardBg}>
            {/* Fake GridScan placeholder */}
            <div className="fixed inset-0 bg-black z-0" />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                style={{ position: 'relative', zIndex: 1, padding: '2rem' }}
            >
                {/* Header Skeleton */}
                <div className={styles.header}>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-10 w-24" />
                </div>

                <div className={styles.container}>
                    {/* AI Section Skeleton */}
                    <div className={styles.section}>
                        <Skeleton className="h-8 w-3/4 mb-4" />
                        <div className="flex gap-4">
                            <Skeleton className="h-12 w-full" />
                        </div>
                        <Skeleton className="h-10 w-32 mt-4" />
                    </div>

                    {/* Add Trip Form Skeleton */}
                    <div className={styles.section}>
                        <Skeleton className="h-8 w-48 mb-4" />
                        <div className="flex flex-col md:flex-row gap-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-32" />
                        </div>
                    </div>

                    {/* Trip List Skeleton */}
                    <div className={styles.tripListContainer}>
                        {[1, 2].map((i) => (
                            <div key={i} className={styles.tripCard}>
                                <div className="flex justify-between items-center mb-4">
                                    <Skeleton className="h-6 w-32" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-8 w-24" />
                                        <Skeleton className="h-8 w-24" />
                                    </div>
                                </div>
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-10 w-32 mt-4" />
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
