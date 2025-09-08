import { api } from '@/lib/api';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = await api<any>(`/services/${params.slug}`).catch(()=>null);
  return {
    title: service ? `${service.name} – EvoHome` : 'Service – EvoHome',
    description: service?.description || 'Home improvements by EvoHome'
  };
}

export default async function ServiceDetail({ params }: { params: { slug: string } }) {
  const service = await api<any>(`/services/${params.slug}`).catch(()=>null);
  if (!service) return <div>Not found</div>;
  return (
    <article className="prose max-w-none">
      <h1>{service.name}</h1>
      <p>{service.longDescription || service.description}</p>
      {/* render FAQs, benefits, images, etc., when present */}
    </article>
  );
}
