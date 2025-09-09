import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

@Controller('auth')
export class LoginPlainController {
  @Post('login-plain')
  async login(@Body() body: any) {
    const { email, username, password } = body || {};
    const idKey = email ? 'email' : 'username';
    const idVal = email || username;
    if (!idVal || !password) throw new UnauthorizedException('Missing credentials');

    const user = await prisma.adminUser.findFirst({
      where: email ? { email } : { email: username }, // if your schema has username field, adjust here
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const secret = process.env.JWT_SECRET || 'evohome-dev-secret';
    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role || 'admin' },
      secret,
      { expiresIn: '7d' }
    );

    return { token };
  }
}
