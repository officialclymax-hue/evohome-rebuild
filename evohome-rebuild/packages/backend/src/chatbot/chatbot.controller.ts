import { Controller, Get } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private cb: ChatbotService) {}
  @Get('kb') kb(){ return this.cb.kb(); }
}
