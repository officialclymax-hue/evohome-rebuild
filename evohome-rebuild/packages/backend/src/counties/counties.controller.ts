import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CountiesService } from './counties.service';

@Controller('counties')
export class CountiesController {
  constructor(private svc: CountiesService) {}
  @Get() all(){ return this.svc.findAll(); }
  @Get(':slug') one(@Param('slug') slug:string){ return this.svc.findOne(slug); }
  @Post() create(@Body() b:any){ return this.svc.create(b); }
  @Patch(':id') update(@Param('id') id:string, @Body() b:any){ return this.svc.update(id,b); }
  @Delete(':id') del(@Param('id') id:string){ return this.svc.remove(id); }
}
