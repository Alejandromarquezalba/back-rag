import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { SupabaseService } from '../supabase.service';
import { IaService } from '../ia/ia.service';

@Module({
    controllers: [ChatController],
    providers: [SupabaseService, IaService],
})
export class ChatModule {}