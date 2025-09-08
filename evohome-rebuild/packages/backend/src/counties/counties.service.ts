import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CountiesService {
  constructor(private prisma: PrismaService) {}
  create(data: any) { return this.prisma.county.create({ data }); }
  findAll() { return this.prisma.county.findMany({ orderBy: { name: 'asc' } }); }
  findOne(slug: string) { return this.prisma.county.findUnique({ where: { slug } }); }
  update(id: string, data: any) { return this.prisma.county.update({ where:{ id }, data }); }
  remove(id: string) { return this.prisma.county.delete({ where:{ id } }); }
}
