import { Module } from '@nestjs/common';
import { AdminSpaController } from './admin-spa.controller';

@Module({
  controllers: [AdminSpaController],
})
export class AdminSpaModule {}
