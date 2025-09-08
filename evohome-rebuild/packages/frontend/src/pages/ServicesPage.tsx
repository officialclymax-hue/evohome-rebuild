import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';

export default function ServicesPage(){
  const [services, setServices] = useState<any[]>([]);
  useEffect(()=>{ api.get('/services').then(r=> setServices(r.data.data || r.data)); },[]);
  const grouped = services.reduce((acc:any, s:any)=>{ (acc[s.category] ||= []).push(s); return acc; }, {} as any);
  return (
    <div className="container mx-auto p-6 space-y-8">
      {Object.entries(grouped).map(([cat, items]:any)=> (
        <section key={cat}>
          <h2 className="text-2xl font-bold mb-3">{cat}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {items.map((s:any)=> (
              <Link to={`/services/${s.slug}`} key={s.id} className="border rounded p-4 hover:shadow">
                {s.image && <img src={s.image} alt={s.name} className="w-full h-40 object-cover rounded" />}
                <h3 className="text-lg font-semibold mt-2">{s.name}</h3>
                <p className="text-sm text-gray-600">{s.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
