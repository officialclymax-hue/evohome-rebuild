import { api } from '@/lib/api';
export const metadata = { title: 'Gallery – EvoHome' };

export default async function GalleryPage() {
  const imgs = await api<any[]>('/gallery').catch(()=>[]);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {imgs.map((g:any)=>(
          <figure key={g.id} className="border rounded overflow-hidden">
            {/* You can swap for next/image if you want */}
            <img src={g.src} alt={g.alt || g.title || 'Gallery'} />
            {g.title && <figcaption className="p-2 text-sm">{g.title}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  );
}
