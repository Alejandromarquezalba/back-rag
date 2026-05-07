import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { SupabaseService } from '../supabase.service';

@Module({
    controllers: [ChatController],
    providers: [SupabaseService],
})
export class ChatModule {}