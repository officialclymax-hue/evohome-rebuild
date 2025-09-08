import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppHealthModule } from './app-health/app-health.module';
import { DebugAdminModule } from './debug-admin/debug-admin.module';

// Feature modules — keep only ones you actually have:
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
     * IMPORTANT: cwd is already .../packages/backend
     * So the static folder is just ./public/admin from there.
     */
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public', 'admin'),
      serveRoot: '/admin',
      serveStaticOptions: { index: true },
    }),

    AppHealthModule,
    DebugAdminModule,

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
