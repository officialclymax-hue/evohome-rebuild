import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

/**
 * NEW: adds root "/" and "/health" without touching your other modules.
 */
import { AppHealthModule } from './app-health/app-health.module';

/**
 * KEEP YOUR EXISTING IMPORTS HERE (if you have them), e.g.:
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

    /**
     * Serve static admin at /admin from /public/admin/index.html
     * This works IMMEDIATELY with the placeholder we added.
     */
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'admin'),
      serveRoot: '/admin',
      serveStaticOptions: { index: true },
    }),

    /**
     * NEW: Mount "/" and "/health" without affecting your other routes.
     */
    AppHealthModule,

    /**
     * KEEP YOUR EXISTING MODULES HERE (if you have them), e.g.:
     *
     * AuthModule,
     * CompanyInfoModule,
     * ServicesModule,
     * CountiesModule,
     * BlogModule,
     * GalleryModule,
     * TestimonialsModule,
     * FormsModule,
     * UploadsModule,
     * ChatbotModule,
     */
  ],
})
export class AppModule {}
