export const runtime = 'edge';
export function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: https://YOUR-NETLIFY-DOMAIN/sitemap.xml
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
}
