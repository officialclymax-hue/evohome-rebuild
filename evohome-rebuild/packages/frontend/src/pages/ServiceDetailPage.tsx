import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../lib/api';

export default function ServiceDetailPage(){
  const { serviceSlug } = useParams();
  const [service, setService] = useState<any|null>(null);
  useEffect(()=>{ if (serviceSlug) api.get(`/services/${serviceSlug}`).then(r=> setService(r.data.data || r.data)); },[serviceSlug]);
  if (!service) return <div className="p-6">Loading...</div>;
  return (
    <div className="prose max-w-3xl mx-auto p-6">
      <h1>{service.name}</h1>
      {service.image && <img src={service.image} alt={service.name} />}
      <p>{service.longDescription || service.description}</p>
      {Array.isArray(service.benefits) && (
        <ul>{service.benefits.map((b:string, i:number)=> <li key={i}>{b}</li>)}</ul>
      )}
    </div>
  );
}
