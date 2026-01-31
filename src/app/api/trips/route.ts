import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        console.log('[API_DEBUG] GET /api/trips Request:', { userId });

        if (!userId) {
            console.error('[API_DEBUG] Missing userId');
            return NextResponse.json(
                { message: 'Usuario no identificado' },
                { status: 400 }
            );
        }

        const trips = await prisma.trip.findMany({
            where: { userId },
            include: {
                notes: {
                    orderBy: { createdAt: 'desc' }
                }
            },
            orderBy: { createdAt: 'desc' },
        });

        // Format for frontend
        const formattedTrips = trips.map((trip: any) => ({
            id: trip.id,
            destination: trip.destination,
            startDate: trip.startDate, // Assuming stored as string per schema/frontend
            endDate: trip.endDate,
            notes: trip.notes.map((n: any) => ({ id: n.id, content: n.content })), // Send objects or strings? Frontend expects strings currently, will need adaptation
        }));

        return NextResponse.json({ trips: formattedTrips });
    } catch (error) {
        console.error('Fetch trips error:', error);
        return NextResponse.json({ message: 'Error al obtener viajes' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { userId, destination, startDate, endDate } = await req.json();

        if (!userId || !destination || !startDate || !endDate) {
            return NextResponse.json({ message: 'Faltan datos' }, { status: 400 });
        }

        const trip = await prisma.trip.create({
            data: {
                userId,
                destination,
                startDate,
                endDate,
            },
            include: { notes: true }
        });

        return NextResponse.json({
            trip: {
                id: trip.id,
                destination: trip.destination,
                startDate: trip.startDate,
                endDate: trip.endDate,
                notes: []
            }
        });
    } catch (error) {
        console.error('Create trip error:', error);
        return NextResponse.json({ message: 'Error al crear viaje' }, { status: 500 });
    }
}
