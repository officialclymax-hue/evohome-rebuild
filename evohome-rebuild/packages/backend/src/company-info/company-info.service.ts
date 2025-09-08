import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompanyInfoService {
  constructor(private prisma: PrismaService) {}
  get(){ return this.prisma.companyInfo.findUnique({ where:{ id:1 }}); }
  upsert(data:any){ return this.prisma.companyInfo.upsert({ where:{ id:1 }, update:data, create:{ id:1, name: data.name || 'EvoHome' } }); }
}
