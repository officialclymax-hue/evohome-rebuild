import { Body, Controller, Get, Post } from '@nestjs/common';
import { FormsService } from './forms.service';

@Controller('form-submissions')
export class FormsController {
  constructor(private svc: FormsService) {}
  @Post() create(@Body() b:any){ return this.svc.create(b); }
  @Get() list(){ return this.svc.list(); }
}
