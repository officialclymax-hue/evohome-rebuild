import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({ controllers:[GalleryController], providers:[GalleryService, PrismaService] })
export class GalleryModule {}
