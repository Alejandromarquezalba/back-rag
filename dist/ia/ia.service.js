"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IaService = void 0;
const common_1 = require("@nestjs/common");
const groq_sdk_1 = require("groq-sdk");
let IaService = class IaService {
    constructor() {
        this.groq = new groq_sdk_1.default({
            apiKey: process.env.GROQ_API_KEY,
        });
    }
    async extraerKeywords(mensaje) {
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
        }
        catch {
            return [mensaje];
        }
    }
    async generarRespuesta(mensajeUsuario, productos) {
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
                2. Menciona el nombre, precio y si requiere receta médica.
                3. Si el producto requiere receta, aclaralo siempre.
                4. Ofrece ayuda adicional.
                5. Responde en español, como si estuvieras en una farmacia.
                6. Siempre recomendá consultar con un médico antes de tomar cualquier medicamento.
                `,
                },
            ],
        });
        return completion.choices[0].message.content ?? 'No pude generar una respuesta.';
    }
};
exports.IaService = IaService;
exports.IaService = IaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], IaService);
//# sourceMappingURL=ia.service.js.map