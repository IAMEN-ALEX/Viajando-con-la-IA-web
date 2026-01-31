import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ message: 'ID requerido' }, { status: 400 });
        }

        await prisma.trip.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Viaje eliminado' });
    } catch (error) {
        console.error('Delete trip error:', error);
        return NextResponse.json({ message: 'Error al eliminar viaje' }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json(); // receive the full trip object

        if (!id) {
            return NextResponse.json({ message: 'ID requerido' }, { status: 400 });
        }

        // Update Trip fields
        const updatedTrip = await prisma.trip.update({
            where: { id },
            data: {
                destination: body.destination,
                startDate: body.startDate,
                endDate: body.endDate,
            },
            include: { notes: true } // Return updated notes
        });

        // Handle Note updates if present
        // Since the UI sends the whole trip with potentially modified note content,
        // we iterate and update them. This is inefficient but supports the strict "Whole Trip Update" interface.
        if (body.notes && Array.isArray(body.notes)) {
            await Promise.all(body.notes.map((note: any) =>
                prisma.note.update({
                    where: { id: note.id },
                    data: { content: note.content }
                }).catch(e => console.warn(`Skipping note update for ${note.id}`, e))
                // Catch errors for individual notes (e.g. if deleted concurrently) to not fail the whole request
            ));
        }

        // Re-fetch to get the absolutely latest state including the just-updated notes
        const finalTrip = await prisma.trip.findUnique({
            where: { id },
            include: { notes: { orderBy: { createdAt: 'desc' } } }
        });

        return NextResponse.json({ trip: finalTrip });
    } catch (error) {
        console.error('Update trip error:', error);
        return NextResponse.json({ message: 'Error al actualizar viaje' }, { status: 500 });
    }
}
