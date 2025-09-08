import { Module } from '@nestjs/common';
import { CountiesService } from './counties.service';
import { CountiesController } from './counties.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({ controllers: [CountiesController], providers: [CountiesService, PrismaService] })
export class CountiesModule {}
