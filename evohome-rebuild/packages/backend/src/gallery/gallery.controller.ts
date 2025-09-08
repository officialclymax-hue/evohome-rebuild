import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private svc: GalleryService) {}
  @Get() list(){ return this.svc.list(); }
  @Post() create(@Body() b:any){ return this.svc.create(b); }
  @Patch(':id') update(@Param('id') id:string, @Body() b:any){ return this.svc.update(id,b); }
  @Delete(':id') del(@Param('id') id:string){ return this.svc.remove(id); }
}
