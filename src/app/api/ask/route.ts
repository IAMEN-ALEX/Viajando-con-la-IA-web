import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
    try {
        const { question, trips } = await req.json();
        const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

        console.log('[API] Using provider: Google Gemini');
        console.log(`[API] API Key present: ${!!apiKey}`);

        if (!apiKey) {
            return NextResponse.json(
                { response: 'Error: API Key de Google Gemini no configurada. Obtén una gratis en https://aistudio.google.com/app/apikey' },
                { status: 500 }
            );
        }

        const context = JSON.stringify(trips, null, 2);

        const systemPrompt = `
        Actúa como un asistente de viajes personal experto y amable.
        Tienes acceso a la siguiente información sobre los viajes del usuario:
        ${context}

        Instrucciones:
        1. Si la respuesta se encuentra en las notas o detalles de los viajes, responde específicamente basándote en esa información.
        2. Si la pregunta es sobre un destino que está en la lista pero no hay notas específicas, ofrece recomendaciones generales turísticas para ese lugar.
        3. Si la pregunta no tiene relación con los viajes listados, responde amablemente de forma general o pide aclarar el contexto.
        4. Mantén un tono entusiasta y aventurero.
        5. Responde siempre en Español.
        `;

        // Initialize Google Gemini
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

        // Combine system prompt with user question
        const fullPrompt = `${systemPrompt}\n\nPregunta del usuario: ${question}`;

        // Generate response
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();

        if (!text) {
            throw new Error('No se recibió respuesta del modelo');
        }

        console.log('[API] Response generated successfully');
        return NextResponse.json({ response: text });

    } catch (error) {
        console.error('Error in AI API:', error);
        const errorMessage = error instanceof Error ? error.message : String(error);

        return NextResponse.json(
            { response: `Error del asistente: ${errorMessage}` },
            { status: 500 }
        );
    }
}
