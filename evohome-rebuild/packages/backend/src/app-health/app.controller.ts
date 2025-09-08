import { Controller, Get /*, Redirect*/ } from '@nestjs/common';

@Controller()
export class AppController {
  /**
   * Option A (default): return JSON at "/"
   */
  @Get()
  getRoot() {
    return {
      ok: true,
      name: 'EvoHome API',
      health: '/health',
      admin: '/admin',
      note: 'Change to redirect by uncommenting lines in this controller',
    };
  }

  /**
   * Option B: redirect "/" to "/admin" (uncomment to enable)
   */
  // @Get()
  // @Redirect('/admin', 302)
  // rootRedirect() {}

  /**
   * Health endpoint
   */
  @Get('health')
  health() {
    return { status: 'ok', uptime: process.uptime() };
  }
}
