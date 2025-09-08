import { Controller, Get } from '@nestjs/common';
import { join } from 'path';
import { existsSync, readdirSync } from 'fs';

@Controller('_debug-admin')
export class DebugAdminController {
  @Get()
  info() {
    // This MUST match the ServeStatic rootPath logic in AppModule
    const resolved = join(process.cwd(), 'packages', 'backend', 'public', 'admin');
    const indexPath = join(resolved, 'index.html');

    const exists = existsSync(indexPath);
    let listing: string[] = [];
    try {
      listing = readdirSync(resolved);
    } catch {
      listing = ['<cannot read directory>'];
    }

    return {
      cwd: process.cwd(),
      __dirname,
      resolvedAdminDir: resolved,
      indexHtml: indexPath,
      indexExists: exists,
      dirListing: listing,
      hint: 'indexExists must be true; resolvedAdminDir must list index.html'
    };
  }
}
