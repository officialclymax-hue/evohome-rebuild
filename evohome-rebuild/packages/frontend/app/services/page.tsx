import { api } from '@/lib/api';

export const metadata = { title: 'Services – EvoHome' };

export default async function ServicesPage() {
  const services = await api<any[]>('/services').catch(()=>[]);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">All Services</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s:any)=>(
          <a key={s.id} href={`/services/${s.slug}`} className="border rounded-lg p-4 hover:shadow">
            <h3 className="font-medium">{s.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{s.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
