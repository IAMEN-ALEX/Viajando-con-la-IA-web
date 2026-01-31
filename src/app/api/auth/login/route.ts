import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: 'Faltan credenciales' },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { message: 'Credenciales inválidas' },
                { status: 401 }
            );
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: 'Credenciales inválidas' },
                { status: 401 }
            );
        }

        // Return user info (excluding password)
        const response = NextResponse.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

        // Set HTTP-only cookie for middleware protection
        response.cookies.set('auth-token', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        return response;
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: error?.message || 'Error interno del servidor', error: String(error) },
            { status: 500 }
        );
    }
}
