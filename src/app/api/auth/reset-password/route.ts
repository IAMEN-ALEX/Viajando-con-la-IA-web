import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json(
                { message: 'Token y contraseña son requeridos' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { message: 'La contraseña debe tener al menos 6 caracteres' },
                { status: 400 }
            );
        }

        // Find user with valid token
        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: {
                    gt: new Date() // Token must not be expired
                }
            }
        });

        if (!user) {
            return NextResponse.json(
                { message: 'Token inválido o expirado' },
                { status: 400 }
            );
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password and clear reset token
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null
            }
        });

        console.log(`Password successfully reset for user: ${user.email}`);

        return NextResponse.json({
            message: 'Contraseña actualizada exitosamente'
        });

    } catch (error) {
        console.error('Error in reset-password:', error);
        return NextResponse.json(
            { message: 'Error al restablecer la contraseña' },
            { status: 500 }
        );
    }
}
