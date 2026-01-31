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

        await prisma.note.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Nota eliminada' });
    } catch (error) {
        console.error('Delete note error:', error);
        return NextResponse.json({ message: 'Error al eliminar nota' }, { status: 500 });
    }
}
