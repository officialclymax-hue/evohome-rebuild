import { Module } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { TestimonialsController } from './testimonials.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({ controllers:[TestimonialsController], providers:[TestimonialsService, PrismaService] })
export class TestimonialsModule {}
