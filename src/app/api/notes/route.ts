import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { tripId, content } = await req.json();

        if (!tripId || !content) {
            return NextResponse.json({ message: 'Faltan datos' }, { status: 400 });
        }

        const note = await prisma.note.create({
            data: {
                tripId,
                content,
            },
        });

        return NextResponse.json({ note });
    } catch (error) {
        console.error('Create note error:', error);
        return NextResponse.json({ message: 'Error al crear nota' }, { status: 500 });
    }
}
