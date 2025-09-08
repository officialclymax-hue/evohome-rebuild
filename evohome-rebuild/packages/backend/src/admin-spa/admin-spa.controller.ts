import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

/**
 * Forces /admin and any sub-route (e.g. /admin/settings) to return index.html
 * Assets (JS/CSS) under /admin/** are still served by ServeStatic.
 */
@Controller('admin')
export class AdminSpaController {
  @Get()
  serveRoot(@Res() res: Response) {
    const indexFile = join(process.cwd(), 'public', 'admin', 'index.html');
    const html = readFileSync(indexFile, 'utf8');
    res.type('html').send(html);
  }

  @Get('*')
  serveAny(@Res() res: Response) {
    const indexFile = join(process.cwd(), 'public', 'admin', 'index.html');
    const html = readFileSync(indexFile, 'utf8');
    res.type('html').send(html);
  }
}
