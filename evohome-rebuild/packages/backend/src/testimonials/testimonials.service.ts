import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TestimonialsService {
  constructor(private prisma: PrismaService) {}
  list(){ return this.prisma.testimonial.findMany({ orderBy:{ createdAt:'desc' } }); }
  create(data:any){ return this.prisma.testimonial.create({ data }); }
  update(id:string, data:any){ return this.prisma.testimonial.update({ where:{ id }, data }); }
  remove(id:string){ return this.prisma.testimonial.delete({ where:{ id } }); }
}
