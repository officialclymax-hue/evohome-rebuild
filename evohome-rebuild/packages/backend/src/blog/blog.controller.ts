import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private svc: BlogService) {}
  @Get() list(){ return this.svc.list(); }
  @Get(':slug') one(@Param('slug') slug:string){ return this.svc.one(slug); }
  @Post() create(@Body() b:any){ return this.svc.create(b); }
  @Patch(':id') update(@Param('id') id:string, @Body() b:any){ return this.svc.update(id,b); }
  @Delete(':id') del(@Param('id') id:string){ return this.svc.remove(id); }
}
