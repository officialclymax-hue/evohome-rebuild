import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}
  list(){ return this.prisma.galleryImage.findMany({ orderBy:{ createdAt:'desc' } }); }
  create(data:any){ return this.prisma.galleryImage.create({ data }); }
  update(id:string, data:any){ return this.prisma.galleryImage.update({ where:{ id }, data }); }
  remove(id:string){ return this.prisma.galleryImage.delete({ where:{ id } }); }
}
