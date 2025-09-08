import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  // Option A: Return JSON at "/"
  @Get()
  getRoot() {
    return { ok: true, name: 'EvoHome API', docs: '/health', admin: '/admin' };
  }

  // Option B (uncomment these 2 lines if you want "/" to redirect to "/admin")
  // @Get()
  // @Redirect('/admin', 302)
  // rootRedirect() {}

  @Get('health')
  health() {
    return { status: 'ok', uptime: process.uptime() };
  }
}
