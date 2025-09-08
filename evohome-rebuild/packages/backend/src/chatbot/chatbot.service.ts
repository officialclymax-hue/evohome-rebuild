import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatbotService {
  constructor(private prisma: PrismaService) {}
  async kb() {
    const [company, services, counties] = await Promise.all([
      this.prisma.companyInfo.findUnique({ where: { id: 1 } }),
      this.prisma.service.findMany(),
      this.prisma.county.findMany(),
    ]);
    const faqs = services.flatMap((s: any) => (s.faqs || []).map((f: any) => ({ ...f, service: s.name })));
    return { company, services: services.map(s => ({ name: s.name, slug: s.slug, category: s.category })), counties, faqs };
  }
}
