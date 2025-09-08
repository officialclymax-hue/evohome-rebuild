import React, { useState } from 'react';
import { api } from '../api';

export default function LoginPage({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('office@evohomeimprovements.co.uk');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      if (!data?.token) throw new Error('No token returned');
      localStorage.setItem('evohome_token', data.token);
      onSuccess();
    } catch (e: any) {
      setErr(e?.response?.data?.message || e.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{maxWidth: 420, margin: '5rem auto', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Arial'}}>
      <h1 style={{marginBottom: 12}}>EvoHome Admin – Login</h1>
      <form onSubmit={submit} style={{display: 'grid', gap: 12}}>
        <label>Email
          <input value={email} onChange={(e)=>setEmail(e.target.value)} required
                 style={{width:'100%', padding:8, marginTop:4}} type="email" />
        </label>
        <label>Password
          <input value={password} onChange={(e)=>setPassword(e.target.value)} required
                 style={{width:'100%', padding:8, marginTop:4}} type="password" />
        </label>
        {err && <div style={{color:'crimson'}}>{err}</div>}
        <button disabled={busy} style={{padding:'10px 14px', cursor:'pointer'}}>
          {busy ? 'Checking…' : 'Login'}
        </button>
      </form>
      <p style={{opacity:.7, marginTop:12}}>Use the ADMIN_EMAIL & ADMIN_PASSWORD set on Render.</p>
    </div>
  );
}
