export declare class IaService {
    private groq;
    constructor();
    extraerKeywords(mensaje: string): Promise<string[]>;
    generarRespuesta(mensajeUsuario: string, productos: any[]): Promise<string>;
}
