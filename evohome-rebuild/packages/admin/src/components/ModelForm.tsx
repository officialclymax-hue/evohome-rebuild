import React, { useState } from 'react';
import { Field } from '../models.config';

export function ModelForm({ fields, value, onChange }: { fields: Field[]; value: any; onChange: (v:any)=>void }) {
  const [local, setLocal] = useState<any>(value || {});
  function update(name: string, v: any) {
    const next = { ...local, [name]: v };
    setLocal(next); onChange(next);
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map((f) => (
        <div key={f.name} className="flex flex-col gap-1">
          <label className="text-sm font-medium">{f.label}</label>
          {f.type === 'textarea' && (
            <textarea className="border rounded p-2" defaultValue={local[f.name] || ''} onChange={e=>update(f.name, e.target.value)} />
          )}
          {f.type === 'text' && (
            <input className="border rounded p-2" defaultValue={local[f.name] || ''} onChange={e=>update(f.name, e.target.value)} />
          )}
          {f.type === 'boolean' && (
            <input type="checkbox" defaultChecked={!!local[f.name]} onChange={e=>update(f.name, e.target.checked)} />
          )}
          {f.type === 'json' && (
            <textarea className="border rounded p-2 font-mono" rows={6} defaultValue={JSON.stringify(local[f.name] ?? (Array.isArray(local[f.name])? local[f.name]: {}), null, 2)} onChange={e=>{
              try { update(f.name, JSON.parse(e.target.value || 'null')); } catch {}
            }} />
          )}
          {f.type === 'date' && (
            <input type="date" className="border rounded p-2" defaultValue={local[f.name]?.slice(0,10) || ''} onChange={e=>update(f.name, e.target.value)} />
          )}
          {f.type === 'richtext' && (
            <textarea className="border rounded p-2 min-h-[200px]" defaultValue={local[f.name] || ''} onChange={e=>update(f.name, e.target.value)} />
          )}
        </div>
      ))}
    </div>
  );
}
