import { Trip } from '@/types';

export const tripService = {
    async getTrips(userId: string): Promise<Trip[]> {
        const res = await fetch(`/api/trips?userId=${userId}`);
        if (!res.ok) throw new Error('Failed to fetch trips');
        const data = await res.json();
        return data.trips;
    },

    async createTrip(tripData: Partial<Trip> & { userId: string }): Promise<Trip> {
        const res = await fetch('/api/trips', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tripData),
        });
        if (!res.ok) throw new Error('Failed to create trip');
        const data = await res.json();
        return data.trip;
    },

    async deleteTrip(tripId: string): Promise<void> {
        const res = await fetch(`/api/trips/${tripId}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete trip');
    },

    async updateTrip(trip: Trip): Promise<Trip> {
        const res = await fetch(`/api/trips/${trip.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(trip),
        });
        if (!res.ok) throw new Error('Failed to update trip');
        const data = await res.json();
        return data.trip;
    }
};
