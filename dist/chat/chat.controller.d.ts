import { SupabaseService } from '../supabase.service';
import { IaService } from '../ia/ia.service';
export declare class ChatController {
    private supabase;
    private ia;
    constructor(supabase: SupabaseService, ia: IaService);
    preguntar(mensaje: string): Promise<{
        respuesta: string;
        productos: any[];
    }>;
}
