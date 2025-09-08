import { api } from '@/lib/api';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await api<any>(`/blog/${params.slug}`).catch(()=>null);
  return {
    title: post ? `${post.title} – EvoHome Blog` : 'Blog – EvoHome',
    description: post?.excerpt || undefined
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await api<any>(`/blog/${params.slug}`).catch(()=>null);
  if (!post) return <div>Not found</div>;
  return (
    <article className="prose max-w-none">
      <h1>{post.title}</h1>
      {/* If your backend returns HTML content, dangerouslySetInnerHTML is fine here */}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
