import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { parseDocxToData } from './parseBoltDocx';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@evohome.local';
  const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash, role: 'admin' },
  });

  const docPath = process.env.BOLT_DOCX_PATH || 'bolt-export.docx';
  const { services, counties, blogs, company } = await parseDocxToData(docPath);

  if (company) {
    await prisma.companyInfo.upsert({
      where: { id: 1 },
      update: company,
      create: { id: 1, name: company.name || 'EvoHome Improvements Ltd', areaServed: company.areaServed || [] },
    });
  }

  for (const c of counties) {
    await prisma.county.upsert({
      where: { slug: c.slug },
      update: { name: c.name, description: c.description || '', isPrimary: !!c.isPrimary },
      create: { slug: c.slug, name: c.name, description: c.description || '', isPrimary: !!c.isPrimary },
    });
  }

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        name: s.name,
        category: s.category,
        description: s.description,
        longDescription: s.longDescription,
        benefits: s.benefits || [],
        image: s.image,
        featured: !!s.featured,
        averageSavings: s.averageSavings,
        installTime: s.installTime,
        warranty: s.warranty,
        whatIsIt: s.whatIsIt,
        howItWorksSteps: s.howItWorksSteps || [],
        comparisonTable: s.comparisonTable || [],
        whyChooseContent: s.whyChooseContent,
        howEvoHomeHelps: s.howEvoHomeHelps || s.howEvoHomeHelpsContent,
        relatedArticles: s.relatedArticles || [],
        externalResources: s.externalResources || [],
        faqs: s.faqs || [],
        serviceTypes: s.serviceTypes || [],
        materials: s.materials || [],
      },
      create: {
        slug: s.slug,
        name: s.name,
        category: s.category,
        description: s.description,
        longDescription: s.longDescription,
        benefits: s.benefits || [],
        image: s.image,
        featured: !!s.featured,
        averageSavings: s.averageSavings,
        installTime: s.installTime,
        warranty: s.warranty,
        whatIsIt: s.whatIsIt,
        howItWorksSteps: s.howItWorksSteps || [],
        comparisonTable: s.comparisonTable || [],
        whyChooseContent: s.whyChooseContent,
        howEvoHomeHelps: s.howEvoHomeHelps || s.howEvoHomeHelpsContent,
        relatedArticles: s.relatedArticles || [],
        externalResources: s.externalResources || [],
        faqs: s.faqs || [],
        serviceTypes: s.serviceTypes || [],
        materials: s.materials || [],
      },
    });
  }

  for (const b of blogs) {
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: {
        title: b.title,
        excerpt: b.excerpt || '',
        content: b.content || b.excerpt || '',
        date: b.date ? new Date(b.date) : null,
        author: b.author || 'EvoHome Team',
        category: b.category || null,
        image: b.image || null,
      },
      create: {
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt || '',
        content: b.content || b.excerpt || '',
        date: b.date ? new Date(b.date) : null,
        author: b.author || 'EvoHome Team',
        category: b.category || null,
        image: b.image || null,
      },
    });
  }

  console.log('Seed complete');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
