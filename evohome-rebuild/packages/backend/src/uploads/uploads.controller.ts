import { Body, Controller, Post } from '@nestjs/common';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private uploads: UploadsService) {}
  @Post() upload(@Body() body: { base64: string; folder?: string }) {
    return this.uploads.uploadBase64(body.base64, body.folder);
  }
}
