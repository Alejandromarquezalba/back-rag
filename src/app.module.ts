import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
//import { validate } from './config/env.validation';
import { AppController } from './app.controller';
import { SupabaseService } from './supabase.service';
import { ChatModule } from './chat/chat.module';
//import { AppService } from './app.service'; 



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //validate,
      envFilePath: '.env',
    }),
    ChatModule
  ],
  controllers: [AppController],
  providers: [SupabaseService],
})
export class AppModule {}