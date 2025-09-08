import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FormsService {
  constructor(private prisma: PrismaService) {}
  create(data:any){ return this.prisma.formSubmission.create({ data }); }
  list(){ return this.prisma.formSubmission.findMany({ orderBy:{ createdAt:'desc' } }); }
}
