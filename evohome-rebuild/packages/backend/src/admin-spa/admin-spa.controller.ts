import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

@Controller('admin')
export class AdminSpaController {
  @Get()
  serveRoot(@Res() res: Response) {
    const indexFile = join(process.cwd(), 'public', 'admin', 'index.html');
    const html = readFileSync(indexFile, 'utf8');
    res.type('html').send(html);
  }

  @Get(':path(*)')
  serveAny(@Param('path') path: string, @Res() res: Response) {
    // Do NOT catch asset files; let ServeStatic serve them
    if (path?.startsWith('assets/') || path?.includes('.')) {
      return res.status(404).send(); // static middleware handles it
    }
    const indexFile = join(process.cwd(), 'public', 'admin', 'index.html');
    const html = readFileSync(indexFile, 'utf8');
    res.type('html').send(html);
  }
}
