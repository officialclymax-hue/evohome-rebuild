import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppHealthModule } from './app-health/app-health.module';
import { DebugAdminModule } from './debug-admin/debug-admin.module';
import { AdminSpaModule } from './admin-spa/admin-spa.module';

// keep only modules you actually have:
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

    // Serve /admin/assets/... from the filesystem
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public', 'admin'),
      serveRoot: '/admin',
      serveStaticOptions: {
        index: false,   // SPA controller will serve index.html
        fallthrough: true
      },
    }),

    AppHealthModule,
    DebugAdminModule,   // keep while we verify
    AdminSpaModule,     // returns index.html for /admin (non-asset paths)

    // API modules
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
