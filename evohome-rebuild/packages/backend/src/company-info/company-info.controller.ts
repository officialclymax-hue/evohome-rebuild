import { Body, Controller, Get, Put } from '@nestjs/common';
import { CompanyInfoService } from './company-info.service';

@Controller('company-info')
export class CompanyInfoController {
  constructor(private svc: CompanyInfoService) {}
  @Get() get(){ return this.svc.get(); }
  @Put() put(@Body() b:any){ return this.svc.upsert(b); }
}
