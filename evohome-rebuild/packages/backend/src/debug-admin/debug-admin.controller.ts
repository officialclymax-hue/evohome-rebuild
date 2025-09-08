import { Controller, Get } from '@nestjs/common';
import { join } from 'path';
import { existsSync, readdirSync } from 'fs';

@Controller('_debug-admin')
export class DebugAdminController {
  @Get()
  info() {
    const resolved = join(__dirname, '..', 'public', 'admin');
    const indexPath = join(resolved, 'index.html');
    const exists = existsSync(indexPath);
    let listing: string[] = [];
    try {
      listing = readdirSync(resolved);
    } catch {
      listing = ['<cannot read directory>'];
    }
    return {
      __dirname,
      resolvedAdminDir: resolved,
      indexHtml: indexPath,
      indexExists: exists,
      dirListing: listing,
      hint: 'ServeStatic rootPath should match resolvedAdminDir. indexExists must be true.',
    };
  }
}
