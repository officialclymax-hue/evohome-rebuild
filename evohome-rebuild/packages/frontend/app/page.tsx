import { api } from '@/lib/api';

export default async function HomePage() {
  const company = await api<any>('/company-info').catch(()=>null);
  const services = await api<any[]>('/services?limit=6').catch(()=>[]);
  const testimonials = await api<any[]>('/testimonials?limit=3').catch(()=>[]);

  return (
    <div className="space-y-10">
      <section className="text-center space-y-3">
        <h1 className="text-3xl md:text-5xl font-bold">Energy-smart Home Improvements</h1>
        <p className="text-gray-600">Insulation, windows, roofing, and more — installed by EvoHome.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Popular Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s:any)=>(
            <a key={s.id} href={`/services/${s.slug}`} className="border rounded-lg p-4 hover:shadow">
              <h3 className="font-medium">{s.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{s.description}</p>
            </a>
          ))}
        </div>
        <div className="mt-4"><a className="text-blue-600" href="/services">View all services →</a></div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What customers say</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t:any)=>(
            <div key={t.id} className="border rounded-lg p-4">
              <div className="font-medium">{t.name}</div>
              <div className="text-sm text-gray-600">{t.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Get a free quote</h2>
        <a className="inline-block bg-blue-600 text-white px-4 py-2 rounded" href="/contact">Request a quote</a>
      </section>

      {company && (
        <section className="text-sm text-gray-600">
          <div>Call: {company.phone}</div>
          <div>Email: {company.email}</div>
        </section>
      )}
    </div>
  );
}
