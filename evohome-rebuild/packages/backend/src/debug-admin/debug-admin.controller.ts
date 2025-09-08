import { Controller, Get } from '@nestjs/common';
import { join } from 'path';
import { existsSync, readdirSync } from 'fs';

@Controller('_debug-admin')
export class DebugAdminController {
  @Get()
  info() {
    // cwd is the backend root on Render
    const resolved = join(process.cwd(), 'public', 'admin');
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
      hint: 'indexExists must be true; dirListing should include index.html'
    };
  }
}
