import React, { useState } from 'react';
import { api } from '../api';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  async function submit(e: React.FormEvent){
    e.preventDefault(); setErr('');
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.data?.token || res.data.token);
      location.href = '/admin/services';
    } catch(e:any){ setErr('Invalid credentials'); }
  }
  return (
    <div className="h-screen grid place-items-center">
      <form onSubmit={submit} className="border rounded p-6 w-80 space-y-3">
        <h1 className="text-lg font-bold">Admin Login</h1>
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <input className="border rounded p-2 w-full" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="border rounded p-2 w-full" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white rounded py-2">Login</button>
      </form>
    </div>
  );
}
