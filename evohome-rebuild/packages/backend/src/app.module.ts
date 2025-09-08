import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Health/root
import { AppHealthModule } from './app-health/app-health.module';

// TEMP: debug admin path module (we’ll keep it until verified)
import { DebugAdminModule } from './debug-admin/debug-admin.module';

// Feature modules — KEEP ONLY the ones you actually have.
// If any of these folders don’t exist in src/, delete the import AND the entry.
import { AuthModule } from './auth/auth.module';
import { CompanyInfoModule } from './company-info/company-info.module';
import { ServicesModule } from './services/services.module';
import { CountiesModule } from './counties/counties.module';
import { BlogModule } from './blog/blog.module';
import { GalleryModule } from './gallery/gallery.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { FormsModule } from './forms/forms.module';
import { UploadsModule } from './uploads/uploads.module';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    /**
     * IMPORTANT:
     * Use process.cwd() to point to the REAL backend root (not dist).
     * Your Render working dir is: /opt/render/project/src/evohome-rebuild
     * We add: packages/backend/public/admin
     * => /opt/render/project/src/evohome-rebuild/packages/backend/public/admin
     */
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'packages', 'backend', 'public', 'admin'),
      serveRoot: '/admin',
      serveStaticOptions: { index: true },
    }),

    // Root + health
    AppHealthModule,

    // Debug (shows which path we resolved)
    DebugAdminModule,

    // YOUR API MODULES
    AuthModule,
    CompanyInfoModule,
    ServicesModule,
    CountiesModule,
    BlogModule,
    GalleryModule,
    TestimonialsModule,
    FormsModule,
    UploadsModule,
    ChatbotModule,
  ],
})
export class AppModule {}
