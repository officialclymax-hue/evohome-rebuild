import { api } from '@/lib/api';

export default async function sitemap() {
  const base = 'https://YOUR-NETLIFY-DOMAIN'; // replace after going live
  const services = await api<any[]>('/services').catch(()=>[]);
  const posts = await api<any[]>('/blog').catch(()=>[]);

  const staticUrls = ['', 'services', 'blog', 'gallery', 'contact'].map(p=>({
    url: `${base}/${p}`.replace(/\/$/, ''), changefreq: 'weekly', priority: 0.8
  }));

  const serviceUrls = services.map(s=>({ url: `${base}/services/${s.slug}`, changefreq: 'monthly', priority: 0.7 }));
  const blogUrls = posts.map(p=>({ url: `${base}/blog/${p.slug}`, changefreq: 'weekly', priority: 0.6 }));

  return [...staticUrls, ...serviceUrls, ...blogUrls];
}
