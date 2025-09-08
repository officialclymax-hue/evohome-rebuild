import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';

export default function BlogPage(){
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(()=>{ api.get('/blog').then(r=> setPosts(r.data.data || r.data)); },[]);
  return (
    <div className="container mx-auto p-6 grid md:grid-cols-3 gap-6">
      {posts.map((p)=> (
        <Link to={`/blog/${p.slug}`} key={p.id} className="border rounded p-4">
          {p.image && <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded" />}
          <h3 className="font-semibold mt-2">{p.title}</h3>
          <p className="text-sm text-gray-600">{p.excerpt}</p>
        </Link>
      ))}
    </div>
  );
}
