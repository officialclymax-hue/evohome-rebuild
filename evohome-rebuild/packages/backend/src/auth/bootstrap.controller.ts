import { Controller, Get, Query, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

@Controller('auth')
export class BootstrapController {
  @Get('bootstrap')
  async bootstrap(
    @Query('token') token: string,
  ) {
    const expected = process.env.BOOTSTRAP_TOKEN || '';
    if (!expected) {
      throw new BadRequestException('BOOTSTRAP_TOKEN not set on server');
    }
    if (!token || token !== expected) {
      throw new ForbiddenException('Invalid bootstrap token');
    }

    const email = process.env.ADMIN_EMAIL || 'office@evohomeimprovements.co.uk';
    const password = process.env.ADMIN_PASSWORD;
    if (!password) throw new BadRequestException('ADMIN_PASSWORD not set');

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.adminUser.upsert({
      where: { email },
      update: { passwordHash, role: 'admin' },
      create: { email, passwordHash, role: 'admin' },
    });

    return { ok: true, email: user.email };
  }
}
