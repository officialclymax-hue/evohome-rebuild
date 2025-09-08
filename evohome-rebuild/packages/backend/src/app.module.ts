import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppHealthModule } from './app-health/app-health.module';
import { DebugAdminModule } from './debug-admin/debug-admin.module';
import { AdminSpaModule } from './admin-spa/admin-spa.module';

// Feature modules — keep only the ones you actually have
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

    // Serve static assets (JS/CSS) under /admin/**
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public', 'admin'),
      serveRoot: '/admin',
      serveStaticOptions: {
        index: false,           // let the controller serve index.html
        fallthrough: true
      },
    }),

    // Root + health
    AppHealthModule,

    // Debug path inspector
    DebugAdminModule,

    // SPA controller that always returns index.html for /admin and /admin/*
    AdminSpaModule,

    // Your API feature modules
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
