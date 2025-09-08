import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Health + root module (from earlier step)
import { AppHealthModule } from './app-health/app-health.module';

/**
 * TODO: Re-add your feature modules here if you already had them, e.g.:
 *
 * import { AuthModule } from './auth/auth.module';
 * import { CompanyInfoModule } from './company-info/company-info.module';
 * import { ServicesModule } from './services/services.module';
 * import { CountiesModule } from './counties/counties.module';
 * import { BlogModule } from './blog/blog.module';
 * import { GalleryModule } from './gallery/gallery.module';
 * import { TestimonialsModule } from './testimonials/testimonials.module';
 * import { FormsModule } from './forms/forms.module';
 * import { UploadsModule } from './uploads/uploads.module';
 * import { ChatbotModule } from './chatbot/chatbot.module';
 */

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // Serve /admin from <repo root>/packages/backend/public/admin
    // Using process.cwd() makes this stable on Render:
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public', 'admin'),
      serveRoot: '/admin',
      serveStaticOptions: { index: true },
    }),

    AppHealthModule,

    // Re-add your feature modules here (uncomment & keep your original order):
    // AuthModule,
    // CompanyInfoModule,
    // ServicesModule,
    // CountiesModule,
    // BlogModule,
    // GalleryModule,
    // TestimonialsModule,
    // FormsModule,
    // UploadsModule,
    // ChatbotModule,
  ],
})
export class AppModule {}
