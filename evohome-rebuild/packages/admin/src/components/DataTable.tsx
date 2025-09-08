import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { Field } from '../models.config';
import { ModelForm } from './ModelForm';

export default function DataTable({ title, endpoint, idKey, columns, fields }: { title:string; endpoint:string; idKey:string; columns:string[]; fields:Field[] }) {
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any|null>(null);

  async function load(){ const res = await api.get(endpoint); setRows(res.data.data || res.data); }
  useEffect(()=>{ load(); },[endpoint]);

  async function save(){
    const body = editing;
    if (body[idKey]) await api.patch(`${endpoint}/${body[idKey]}`, body);
    else await api.post(endpoint, body);
    setEditing(null); load();
  }
  async function del(row:any){ await api.delete(`${endpoint}/${row[idKey]}`); load(); }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={()=>setEditing({})}>New</button>
      </div>
      <table className="w-full border text-sm">
        <thead><tr className="bg-gray-50">
          {columns.map(c=> <th key={c} className="text-left p-2 border-b">{c}</th>)}
          <th className="p-2 border-b">Actions</th>
        </tr></thead>
        <tbody>
          {rows.map((r)=> (
            <tr key={r[idKey]} className="border-b">
              {columns.map(c=> <td key={c} className="p-2">{String(r[c])}</td>)}
              <td className="p-2 space-x-2">
                <button className="px-2 py-1 border rounded" onClick={()=>setEditing(r)}>Edit</button>
                <button className="px-2 py-1 border rounded text-red-600" onClick={()=>del(r)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow max-w-3xl w-full p-4 space-y-4">
            <h3 className="text-lg font-semibold">{editing[idKey] ? 'Edit' : 'Create'}</h3>
            <ModelForm fields={fields} value={editing} onChange={setEditing} />
            <div className="flex justify-end gap-2">
              <button className="px-3 py-2 border rounded" onClick={()=>setEditing(null)}>Cancel</button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={save}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
