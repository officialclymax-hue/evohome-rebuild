import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}
  list(){ return this.prisma.blogPost.findMany({ orderBy:{ date: 'desc' } }); }
  one(slug:string){ return this.prisma.blogPost.findUnique({ where:{ slug } }); }
  create(data:any){ return this.prisma.blogPost.create({ data }); }
  update(id:string, data:any){ return this.prisma.blogPost.update({ where:{ id }, data }); }
  remove(id:string){ return this.prisma.blogPost.delete({ where:{ id } }); }
}
