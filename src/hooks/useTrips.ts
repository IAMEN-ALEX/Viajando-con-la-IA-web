import { useState, useCallback } from 'react';
import { Trip } from '@/types';
import { tripService } from '@/services/tripService';

export const useTrips = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTrips = useCallback(async (userId: string) => {
        console.log('[CLIENT_DEBUG] fetchTrips called with:', userId);
        // Try to load from cache first for instant feel
        const cached = localStorage.getItem(`cached_trips_${userId}`);
        if (cached) {
            setTrips(JSON.parse(cached));
        } else {
            setIsLoading(true);
        }

        setError(null);
        try {
            const data = await tripService.getTrips(userId);
            setTrips(data);
            // Update cache
            localStorage.setItem(`cached_trips_${userId}`, JSON.stringify(data));
        } catch (err) {
            setError('Error al cargar viajes');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addTrip = useCallback(async (tripData: Partial<Trip> & { userId: string }) => {
        // Optimistic update could go here, but for now we wait for server response
        try {
            const newTrip = await tripService.createTrip(tripData);
            setTrips(prev => [newTrip, ...prev]);
            return newTrip;
        } catch (err) {
            setError('Error al crear viaje');
            console.error(err);
            throw err;
        }
    }, []);

    const deleteTrip = useCallback(async (tripId: string) => {
        try {
            // Optimistic update
            setTrips(prev => prev.filter(t => t.id !== tripId));
            await tripService.deleteTrip(tripId);
        } catch (err) {
            // Rollback if needed, but for simple MVP re-fetch or alert is fine
            setError('Error al eliminar viaje');
            console.error(err);
            // Optionally fetchTrips(userId) to rollback
        }
    }, []);

    const updateTrip = useCallback(async (updatedTrip: Trip) => {
        try {
            setTrips(prev => prev.map(t => t.id === updatedTrip.id ? updatedTrip : t));
            await tripService.updateTrip(updatedTrip);
        } catch (err) {
            setError('Error al actualizar viaje');
            console.error(err);
        }
    }, []);

    return {
        trips,
        isLoading,
        error,
        fetchTrips,
        addTrip,
        deleteTrip,
        updateTrip,
        setTrips // Exposed for manual updates if really needed
    };
};
