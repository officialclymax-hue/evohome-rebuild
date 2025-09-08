import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Health + root module
import { AppHealthModule } from './app-health/app-health.module';

// === Feature modules — make sure each of these folders exists under src/ ===
// If any folder is missing, remove the corresponding import and item below.
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

    // Serve /admin from backend/public/admin (works on Render)
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public', 'admin'),
      serveRoot: '/admin',
      serveStaticOptions: { index: true },
    }),

    // Root + health
    AppHealthModule,

    // === Register your API feature modules here ===
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
