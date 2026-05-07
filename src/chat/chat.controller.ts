import { Controller, Post, Body } from '@nestjs/common';
import { SupabaseService } from '../supabase.service';

@Controller('chat')
export class ChatController {
    constructor(private supabase: SupabaseService){}

    @Post()
        async preguntar(@Body('mensaje') mensaje: string) {
            const productos = await this.supabase.buscarProductos(mensaje)

            if (productos.length === 0) {
                return { respuesta: `No encontré productos relacionados con "${mensaje}".`, productos: [] };
            }



            return { respuesta: `Encontré estos productos relacionados con: ${mensaje}`, productos: productos };
        }
}