import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        // Basic validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: 'Faltan campos requeridos' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { message: 'La contraseña debe tener al menos 6 caracteres' },
                { status: 400 }
            );
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: 'El correo electrónico ya está registrado' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await hash(password, 12);

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        // Return success without setting auth cookie
        // User must login manually after registration
        return NextResponse.json(
            { message: 'Usuario creado exitosamente', user: { id: user.id, email: user.email, name: user.name } },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { message: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
