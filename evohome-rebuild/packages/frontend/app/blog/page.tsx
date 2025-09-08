import { api } from '@/lib/api';
export const metadata = { title: 'Blog – EvoHome' };

export default async function BlogPage() {
  const posts = await api<any[]>('/blog').catch(()=>[]);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Blog</h1>
      <div className="space-y-4">
        {posts.map((p:any)=>(
          <a key={p.id} href={`/blog/${p.slug}`} className="block border rounded p-4 hover:shadow">
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm text-gray-600">{p.excerpt}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
