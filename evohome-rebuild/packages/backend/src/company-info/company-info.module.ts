import { Module } from '@nestjs/common';
import { CompanyInfoService } from './company-info.service';
import { CompanyInfoController } from './company-info.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({ controllers:[CompanyInfoController], providers:[CompanyInfoService, PrismaService] })
export class CompanyInfoModule {}
