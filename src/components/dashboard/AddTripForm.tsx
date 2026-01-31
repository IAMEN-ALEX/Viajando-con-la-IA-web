'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import styles from '@/app/dashboard/dashboard.module.css';
import { DestinationDropdown } from '@/components/DestinationDropdown';
import { DatePicker } from '@/components/ui/DatePicker';
import { Trip } from '@/types';

interface AddTripFormProps {
    userId: string;
    onTripAdded: (tripData: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>) => Promise<any> | void;
}

export const AddTripForm = ({ userId, onTripAdded }: AddTripFormProps) => {
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    const destinationOptions = [
        { value: 'Alemania', label: 'Alemania', emoji: '🇩🇪' },
        { value: 'Argentina', label: 'Argentina', emoji: '🇦🇷' },
        { value: 'Brasil', label: 'Brasil', emoji: '🇧🇷' },
        { value: 'Canadá', label: 'Canadá', emoji: '🇨🇦' },
        { value: 'Chile', label: 'Chile', emoji: '🇨🇱' },
        { value: 'China', label: 'China', emoji: '🇨🇳' },
        { value: 'Colombia', label: 'Colombia', emoji: '🇨🇴' },
        { value: 'Corea del Sur', label: 'Corea del Sur', emoji: '🇰🇷' },
        { value: 'España', label: 'España', emoji: '🇪🇸' },
        { value: 'Estados Unidos', label: 'Estados Unidos', emoji: '🇺🇸' },
        { value: 'Francia', label: 'Francia', emoji: '🇫🇷' },
        { value: 'Grecia', label: 'Grecia', emoji: '🇬🇷' },
        { value: 'India', label: 'India', emoji: '🇮🇳' },
        { value: 'Italia', label: 'Italia', emoji: '🇮🇹' },
        { value: 'Japón', label: 'Japón', emoji: '🇯🇵' },
        { value: 'México', label: 'México', emoji: '🇲🇽' },
        { value: 'Perú', label: 'Perú', emoji: '🇵🇪' },
        { value: 'Portugal', label: 'Portugal', emoji: '🇵🇹' },
        { value: 'Reino Unido', label: 'Reino Unido', emoji: '🇬🇧' },
        { value: 'Tailandia', label: 'Tailandia', emoji: '🇹🇭' },
        { value: 'Turquía', label: 'Turquía', emoji: '🇹🇷' },
        { value: 'Uruguay', label: 'Uruguay', emoji: '🇺🇾' },
    ];

    const handleAddTrip = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!destination || !startDate || !endDate || !userId) return;

        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');

        // Delegate creation to parent (hook)
        try {
            await onTripAdded({
                userId,
                destination,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                notes: [] // Init empty notes
            } as any);
            // Reset form
            setDestination('');
            setStartDate(undefined);
            setEndDate(undefined);
        } catch (error) {
            console.error('Error adding trip:', error);
        }
    };

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Agrega un Viaje</h2>
            <form onSubmit={handleAddTrip}>
                <div className={styles.inputGroup}>
                    <DestinationDropdown
                        value={destination}
                        onChange={setDestination}
                        options={destinationOptions}
                        placeholder="Seleccionar Destino"
                    />
                </div>
                <div className={styles.tripFormRow}>
                    <div className="w-full">
                        <DatePicker
                            date={startDate}
                            setDate={setStartDate}
                            placeholder="Fecha Inicio"
                        />
                    </div>
                    <div className="w-full">
                        <DatePicker
                            date={endDate}
                            setDate={setEndDate}
                            placeholder="Fecha Fin"
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className={styles.btnPrimary}
                    >
                        Agregar Viaje
                    </motion.button>
                </div>
            </form>
        </section>
    );
};
