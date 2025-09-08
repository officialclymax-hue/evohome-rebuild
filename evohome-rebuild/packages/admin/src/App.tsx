import React, { useEffect, useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import CompanyInfoPage from './pages/CompanyInfo';
import { api } from './api';

function TopBar() {
  const nav = useNavigate();
  function logout() {
    localStorage.removeItem('evohome_token');
    nav('/'); window.location.reload();
  }
  return (
    <div style={{display:'flex', gap:16, padding:'12px 16px', borderBottom:'1px solid #ddd'}}>
      <strong>EvoHome Admin</strong>
      <Link to="/">Dashboard</Link>
      <Link to="/company-info">Company Info</Link>
      <a href="/docs" target="_blank" rel="noreferrer">API Docs</a>
      <a href="/health" target="_blank" rel="noreferrer">Health</a>
      <span style={{marginLeft:'auto', cursor:'pointer'}} onClick={logout}>Logout</span>
    </div>
  );
}

function Dashboard() {
  const [health, setHealth] = useState<any>(null);
  useEffect(() => { api.get('/health').then(r=>setHealth(r.data)).catch(()=>{}); }, []);
  return (
    <div style={{padding:16}}>
      <h2>Dashboard</h2>
      <pre style={{background:'#f7f7f7', padding:12, borderRadius:8}}>
        {JSON.stringify(health || {status:'checking…'}, null, 2)}
      </pre>
    </div>
  );
}

export default function App() {
  const [authed, setAuthed] = useState<boolean>(!!localStorage.getItem('evohome_token'));
  useEffect(() => { setAuthed(!!localStorage.getItem('evohome_token')); }, []);

  if (!authed) return <LoginPage onSuccess={()=>setAuthed(true)} />;

  return (
    <div>
      <TopBar />
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/company-info" element={<CompanyInfoPage />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}
