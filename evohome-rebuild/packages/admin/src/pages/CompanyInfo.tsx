import React, { useEffect, useState } from 'react';
import { api } from '../api';

type CompanyInfo = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  openingHours?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  website?: string;
};

const empty: CompanyInfo = {
  name: 'EvoHome Improvements',
  email: 'office@evohomeimprovements.co.uk',
  phone: '',
  address: '',
  openingHours: '',
  facebook: '',
  instagram: '',
  twitter: '',
  youtube: '',
  website: '',
};

export default function CompanyInfoPage() {
  const [item, setItem] = useState<CompanyInfo>(empty);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setErr(null);
    setMsg(null);
    try {
      const { data } = await api.get('/company-info');
      if (data) setItem({ ...empty, ...data });
    } catch (e: any) {
      setErr(e?.response?.data?.message || e.message || 'Failed to load company info');
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setMsg(null);
    try {
      const method = item?.id ? 'put' : 'post';
      const url = '/company-info';
      const { data } = await api.request({ method, url, data: item });
      setItem({ ...item, ...data });
      setMsg('Saved!');
    } catch (e: any) {
      setErr(e?.response?.data?.message || e.message || 'Save failed');
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => { load(); }, []);

  function set<K extends keyof CompanyInfo>(k: K, v: CompanyInfo[K]) {
    setItem((old) => ({ ...old, [k]: v }));
  }

  const input = (label: string, k: keyof CompanyInfo, type: string = 'text') => (
    <label style={{display:'grid', gap:6}}>
      {label}
      <input type={type} value={(item[k] as any) || ''} onChange={e=>set(k, e.target.value)}
             style={{padding:8}} />
    </label>
  );

  return (
    <div style={{maxWidth: 720, margin: '2rem auto', fontFamily:'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Arial'}}>
      <h2>Company Info</h2>
      <form onSubmit={save} style={{display:'grid', gap:12, marginTop:12}}>
        {input('Name','name')}
        {input('Email','email','email')}
        {input('Phone','phone')}
        {input('Address','address')}
        {input('Opening Hours','openingHours')}
        <div style={{display:'grid', gap:12, gridTemplateColumns:'1fr 1fr'}}>
          {input('Facebook','facebook')}
          {input('Instagram','instagram')}
          {input('Twitter/X','twitter')}
          {input('YouTube','youtube')}
          {input('Website','website')}
        </div>
        {err && <div style={{color:'crimson'}}>{err}</div>}
        {msg && <div style={{color:'green'}}>{msg}</div>}
        <button disabled={busy} style={{padding:'10px 14px', width:140}}>
          {busy ? 'Saving…' : 'Save'}
        </button>
      </form>
    </div>
  );
}
