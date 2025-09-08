import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppHealthModule } from './app-health/app-health.module';
import { DebugAdminModule } from './debug-admin/debug-admin.module';

// Feature modules — keep only those you actually have:
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

    // Use __dirname -> dist/... then go up to backend root and into public/admin
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'admin'),
      serveRoot: '/admin',
      serveStaticOptions: { index: true },
    }),

    AppHealthModule,
    DebugAdminModule,

    // Register your API modules
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
