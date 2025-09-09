'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState<any>({ name:'', email:'', phone:'', postcode:'', service:'', message:'', marketingConsent:false, dataConsent:true });
  const [msg, setMsg] = useState<string| null>(null);
  const [err, setErr] = useState<string| null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(null); setMsg(null);
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE || process.env.API_BASE || 'https://evohome-rebuild.onrender.com';
      const res = await fetch(`${base}/x/form-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to submit');
      setMsg('Thanks! We’ll contact you shortly.');
      setForm({ name:'', email:'', phone:'', postcode:'', service:'', message:'', marketingConsent:false, dataConsent:true });
    } catch (e:any) {
      setErr(e.message || 'Failed to submit');
    } finally { setBusy(false); }
  }

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-3xl font-bold">Request a free quote</h1>
      <form onSubmit={submit} className="grid gap-3">
        {['name','email','phone','postcode','service'].map((k)=>(
          <input key={k} required placeholder={k[0].toUpperCase()+k.slice(1)}
                 className="border rounded p-2"
                 value={form[k]||''}
                 onChange={e=>setForm((f:any)=>({...f,[k]:e.target.value}))} />
        ))}
        <textarea placeholder="Message" className="border rounded p-2" rows={4}
                  value={form.message||''} onChange={e=>setForm((f:any)=>({...f, message:e.target.value}))} />
        <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={!!form.marketingConsent} onChange={e=>setForm((f:any)=>({...f, marketingConsent:e.target.checked}))}/> I agree to receive updates.</label>
        <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={!!form.dataConsent} onChange={e=>setForm((f:any)=>({...f, dataConsent:e.target.checked}))}/> I consent to data processing.</label>
        <button disabled={busy} className="bg-blue-600 text-white rounded px-4 py-2">{busy?'Sending…':'Send'}</button>
        {msg && <div className="text-green-700">{msg}</div>}
        {err && <div className="text-red-700">{err}</div>}
      </form>
    </div>
  );
}
