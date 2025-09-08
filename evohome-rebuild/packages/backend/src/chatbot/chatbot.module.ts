import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({ controllers:[ChatbotController], providers:[ChatbotService, PrismaService] })
export class ChatbotModule {}
