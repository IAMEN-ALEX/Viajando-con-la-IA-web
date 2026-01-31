import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: 'El correo es requerido' },
                { status: 400 }
            );
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email }
        });

        // Always return success to prevent email enumeration attacks
        // But only send email if user exists
        if (user) {
            // Generate secure random token
            const resetToken = crypto.randomBytes(32).toString('hex');
            const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

            // Save token to database
            await prisma.user.update({
                where: { email },
                data: {
                    resetToken,
                    resetTokenExpiry
                }
            });

            const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

            // Log for development
            console.log('='.repeat(80));
            console.log('PASSWORD RESET REQUEST');
            console.log('='.repeat(80));
            console.log(`Email: ${email}`);
            console.log(`Reset URL: ${resetUrl}`);
            console.log(`Token expires: ${resetTokenExpiry.toISOString()}`);
            console.log('='.repeat(80));

            // Send email with Resend
            try {
                await resend.emails.send({
                    from: 'Viajando con la IA <onboarding@resend.dev>', // Use your verified domain in production
                    to: email,
                    subject: 'Recuperación de Contraseña - Viajando con la IA',
                    html: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Recuperación de Contraseña</title>
                        </head>
                        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #000000;">
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td align="center" style="padding: 40px 0;">
                                        <table role="presentation" style="width: 600px; border-collapse: collapse; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(99, 102, 241, 0.3);">
                                            <!-- Header -->
                                            <tr>
                                                <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);">
                                                    <h1 style="margin: 0; font-size: 32px; font-weight: 800; background: linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                                                        Viajando con la IA
                                                    </h1>
                                                </td>
                                            </tr>
                                            
                                            <!-- Content -->
                                            <tr>
                                                <td style="padding: 40px; color: #e2e8f0;">
                                                    <h2 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 700; color: #f1f5f9;">
                                                        🔐 Recuperación de Contraseña
                                                    </h2>
                                                    
                                                    <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #cbd5e1;">
                                                        Hola <strong style="color: #818cf8;">${user.name}</strong>,
                                                    </p>
                                                    
                                                    <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #cbd5e1;">
                                                        Recibimos una solicitud para restablecer la contraseña de tu cuenta. Si no fuiste tú, puedes ignorar este correo de forma segura.
                                                    </p>
                                                    
                                                    <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #cbd5e1;">
                                                        Para crear una nueva contraseña, haz clic en el siguiente botón:
                                                    </p>
                                                    
                                                    <!-- Button -->
                                                    <table role="presentation" style="margin: 0 auto 30px auto;">
                                                        <tr>
                                                            <td style="border-radius: 12px; background: linear-gradient(135deg, #6366f1, #8b5cf6); box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);">
                                                                <a href="${resetUrl}" style="display: inline-block; padding: 16px 40px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 12px;">
                                                                    Restablecer Contraseña
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    
                                                    <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.6; color: #94a3b8;">
                                                        O copia y pega este enlace en tu navegador:
                                                    </p>
                                                    
                                                    <p style="margin: 0 0 30px 0; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; font-size: 13px; color: #818cf8; word-break: break-all; border: 1px solid rgba(129, 140, 248, 0.2);">
                                                        ${resetUrl}
                                                    </p>
                                                    
                                                    <div style="padding: 16px; background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; border-radius: 8px; margin-bottom: 20px;">
                                                        <p style="margin: 0; font-size: 14px; color: #fca5a5; line-height: 1.5;">
                                                            ⚠️ <strong>Importante:</strong> Este enlace expirará en <strong>1 hora</strong> por razones de seguridad.
                                                        </p>
                                                    </div>
                                                    
                                                    <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #94a3b8;">
                                                        Si no solicitaste este cambio, tu cuenta permanece segura y puedes ignorar este mensaje.
                                                    </p>
                                                </td>
                                            </tr>
                                            
                                            <!-- Footer -->
                                            <tr>
                                                <td style="padding: 30px 40px; background: rgba(0, 0, 0, 0.3); border-top: 1px solid rgba(255, 255, 255, 0.1);">
                                                    <p style="margin: 0 0 10px 0; font-size: 13px; color: #64748b; text-align: center;">
                                                        Este es un correo automático, por favor no respondas a este mensaje.
                                                    </p>
                                                    <p style="margin: 0; font-size: 13px; color: #475569; text-align: center;">
                                                        © ${new Date().getFullYear()} Viajando con la IA. Todos los derechos reservados.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </body>
                        </html>
                    `
                });

                console.log(`✅ Email sent successfully to ${email}`);
            } catch (emailError) {
                console.error('❌ Error sending email:', emailError);
                // Don't fail the request if email fails, just log it
                // In production, you might want to queue this for retry
            }
        }

        // Always return success message
        return NextResponse.json({
            message: 'Si el correo existe, recibirás un enlace de recuperación'
        });

    } catch (error) {
        console.error('Error in forgot-password:', error);
        return NextResponse.json(
            { message: 'Error al procesar la solicitud' },
            { status: 500 }
        );
    }
}
