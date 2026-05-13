import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';

@Injectable()
export class IaService {
    private groq: Groq;

    constructor() {
        this.groq = new Groq({
        apiKey: process.env.GROQ_API_KEY,
        });
    }

    async extraerKeywords(mensaje: string): Promise<string[]> {
        const completion = await this.groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
            {
            role: 'user',
            content: `
                Eres un asistente de farmacia. El usuario escribió este mensaje:
                "${mensaje}"
                
                Extraé las palabras clave relacionadas a síntomas, enfermedades o medicamentos.
                Respondé ÚNICAMENTE con un array JSON de strings, sin explicaciones, sin texto extra.
                Ejemplo: ["paracetamol", "dolor de cabeza", "fiebre"]
            `,
            },
        ],
        });

        const texto = completion.choices[0].message.content ?? '[]';

        try {
        const limpio = texto.replace(/```json|```/g, '').trim();
        return JSON.parse(limpio);
        } catch {
        return [mensaje];
        }
    }

    async generarRespuesta(mensajeUsuario: string, productos: any[]): Promise<string> {
        if (productos.length === 0) {
        return `Lo siento, no encontré productos relacionados con tu consulta. ¿Podés darme más detalles o intentar con otro término?`;
        }

        const completion = await this.groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
            {
            role: 'user',
            content: `
                Eres un farmacéutico virtual llamado "Asistente Farma", amable, educado y conciso.
                El usuario necesita ayuda con su consulta.
                
                **Consulta del usuario:**
                "${mensajeUsuario}"
                
                **Lista de productos disponibles (en formato JSON):**
                ${JSON.stringify(productos)}
                
                **Instrucciones:**
                1. Responde SOLO usando los productos de la lista.
                2. Menciona los nombres y PRECIOS exactos.
                3. Ofrece ayuda adicional (Ej: "¿Necesita que le prepare el pedido?").
                4. Responde en español, como si estuvieras en una farmacia.
            `,
            },
        ],
        });

        return completion.choices[0].message.content ?? 'No pude generar una respuesta.';
    }
}