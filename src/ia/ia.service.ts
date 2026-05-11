import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class IaService {
    private genAI: GoogleGenerativeAI;

    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }

    async generarRespuesta(mensajeUsuario: string, productos: any[]): Promise<string> {
        if (productos.length === 0) {
            return `Lo siento, no encontré ningún producto relacionado con "${mensajeUsuario}". ¿Podría intentar con otro nombre?`;
        }

        const prompt = `
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
        `;

        const model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        return result.response.text();
    }
}