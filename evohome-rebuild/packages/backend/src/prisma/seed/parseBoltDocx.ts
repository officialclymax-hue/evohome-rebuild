import * as fs from 'fs';
import * as mammoth from 'mammoth';
import slugify from 'slugify';

function extractBlock(text: string, markerStart: RegExp, markerEnd: RegExp) {
  const start = text.search(markerStart);
  if (start === -1) return null;
  const rest = text.slice(start);
  const endIdx = rest.search(markerEnd);
  const block = endIdx === -1 ? rest : rest.slice(0, endIdx);
  return block;
}

function sanitizeTsArrayToJson(tsArray: string) {
  return tsArray
    .replace(/\bexport\s+const\s+\w+\s*:\s*[^=]+=/g, '')
    .replace(/\bconst\s+\w+\s*=\s*/g, '')
    .replace(/(\w+)\s*:/g, '"$1":')
    .replace(/'([^']*)'/g, '"$1"')
    .replace(/,\s*\}/g, '}')
    .replace(/,\s*\]/g, ']');
}

export async function parseDocxToData(docxPath: string) {
  if (!fs.existsSync(docxPath)) throw new Error(`Docx not found at ${docxPath}`);
  const { value } = await mammoth.extractRawText({ path: docxPath });
  const text = value;

  const servicesBlock = extractBlock(text, /export\s+const\s+services\s*:\s*Service\[]\s*=\s*\[/i, /\n\s*export\s+const|\n\s*src\//i);
  let services: any[] = [];
  if (servicesBlock) {
    const arrText = servicesBlock.slice(servicesBlock.indexOf('['), servicesBlock.lastIndexOf(']') + 1);
    const jsonText = sanitizeTsArrayToJson(arrText);
    try { services = JSON.parse(jsonText); } catch {}
  }

  const countiesBlock = extractBlock(text, /export\s+const\s+counties\s*:\s*County\[]\s*=\s*\[/i, /\n\s*export\s+const|\n\s*src\//i);
  let counties: any[] = [];
  if (countiesBlock) {
    const arrText = countiesBlock.slice(countiesBlock.indexOf('['), countiesBlock.lastIndexOf(']') + 1);
    const jsonText = sanitizeTsArrayToJson(arrText);
    try { counties = JSON.parse(jsonText); } catch {}
  }

  const blogBlock = extractBlock(text, /const\s+blogPosts\s*=\s*\[/i, /\n\s*\);|\n\s*export\s+|\n\s*src\//i);
  let blogs: any[] = [];
  if (blogBlock) {
    const arrText = blogBlock.slice(blogBlock.indexOf('['), blogBlock.lastIndexOf(']') + 1);
    const jsonText = sanitizeTsArrayToJson(arrText);
    try { blogs = JSON.parse(jsonText); } catch {}
  }

  let company: any = {
    name: 'EvoHome Improvements Ltd',
    email: 'office@evohomeimprovements.co.uk',
    phone: '0333 004 0195',
    areaServed: ['Hampshire','Surrey','Sussex','Dorset','Wiltshire']
  };

  services = services.map((s:any) => ({ ...s, slug: s.slug || slugify(s.name, { lower: true }) }));
  counties = counties.map((c:any) => ({ ...c, slug: c.slug || slugify(c.name, { lower: true }) }));
  blogs = blogs.map((b:any) => ({ ...b, slug: b.slug || slugify(b.title, { lower: true }), date: b.date ? new Date(b.date).toISOString() : null }));

  return { services, counties, blogs, company };
}
