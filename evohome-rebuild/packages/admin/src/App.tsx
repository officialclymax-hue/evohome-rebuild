import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { MODELS } from './models.config';
import DataTable from './components/DataTable';
import Login from './components/Login';

function Private({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/admin/login" />;
}

export default function App(){
  return (
    <BrowserRouter basename="/admin">
      <div className="min-h-screen grid grid-cols-[220px_1fr]">
        <aside className="border-r p-4 space-y-2">
          <h1 className="font-bold">EvoHome Admin</h1>
          <nav className="flex flex-col gap-2">
            {Object.entries(MODELS).map(([key, m]) => (
              <Link key={key} to={`/${key}`} className="text-sm">{m.title}</Link>
            ))}
            <button className="text-sm text-red-600" onClick={()=>{localStorage.removeItem('token'); location.href='/admin/login';}}>Logout</button>
          </nav>
        </aside>
        <main className="p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            {Object.entries(MODELS).map(([key, m]) => (
              <Route key={key} path={`/${key}`} element={
                <Private>
                  <DataTable title={m.title} endpoint={m.endpoint} idKey={m.id} columns={m.columns as any} fields={m.fields as any} />
                </Private>
              } />
            ))}
            <Route path="*" element={<Navigate to="/services" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
