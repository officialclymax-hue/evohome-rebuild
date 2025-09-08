import React, { useState } from 'react';
import { api } from '../lib/api';

export default function ContactPage(){
  const [status, setStatus] = useState('');
  async function submit(e: React.FormEvent){
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const body = Object.fromEntries(form.entries());
    await api.post('/form-submissions', body);
    setStatus('Thanks! We\'ll be in touch.');
    (e.target as HTMLFormElement).reset();
  }
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Contact</h1>
      <form onSubmit={submit} className="space-y-3">
        <input name="name" placeholder="Name" className="border p-2 rounded w-full" required />
        <input name="email" placeholder="Email" className="border p-2 rounded w-full" />
        <input name="phone" placeholder="Phone" className="border p-2 rounded w-full" />
        <input name="postcode" placeholder="Postcode" className="border p-2 rounded w-full" />
        <input name="service" placeholder="Service" className="border p-2 rounded w-full" />
        <textarea name="message" placeholder="Message" className="border p-2 rounded w-full" rows={4} />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="marketingConsent" /> Marketing consent</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="dataConsent" /> Data consent</label>
        <button className="bg-blue-600 text-white rounded px-4 py-2">Send</button>
      </form>
      {status && <p className="mt-3 text-green-700">{status}</p>}
    </div>
  );
}
