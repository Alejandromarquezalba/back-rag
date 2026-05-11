import { Controller, Post, Body } from '@nestjs/common';
import { SupabaseService } from '../supabase.service';
import { IaService } from '../ia/ia.service';

@Controller('chat')
export class ChatController {
    constructor(
        private supabase: SupabaseService,
        private ia: IaService
    ) {}

    @Post()
    async preguntar(@Body('mensaje') mensaje: string) {
        const productos = await this.supabase.buscarProductos(mensaje);
        const respuesta = await this.ia.generarRespuesta(mensaje, productos);
        return { respuesta, productos };
    }
}