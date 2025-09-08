import { Module } from '@nestjs/common';
import { DebugAdminController } from './debug-admin.controller';

@Module({
  controllers: [DebugAdminController],
})
export class DebugAdminModule {}
